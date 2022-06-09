//jshint esversion:6

const express = require("express");
const ejs = require("ejs");
const _ = require('lodash');
const mongoose = require('mongoose');

const app = express();

app.set('view engine', 'ejs');

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use(express.static("public"));





//mongodb+srv://<username>:<password>@cluster0.hlqoahu.mongodb.net/?retryWrites=true&w=majority
//user1
//9UOQxiAscn18YO4v



mongoose.connect('mongodb+srv://user1:9UOQxiAscn18YO4v@cluster0.hlqoahu.mongodb.net/?retryWrites=true&w=majority/blogDB', {useNewUrlParser: true, useUnifiedTopology: true});


const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  }
});

const Post = mongoose.model("Post", postSchema);

// const post = new Post({
//   title: "Testing post",
//   content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Mattis enim ut tellus elementum sagittis vitae et leo duis. Tortor posuere ac ut consequat semper viverra nam libero justo."
// });
// post.save();




const homeStartingContent = "A tiny haven in the internet to speak your mind and reflect you thoughts. Create content around different topics and share you ideas with the world!";
const aboutContent = "Netus et malesuada fames ac turpis egestas integer eget. Blandit volutpat maecenas volutpat blandit. Id interdum velit laoreet id donec ultrices. Ullamcorper malesuada proin libero nunc consequat interdum varius. Et netus et malesuada fames ac turpis. Commodo nulla facilisi nullam vehicula ipsum a arcu. Facilisis sed odio morbi quis commodo odio aenean sed. Massa tincidunt nunc pulvinar sapien et ligula ullamcorper malesuada. Id consectetur purus ut faucibus pulvinar elementum. Diam sollicitudin tempor id eu nisl nunc mi ipsum faucibus. Nunc mi ipsum faucibus vitae aliquet nec. Facilisis magna etiam tempor orci eu. Neque vitae tempus quam pellentesque nec. Porta lorem mollis aliquam ut porttitor. Bibendum arcu vitae elementum curabitur vitae nunc sed velit dignissim. Velit aliquet sagittis id consectetur purus. Sodales ut etiam sit amet nisl purus in mollis nunc. Dui vivamus arcu felis bibendum. Non nisi est sit amet. Vitae congue mauris rhoncus aenean vel elit.";
const contactContent = "In iaculis nunc sed augue lacus viverra vitae. Ut ornare lectus sit amet est placerat in egestas. Lacus sed turpis tincidunt id aliquet risus feugiat in. Netus et malesuada fames ac turpis egestas integer eget. Et sollicitudin ac orci phasellus egestas tellus rutrum. Risus at ultrices mi tempus. Nisi est sit amet facilisis magna etiam tempor orci. Sem fringilla ut morbi tincidunt augue interdum velit euismod. Porttitor lacus luctus accumsan tortor posuere ac ut. Ullamcorper malesuada proin libero nunc consequat. Et tortor at risus viverra adipiscing at in tellus integer. In iaculis nunc sed augue lacus viverra vitae congue eu. Commodo sed egestas egestas fringilla. In arcu cursus euismod quis viverra. Ullamcorper a lacus vestibulum sed arcu.";




// GET REQUESTS - FUNCTIONS


app.get("/", function(req, res) {
  Post.find({}, function(err, foundPosts) {
    if (err) {
      console.log(err);
    } else {
      res.render("home", {startingContent: homeStartingContent, posts: foundPosts});
    }
  });
  
});



app.get("/about", function(req, res) {
  res.render("about", {aboutContent: aboutContent});
});

app.get("/contact", function(req, res) {
  res.render("contact", {contactContent: contactContent});
});

app.get("/compose", function(req, res) {
  res.render("compose");
});





app.post("/compose", function(req, res) {
  const newPost = new Post ({
    title: req.body.postTitle,
    content: req.body.postBody
  });

  newPost.save(function(err) {
    try {
      res.redirect("/");
    }

    catch(err)
    {
      console.log("error");
    }
  });
});






app.get("/find",function(req, res){

  res.render("find");

});

app.get("/empty",function(req, res){

  res.render("empty");

});


app.post("/find", function(req, res){
  
   const requestedTitle =req.body.postTitle
   Post.findOne({title: requestedTitle}, function(err, post){


    
    
    try
     {
     res.render("postview",{
       title :post.title,
       content : post.content
     });
    }


    catch(err)
    {
      res.render("empty");
    }
   
   });
});



app.get("/delete",function(req, res){

  res.render("delete");

});

app.post("/delete", function(req, res){
  
   const requestedTitle =req.body.postTitle
   Post.deleteOne({title: requestedTitle}, function(err, post){
     
     res.redirect("/");
    

   });
});


app.listen(8080, function() {
  console.log("Server started on port 8080");
});
