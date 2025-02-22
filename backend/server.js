const express = require('express')
const cors = require('cors')
const session = require('express-session')
const MongoDBStore = require('connect-mongodb-session')(session);

const apiRouter = require('./api')

const app = express()
const PORT = 3000

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
}))

app.use(express.json())

const store = new MongoDBStore({
    uri: "mongodb+srv://admin:adminpass@nomadesk.vlw5u.mongodb.net/?retryWrites=true&w=majority&appName=nomadesk", // Replace with your MongoDB URI
    collection: 'Sessions',
    databaseName: 'Accounts'
});

app.use(
    session({
      secret: "ellie",
      store: store,
      saveUninitialized: false,
      resave: false,
      cookie: {
        sameSite: 'lax',
        secure: false,
        httpOnly: true,
      },
    })
  );

store.on('error', function(error) {
    console.error('Session store error:', error);
});

app.use('/api', apiRouter)

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`)
})