// const express = require('express');
// const cors = require('cors');
// require('dotenv').config();
// const { MongoClient, ServerApiVersion } = require('mongodb');

// const app = express();
// const port = process.env.PORT || 5000;

// // Middleware
// app.use(cors());
// app.use(express.json());

// const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.rqcbidk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// const client = new MongoClient(uri, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   }
// });

// async function run() {
//   try {
//     const productsCollection = client.db('electronicProducts').collection('products');

//     // Get products with optional search query
//     app.get('/products', async (req, res) => {
//       const page = parseInt(req.query.page) || 1;
//       const limit = parseInt(req.query.limit) || 10;
//       const skip = (page - 1) * limit;
//       const searchQuery = req.query.search || '';

//       try {
//         // Construct search query
//         const query = searchQuery
//           ? { productName: { $regex: searchQuery, $options: 'i' } }
//           : {};

//         const cursor = productsCollection.find(query).skip(skip).limit(limit);
//         const products = await cursor.toArray();

//         const totalProducts = await productsCollection.countDocuments(query);
//         const totalPages = Math.ceil(totalProducts / limit);

//         console.log(`Returning products for page ${page}, limit ${limit}, search query "${searchQuery}"`);

//         res.send({
//           products,
//           totalProducts,
//           totalPages,
//           currentPage: page
//         });
//       } catch (error) {
//         console.error('Error fetching products:', error);
//         res.status(500).send('Server Error');
//       }
//     });

//     console.log("Pinged your deployment. You successfully connected to MongoDB!");
//   } finally {
//     // Ensure that the client will close when you finish/error
//     // await client.close();
//   }
// }
// run().catch(console.dir);

// app.get('/', (req, res) => {
//   res.send('Products API is running');
// });

// app.listen(port, () => {
//   console.log(`Product server is running on port ${port}`);
// });
















// search implement
const express = require('express');
const cors = require('cors');
require('dotenv').config();
const app = express();
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion } = require('mongodb');

// Middleware
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.rqcbidk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    const productsCollection = client.db('electronicProducts').collection('products');

    // Get products with optional search query
    app.get('/products', async (req, res) => {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const skip = (page - 1) * limit;
      const searchQuery = req.query.search || '';

      try {
        // Construct search query
        const query = searchQuery
          ? { productName: { $regex: searchQuery, $options: 'i' } }
          : {};

        const cursor = productsCollection.find(query).skip(skip).limit(limit);
        const products = await cursor.toArray();

        const totalProducts = await productsCollection.countDocuments(query);
        const totalPages = Math.ceil(totalProducts / limit);

        console.log(`Returning products for page ${page}, limit ${limit}, search query "${searchQuery}"`);

        res.send({
          products,
          totalProducts,
          totalPages,
          currentPage: page
        });
      } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).send('Server Error');
      }
    });

    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensure that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get('/', (req, res) => {
  res.send('Products API is running');
});

app.listen(port, () => {
  console.log(`Product server is running on port ${port}`);
});
