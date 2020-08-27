const validate = require('../validations/validate')
const Category = require('../models/Category')
const Product = require('../models/Product')

module.exports = {
    create(req, res) {
        //Formato de Promises
        Category.all()
        .then((results) => {
            const categories = results.rows
            return res.render('products/create.njk', { categories })
        })
        .catch((err) => {
            throw new Error(err)
        })
    },
    async post(req, res) {
        const validar = validate.allProperties(req.body, 'Todos os campos deve estar preenchidos!')
        
        if (validar.isValid)
            return res.send(validar.message)

        let results = await Product.create(req.body)
        const product = results.rows[0]

        results = await Category.all()
        const catagories = results.rows

        return res.render('products/create.njk', { product, categories })
    }
}