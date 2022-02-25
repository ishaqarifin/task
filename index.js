const express = require('express') // Pemanggilan package express
const db = require('./connection/db')   //import db connection
const app = express()  // Menggunakan package express
const hbs = require('hbs')

app.set('view engine', 'hbs')  // set template engine

app.use('/public', express.static(__dirname + '/public'))
app.use(express.urlencoded({ extended: false }))

hbs.registerPartials(__dirname + '/views/partials')

// Set endpoint----------------------------------------------------
app.get('/', function (req, res) {
    res.send("Hello World")
})

app.get('/home', function(req, res) {
  res.render('blog')
})

// Konfigurasi port aplikasi-------------------------------------------------------
const port = 4444
app.listen(port, function () {
    console.log(`Server running on port ${port}`);
})