let element;
// https://icons8.com/icon/30439/slack
const customIconLink = "https://img.icons8.com/office/40/null/slack.png"

const changeFavicon = () => {
    element = element || document.head.querySelector('[rel="shortcut icon"]');
    if (element && element.getAttribute("href") !== customIconLink) {
        element.setAttribute("href", customIconLink)
    }
}

// Slack changes favicon when we get notification, with MutationObserver we're watching for any change in the favicon and then update it again with our icon
const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
        console.log({ mutation });
        if (mutation.type === "attributes" && element.href !== customIconLink) {
            changeFavicon()
            console.log("The href attribute of the shortcut icon has changed to: ", element.href);
        }
    });
});

setTimeout(() => {
    element = document.head.querySelector('[rel="shortcut icon"]');
    const config = { attributes: true };
    observer.observe(element, config);
    changeFavicon()
}, 5000)
