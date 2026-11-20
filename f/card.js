import { SUPA_URL, SUPA_KEY, PLAY_URL } from './config.js';
import { cardIdFrom, isIos } from './card-id.js';

// 친구가 앱 없이 보는 카드 페이지. 번호로 서버에서 맛·말을 받아 그린다 (글자는 textContent 로만 넣어 안전).
const NAMES = { sundung: '순둥', kkandol: '깐돌' };
const $ = (id) => document.getElementById(id);

async function main() {
  const id = cardIdFrom(location.search, location.hash);
  if (!id) return fail();
  try {
    const r = await fetch(`${SUPA_URL}/functions/v1/friend`, { method: 'POST', headers: { 'Content-Type': 'application/json', apikey: SUPA_KEY }, body: JSON.stringify({ op: 'get', id }) });
    if (!r.ok) return fail();
    const c = await r.json();
    if (!NAMES[c.flavor]) return fail();
    $('card').className = `card is-${c.flavor}`;
    $('tag').textContent = `${NAMES[c.flavor]} · 친구 챙겨 주기`;
    if (c.friend) { $('to').hidden = false; $('to').textContent = `${c.friend}에게`; }
    $('line').textContent = c.line;
    $('card').hidden = false;
    $('msg').hidden = true;
    document.title = `${NAMES[c.flavor]}가 보낸 한마디`;
    $('cta').hidden = false;
    if (isIos(navigator.userAgent)) { $('get').hidden = true; $('ios').hidden = false; } else $('get').href = PLAY_URL;
  } catch {
    fail();
  }
}
function fail() {
  $('msg').textContent = '카드를 찾을 수 없어요. 30일이 지나면 사라져요.';
}
main();
