# Refined Liquidity Tracker

This route is the private, user-owned discipline workspace for the Refined Liquidity community.

The public website remains the research and education layer. The tracker adds a 30-day practice loop:

1. Sign in with a Supabase magic link.
2. Complete a daily process check-in.
3. Record private trade decisions and results.
4. Review the week with a Claude-ready prompt.

The tracker does not publish signals, copy trades, or EA performance. EA-confirmed public events remain governed by the MT5 and Telegram boundaries documented in the main repository.

## Branded auth emails

The `email-templates` folder contains production-ready Supabase templates for:

- Confirm signup: `email-templates/confirm-signup.html`
- Returning magic link: `email-templates/magic-link.html`

In Supabase, open **Authentication -> Email Templates**, select each template, paste the matching HTML into the body, and set these subjects:

- `Your Refined Liquidity workspace is ready`
- `Your Refined Liquidity sign-in link`

Keep `{{ .ConfirmationURL }}` unchanged. The default Supabase sender will still show until custom SMTP is configured. For public launch, connect a custom SMTP provider and set the sender name to `Refined Liquidity`.
