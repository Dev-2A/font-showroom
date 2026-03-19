# 🔤 Font ShowRoom

Google Fonts를 탐색하고, 자간·행간·굵기·크기를 슬라이더로 실시간 조절하며
한글/영문/숫자 샘플 텍스트를 비교할 수 있는 폰트 미리보기 쇼룸입니다.

> 백엔드 없이 브라우저만으로 동작합니다.

## 🌐 배포

[**Font ShowRoom 바로가기**](https://Dev-2A.github.io/font-showroom/)

## ✨ 주요 기능

- 🔍 Google Fonts 검색 및 필터링 (한글 subset 지원 폰트)
- 🎛️ 글꼴 크기 · 굵기 · 자간 · 행간 실시간 슬라이더 조절
- 🇰🇷 한글 / 🇺🇸 영문 / 🔢 숫자 샘플 텍스트 비교
- 📊 전체 비교 모드 (한글 + 영문 + 숫자 동시 표시)
- ✏️ 직접 입력 모드 (커스텀 텍스트로 미리보기)
- ⭐ 즐겨찾기 저장 (localStorage)
- 📋 CSS 코드 원클릭 복사 (@import + 속성)
- 📱 반응형 레이아웃 (데스크탑 / 모바일)

## 🛠️ 기술 스택

| 분류 | 기술 |
| ------ | ------ |
| Framework | React + Vite |
| Styling | Tailwind CSS 3.x |
| Font API | Google Fonts API |
| Deploy | GitHub Pages (GitHub Actions) |

## 📁 프로젝트 구조

```text
font-showroom/
├── .github/workflows/
│   └── deploy.yml          # GitHub Pages 배포 워크플로우
├── src/
│   ├── components/
│   │   ├── Layout.jsx      # 전체 레이아웃
│   │   ├── Header.jsx      # 헤더 (선택 폰트 표시)
│   │   ├── FontList.jsx    # 폰트 목록 + 페이지네이션
│   │   ├── FontCard.jsx    # 개별 폰트 카드
│   │   ├── SearchBar.jsx   # 폰트 검색
│   │   ├── FontMeta.jsx    # 폰트 메타정보 (굵기, 문자셋)
│   │   ├── FontControls.jsx # 타이포그래피 슬라이더
│   │   ├── SampleTextTabs.jsx # 샘플 텍스트 탭
│   │   └── CSSCopyButton.jsx # CSS 복사
│   ├── hooks/
│   │   ├── useFonts.js     # Google Fonts 목록 로드
│   │   └── useFavorites.js # 즐겨찾기 관리
│   ├── constants/
│   │   └── sampleTexts.js  # 샘플 텍스트 + 기본 설정값
│   ├── utils/
│   │   └── fontLoader.js   # Google Fonts API + 동적 로딩
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── .env.example
├── .gitignore
├── LICENSE
├── package.json
├── tailwind.config.js
└── vite.config.js
```

## 🚀 시작하기

### 사전 요구사항

- Node.js 18+
- Google Fonts API Key ([발급 안내](https://developers.google.com/fonts/docs/developer_api))

### 설치 및 실행

```bash
# 1. 클론
git clone https://github.com/Dev-2A/font-showroom.git
cd font-showroom

# 2. 의존성 설치
npm install

# 3. 환경변수 설정
cp .env.example .env.local
# .env.local을 열고 VITE_GOOGLE_FONTS_API_KEY에 발급받은 API Key 입력

# 4. 개발 서버 실행
npm run dev
```

## 📸 스크린샷

> 추후 추가 예정

## 라이선스

MIT License © 2026 [Dev-2A](https://github.com/Dev-2A)
