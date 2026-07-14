# REDOOR Schedule 업로드 방법

## GitHub에 올릴 파일
아래 4개 파일을 저장소 최상단에 올리세요.

- `index.html`
- `style.css`
- `events.js`
- `script.js`

## 업로드 순서
1. GitHub 저장소의 `Code` 화면으로 이동
2. `Add file` → `Upload files`
3. 위 4개 파일을 한꺼번에 끌어놓기
4. 아래의 `Commit changes` 클릭
5. 1~3분 뒤 GitHub Pages 주소 새로고침

## 일정 수정
`events.js` 파일만 수정하면 됩니다.

예시:

```javascript
{
  date: "2026-08-22",
  type: "LIVE",
  title: "공연 이름",
  time: "18:30",
  location: "공연장",
  city: "SEOUL",
  ticketUrl: "https://예매주소",
  memo: "추가 안내",
  setlistUrl: "",
  photosUrl: "",
  videosUrl: "",
  reviewUrl: ""
}
```

- 날짜는 반드시 `YYYY-MM-DD`
- 링크가 없으면 빈 따옴표 `""`
- 일정 사이에는 쉼표가 필요합니다.
