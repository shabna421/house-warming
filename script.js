/**
 * Housewarming Invitation Web Application
 * Configurable, accessible, and responsive
 */

// ============================================================================
// INVITATION CONFIGURATION - EASY TO EDIT
// Modify the details below to update your invitation automatically!
// ============================================================================
const INVITATION_CONFIG = {
  // Family & House Info
  familyName: "Musthafa & Fathima",
  houseName: "AL-RAHMA",
  
  // Date & Time Breakdown (Classic Layout)
  dayOfWeek: "SUNDAY",
  dayNumber: "15",
  month: "NOVEMBER",
  year: "2026",
  timeDisplay: "AT 11:00 AM",
  timeSubtext: "Lunch & Blessings to follow",

  // Calendar Event Details (for Add to Calendar)
  calendarTitle: "Housewarming celebration - AL-RAHMA",
  calendarDescription: "Join us in celebrating the housewarming of our new home, AL-RAHMA. Your presence and blessings mean the world to us.",
  // Dates in ISO format for Calendar: YYYYMMDDTHHmmss
  eventStartIso: "20261115T110000",
  eventEndIso: "20261115T160000",

  // Venue & Address
  fullAddress: "ARICHOL, KOTTAKKAL",
  addressLines: [
    "ARICHOL",
    "KOTTAKKAL"
  ],
  googleMapsQuery: "ARICHOL, KOTTAKKAL"
};


// ============================================================================
// DOM ELEMENTS
// ============================================================================
document.addEventListener("DOMContentLoaded", () => {
  // Screens
  const screenEntrance = document.getElementById("screen-entrance");
  const screenCard = document.getElementById("screen-card");

  // Grand Entrance Elements
  const touchHint = document.getElementById("touch-hint");
  const btnReplayDoor = document.getElementById("btn-replay-door");

  // Display fields
  const displayFamilyName = document.getElementById("display-family-name");
  const displayHouseName = document.getElementById("display-house-name");
  const displayDay = document.getElementById("display-day");
  const displayDateNumber = document.getElementById("display-date-number");
  const displayMonth = document.getElementById("display-month");
  const displayYear = document.getElementById("display-year");
  const displayTime = document.getElementById("display-time");
  const displayAddress = document.getElementById("display-address");

  // Action Buttons
  const btnCalendar = document.getElementById("btn-calendar");
  const btnMaps = document.getElementById("btn-maps");
  const btnCopy = document.getElementById("btn-copy");
  const copyBtnText = document.getElementById("copy-btn-text");
  const toast = document.getElementById("toast");

  // State
  let isDoorOpening = false;

  // ==========================================================================
  // INITIALIZE DYNAMIC TEXT FROM CONFIG
  // ==========================================================================
  function applyConfig() {
    if (displayFamilyName) displayFamilyName.textContent = INVITATION_CONFIG.familyName;
    if (displayHouseName) displayHouseName.textContent = INVITATION_CONFIG.houseName;
    if (displayDay) displayDay.textContent = INVITATION_CONFIG.dayOfWeek;
    if (displayDateNumber) displayDateNumber.textContent = INVITATION_CONFIG.dayNumber;
    if (displayMonth) displayMonth.textContent = INVITATION_CONFIG.month;
    if (displayYear) displayYear.textContent = INVITATION_CONFIG.year;
    if (displayTime) displayTime.textContent = INVITATION_CONFIG.timeDisplay;
    if (displayAddress) {
      const lines = INVITATION_CONFIG.addressLines && INVITATION_CONFIG.addressLines.length > 0
        ? INVITATION_CONFIG.addressLines
        : [
            "ARICHOL",
            "KOTTAKKAL"
          ];
      displayAddress.innerHTML = lines
        .map(line => `<span class="address-line">${line}</span>`)
        .join("");
    }
  }

  applyConfig();

  // ==========================================================================
  // ELEGANT AUDIO FEEDBACK (Web Audio API Synthesizer - Resonant Acoustic Chime)
  // ==========================================================================
  function playWarmChime() {
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!AudioContext) return;
      const ctx = new AudioContext();

      // Gentle acoustic chime chord: C5 (523Hz), E5 (659Hz), G5 (784Hz), C6 (1046Hz)
      const frequencies = [523.25, 659.25, 783.99, 1046.5];
      const now = ctx.currentTime;

      frequencies.forEach((freq, index) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, now + index * 0.14);

        gain.gain.setValueAtTime(0.0001, now + index * 0.14);
        gain.gain.exponentialRampToValueAtTime(0.07, now + index * 0.14 + 0.08);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + index * 0.14 + 2.2);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now + index * 0.14);
        osc.stop(now + index * 0.14 + 2.3);
      });
    } catch {
      // Audio playback silently bypassed if browser policies restrict
    }
  }

  // ==========================================================================
  // SMOOTH DOOR OPENING -> DIRECT CLEAN REVEAL OF INVITATION (ZERO ARTIFACTS)
  // ==========================================================================
  function openGrandDoors() {
    if (isDoorOpening) return;
    isDoorOpening = true;

    // Trigger Gentle Resonant Chime
    playWarmChime();

    // Trigger background music playback on user interaction
    const bgMusic = document.getElementById("bg-music");
    if (bgMusic) {
      bgMusic.play().catch(e => console.log(e));
    }

    // Immediately hide center seam so it never appears during or after opening
    const seam = screenEntrance.querySelector(".door-center-seam");
    if (seam) seam.style.display = "none";

    // Doors swing wide open smoothly directly revealing Screen 2 behind
    screenEntrance.classList.add("is-opening");

    // Trigger graceful staggered entrance of Screen 2 text elements
    if (screenCard) {
      screenCard.classList.add("is-revealed");
      screenCard.classList.add("active");
    }

    // When doors reach full open position, cleanly complete the transition with zero artifacts
    setTimeout(() => {
      screenEntrance.classList.add("is-opened");
      screenEntrance.classList.remove("active");
      screenEntrance.style.display = "none";
      isDoorOpening = false;
    }, 2600);
  }

  // ==========================================================================
  // BACKGROUND MUSIC TOGGLE CONTROL
  // ==========================================================================
  const btnMusicToggle = document.getElementById("btn-music-toggle");
  const bgMusic = document.getElementById("bg-music");

  function updateMusicToggleState() {
    if (!btnMusicToggle || !bgMusic) return;
    const isPlaying = !bgMusic.paused && !bgMusic.muted;
    btnMusicToggle.classList.toggle("is-playing", isPlaying);
    btnMusicToggle.setAttribute("aria-label", isPlaying ? "Mute background music" : "Play background music");
    btnMusicToggle.setAttribute("title", isPlaying ? "Mute background music" : "Play background music");
  }

  if (btnMusicToggle && bgMusic) {
    btnMusicToggle.addEventListener("click", (e) => {
      e.stopPropagation();
      if (bgMusic.paused) {
        bgMusic.muted = false;
        bgMusic.play().then(() => {
          updateMusicToggleState();
          showToast("Music playing");
        }).catch(e => console.log(e));
      } else {
        bgMusic.pause();
        updateMusicToggleState();
        showToast("Music paused");
      }
    });

    bgMusic.addEventListener("play", updateMusicToggleState);
    bgMusic.addEventListener("pause", updateMusicToggleState);
    bgMusic.addEventListener("volumechange", updateMusicToggleState);
    updateMusicToggleState();
  }

  // Tap anywhere on Screen 1 to open the doors
  if (screenEntrance) {
    screenEntrance.addEventListener("click", openGrandDoors);
    screenEntrance.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        openGrandDoors();
      }
    });
  }

  if (touchHint) {
    touchHint.addEventListener("click", (e) => {
      e.stopPropagation();
      openGrandDoors();
    });
  }

  // ==========================================================================
  // REVISIT DOOR ENTRANCE
  // ==========================================================================
  if (btnReplayDoor) {
    btnReplayDoor.addEventListener("click", () => {
      screenCard.classList.remove("active");
      screenEntrance.classList.remove("is-opening");
      screenEntrance.classList.add("active");
    });
  }

  // ==========================================================================
  // TOAST NOTIFICATION UTILITY
  // ==========================================================================
  let toastTimer = null;
  function showToast(message) {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add("show");

    if (toastTimer) clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toast.classList.remove("show");
    }, 2800);
  }

  // ==========================================================================
  // ACTION BUTTONS: CALENDAR, MAPS, COPY ADDRESS
  // ==========================================================================

  // 1. Copy Address
  if (btnCopy) {
    btnCopy.addEventListener("click", async () => {
      try {
        await navigator.clipboard.writeText(INVITATION_CONFIG.fullAddress);
        if (copyBtnText) copyBtnText.textContent = "Address Copied!";
        showToast("Address copied to clipboard!");
        setTimeout(() => {
          if (copyBtnText) copyBtnText.textContent = "Copy Address";
        }, 2200);
      } catch {
        // Fallback
        showToast("Address: " + INVITATION_CONFIG.fullAddress);
      }
    });
  }

  // 2. Open Google Maps
  if (btnMaps) {
    btnMaps.addEventListener("click", () => {
      const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(INVITATION_CONFIG.googleMapsQuery || INVITATION_CONFIG.fullAddress)}`;
      window.open(mapsUrl, "_blank", "noopener,noreferrer");
    });
  }

  // 3. Add to Calendar (Google Calendar link + .ics fallback)
  if (btnCalendar) {
    btnCalendar.addEventListener("click", () => {
      // Build Google Calendar Web URL
      const gcalUrl = new URL("https://calendar.google.com/calendar/render");
      gcalUrl.searchParams.set("action", "TEMPLATE");
      gcalUrl.searchParams.set("text", INVITATION_CONFIG.calendarTitle);
      gcalUrl.searchParams.set("dates", `${INVITATION_CONFIG.eventStartIso}/${INVITATION_CONFIG.eventEndIso}`);
      gcalUrl.searchParams.set("details", INVITATION_CONFIG.calendarDescription);
      gcalUrl.searchParams.set("location", INVITATION_CONFIG.fullAddress);

      // Also generate .ics download file for iOS/iCal/Outlook
      downloadIcsFile();

      // Open Google Calendar in new tab
      window.open(gcalUrl.toString(), "_blank", "noopener,noreferrer");
      showToast("Adding to Calendar...");
    });
  }

  function downloadIcsFile() {
    const icsContent = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//Housewarming Invitation//EN",
      "CALSCALE:GREGORIAN",
      "BEGIN:VEVENT",
      `SUMMARY:${INVITATION_CONFIG.calendarTitle}`,
      `DESCRIPTION:${INVITATION_CONFIG.calendarDescription}`,
      `LOCATION:${INVITATION_CONFIG.fullAddress}`,
      `DTSTART:${INVITATION_CONFIG.eventStartIso}`,
      `DTEND:${INVITATION_CONFIG.eventEndIso}`,
      "STATUS:CONFIRMED",
      "END:VEVENT",
      "END:VCALENDAR"
    ].join("\r\n");

    const blob = new Blob([icsContent], { type: "text/calendar;charset=utf-8" });
    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute("download", "Housewarming-Invitation.ics");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

});
