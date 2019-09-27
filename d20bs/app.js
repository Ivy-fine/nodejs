const express = require("express");
const path = require("path");
const router = require("./routes");
const app = express();
app.use(express.static(path.join(__dirname, "public")))
app.use(express.urlencoded());
app.use(express.json());


app.set("views", "./views")
app.set("view engine", "ejs")
app.use(router)
app.listen(9292, () => {
    console.log("9292 start")
})