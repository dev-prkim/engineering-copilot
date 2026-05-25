beforeEach(() => {
  document.querySelectorAll('.screen').forEach(s => s.classList.add('hidden'));
  document.getElementById('main').classList.remove('hidden');
  navigator.clipboard.readText.mockReset();
  navigator.clipboard.writeText.mockReset().mockResolvedValue(undefined);
  window.location.href = '';
});

// ---------------------------------------------------------------------------
// showScreen
// ---------------------------------------------------------------------------

describe('showScreen', () => {
  test('hides all screens then shows the target', () => {
    showScreen('ai');
    expect(document.getElementById('main').classList.contains('hidden')).toBe(true);
    expect(document.getElementById('ai').classList.contains('hidden')).toBe(false);
  });

  test('switching back shows main and hides ai', () => {
    showScreen('ai');
    showScreen('main');
    expect(document.getElementById('main').classList.contains('hidden')).toBe(false);
    expect(document.getElementById('ai').classList.contains('hidden')).toBe(true);
  });
});

// ---------------------------------------------------------------------------
// openApp
// ---------------------------------------------------------------------------

describe('openApp', () => {
  test.each([
    ['claude://'],
    ['chatgpt://'],
    ['https://gemini.google.com'],
  ])('sets window.location.href to %s', (url) => {
    openApp(url);
    expect(window.location.href).toBe(url);
  });
});

// ---------------------------------------------------------------------------
// translate
// ---------------------------------------------------------------------------

describe('runTranslate', () => {
  test('opens chatgpt:// and writes translate prompt to clipboard', () => {
    runTranslate();
    expect(window.location.href).toBe('chatgpt://');
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith(PROMPTS.translate);
  });

  test('translate prompt contains slack and language detection instruction', () => {
    expect(PROMPTS.translate).toMatch(/슬랙/);
    expect(PROMPTS.translate).toMatch(/한국어/);
    expect(PROMPTS.translate).toMatch(/영어/);
  });
});

// ---------------------------------------------------------------------------
// refactor
// ---------------------------------------------------------------------------

describe('refactor', () => {
  test('writes refactor prompt to clipboard and opens claude://', async () => {
    await refactor();
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith(PROMPTS.refactor);
    expect(window.location.href).toBe('claude://');
  });
});

// ---------------------------------------------------------------------------
// issueLog
// ---------------------------------------------------------------------------

describe('issueLog', () => {
  test('writes issue prompt to clipboard and opens claude://', async () => {
    await issueLog();
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith(PROMPTS.issue);
    expect(window.location.href).toBe('claude://');
  });
});

// ---------------------------------------------------------------------------
// PROMPTS
// ---------------------------------------------------------------------------

describe('PROMPTS', () => {
  test('translate prompt starts with correct Korean text', () => {
    expect(PROMPTS.translate).toMatch(/^아래 텍스트를 번역해줘/);
  });

  test('refactor prompt starts with correct Korean text', () => {
    expect(PROMPTS.refactor).toMatch(/^아래 코드를 리팩토링해줘/);
  });

  test('issue prompt starts with correct Korean text', () => {
    expect(PROMPTS.issue).toMatch(/^이번 주에 겪은/);
  });
});
