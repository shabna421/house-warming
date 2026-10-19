# Housewarming Invitation Website 🏡

A simple, elegant, mobile-friendly housewarming invitation website featuring **Full-Screen Carved Wooden Double Doors** with vintage floral patterns, antique handles, slow graceful 3D opening animation, and a single-view invitation card.

---

## 🎨 Design & Visuals
- **Full-Screen Carved Wooden Doors:** Stretches across the full screen (100vw × 100dvh). Features the exact vintage arch-top shape, hand-carved floral relief panels, polished medium-brown wood tone, and antique bronze door handles meeting symmetrically at the center.
- **Pure Wood Architecture:** All stone walls, bricks, and flowers have been removed to focus entirely on the grand wooden double door entrance.
- **Color Palette:**
  - Warm Ivory: `#FFF9F3`
  - Sage Green: `#87977A`
  - Terracotta: `#B96F55`
  - Dark Brown: `#2D2925`
- **Typography:** *Cormorant Garamond* (headings), *Amiri* (Arabic Bismillah calligraphy), *Plus Jakarta Sans* (clean details).

---

## 📱 Interactive Screens

### Screen 1 — Full-Screen Carved Wooden Doors 🚪
- **Edge-to-Edge Double Doors**: Fills the entire screen with the carved wooden doors (no stone frame, clean wooden texture filling the full screen width and height).
- **Floating Tap Prompt**: Floating frosted glass badge with pulsing beacon: *“Tap the door to open”*.
- **Smooth 2-Second Door Opening Sequence**:
  - Doors swing wide open over **2.0 seconds** (`transition: transform 2s ease-in-out`).
  - Directly reveals the main **Housewarming Invitation Card** screen behind the parting doors with zero intermediate screens or lightbox delays.
  - Gentle acoustic chime chord generated via Web Audio API.
  - Matching **2.0-second JavaScript `setTimeout`** deactivates the door overlay seamlessly.

### Screen 2 — Housewarming Invitation Screen 💌
- **Edge-to-Edge Fluid Layout**: Flows naturally across the full screen with a clean, unconstrained Warm Ivory background (no boxed-in card borders or corner frames).
- **Bismillah Calligraphy**: Arabic text (`بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ`) with subtle English translation.
- *“You’re Invited to Our Housewarming Ceremony”*
- **[Family Name]** and **[House Name]** placeholders.
- Date, Day, Time, and Full Address / Location.
- **Interactive utilities:**
  - 📅 **Add to Calendar**: Pre-fills Google Calendar and downloads an `.ics` event file for Apple Calendar & Outlook.
  - 📍 **Get Directions**: Direct one-tap navigation to Google Maps.
  - 📋 **Copy Address**: One-click address copy with toast confirmation.
  - 🚪 **Revisit Door Entrance**: Return to the grand doors and replay the entrance sequence.

---

## ✏️ Customization

Open [`script.js`](file:///c:/Users/USER/Desktop/house%20waming/script.js) and edit the `INVITATION_CONFIG` block at the top:

```javascript
const INVITATION_CONFIG = {
  familyName: "Musthafa & Fathima",
  houseName: "AL-RAHMA",
  dayOfWeek: "SUNDAY",
  dayNumber: "15",
  month: "NOVEMBER",
  year: "2026",
  timeDisplay: "AT 11:00 AM ONWARDS",
  fullAddress: "Arichol, Kottakkal",
  googleMapsQuery: "Arichol, Kottakkal"
};
```

---

## 🚀 How to Run
Double-click [`index.html`](file:///c:/Users/USER/Desktop/house%20waming/index.html) to open directly in any browser on your computer or phone.
