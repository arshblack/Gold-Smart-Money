const { createClient } = window.supabase;
const db = createClient(window.REFINED_SUPABASE_URL, window.REFINED_SUPABASE_KEY);

const state = { user: null, challenge: null, checkins: [], trades: [] };
const $ = (id) => document.getElementById(id);

function esc(value) {
  return String(value ?? '').replace(/[&<>\"']/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' }[char]));
}

function localDate(date = new Date()) {
  const offset = date.getTimezoneOffset();
  return new Date(date.getTime() - offset * 60000).toISOString().slice(0, 10);
}

function dateLabel(value) {
  return new Intl.DateTimeFormat(undefined, { month: 'short', day: 'numeric', year: 'numeric' }).format(new Date(`${value}T12:00:00`));
}

function daysBetween(start, end) {
  return Math.floor((new Date(`${end}T12:00:00`) - new Date(`${start}T12:00:00`)) / 86400000);
}

function showMessage(id, message, error = false) {
  const node = $(id);
  node.textContent = message;
  node.style.color = error ? 'var(--danger)' : 'var(--aqua)';
}

function toast(message) {
  const node = $('toast');
  node.textContent = message;
  node.classList.add('show');
  window.setTimeout(() => node.classList.remove('show'), 2600);
}

function signedIn(isSignedIn) {
  $('authView').classList.toggle('hidden', isSignedIn);
  $('workspaceView').classList.toggle('hidden', !isSignedIn);
  $('signOutButton').classList.toggle('hidden', !isSignedIn);
}

async function ensureChallenge() {
  const { data: existing, error } = await db.from('challenges').select('*').eq('user_id', state.user.id).eq('status', 'active').order('created_at', { ascending: true }).limit(1).maybeSingle();
  if (error) throw error;
  if (existing) return existing;
  const { data: created, error: createError } = await db.from('challenges').insert({ user_id: state.user.id }).select().single();
  if (createError) throw createError;
  return created;
}

async function loadWorkspace() {
  state.challenge = await ensureChallenge();
  const [checkins, trades] = await Promise.all([
    db.from('daily_checkins').select('*').eq('challenge_id', state.challenge.id).order('checkin_date', { ascending: true }),
    db.from('trades').select('*').eq('challenge_id', state.challenge.id).order('trade_date', { ascending: false }).limit(50)
  ]);
  if (checkins.error) throw checkins.error;
  if (trades.error) throw trades.error;
  state.checkins = checkins.data || [];
  state.trades = trades.data || [];
  renderWorkspace();
}

function processScore() {
  if (!state.checkins.length) return 0;
  const checks = ['pre_trade_plan', 'respected_risk', 'waited_for_confirmation', 'avoided_impulsive_trade', 'post_trade_review'];
  const complete = state.checkins.reduce((sum, row) => sum + checks.filter((key) => row[key]).length, 0);
  return Math.round((complete / (state.checkins.length * checks.length)) * 100);
}

function currentStreak() {
  const dates = new Set(state.checkins.map((item) => item.checkin_date));
  let cursor = new Date(`${localDate()}T12:00:00`);
  if (!dates.has(localDate(cursor))) cursor.setDate(cursor.getDate() - 1);
  let streak = 0;
  while (dates.has(localDate(cursor))) { streak += 1; cursor.setDate(cursor.getDate() - 1); }
  return streak;
}

function renderWorkspace() {
  const today = localDate();
  const elapsed = Math.max(0, Math.min(29, daysBetween(state.challenge.starts_on, today)));
  const dayNumber = elapsed + 1;
  const checked = state.checkins.length;
  const score = processScore();
  const closedTrades = state.trades.filter((trade) => ['win', 'loss', 'breakeven'].includes(trade.outcome));
  const totalR = closedTrades.reduce((sum, trade) => sum + Number(trade.result_r || 0), 0);
  const tradeText = closedTrades.length ? `${totalR >= 0 ? '+' : ''}${totalR.toFixed(2)}R closed result` : 'No closed results yet';
  const percent = Math.round((checked / 30) * 100);
  $('userEmail').textContent = state.user.email || 'Private workspace';
  $('todayLabel').textContent = dateLabel(today);
  $('checkinDate').value = today;
  $('tradeDate').value = today;
  $('dayProgress').textContent = `Day ${dayNumber} of 30`;
  $('progressNote').textContent = checked ? `${checked} day${checked === 1 ? '' : 's'} recorded. Keep the evidence honest.` : 'Begin with today\'s check-in.';
  $('progressBar').style.width = `${percent}%`;
  $('processScore').textContent = `${score}%`;
  $('tradeCount').textContent = state.trades.length;
  $('tradeResult').textContent = tradeText;
  $('streakCount').textContent = `${currentStreak()} day${currentStreak() === 1 ? '' : 's'}`;
  $('completionRing').textContent = `${percent}%`;
  $('reviewCheckins').textContent = checked;
  $('reviewTrades').textContent = state.trades.length;
  $('reviewViolations').textContent = state.trades.filter((trade) => !trade.rule_followed).length;
  renderCheckinForm(today);
  renderDays();
  renderTrades();
}

function renderCheckinForm(today) {
  const row = state.checkins.find((item) => item.checkin_date === today);
  const map = { preTradePlan: 'pre_trade_plan', respectedRisk: 'respected_risk', waitedForConfirmation: 'waited_for_confirmation', avoidedImpulse: 'avoided_impulsive_trade', postTradeReview: 'post_trade_review' };
  Object.entries(map).forEach(([element, key]) => { $(element).checked = Boolean(row?.[key]); });
  $('moodBefore').value = row?.mood_before ?? '';
  $('moodAfter').value = row?.mood_after ?? '';
  $('checkinNotes').value = row?.notes ?? '';
}

function renderDays() {
  const start = new Date(`${state.challenge.starts_on}T12:00:00`);
  const today = localDate();
  const done = new Set(state.checkins.map((item) => item.checkin_date));
  $('dayGrid').innerHTML = Array.from({ length: 30 }, (_, index) => {
    const date = new Date(start); date.setDate(start.getDate() + index);
    const dateValue = localDate(date);
    const classes = ['day-cell'];
    if (done.has(dateValue)) classes.push('complete');
    if (dateValue === today) classes.push('today');
    return `<div class="${classes.join(' ')}" title="${dateLabel(dateValue)}">${index + 1}</div>`;
  }).join('');
}

function renderTrades() {
  if (!state.trades.length) { $('recentTrades').innerHTML = '<p class="empty-state">Your trade record will appear here.</p>'; return; }
  $('recentTrades').innerHTML = state.trades.slice(0, 6).map((trade) => {
    const result = trade.result_r === null || trade.result_r === undefined ? 'Open' : `${Number(trade.result_r) >= 0 ? '+' : ''}${Number(trade.result_r).toFixed(2)}R`;
    const resultClass = trade.result_r > 0 ? 'result-positive' : trade.result_r < 0 ? 'result-negative' : 'result-neutral';
    return `<div class="trade-item"><div><strong>${esc(trade.direction.toUpperCase())} · ${esc(trade.setup_family || 'Unclassified')}</strong><small>${esc(dateLabel(trade.trade_date))} · ${esc(trade.session || 'Session not set')}</small></div><strong class="${resultClass}">${esc(result)}</strong></div>`;
  }).join('');
}

async function handleMagicLink(event) {
  event.preventDefault();
  const email = $('email').value.trim();
  showMessage('authMessage', 'Sending your secure link...');
  const { error } = await db.auth.signInWithOtp({ email, options: { emailRedirectTo: `${window.location.origin}${window.location.pathname}` } });
  if (error) { showMessage('authMessage', error.message, true); return; }
  showMessage('authMessage', 'Check your email. The link will return you to your private tracker.');
}

async function handleCheckin(event) {
  event.preventDefault();
  const payload = { user_id: state.user.id, challenge_id: state.challenge.id, checkin_date: $('checkinDate').value, pre_trade_plan: $('preTradePlan').checked, respected_risk: $('respectedRisk').checked, waited_for_confirmation: $('waitedForConfirmation').checked, avoided_impulsive_trade: $('avoidedImpulse').checked, post_trade_review: $('postTradeReview').checked, mood_before: $('moodBefore').value ? Number($('moodBefore').value) : null, mood_after: $('moodAfter').value ? Number($('moodAfter').value) : null, notes: $('checkinNotes').value.trim() || null };
  const { error } = await db.from('daily_checkins').upsert(payload, { onConflict: 'challenge_id,checkin_date' });
  if (error) { showMessage('checkinMessage', error.message, true); return; }
  showMessage('checkinMessage', 'Check-in saved. The record is yours.');
  await loadWorkspace();
}

async function handleTrade(event) {
  event.preventDefault();
  const payload = { user_id: state.user.id, challenge_id: state.challenge.id, trade_date: $('tradeDate').value, direction: $('direction').value, session: $('session').value, setup_family: $('setupFamily').value.trim() || null, htf_bias: $('htfBias').value, result_r: $('resultR').value ? Number($('resultR').value) : null, outcome: $('outcome').value, entry: $('entry').value ? Number($('entry').value) : null, stop_price: $('stopPrice').value ? Number($('stopPrice').value) : null, rule_followed: $('ruleFollowed').checked, notes: $('tradeNotes').value.trim() || null };
  const { error } = await db.from('trades').insert(payload);
  if (error) { showMessage('tradeMessage', error.message, true); return; }
  showMessage('tradeMessage', 'Trade added to your private journal.');
  event.target.reset(); $('tradeDate').value = localDate(); $('ruleFollowed').checked = true;
  await loadWorkspace();
}

async function copyReviewPrompt() {
  const checkins = state.checkins.slice(-7).map((item) => `- ${item.checkin_date}: plan=${item.pre_trade_plan}, risk=${item.respected_risk}, confirmation=${item.waited_for_confirmation}, impulse-free=${item.avoided_impulsive_trade}, review=${item.post_trade_review}; notes=${item.notes || 'none'}`).join('\n') || '- No check-ins recorded.';
  const trades = state.trades.slice(0, 10).map((item) => `- ${item.trade_date}: ${item.direction} ${item.setup_family || 'unclassified'}, ${item.session || 'unknown'} session, result=${item.result_r ?? 'open'}R, outcome=${item.outcome}, rules_followed=${item.rule_followed}; notes=${item.notes || 'none'}`).join('\n') || '- No trades recorded.';
  const prompt = `You are reviewing my private trading-discipline journal. Do not give trade signals or predict price. Focus on process quality, repeated behaviors, risk discipline, and one practical improvement for next week.\n\nCHECK-INS\n${checkins}\n\nTRADES\n${trades}\n\nReturn: 1) what I followed, 2) where I broke process, 3) the most important repeated pattern, 4) one rule to practice next week, 5) one question I should answer before trading.`;
  try {
    await navigator.clipboard.writeText(prompt);
    showMessage('reviewMessage', 'Prompt copied. Paste it into Claude Pro for your private review.');
  } catch (_error) {
    showMessage('reviewMessage', 'Copy was blocked by the browser. Select the journal text and paste it into Claude Pro.', true);
  }
}

async function boot() {
  $('magicLinkForm').addEventListener('submit', handleMagicLink);
  $('checkinForm').addEventListener('submit', handleCheckin);
  $('tradeForm').addEventListener('submit', handleTrade);
  $('reviewButton').addEventListener('click', copyReviewPrompt);
  $('signOutButton').addEventListener('click', () => db.auth.signOut());
  db.auth.onAuthStateChange(async (_event, session) => {
    state.user = session?.user || null;
    signedIn(Boolean(state.user));
    if (!state.user) return;
    window.setTimeout(async () => {
      try { await loadWorkspace(); } catch (error) { toast(error.message || 'Unable to load your workspace.'); }
    }, 0);
  });
  const { data } = await db.auth.getSession();
  if (data.session) { state.user = data.session.user; signedIn(true); await loadWorkspace(); }
}

boot();
