const express = require('express')
const cors = require('cors')
const session = require('express-session')
const MongoDBStore = require('connect-mongodb-session')(session);

const apiRouter = require('./api')

const app = express()
const PORT = 3000

app.use(cors())
app.use(express.json())

const store = new MongoDBStore({
    uri: "mongodb+srv://admin:adminpass@nomadesk.vlw5u.mongodb.net/?retryWrites=true&w=majority&appName=nomadesk", // Replace with your MongoDB URI
    collection: 'Sessions'
});
app.use(session({
    secret: 'ellie',
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false,
        httpOnly: true,
        sameSite: 'none'
    },
    store: store
  }));

store.on('error', function(error) {
    console.error('Session store error:', error);
});

app.use('/api', apiRouter)

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`)
})