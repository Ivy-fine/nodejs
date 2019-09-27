let lt = document.querySelector(".left ul");
let rtnav = document.querySelector(".right .nav ul");
let rlist = document.querySelector(".right .list");

async function getData() {
    let ltinit = await ajax.get({
        url: '/list'
    })
    let rtnavinit = await ajax.get({
        url: `/list?typeid=1`
    })
    let rlistinit = await ajax.get({
        url: `/list?typeid=1&stypeid=1`
    })
    await render(ltinit, lt);
    await render(rtnavinit, rtnav);
    await renderlist(rlistinit)
    lt.children[0].classList.add("active");
    rtnav.children[0].classList.add("active");
}
getData();

lt.onclick = (e) => {
    let tag = e.target;
    if (tag.nodeName == "LI") {
        lt.querySelector("li.active").classList.remove("active");
        tag.classList.add("active");
        ajax.get({
            url: `/list?typeid=${tag.dataset.type}`
        }).then(async res => {
            await render(res, rtnav);
            rtnav.children[0].classList.add("active")
            ajax.get({
                url: `/list?typeid=${tag.dataset.type}&stypeid=1`
            }).then(res => {
                renderlist(res)
            })
        })
    }
}
rtnav.onclick = (e) => {
    let tag = e.target;
    if (tag.nodeName === "LI") {
        rtnav.querySelector("li.active").classList.remove("active");
        tag.classList.add("active");
        let n = lt.querySelector("li.active").dataset.type;
        ajax.get({
            url: `/list?typeid=${n}&stypeid=${tag.dataset.type}`
        }).then(res => {
            renderlist(res)
        })
    }
}

function render(data, el) {
    el.innerHTML = data.map((item, i) => {
        return `<li data-type=${item.id}>${item.type}</li>`
    }).join("")
}

function renderlist(data) {
    rlist.innerHTML = data.map(item => {
        return `<li>${item}</li>`
    }).join("")
}