class Ajax {
    constructor() {
        // 1、创建ajax实例
        this.xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");
    }
    get(opt) {
        return new Promise((resolve, reject) => {
            let { url, async = true, params, resType = "json" } = opt;
            //2、打开和服务器的连接   注意点  ?传参
            url = params ? url + "?" + this.formate(params) : url;
            this.xhr.open("get", url, async)
                //3  等待响应数据
            this.xhr.onreadystatechange = () => {
                    if (this.xhr.readyState === 4) { //后台准备好  可以响应数据  5个  0-4
                        if (this.xhr.status === 200) { //响应成功
                            if (resType === "json") {
                                resolve(JSON.parse(this.xhr.responseText))
                            } else {
                                resolve(this.xhr.responseText)
                            }
                        } else {
                            reject(new Error(this.xhr.status))
                        }
                    }
                }
                //4、发送请求
            this.xhr.send(null)
        })
    }
    post(opt) {
        return new Promise((resolve, reject) => {
            // MimeType    Mime类型
            //application/x-www-form-urlencoded  序列化字符串
            //application/json json格式的字符串
            let { url, async = true, params, resType = "json", paramsType = "application/x-www-form-urlencoded" } = opt;
            //2、打开和服务器的连接   注意点 send()  req.body()
            this.xhr.open("post", url, async)
                //3  等待响应数据
            this.xhr.onreadystatechange = () => {
                    if (this.xhr.readyState === 4) { //后台准备好  可以响应数据  5个  0-4
                        if (this.xhr.status === 200) { //响应成功
                            if (resType === "json") {
                                resolve(JSON.parse(this.xhr.responseText))
                            } else {
                                resolve(this.xhr.responseText)
                            }
                        } else {
                            reject(new Error(this.xhr.status))
                        }
                    }
                }
                //4、发送请求  setRequestHeader设置请求头信息
            this.xhr.setRequestHeader("content-type", paramsType)
            this.xhr.send(this.formate(params, paramsType))
                // this.xhr.send("1")
        })
    }
    formate(obj, paramsType = "application/x-www-form-urlencoded") { //{user:1,pwd:1}   //user=1&pwd=1  序列化字符串
        if (paramsType === "application/x-www-form-urlencoded") {
            return Object.entries(obj).map(item => item.join("=")).join("&") //user=1&pwd=1  序列化字符串
        } else if (paramsType === "application/json") {
            return JSON.stringify(obj) //  ‘{user:1,pwd:1}’
        }
    }
}
let ajax = new Ajax();