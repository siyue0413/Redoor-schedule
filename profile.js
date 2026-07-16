const profileIntro = document.getElementById("profileIntro");
const introSeenKey = "redoor-profile-intro-seen";

function hideProfileIntro() {
  if (!profileIntro || profileIntro.classList.contains("is-hidden")) return;

  profileIntro.classList.add("is-hidden");
  sessionStorage.setItem(introSeenKey, "true");
}

if (profileIntro) {
  if (sessionStorage.getItem(introSeenKey) === "true") {
    profileIntro.classList.add("is-hidden");
  } else {
    window.setTimeout(hideProfileIntro, 1200);
    profileIntro.addEventListener("click", hideProfileIntro, { once: true });
    window.addEventListener("touchstart", hideProfileIntro, { once: true, passive: true });
    window.addEventListener("wheel", hideProfileIntro, { once: true, passive: true });
  }
}
