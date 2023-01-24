//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");
const { truncate } = require("lodash");

const homeStartingContent = "Share your story";
const aboutContent = "This software is designed for everyone, emphasizing accessibility, performance, security, and ease of use. We believe great software should work with minimum set up, so you can focus on sharing your story, product, or services freely. The basic This software is simple and predictable so you can easily get started. It also offers powerful features for growth and success.";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

const posts = [];

app.get("/home",function(req,res){

  res.render("home",{
    key:homeStartingContent,
    posts:posts
  });
});

app.get("/about",function(req,res){
  res.render("about",{key:aboutContent})
});

app.get("/contact",function(req,res){
  res.render("contact");
});

app.get("/compose",function(req,res){
  res.render("compose");
});

app.post("/compose",function(req,res){
  const title = req.body.postTitle;
  const post = req.body.postBody;
  
  let harish ={
    Title:title,
    Body:post
  }

  posts.push(harish);
  res.redirect("/home");
});

app.get("/home/posts/:postName",function(req,res){
    const type = _.lowerCase(req.params.postName);
    
    posts.forEach(function(post){
      const store = _.lowerCase(post.Title);
      const title = post.Title;
      const Body = post.Body ;
      if(type === store){
        res.render("post",{
          key:title,
          key1:Body
        });
      }

    });

});


app.listen(3000, function() {
  console.log("Server started on port 3000");
});
