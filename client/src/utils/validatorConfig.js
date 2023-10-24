// конфигурация валидатора формы страницы Login.jsx
export const validatorConfig = {
  name: {
    isRequired: {
      message: 'Name is required!'
    },
    isMinLenght: {
      message: 'Name must have 3 symbols!',
      minValue: 3
    }
  },
  email: {
    isRequired: {
      message: 'Mail is required!'
    },
    isMail: {
      message: 'Mail is not correct!'
    }
  },
  mail: {
    isRequired: {
      message: 'Mail is required!'
    },
    isMail: {
      message: 'Mail is not correct!'
    }
  },
  password: {
    isRequired: {
      message: 'Password is required!'
    },
    isCapitalSymbol: {
      message: 'Password must have Capital Symbol!'
    },
    isContainDigit: {
      message: 'Password must have digit symbol!'
    },
    isMinLenght: {
      message: 'Password must have min 8 symbols!',
      minValue: 8
    }
  },
  type: {
    isRequired: {
      message: 'type is required!'
    }
  },
  content: {
    isRequired: {
      message: 'content is required!'
    }
  },
  comment: {
    isRequired: {
      message: 'Comment is required!'
    }
  },
  сountry: {
    isRequired: {
      message: 'Comment is required!'
    },
    isMinLenght: {
      message: 'Name must have 3 symbols!',
      minValue: 3
    }
  },
  city: {
    isRequired: {
      message: 'Comment is required!'
    },
    isMinLenght: {
      message: 'Name must have 3 symbols!',
      minValue: 3
    }
  },
  street: {
    isRequired: {
      message: 'Comment is required!'
    },
    isMinLenght: {
      message: 'Name must have 3 symbols!',
      minValue: 3
    }
  },
  houseNumber: {
    isRequired: {
      message: 'Comment is required!'
    }
  },
  description: {
    isRequired: {
      message: 'Description is required!'
    }
  },
  price: {
    isRequired: {
      message: 'Price is required!'
    }
  },
}
