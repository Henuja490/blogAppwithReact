const {MongoClient, ObjectId} = require("mongodb")
const cors = require("cors");
const express = require("express")

const app = express()

app.use(express.json())
app.use(cors())
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
app.post('/admin/user/add', async (req, res) => {
    const user = req.body;
    try {
        const result = await db.collection('users').insertOne(user);
        res.status(200).send(user);
    } catch (error) {
        res.status(400).send(error);
    }
});
app.post('/admin/Blogs', async (req, res) => {
    const Blog = req.body;
    console.log(Blog)
    try {
        const result = await db.collection('blogs').insertOne(Blog);
        res.status(200).send(Blog);
    } catch (error) {
        res.status(400).send(error);
    }
});
  
app.put('/admin/Blogs/:sid', async (req, res) => {
    const  sid  = parseInt(req.params.sid);
    const updatedBlog = req.body;

    try {
        await db.collection('blogs').updateOne({ "ID":sid }, { $set: updatedBlog });
        res.send(updatedBlog);
    } catch (error) {
        res.status(500).send(error);
    }
});

app.delete('/admin/deleteBlog/:sid', async (req, res) => {
    const deleteBlog =  await db.collection("blogs").deleteOne({"ID":parseInt(req.params.sid)});
        if (deleteBlog) {
            res.status(200).json("You have deletd Successfully");
            console.log(deleteBlog);
        }else{
            res.status(404).json("Not found");
        }
});

app.listen(8000 , async(req,res)=>{
    const client = new MongoClient("mongodb+srv://Henuja:Henuja123@blog.i5clm.mongodb.net/")
    await client.connect()
    db = client.db("blogs")
    console.log("Connected to the backend")
})

