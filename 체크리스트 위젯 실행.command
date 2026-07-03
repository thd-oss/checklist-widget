#!/bin/bash
# 체크리스트 위젯 실행 스크립트
# macOS에서 더블클릭으로 실행하세요.

# 스크립트 위치 기준으로 프로젝트 경로 설정
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"

# Node.js 설치 여부 확인
if ! command -v node &> /dev/null; then
  osascript -e 'display alert "Node.js가 설치되지 않았습니다." message "https://nodejs.org 에서 Node.js를 설치 후 다시 실행해주세요." as critical'
  exit 1
fi

# 의존성 설치 여부 확인 및 자동 설치
if [ ! -d "$SCRIPT_DIR/node_modules" ]; then
  osascript -e 'display notification "첫 실행 시 필요한 파일을 설치합니다. 잠시 기다려 주세요..." with title "체크리스트 위젯"'
  cd "$SCRIPT_DIR" && npm install
fi

# 앱 실행
cd "$SCRIPT_DIR"
npm start
