# Architecture

The private research system is organized into several broad layers. This note describes the structure at a safe public level only.

## Layers

- Market Context Layer: summarizes broad directional, structural, and multi-timeframe context.
- Liquidity Observation Layer: tracks session behavior, activity, range expansion, and other non-sensitive research state.
- Signal Research Layer: classifies potential setups and their lifecycle as research events.
- Execution Layer: MetaTrader 5 hosts the private EA and confirms actual entries and exits.
- Risk Control Layer: constrains exposure and manages operational protections.
- Trade Management Layer: manages open positions according to private rules and records realized outcomes.
- Visualization Layer: TradingView presents research context, setup zones, targets, and invalidation states.
- Notification Layer: Telegram communicates EA-confirmed events and selected management updates.
- Website Layer: presents methodology, education, system status, and dated evidence.
- Documentation and Testing Layer: supports reproducible backtests, demo review, and collaboration.

## Event authority

TradingView may identify a potential setup, but it does not define a completed EA trade. MetaTrader 5 is the source of truth for execution and realized performance. Telegram receives communication events from the EA and must not be treated as an order-routing interface.

## Boundary

This repository does not include private source code, exact conditions, proprietary formulas, credentials, broker configuration, or raw account data.
