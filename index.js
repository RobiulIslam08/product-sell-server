


// const express = require('express');
// const cors = require('cors');
// require('dotenv').config();
// const app = express();
// const port = process.env.PORT || 5000;
// const { MongoClient, ServerApiVersion } = require('mongodb');

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

//     // Get products with optional search query, filters, and pagination
//     // app.get('/products', async (req, res) => {
//     //   const page = parseInt(req.query.page) || 1;
//     //   const limit = parseInt(req.query.limit) || 10;
//     //   const skip = (page - 1) * limit;
//     //   const searchQuery = req.query.search || '';
//     //   const brand = req.query.brand || '';
//     //   const category = req.query.category || '';
//     //   const priceRange = req.query.priceRange || '';

//     //   try {
//     //     // Build the query object
//     //     let query = {};

//     //     if (searchQuery) {
//     //       query.productName = { $regex: searchQuery, $options: 'i' };
//     //     }

//     //     if (brand) {
//     //       query.brandName = brand;
//     //     }

//     //     if (category) {
//     //       query.category = category;
//     //     }

//     //     if (priceRange) {
//     //       const [minPrice, maxPrice] = priceRange.split('-').map(Number);
//     //       query.price = { $gte: minPrice, $lte: maxPrice };
//     //     }

//     //     const cursor = productsCollection.find(query).skip(skip).limit(limit);
//     //     const products = await cursor.toArray();

//     //     const totalProducts = await productsCollection.countDocuments(query);
//     //     const totalPages = Math.ceil(totalProducts / limit);

//     //     res.send({
//     //       products,
//     //       totalProducts,
//     //       totalPages,
//     //       currentPage: page
//     //     });
//     //   } catch (error) {
//     //     console.error('Error fetching products:', error);
//     //     res.status(500).send('Server Error');
//     //   }
//     // });
//     app.get('/products', async (req, res) => {
//       const page = parseInt(req.query.page) || 1;
//       const limit = parseInt(req.query.limit) || 10;
//       const skip = (page - 1) * limit;
//       const searchQuery = req.query.search || '';
//       const brand = req.query.brand || '';
//       const category = req.query.category || '';
//       const priceRange = req.query.priceRange || '';
//       const sortBy = req.query.sortBy || 'date'; // Default to sorting by date
//       const sortOrder = req.query.sortOrder === 'asc' ? 1 : -1; // Ascending or descending order
    
//       try {
//         // Build the query object
//         let query = {};
    
//         if (searchQuery) {
//           query.productName = { $regex: searchQuery, $options: 'i' };
//         }
    
//         if (brand) {
//           query.brandName = brand;
//         }
    
//         if (category) {
//           query.category = category;
//         }
    
//         if (priceRange) {
//           const [minPrice, maxPrice] = priceRange.split('-').map(Number);
//           query.price = { $gte: minPrice, $lte: maxPrice };
//         }
    
//         // Determine the sort field
//         let sortField = {};
//         if (sortBy === 'price') {
//           sortField = { price: sortOrder };
//         } else if (sortBy === 'date') {
//           sortField = { createdAt: sortOrder }; // Assuming 'createdAt' is the date field
//         }
    
//         const cursor = productsCollection.find(query).skip(skip).limit(limit).sort(sortField);
//         const products = await cursor.toArray();
    
//         const totalProducts = await productsCollection.countDocuments(query);
//         const totalPages = Math.ceil(totalProducts / limit);
    
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

    app.get('/products', async (req, res) => {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const skip = (page - 1) * limit;
      const searchQuery = req.query.search || '';
      const brand = req.query.brand || '';
      const category = req.query.category || '';
      const priceRange = req.query.priceRange || '';
      const sortBy = req.query.sortBy || 'date';
      const sortOrder = req.query.sortOrder === 'asc' ? 1 : -1;
    
      try {
        let query = {};
    
        if (searchQuery) {
          query.productName = { $regex: searchQuery, $options: 'i' };
        }
    
        if (brand) {
          query.brandName = brand;
        }
    
        if (category) {
          query.category = category;
        }
    
        if (priceRange) {
          const [minPrice, maxPrice] = priceRange.split('-').map(Number);
          query.price = { $gte: minPrice, $lte: maxPrice };
        }
    
        let sortField = {};
        if (sortBy === 'price') {
          sortField = { price: sortOrder };
        } else if (sortBy === 'date') {
          sortField = { createdAt: sortOrder };
        }
    
        const cursor = productsCollection.find(query).skip(skip).limit(limit).sort(sortField);
        const products = await cursor.toArray();
    
        const totalProducts = await productsCollection.countDocuments(query);
        const totalPages = Math.ceil(totalProducts / limit);
    
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
