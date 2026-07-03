# ✅ 체크리스트 위젯

상위 주제별 하위 체크리스트를 관리하는 데스크탑 위젯입니다.  
**Windows / macOS** 모두 지원합니다.

## 기능

- 📁 주제별 체크리스트 그룹 관리 (색상 구분)
- ✅ 클릭으로 완료 체크 + 취소선 애니메이션
- 🕐 완료 이력 기록 및 필터 조회
- ↩️ 완료 취소 가능
- 💾 데이터 자동 저장 (앱 재시작 후에도 유지)
- 📊 완료율 통계 대시보드
- 🖱️ 드래그로 항목 순서 변경
- 🎨 주제별 색상 커스터마이징

## 다운로드

👉 [Releases](../../releases) 페이지에서 설치 파일을 받으세요.

| 플랫폼 | 파일 |
|---|---|
| Windows (64bit) | `체크리스트 위젯 Setup 1.0.0.exe` |
| macOS (Apple Silicon) | `체크리스트 위젯-1.0.0-arm64.dmg` |

## 설치 방법

### Windows
1. `.exe` 파일 다운로드 후 더블클릭
2. 설치 완료 후 자동 실행
3. 시스템 트레이 우클릭 → **"시작 시 자동 실행"** 체크

> ⚠️ Windows Defender 경고 시 "추가 정보 → 실행" 클릭

### macOS
1. `.dmg` 파일 다운로드 후 더블클릭
2. 앱을 Applications 폴더로 드래그
3. 처음 실행 시: **시스템 설정 → 개인정보 보호 및 보안 → 확인 없이 열기**

## 개발 환경

```bash
# 의존성 설치
npm install

# 개발 모드 실행
npm start

# 빌드
npm run build:mac   # macOS DMG
npm run build:win   # Windows NSIS 설치 파일
```

## 기술 스택

- [Electron](https://electronjs.org/) v36
- Vanilla HTML / CSS / JavaScript
- LocalStorage 데이터 영구 저장
