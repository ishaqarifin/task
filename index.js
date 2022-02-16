const express = require('express') // Pemanggilan package express
const { is, get } = require('express/lib/request')

const db = require('./connection/db')   //import db connection

// Menggunakan package express
const app = express()

// set template engine
app.set('view engine', 'hbs')

app.use('/public', express.static(__dirname + '/public'))
app.use(express.urlencoded({ extended: false }))

// true => sudah login
// false => belum login
const isLogin = true

const blogs = [
    {
      name : 'title default',
      description : 'content default',
      // author : 'ishaq arifin',
      // technologies : 'a',
      diffMonth : '3',
      technologies : '/public/assets/js.png',
      posted_at: "12 Jul 2021 22:30 WIB"
    }
]

let month = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
]

// Set endpoint----------------------------------------------------
app.get('/', function (req, res) {
    res.send("Hello World")
})

// app.get('/blog', function(req, res) {
//   let query = 'SELECT * FROM tb_projects'
//   db.connect((err, client, done) => {
//     if (err)throw err

//     client.query(query,(err, result) => {
//       done()

//       if (err) throw err
//       let data = result.rows
      
//       data = data.map((blog)=> {
//         return{
//           ...blog,
//           isLogin : isLogin
//         }
//       })
// res.render('blog', { isLogin: isLogin, blogs: data })
//     })
//   })
// })


app.get('/blog', function (req, res) {

  let dataBlogs = blogs.map(function (data) {
    return {
        ...data,
        isLogin: isLogin
    }
})

app.get('/add-blog', function (req, res) {

    if (!isLogin) {
        res.redirect('/home')
    }

    res.render('form-blog')
})
res.render('blog', { isLogin: isLogin, blogs: dataBlogs })
});



app.post('/blog', function (req, res) {
  let name = req.body.title
  let description = req.body.content
  let start_date = req.body.start
  let end_date = req.body.end
  let technologies = req.body.checkbox1
  let image = req.body.image

  let diffTime = new Date(end_date) - new Date(start_date);
  let diffDay = Math.floor(diffTime / (1000 * 3600 * 23));
  // if (diffDay >= 1) {
  //   return Math.floor(diffDay) + ' day';
  // }
  let diffMonth = Math.floor(diffDay / 30);
  let dm = Math.floor(diffDay - diffMonth * 30);

    let blog = {
      name,
      description,
      start_date,
      end_date,
      dm,
      diffMonth,
      technologies,
      image
      // posted_ad: getFullTime(data)
    }

    blogs.push(blog)

    res.redirect('/blog')

})


app.get('/blog/:id', function (req, res) {
    let id = req.params.id
    console.log(`Id dari client : ${id}`)

    res.render('blog-detail', { id: id })
})



app.get('/delete-blog/:index', function (req, res) {
    let index = req.params.index

    console.log(`Index data : ${index}`)

    blogs.splice(index, 1)
    res.redirect('/blog')
})


app.get("/form-blog", function (req, res) {
  res.render("form-blog");
});


app.get('/detail-blog', function(req, res) {
  res.render('blog-detail')
})
app.get('/detail-blog/:index', function(req, res) {
  let index = req.params.index
  index = blogs[index]
  
  res.render('blog-detail', index)
  console.log(`data detail : ${index}`);
})


app.post('/update-project', (req,res)=> { 
  let index = req.params.index ;
  index = blogs[index] ; 

  let name = req.body.projectName  ; 
  let start_Date = req.body.star_tDate  ; 
  let end_Date = req.body.end_Date  ; 
  let description = req.body.description  ; 
  let diffMonth = Math.floor(diffDay / 30);
  let dm = Math.floor(diffDay - diffMonth * 30);

  blogg = { 
      name ,
      start_Date,
      end_Date ,
      description,
      dm,
       diffMonth
  }

  // let lengthIndex = index.length ; 
  // blogs.push(index) ;
  // blogs.push(index) ; 

  blogs.splice(blog,1, blogg) ; 
  console.log(index);
  blogs[index] = blogg
  res.redirect('/home') ;

  console.log(blogg); 
});

app.get('/update-blog', function(req, res) {
  res.render('update-blog')
})
app.get('/update-blog/:index', function(req, res) {
  let index = req.params.index
  index = blogs[index]
  res.render('update-blog', index)
  console.log(`update : ${index}`);
})

// app.get('/update-blog/:index', function(req, res) {
//   let index = req.params.index
//   index = blogs[index]
//   console.log(index);

//   res.redirect('update-blog', {index: index})
// })

app.get('/contact', function (req, res) {
    res.render('contact')
})

// Konfigurasi port aplikasi
const port = 4444
app.listen(port, function () {
    console.log(`Server running on port ${port}`);
})

function getFullTime(time) {
    let date = time.getDate()
    let monthIndex = time.getMonth()
    let year = time.getFullYear()

    let hours = time.getHours()
    let minutes = time.getMinutes()

    if (minutes < 10) {
        minutes = '0' + minutes
    }

    return `${date} ${month[monthIndex]} ${year} ${hours}:${minutes} WIB`
}