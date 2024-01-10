// This script intercepts post comment query to load more at once

chrome.webRequest.onBeforeRequest.addListener(function(details) {
        const url = new URL(details.url)

        url.searchParams.set(
            'page[count]',
            1000
        )

        return { redirectUrl: url.toString() }
    },
    {
        urls: ["https://www.patreon.com/api/posts/*/comments*"]
    },
    ["blocking"]
);