# Birthday Letter Surprise

A cute, mobile-friendly birthday surprise website with an animated letter opening, a mailbox loading scene, a personal message, photo memories, and music.

## Open it

This is a static website—no installation is needed.

1. Open [index.html](index.html) in any modern browser.
2. Tap **Open the letter**.
3. Use the sound button on the final screen to turn music on or off.

## Customize it

- Edit the name and birthday letter in `index.html`.
- Replace the three images in `assets/` and update their `src` attributes in `index.html`.
- Replace `assets/coffee-time.mp3` with another MP3 if you want different background music.
- Adjust colors, card styling, and responsive layout in `styles.css`.
- Adjust the loading timing and sound behavior in `script.js`.

## Project structure

```text
.
├── assets/
│   ├── coffee-time.mp3
│   ├── memory-1.jfif
│   ├── memory-2.jfif
│   └── memory-3.jfif
├── index.html
├── script.js
└── styles.css
```

## Notes

- The background track starts after the visitor taps the opening button, which allows audio to work on iPad and mobile browsers.
- Ensure you have permission to use any photos and music before publishing the website.
