# K-pop 이상형월드컵 🎵

## 프로젝트 소개
K-pop 아이돌들의 이상형월드컵입니다. 토너먼트 방식으로 당신의 최애 아이돌을 선택해보세요!

## 주요 기능
- 남자 아이돌, 여자 아이돌, 전체 아이돌 중 선택 가능
- Best16부터 Final까지 토너먼트 진행
- 라운드별 진행 상황 표시
- 우승자와 준우승자 결과 화면
- 결과 공유 기능

## 토너먼트 구조
- **Best16**: 16강 (8경기)
- **Best8**: 8강 (4경기)
- **Best4**: 4강 (2경기)
- **Final**: 결승 (1경기)

## 기술 스택
- React
- TypeScript
- Tailwind CSS
- Vite
- Lucide React (아이콘)

## 실행 방법
```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm run dev

# 프로덕션 빌드
npm run build
```

## 프로젝트 구조
```
src/
├── components/     # 리액트 컴포넌트
├── data/          # 아이돌 데이터
├── types/         # TypeScript 타입 정의
├── utils/         # 유틸리티 함수
└── App.tsx        # 메인 앱 컴포넌트
```

## 컴포넌트 설명
- **StartScreen**: 토너먼트 시작 화면
- **MatchCard**: 대결 화면
- **ProgressBar**: 진행 상황 표시
- **ResultScreen**: 결과 화면
- **IdolCard**: 아이돌 카드 컴포넌트
- **Header**: 헤더 컴포넌트

## 라이선스
MIT License

## 제작자
SG Consulting