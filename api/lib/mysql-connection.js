const mysql2 = require('mysql2')

let connection = mysql2.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'e_commerce_app'
})

connection.connect(function(err) {
    if (err) throw err;
    console.log("DB Connected!");
});

module.exports = connection;