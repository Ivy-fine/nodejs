const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

let fooddata = require("./data/food");
let userdata = require("./data/user")

let server = http.createServer((req, res) => {
    let { pathname, query } = url.parse(req.url, true)
    if (pathname === "/favicon.ico") return res.end();
    pathname = pathname === "/" ? "/login.html" : pathname;
    console.log(pathname)
    if (path.extname(pathname)) {
        res.end(fs.readFileSync(path.join(__dirname, "src", pathname)));
    } else {
        if (pathname === "/list") {
            if (!query.typeid) {
                let arr = [];
                fooddata.forEach(item => {
                    arr.push({ type: item.type, id: item.id });
                })
                res.end(JSON.stringify(arr));
            } else {
                fooddata.forEach(item => {
                    if (query.typeid == item.id) {
                        if (!query.stypeid) {
                            let arr = [];
                            item.content.forEach(item => {
                                arr.push({ type: item.type, id: item.id })
                            })
                            res.end(JSON.stringify(arr));
                        } else {
                            item.content.forEach(item => {
                                if (query.stypeid == item.id) {
                                    let arr = [];
                                    item.content.forEach(item => {
                                        arr.push(item);
                                    })
                                    res.end(JSON.stringify(arr))
                                }
                            })
                        }
                    }
                })
            }
        } else if (pathname === "/log") {
            let flag = userdata.some(item => query.name === item.name && query.pwd === item.pwd);
            if (flag) {
                res.end(JSON.stringify({ code: 1, msg: '登录成功' }))
            } else {
                res.end(JSON.stringify({ code: 0, msg: '用户名或密码错误' }))
            }
        } else if (pathname === "/reg") {
            let flag = userdata.some(item => query.name === item.name);
            if (flag) {
                res.end(JSON.stringify({ code: 0, msg: '用户名已被占用' }))
            } else {
                userdata.push(query);
                fs.writeFileSync("./data/user.json", JSON.stringify(userdata));
                res.end(JSON.stringify({ code: 1, msg: '注册成功' }))
            }
        }
    }
})
server.listen(9292, () => {
    console.log(server.address().port + "被启动了")
})