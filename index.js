import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

// Static files middleware
app.use(express.static("public"));

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: true }));

// Initial empty arrays for blog data
let title = ["The Ever-Popular JavaScripti",];
let content = ["JavaScript has become a programming juggernaut, beloved for its versatility and power. From its roots in web development to its dominance in both front-end and back-end frameworks, JavaScript has revolutionized the way applications are built."];

// Routes
app.get("/", (req, res) => {
    // Render index.ejs with current blog data
    res.render("index.ejs", { Blog_title: title, Blog_content: content, Blog_length: title.length });
});

app.post("/read", (req, res) => {
    res.render("read.ejs",{Blog_title: title, Blog_content: content, index: req.body["index"] });
});

app.post("/submit-blog", (req, res) => {
    // Retrieve title and content from form submission
    const newTitle = req.body["title"];
    const newContent = req.body["content"];

    // Push new title and content to arrays
    title.push(newTitle);
    content.push(newContent);

    res.redirect("/");
});

app.post("/delete",(req, res) => {
    const item = req.body["index"];

    title.splice(item,1);
    content.splice(item,1);
    res.redirect("/");
})

app.post("/edit",(req, res) => {
    const item = req.body["index"];
    
    res.render("index.ejs", { Blog_title: title, Blog_content: content, Blogitem: item, Blog_length:title.length });
    
    // title.splice(item,1);
    // content.splice(item,1);

})


app.get("/back",(req,res)=>{
    res.render("/");
})
app.get("/contact",(req,res)=>{
    res.render("contact.ejs");
})
app.get("/about",(req,res)=>{
    res.render("about.ejs");
})

// Start server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
