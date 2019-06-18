const https = require("https");

var express = require("express");
var app = express();
app.use(express.static("public"));

app.get("/url", (req, res, next) => {
  res.json(["Tony", "Lisa", "Michael", "Ginger", "Food"]);
});

app.get("/lunch-list", (req, res, next) => {
  https
    .get(
      "https://trouble.tools/506/wp-json/wp/v2/multiple-post-type?slug=june-18-2019&type[]=menu",
      resp => {
        let data = "";

        // A chunk of data has been recieved.
        resp.on("data", chunk => {
          data += chunk;
        });

        // The whole response has been received. Print out the result.
        resp.on("end", () => {
          let list = JSON.parse(data)[0].acf.menu_items;
          let dishes = list
            .filter(item => item.menu_item)
            .map(item => item.menu_item.text);

          res.json(dishes);
        });
      }
    )
    .on("error", err => {
      console.log("Error: " + err.message);
    });
});

app.listen(9876, () => {
  console.log("Server running on port 9876");
});
