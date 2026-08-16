# Live Data Roadmap

The website separates market data from MMM system data.

## Current public implementation

- The embedded TradingView Advanced Chart displays `OANDA:XAUUSD` market context.
- TradingView controls whether its widget data is real-time or delayed for each viewer and feed.
- `data/system-status.json` contains a manually maintained, non-sensitive snapshot of the MMM research state.
- MetaTrader 5 remains the authority for EA execution and realized trade outcomes.

The TradingView widget is not connected to the broker account and must not be presented as an execution feed.

## Planned Cloudflare implementation

1. The private MT5 integration emits a signed operational event.
2. A Cloudflare Worker validates the signature and removes private fields.
3. Cloudflare KV or D1 stores the latest sanitized public state.
4. A read-only endpoint returns only approved website fields.
5. The website polls that endpoint and falls back to the repository snapshot if it is unavailable.

An optional publication delay can hold each event for up to one hour before it becomes visible on the website.

## Approved public fields

- instrument;
- mode: research, demo forward test, or live;
- lifecycle state;
- setup identifier;
- direction after EA confirmation;
- entry, invalidation, and T1/T2/T3 after public confirmation;
- last status timestamp;
- Telegram delivery state;
- closed EA result after reconciliation.

## Fields that remain private

- account credentials or identifiers;
- broker server details;
- Telegram bot token or webhook secret;
- raw strategy score components;
- proprietary thresholds and model internals;
- manual positions;
- account balance and equity;
- unsigned or unreconciled trade events.

The website should fail closed: stale or unavailable data must display `Status update pending`, never a guessed live state.
