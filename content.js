// This script clicks load more buttons when it's time

function isElementInViewport(element) {
    var rect = element.getBoundingClientRect()
    return (
        rect.top >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight)
    )
}

function clickButtonsContaining(textContent) {
    Array.from(document.querySelectorAll('button'))
        .filter(el => el.textContent === textContent)
        .filter(isElementInViewport)
        .forEach(el => {
            console.log('Clicking', el)
            el.style.opacity = 0.5
            el.textContent = 'Loading...'
            el.click()

            el.disabled = true
        })
}

function debouncedClickLoadComments(frequencyMs) {
    let timeout

    return () => {
        if (!timeout) {
            timeout = setTimeout(() => {
                timeout = null

                clickButtonsContaining('Load replies')
            }, frequencyMs)
        }
    }
}

window.addEventListener('scroll', debouncedClickLoadComments(50), false);
window.setInterval(debouncedClickLoadComments(0), 1000)