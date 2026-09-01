const welcome = document.querySelector('#welcome');
const loading = document.querySelector('#loading');
const letter = document.querySelector('#letter');
const progress = document.querySelector('#progress');
const status = document.querySelector('#loading-status');
const soundButton = document.querySelector('#sound-button');
const birthdayMusic = document.querySelector('#birthday-music');
let timer;
let audioContext;
let soundEnabled = true;

function getAudio() {
  audioContext ??= new (window.AudioContext || window.webkitAudioContext)();
  if (audioContext.state === 'suspended') audioContext.resume();
  return audioContext;
}

function chirp(notes, type = 'sine', noteLength = 0.1, volume = 0.045) {
  if (!soundEnabled) return;
  const context = getAudio();
  const now = context.currentTime;
  notes.forEach((frequency, index) => {
    const oscillator = context.createOscillator();
    const gain = context.createGain();
    const start = now + index * noteLength * 0.78;
    oscillator.type = type;
    oscillator.frequency.setValueAtTime(frequency, start);
    gain.gain.setValueAtTime(0.0001, start);
    gain.gain.exponentialRampToValueAtTime(volume, start + 0.015);
    gain.gain.exponentialRampToValueAtTime(0.0001, start + noteLength);
    oscillator.connect(gain).connect(context.destination);
    oscillator.start(start);
    oscillator.stop(start + noteLength + 0.02);
  });
}

function buttonSound() { chirp([659.25, 783.99, 1046.5], 'triangle', 0.09, 0.035); }
function letterSound() { chirp([523.25, 659.25, 783.99, 1046.5], 'sine', 0.14, 0.05); }

function playAmbience() {
  if (!soundEnabled) return;
  birthdayMusic.volume = 0.25;
  birthdayMusic.play().catch(() => {});
}

function stopAmbience() { birthdayMusic.pause(); }

function show(screen) {
  [welcome, loading, letter].forEach((item) => item.classList.remove('is-active'));
  screen.classList.add('is-active');
  if (screen !== letter) stopAmbience();
}

function openLetter() {
  clearTimeout(timer);
  stopAmbience();
  buttonSound();
  show(loading);
  progress.style.width = '0%';
  requestAnimationFrame(() => { progress.style.width = '100%'; });
  status.textContent = 'Looking in the mailbox…';
  setTimeout(() => { status.textContent = 'Found it! Just a moment…'; }, 1650);
  timer = setTimeout(() => {
    show(letter);
    letterSound();
    playAmbience();
  }, 3000);
}

document.querySelector('#open-button').addEventListener('click', openLetter);
document.querySelector('#replay-button').addEventListener('click', () => {
  buttonSound();
  show(welcome);
});
soundButton.addEventListener('click', () => {
  soundEnabled = !soundEnabled;
  soundButton.textContent = soundEnabled ? '♫ Sound on' : '♩ Sound off';
  soundButton.setAttribute('aria-pressed', String(soundEnabled));
  soundButton.setAttribute('aria-label', soundEnabled ? 'Turn background music off' : 'Turn background music on');
  if (soundEnabled) {
    buttonSound();
    playAmbience();
  } else {
    stopAmbience();
  }
});
