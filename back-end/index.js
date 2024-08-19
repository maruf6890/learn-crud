//maruf6890
//0PVMYoiiLvib2K9L

const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

const uri = "mongodb+srv://maruf6890:0PVMYoiiLvib2K9L@cluster0.esudj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

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
    // Connect the client to the server
    await client.connect();

    const database = client.db("usersDB");
    const usersCollection = database.collection("users");



    //get multiple post 
    app.get('/users',async(req,res)=>{
      const cursor =usersCollection.find();
      const result= await cursor.toArray();
      res.send(result);
    })
    // get single post 
    app.get('/users/:id', async(req,res)=>{
      const id= req.params.id;
      const query=  {_id: new ObjectId(id)};
      const result= await usersCollection.findOne(query);
      res.send(result);
      
    })
    // POST endpoint to add a user
    app.post('/users', async (req, res) => {
      const user = req.body;
      console.log(user);
      const result = await usersCollection.insertOne(user);
      res.send(result);
    });

    //delete 
    app.delete('/users/:id',async(req,res)=>{
      const id= req.params.id;
      console.log("please delete ",id)
      const query=  {_id: new ObjectId(id)}
      const result= await usersCollection.deleteOne(query);
      res.send(result);
      if (result.deletedCount === 1) {
        console.log("Successfully deleted one document.");
      } else {
        console.log("No documents matched the query. Deleted 0 documents.");
      }
    })

    // Confirm successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");

  } catch (err) {
    console.error(err);
  }
}

// Run the async function
run().catch(console.dir);

// Root route
app.get('/', (req, res) => {
  res.send('Server is running...');
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});