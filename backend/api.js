const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const db = require("./db")

// const { MongoClient, ServerApiVersion } = require('mongodb')

// const uri = "mongodb+srv://admin:adminpass@nomadesk.vlw5u.mongodb.net/?retryWrites=true&w=majority&appName=nomadesk"

// const client = new MongoClient(uri, {
//     serverApi: {
//       version: ServerApiVersion.v1,
//       strict: true,
//       deprecationErrors: true,
//     }
//   })

// async function run() {
//     try {
//       // Connect the client to the server	(optional starting in v4.7)
//         await client.connect();
//       // Send a ping to confirm a successful connection
//         await client.db("admin").command({ ping: 1 });
//         console.log("Pinged your deployment. You successfully connected to MongoDB!");
//     } 
//     finally {
//       // Ensures that the client will close when you finish/error
//         await client.close();
//     }
// }
// run().catch(console.dir);


router.post("/login/", async (req, res) => {
    const collection = await db.collection("Profiles")
    const body = req.body
    const email = body.email
    const password = body.password

    let result = await collection.findOne({"email": email})

    const correctPassword = await bcrypt.compare(password, result.password)

    if (!result || !correctPassword) {
        res.status(404).send("Incorrect credentials!")
        return
    }

    res.status(200).json(result)
})

router.post("/register/", async (req, res) => {
    const collection = await db.collection("Profiles")
    const body = req.body
    const email = body.email
    const firstName = body.firstName
    const lastName = body.lastName
    const username = body.username
    const password = body.password

    const salt = await bcrypt.genSalt()
    const hashedPassword = await bcrypt.hash(password, salt)

    const profile = {
        email: email,
        firstName: firstName,
        lastName: lastName,
        username: username, 
        password: hashedPassword
    }

    const result = await collection.insertOne(profile)

    if (!result.acknowledged) {
        res.status(500).send("Account creation error")
        return
    }
    else {
        res.status(200).send("Account created!")
    }
})

module.exports = router