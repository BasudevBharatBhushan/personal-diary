# Project

Build a complete React application called **B3 OS**.

This is my personal operating system.

Its purpose is to reduce decision fatigue, organize my evenings, and gently guide me through my day.

This application is for personal use only.

It should feel calm, colorful, playful and friendly—not like a productivity app.

--------------------------------------------------
TECH STACK
--------------------------------------------------

- React
- Vite
- TypeScript
- TailwindCSS
- LocalStorage
- No backend
- No authentication
- Fully offline
- Responsive

--------------------------------------------------
DESIGN PHILOSOPHY
--------------------------------------------------

IMPORTANT

Do NOT create another aesthetic productivity app.

Avoid

- black minimalism
- monochrome
- glassmorphism
- futuristic UI
- neon
- overly professional dashboards

Instead build something that feels like

- Google Keep
- Nintendo
- A children's planner
- Happy notebook
- Cute dashboard

Use

- sky blue
- green
- orange
- yellow
- pink
- purple

Use rounded cards.

Friendly fonts.

Lots of whitespace.

Cute emojis.

Each page may have its own accent color.

Every section should feel welcoming.

No fancy animations.

Simple transitions only.

The app should make me smile every time I open it.

--------------------------------------------------
APPLICATION STRUCTURE
--------------------------------------------------

Sidebar

Dashboard

Decision Panel

Tomorrow Card

Random Thoughts

Food System

Sunday Reset

Rules

Philosophy

--------------------------------------------------
TOP HEADER
--------------------------------------------------

Always visible.

Display

B3 OS

Current Date

Current Time (Asia/Kolkata timezone)

Current Phase

Next Activity

Personal Message

Current phase should automatically update every minute.

--------------------------------------------------
PERSONAL DAILY MESSAGE
--------------------------------------------------

Display one sentence depending on the current phase.

Wake Up
🌅 Good morning.
Today starts with movement.

Workout
💪 Take care of your body.
Everything else can wait.

Breakfast
🥣 Fuel yourself well.

Mindfulness
🧘 Slow down.
Presence is productive.

Bonus Focus
🎯 Bonus progress is still progress.

Get Ready
🚿 Take your time.
No rushing.

Office
💼 You're at work.
Just focus on work.

Decision Time
📝 Decide now.
Don't decide again tonight.

Recovery
😌 Relax.
You've earned it.

Dinner
🍽️ Dinner is already decided.
Don't think.
Just eat.

Productive Hour 1
📚 One focused hour.

Break
☕ Recharge.

AI Learning
🤖 This hour belongs to AI.

Reading
📖 Slow down.
Enjoy your book.

Relax
🏔️ Mountains before dreams.

Overthinking
🌙 Overthink all you want.
Just stop after five minutes.

Tomorrow Card
📝 Make tomorrow easier.

Sleep
😴 The day is complete.
Sleep peacefully.

Fallback

✨ One small step is enough today.

--------------------------------------------------
SMART TIME ENGINE
--------------------------------------------------

Use Asia/Kolkata timezone.

Automatically determine

Current Phase

Next Activity

Highlight the active timeline row.

Update every minute.

--------------------------------------------------
TIMELINE
--------------------------------------------------

08:00
Wake Up

08:20–09:00
Workout + Yoga

09:00–09:20
Breakfast

09:20–09:35
Mindfulness

09:35–10:20
Bonus Focus

10:20–11:15
Get Ready

11:15
Leave for Office

11:30–19:00
Office

17:00
Decision Time

19:00–19:30
Recovery
Instagram

19:30–19:45
Dinner

19:45–20:45
Productive Hour 1

20:45–21:00
Break

21:00–22:00
AI Learning

22:00–23:15
Reading

23:15–23:35
Travel Videos

23:35–23:40
Overthinking Window

23:40–23:45
Tomorrow Card

23:45
Sleep

--------------------------------------------------
DASHBOARD
--------------------------------------------------

Top Card

Current Time

Current Phase

Next Activity

Personal Message

Timeline

Highlight current activity.

--------------------------------------------------
DECISION PANEL
--------------------------------------------------

Editable cards.

Today's Dinner

Today's Productive Hour 1

Today's Productive Hour 2

Autosave.

--------------------------------------------------
TOMORROW CARD
--------------------------------------------------

Editable.

Tomorrow Dinner

Tomorrow Productive Hour 1

Tomorrow Productive Hour 2

One Important Thing

Mood

Autosave.

--------------------------------------------------
RANDOM THOUGHTS
--------------------------------------------------

Simple notes.

No folders.

No markdown.

Each note

Title

Content

Created Time

Newest first.

Autosave.

--------------------------------------------------
FOOD SYSTEM
--------------------------------------------------

Dinner Rotation

Monday
Black Chana + Moong Dosa

Tuesday
Steamed Vegetables + Paneer

Wednesday
Outside Dosa

Thursday
Black Chana + Moong Dosa

Friday
Litti Chokha

Saturday
Healthy Wrap / Subway
(Max twice/month)

Sunday
Free Choice

Emergency Dinner

Bread + Peanut Butter

Instant Oats

Roasted Chana

Paneer Sandwich

Rule

Never skip dinner.

Anything is better than starving.

--------------------------------------------------
GROCERY LIST
--------------------------------------------------

Protein

Black Chana

Green Moong

Paneer

Tofu

Roasted Chana

Peanuts

Vegetables

Carrot

Beans

Broccoli

Capsicum

Emergency Shelf

Bread

Oats

Dry Fruits

Peanut Butter

Makhana

--------------------------------------------------
SUNDAY RESET
--------------------------------------------------

Checklist

☐ Grocery Shopping

☐ Vegetables

☐ Restock Chana

☐ Restock Moong

☐ Buy Paneer

☐ Plan Weekly Dinners

Persist state.

Reset button.

--------------------------------------------------
RULES
--------------------------------------------------

1.
Never come home without knowing dinner.

2.
Never skip dinner.

3.
Reading is protected.

4.
Instagram is allowed for 30 minutes.

5.
Decide once.
Execute later.

--------------------------------------------------
PHILOSOPHY
--------------------------------------------------

Display only this.

"I don't need more motivation.

I need fewer decisions.

My system should make low-energy days easier and high-energy days productive.

The goal isn't perfect days.

The goal is consistency."

--------------------------------------------------
LOCAL STORAGE
--------------------------------------------------

Persist

Decision Panel

Tomorrow Card

Random Thoughts

Sunday Reset

--------------------------------------------------
OUT OF SCOPE
--------------------------------------------------

No login

No backend

No Firebase

No authentication

No AI

No cloud sync

No calendar integration

No reminders

No notifications

No habit tracker

No streaks

No analytics

No charts

--------------------------------------------------
CODE QUALITY
--------------------------------------------------

Use reusable React components.

Suggested components

Sidebar

Header

CurrentStatusCard

Timeline

TimelineItem

EditableCard

Checklist

Notes

FoodCard

RuleCard

PhilosophyCard

Create clean TypeScript types.

Keep code readable.

Avoid overengineering.

--------------------------------------------------
FINAL GOAL
--------------------------------------------------

This app should feel like opening my own personal room.

Not a productivity tool.

Not a corporate dashboard.

Not Notion.

It should greet me, tell me what time it is, tell me what I should be doing right now, remove unnecessary decisions, and quietly help me end every day a little better than I started it.