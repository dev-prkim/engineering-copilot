beforeEach(() => {
  document.querySelectorAll('.screen').forEach(s => s.classList.add('hidden'));
  document.getElementById('main').classList.remove('hidden');
  document.getElementById('paste-input').value = '';

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

describe('translate', () => {
  test('shows paste screen', () => {
    translate();
    expect(document.getElementById('paste').classList.contains('hidden')).toBe(false);
    expect(document.getElementById('main').classList.contains('hidden')).toBe(true);
  });

  test('does not touch clipboard or open app', () => {
    translate();
    expect(navigator.clipboard.readText).not.toHaveBeenCalled();
    expect(navigator.clipboard.writeText).not.toHaveBeenCalled();
    expect(window.location.href).toBe('');
  });
});

// ---------------------------------------------------------------------------
// confirmPaste
// ---------------------------------------------------------------------------

describe('confirmPaste', () => {
  test('writes prompt + input text to clipboard and opens claude://', async () => {
    document.getElementById('paste-input').value = 'hello world';
    await confirmPaste();
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith(
      PROMPTS.translate + 'hello world'
    );
    expect(window.location.href).toBe('claude://');
  });

  test('clears input and returns to main screen after confirm', async () => {
    document.getElementById('paste-input').value = 'some text';
    await confirmPaste();
    expect(document.getElementById('paste-input').value).toBe('');
    expect(document.getElementById('main').classList.contains('hidden')).toBe(false);
  });

  test('does nothing when input is empty', async () => {
    document.getElementById('paste-input').value = '   ';
    await confirmPaste();
    expect(navigator.clipboard.writeText).not.toHaveBeenCalled();
    expect(window.location.href).toBe('');
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
