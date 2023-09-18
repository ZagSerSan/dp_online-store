// 1. У любого пользлвателя будет как миниму в БД qualities & professions
// 2. Они равны mock данным
// const Profession = require('../models/Profession')
// const Quality = require('../models/Quality')
const Product = require('../models/Product')

// const professionMock = require('../mock/professions.json')
// const qualitieMock = require('../mock/qualities.json')
const productsMock = require('../mock/productMock.js')

//todo 
// console.log('productsMock[4].preview', productsMock[4].preview)
// console.log('professionMock', professionMock)
// console.log('productsMock', typeof productsMock)

module.exports = async () => {
  // const profession = await Profession.find()
  // if (profession.length !== professionMock.length) {
  //   createInitialEntity(Profession, professionMock)
  // }

  //todo
  const product = await Product.find()
  if (product.length !== productsMock.length) {
    createInitialEntity(Product, productsMock)
  }

  // const qualities = await Quality.find()
  // if (qualities.length !== qualitieMock.length) {
  //   createInitialEntity(Quality, qualitieMock)
  // }
}

async function createInitialEntity(Model, data) {
  await Model.collection.drop()
  return Promise.all(
    data.map(async (item) => {
      try {
        delete item._id
        const newItem = new Model(item)
        await newItem.save()
        return newItem
      } catch (e) {
        return e
      }
    })
  )
}
