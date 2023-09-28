const apiServerUrl = 'http://localhost:8080/' // если не продакшн версия то = ''

const manItems = {
  manItem1: {
    list: apiServerUrl + 'images/products/man/1/listItemPreview.png',
    dots: [
      apiServerUrl + 'images/products/man/1/dot_1.png',
      apiServerUrl + 'images/products/man/1/dot_2.png',
      apiServerUrl + 'images/products/man/1/dot_3.png'
    ],
    modalPreviews: {
      slide1: apiServerUrl + 'images/products/man/1/slide_1.png',
      slide2: apiServerUrl + 'images/products/man/1/slide_2.png',
      slide3: apiServerUrl + 'images/products/man/1/slide_3.png'
    },
    introSliderPreview: apiServerUrl + 'images/products/man/1/introSlide.png'
  },
  manItem2: {
    list: apiServerUrl + 'images/products/man/2/listItemPreview.png',
    dots: [
      apiServerUrl + 'images/products/man/2/dot_1.png',
      apiServerUrl + 'images/products/man/2/dot_2.png',
      apiServerUrl + 'images/products/man/2/dot_3.png'
    ],
    modalPreviews: {
      slide1: apiServerUrl + 'images/products/man/2/slide_1.png',
      slide2: apiServerUrl + 'images/products/man/2/slide_2.png',
      slide3: apiServerUrl + 'images/products/man/2/slide_3.png'
    },
    introSliderPreview: apiServerUrl + 'images/products/man/2/introSlide.png'
  },
  manItem3: {
    list: apiServerUrl + 'images/products/man/3/listItemPreview.png',
    dots: [
      apiServerUrl + 'images/products/man/3/dot_1.png',
      apiServerUrl + 'images/products/man/3/dot_2.png',
      apiServerUrl + 'images/products/man/3/dot_3.png'
    ],
    modalPreviews: {
      slide1: apiServerUrl + 'images/products/man/3/slide_1.png',
      slide2: apiServerUrl + 'images/products/man/3/slide_2.png',
      slide3: apiServerUrl + 'images/products/man/3/slide_3.png'
    },
    introSliderPreview: apiServerUrl + 'images/products/man/3/introSlide.png'
  },
  manItem4: {
    list: apiServerUrl + 'images/products/man/4/listItemPreview.png',
    dots: [
      apiServerUrl + 'images/products/man/4/dot_1.png',
      apiServerUrl + 'images/products/man/4/dot_2.png',
      apiServerUrl + 'images/products/man/4/dot_3.png'
    ],
    modalPreviews: {
      slide1: apiServerUrl + 'images/products/man/4/slide_1.png',
      slide2: apiServerUrl + 'images/products/man/4/slide_2.png',
      slide3: apiServerUrl + 'images/products/man/4/slide_3.png'
    },
    introSliderPreview: apiServerUrl + 'images/products/man/4/introSlide.png'
  },
  manItem5: {
    list: apiServerUrl + 'images/products/man/5/listItemPreview.png',
    dots: [
      apiServerUrl + 'images/products/man/5/dot_1.png',
      apiServerUrl + 'images/products/man/5/dot_2.png',
      apiServerUrl + 'images/products/man/5/dot_3.png'
    ],
    modalPreviews: {
      slide1: apiServerUrl + 'images/products/man/5/slide_1.png',
      slide2: apiServerUrl + 'images/products/man/5/slide_2.png',
      slide3: apiServerUrl + 'images/products/man/5/slide_3.png'
    },
    introSliderPreview: apiServerUrl + 'images/products/man/5/introSlide.png'
  },
  manItem6: {
    list: apiServerUrl + 'images/products/man/6/listItemPreview.png',
    dots: [
      apiServerUrl + 'images/products/man/6/dot_1.png',
      apiServerUrl + 'images/products/man/6/dot_2.png',
      apiServerUrl + 'images/products/man/6/dot_3.png'
    ],
    modalPreviews: {
      slide1: apiServerUrl + 'images/products/man/6/slide_1.png',
      slide2: apiServerUrl + 'images/products/man/6/slide_2.png',
      slide3: apiServerUrl + 'images/products/man/6/slide_3.png'
    },
    introSliderPreview: apiServerUrl + 'images/products/man/6/introSlide.png'
  },
}

const womanItems = {
  womanItem1: {
    list: apiServerUrl + 'images/products/woman/1/listItemPreview.png',
    dots: [
      apiServerUrl + 'images/products/woman/1/dot_1.png',
      apiServerUrl + 'images/products/woman/1/dot_2.png',
      apiServerUrl + 'images/products/woman/1/dot_3.png'
    ],
    modalPreviews: {
      slide1: apiServerUrl + 'images/products/woman/1/slide_1.png',
      slide2: apiServerUrl + 'images/products/woman/1/slide_2.png',
      slide3: apiServerUrl + 'images/products/woman/1/slide_3.png'
    },
    introSliderPreview: apiServerUrl + 'images/products/woman/1/introSlide.png'
  },
  womanItem2: {
    list: apiServerUrl + 'images/products/woman/2/listItemPreview.png',
    dots: [
      apiServerUrl + 'images/products/woman/2/dot_1.png',
      apiServerUrl + 'images/products/woman/2/dot_2.png',
      apiServerUrl + 'images/products/woman/2/dot_3.png'
    ],
    modalPreviews: {
      slide1: apiServerUrl + 'images/products/woman/2/slide_1.png',
      slide2: apiServerUrl + 'images/products/woman/2/slide_2.png',
      slide3: apiServerUrl + 'images/products/woman/2/slide_3.png'
    },
    introSliderPreview: apiServerUrl + 'images/products/woman/2/introSlide.png'
  },
  womanItem3: {
    list: apiServerUrl + 'images/products/woman/3/listItemPreview.png',
    dots: [
      apiServerUrl + 'images/products/woman/3/dot_1.png',
      apiServerUrl + 'images/products/woman/3/dot_2.png',
      apiServerUrl + 'images/products/woman/3/dot_3.png'
    ],
    modalPreviews: {
      slide1: apiServerUrl + 'images/products/woman/3/slide_1.png',
      slide2: apiServerUrl + 'images/products/woman/3/slide_2.png',
      slide3: apiServerUrl + 'images/products/woman/3/slide_3.png'
    },
    introSliderPreview: apiServerUrl + 'images/products/woman/3/introSlide.png'
  },
  womanItem4: {
    list: apiServerUrl + 'images/products/woman/4/listItemPreview.png',
    dots: [
      apiServerUrl + 'images/products/woman/4/dot_1.png',
      apiServerUrl + 'images/products/woman/4/dot_2.png',
      apiServerUrl + 'images/products/woman/4/dot_3.png'
    ],
    modalPreviews: {
      slide1: apiServerUrl + 'images/products/woman/4/slide_1.png',
      slide2: apiServerUrl + 'images/products/woman/4/slide_2.png',
      slide3: apiServerUrl + 'images/products/woman/4/slide_3.png'
    },
    introSliderPreview: apiServerUrl + 'images/products/woman/4/introSlide.png'
  },
  womanItem5: {
    list: apiServerUrl + 'images/products/woman/5/listItemPreview.png',
    dots: [
      apiServerUrl + 'images/products/woman/5/dot_1.png',
      apiServerUrl + 'images/products/woman/5/dot_2.png',
      apiServerUrl + 'images/products/woman/5/dot_3.png'
    ],
    modalPreviews: {
      slide1: apiServerUrl + 'images/products/woman/5/slide_1.png',
      slide2: apiServerUrl + 'images/products/woman/5/slide_2.png',
      slide3: apiServerUrl + 'images/products/woman/5/slide_3.png'
    },
    introSliderPreview: apiServerUrl + 'images/products/woman/5/introSlide.png'
  },
  womanItem6: {
    list: apiServerUrl + 'images/products/woman/6/listItemPreview.png',
    dots: [
      apiServerUrl + 'images/products/woman/6/dot_1.png',
      apiServerUrl + 'images/products/woman/6/dot_2.png',
      apiServerUrl + 'images/products/woman/6/dot_3.png'
    ],
    modalPreviews: {
      slide1: apiServerUrl + 'images/products/woman/6/slide_1.png',
      slide2: apiServerUrl + 'images/products/woman/6/slide_2.png',
      slide3: apiServerUrl + 'images/products/woman/6/slide_3.png'
    },
    introSliderPreview: apiServerUrl + 'images/products/woman/6/introSlide.png'
  },
}

const carItems = {
  carItem1: {
    list: apiServerUrl + 'images/products/car/1/listItemPreview.png',
    dots: [
      apiServerUrl + 'images/products/car/1/dot_1.png',
      apiServerUrl + 'images/products/car/1/dot_2.png',
      apiServerUrl + 'images/products/car/1/dot_3.png'
    ],
    modalPreviews: {
      slide1: apiServerUrl + 'images/products/car/1/slide_1.png',
      slide2: apiServerUrl + 'images/products/car/1/slide_2.png',
      slide3: apiServerUrl + 'images/products/car/1/slide_3.png'
    },
    introSliderPreview: apiServerUrl + 'images/products/car/1/introSlide.png'
  },
  carItem2: {
    list: apiServerUrl + 'images/products/car/2/listItemPreview.png',
    dots: [
      apiServerUrl + 'images/products/car/2/dot_1.png',
      apiServerUrl + 'images/products/car/2/dot_2.png',
      apiServerUrl + 'images/products/car/2/dot_3.png'
    ],
    modalPreviews: {
      slide1: apiServerUrl + 'images/products/car/2/slide_1.png',
      slide2: apiServerUrl + 'images/products/car/2/slide_2.png',
      slide3: apiServerUrl + 'images/products/car/2/slide_3.png'
    },
    introSliderPreview: apiServerUrl + 'images/products/car/2/introSlide.png'
  },
  carItem3: {
    list: apiServerUrl + 'images/products/car/3/listItemPreview.png',
    dots: [
      apiServerUrl + 'images/products/car/3/dot_1.png',
      apiServerUrl + 'images/products/car/3/dot_2.png',
      apiServerUrl + 'images/products/car/3/dot_3.png'
    ],
    modalPreviews: {
      slide1: apiServerUrl + 'images/products/car/3/slide_1.png',
      slide2: apiServerUrl + 'images/products/car/3/slide_2.png',
      slide3: apiServerUrl + 'images/products/car/3/slide_3.png'
    },
    introSliderPreview: apiServerUrl + 'images/products/car/3/introSlide.png'
  },
  carItem4: {
    list: apiServerUrl + 'images/products/car/4/listItemPreview.png',
    dots: [
      apiServerUrl + 'images/products/car/4/dot_1.png',
      apiServerUrl + 'images/products/car/4/dot_2.png',
      apiServerUrl + 'images/products/car/4/dot_3.png'
    ],
    modalPreviews: {
      slide1: apiServerUrl + 'images/products/car/4/slide_1.png',
      slide2: apiServerUrl + 'images/products/car/4/slide_2.png',
      slide3: apiServerUrl + 'images/products/car/4/slide_3.png'
    },
    introSliderPreview: apiServerUrl + 'images/products/car/4/introSlide.png'
  },
  carItem5: {
    list: apiServerUrl + 'images/products/car/5/listItemPreview.png',
    dots: [
      apiServerUrl + 'images/products/car/5/dot_1.png',
      apiServerUrl + 'images/products/car/5/dot_2.png',
      apiServerUrl + 'images/products/car/5/dot_3.png'
    ],
    modalPreviews: {
      slide1: apiServerUrl + 'images/products/car/5/slide_1.png',
      slide2: apiServerUrl + 'images/products/car/5/slide_2.png',
      slide3: apiServerUrl + 'images/products/car/5/slide_3.png'
    },
    introSliderPreview: apiServerUrl + 'images/products/car/5/introSlide.png'
  },
  carItem6: {
    list: apiServerUrl + 'images/products/car/6/listItemPreview.png',
    dots: [
      apiServerUrl + 'images/products/car/6/dot_1.png',
      apiServerUrl + 'images/products/car/6/dot_2.png',
      apiServerUrl + 'images/products/car/6/dot_3.png'
    ],
    modalPreviews: {
      slide1: apiServerUrl + 'images/products/car/6/slide_1.png',
      slide2: apiServerUrl + 'images/products/car/6/slide_2.png',
      slide3: apiServerUrl + 'images/products/car/6/slide_3.png'
    },
    introSliderPreview: apiServerUrl + 'images/products/car/6/introSlide.png'
  }
}

//* EXPORT
module.exports = {
  manItems,
  womanItems,
  carItems
}
