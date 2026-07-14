const monthTitle = document.getElementById("monthTitle");
const calendarGrid = document.getElementById("calendarGrid");
const upcomingList = document.getElementById("upcomingList");
const eventPanel = document.getElementById("eventPanel");
const prevMonthButton = document.getElementById("prevMonth");
const nextMonthButton = document.getElementById("nextMonth");

const now = new Date();
let currentYear = 2026;
let currentMonth = 7; // 0부터 시작: 7은 8월
let selectedDate = null;

const monthNames = [
  "JANUARY", "FEBRUARY", "MARCH", "APRIL", "MAY", "JUNE",
  "JULY", "AUGUST", "SEPTEMBER", "OCTOBER", "NOVEMBER", "DECEMBER"
];

function pad(value) {
  return String(value).padStart(2, "0");
}

function formatDateKey(year, month, date) {
  return `${year}-${pad(month + 1)}-${pad(date)}`;
}

function getEventsByDate(dateKey) {
  return REDOOR_EVENTS.filter(event => event.date === dateKey);
}

function formatUpcomingDate(dateString) {
  const date = new Date(`${dateString}T00:00:00`);
  const month = monthNames[date.getMonth()].slice(0, 3);
  const weekday = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"][date.getDay()];
  return `${month} ${date.getDate()} ${weekday}`;
}

function renderCalendar() {
  monthTitle.textContent = `${monthNames[currentMonth]} ${currentYear}`;
  calendarGrid.innerHTML = "";

  const firstDay = new Date(currentYear, currentMonth, 1).getDay();
  const lastDate = new Date(currentYear, currentMonth + 1, 0).getDate();
  const previousMonthLastDate = new Date(currentYear, currentMonth, 0).getDate();
  const totalCells = 42;

  for (let index = 0; index < totalCells; index += 1) {
    let cellYear = currentYear;
    let cellMonth = currentMonth;
    let cellDate;
    let otherMonth = false;

    if (index < firstDay) {
      cellDate = previousMonthLastDate - firstDay + index + 1;
      cellMonth -= 1;
      otherMonth = true;
      if (cellMonth < 0) {
        cellMonth = 11;
        cellYear -= 1;
      }
    } else if (index >= firstDay + lastDate) {
      cellDate = index - firstDay - lastDate + 1;
      cellMonth += 1;
      otherMonth = true;
      if (cellMonth > 11) {
        cellMonth = 0;
        cellYear += 1;
      }
    } else {
      cellDate = index - firstDay + 1;
    }

    const dateKey = formatDateKey(cellYear, cellMonth, cellDate);
    const events = getEventsByDate(dateKey);

    const cell = document.createElement("button");
    cell.type = "button";
    cell.className = "date-cell";
    cell.setAttribute("aria-label", dateKey);

    if (otherMonth) cell.classList.add("other-month");
    if (events.length > 0) cell.classList.add("has-event");
    if (selectedDate === dateKey) cell.classList.add("selected");

    const number = document.createElement("span");
    number.className = "date-number";
    number.textContent = cellDate;
    cell.appendChild(number);

    if (events.length > 0) {
      const dot = document.createElement("div");
      dot.className = "event-dot";
      cell.appendChild(dot);

      const eventTitle = document.createElement("span");
      eventTitle.className = "cell-event-title";
      eventTitle.textContent = events[0].title;
      cell.appendChild(eventTitle);

      cell.addEventListener("click", () => selectEvent(events[0]));
    } else {
      cell.disabled = true;
    }

    calendarGrid.appendChild(cell);
  }

  renderUpcoming();
}

function renderUpcoming() {
  const monthPrefix = `${currentYear}-${pad(currentMonth + 1)}`;
  const monthEvents = REDOOR_EVENTS
    .filter(event => event.date.startsWith(monthPrefix))
    .sort((a, b) => a.date.localeCompare(b.date));

  upcomingList.innerHTML = "";

  if (monthEvents.length === 0) {
    upcomingList.innerHTML = '<p class="upcoming-meta">등록된 일정이 없습니다.</p>';
    return;
  }

  monthEvents.forEach(event => {
    const item = document.createElement("button");
    item.type = "button";
    item.className = "upcoming-item";
    item.innerHTML = `
      <div class="upcoming-date">● &nbsp;${formatUpcomingDate(event.date)}</div>
      <div>
        <div class="upcoming-title">${event.title}</div>
        <div class="upcoming-meta">${event.location}${event.city ? ` · ${event.city}` : ""}</div>
      </div>
      <div class="upcoming-time">${event.time || ""} &nbsp;›</div>
    `;
    item.addEventListener("click", () => selectEvent(event));
    upcomingList.appendChild(item);
  });
}

function contentLink(label, url) {
  if (!url) {
    return `<span class="content-link disabled"><span>${label}</span><span>준비 중</span></span>`;
  }
  return `<a class="content-link" href="${url}" target="_blank" rel="noopener"><span>${label}</span><span>›</span></a>`;
}

function selectEvent(event) {
  selectedDate = event.date;
  renderCalendar();

  eventPanel.innerHTML = `
    <button class="close-button" type="button" aria-label="상세 닫기">×</button>
    <p class="event-date">${event.date.replaceAll("-", ".")}</p>
    <h2>${event.title}</h2>
    <span class="event-type">${event.type || "SCHEDULE"}</span>

    <div class="detail-list">
      <div class="detail-row">
        <div class="detail-label">TIME</div>
        <div class="detail-value">${event.time || "-"}</div>
      </div>
      <div class="detail-row">
        <div class="detail-label">LOCATION</div>
        <div class="detail-value">${event.location || "-"}</div>
      </div>
      <div class="detail-row">
        <div class="detail-label">TICKET</div>
        <div class="detail-value">
          ${event.ticketUrl
            ? `<a class="ticket-link" href="${event.ticketUrl}" target="_blank" rel="noopener">예매하기 ↗</a>`
            : "예매 링크 없음"}
        </div>
      </div>
      <div class="detail-row">
        <div class="detail-label">MEMO</div>
        <div class="detail-value">${event.memo || "-"}</div>
      </div>
    </div>

    <div class="content-links">
      <h3>EVENT CONTENTS</h3>
      ${contentLink("SETLIST", event.setlistUrl)}
      ${contentLink("PHOTOS", event.photosUrl)}
      ${contentLink("VIDEOS", event.videosUrl)}
      ${contentLink("REVIEWS", event.reviewUrl)}
    </div>
  `;

  eventPanel.querySelector(".close-button").addEventListener("click", () => {
    selectedDate = null;
    renderCalendar();
    eventPanel.innerHTML = `
      <div class="empty-state">
        <p class="eyebrow">REDOOR SCHEDULE</p>
        <h2>일정이 있는 날짜를 선택해주세요.</h2>
        <p>달력의 점이 표시된 날짜를 누르면 상세 일정이 여기에 표시됩니다.</p>
      </div>
    `;
  });

  if (window.innerWidth <= 980) {
    eventPanel.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

prevMonthButton.addEventListener("click", () => {
  currentMonth -= 1;
  if (currentMonth < 0) {
    currentMonth = 11;
    currentYear -= 1;
  }
  selectedDate = null;
  renderCalendar();
});

nextMonthButton.addEventListener("click", () => {
  currentMonth += 1;
  if (currentMonth > 11) {
    currentMonth = 0;
    currentYear += 1;
  }
  selectedDate = null;
  renderCalendar();
});

renderCalendar();
