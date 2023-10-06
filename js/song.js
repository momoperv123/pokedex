const audio = document.getElementById("myAudio");
const toggleButton = document.getElementById("toggleButton");
let isPlaying = true;
audio.volume = 0.2;

function toggleMusic() {
  if (isPlaying) {
    audio.pause();
    toggleButton.classList.remove("fa-volume-up");
    toggleButton.classList.add("fa-volume-off");
  } else {
    audio.play();
    toggleButton.classList.remove("fa-volume-off");
    toggleButton.classList.add("fa-volume-up");
  }
  isPlaying = !isPlaying;
  localStorage.setItem("isPlaying", isPlaying);
  localStorage.setItem("currentTime", audio.currentTime);
}

toggleButton.addEventListener("click", toggleMusic);

window.addEventListener("load", function() {
  const storedIsPlaying = localStorage.getItem("isPlaying");
  if (storedIsPlaying === "true") {
    isPlaying = true;
    audio.currentTime = localStorage.getItem("currentTime");
    audio.play();
    toggleButton.classList.remove("fa-volume-off");
    toggleButton.classList.add("fa-volume-up");
  }
});