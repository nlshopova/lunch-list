const https = require("https");

var express = require("express");
var app = express();

var formatedDate = function() {
  var today = new Date();
  var options = { year: "numeric", month: "long", day: "numeric" };
  var dateString = today.toLocaleDateString("en-US", options);
  dateString = dateString.split(", ").join("-");

  return dateString;
};

var todayDate = formatedDate();

app.use(express.static("public"));

app.get("/lunch-list", (req, res, next) => {
  https
    .get(
      "https://trouble.tools/506/wp-json/wp/v2/multiple-post-type?slug=" +
        todayDate +
        "&type[]=menu",
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
