---
permalink: /learn/start-here/
title: "Start Here: Gold Trading Foundations"
description: "A plain-language starting point for XAUUSD, pips, lot size, stop loss, take profit, and MT5 risk checks."
content_id: RL-FND-START
track: gold-foundations
level: Beginner
reading_time: 12
status: public
previous_url: /learn/
previous_title: Learn hub
next_url: /learn/tracks/read-structure/h1-bias-before-m15/
next_title: H1 Bias Before M15 Execution
last_reviewed: 2026-08-30
---

# Start with the mechanics

**New to gold or MetaTrader 5? Begin here. You do not need to understand liquidity, BOS, CHoCH, or killzones yet.**

This page gives you the minimum foundation needed to read an XAUUSD trade plan without guessing. Work from top to bottom on a demo account. The goal is not to place a trade today. The goal is to understand exactly what a trade would risk before you press a button.

<div class="foundation-lab" aria-label="Interactive entry stop and target lab">
  <header>
    <div><small>Visual lab 01</small><strong>Entry, invalidation, and target</strong></div>
    <span>Demo example</span>
  </header>
  <div class="order-map" role="img" aria-label="A long trade with target above entry and stop below entry">
    <div class="order-line target" data-label="Target" data-price="2R"></div>
    <div class="order-line entry" data-label="Entry" data-price="0R"></div>
    <div class="order-line stop" data-label="Stop / invalidation" data-price="-1R"></div>
    <div class="order-path"></div>
  </div>
</div>

## 1. What XAUUSD means

`XAU` is gold. `USD` is the US dollar. An XAUUSD quote tells you how many US dollars the feed is quoting for one troy ounce of gold.

Your broker may show `XAUUSD`, `XAUUSD.`, `GOLD`, or another suffix. Those names can describe similar markets while still having different contract sizes, tick values, spreads, and trading hours. **Always open MT5 → Market Watch → Specification before calculating risk.**

## 2. Point, pip, and price move

Gold traders use the word *pip* inconsistently. One person may call a `0.01` move one pip; another may call a `0.10` move one pip. The platform itself gives you safer numbers:

- **Digits** — how many decimals the symbol displays.
- **Point** — the smallest displayed price increment.
- **Tick size** — the minimum tradable price change.
- **Tick value** — the money gained or lost for one tick at a stated lot size.

When somebody says “100 pips,” ask what price distance they mean. A written entry and stop price are clearer than pip slang.

## 3. Lot size is exposure, not risk

A lot controls how much the position gains or loses as price moves. It does **not** tell you the risk by itself. Risk depends on both lot size and the distance from entry to stop loss.

The same `0.10` lot can be a small risk with a tight stop and a much larger risk with a wide structural stop. That is why the MMM research profile treats `0.10` as a ceiling and sizes down when the planned stop would exceed the money-risk cap.

<div class="foundation-lab" aria-label="Gold position risk calculator">
  <header>
    <div><small>Interactive lab 02</small><strong>Estimate lot size from MT5 symbol data</strong></div>
    <span>Check broker specification</span>
  </header>
  <div class="calc-grid">
    <label>Money risk ($)<input id="riskMoney" type="number" min="1" step="1" value="100"></label>
    <label>Entry price<input id="entryPrice" type="number" step="0.01" value="4500"></label>
    <label>Stop price<input id="stopPrice" type="number" step="0.01" value="4490"></label>
    <label>Tick size<input id="tickSize" type="number" min="0.00001" step="0.01" value="0.01"></label>
    <label>Tick value at 1.00 lot ($)<input id="tickValue" type="number" min="0.00001" step="0.01" value="1"></label>
    <label>Broker lot step<input id="lotStep" type="number" min="0.001" step="0.01" value="0.01"></label>
  </div>
  <div class="calc-output" aria-live="polite">
    <div><small>Stop distance</small><strong id="stopDistance">10.00</strong></div>
    <div><small>Risk at 1.00 lot</small><strong id="riskPerLot">$1,000.00</strong></div>
    <div><small>Estimated lot</small><strong id="estimatedLot">0.10</strong></div>
  </div>
  <p class="notice">This is a teaching calculator, not an order command. Enter the tick size, tick value, and lot step shown by your own broker. Confirm the platform's projected loss before submitting any order.</p>
</div>

## 4. Entry, stop loss, and take profit

- **Entry** is the price where the position opens.
- **Stop loss (SL)** is the broker-side exit intended to cap the loss if the idea is wrong.
- **Take profit (TP)** is a broker-side exit at a planned favorable price.
- **Invalidation** is the market condition that makes the setup thesis no longer valid. It should be written before entry.
- **R** is the original planned risk. A `2R` target is twice the entry-to-stop distance.

A stop is not guaranteed to fill at its exact price during gaps or extreme volatility. Slippage is possible. That is another reason to learn on demo before using real or evaluation capital.

## 5. Your first MT5 demo checklist

<ul class="micro-check">
  <li>Confirm you are logged into a demo account.</li>
  <li>Open the exact gold symbol's Specification window.</li>
  <li>Write entry, stop, target, and maximum dollar loss.</li>
  <li>Check lot size against tick value and stop distance.</li>
  <li>Confirm the order has a visible broker-side SL.</li>
  <li>After closing, find the trade in the History tab.</li>
</ul>

## Where to go next

You now know the order mechanics. The next layer is **context**: what the H1 chart is doing before an M15 setup appears. Continue to [H1 Bias Before M15 Execution]({{ '/learn/tracks/read-structure/h1-bias-before-m15/' | relative_url }}).

If a term still feels unclear, do not trade around it. Write it down and ask in the community. Understanding the risk comes before trying to earn the reward.

<script>
(() => {
  const ids=['riskMoney','entryPrice','stopPrice','tickSize','tickValue','lotStep'];
  const el=id=>document.getElementById(id);
  const calculate=()=>{
    const risk=Number(el('riskMoney').value);
    const entry=Number(el('entryPrice').value);
    const stop=Number(el('stopPrice').value);
    const tickSize=Number(el('tickSize').value);
    const tickValue=Number(el('tickValue').value);
    const step=Number(el('lotStep').value);
    const distance=Math.abs(entry-stop);
    const riskPerLot=tickSize>0 ? (distance/tickSize)*tickValue : 0;
    const raw=riskPerLot>0 ? risk/riskPerLot : 0;
    const lots=step>0 ? Math.floor(raw/step)*step : 0;
    el('stopDistance').textContent=Number.isFinite(distance)?distance.toFixed(2):'—';
    el('riskPerLot').textContent=Number.isFinite(riskPerLot)?riskPerLot.toLocaleString(undefined,{style:'currency',currency:'USD'}):'—';
    el('estimatedLot').textContent=Number.isFinite(lots)&&lots>0?lots.toFixed(Math.max(2,(String(step).split('.')[1]||'').length)):'Below minimum';
  };
  ids.forEach(id=>el(id)?.addEventListener('input',calculate));
  calculate();
})();
</script>
