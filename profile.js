const profileIntro = document.getElementById("profileIntro");
const introSeenKey = "redoorProfileIntroSeen";
const skipIntroFromNavigation = new URLSearchParams(window.location.search).has("skipIntro");

function hideProfileIntro() {
  if (!profileIntro || profileIntro.classList.contains("is-hidden")) return;

  profileIntro.classList.add("is-hidden");
}

let hasSeenIntro = false;

try {
  hasSeenIntro = sessionStorage.getItem(introSeenKey) === "true";
  sessionStorage.setItem(introSeenKey, "true");
} catch {
  // 내부 메뉴 이동은 URL 표시로도 인트로를 건너뜁니다.
}

if (profileIntro && (hasSeenIntro || skipIntroFromNavigation)) {
  profileIntro.classList.add("is-hidden");
} else if (profileIntro) {
  window.setTimeout(hideProfileIntro, 1200);
  profileIntro.addEventListener("click", hideProfileIntro, { once: true });
  window.addEventListener("touchstart", hideProfileIntro, { once: true, passive: true });
  window.addEventListener("wheel", hideProfileIntro, { once: true, passive: true });
}

if (skipIntroFromNavigation) {
  window.history.replaceState({}, "", window.location.pathname);
}
