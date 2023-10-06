const b_image = document.getElementById('b-image');
const b_audio = document.getElementById('b-audio');
b_audio.volume = 0.3;
b_image.addEventListener('click', () => {
  b_audio.currentTime = 0;
  b_audio.play();
});

const c_image = document.getElementById('c-image');
const c_audio = document.getElementById('c-audio');
c_audio.volume = 0.3;
c_image.addEventListener('click', () => {
  c_audio.currentTime = 0;
  c_audio.play();
});

const s_image = document.getElementById('s-image');
const s_audio = document.getElementById('s-audio');
s_audio.volume = 0.3;
s_image.addEventListener('click', () => {
  s_audio.currentTime = 0;
  s_audio.play();
});

