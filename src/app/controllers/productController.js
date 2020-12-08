const { formatPrice, removeFormatPrice } = require('../../lib/utils')
const validate = require('../validations/validate')
const Category = require('../models/Category')
const Product = require('../models/Product')
const File = require('../models/File')

module.exports = {
    create(req, res) {
        //Formato de Promises
        Category.all()
        .then((results) => {
            const categories = results.rows
            return res.render('products/create.njk', { categories })
        })
        .catch((err) => {
            res.send(err)
            throw new Error(err)
        })
    },
    async post(req, res) {
        const properties = validate.AllProperties(req.body, 'Todos os campos deve estar preenchidos!')
        const files = validate.MinLength(req.files.length, 1, 'Por favor, envie pelo menos uma imagem.')
        
        if (properties.isValid) return res.send(properties.message)
        if (files.isValid) return res.send(files.message)

        let results = await Product.create(req.body)
        const productId = results.rows[0].id

        const filesPromise = req.files.map(file => File.create({...file, product_id: productId }))
        await Promise.all(filesPromise)

        results = await Category.all()
        const catagories = results.rows

        return res.redirect(`products/${productId}`)
    },
    async edit(req, res) {
        let results = await Product.find(req.params.id)
        const product = results.rows[0]

        if(!product) return res.send('Produto não encontrado')

        product.old_price = formatPrice(product.old_price)
        product.price = formatPrice(product.price)

        results = await Category.all()
        const categories = results.rows

        results = await Product.files(product.id)
        let fs = results.rows
        fs = fs.map(file => ({
            ...file,
            src: `${req.protocol}://${req.headers.host}${fs.path.replace('public', '')}`
        }))
        
        return res.render('products/edit.njk', { product, categories, files })
    },
    async put(req, res) {
        const validar = validate.allProperties(req.body, 'Todos os campos deve estar preenchidos!')
        
        if (validar.isValid)
            return res.send(validar.message)


        req.body.price = removeFormatPrice(req.body.price)

        if (req.body.old_price !=req.body.price) {
            const oldProduct = await Product.find(req.body.id)
            req.body.old_price = oldProduct.rows[0].price
        }

        await Product.update(req.body) 

        return res.redirect(`products/${req.body.id}/edit`)
    },
    async delete(req, res) {
        await Product.delete(req.body.id)

        return res.redirect('/products/create')
    }
}