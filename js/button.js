const button = document.getElementById('button');
const buttonSound = document.getElementById('buttonSound');

button.addEventListener('click', () => {
  buttonSound.currentTime = 0;
  buttonSound.volume = 0.5;
  buttonSound.play();
});