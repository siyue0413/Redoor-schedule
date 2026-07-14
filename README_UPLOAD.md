# REDOOR Schedule V2

## 변경된 부분
- 현재 달과 이전·다음 달을 배경/글자 색으로 확실히 구분
- 달력 바깥 테두리는 2px 검정
- 달력 안쪽 선은 1px 연회색
- 일정 칸의 불완전한 부분 테두리 대신 검정 태그 사용
- 선택한 일정 칸은 사방 전체에 2px 검정 테두리
- 분류를 LIVE / FESTIVAL / BIRTHDAY로 단순화

## GitHub에 교체할 파일
기존 저장소에 아래 4개를 덮어쓰면 됩니다.

- index.html
- style.css
- events.js
- script.js

## 일정 수정
`events.js`만 수정하세요.

분류:
- `LIVE`: 단독공연
- `FESTIVAL`: 페스티벌 및 대학축제
- `BIRTHDAY`: 멤버 생일
