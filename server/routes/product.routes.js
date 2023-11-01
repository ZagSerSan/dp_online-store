const express = require('express')
const fs = require('fs/promises')
const fs_notPromis = require("fs"); // Or `import fs from "fs";` with ESM
const path = require('path')
const auth = require('../middleware/auth.middleware')
const chalk = require('chalk')
const Product = require('../models/Product')
const router = express.Router({mergeParams: true})
const { generateProductData, splitString } = require('../utils/helpers');
const User = require('../models/User');

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
  const authedUser = await User.findById(req.user._id)
  // проверка, является ли данный пользователь админом
  if (authedUser.admin) {
    try {
      const { productId } = req.params    
      const editedProduct = await Product.findById(productId)
      const updatedProduct = await Product.findByIdAndUpdate(productId, req.body, {new: true})
      
      // переименовывать папку если изменилось название продукта
      if (editedProduct.name !== updatedProduct.name) {
        let oldFolderName = `./static/images/products/${editedProduct.type}/${splitString(editedProduct.name, ' ', '_')}`
        let newFolderName = `./static/images/products/${editedProduct.type}/${splitString(updatedProduct.name, ' ', '_')}`
    
        fs.rename(`${oldFolderName}`, `${newFolderName}`, err => {
          if(err) throw err; // не удалось переименовать файл
          console.log('Файлы успешно перенесены');
        })
  
        // менять пути к картинкам
        const folderName = splitString(updatedProduct.name, ' ', '_')
        const IMAGES_URL_API = `http://localhost:8080/images/products/${updatedProduct.type}/${folderName}`
        const { preview, sliders, dots, intro } = updatedProduct.filesName
  
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
  
        await Product.findByIdAndUpdate(productId, productImagesPath, {new: false})
      }
  
      // перемещать файлы если изменился тип продукта
      if (editedProduct.type !== updatedProduct.type) {
        let oldFolder = `./static/images/products/${editedProduct.type}/${splitString(updatedProduct.name, ' ', '_')}`
        let newFolder = `./static/images/products/${updatedProduct.type}/${splitString(updatedProduct.name, ' ', '_')}`
  
        // создать папку если её нету
        if (!fs_notPromis.existsSync(newFolder)) {
          await fs.mkdir(newFolder)
        }
  
        const relocateFile = async (oldFolder, newFolder, fileName) => {
          await fs.rename(`${oldFolder}/${fileName}`, `${newFolder}/${fileName}`, err => {
            if(err) throw err; // не удалось переименовать файл
            console.log('Файлы успешно перенесены');
          })
        }
  
        Object.keys(editedProduct.filesName).forEach(filesNamesKey => {
          editedProduct.filesName[filesNamesKey].forEach(fileName => {
  
            relocateFile(oldFolder, newFolder, fileName)
          })
        })
        // удаление старой директории      
        await fs.rm(oldFolder,
          { recursive:true }, 
          (err) => { 
            console.error(err)
          }
        )
      }
  
      res.send(updatedProduct)
    } catch (e) {
      console.log(chalk.red('error'), e)
      res.status(401).json({message: 'Ошибка на сервере'})
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
