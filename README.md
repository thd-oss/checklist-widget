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

---

## 📥 설치 방법

### 🪟 Windows (권장: 설치 파일)

👉 [Releases](../../releases) 페이지에서 `체크리스트 위젯 Setup 1.0.0.exe` 다운로드

1. `.exe` 파일 더블클릭 → 설치 진행
2. 설치 완료 후 자동 실행
3. 시스템 트레이 우클릭 → **"시작 시 자동 실행"** 체크

> ⚠️ **Windows Defender 경고 시** "추가 정보 → 실행" 클릭 (개인 서명 없는 정상 앱)

---

### 🍎 macOS (소스 실행 방식)

> **왜 `.app` 파일이 없나요?**  
> Apple Developer 인증서($99/년) 없이 배포된 macOS 앱은  
> Apple Silicon(M1~M4) + macOS Sonoma/Sequoia 환경에서  
> 보안 정책(AMFI)에 의해 실행이 차단됩니다.  
> 아래 소스 실행 방식이 가장 안정적인 정식 방법입니다.

**사전 요구사항**: [Node.js](https://nodejs.org) (LTS 버전 권장)

**설치 및 실행:**
```bash
# 1. 저장소 다운로드
git clone https://github.com/thd-oss/checklist-widget.git
cd checklist-widget

# 2. 의존성 설치
npm install

# 3. 앱 실행
npm start
```

**또는 릴리즈 페이지에서 Source code (zip) 다운로드 후:**
```bash
cd checklist-widget-1.0.0
npm install
npm start
```

**🖱️ Finder에서 더블클릭으로 실행하려면:**

프로젝트 폴더 안의 **`체크리스트 위젯 실행.command`** 파일을 더블클릭하세요.  
처음 실행 시 터미널 창이 잠깐 열리고 앱이 자동으로 시작됩니다.

**🔁 부팅 시 자동 실행 설정:**

시스템 설정 → 일반 → 로그인 항목 → `체크리스트 위젯 실행.command` 추가

---

## 개발 환경

```bash
npm install   # 의존성 설치
npm start     # 개발 모드 실행
npm run build:win   # Windows NSIS 설치 파일 빌드
npm run build:mac   # macOS DMG 빌드 (서명 없음, 참고용)
```

## 기술 스택

- [Electron](https://electronjs.org/) v36
- Vanilla HTML / CSS / JavaScript
- JSON 파일 기반 데이터 영구 저장
