export const tranformOptionsData = (optionTypes) => {
  let optionTypesTransformed = {}

  optionTypes.forEach((optionType, optionTypeIndex) => {
    let optionTypeName = `option_${optionTypeIndex + 1}`

    optionTypesTransformed = {
      ...optionTypesTransformed,
      [optionTypeName]: {
        name: optionType.name,
        placeholder: optionType.placeholder,
        options: {}
      }
    }
    optionType.options.forEach((option, index) => {
      optionTypesTransformed[optionTypeName].options[index] = option
    })
  })

  return optionTypesTransformed
}
