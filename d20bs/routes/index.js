const express = require("express");
const router = express.Router();
const hotData = require("../data/hot")
const comingData = require("../data/coming")
const path = require("path");

router.get("/", (req, res) => {
    res.render("index", {
        data: hotData.movieList
    })
})
router.get("/getData", (req, res) => {
    let { type, page, limit, sortype } = req.query;
    let total, data;
    if (type == "hot") {
        data = hotData.movieList;

    } else if (type == "coming") {
        data = comingData.coming;
    }
    total = Math.ceil(data.length / limit);
    if (sortype) {
        let newData = [...data];
        newData.sort((b, a) => {
            return a[sortype] - b[sortype]
        })
        res.send({ data: newData.slice((page - 1) * limit, page * limit), total })
    } else {
        res.send({ data: data.slice((page - 1) * limit, page * limit), total });
    }
    // data = data.slice((page - 1) * limit, page * limit)
    // res.send({ data, total });
})
router.get("/search", (req, res) => {
    let val = req.query.val;
    let data = [...comingData.coming, ...hotData.movieList];
    let newData = data.filter(item => item.nm.includes(val))
    res.send(newData);
})
module.exports = router;