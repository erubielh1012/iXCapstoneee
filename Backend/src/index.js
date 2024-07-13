const p = require('path');
const express = require("express");
const cors = require("cors");
require("dotenv").config({ path: p.resolve(__dirname, '../.env') });

const blogRoutes = require("./routes/blogRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const authRoutes = require("./routes/authRoutes");

const path = require("path")
const app = express();

const port = process.env.PORT || 8000;

console.log("MongoDB URI from environment:", process.env.MONGO_URI);

// connecting to MongoDB Atlas
const { MongoClient } = require('mongodb');
const uri = process.env.MONGO_URI 

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function run() {
  try {
    await client.connect();
    await client.db("onlineData").command({ ping: 1 });
    console.log("Pinged your deployment. You're connected to", client)
  } catch (err) {
    console.log('Error connection to MongoDB', err);
  } finally {
    await client.close();
  }
}
run().catch(console.dir);

const connectDB = require("./database/db");
connectDB();
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
