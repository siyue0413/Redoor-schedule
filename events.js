// REDOOR 일정 데이터
// type: LIVE / FESTIVAL / BIRTHDAY
// ticket:
// - 링크를 알면 URL 입력
// - 링크가 없으면 예매처 이름 입력
// - 필요 없으면 빈칸

const REDOOR_EVENTS = [
  {
    date: "2026-01-01",
    type: "BIRTHDAY",
    title: "이등대 생일",
    yearly: true,
    time: "",
    location: "",
    ticket: ""
  },
  {
    date: "2026-04-17",
    type: "BIRTHDAY",
    title: "박세웅 생일",
    yearly: true,
    time: "",
    location: "",
    ticket: ""
  },
  {
    date: "2026-05-12",
    type: "BIRTHDAY",
    title: "최승현 생일",
    yearly: true,
    time: "",
    location: "",
    ticket: ""
  },
  {
    date: "2026-07-17",
    type: "FESTIVAL",
    title: "Road to BU-ROCK Fukuoka",
    time: "18:30",
    location: "후쿠오카 DRUM LOGOS",
    tickets: [
  { name: "MAHOCAST", url: "https://www.mahocast.com/at/live/1841/12603" }
]
  },
  {
    date: "2026-07-19",
    type: "FESTIVAL",
    title: "SOUNDBERRY FESTA' 26",
    time: "17:50 ~ 18:40",
    location: "KINTEX 제2전시장 Hall 9",
    tickets: [
  { name: "티켓링크", url: "https://www.ticketlink.co.kr/product/62890" },
  { name: "YES24", url: "https://ticket.yes24.com/Perf/58384" },
  { name: "29CM", url: "https://www.29cm.co.kr/products/3973838" },
  { name: "무신사", url: "https://www.musinsa.com/products/6431648" },
  { name: "STAYG", url: "https://www.stayg.tv/channel/onsite/detail/10763" }
]
  },
  {
    date: "2026-07-26",
    type: "LIVE",
    title: "Billboard Live TAIPEI (1st Show)",
    time: "16:00",
    kstTime: "17:00",
    location: "Billboard Live TAIPEI",
    tickets: [
  { name: "Billboard Live", url: "https://www.billboardlivetaipei.tw/tw/events/redoor2026" }
]
  },
  {
    date: "2026-07-26",
    type: "LIVE",
    title: "Billboard Live TAIPEI (2nd Show)",
    time: "19:00",
    kstTime: "20:00",
    location: "Billboard Live TAIPEI",
    tickets: [
  { name: "Billboard Live", url: "https://www.billboardlivetaipei.tw/tw/events/redoor2026" }
]
  },
  {
    date: "2026-08-02",
    type: "FESTIVAL",
    title: "2026 Incheon Pentaport Rock Festival",
    time: "15:50 ~ 16:30",
    location: "송도달빛축제공원",
    tickets: [
  {
    name: "NOL 티켓",
    url: "https://tickets.interpark.com/goods/26006159"
  },
  {
    name: "KB Pay"
  },
  {
    name: "YES24",
    url: "https://ticket.yes24.com/Perf/58497"
  },
  {
    name: "엔티켓(인천 할인)",
    url: "https://ticket2.enticket.com:469/rsvc/rsv_pm_detail.html?pfmIng=1&p_idx=4242"
  },
  {
    name: "NOL WORLD",
    url: "https://world.nol.com/en/ticket/places/26000456/products/26006159"
  },
  {
    name: "MODERN SKY"
  },
  {
    name: "Trip.com"
  },
  {
    name: "eplus"
  }
]
  },
  {
    date: "2026-08-15",
    type: "FESTIVAL",
    title: "2026 Jeonju Ultimate Music Festival",
    time: "추후 공개",
    location: "전주대학교 인조잔디구장",
    tickets: [
  {
    name: "YES24",
    url: "https://ticket.yes24.com/Perf/58283"
  }
]
  },
  {
    date: "2026-08-26",
    type: "BIRTHDAY",
    title: "주상욱 생일",
    yearly: true,
    time: "",
    location: "",
    ticket: ""
  },
  {
    date: "2026-09-06",
    type: "FESTIVAL",
    title: "MADLY MEDLEY 2026",
    time: "추후 공개",
    location: "문화비축기지",
    tickets: [
  { name: "NOL 티켓", url: "https://tickets.interpark.com/goods/26009656" },
  { name: "멜론티켓", url: "https://ticket.melon.com/performance/index.htm?prodId=213522" },
  { name: "카카오톡 선물하기", url: "https://gift.kakao.com/brand/20014" }
]
  }
];
