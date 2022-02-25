const { query } = require('express')
const express = require('express') // Pemanggilan package express
const bcrypt = require('bcrypt')
// import package express-flash and express-session
const flash = require('express-flash')
const session = require('express-session')
const db = require('./connection/db')   //import db connection
// import middleware upload
const upload = require('./middlewares/uploadFile')
const app = express()  // Menggunakan package express
app.set('view engine', 'hbs')  // set template engine

app.use('/public', express.static(__dirname + '/public'))
app.use(express.urlencoded({ extended: false }))

app.use(flash())

app.use(
  session({
      cookie: {
          maxAge: 1000 * 60 * 60 * 2,
          secure: false,
          httpOnly: true
      },
      store: new session.MemoryStore(),
      saveUninitialized: true,
      resave: false,
      secret: "secretValue"
  })
)

// let month = [
//     'January', 
//     'February',
//     'March',
//     'April',
//     'May',
//     'June',
//     'July',
//     'August',
//     'September',
//     'October',
//     'November',
//     'December'
// ]

// Set endpoint----------------------------------------------------
app.get('/', function (req, res) {
    res.send("Hello World")
})

app.get('/form-blog', function (req, res) {//----------------------------add blog

    if (!req.session.isLogin) {
        res.redirect('/login')
    }

    res.render('form-blog')
// res.render('blog', { isLogin: isLogin, blogs: dataBlogs })
});

app.get('/blog', function(req, res) {//--------------------------------- get blog
  let query = 'SELECT * FROM tb_projects'
  db.connect((err, client, done) => {
    if (err)throw err

    client.query(query,(err, result) => {
      done()

      if (err) throw err
      let data = result.rows
      
      data = data.map((blog)=> {
        return{
          ...blog,
          isLogin: req.session.isLogin
        }
      })
      res.render('blog', {
        isLogin: req.session.isLogin,
        user: req.session.user,
        blogs: data
    })
    })
  })
})

app.post('/blog', upload.single('image'), function (req, res) {//--------------------------------post blog
  let technologies = req.body.checkbox1
  let {name, description, start, end, image} = req.body

  let diffTime = end - start;
  let diffDay = Math.floor(diffTime / (1000 * 3600 * 23));
  // if (diffDay >= 1) {
  //   return Math.floor(diffDay) + ' day';
  // }
  let diffMonth = Math.floor(diffDay / 30);
  let dm = Math.floor(diffDay - diffMonth * 30);

    let blog = {
      name,
      description,
      start,
      end,
      dm,
      diffMonth,
      technologies,
      image: req.file.filename,
      author_id: req.session.user.id
    }

    let query = `INSERT INTO tb_projects (name, description, start_date, end_date, image, technologies) 
                  VALUES ('${blog.name}', '${blog.description}', '${blog.start}', '${blog.end}', '${blog.image}', '{${technologies}}',)`
    db.connect((err, client, done)=> {
      if(err) throw err

      client.query(query,(err, result)=> {
        done()
        
        if(err) throw err
        res.redirect('/blog')
      })
    })
})

app.get('/detail-blog/:id', function (req, res) { //---------------------detaial blog
    let {id} = req.params

  //   let diffTime = new Date(end_date) - new Date(start_date);
  // let diffDay = Math.floor(diffTime / (1000 * 3600 * 23));
  // if (diffDay >= 1) {
  //   return Math.floor(diffDay) + ' day';
  // }
  // let diffMonth = Math.floor(diffDay / 30);
  // let dm = Math.floor(diffDay - diffMonth * 30);

    db.connect((err, client, done)=> {
      if(err) throw err

      let query = `SELECT * FROM tb_projects WHERE id=${id}`
      client.query(query,(err, result)=> {
        done()

        if(err) throw err

        result = result.rows[0]
        console.log(result);
        res.render('blog-detail', {blog: result})
      })
    })
})

// app.get("/form-blog", function (req, res) { //----------------------------form blog
//   res.render("form-blog");
// });

//app.get('/blog-update/:id', function(req, res) { //----------------------upload blog
  app.get('/blog-update/:id', function (req, res) {
    if (!req.session.isLogin) {
      res.redirect('/login')
  }
    let {id} = req.params
    db.connect((err, client, done)=> {
      if(err) throw err

      let query = `SELECT * FROM tb_projects WHERE id=${id}`
      client.query(query,(err, result)=> {
        done()

        if(err) throw err

        result = result.rows[0]
        console.log(result);
        res.render('blog-update', {blog: result})
      })
    })
})

app.post('/blog-update/:id', function(req, res) {
  let {id} = req.params
  let {name, start, end, description,checkbox1} = req.body

  let query = `UPDATE tb_project SET name='${name}', description='${description}', technologies='${checkbox1}' WHERE id=${id}`

  db.connect((err, client, done)=> {
    if(err) throw err

    client.query(query, (err, done)=> {
      done()
        if(err) throw err
        res,redirect('/blog')
    })
  })
})
//--------------------------------------------------------------------------delete
app.get('/delete-blog/:id', function (req, res) {

  if (!req.session.isLogin) {
    res.redirect('/login')
}
  let { id } = req.params
  
  db.connect((err, client, done) => {
      if (err) throw err

      let query = `DELETE FROM tb_projects WHERE id=${id}`

      client.query(query, (err, result) => {
          done()
          if (err) throw err

          res.redirect('/blog')
      })
  })
})

app.get('/contact', function (req, res) { //---------------------------------contact
    res.render('contact')
})
//--------------------------------------------------------------------------register
app.get('/register', function (req, res) {
  res.render('register')
})

app.post('/register', function(req, res){
  let {name, email, password} = req.body

  const hashPassword = bcrypt.hashSync(password, 10)
  
  db.connect((err, client, done) => {
    if (err) throw err

    let query = `INSERT INTO tb_user(name, email, password) VALUES
                    ('${name}','${email}','${hashPassword}')`

    client.query(query, (err, result) => {
        done()
        if (err) throw err
        req.flash('success', 'Account succesfully registered ')
        res.redirect('/login')
    })
});
})

//--------------------------------------------------------------------------login
app.get('/login', function (req, res) {
  res.render('login')
})
app.post('/login', function (req, res) {
  let {email, password} = req.body

  db.connect((err, client, done) => {
    if (err) throw err
    let query = `SELECT * FROM tb_user WHERE email='${email}'`

    client.query(query, (err, result) => {
        done()
        if (err) throw err

        if (result.rows.length == 0) {
            req.flash('danger', 'Account not found!')
            return res.redirect('/login')
        }

        let isMatch = bcrypt.compareSync(password, result.rows[0].password)

        if (isMatch) {
            req.session.isLogin = true
            req.session.user = {
                id: result.rows[0].id,
                email: result.rows[0].email,
                name: result.rows[0].name
            }
            req.flash('success', 'Login Success')
            res.redirect('/blog')
        } else {
            res.redirect('/login')
        }
    })
})
})

app.get('/logout', function (req, res) {
  req.session.destroy()
  res.redirect('/login')
})

// Konfigurasi port aplikasi-------------------------------------------------------
const port = 4444
app.listen(port, function () {
    console.log(`Server running on port ${port}`);
})

// function getFullTime(time) {
//     let date = time.getDate()
//     let monthIndex = time.getMonth()
//     let year = time.getFullYear()

//     let hours = time.getHours()
//     let minutes = time.getMinutes()

//     if (minutes < 10) {
//         minutes = '0' + minutes
//     }

//     return `${date} ${month[monthIndex]} ${year} WIB`
// }