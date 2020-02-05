const BG_MUSIC_DEFAULT_VOLUME = 0.5;
const EFFECTS_DEFAULT_VOLUME = 0.5;

const runButton = document.querySelector(".run-btn");
const settings = document.querySelector(".settings");
const backgroundMusicInput = document.getElementById("backgroundMusicVolume");
const effectsInput = document.getElementById("effectsVolume");
const effects = document.querySelectorAll("audio");

backgroundMusicInput.value = BG_MUSIC_DEFAULT_VOLUME;
effectsInput.value = EFFECTS_DEFAULT_VOLUME;

const backgroundMusic = new Audio("sounds/background.mp3");
backgroundMusic.volume = BG_MUSIC_DEFAULT_VOLUME;
backgroundMusic.loop = true;
backgroundMusic.muted = true;

const playBackgroundMusic = () => {
  backgroundMusic.play();
  backgroundMusic.muted = false;
};

backgroundMusicInput.addEventListener("input", ({ target }) => {
  const { value } = target;
  backgroundMusic.volume = value;
});

effectsInput.addEventListener("input", ({ target }) => {
  const { value } = target;
  const effects = document.querySelectorAll("audio");
  effects.forEach(effect => (effect.volume = value));
});

runButton.addEventListener("click", () => {
  runButton.classList.add("hidden");
  playBackgroundMusic();

  withDelay(() => {
    settings.classList.remove("hidden");
    initDrums();
  }, 1100);
});
