# MMM Refined Liquidity Cycle

MMM Refined Liquidity Cycle is the public engineering and education layer for an ongoing MetaTrader 5 research project focused on gold (XAUUSD). It documents the project direction, architecture, testing discipline, and collaboration boundaries without exposing private Expert Advisor source code or proprietary signal logic.

## Overview

The project explores structured market analysis, multi-timeframe context, liquidity behavior, dashboard design, alert workflows, and disciplined testing for a rule-based MT5 Expert Advisor.

The public repository is intentionally limited. It is designed for presentation, collaboration, and safe documentation only.

## What This Project Is About

- Gold-first MetaTrader 5 Expert Advisor research
- Market structure, session, and liquidity-based study
- TradingView research visualization and multi-timeframe context
- Telegram communication for EA-confirmed trade events
- Backtesting, demo forward testing, and documentation discipline
- Educational research around automated trading systems

## What Is Public

- High-level project overview
- General methodology notes
- Safe architecture descriptions
- Collaboration guidelines
- Disclosure boundaries
- Non-sensitive project documentation

## What Remains Private

- Full EA source code
- Exact entry, exit, scoring, and filtering rules
- Risk sizing formulas and account-specific settings
- Broker details, account identifiers, API keys, and Telegram tokens
- Raw backtest exports, private research logs, and optimization files

## Tech Stack

- MetaTrader 5
- MQL5
- GitHub
- Markdown documentation
- TradingView charting and alert workflows
- Telegram alert integration, configured privately
- Strategy Tester and demo forward testing

## High-Level Architecture

The private research system is organized around these broad layers:

- Market context and multi-timeframe layer
- Session and liquidity observation layer
- Signal research and setup lifecycle layer
- MetaTrader execution and risk-control layer
- Trade management and result-recording layer
- TradingView visualization and Telegram notification layer
- Website presentation, documentation, and testing layer

MetaTrader 5 remains the execution authority. TradingView is used for analysis and research setup visualization; a TradingView setup is not a public executed signal until the EA confirms a trade. Telegram is a communication layer, not an execution authority.

## Roadmap

- Keep the public documentation clean and professional
- Maintain clear separation between showcase material and private research code
- Document the gold-first architecture and lifecycle states
- Move sanitized system status to a read-only Cloudflare endpoint
- Add non-sensitive screenshots or dated evidence summaries when approved
- Continue validating the EA through demo forward testing and structured review
- Improve the public website without overstating performance

## Collaboration

Collaboration is welcome around documentation, research process, testing structure, UI presentation, and high-level architecture. Private trading logic, exact signals, credentials, raw account data, and unreleased research remain outside this repository.

## Disclaimer

This project is for research and educational purposes only. Nothing in this repository is financial advice, investment advice, or a guarantee of trading performance. Trading involves risk, and any automated trading system must be tested carefully before use.
