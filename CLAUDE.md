## ABSOLUTE RULES

- **NEVER commit secret files.** `.env`, `credentials.json`, `*.pem`, `*.key`, `*secret*`, `*password*` 등 민감 정보가 담긴 파일은 어떠한 경우에도 커밋하지 않는다.
- **main 브랜치에 직접 push 금지.** 모든 변경은 반드시 별도 브랜치에서 PR을 통해 머지한다. `git push origin main` 명령은 사용자가 명시적으로 요청해도 실행하지 않는다.
- **push 전 테스트 필수.** `git push` 전에 반드시 `./gradlew test`를 실행하고, 모든 테스트가 통과한 경우에만 push한다. 테스트 실패 시 push하지 않는다.
- **PR 필수.** push 후에는 반드시 `gh pr create`로 PR을 생성한다. PR 없이 코드를 머지하지 않는다.
