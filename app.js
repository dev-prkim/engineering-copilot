var PROMPTS = {
  translate: '아래 텍스트를 번역해줘.\n한국어면 영어로, 영어면 한국어로 번역하고\n슬랙에서 쓸 거라 자연스럽고 간결하게 번역해줘:\n\n',
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
  navigator.clipboard.writeText(PROMPTS.translate);
  openApp('chatgpt://');
}

async function refactor() {
  await navigator.clipboard.writeText(PROMPTS.refactor);
  openApp('claude://');
}

async function issueLog() {
  await navigator.clipboard.writeText(PROMPTS.issue);
  openApp('claude://');
}
