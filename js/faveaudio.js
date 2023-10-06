const lug_image = document.getElementById('lug-image');
const lug_audio = document.getElementById('lug-audio');

lug_image.addEventListener('click', () => {
  lug_audio.currentTime = 0;
  lug_audio.play();
});

const resh_image = document.getElementById('resh-image');
const resh_audio = document.getElementById('resh-audio');
resh_audio.volume = 0.2;
resh_image.addEventListener('click', () => {
  resh_audio.currentTime = 0;
  resh_audio.play();
});

const lun_image = document.getElementById('lun-image');
const lun_audio = document.getElementById('lun-audio');
lun_audio.volume = 0.2;
lun_image.addEventListener('click', () => {
  lun_audio.currentTime = 0;
  lun_audio.play();
});

const ray_image = document.getElementById('ray-image');
const ray_audio = document.getElementById('ray-audio');
ray_audio.volume = 0.3;
ray_image.addEventListener('click', () => {
  ray_audio.currentTime = 0;
  ray_audio.play();
});