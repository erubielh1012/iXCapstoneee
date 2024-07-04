const p = require('path');
require("dotenv").config({ path: p.resolve(__dirname, '../.env') });

const express = require("express");
const cors = require("cors");

const port = process.env.PORT || 8000;

console.log("MongoDB URI from environment:", process.env.MONGO_URI);

// const connectDB = require("./database/db");
// connectDB();
// connecting to MongoDB Atlas
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = process.env.MONGO_URI 

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    await client.connect();
    await client.db("blog").command({ ping: 1 });
    console.log("Pinged your deployment. Successfully connected to MongoDB!");
  } finally {
    await client.close();
  }
}
run().catch(console.dir);

const blogRoutes = require("./routes/blogRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const authRoutes = require("./routes/authRoutes");
const path = require("path")

const app = express();

// Cross-origin resource sharing is a mechanism that allows a web page to access restricted resources from a server on a domain different than the domain that served the web page.
// Enabling CORS for any unknown origin
app.use(cors());

app.use(express.json());

app.use("/api/blogs", blogRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/auth", authRoutes);
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

app.listen(port, () => {
    console.log(`IX blogging app listening on port ${port}`)
});

// Serve Frontend from Express Backend ------------------------------
app.use(express.static(path.join(__dirname, "../../Frontend/build")));
app.get("*", (req, res) =>
  res.sendFile(
    path.resolve(__dirname, "..", "..", "Frontend", "build", "index.html")
  )
);
