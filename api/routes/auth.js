const router = require('express').Router()
const connection = require('../lib/mysql-connection')
const crypto = require('../lib/crypto')

const jwt = require("jsonwebtoken");
let uuid = require('uuid').v4;
const faker = require('faker');

router.post('/register', (req, res) => {
    connection.query("SELECT * FROM users WHERE email = ?", [req.body.email], (error, result) => {
        if(error) return res.status(500).send('Internal Server Error')
        if(result.length > 0) return res.status(400).send('Email in use')
        else {
            let data = {}
            data.id = uuid()
            data.name = req.body.name
            data.lastName = req.body['lastName']
            data.username = req.body.username
            data.email = req.body.email
            data.salt = faker.address.streetName()
            data.password = crypto.encrypt(req.body.password, data.salt)

            connection.query('INSERT INTO users set ?', data, (error, result) => {
                if(error) return res.status(500).send('Internal Server Error')
                return res.status(201).send('created successfully')
            })
        }
    })
})

router.post('/login', (req, res) => {
    connection.query("SELECT * FROM users WHERE email = ?", [req.body.email], (error, user) => {
        if(error) return res.status(500).send('Internal Server Error')
        if(!user.length) return res.status(400).send('Email or password are incorrect')

        if(user.length > 0) {
            let foundUser = user[0]
            let originalPass = crypto.compare(req.body.password, foundUser.salt,foundUser.password).toString()
            if(originalPass) {
                connection.query("SELECT * FROM users WHERE password = ?", [foundUser.password], (error, user) => {
                    if(error) return res.status(500).send('Internal Server Error')
                    if(user.length < 0) return res.status(400).send('Email or password are incorrect')
                    
                    const accessToken = jwt.sign(
                        {
                            id: user.id,
                            email: user.email
                        },
                        'secret_password',
                        {expiresIn:"1d"}
                    );
                    const { password, salt, ...other } = user[0];  
                    res.status(200).json({...other, accessToken});
                })
            }
        }
    })
})

router.post('/verifyToken', (req, res) => {
    jwt.verify(req.body.userToken, 'secret_password', (err, user) => {
        if(res.statusCode === 200) return res.status(200).json('You are logined')
    })
})

module.exports = router;