// const imgUploadWrapper = document.querySelector('.img-upload__wrapper');
// const slider = imgUploadWrapper.querySelector('.effect-level__slider');
// const effectLevel = imgUploadWrapper.querySelector('.img-upload__effect-level');
// const effectLevelValue = imgUploadWrapper.querySelector('.effect-level__value');
// const img = imgUploadWrapper.querySelector('.img-upload__preview');

// noUiSlider.create(slider, {
//   start: 0,
//   connect: 'lower',
//   range: {
//     'min': 0,
//     'max': 1,
//   },
//   format: {
//     to: (value) => Number.isInteger(value)
//       ? value.toFixed(0)
//       : value.toFixed(1),
//     from: (value) => parseFloat(value),
//   },
// });

// slider.noUiSlider.on('update', () => {
//   effectLevelValue.value = slider.noUiSlider.get();
// });

// effectLevel.classList.add('hidden');

// const onEffectChange = (evt) => {
//   const effect = evt.target.value;

//   if (effect === 'none') {
//     effectLevel.classList.add('hidden');
//   } else {
//     effectLevel.classList.remove('hidden');
//   }

//   switch (effect) {
//     case 'none':
//       img.style.filter = 'none';
//       break;
//     case 'chrome':
//       slider.noUiSlider.updateOptions({
//         range: {
//           min: 0,
//           max: 1,
//         },
//         start: 0,
//         step: 0.1,
//       });
//       slider.noUiSlider.on('update', () => {
//         img.style.filter = `grayscale(${effectLevelValue.value})`;
//       });
//       break;
//     case 'sepia':
//       slider.noUiSlider.updateOptions({
//         range: {
//           min: 0,
//           max: 1,
//         },
//         start: 0,
//         step: 0.1,
//       });
//       slider.noUiSlider.on('update', () => {
//         img.style.filter = `sepia(${effectLevelValue.value})`;
//       });
//       break;
//     case 'marvin':
//       slider.noUiSlider.updateOptions({
//         range: {
//           min: 0,
//           max: 100,
//         },
//         start: 0,
//         step: 1,
//       });
//       slider.noUiSlider.on('update', () => {
//         img.style.filter = `invert(${effectLevelValue.value}%)`;
//       });
//       break;
//     case 'phobos':
//       slider.noUiSlider.updateOptions({
//         range: {
//           min: 0,
//           max: 3,
//         },
//         start: 0,
//         step: 0.1,
//       });
//       slider.noUiSlider.on('update', () => {
//         img.style.filter = `blur(${effectLevelValue.value}px)`;
//       });
//       break;
//     case 'heat':
//       slider.noUiSlider.updateOptions({
//         range: {
//           min: 1,
//           max: 3,
//         },
//         start: 1,
//         step: 0.1,
//       });
//       slider.noUiSlider.on('update', () => {
//         img.style.filter = `brightness(${effectLevelValue.value})`;
//       });
//   }
// };

// export { onEffectChange };

const uploadForm = document.querySelector('.img-upload__form');
const effectLevel = uploadForm.querySelector('.img-upload__effect-level');
const sliderElement = uploadForm.querySelector('.effect-level__slider');
const effectLevelValue = uploadForm.querySelector('.effect-level__value');
const imgPreview = uploadForm.querySelector('.img-upload__preview img');
const effectsList = uploadForm.querySelector('.effects__list');

let currentEffect = 'none';

const effectSettings = {
  none: { min: 0, max: 1, step: 0.1, start: 1, filter: 'none' },
  chrome: { min: 0, max: 1, step: 0.1, start: 1, filter: 'grayscale', unit: '' },
  sepia: { min: 0, max: 1, step: 0.1, start: 1, filter: 'sepia', unit: '' },
  marvin: { min: 0, max: 100, step: 1, start: 100, filter: 'invert', unit: '%' },
  phobos: { min: 0, max: 3, step: 0.1, start: 3, filter: 'blur', unit: 'px' },
  heat: { min: 1, max: 3, step: 0.1, start: 3, filter: 'brightness', unit: '' }
};

const initSlider = () => {
  noUiSlider.create(sliderElement, {
    range: {
      min: 0,
      max: 1,
    },
    start: 1,
    step: 0.1,
    connect: 'lower',
  });

  effectLevel.classList.add('hidden');

  sliderElement.noUiSlider.on('update', () => {
    effectLevelValue.value = sliderElement.noUiSlider.get();
    if (currentEffect !== 'none') {
      const settings = effectSettings[currentEffect];
      imgPreview.style.filter = `${settings.filter}(${sliderElement.noUiSlider.get()}${settings.unit})`;
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

  sliderElement.noUiSlider.updateOptions({
    range: {
      min: settings.min,
      max: settings.max
    },
    start: settings.start,
    step: settings.step
  });
};

const initEffectsSlider = () => {
  initSlider();
  effectsList.addEventListener('change', onEffectChange);
};

export { initEffectsSlider };
