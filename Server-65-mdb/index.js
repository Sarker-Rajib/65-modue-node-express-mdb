const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express();
const port = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());

const uri = "mongodb+srv://dbuser02:l4dMydFlo9OSiPjk@cluster0.yw8lqr5.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
// async await
const run = async () => {
   try {
      const usersCollection = client.db("practiceMongodb2").collection("users2");


      // 01 create data and save to database
      app.post('/users', async (req, res) => {
         const user = req.body;
         // console.log(user);

         const results = await usersCollection.insertOne(user);
         res.send(results)
      })

      // 02 read/ get data from data =base
      app.get('/users', async (req, res) => {
         const query = {};
         const cursor = usersCollection.find(query);
         const users = await cursor.toArray();
         res.send(users);
      })

      
      app.get('/users/:id', async (req, res) => {
         const id = req.params.id;
         const query = { _id: ObjectId(id) };
         const users = await usersCollection.findOne(query);
         res.send(users)
      })
      // 04 update database
      app.put('/users/:id', async (req, res) => {
         const id = req.params.id;
         const filter = { _id: ObjectId(id) };
         const aUser = req.body;
         const option = {upsert : true};
         const updatedUser = {
            $set: {
               name: aUser.name,
               email: aUser.email,
               address: aUser.address
            }
         }
         const result = await usersCollection.updateOne(filter, updatedUser, option);
         res.send(result)
      })


      // 03 delete data
      app.delete('/users/:id', async (req, res) => {
         const id = req.params.id;
         const query = { _id: ObjectId(id) };
         const results = await usersCollection.deleteOne(query);
         res.send(results)
      })
   } catch (error) {
      console.log(error);
   }
   finally {

   }
}
run().catch(error => console.error(error));

// 
app.get('/', (req, res) => {
   res.send('Welcome ! Node mongo crud server Running');
})


app.listen(port, () => {
   console.log(`node mongo crud server running on port ${port}`);
})