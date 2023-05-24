document.addEventListener("DOMContentLoaded", () => {
    heroArea.initialize();
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
            itemsMarketing +=  `
                <article id="panel-${index+1}" class="panel full-screen red">
                    <div class="container">
                        <div class="row">
                            <div class="col-6 d-flex flex-column">
                                <h1 class="heading-title mb-3">${truncateContent(item.title, 18)}</h2>
                                <p class="step-description">${truncateContent(item.description)}</p>
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




















  