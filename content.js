// This script clicks load more buttons when it's time

function isElementInViewport(element) {
    var rect = element.getBoundingClientRect()
    return (
        rect.top >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight)
    )
}

function clickButtonsContaining(textContent, filterBy, onClick) {
    let matches = Array.from(document.querySelectorAll('button'))
        .filter((element) => element.textContent === textContent)

    if (filterBy) {
        matches = matches.filter(filterBy)
    }

    if (matches.length > 0) {
        console.log('Clicking all containing', { textContent, matches, commentsLoaded: document.querySelectorAll("[data-tag='comment-body']").length })
    }

    matches.forEach((element) => {
        element.click()
        onClick && onClick(element)
    })
}

function clickLoadReplies() {
    clickButtonsContaining('Load replies', isElementInViewport, (element) => {
        element.style.opacity = 0.5
        element.textContent = 'Loading...'
        element.disabled = true
    })
}

function clickLoadTopLevelComments() {
    clickButtonsContaining('Load more comments', (element) => element.getAttribute("aria-disabled") == "false")
}

function debounced(frequencyMs, fn) {
    let timeout

    return () => {
        if (!timeout) {
            timeout = setTimeout(() => {
                timeout = null

                fn()
            }, frequencyMs)
        }
    }
}

window.addEventListener('scroll', debounced(50, clickLoadReplies), false)
window.setInterval(clickLoadReplies, 1000)

const loadAllButton = document.createElement("button")
loadAllButton.textContent = "Load all comments"
loadAllButton.addEventListener("click", () => {
    window.setInterval(clickLoadTopLevelComments, 50)
})

// Append the button to the container
document.querySelector("[data-tag='content-card-comment-thread-container']").prepend(loadAllButton)