# iOS Shortcuts 구현 스펙

## 기술스택
- 런타임: iOS Shortcuts 앱
- 텍스트 전달: Clipboard
- 앱 실행: URL Scheme (`claude://`, `chatgpt://`, `https://gemini.google.com`)

## 구조
홈화면 아이콘 1개 → Choose from Menu → 각 항목 분기

## 구현 패턴
각 메뉴 항목은 동일한 패턴으로 동작한다:
1. 프롬프트 텍스트를 클립보드에 복사 (번역은 클립보드 텍스트를 프롬프트에 결합)
2. 대상 앱 URL Scheme으로 열기
3. 사용자가 앱에서 클립보드 붙여넣기 후 전송

---

## ABSOLUTE RULES

- **NEVER commit secret files.** `.env`, `credentials.json`, `*.pem`, `*.key`, `*secret*`, `*password*` 등 민감 정보가 담긴 파일은 어떠한 경우에도 커밋하지 않는다.
- **main 브랜치에 직접 push 금지.** 모든 변경은 반드시 별도 브랜치에서 PR을 통해 머지한다. `git push origin main` 명령은 사용자가 명시적으로 요청해도 실행하지 않는다.
- **push 전 테스트 필수.** `git push` 전에 반드시 `./gradlew test`를 실행하고, 모든 테스트가 통과한 경우에만 push한다. 테스트 실패 시 push하지 않는다.
- **PR 필수.** push 후에는 반드시 `gh pr create`로 PR을 생성한다. PR 없이 코드를 머지하지 않는다.
