const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const db = require("./db")
const GOOGLE_MAPS_API_KEY = "AIzaSyDEjG0iYPpttEDuYugMPmA9mo_Sf-7866M"

router.post("/login/", async (req, res) => {
    try {
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

        req.session.user = {
            id: String(result._id), 
            username: result.username,
            firstName: result.firstName,
            lastName: result.lastName,
            email: result.email,
            password: result.password
        }

        res.status(200).json(result)
    }
    catch (error) {
        console.log(error)
        res.status(500).send("Interval server error.")
    }
})

router.get("/logout/", (req, res) => {
    try {
        req.session.destroy()
        res.status(200).send("Logout successful")
    }
    catch (error) {
        console.log(error)
        res.status(500).send("Logout failed.")
    }
})

router.get("/current/", (req, res) => {
    try {
        if (req.session.user) {
            res.status(200).json(req.session.user)
            return
        }
        res.status(401).send("Not logged in!")
    }
    catch (error) {
        res.status(500).send("Internal server error")
    }
})

router.post("/register/", async (req, res) => {
    try {
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
    }
    catch (error) {
        res.status(500).send("Internal server error")
    }
})

router.post("/search/", async (req, res) => {
    try {
        const body = req.body
        const lat = body.lat
        const long = body.long
        const includedTypes = body.includedTypes
        const radius = body.radius

        const url = `https://places.googleapis.com/v1/places:searchNearby`

        const requestBody = {
            includedTypes: includedTypes,
            maxResultCount: 10,
            locationRestriction: {
                circle: {
                    center: {
                        latitude: lat,
                        longitude: long
                    },
                    radius: radius 
                }
            },
            rankPreference: "DISTANCE"
        }

        const headers = new Headers()

        headers.append('Content-Type', 'application/json')
        headers.append('X-Goog-Api-Key', GOOGLE_MAPS_API_KEY)
        headers.append('X-Goog-FieldMask', 'places.displayName,places.formattedAddress,places.photos,places.types,places.websiteUri,places.priceRange')

        const response = await fetch(url, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(requestBody)
        })

        const data = await response.json()

        res.status(200).json(data)
    }
    catch (error) {
        console.log(error)
        res.status(500).send("Internal server error!")
    }
})

module.exports = router