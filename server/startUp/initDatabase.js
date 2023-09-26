// 1. У любого пользлвателя будет как миниму в БД qualities & professions
// 2. Они равны mock данным
const Product = require('../models/Product')
const productsMock = require('../mock/productMock.js')

module.exports = async () => {
  const product = await Product.find()
  if (product.length !== productsMock.length) {
    createInitialEntity(Product, productsMock)
  }
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
