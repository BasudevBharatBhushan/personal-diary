"use client";

import { useEffect, useState } from "react";
import { STORAGE_KEYS } from "@b3os/core";

interface CachedLocation {
  label: string;
  fetchedAt: number;
}

interface NominatimAddress {
  city?: string;
  town?: string;
  village?: string;
  county?: string;
  state?: string;
}

interface NominatimResponse {
  address?: NominatimAddress;
}

const FALLBACK_LABEL = "Kolkata";
const CACHE_TTL_MS = 24 * 60 * 60 * 1000;

function readCache(): CachedLocation | null {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEYS.location);
    return raw ? (JSON.parse(raw) as CachedLocation) : null;
  } catch {
    return null;
  }
}

function writeCache(entry: CachedLocation) {
  try {
    window.localStorage.setItem(STORAGE_KEYS.location, JSON.stringify(entry));
  } catch {
    // Storage full or unavailable — location just won't persist across visits.
  }
}

/**
 * Detects the user's current city via the browser's geolocation permission
 * prompt, then reverse-geocodes the coordinates through OpenStreetMap's free
 * Nominatim API. Falls back to "Kolkata" if permission is denied, geolocation
 * is unsupported, or the lookup fails. Cached in LocalStorage for a day so
 * the permission prompt and network lookup don't repeat on every visit.
 */
export function useCurrentLocation(): string {
  const [label, setLabel] = useState(FALLBACK_LABEL);

  useEffect(() => {
    const cached = readCache();
    if (cached && Date.now() - cached.fetchedAt < CACHE_TTL_MS) {
      setLabel(cached.label);
      return;
    }
    if (typeof navigator === "undefined" || !navigator.geolocation) return;

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        fetch(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`)
          .then((response) => response.json())
          .then((data: NominatimResponse) => {
            const address = data.address ?? {};
            const city = address.city ?? address.town ?? address.village ?? address.county ?? address.state;
            if (city) {
              writeCache({ label: city, fetchedAt: Date.now() });
              setLabel(city);
            }
          })
          .catch(() => {
            // Lookup failed — keep showing the fallback label.
          });
      },
      () => {
        // Permission denied or unavailable — keep showing the fallback label.
      },
      { timeout: 10_000 },
    );
  }, []);

  return label;
}
