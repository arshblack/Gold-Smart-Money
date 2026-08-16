---
permalink: /learn/tracks/master-the-mind/pre-trade-journal/
title: "The Journal Entry You Write Before the Trade"
content_id: RL-MND-06
track: master-the-mind
position: 6
level: Ongoing
reading_time: 9
last_reviewed: 2026-08-16
status: public
prerequisites: []
---
# The Journal Entry You Write Before the Trade

**Learning objective.** By the end of this lesson you will be able to write a pre-trade journal entry — before the position exists — that states the setup, the invalidation, and the reason, in a form specific enough to be scored later against what you actually did.

**Prerequisite.** `RL-MND-03`, written rules and the pre-trade checklist, recapped below.

---
## Recap: what makes a rule reviewable

A rule is useful only if it can be broken in a way you could later detect. *I will not overtrade* cannot be — there is no record that would settle it. *No more than two XAUUSD positions open at once* can be, from the history tab, in seconds.

Same test applies to everything in this lesson. If an entry cannot be scored against your own record, it is a diary, not a journal.

---
<div class="market-lab">
  <header>
    <div>
      <small>Journal lab</small>
      <strong>A setup should survive being written down</strong>
    </div>
    <span>Before entry</span>
  </header>
  <div class="journal-card">
    <div class="journal-row">
      <span>Setup</span>
      <p>H1 bias down. M15 reached `EQH1`; wick and close passed. Follow-through pending.</p>
    </div>
    <div class="journal-row">
      <span>Invalidation</span>
      <p>M15 close back above `EQH1`. H1 close above `HH1` invalidates the broader read.</p>
    </div>
    <div class="journal-row">
      <span>Why now</span>
      <p>Level marked before approach. London active. No high-impact release inside the horizon.</p>
    </div>
    <div class="journal-row">
      <span>Do not take if</span>
      <p>Follow-through does not arrive, or price stalls inside the prior range.</p>
    </div>
  </div>
  <div class="lab-steps">
    <details open>
      <summary>Readable</summary>
      <p>Another trader can understand what you were waiting for.</p>
    </details>
    <details>
      <summary>Scorable</summary>
      <p>The record can later prove whether you followed your own decision.</p>
    </details>
    <details>
      <summary>Protective</summary>
      <p>The trade that cannot fill the invalidation field is stopped before it becomes money.</p>
    </details>
  </div>
</div>

---
## The problem with the post-trade journal

Almost every trading journal is written after the position closes. That is when the outcome is known — which is precisely what makes the record unreliable.

By the time you write, you know whether it worked. You are no longer recording a decision; you are reconstructing one, and the reconstruction is bent by the outcome. Winners acquire reasons they did not have at the time. Losers acquire warning signs nobody noticed. Neither distortion feels like dishonesty. It feels like remembering.

Then there is the more ordinary problem: a post-trade journal cannot change the trade it describes. It is a record of decisions already made, and its only value is aggregate — patterns visible across fifty entries, months later. That value is real, but it is slow, and it arrives long after the money.

**The pre-trade entry does a different job.** Written before the position exists, it is a commitment rather than a memory. And it has an immediate effect the post-trade version cannot have: some trades do not survive being written down. You go to fill in the invalidation field, find you do not have one, and discover you were about to take something you had not thought through. That discovery is the entry's main return, and it happens before any money is at risk.

---
## The entry

Six fields. Keep it short enough that you will do it at 09:40 with a setup forming.

**1. Setup.** What you are seeing, in plain language, with the timeframe. *H1 bias down since Monday; price reaching into `EQH1` overnight pool on M15.* If you cannot write this without specialist vocabulary doing the load-bearing, you may not have a read.

**2. Invalidation.** The price or condition at which this is wrong. A number or a defined event — never a feeling. If this field is hard to fill, stop. That difficulty is the entry earning its keep.

**3. Why now.** What makes this moment different from the last four hours of the same chart. The honest answer is sometimes *nothing, I am bored*, and writing that has saved more accounts than any indicator.

**4. Session and calendar.** Which window, and whether scheduled high-impact data sits inside your horizon. One line. `RL-KZN-02` explains why this line is not optional.

**5. Risk.** Percentage of account, and the lot size you derived from your own MT5 symbol specification. Not a number you remember — one you calculated for this position on this broker.

**6. What would make me not take this.** The strongest argument against, written by you, before entry. This is the field people skip and the one that most reliably predicts whether the entry gets honoured.

Nothing about targets. Targets belong to trade management. Nothing about expected outcome. The entry describes a decision, not a prediction.

---
## Worked example

*Schematic.*

> **09:38 London.** **Setup:** H1 lower highs since Monday. M15 reached above `EQH1` (overnight Asian pool) and closed back below. Three-part test passed on wick and close; follow-through not yet assessed.
> **Invalidation:** M15 close back above `EQH1`. If H1 closes above `HH1`, the whole bias goes, not just this idea.
> **Why now:** Level was marked at 06:00, before approach. First reach.
> **Session/calendar:** London, 40 minutes in. No high-impact releases today. Checked.
> **Risk:** 0.5% *(illustrative figure for this example only — not a recommended level)*. Lot size derived from symbol specification this morning.
> **What would make me not take this:** Follow-through absent — this is the third time this week I have acted on a shape before part 3. If price stalls inside the range for two candles, this expires.

Now the part that matters. Whatever happened next, that entry can be scored. Did you wait for part 3? Did you honour the invalidation? Was your risk what you wrote?

Those are questions about behaviour, answerable from the record, entirely independent of whether the trade made money. That independence is the point. A post-trade journal mostly measures outcomes, which you do not control. This measures execution, which you do.

---
## The EA is this entry, codified

Here is the connection worth making, and its limits.

An automated system is, at bottom, a pre-trade journal entry written once and then executed without revision. The conditions are specified in advance. The invalidation is specified in advance. Risk is specified in advance. When conditions occur, it acts — and it does not consult how the last three trades went, whether it is Friday, or whether it feels right.

That is not an argument that automation is superior. It is an observation about *what the discipline is*: deciding in advance and not revising under pressure. Writing the entry by hand is the same act performed manually. If you can do it consistently by hand, you have the thing the algorithm was built to preserve.

Two honest caveats. Automation removes in-the-moment revision; it does not remove judgement, it relocates it to the decisions made when the rules were written — where the same biases apply with more time to compound. And a system executed without discretion still gets switched off by a human during drawdown, which is the same failure wearing a different hat.

**What is not being said here:** nothing in this lesson describes how this project's Expert Advisor decides anything. Its conditions, thresholds, and management logic are not published. The point is the principle — commit in advance, do not revise under pressure — which belongs to you regardless of whether you ever automate anything.

---
## Exercise — no trade required

For two weeks, write the entry for every setup you consider. Every one, including the ones you do not take. Especially those.

Then, weekly:

1. Count entries written versus positions opened. A large gap in either direction is informative — many entries and few trades means you are filtering, few entries and many trades means you are trading without writing.
2. For each position opened, score three things: did I wait for what field 1 said I was waiting for; did I honour field 2; was my risk field 5.
3. Score nothing about profit.

The first week is uncomfortable. That discomfort is the measurement working — it is the gap between what you believe you do and what the record shows.

---
## Common failure mode

**Writing the entry after entering.** Ninety seconds after, still feels pre-trade, is not. The position is open, the money is at risk, and the entry now describes a decision already made — which is the post-trade journal with extra steps.

**Fields that are technically filled but not usable.** Invalidation written as *if it looks wrong.* Risk as *small.* An entry that cannot be scored is worse than none, because it produces a record that looks like discipline and cannot contradict you.

**Abandoning it during drawdown.** The entry gets skipped precisely when it matters most — the fourth loss of the week, wanting it back. If you notice you have stopped writing entries, that is not a journalling problem. It is the thing the journal exists to detect, detecting itself.

**Invalidation condition.** For the practice, not a trade: if you have written fewer entries than positions opened over a two-week window, the practice has lapsed. Restart it before drawing any conclusions from the entries you do have — a partial record over-samples the trades you felt confident about.

---
## Observation checklist

Before the position exists:

1. All six fields are filled, and field 2 is a number or a defined event.
2. Field 6 contains a real argument against, not a formality.
3. Risk in field 5 was calculated from my broker's specification, not recalled.
4. The entry is timestamped before the order.
5. I could hand this to another trader and they could score my execution from it.

---
## Knowledge check

**1. Why is a pre-trade entry more reliable than a post-trade one?**

Because it is written before the outcome is known, so it cannot be shaped by it. Post-trade writing reconstructs reasoning with the result already in view, and reconstruction favours the result — winners gain reasons, losers gain warnings. The pre-trade entry is a commitment that can be compared against behaviour rather than a memory that has already adjusted.

**2. You fill every field except invalidation, which you leave as "if it looks wrong." What has the entry told you?**

That you do not have a defined invalidation, which means you do not yet have a setup — you have an inclination. The vague field is not a formatting problem; it is the entry doing its main job, which is to surface an incomplete decision before money is committed. The correct response is to define the level or not take the trade.

**3. What is the relationship between this entry and an automated system?**

Both commit to conditions in advance and remove revision under pressure — the algorithm structurally, the written entry by discipline. The principle is identical; only the enforcement differs. And automation relocates judgement to when the rules were written rather than eliminating it, so neither version escapes the need to have decided well in the first place.

---
## Risk note

Educational only, not financial advice. Journalling does not produce profit. It produces a record clear enough to tell whether your method does — which is a different and more modest claim, and the only one supportable.

The risk percentage in the example is illustrative and is not a recommendation. This lesson does not suggest a risk level; what percentage is appropriate depends on your account, your circumstances, and decisions that are yours alone. Position sizing must be calculated from your own broker's contract size and tick value in your MT5 symbol specification; these differ between brokers and a size derived from someone else's figures will be wrong.

If trading losses are affecting your finances or wellbeing beyond the account, that is worth addressing with someone directly rather than through a journalling practice.

A setup remains **research** until the MT5 Expert Advisor confirms execution. Manual trades stay outside the public record.

---

