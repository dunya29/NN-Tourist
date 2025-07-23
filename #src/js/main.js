window.addEventListener("load", () => {
    if (document.querySelector(".preloader")) {
        setTimeout(() => {
            document.body.classList.remove("no-scroll")
            document.body.classList.add("loaded")
        }, 0);
    }
})
//scroll pos
function scrollPos() {
    return window.pageYOffset || document.documentElement.scrollTop
}
// fadeUp animation
function animate() {
    if (document.querySelectorAll('[data-animation]').length) {
        document.querySelectorAll('[data-animation]').forEach(item => {
            if (!item.classList.contains("animated")) {
                let itemTop = item.getBoundingClientRect().top + scrollPos();
                let itemPoint = Math.abs(window.innerHeight - item.offsetHeight * 0.1);
                let itemScrolled = itemPoint > 100 ? itemPoint : 100
                if (scrollPos() > itemTop - itemScrolled) {
                    let animName = item.getAttribute("data-animation")
                    item.classList.add(animName);
                    item.classList.add("animated");
                }
            }

        })
    }

}
animate()
window.addEventListener("scroll", animate)
// tippy
const tippy = document.querySelectorAll('.tippy')
const tippyContent = document.querySelector(".tippy-content")
if (tippy.length > 0) {
    let timeOut
    let docW = document.documentElement.clientWidth
    function move(item) {
        console.log(item.getBoundingClientRect().right)
        let winW = window.innerWidth
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
    window.addEventListener("resize", leave)
    window.addEventListener("scroll", leave)
}
//speakers swiper
const merchSwiper = document.querySelector('.promo-merch .swiper')
if (merchSwiper) {
    new Swiper(merchSwiper, {
        slidesPerView: 1,
        spaceBetween: 10,
        observer: true,
        observeParents: true,
        watchSlidesProgress: true,
        breakpoints: {
            1200: {
                slidesPerView: 2,
                spaceBetween: 20,
            },
            768: {
                slidesPerView: 1.335,
                spaceBetween: 16,
            },
        },
        speed: 800,
    });
}