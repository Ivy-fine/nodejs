let ajax = (function() {
    let xhr = new XMLHttpRequest();

    function get(opt) { //get ?传参
        return new Promise((resolve, reject) => {
            let { url, params, async = true, resType = "json" } = opt;
            url = params ? url + "?" + format(params) : url;
            xhr.open("get", url, async);
            xhr.onreadystatechange = function() {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        if (resType === "json") {
                            resolve(JSON.parse(xhr.responseText))
                        } else {
                            resolve(xhr.responseText);
                        }
                    } else {
                        reject(new Error);
                    }
                }
            }
            xhr.send(null);
        })
    }

    function post(opt) { //post send传参
        return new Promise((resolve, reject) => {
            let { url, params = {}, async = true, paramsType = "application/x-www-form-urlencoded", resType = "json" } = opt;
            xhr.open("post", url, async);
            xhr.onreadystatechange = function() {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        if (resType === "json") {
                            resolve(JSON.parse(xhr.responseText))
                        } else {
                            resolve(xhr.responseText);
                        }
                    } else {
                        reject(new Error);
                    }
                }
            }

            //设置请求头，告诉后台前端是以哪种方式传递数据
            xhr.setRequestHeader("content-type", paramsType)
            params = paramsType === "application/x-www-form-urlencoded" ? format(params) : JSON.stringify(params);
            xhr.send(params); //
        })
    }

    //转序列化字符串
    function format(params) {
        return Object.entries(params).map(item => item.join("=")).join("&")
    }
    return {
        get,
        post
    }
})()

// ajax.get({
//     url: '/list',
//     params: {
//         user,
//         pwd
//     }
// }).then(res=>{
//      console.log(res);
// })
// ajax.post({
//     url: "/list",
//     params: {
//         user,
//         pwd
//     },
//     // paramsType: "application/json" //代表给后台传递的是json格式的数据，用JSON.stringify转换

//     paramsType: "application/x-www-form-urlencoded" //代表传递的是序列化字符串格式 name=zs&age=18，用querystring转换
// }).then(res => {
//     console.log(res);
// })