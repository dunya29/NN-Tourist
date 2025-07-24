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
if (tippy.length && tippyContent) {
    let timeOut
    function enter(item) {
        clearTimeout(timeOut)
        if (!tippyContent.classList.contains("show")) {
            let docW = document.documentElement.clientWidth
            tippyContent.querySelector(".tippy-content__inner").innerHTML = item.querySelector(".tippy__content").innerHTML
            let top = item.getBoundingClientRect().top
            let right = item.getBoundingClientRect().right
            let topPos = top - tippyContent.offsetHeight
            tippyContent.style.top = scrollPos() + topPos + "px"
            tippyContent.style.right = docW - right + 'px'
            tippyContent.classList.add("show")
            if (tippyContent.getBoundingClientRect().top < 0) {
                window.scrollTo({
                    top: scrollPos() + tippyContent.getBoundingClientRect().top - 20,
                    left: 0,
                    behavior: "smooth",
                })
            }

        }
    }
    function leave() {
        timeOut = setTimeout(() => {
            tippyContent.classList.remove("show")
            timeOut = setTimeout(() => {
                tippyContent.querySelector(".tippy-content__inner").innerHTML = ""
            }, 300);
        }, 300);
    }
    tippy.forEach(item => {
        item.addEventListener("mouseenter", () => enter(item));
        item.addEventListener("mouseleave", leave);
        tippyContent.addEventListener("mouseenter", () => enter(item));
        tippyContent.addEventListener("mouseleave", leave);
        item.addEventListener("touchstart", (event) => {
            event.preventDefault();
            if (tippyContent.classList.contains("show")) {
                leave();
            } else {
                enter(item);
                let handleClickOutside = (e) => {
                    if (!item.contains(e.target) && !tippyContent.contains(e.target)) {
                        leave();
                        document.removeEventListener('click', handleClickOutside);
                    }
                };
                document.addEventListener('click', handleClickOutside);
            }
        }, { passive: false });
    })
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
            768: {
                slidesPerView: 2,
                spaceBetween: 20,
            },
            480: {
                slidesPerView: 1.335,
                spaceBetween: 16,
            },
        },
        speed: 800,
    });
}
const itemTilt = document.querySelectorAll('.item-tilt')
if (itemTilt.length) {
    itemTilt.forEach(item => {
        item.addEventListener("click", e => {
            if (window.innerWidth < 1200 && item.querySelector(".item-tilt__images").contains(e.target)) {
                itemTilt.forEach(el => {
                    if (el != item) {
                        el.classList.remove("show")
                    }
                })
                !item.classList.contains("show") ? item.classList.add("show") : item.classList.remove("show")
            }
        })
    })
    window.addEventListener("resize", () => {
        itemTilt.forEach(item => item.classList.remove("show"))
    })
}