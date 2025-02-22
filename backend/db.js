const { MongoClient, ServerApiVersion } = require('mongodb')

const uri = "mongodb+srv://admin:adminpass@nomadesk.vlw5u.mongodb.net/?retryWrites=true&w=majority&appName=nomadesk"

const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
  })

let db;

async function run() {
    try {
      // Connect the client to the server	(optional starting in v4.7)
        await client.connect();
      // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });

        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } 
    catch (error) {
      // Ensures that the client will close when you finish/error
        await client.close();
    }
}
run().catch(console.dir);

db = client.db("Accounts");
module.exports = db