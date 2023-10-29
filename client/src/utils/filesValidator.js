export const filesValidator = (data) => {
  // проверка чекбокса
  if (!data.introSlider.switched || (data.introSlider.switched && !!data.images.intro)) {
    // проверка остальных файлов
    if ((!!data.images.preview && !!data.images.sliders && !!data.images.dots)&& (!!data.images.preview.length && !!data.images.sliders.length && !!data.images.dots.length)) {
      if (Object.keys(data.images.dots).length === Object.keys(data.images.sliders).length) {
        return null
      } else {
        return 'Number of sliders and dots must match'
      }
    } else {
      return 'All files is required!'
    }
  } else {
    return 'Checkbox file is required!'
  }
}
