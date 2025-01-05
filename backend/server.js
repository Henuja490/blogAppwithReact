const {MongoClient, ObjectId} = require("mongodb")
const express = require("express")

const app = express()
let db;

app.get("/",async(req,res)=>{
    const allBlogs =  await db.collection("blogs").find().toArray();
        if (allBlogs) {
            res.json(allBlogs)
            res.status(200)
        }else{
            res.status(404).json("Not found");
        }
})
app.get("/:cat",async(req,res)=>{
    const allBlogs =  await db.collection("blogs").find({"category":req.params.cat}).toArray();
        if (allBlogs) {
            res.json(allBlogs)
            res.status(200)
        }else{
            res.status(404).json("Not found");
        }
})
app.get("/users/:name",async(req,res)=>{
    const allBlogs =  await db.collection("users").find({"username": req.params.name}).toArray();
        if (allBlogs) {
            res.json(allBlogs)
            res.status(200)
        }else{
            res.status(404).json("Not found");
        }
})
app.get("/:id",async(req,res)=>{
    const allStudents =  await db.collection("blogs").find({"ID":parseInt(req.params.id)}).toArray();
        if (allStudents) {
            res.json(allStudents)
            res.status(200)
        }else{
            res.status(404).json("Not found");
        }
})
app.post("/users/add",async(req,res)=>{
    try {
        const blogData = req.body;
    
        // Validate the input

        if (!blogData || typeof blogData !== 'object') {
            console.log(blogData)
          return res.status(400).json({ message: "Invalid input data" });
        }
        console.log(blogData)
        // Insert into the database
        const result = await db.collection('users').insertOne(blogData);
    
        res.status(201).json({
          message: "Blog added successfully",
          blogId: result.insertedId,
        });
      } catch (error) {
        console.error("Error adding blog:", error);
        res.status(500).json({ message: "Internal Server Error", error: error.message });
      }
})
  


app.listen(8000 , async(req,res)=>{
    const client = new MongoClient("mongodb+srv://Henuja:Henuja123@blog.i5clm.mongodb.net/")
    await client.connect()
    db = client.db("blogs")
    console.log("Connected to the backend")
})

