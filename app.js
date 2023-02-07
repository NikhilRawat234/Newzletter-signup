// jshint esversion: 6

const express = require("express");
const request = require("request");
const bodyParser = require("body-parser");
const app = express();
const https = require("https");

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}))
app.get("/",function(req,res){
    res.sendFile(__dirname + "/signup.html");
});

app.post("/", function(req,res){
    const firstName = req.body.fName;
    const lastName = req.body.lName;
    const email = req.body.email;
    
    const data = {
        members:[
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstName,
                    lName: lastName
                }
            }
        ]
    };
    const jsonData = JSON.stringify(data);
    const url = "https://us21.api.mailchimp.com/3.0/lists/8d7a4bc693";
    const Options = {
        method: "POST",
        auth: "nikhil1:1301d6db37a4066eac05af32eafb32e8-us21"
    }
    const request = https.request(url, Options, function(response){
        if(response.statusCode === 200){
            res.sendFile(__dirname + "/success.html");
        }else{
            res.sendFile(__dirname + "/failure.html");
        }
        response.on("data", function(data){
            console.log(JSON.parse(data));
        })
    })
    request.write(jsonData);
    request.end();

    app.post("/failure", function(req,res){
        res.redirect("/");
    });
});
app.listen(3000, function(){
    console.log("server running at port 3000.");
})



// api key
// 1301d6db37a4066eac05af32eafb32e8-us21
// List IdleDeadline
// 8d7a4bc693