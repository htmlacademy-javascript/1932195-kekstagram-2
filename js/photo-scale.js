const DEFAULT_SCALE = 1;
const SCALE_STEP = 0.25;

const initPhotoScale = (options) => {
  const {
    scaleControlInput,
    previewImage,
    scaleSmallerButton,
    scaleBiggerButton,
    resetCallback
  } = options;

  let scale = DEFAULT_SCALE;

  const updateScale = (newScale) => {
    scale = newScale;
    previewImage.style.transform = `scale(${scale})`;
    scaleControlInput.value = `${scale * 100}%`;
  };

  const onSmallerClick = () => {
    if (scale > SCALE_STEP) {
      updateScale(scale - SCALE_STEP);
    }
  };

  const onBiggerClick = () => {
    if (scale < 1) {
      updateScale(scale + SCALE_STEP);
    }
  };

  const resetScale = () => {
    updateScale(DEFAULT_SCALE);
  };

  scaleSmallerButton.addEventListener('click', onSmallerClick);
  scaleBiggerButton.addEventListener('click', onBiggerClick);

  if (resetCallback) {
    resetCallback(resetScale);
  }

  return {
    resetScale
  };
};

export { initPhotoScale };
