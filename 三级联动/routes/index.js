const express = require("express");
const router = express.Router();
const fooddata = require("../data/food");

router.get("/flist", (req, res) => {
    let arr = [];
    fooddata.forEach(item => {
        arr.push(item.type)
    })
    res.send(arr);
})
router.get("/slist", (req, res) => {
    let arr = [];
    let m = req.query.m;
    fooddata[m].content.forEach(item => {
        arr.push(item.type);
    })
    res.send(arr);
})
router.get("/tlist", (req, res) => {
    let { m, n } = req.query;
    res.send(fooddata[m].content[n].content);
})






module.exports = router;