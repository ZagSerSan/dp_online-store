// конфигурация валидатора формы страницы Login.jsx
export const validatorConfig = {
  name: {
    isRequired: {
      // message: 'Name is required!'
      message: 'validate_name_required'
      
    },
    isMinLenght: {
      message: 'validate_name_symbols',
      minValue: 3
    }
  },
  title: {
    isRequired: {
      message: 'validate_name_required'
    },
    isMinLenght: {
      message: 'validate_name_symbols',
      minValue: 3
    }
  },
  value: {
    isRequired: {
      message: 'value_required'
    }
  },
  email: {
    isRequired: {
      message: 'validate_email_required'
    },
    isMail: {
      message: 'validate_email_correct'
    }
  },
  mail: {
    isRequired: {
      message: 'validate_email_required'
    },
    isMail: {
      message: 'validate_email_correct'
    }
  },
  password: {
    isRequired: {
      message: 'validate_password_required'
    },
    isCapitalSymbol: {
      message: 'validate_password_capital'
    },
    isContainDigit: {
      message: 'validate_password_digit'
    },
    isMinLenght: {
      message: 'validate_password_min',
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
