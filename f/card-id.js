// 주소에서 카드 번호 꺼내기: ?c=abcd1234 또는 #abcd1234. 8자리 소문자·숫자가 아니면 null
export function cardIdFrom(search = '', hash = '') {
  const q = new URLSearchParams(search).get('c') || String(hash).replace(/^#/, '');
  const id = String(q || '').toLowerCase();
  return /^[a-z0-9]{8}$/.test(id) ? id : null;
}
export const isIos = (ua = '') => /iPhone|iPad|iPod/i.test(ua);
