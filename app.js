const PROMPTS = {
  translate: '아래 텍스트를 번역해줘.\n영어면 한국어로, 한국어면 영어로.\n자연스러운 표현으로 번역해줘:\n\n',
  refactor:  '아래 코드를 리팩토링해줘.\n가독성, 재사용성, 성능을 개선하고 이유도 설명해줘:\n',
  issue:     '이번 주에 겪은 기술 이슈들을 정리해줘.\n문제 원인, 해결방법, 배운 점 중심으로 요약해줘.\n',
};

function showScreen(id) {
  document.querySelectorAll('.screen').forEach(s => s.classList.add('hidden'));
  document.getElementById(id).classList.remove('hidden');
}

function toast(msg) {
  const el = document.getElementById('toast');
  el.textContent = msg;
  el.classList.remove('hidden');
  el.classList.add('show');
  setTimeout(() => {
    el.classList.remove('show');
    el.classList.add('hidden');
  }, 2000);
}

function openApp(url) {
  window.location.href = url;
}

async function copyAndOpen(text, url) {
  await navigator.clipboard.writeText(text);
  toast('클립보드에 복사됐어요. Claude에 붙여넣기 하세요.');
  setTimeout(() => openApp(url), 1200);
}

async function translate() {
  try {
    const clip = await navigator.clipboard.readText();
    if (!clip.trim()) throw new Error('empty');
    await copyAndOpen(PROMPTS.translate + clip, 'claude://');
  } catch {
    showScreen('paste');
  }
}

async function confirmPaste() {
  const text = document.getElementById('paste-input').value.trim();
  if (!text) { toast('텍스트를 입력해주세요'); return; }
  document.getElementById('paste-input').value = '';
  showScreen('main');
  await copyAndOpen(PROMPTS.translate + text, 'claude://');
}

async function refactor() {
  await copyAndOpen(PROMPTS.refactor, 'claude://');
}

async function issueLog() {
  await copyAndOpen(PROMPTS.issue, 'claude://');
}
