const express = require('express')
const routes = express.Router()
const productController = require('./app/controllers/ProductController')
const multer = require('./app/middlewares/multer')

routes.get('/', (req, res) => {
    return res.render('layout.njk')
})

routes.get('/products/create', productController.create)
routes.get('/products/:id/edit', productController.edit)
routes.delete('/products', productController.delete)

routes.post('/products', multer.array("photos", 6), productController.post)
routes.put('/products', multer.array("photos", 6), productController.put)

//Alias
routes.get('/ads/create', (req, res) => {
    return res.redirect('/products/create')
})


module.exports = routes