---
permalink: /learn/tracks/hunt-liquidity/sweep-that-isnt/
title: "The Sweep That Isn't: Wick, Close, Follow-Through"
content_id: RL-LIQ-03
track: hunt-liquidity
position: 3
level: Intermediate
reading_time: 9
last_reviewed: 2026-08-16
status: public
prerequisites: []
---
# The Sweep That Isn't: Wick, Close, Follow-Through

**Learning objective.** By the end of this lesson you will be able to apply a three-part qualitative test to any candidate liquidity sweep on XAUUSD, and — more importantly — say which specific part failed when one fails.

**Prerequisite.** Hunt Liquidity lessons 1 and 2, plus structure labelling from Read Structure. The recap below covers the minimum.

---
## Recap: what you need from lessons 1 and 2

A **liquidity pool** is a price area where resting orders plausibly cluster. You do not need special data to locate one. Ask where you would put a stop if you were long, and you have found where most people put theirs: just beyond an obvious high or low that many traders can see.

**Equal highs** (`EQH`) form when price reaches roughly the same level twice or more and turns away each time. Equal lows (`EQL`) are the mirror. The tighter and more obvious the level, the more visible it is — and visibility is the point. A level nobody can see holds nobody's stops.

That is the entire setup for this lesson: an obvious level, with orders plausibly resting beyond it.

---
## The thing this lesson is actually about

Price reaches beyond an obvious level and comes back. Every day, on every timeframe, on every instrument.

Most of the time it means nothing.

The version taught almost everywhere goes: price sweeps liquidity, then reverses, so enter on the reversal. Stated that way it is unfalsifiable — any reach beyond a level followed by any return can be called a sweep after the fact, and any reach that keeps going gets quietly excluded as "not a real sweep." A rule that can only be applied backwards is not a rule.

So this lesson is built the other way round. Instead of asking *was that a sweep*, it asks three separate questions with three separate answers, and treats a no on any one of them as information rather than as an inconvenience.

---
<div class="market-lab">
  <header>
    <div>
      <small>Interactive market lab</small>
      <strong>A sweep is a sequence, not one candle</strong>
    </div>
    <span>Schematic XAUUSD</span>
  </header>
  <div class="lab-stage" aria-label="Animated schematic of a liquidity sweep above equal highs, close back below the level, and follow-through lower.">
    <svg viewBox="0 0 820 360" role="img">
      <line class="lab-grid" x1="60" y1="80" x2="760" y2="80"/>
      <line class="lab-grid" x1="60" y1="145" x2="760" y2="145"/>
      <line class="lab-grid" x1="60" y1="210" x2="760" y2="210"/>
      <line class="lab-grid" x1="60" y1="275" x2="760" y2="275"/>
      <rect class="lab-zone" x="108" y="88" width="226" height="20"/>
      <line class="lab-line" x1="86" y1="98" x2="758" y2="98"/>
      <text class="lab-label gold" x="94" y="84">EQH1 / resting liquidity</text>
      <path class="lab-path" d="M80 215 C128 168, 166 204, 206 154 S286 182, 318 111"/>
      <path class="lab-sweep" d="M318 111 C350 72, 384 54, 418 78 C452 104, 468 126, 492 142"/>
      <path class="lab-path" d="M492 142 C536 190, 570 178, 604 214 S684 236, 738 286"/>
      <g class="lab-candle c1">
        <line x1="270" y1="126" x2="270" y2="182" stroke="#3FE0C5" stroke-width="2"/>
        <rect x="262" y="144" width="16" height="28" fill="#3FE0C5"/>
      </g>
      <g class="lab-candle c2">
        <line x1="340" y1="82" x2="340" y2="162" stroke="#E0683F" stroke-width="2"/>
        <rect x="332" y="104" width="16" height="44" fill="#E0683F"/>
        <text class="lab-label rust" x="360" y="64">1 wick beyond</text>
      </g>
      <g class="lab-candle c3">
        <line x1="416" y1="54" x2="416" y2="158" stroke="#E0683F" stroke-width="2"/>
        <rect x="408" y="84" width="16" height="54" fill="#E0683F"/>
        <text class="lab-label gold" x="438" y="126">2 close back inside</text>
      </g>
      <g class="lab-candle c4">
        <line x1="545" y1="148" x2="545" y2="226" stroke="#3FE0C5" stroke-width="2"/>
        <rect x="537" y="168" width="16" height="40" fill="#3FE0C5"/>
      </g>
      <g class="lab-candle c5">
        <line x1="650" y1="202" x2="650" y2="288" stroke="#3FE0C5" stroke-width="2"/>
        <rect x="642" y="220" width="16" height="52" fill="#3FE0C5"/>
        <text class="lab-label aqua" x="574" y="318">3 follow-through away</text>
      </g>
    </svg>
  </div>
  <div class="lab-steps">
    <details open>
      <summary>Part 1 · Wick</summary>
      <p>Price must trade beyond the marked level. Near the level is not a sweep.</p>
    </details>
    <details>
      <summary>Part 2 · Close</summary>
      <p>The candle must close back inside the level on the timeframe chosen before the setup.</p>
    </details>
    <details>
      <summary>Part 3 · Follow-through</summary>
      <p>Movement away from the level is what separates an observation from a candidate setup.</p>
    </details>
  </div>
</div>

---
## The three-part test

### Part 1 — The wick: did price actually reach beyond the level?

Not near it. Beyond it. If your level is `EQH1`, price must trade above `EQH1`.

This sounds trivial and is the most commonly fudged part of the whole test. A candle that stops two or three dollars short of an equal high on gold has not reached the orders resting above it. Nothing has been triggered. Whatever happens next is not a sweep, whatever it looks like.

There is a real complication here and it is worth stating rather than hiding: **your chart's high is not everyone's high.** The wick that just cleared `EQH1` on your MT5 broker's feed may not have cleared it on a TradingView OANDA feed, because spot gold has no central exchange and every feed is its own aggregation. Feeds can and do disagree at the extremes of a fast move, and the disagreement is largest exactly where it matters — at the wick that decides whether a level was cleared. I have not measured the typical size of that gap and will not quote one until I have. What follows regardless: if a sweep is only a sweep on one feed, treat it as marginal. That is not pedantry — it is the honest state of an instrument with no central exchange.

### Part 2 — The close: where did the candle finish?

This is what separates a sweep from a breakout, and it is the part the two share nothing but geometry.

If price reaches above `EQH1` and the candle closes back below it, the move beyond the level was not sustained. If price reaches above `EQH1` and closes above it, that is a breakout — a different event, with different implications, and calling it a failed sweep because it later came back is exactly the backwards reasoning this test exists to prevent.

Two candles can have identical highs. One closes above the level, one closes below. They are not the same event and should not produce the same reading.

**The honest part.** Which timeframe's close counts is a decision you make in advance and apply consistently. There is no universally correct answer, and any source that gives you one without telling you what it depends on is guessing. Pick a timeframe, write it in your rules, and stop re-deciding it per chart. The research system's answer to this question is not published — but the reasoning above is the whole of what makes the choice matter, and that reasoning is yours to use.

### Part 3 — The follow-through: did anything happen after?

Price cleared the level, closed back inside, and then… drifted sideways for four hours.

Nothing has been confirmed. The first two parts describe a shape. Follow-through is the only part that carries any information about whether the shape mattered — and it is the part most often skipped, because by the time you can assess it, the entry that felt obvious has already gone.

That is the trade-off, stated plainly: waiting for follow-through costs you the best price and buys you the difference between a pattern and an observation. Which side of that trade-off you sit on is a decision about your own tolerance, not a fact about markets. This lesson's only claim is that you should know which one you are choosing.

**What follow-through is not.** It is not a target, a pip count, or a promise. It is the presence of directional movement away from the level, on the timeframe you are working. Its absence is a complete answer.

---
## Worked example — XAUUSD, London session

*Schematic. Structural labels, not prices.*

**Setup.** Over the Asian session, gold prints two highs at effectively the same level. Label it `EQH1`. Price drifts below it into the London open. Structure on H1 is a sequence of lower highs — the bias is down, and `EQH1` sits above as an obvious pool.

**Candidate A — passes all three.** An M15 candle in the first London hour trades clearly above `EQH1`, then closes back below it. The following two candles move down and away, taking out the small swing low that formed before the reach. Wick: yes. Close: yes. Follow-through: yes.

**Candidate B — fails part 1.** A candle rallies to within a hair of `EQH1` and rejects hard. The rejection looks better on the chart than Candidate A's did. But the orders above `EQH1` were never reached, so the mechanism the whole idea depends on did not occur. This is the most seductive failure of the three, because the candle is more attractive than the one that passes.

**Candidate C — fails part 2.** A candle trades above `EQH1` and closes above it. Then it comes back below an hour later. Read forwards, this was a breakout that failed. Read backwards, it looks like a slow sweep. Only the forwards reading was available at the time, which is the reading that counts.

**Candidate D — fails part 3.** Wick above, close back below, textbook shape — and then six hours of chop inside the prior range. The shape was there. Nothing followed. This is not a loss if you waited; it is a setup that expired.

**Session context matters.** The same four candidates during a thin Asian session are weaker observations than during London. That is developed in Time the Killzone. Here it is enough that *when* is part of *what*.

---
## Exercise — no trade required

Take one week of XAUUSD M15 with H1 open beside it.

1. Mark every equal-high and equal-low formation you can find. Grade each one — clean or marginal.
2. Find every instance where price traded beyond a marked level.
3. For each, score the three parts as pass or fail, before looking at what happened next.
4. Then look. Record what followed.

You are counting how often each part fails, not whether you would have made money. Most people find part 3 fails far more often than they expected, and that number — your number, from your chart — is worth more than any claim in this lesson.

---
## Common failure mode

**Reclassifying after the fact.** A level is reached, you call it a sweep, price keeps going, and it becomes "a breakout, not a real sweep." The chart did not change. Your label did, after the outcome was known, which means it can never be wrong and never teach you anything.

The defence is scoring all three parts *before* the next candles arrive, and writing the score down. A record of your part-3 failures is the single most useful thing this lesson can leave you with.

**Second failure mode: marking levels to find sweeps.** If you are hunting for a setup, you will find equal highs where there are only two adjacent candles. Mark levels first, on their own merits, before you have any interest in what happens at them.

**Invalidation condition.** A candidate sweep is invalidated when price closes beyond the level in the direction of the reach, on your chosen timeframe, and holds there. At that point it is not a sweep that failed — it is a different event, and the sweep reading should be dropped rather than defended.

---
## Observation checklist

Before calling anything a sweep:

1. The level was marked before price approached it, not after.
2. Price traded *beyond* the level, not near it — checked against the feed I actually trade.
3. I know which timeframe's close I am using, and it is the same one I used last time.
4. I have scored all three parts, in writing, before the next candle closed.
5. I have noted the session, and whether scheduled news sits inside the window.

---
## Knowledge check

**1. Price rejects violently one dollar below `EQH1` and drops fifty. Was that a sweep?**

No. Part 1 failed — price never reached beyond the level, so the resting orders that give a sweep its meaning were never involved. The move may have been profitable; that is a separate question from whether it was this pattern. Conflating "it worked" with "it was the setup" is how a rule set quietly dissolves.

**2. Your feed shows the wick clearing `EQH1` by twenty cents. A friend's feed shows it stopping just short. Who is right?**

Both, and neither. Spot gold has no central exchange; each feed is its own aggregation, and they can disagree at the extremes of fast moves. Treat a sweep that exists on one feed and not another as marginal, and size accordingly. Trade the feed you execute on, and hold the level a little more loosely than the line on your chart suggests.

**3. Wick above the level, close back below, and then four hours of sideways. What is your reading?**

Parts 1 and 2 passed, part 3 did not. The correct reading is that the setup expired. It is not a loss, it is not a missed trade, and it is not evidence the test failed — a test that returns "nothing here" is doing its job. Recording it as an expiry rather than deleting it from memory is what makes the sample honest.

---
## Risk note

This lesson is educational and is not financial advice. Nothing here predicts price, and no level on any chart is under any obligation to produce a reaction.

The three-part test is deliberately qualitative in public. It contains no candle-count windows, no timing constants, and no scoring thresholds — what is taught is the reasoning behind each part, which is the portion that transfers to your chart, your broker, and your feed. A constant copied without its reasoning is worth very little anyway, and would be wrong on your feed in any case.

Gold is traded with leverage and a position can lose more than you intended to risk. Verify contract size and tick value in your own MT5 symbol specification.

A setup identified through this test is **research**. It becomes part of the public record only when the MT5 Expert Advisor confirms execution. Manual trades stay outside that record.

---

