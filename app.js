var PROMPTS = {
  translate: '아래 텍스트를 번역해줘.\n영어면 한국어로, 한국어면 영어로.\n자연스러운 표현으로 번역해줘:\n\n',
  refactor:  '아래 코드를 리팩토링해줘.\n가독성, 재사용성, 성능을 개선하고 이유도 설명해줘:\n',
  issue:     '이번 주에 겪은 기술 이슈들을 정리해줘.\n문제 원인, 해결방법, 배운 점 중심으로 요약해줘.\n',
};

function showScreen(id) {
  document.querySelectorAll('.screen').forEach(s => s.classList.add('hidden'));
  document.getElementById(id).classList.remove('hidden');
}

function openApp(url) {
  window.location.href = url;
}

function translate() {
  showScreen('paste');
}

async function confirmPaste() {
  const text = document.getElementById('paste-input').value.trim();
  if (!text) return;
  await navigator.clipboard.writeText(PROMPTS.translate + text);
  document.getElementById('paste-input').value = '';
  showScreen('main');
  openApp('claude://');
}

async function refactor() {
  await navigator.clipboard.writeText(PROMPTS.refactor);
  openApp('claude://');
}

async function issueLog() {
  await navigator.clipboard.writeText(PROMPTS.issue);
  openApp('claude://');
}
