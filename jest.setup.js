const fs = require('fs');
const path = require('path');

document.body.innerHTML = `
  <div class="screen" id="main"></div>
  <div class="screen hidden" id="ai"></div>
`;

Object.defineProperty(navigator, 'clipboard', {
  value: {
    readText: jest.fn(),
    writeText: jest.fn(),
  },
  writable: true,
  configurable: true,
});

delete window.location;
window.location = { href: '' };

const src = fs.readFileSync(path.join(__dirname, 'app.js'), 'utf8');
eval(src);

Object.assign(global, { PROMPTS, showScreen, openApp, runTranslate, refactor, issueLog });
