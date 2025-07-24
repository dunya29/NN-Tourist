if (tippy.length) {
    tippy.forEach(item => {
        let tippyContent = item.querySelector(".tippy__content")
        let tippyTimeOut
        let tippySetTimeOut
        item.addEventListener("mouseenter", () => {
            if (!tippyContent.classList.contains("show")) {
                tippyTimeOut = item.closest(".item-tilt") ? !item.closest(".item-tilt").classList.contains("show") ? 500 : 0 : 0
                tippySetTimeOut = setTimeout(() => {
                    tippyContent.classList.add("show")
                    window.scrollTo({
                        top: scrollPos() + tippyContent.getBoundingClientRect().top - 30,
                        left: 0,
                        behavior: "smooth",
                    })
                }, tippyTimeOut);
            }
        })
        item.addEventListener("mouseleave", () => {
            clearTimeout(tippySetTimeOut)
            if (tippyContent.classList.contains("show")) {
                tippyContent.classList.remove("show")
            }
        })
    })
}
/* if (tippy.length > 0) {
    let timeOut
    let docW = document.documentElement.clientWidth
    function move(item) {
        let top = item.getBoundingClientRect().top
        let right = item.getBoundingClientRect().right
        tippyContent.style.top = top - tippyContent.offsetHeight + "px"
        tippyContent.style.right = docW - right + 'px'
    }
    function leave() {
        tippyContent.classList.remove("show")
        timeOut = setTimeout(() => {
            tippyContent.querySelector(".tippy-content__inner").innerHTML = ""
        }, 300);
    }
    tippy.forEach(item => {
        item.addEventListener("mouseenter", () => {
            clearTimeout(timeOut)
            docW = document.documentElement.clientWidth
            tippyContent.querySelector(".tippy-content__inner").innerHTML = item.querySelector(".tippy__content").innerHTML
            tippyContent.classList.add("show")
            move(item)
        })
        item.addEventListener("mouseleave", leave)
    })
} */