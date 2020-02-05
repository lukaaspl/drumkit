const SOUNDS_DIR = "./sounds";
const SOUND_EXT = "wav";

const sounds = [
  { key: "A", fileName: "boom", label: "Boom" },
  { key: "S", fileName: "clap", label: "Clap" },
  { key: "D", fileName: "hihat", label: "Hihat" },
  { key: "F", fileName: "kick", label: "Kick" },
  { key: "G", fileName: "openhat", label: "Openhat" },
  { key: "H", fileName: "ride", label: "Ride" },
  { key: "J", fileName: "snare", label: "Snare" },
  { key: "K", fileName: "tink", label: "Tink" },
  { key: "L", fileName: "tom", label: "Tom" },
  { key: ";", fileName: "fart", label: "Fart", ext: "mp3" }
];

const withDelay = (callback, delay = 0) => window.setTimeout(callback, delay);

const applyActiveState = keyElement => keyElement.classList.add("active");

const removeActiveState = keyElement => keyElement.classList.remove("active");

const unsetProgress = progressElement => {
  progressElement.style.transitionDuration = `0s`;
  progressElement.classList.remove("active");
};

const setProgress = (progressElement, duration) => {
  unsetProgress(progressElement);
  withDelay(() => {
    progressElement.style.transitionDuration = `${duration}s`;
    progressElement.classList.add("active");
  });
};

const playSound = key => {
  key = key.toUpperCase();
  const keyExists = sounds.find(({ key: _key }) => _key === key) !== undefined;

  if (!keyExists) {
    return;
  }

  const keyElement = document.querySelector(`.key[data-key="${key}"]`);
  const audioElement = document.querySelector(`audio[data-key="${key}"]`);
  const progressElement = keyElement.querySelector(".progress");

  applyActiveState(keyElement);
  setProgress(progressElement, audioElement.duration);
  audioElement.currentTime = 0;
  audioElement.play();
};

const renderAudioElements = () => {
  sounds.forEach(({ key, fileName, ext = SOUND_EXT }) => {
    const node = document.createElement("audio");
    node.dataset.key = key;
    node.src = `${SOUNDS_DIR}/${fileName}.${ext}`;
    node.volume = EFFECTS_DEFAULT_VOLUME;
    node.addEventListener("ended", ({ target }) => {
      const { key } = target.dataset;
      const keyElement = document.querySelector(`.key[data-key="${key}"]`);
      const progressElement = keyElement.querySelector(".progress");
      unsetProgress(progressElement);
      removeActiveState(keyElement);
    });
    document.body.appendChild(node);
  });
};

const renderSoundKeys = () => {
  const container = document.querySelector(".container");

  sounds.forEach(({ key, label }) => {
    const node = document.createElement("div");
    node.className = "key hidden";
    node.dataset.key = key;
    node.innerHTML = `
    <h3 class="letter">${key}</h3>
    <span class="label">${label}</span>
    <div class="progress"</div>`;
    node.addEventListener("click", ({ target }) =>
      playSound(target.dataset.key)
    );
    container.appendChild(node);
  });
};

const unhideSoundKeys = () => {
  const soundKeys = document.querySelectorAll(".key");

  soundKeys.forEach((key, index) => {
    const delay = index * 50;
    withDelay(() => key.classList.remove("hidden"), delay);
  });
};

const initDrums = () => {
  renderAudioElements();
  renderSoundKeys();
  unhideSoundKeys();
  window.addEventListener("keydown", ({ key }) => playSound(key));
};
