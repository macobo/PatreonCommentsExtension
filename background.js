// This script intercepts post comment query to load more at once

chrome.webRequest.onBeforeRequest.addListener(function(details) {
        const url = new URL(details.url)

        // Set how many top-level comments to load at a time. 100 seems to be the enforced max
        url.searchParams.set('page[count]', 1000)

        return { redirectUrl: url.toString() }
    },
    {
        urls: ["*://www.patreon.com/api/posts/*"]
    },
    ["blocking"]
);