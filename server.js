// a condition to use env for development and not production
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const cors = require("cors");
const express = require('express')
const app = express()
// const passport = require("passport")
const expressLayouts = require('express-ejs-layouts')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')

const indexRouter = require('./routes/index')
const authorRouter = require('./routes/authors')
const bookRouter = require('./routes/books')

app.set('view engine', 'ejs' )
app.set('views', __dirname + '/views' )
app.set('layout', 'layouts/layout')

app.use(cors());
app.use(expressLayouts)
app.use(express.static('public'))
app.use(methodOverride('_method'))

// app.use(bodyParser.urlencoded({ limit: '10mb', extended: false}))
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true}))
// extended: true to allow json object and strings

// app.use(passport.initialize())

// require('./middlewares/passport')(passport)

// connecting to mongodb
const mongoose = require('mongoose')
mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true})



// connection check
const db = mongoose.connection
db.on('error', error => console.error(error))
db.once('open', () => console.log('Connected to Mongoose'))

// using routers
app.use('/', indexRouter)
app.use('/authors', authorRouter)
app.use('/books', bookRouter)

// test
app.use('/api/users', require('./routes/users'))
app.use('/api/admin', require('./routes/admin'))
app.use('/api/superadmin', require('./routes/superadmin'))

app.listen(process.env.PORT || 3000)