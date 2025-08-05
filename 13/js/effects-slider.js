// const uploadForm = document.querySelector('.img-upload__form');
// const effectLevel = uploadForm.querySelector('.img-upload__effect-level');
// const sliderElement = uploadForm.querySelector('.effect-level__slider');
// const effectLevelValue = uploadForm.querySelector('.effect-level__value');
// const imgPreview = uploadForm.querySelector('.img-upload__preview img');
// const effectsList = uploadForm.querySelector('.effects__list');

// let currentEffect = 'none';

// const effectSettings = {
//   none: { min: 0, max: 1, step: 0.1, start: 1, filter: 'none' },
//   chrome: { min: 0, max: 1, step: 0.1, start: 1, filter: 'grayscale', unit: '' },
//   sepia: { min: 0, max: 1, step: 0.1, start: 1, filter: 'sepia', unit: '' },
//   marvin: { min: 0, max: 100, step: 1, start: 100, filter: 'invert', unit: '%' },
//   phobos: { min: 0, max: 3, step: 0.1, start: 3, filter: 'blur', unit: 'px' },
//   heat: { min: 1, max: 3, step: 0.1, start: 3, filter: 'brightness', unit: '' }
// };

// const initSlider = () => {
//   noUiSlider.create(sliderElement, {
//     range: {
//       min: 0,
//       max: 1,
//     },
//     start: 1,
//     step: 0.1,
//     connect: 'lower',
//   });

//   effectLevel.classList.add('hidden');

//   sliderElement.noUiSlider.on('update', () => {
//     effectLevelValue.value = sliderElement.noUiSlider.get();
//     if (currentEffect !== 'none') {
//       const settings = effectSettings[currentEffect];
//       imgPreview.style.filter = `${settings.filter}(${sliderElement.noUiSlider.get()}${settings.unit})`;
//     }
//   });
// };

// const onEffectChange = (evt) => {
//   if (!evt.target.classList.contains('effects__radio')) {
//     return;
//   }

//   currentEffect = evt.target.value;

//   if (currentEffect === 'none') {
//     effectLevel.classList.add('hidden');
//     imgPreview.style.filter = 'none';
//     return;
//   }

//   effectLevel.classList.remove('hidden');
//   const settings = effectSettings[currentEffect];

//   sliderElement.noUiSlider.updateOptions({
//     range: {
//       min: settings.min,
//       max: settings.max
//     },
//     start: settings.start,
//     step: settings.step
//   });
// };

// const initEffectsSlider = () => {
//   initSlider();
//   effectsList.addEventListener('change', onEffectChange);
// };

// export { initEffectsSlider };

// effects-slider.js
// import noUiSlider from 'nouislider';

const uploadForm = document.querySelector('.img-upload__form');
const effectLevel = uploadForm.querySelector('.img-upload__effect-level');
const sliderElement = uploadForm.querySelector('.effect-level__slider');
const effectLevelValue = uploadForm.querySelector('.effect-level__value');
const imgPreview = uploadForm.querySelector('.img-upload__preview img');
const effectsList = uploadForm.querySelector('.effects__list');

let currentEffect = 'none';
let slider;

const effectSettings = {
  none: { min: 0, max: 1, step: 0.1, start: 1, filter: 'none' },
  chrome: { min: 0, max: 1, step: 0.1, start: 1, filter: 'grayscale', unit: '' },
  sepia: { min: 0, max: 1, step: 0.1, start: 1, filter: 'sepia', unit: '' },
  marvin: { min: 0, max: 100, step: 1, start: 100, filter: 'invert', unit: '%' },
  phobos: { min: 0, max: 3, step: 0.1, start: 3, filter: 'blur', unit: 'px' },
  heat: { min: 1, max: 3, step: 0.1, start: 3, filter: 'brightness', unit: '' }
};

const initSlider = () => {
  if (sliderElement.noUiSlider) {
    sliderElement.noUiSlider.destroy();
  }

  slider = noUiSlider.create(sliderElement, {
    range: {
      min: 0,
      max: 1,
    },
    start: 1,
    step: 0.1,
    connect: 'lower',
  });

  effectLevel.classList.add('hidden');

  slider.on('update', () => {
    effectLevelValue.value = slider.get();
    if (currentEffect !== 'none') {
      const settings = effectSettings[currentEffect];
      imgPreview.style.filter = `${settings.filter}(${slider.get()}${settings.unit})`;
    }
  });
};

const onEffectChange = (evt) => {
  if (!evt.target.classList.contains('effects__radio')) {
    return;
  }

  currentEffect = evt.target.value;

  if (currentEffect === 'none') {
    effectLevel.classList.add('hidden');
    imgPreview.style.filter = 'none';
    return;
  }

  effectLevel.classList.remove('hidden');
  const settings = effectSettings[currentEffect];

  slider.updateOptions({
    range: {
      min: settings.min,
      max: settings.max
    },
    start: settings.start,
    step: settings.step
  });
};

const resetEffects = () => {
  currentEffect = 'none';
  imgPreview.style.filter = 'none';
  effectLevel.classList.add('hidden');
  effectsList.querySelector('#effect-none').checked = true;
};

const initEffectsSlider = () => {
  initSlider();
  effectsList.addEventListener('change', onEffectChange);
};

export { initEffectsSlider, resetEffects };
