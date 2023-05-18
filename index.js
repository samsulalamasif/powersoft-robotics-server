const { MongoClient, ServerApiVersion } = require('mongodb');
const express = require('express')
const cors = require('cors')
const app = express()
const port = process.env.PORT || 5000
app.use(cors())
app.use(express.json())
require('dotenv').config()





const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.vqy99hm.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();

        const toyCollection = client.db("PowersoftRobotics").collection("addToy")


        // ----add toy----
        app.post("/addToy", async (req, res) => {
            const body = req.body
            // console.log(body);
            const result = await toyCollection.insertOne(body)
            res.send(result)
        })


        // all toy show

        app.get("/allToys", async (req, res) => {
            const cursor = toyCollection.find().limit(20)
            const result = await cursor.toArray()
            res.send(result)
        })



        // my toy
        app.get("/myToy/:email", async (req, res) => {
            const result = await toyCollection.find({ email: req.params.email }).toArray()
            res.send(result)
        })








        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);







app.get("/", (req, res) => {
    res.send("Powersoft Robotics server side is running")
})

app.listen(port, () => {
    console.log(`powersoft-robotics-server-side port: ${port}`);
})