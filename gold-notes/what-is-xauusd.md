---
permalink: /gold-notes/what-is-xauusd/
title: "What Is XAUUSD?"
description: "A plain-language guide to the XAUUSD gold quote, spot feeds, broker specifications, and what the symbol does and does not tell a trader."
page_type: article
note_number: "01"
content_id: RL-NOTE-01
topic: Foundations
query: "Beginner question · What does XAUUSD mean?"
dek: "XAUUSD is the market shorthand for gold priced in US dollars. The symbol is simple; the product your broker attaches to it is where the important differences begin."
reading_time: 7
published: "2026-08-30"
updated: "2026-08-30"
lesson_url: /learn/start-here/
lesson_title: "Continue to Gold Foundations"
---

<div class="direct-answer">
  <small>The direct answer</small>
  <p><strong>XAU</strong> is the ISO-style market code for gold and <strong>USD</strong> is the US dollar. An XAUUSD quote tells you how many US dollars the feed is quoting for one troy ounce of gold.</p>
</div>

That definition gets you through the symbol. It does not yet tell you the contract size, tick value, trading hours, spread, or whether your platform is showing a broker CFD, an OTC spot reference, or an exchange-traded futures contract. Those details decide how the position behaves in your account.

<div class="note-lab">
  <div class="note-lab-head"><div><small>Interactive quote lab</small><strong>Read the pair before reading the chart</strong></div><span>Illustrative price</span></div>
  <div class="quote-machine">
    <div class="quote-asset"><small>Base asset</small><strong>XAU · Gold</strong></div>
    <div class="quote-divider">priced in</div>
    <div class="quote-price"><small>Quote currency · USD</small><strong data-quote-price>4500.00</strong></div>
  </div>
  <div class="lab-controls">
    <button type="button" data-quote-shift="25" aria-pressed="false">Quote rises</button>
    <button type="button" data-quote-shift="0" aria-pressed="true">No change</button>
    <button type="button" data-quote-shift="-25" aria-pressed="false">Quote falls</button>
  </div>
  <p class="lab-result" data-quote-result>The quote is unchanged. XAUUSD simply expresses gold in US-dollar terms.</p>
</div>

## What rising XAUUSD means

If XAUUSD rises from `4500` to `4510`, gold has become ten US dollars more expensive per quoted ounce on that feed. If it falls from `4500` to `4490`, gold has become ten dollars cheaper in US-dollar terms.

That statement is deliberately narrow. A rising quote does not prove that “banks bought,” that inflation caused the candle, or that a continuation must follow. The quote reports price. The explanation requires more evidence.

## Spot gold is not one universal retail feed

The global wholesale gold market includes a large over-the-counter market, while exchange-traded products such as COMEX gold futures have their own centralized contract specifications. Retail MT5 brokers commonly provide an XAUUSD product based on their own liquidity and contract setup.

That is why two charts can print slightly different highs during a fast move. It is also why a strategy should execute and measure risk using the same broker feed it was configured for.

The symbol name may also change. One broker may use `XAUUSD`; another may add a suffix such as `XAUUSD.` or call it `GOLD`. The familiar name does not guarantee identical trading conditions.

<div class="honesty-note">
  <strong>Evidence boundary</strong>
  <p>A TradingView chart can provide useful context, but the MT5 symbol specification and broker feed control the EA's actual order size, fills, stops, and realized result.</p>
</div>

## The five numbers to check in MT5

Before calculating risk, open the symbol's Specification window and verify:

1. **Digits and point size** — how the price is displayed.
2. **Tick size** — the minimum allowed price change.
3. **Tick value** — the money value of that tick for the stated volume.
4. **Contract size** — what one lot represents for this broker product.
5. **Volume minimum and step** — the smallest position and allowed increments.

The official MQL5 symbol-property reference treats tick size, tick value, contract size, minimum volume, and volume step as separate properties. That is the correct mental model: no single “gold lot rule” can replace the broker's actual specification.

## XAUUSD, GC, and the chart you are using

`XAUUSD` usually refers to a spot-style gold quote or broker product. `GC` is the standard COMEX Gold futures symbol. CME specifies its standard futures contract at 100 troy ounces with pricing in US dollars and cents per ounce.

They are closely related gold markets, but they are not interchangeable feeds. Futures volume is centralized for that exchange contract. The volume shown on a retail XAUUSD chart is commonly tick activity from that feed. Refined Liquidity can use both as context, but it labels them separately.

## What to remember

- XAUUSD means gold priced in US dollars.
- The quote describes price, not the cause of the move.
- Broker product specifications can differ even when the symbol looks familiar.
- Use the execution broker's tick value and contract settings for risk.
- Keep TradingView research separate from MT5 execution evidence.

## Sources and further reading

<ul class="source-list">
  <li><a href="https://www.mql5.com/en/docs/constants/environment_state/marketinfoconstants">MetaQuotes · Symbol properties</a> — tick size, tick value, contract size, and volume properties.</li>
  <li><a href="https://www.cmegroup.com/trading/metals/files/fact-card-gold-futures-options.pdf">CME Group · Gold futures contract specifications</a> — exchange contract size and quotation.</li>
  <li><a href="https://cdn.lbma.org.uk/downloads/Publications/LBMA-The-Guide-2017-v1.pdf">LBMA · Guide to the London precious metals markets</a> — background on the wholesale OTC market.</li>
</ul>
