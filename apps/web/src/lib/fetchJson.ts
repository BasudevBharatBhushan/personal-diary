export async function fetchJson<T>(url: string, init?: RequestInit): Promise<T> {
  const isForm = init?.body instanceof FormData;
  const res = await fetch(url, {
    ...init,
    headers: {
      ...(isForm ? {} : { "Content-Type": "application/json" }),
      ...(init?.headers ?? {}),
    },
  });
  if (res.status === 401) {
    if (typeof window !== "undefined") window.location.href = "/unlock";
    throw new Error("locked");
  }
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    const err = new Error((data as { error?: string }).error ?? res.statusText);
    // attach status for callers that need it (e.g. 409)
    (err as Error & { status?: number }).status = res.status;
    throw err;
  }
  return data as T;
}
