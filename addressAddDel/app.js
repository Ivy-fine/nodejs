const express = require("express");
const router = require("./routes");
const path = require("path");
const app = express();
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded());

app.use(router)

app.listen(9292, () => {
    console.log("9292 start")
})