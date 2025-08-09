const effectRadios = document.querySelectorAll('input[name="effect"]');
const sliderElement = document.querySelector('.effect-level__slider');
const effectLevel = document.querySelector('.effect-level__value');
const uploadImage = document.querySelector('.img-upload__preview img');
const previewImage = document.querySelector('.img-upload__preview img');
const effectWrapper = document.querySelector('.img-upload__effect-level');

noUiSlider.create(sliderElement, {
  range: { min: 0, max: 100 },
  start: 80,
  step: 1,
  connect: 'lower'
});

const updateImageEffect = () => {
  const level = parseFloat(sliderElement.noUiSlider.get());
  const effect = document.querySelector('input[name="effect"]:checked').value;
  uploadImage.style.filter = '';
  switch (effect) {
    case 'none':
      break;
    case 'chrome':
      uploadImage.style.filter = `grayscale(${level})`;
      break;
    case 'sepia':
      uploadImage.style.filter = `sepia(${level})`;
      break;
    case 'marvin':
      uploadImage.style.filter = `invert(${level}%)`;
      break;
    case 'phobos':
      uploadImage.style.filter = `blur(${level}px)`;
      break;
    case 'heat':
      uploadImage.style.filter = `brightness(${level})`;
      break;
  }
};

export const resetEffects = () => {
  const noneEffectRadio = document.querySelector('input[value="none"]');
  if (noneEffectRadio) {
    noneEffectRadio.checked = true;
  }

  previewImage.style.filter = '';
  effectLevel.value = '';
  effectWrapper.style.display = 'none';
  sliderElement.setAttribute('disabled', true);
  sliderElement.noUiSlider.updateOptions({
    range: { min: 0, max: 100 },
    start: 100,
    step: 1
  });
  sliderElement.noUiSlider.set(100);
};

export const init = () => {
  const defaultEffect = document.querySelector('input[value="none"]');
  if (defaultEffect) {
    defaultEffect.checked = true;
    sliderElement.setAttribute('disabled', true);
    effectWrapper.style.display = 'none';
    uploadImage.style.filter = '';
  }
};

const initEffectRadios = () => {
  effectRadios.forEach((effect) => {
    effect.addEventListener('change', (evt) => {
      const selectedEffect = evt.target.value;
      if (selectedEffect === 'none') {
        sliderElement.setAttribute('disabled', true);
        effectWrapper.style.display = 'none';
        uploadImage.style.filter = '';
      } else {
        effectWrapper.style.display = '';
        sliderElement.removeAttribute('disabled');
        updateImageEffect();
        if (selectedEffect === 'chrome' || selectedEffect === 'sepia') {
          sliderElement.noUiSlider.updateOptions({
            range: { min: 0, max: 1 },
            start: 1,
            step: 0.1
          });
          sliderElement.noUiSlider.set(1);
        } else if (selectedEffect === 'marvin') {
          sliderElement.noUiSlider.updateOptions({
            range: { min: 0, max: 100 },
            start: 100,
            step: 1
          });
          sliderElement.noUiSlider.set(100);
        } else if (selectedEffect === 'phobos') {
          sliderElement.noUiSlider.updateOptions({
            range: { min: 0, max: 3 },
            start: 3,
            step: 0.1
          });
          sliderElement.noUiSlider.set(3);
        } else if (selectedEffect === 'heat') {
          sliderElement.noUiSlider.updateOptions({
            range: { min: 1, max: 3 },
            start: 3,
            step: 0.1
          });
          sliderElement.noUiSlider.set(3);
        }
      }
    });
  });
};

sliderElement.noUiSlider.on('update', () => {
  effectLevel.value = parseFloat(sliderElement.noUiSlider.get());
  updateImageEffect();
});

init();
export {initEffectRadios};
