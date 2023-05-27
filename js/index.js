document.addEventListener("DOMContentLoaded", () => {
    heroArea.initialize();

    document.querySelector('.anchor-arrow').addEventListener('click', (e) => {
        document.querySelector('html').style.scrollBehavior = "smooth";
        setTimeout(() => {
            document.querySelector('html').style.scrollBehavior = "auto";
        }, 1000)
    });

    simpleListCarousel.initialize();

    swiperSlide.initialize();

    rotatorSlide.initialize();

    rotatorData.initialize();
})

// The Hero Area
let heroArea = {
    initialize() {
        heroArea.getMarketingContent();

        gsap.registerPlugin(ScrollToPlugin, ScrollTrigger);

        heroArea.initGsapPanel();

        heroArea.initSliderBanner();

        heroArea.reportWindowSize();

        window.onresize = heroArea.reportWindowSize;
    },

    getMarketingContent() {
        let marketingItems = heroArea.getRandomMarketingItems(marketingCollection, 3)

        let itemsMarketing = ""
        const truncateContent = (string = '', maxLength = 70) => string.length > maxLength ? `${string.substring(0, maxLength)}…`: string
        marketingItems.forEach((item, index) => {
            let arrowSmooth = (index === 0) ? '<a href="#map" title="Next Section" class="anchor-arrow"><i class="fa-solid fa-arrow-down-long"></i></a>' : "";
            itemsMarketing +=  `
                <article id="panel-${index+1}" class="panel full-screen red">
                    <div class="container mb-5">
                        <div class="row">
                            <div>
                                <h1 class="heading-title mb-3">${truncateContent(item.title, 18)}</h2>
                                <p class="step-description">${truncateContent(item.description)}</p>
                                ${arrowSmooth}
                            </div>
                        </div>
                    </div>
                </article>
            `
        })

        document.getElementById('panels-container').innerHTML = itemsMarketing
        document.getElementById('sliderHero').innerHTML = itemsMarketing
    },

    getRandomMarketingItems(arr, num) {
        arr = arr.filter(item => item.title.length > 0);

        const shuffled = [...arr].sort(() => 0.5 - Math.random());
    
        return shuffled.slice(0, num);
    },

    initGsapPanel() {
        let panelsSection = document.querySelector("#panels"),
        panelsContainer = document.querySelector("#panels-container"),
        tween;
        document.querySelectorAll(".anchor").forEach(anchor => {
            anchor.addEventListener("click", function(e) {
                e.preventDefault();
                let targetElem = document.querySelector(e.target.getAttribute("href")),
                    y = targetElem;
                if (targetElem && panelsContainer.isSameNode(targetElem.parentElement)) {
                    let totalScroll = tween.scrollTrigger.end - tween.scrollTrigger.start,
                        totalMovement = (panels.length - 1) * targetElem.offsetWidth;
                    y = Math.round(tween.scrollTrigger.start + (targetElem.offsetLeft / totalMovement) * totalScroll);
                }
                gsap.to(window, {
                    scrollTo: {
                        y: y,
                        autoKill: false
                    },
                    duration: 1
                });
            });
        });

        /* Panels */
        const panels = gsap.utils.toArray("#panels-container .panel");
        tween = gsap.to(panels, {
            xPercent: -100 * ( panels.length - 1 ),
            ease: "none",
            scrollTrigger: {
                trigger: "#panels-container",
                pin: true,
                start: "top top",
                scrub: 1,
                snap: {
                    snapTo: 1 / (panels.length - 1),
                    inertia: false,
                    duration: {min: 0.1, max: 0.1}
                },
                end: () =>  "+=" + (panelsContainer.offsetWidth - innerWidth)
            }
        });
    },

    initSliderBanner() {
        // Glider configuration
        window.glider = new Glider(document.getElementById("sliderHero"), {
            slidesToShow: 1,
            slidesToScroll: 1,
            scrollLock: true,
            draggable: true,
            rewind: true,
            duration: 0.5,
            dragVelocity: 3.3,
            dots: ".pagination",
        });
    },

    reportWindowSize() {
        if (window.innerWidth > 991) {
            document.getElementById('mobileHeroBanner').classList.add('d-none')
            document.getElementById('heroBanner').classList.remove('d-none')
        } else {
            document.getElementById('heroBanner').classList.add('d-none')
            document.getElementById('mobileHeroBanner').classList.remove('d-none')
            window.glider.destroy()
            heroArea.initSliderBanner()
        }
    }
}


let simpleListCarousel = {
    initialize() {
        simpleListCarousel.getsimpleList();
    },

    getsimpleList() {
        let itemsList = ""
        simpleListItem.forEach((item, index) => {
            itemsList +=  `
                <div class="swiper-slide" style="background-image: url('${item.image}')">
                    <div class="content_swiper">
                        <div class="description">${item.description}</div>
                        <a href="${item.link}" title="icon" target="_black"><i class="fa-solid fa-arrow-right-long"></i></a>
                    </div>
                </div>
            `
        })

        document.getElementById('insertList').innerHTML = itemsList
    },
}


let swiperSlide = {
    initialize() {
        swiperSlide.initSwiperSlide();
    },

    initSwiperSlide() {
        var galleryTop = new Swiper(".gallery-top", {
            direction: "vertical",
            effect: 'slide',
            spaceBetween: 10,
            mousewheel: true,
            keyboard: {
              enabled: true,
            },
        });
        galleryTop.on("transitionStart", function () {
            galleryTop.slideTo(galleryTop.activeIndex);
        });
    },
}


let rotatorData = {
    initialize() {
        rotatorData.getRotatorData();
    },

    getRotatorData() {
        let itemsList = ""
        fetch('https://dummyjson.com/products')
        .then(res => res.json())
        .then(response => {
            const slicedProducts = response.products.slice(0, 4);
            const truncateContent = (string = '', maxLength = 40) => string.length > maxLength ? `${string.substring(0, maxLength)}…`: string
            slicedProducts.forEach((item, index) => {
                itemsList +=  `
                    <div class="swiper-slide">
                        <div class="content_swiper">
                            <div class="col-6 box-description">
                                <div class="description-item">${truncateContent(item.description, 35)}</div>
                            </div> 
                            <div class="col-6 position-relative img_item-products">
                                <div class="description_products">
                                    <span>${item.title}</span>
                                    <a href="https://www.interactiveschools.com/" title="icon" target="_black"><i class="fa-solid fa-arrow-right-long"></i></a>
                                </div>
                                <img src="${item.images[0]}" title="" loading="lazy"/>
                            </div>
                        </div>
                    </div>
                `
            });

            document.getElementById('insertListRotator').innerHTML = itemsList
        });
    },
}

let rotatorSlide = {
    initialize() {
        rotatorSlide.initRotatorSlide();
    },

    initRotatorSlide() {
        var carouselRotator = new Swiper(".carousel-rotator", {
            direction: "horizontal",
            effect: 'fade',
            fadeEffect: {
              crossFade: true
            },
            spaceBetween: 10,
            autoplay: {
                delay: 3500,
              },
            keyboard: {
              enabled: true,
            },
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
        });
        carouselRotator.on('slideChange', rotatorSlide.initCounter);
        carouselRotator.on('slidesGridLengthChange', rotatorSlide.initCounter);
        carouselRotator.on("transitionStart", function () {
            carouselRotator.slideTo(carouselRotator.activeIndex);
        });
    },

    initCounter(swiper) {
        let counterElements = ""
        counterElements +=  `
            <div class="counter-slider">
                <span>${swiper.activeIndex+1}</span> 
                <sub><span>/</span> <span>${swiper.slides.length}</span></sub>
            </div>
        `
        document.getElementById('insertListCounter').innerHTML = counterElements
    }
}





  














  