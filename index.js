const express = require('express');
const cors = require('cors');
require('dotenv').config()
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express();
const port = process.env.PORT || 5000;


app.use(cors());
app.use(express.json());




//------------------------
// Connect To MONGODB 
//------------------------



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.5nuw1j2.mongodb.net/?retryWrites=true&w=majority`;






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
        // await client.connect();


        const toyCollection = client.db('tinyDriversCars').collection('toyCars')

        // const indexKeys = { toyName: 1, category: 1 };

        // const indexOptions = { name: "titleWithCategory" };

        // const result = await toyCollection.createIndex(indexKeys, indexOptions)


        






        //---------------------------------
        //-------All CRUD Starts Here------
        //---------------------------------

        // for getting all data 



        app.get('/toyCars', async (req, res) => {
            console.log(req.query.sellerEmail);
            let query = {};
            if (req.query?.sellerEmail) {
                query = { sellerEmail: req.query.sellerEmail }
            }
            const result = await toyCollection.find(query).toArray();
            res.send(result)
        })


        app.post('/toyCars', async (req, res) => {
            const newCar = (req.body);
            console.log(newCar);
            const result = await toyCollection.insertOne(newCar);
            res.send(result);
        });


        app.delete('/toyCars/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) }
            const result = await toyCollection.deleteOne(query);
            res.send(result);

        })

        app.get('/toyCars', async (req, res) => {
            const result = await toyCollection.find().toArray();
            res.send(result)
        })

        app.get('/toyCars/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) }
            const result = await toyCollection.findOne(query);
            res.send(result);
        })

        app.put('/toyCars/:id', async (req, res) => {
            const id = req.params.id;
            const filter = { _id: new ObjectId(id) }
            const options = { upsert: true };
            const updatedToys = req.body;
            const updatToys = {
                $set: {
                    price: updatedToys.price,
                    quantity: updatedToys.quantity,
                    details: updatedToys.details
                }

            }

            const result = await toyCollection.updateOne(filter, updatToys, options)
            res.send(result);


        })

        // app.get ('/toyCars')

        app.get('/category/:category', async (req, res) => {

            const result = await toyCollection.find({
                category: req.params.category,
            }).limit(2).toArray();
            res.send(result)
        })













        //---------------------------------
        //-------All CRUD Ends Here------
        //---------------------------------


        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);























app.get('/', (req, res) => {
    res.send('Your Tiny Driver is Online')
})


app.listen(port, () => {
    console.log(`Toy Store Server is Running on Port: ${port}`);
})