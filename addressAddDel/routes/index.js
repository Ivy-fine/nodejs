const express = require("express");
const router = express.Router();
let addData = require("../data/address");
const fs = require("fs");

router.get("/getList", (req, res) => {
    if (req.query.id) {
        let data = addData.filter(item => item.id === req.query.id);
        res.send(data[0]);
    } else {
        res.send(addData);
    }
})
router.post("/addInfo", (req, res) => {
    let data = req.body;
    if (data.isDefault == "true") {
        addData.forEach(item => {
            item.isDefault = "false";
        })
    }
    data.id = new Date() * 1 + "";
    addData.push(data);
    write("./data/address.json", addData);
    res.send({ code: 0, msg: "添加成功" })
})
router.post("/updateInfo", (req, res) => {
    let data = req.body;
    if (data.isDefault == "true") {
        addData.forEach(item => {
            item.isDefault = "false";
        })
    }
    let newData = addData.map(item => {
        if (item.id === data.id) {
            return data;
        } else {
            return item;
        }
    })

    res.send({ code: 0, msg: "修改成功" });
    write("./data/address.json", newData);
})
router.get("/removeInfo", (req, res) => {
    let data = addData.filter(item => item.id != req.query.id);
    write("./data/address.json", data);
    res.send({ code: 0, msg: "删除成功", data })
})

function write(path, data) {
    fs.writeFileSync(path, JSON.stringify(data));
}


module.exports = router;