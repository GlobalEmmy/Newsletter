const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");
const request = require("request");
const port = 3000 || process.env.PORT;
const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/signup.html");
});

app.post("/", (req, res) => {
  let fName = req.body.fName;
  let lName = req.body.lName;
  let phone = req.body.phone;
  let email = req.body.email;

  // console.log(fName, lName, phone, email);

  let data = {
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: fName,
          LNAME: lName,
          PHONE: phone,
        },
      },
    ],
  };
  let jsonData = JSON.stringify(data);

  let url = "https://us14.api.mailchimp.com/3.0/lists/cdd2db561a";
  let options = {
    method: "POST",
    auth: "Emmanuel:0492369dafa9580e3ac04a4c61089e74-us14",
  };
  let request = https.request(url, options, (response) => {

    if (response.statusCode === 200){
        res.sendFile(__dirname + "/success.html")
    } else {
        res.sendFile(__dirname + "/failure.html")
    }
    // res.redirect ("/")
    response.on("data", (data) => {
      console.log(JSON.parse(data));
    });
    
  });
  request.write(jsonData);
  request.end();
});
app.post ("/failure", (req, res) => {
    res.redirect("/")
})

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});

//api key1
//d8c1735b618c8ec79a1b3036d57c2f78-us14

//api key2 used for this project
//0492369dafa9580e3ac04a4c61089e74-us14

//unique id
//cdd2db561a
