const express = require('express')
const fs = require('fs/promises')
const fs_notPromis = require("fs")
const path = require('path')
const auth = require('../middleware/auth.middleware')
const chalk = require('chalk')
const Product = require('../models/Product')
const router = express.Router({mergeParams: true})
const { generateProductData, splitString } = require('../utils/helpers')
const User = require('../models/User')

// получение всех продуктов
router.get('/', async (req, res) => {
  try {
    const list = await Product.find()
    res.status(200).send(list)
  } catch (e) {
    res.status(500).json({
      message: 'На сервере проихошла ошибка, попробуйте позже.'
    })
  }
})
// создание информации о продукте
router.post('/createProduct', auth, async (req, res) => {
  const authedUser = await User.findById(req.user._id)
  // проверка, является ли данный пользователь админом
  if (authedUser.admin) {
    try {
    const newProduct = await Product.create({
      ...generateProductData(req.body),
    })

    res.status(201).send(newProduct)
  } catch (e) {
    console.log(e)
    res.status(500).json({
      message: 'На сервере проихошла ошибка, попробуйте позже.',
    })
  }
  // если не является админом:
  } else {
    res.status(401).json({
      message: 'Отказано в доступе.',
    })
  }
})
// сохранение файлов продукта
router.post('/createProductImages', auth, async (req, res) => {
  const authedUser = await User.findById(req.user._id)
  // проверка, является ли данный пользователь админом
  if (authedUser.admin) {
    try {
      const files = req.files
      const { productName, type, folderNum } = req.body

      const folderName = splitString(productName, ' ', '_')
      let path = `./static/images/products/${type}/${folderName}`
      await fs.mkdir(path)

      Object.values(files).forEach(file => {
        let dir = `./static/images/products/${type}/${folderName}/${file.name}`
        fs.writeFile(dir, file.data)
      })

      res.status(201).send(null)
    } catch (e) {
      console.log(e)
      res.status(500).json({
        message: 'На сервере проихошла ошибка, попробуйте позже.',
      })
    }
  // если не является админом:
  } else {
    res.status(401).json({
      message: 'Отказано в доступе.',
    })
  }
})
// обновление продукта
router.put('/:productId', auth, async (req, res) => {
  const { productId } = req.params    
  const authedUser = await User.findById(req.user._id)
  const editedProduct = await Product.findById(productId)

  // проверка, является ли данный пользователь админом
  // или клиент имеет доступ изменять общий рейтинг продукта
  if (authedUser.admin || req.headers?.accessrole === 'edit-rate') {

    // если изменяется рейтинг продукта
    if (req.headers.accessrole) {
      console.log('req.headers.options :>> ', req.headers.options)
      let updatedProduct = await Product.findByIdAndUpdate(productId, req.body, {new: true})
      res.send(updatedProduct)
    } else
    // если тип редакт продукта = картинки
    if (req.headers.images) {
      try {
        // обработка информации о продукте
        if (req.headers.images === 'data') {
          // менять пути к картинкам
          const folderName = splitString(editedProduct.name, ' ', '_')
          const IMAGES_URL_API = `http://localhost:8080/images/products/${editedProduct.type}/${folderName}`
          const { preview, sliders, dots, intro } = req.body.filesName
          // генерация новых данных для обновления
          const generateImagePath = (namesArray, imagesType) => {
            switch (imagesType) {
              case 'intro':
                if (!!intro) {
                  return `${IMAGES_URL_API}/${intro[0]}`
                } else {
                  return `${IMAGES_URL_API}/${preview[0]}`
                }
              case 'preview':
                return `${IMAGES_URL_API}/${preview[0]}`
              case 'dots':
                return namesArray.map(fileName => (
                  `${IMAGES_URL_API}/${fileName}`
                ))
              case 'sliders':
                return namesArray.map((fileName, index) => (
                  {
                    id: `slider_${index + 1}`,
                    preview: `${IMAGES_URL_API}/${fileName}`,
                    title: 'Some title..'
                  }
                ))
              default:
                break;
            }
          }
          const productImagesPath = {
            introSlider: {
              switched: req.body.introSlider.switched,
              slide: generateImagePath(intro, 'intro'),
            },
            preview: generateImagePath(preview, 'preview'),
            slider_dots: generateImagePath(dots, 'dots'),
            slider: generateImagePath(sliders, 'sliders'),
          }
          // обновление инфы продукта
          const newProductEntity = await Product.findByIdAndUpdate(productId, productImagesPath, {new: false})
          res.send(newProductEntity)
        }
        // обработка файлов продукта
        if (req.headers.images === 'files') {
          // удаление старых файлов
          await fs.rm(editedProduct.filesPath,
            { recursive:true }, 
            (err) => { 
              console.error(err); 
            }
          )
          // создание новой папки и запись новых файлов
          await fs.mkdir(editedProduct.filesPath)
          Object.values(req.files).forEach(file => {
            let dir = `${editedProduct.filesPath}/${file.name}`
            fs.writeFile(dir, file.data)
          })
          res.send(null)
        }
      } catch (e) {
        console.log(chalk.red('error'), e)
        res.status(401).json({message: 'Ошибка на сервере'})
      }
    } else
    // если опшины
    if (req.headers.options) {
      const updatedProduct = await Product.findByIdAndUpdate(productId, req.body, {new: true})
      res.send(updatedProduct)
    } else {
      try {
        let updatedProduct = {}
        // если менялись какие-либо зависимости: имя или тип
        if (editedProduct.name !== req.body.name || editedProduct.type !== req.body.type) {
          // если поменялся тип и название одновременно (во избежания конфликтов)
          if (editedProduct.name !== req.body.name && editedProduct.type !== req.body.type) {
            let oldFolderName = `./static/images/products/${editedProduct.type}/${splitString(editedProduct.name, ' ', '_')}`
            let newFolderName = `./static/images/products/${req.body.type}/${splitString(req.body.name, ' ', '_')}`

            // создать папку если её нету
            if (!fs_notPromis.existsSync(newFolderName)) {
              await fs.mkdir(newFolderName)
            }
            // функция пермещения файла
            const relocateFile = async (oldFolder, newFolder, fileName) => {
              await fs.rename(`${oldFolder}/${fileName}`, `${newFolder}/${fileName}`, err => {
                if(err) throw err; // не удалось переименовать файл
                console.log('Файлы успешно перенесены');
              })
            }
            // цикл перемещения
            Object.keys(editedProduct.filesName).forEach(filesNamesKey => {
              editedProduct.filesName[filesNamesKey].forEach(fileName => {
                relocateFile(oldFolderName, newFolderName, fileName)
              })
            })
            // удаление старой директории
            setTimeout(() => {
              fs.rm(oldFolderName,
                { recursive:true }, 
                (err) => { 
                  console.error(err)
                }
              )
            }, 3000)
            
            // менять пути к картинкам
            const folderName = splitString(req.body.name, ' ', '_')
            const IMAGES_URL_API = `http://localhost:8080/images/products/${req.body.type}/${folderName}`
            const { preview, sliders, dots, intro } = editedProduct.filesName
      
            const generateImagePath = (namesArray, imagesType) => {
              switch (imagesType) {
                case 'intro':
                  if (!!intro) {
                    return `${IMAGES_URL_API}/${intro[0]}`
                  } else {
                    return `${IMAGES_URL_API}/${preview[0]}`
                  }
                case 'preview':
                  return `${IMAGES_URL_API}/${preview[0]}`
                case 'dots':
                  return namesArray.map(fileName => (
                    `${IMAGES_URL_API}/${fileName}`
                  ))
                case 'sliders':
                  return namesArray.map((fileName, index) => (
                    {
                      id: `slider_${index + 1}`,
                      preview: `${IMAGES_URL_API}/${fileName}`,
                      title: 'Some title..'
                    }
                  ))
                default:
                  break;
              }
            }
            const productImagesPath = {
              filesPath: newFolderName,
              introSlider: {
                switched: editedProduct.introSlider.switched,
                slide: generateImagePath(intro, 'intro'),
              },
              preview: generateImagePath(preview, 'preview'),
              slider_dots: generateImagePath(dots, 'dots'),
              slider: generateImagePath(sliders, 'sliders'),
            }
            const newProductData = {...req.body, ...productImagesPath}
            updatedProduct = await Product.findByIdAndUpdate(productId, newProductData, {new: true})
          } else
          // если поменялось только название
          if (editedProduct.name !== req.body.name) {
            let oldFolderName = `./static/images/products/${editedProduct.type}/${splitString(editedProduct.name, ' ', '_')}`
            let newFolderName = `./static/images/products/${editedProduct.type}/${splitString(req.body.name, ' ', '_')}`
        
            fs.rename(`${oldFolderName}`, `${newFolderName}`, err => {
              if(err) throw err; // не удалось переименовать файл
              console.log('Файлы успешно перенесены');
            })
      
            // менять пути к картинкам
            const folderName = splitString(req.body.name, ' ', '_')
            const IMAGES_URL_API = `http://localhost:8080/images/products/${req.body.type}/${folderName}`
            const { preview, sliders, dots, intro } = editedProduct.filesName
      
            const generateImagePath = (namesArray, imagesType) => {
              switch (imagesType) {
                case 'intro':
                  if (!!intro) {
                    return `${IMAGES_URL_API}/${intro[0]}`
                  } else {
                    return `${IMAGES_URL_API}/${preview[0]}`
                  }
                case 'preview':
                  return `${IMAGES_URL_API}/${preview[0]}`
                case 'dots':
                  return namesArray.map(fileName => (
                    `${IMAGES_URL_API}/${fileName}`
                  ))
                case 'sliders':
                  return namesArray.map((fileName, index) => (
                    {
                      id: `slider_${index + 1}`,
                      preview: `${IMAGES_URL_API}/${fileName}`,
                      title: 'Some title..'
                    }
                  ))
                default:
                  break;
              }
            }
            const productImagesPath = {
              filesPath: newFolderName,
              introSlider: {
                switched: false,
                slide: generateImagePath(intro, 'intro'),
              },
              preview: generateImagePath(preview, 'preview'),
              slider_dots: generateImagePath(dots, 'dots'),
              slider: generateImagePath(sliders, 'sliders'),
            }
            const newProductData = {...req.body, ...productImagesPath}
            updatedProduct = await Product.findByIdAndUpdate(productId, newProductData, {new: true})
          } else
          // если поменялся только тип
          if (editedProduct.type !== req.body.type) {
            let oldFolder = `./static/images/products/${editedProduct.type}/${splitString(editedProduct.name, ' ', '_')}`
            let newFolder = `./static/images/products/${req.body.type}/${splitString(editedProduct.name, ' ', '_')}`

            // создать папку если её нету
            if (!fs_notPromis.existsSync(newFolder)) {
              await fs.mkdir(newFolder)
            }
            // функция пермещения файла
            const relocateFile = async (oldFolder, newFolder, fileName) => {
              await fs.rename(`${oldFolder}/${fileName}`, `${newFolder}/${fileName}`, err => {
                if(err) throw err; // не удалось переименовать файл
                console.log('Файлы успешно перенесены');
              })
            }
            // цикл перемещения
            Object.keys(editedProduct.filesName).forEach(filesNamesKey => {
              editedProduct.filesName[filesNamesKey].forEach(fileName => {
                relocateFile(oldFolder, newFolder, fileName)
              })
            })
            // удаление старой директории
            setTimeout(() => {
              fs.rm(oldFolder,
                { recursive:true }, 
                (err) => { 
                  console.error(err)
                }
              )
            }, 3000)    
            
            // менять пути к картинкам
            const folderName = splitString(editedProduct.name, ' ', '_')
            const IMAGES_URL_API = `http://localhost:8080/images/products/${req.body.type}/${folderName}`
            const { preview, sliders, dots, intro } = editedProduct.filesName
      
            const generateImagePath = (namesArray, imagesType) => {
              switch (imagesType) {
                case 'intro':
                  if (!!intro) {
                    return `${IMAGES_URL_API}/${intro[0]}`
                  } else {
                    return `${IMAGES_URL_API}/${preview[0]}`
                  }
                case 'preview':
                  return `${IMAGES_URL_API}/${preview[0]}`
                case 'dots':
                  return namesArray.map(fileName => (
                    `${IMAGES_URL_API}/${fileName}`
                  ))
                case 'sliders':
                  return namesArray.map((fileName, index) => (
                    {
                      id: `slider_${index + 1}`,
                      preview: `${IMAGES_URL_API}/${fileName}`,
                      title: 'Some title..'
                    }
                  ))
                default:
                  break;
              }
            }
            const productImagesPath = {
              filesPath: newFolder,
              introSlider: {
                switched: editedProduct.introSlider.switched,
                slide: generateImagePath(intro, 'intro'),
              },
              preview: generateImagePath(preview, 'preview'),
              slider_dots: generateImagePath(dots, 'dots'),
              slider: generateImagePath(sliders, 'sliders'),
            }
            const newProductData = {...req.body, ...productImagesPath}
            updatedProduct = await Product.findByIdAndUpdate(productId, newProductData, {new: true})
          }
          res.send(updatedProduct)
        } else {
          // если зависимости не менялись (например только цена)
          updatedProduct = await Product.findByIdAndUpdate(productId, req.body, {new: true})
          res.send(updatedProduct)
        }
      } catch (e) {
        console.log('e :>> ', e)
        res.status(401).json({message: 'Ошибка на сервере'})
      }
    }
  // если не является админом:
  } else {
    res.status(401).json({
      message: 'Отказано в доступе.',
    })
  }
})
// удаление продукта
router.delete('/:productId', auth, async (req, res) => {
  const authedUser = await User.findById(req.user._id)
  // проверка, является ли данный пользователь админом
  if (authedUser.admin) {
    try {
      const { productId } = req.params
      const removedProduct = await Product.findById(productId)
      
      await fs.rm(removedProduct.filesPath,
        { recursive:true }, 
        (err) => { 
          console.error(err); 
        }
      )
      await removedProduct.deleteOne()
      return res.send(null)
    } catch (e) {
      console.log(chalk.red('error'), e)
      res.status(500).json({
        message: 'На сервере проихошла ошибка, попробуйте позже.'
      })
    }
  // если не является админом:
  } else {
    res.status(401).json({
      message: 'Отказано в доступе.',
    })
  }
})

module.exports = router
