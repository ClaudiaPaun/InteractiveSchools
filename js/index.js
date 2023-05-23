// The Hero Area
let marketing = {
    initialize() {
        let marketingItems = marketing.getRandomMarketingItems(marketingCollection, 3)

        let itemsMarketing = ""
        const truncateContent = (string = '', maxLength = 50) => string.length > maxLength ? `${string.substring(0, maxLength)}…`: string
        marketingItems.forEach(item => {
            itemsMarketing += "<div class='content_slide-marketing'>" + truncateContent(item.title) + " / " + truncateContent(item.description, 60) + "</div>";
        })

        document.getElementById('marketingCarousel').innerHTML = itemsMarketing
    },

    getRandomMarketingItems(arr, num) {
        arr = arr.filter(item => item.title.length > 0);

        const shuffled = [...arr].sort(() => 0.5 - Math.random());
    
        return shuffled.slice(0, num);
    }
} 

marketing.initialize()





