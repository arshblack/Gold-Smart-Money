---
permalink: /learn/tracks/time-the-killzone/
title: "Time the Killzone"
content_id: RL-KZN-INTRO
track: time-the-killzone
level: Intermediate
lesson_count: 4
reading_time: 3
last_reviewed: 2026-08-16
status: public
---
# Time the Killzone

**Learn what the clock does and does not tell you about a gold setup — including which clock you should actually be reading.**

## Who this track is for

- Traders who have heard that London and New York are the sessions that matter, have set an alarm accordingly, and have never checked whether their broker's server clock, their local clock, and London's clock agree with each other. They usually do not.
- **Not** for traders looking for a time window that turns a weak setup into a strong one. Session timing is a filter. It removes hours in which a setup is less likely to be worth taking; it does not improve the setup itself, and treating it as an edge on its own is a common and expensive mistake.

## What you'll be able to do

By the end of this track you will be able to:

1. State the three main sessions in London local time, in UTC, and in your own broker's server time — and find your server offset yourself inside MT5 rather than assuming it.
2. Explain what happens to a fixed session filter across the two daylight-saving transitions, and why London and New York changing on different dates matters.
3. Decide whether a given day's session context supports taking a setup, weakens it, or says nothing either way — including the days where the honest answer is the third one.

## The lessons

| # | Lesson | What it covers |
|---|---|---|
| 1 | The Three Sessions, in Three Clocks | Asia, London and New York expressed simultaneously in London local time, broker-server time and UTC — plus how to find your server offset in MT5. |
| 2 | **When the London Window Matters, and When It Doesn't** — *Available now* | The conditions under which the London window has historically carried elevated gold activity, and the days it demonstrably does not. |
| 3 | The New York Overlap, Daylight Saving Included | The overlap window, why its clock time shifts twice a year on two different national schedules, and what that does to a fixed filter. |
| 4 | Reading the Previous Session Close | Using the prior session's close as one input into the next session's context — and the sample-size problem with treating it as more. |

Lessons 1, 3 and 4: **Full track planned for The Matrix member beta.**

## Prerequisites

**Read Structure, lessons 1–3** and **Hunt Liquidity, lessons 1–2** are assumed. Session timing is a filter applied to a setup you have already identified structurally — on its own it filters nothing.

The flagship lesson recaps the three-session model in enough detail to be read standalone.

## Editorial note

**Three clocks, always.** Every time reference in this track is given in more than one clock, because the single most common timing error in retail gold trading is a trader comparing a session time they read online against a broker server clock that is offset from it — often by two or three hours, and by a different amount in summer than in winter. London and New York also change daylight saving on different dates, which produces two short periods each year when the usual offset between them is wrong by an hour. A session filter that is hardcoded to clock time is silently wrong during those weeks.

**Claims about *why* sessions behave differently are sourced, and hedged.** Explanations involving session overlap, liquidity provision, scheduled news, or benchmark pricing are drawn from primary sources — exchange documentation for gold trading hours and contract behaviour, and LBMA documentation for the London benchmark mechanics — with academic literature used only to support general concepts such as volatility clustering and session effects. Where the honest answer is "this pattern is observable but the mechanism is contested", the lesson says that.

**Volume on these charts is tick volume.** Spot-gold volume on a TradingView OANDA feed or an MT5 broker feed counts price updates, not contracts traded. It is useful for comparing one hour against another on the same feed. It is not a measure of global gold volume, and the two feeds will not agree with each other.

**Research is not execution.** A time-filtered setup is research until the MT5 EA confirms a trade. Nothing here is financial advice.


