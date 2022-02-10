const router = require('express').Router()
const connection = require('../lib/mysql-connection')

router.get('/getProducts', (req, res) => {
    connection.query('SELECT * FROM products', (error, result) => {
        if(error) return res.status(500).json('Internal Server Error')
        return res.status(201).json(result)
    })
})

module.exports = router