const monthTitle = document.getElementById("monthTitle");
const calendarGrid = document.getElementById("calendarGrid");
const upcomingList = document.getElementById("upcomingList");
const eventPanel = document.getElementById("eventPanel");
const prevMonthButton = document.getElementById("prevMonth");
const nextMonthButton = document.getElementById("nextMonth");

const today = new Date();
let currentYear = today.getFullYear();
let currentMonth = today.getMonth();
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
  return REDOOR_EVENTS.filter(event => {
    if (event.yearly) {
      return event.date.slice(5) === dateKey.slice(5);
    }
    return event.date === dateKey;
  });
}

function formatUpcomingDate(dateString) {
  const date = new Date(`${dateString}T00:00:00`);
  const month = monthNames[date.getMonth()].slice(0, 3);
  const weekday = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"][date.getDay()];
  return `${month} ${date.getDate()} ${weekday}`;
}

function isUrl(value) {
  return /^https?:\/\//i.test(value || "");
}

function ticketHtml(tickets) {
  if (!tickets || tickets.length === 0) return "";

  return `
    <div class="detail-row">
      <div class="detail-label">TICKET</div>
      <div class="detail-value">
        ${tickets
          .map(
            t =>
  t.url
    ? `<a class="ticket-link" href="${t.url}" target="_blank" rel="noopener noreferrer">${t.name}</a>`
    : `<span>${t.name}</span>`
    )
          .join(", ")}
      </div>
    </div>
  `;
}

function optionalDetailRow(label, value) {
  if (!value) return "";
  return `
    <div class="detail-row">
      <div class="detail-label">${label}</div>
      <div class="detail-value">${value}</div>
    </div>
  `;
}

function renderCalendar() {
  monthTitle.textContent = `${pad(currentMonth + 1)} ${monthNames[currentMonth]}`;
  calendarGrid.innerHTML = "";

  const firstDay = new Date(currentYear, currentMonth, 1).getDay();
  const lastDate = new Date(currentYear, currentMonth + 1, 0).getDate();
  const previousMonthLastDate = new Date(currentYear, currentMonth, 0).getDate();
  const totalCells = Math.ceil((firstDay + lastDate) / 7) * 7;

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
    const events = otherMonth ? [] : getEventsByDate(dateKey);

    const cell = document.createElement("button");
    cell.type = "button";
    cell.className = "date-cell";
    cell.setAttribute("aria-label", dateKey);

    if (otherMonth) cell.classList.add("other-month");
    if (events.length > 0) cell.classList.add("has-event");
    const today = new Date();
const todayKey =
  `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;

if (dateKey === todayKey) {
  cell.classList.add("today");
}
    if (selectedDate === dateKey) cell.classList.add("selected");

    const number = document.createElement("span");
    number.className = "date-number";
    number.textContent = cellDate;
    cell.appendChild(number);

    if (events.length > 0) {
      const titleList = document.createElement("span");
      titleList.className = "event-title-list";

      events.forEach((event) => {
        const title = document.createElement("span");
        title.className = "event-title-mini";
        title.textContent = event.title;
        titleList.appendChild(title);
      });

      cell.appendChild(titleList);
      cell.addEventListener("click", () => selectEvents(events));
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
    .sort((a, b) => {
      const dateCompare = a.date.localeCompare(b.date);
      if (dateCompare !== 0) return dateCompare;
      return (a.time || "").localeCompare(b.time || "");
    });

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
      <div class="upcoming-date">${formatUpcomingDate(event.date)}</div>
      <div>
        <div class="upcoming-title">[${event.type}] ${event.title}</div>
        <div class="upcoming-meta">${event.location || ""}</div>
      </div>
      <div class="upcoming-time">${event.time || ""} &nbsp;›</div>
    `;
    item.addEventListener("click", () => selectEvents([event]));
    upcomingList.appendChild(item);
  });
}

function eventBlock(event) {

  let displayTitle = event.title;

  if (event.type === "ANNIVERSARY" && event.startYear) {
    const displayYear = Number(event.date.slice(0, 4));
    const anniversary = displayYear - event.startYear;

    if (anniversary > 0) {
      displayTitle = `${event.title} ${anniversary}주년`;
    }
  }

  return `
    <section class="selected-event">
      <h2>${displayTitle}</h2>
      <span class="event-type">${event.type}</span>

      <div class="detail-list">
        ${optionalDetailRow(
  "TIME",
  event.kstTime
    ? `현지 ${event.time} / 한국 ${event.kstTime}`
    : event.time
)}
        ${optionalDetailRow("LOCATION", event.location)}
        ${ticketHtml(event.tickets)}
      </div>
    </section>
  `;
}

function selectEvents(events) {
  selectedDate = events[0].date;
  renderCalendar();

  eventPanel.innerHTML = `
    <button class="close-button" type="button" aria-label="상세 닫기">×</button>
    <p class="event-date">${selectedDate.replaceAll("-", ".")}</p>
    ${events.map(event => eventBlock(event)).join("")}
  `;

  eventPanel.querySelectorAll(".selected-event").forEach((block, index) => {
    if (index > 0) {
      block.style.marginTop = "42px";
      block.style.paddingTop = "42px";
      block.style.borderTop = "1px solid var(--inner-line)";
    }
  });

  eventPanel.querySelector(".close-button").addEventListener("click", resetPanel);

  if (window.innerWidth <= 980) {
    eventPanel.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

function resetPanel() {
  selectedDate = null;
  renderCalendar();
  eventPanel.innerHTML = `
    <div class="empty-state">
      <h2>일정이 있는 날짜를 선택해주세요.</h2>
      <p>일정이 있는 날짜를 누르면 시간, 장소, 예매 정보가 여기에 표시됩니다.</p>
    </div>
  `;
}

prevMonthButton.addEventListener("click", () => {
  currentMonth -= 1;
  if (currentMonth < 0) {
    currentMonth = 11;
    currentYear -= 1;
  }
  resetPanel();
});

nextMonthButton.addEventListener("click", () => {
  currentMonth += 1;
  if (currentMonth > 11) {
    currentMonth = 0;
    currentYear += 1;
  }
  resetPanel();
});

renderCalendar();
