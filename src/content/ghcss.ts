import {injectOrUpdateCss, removeInjectedCss} from "../lib/utils/InjectCss";

async function main() {
    try {
        await injectOrUpdateCss(document.URL);
    } catch (error) {
        console.error(error);
    }
}

chrome.runtime.onMessage.addListener((message) => {
    switch (message.action) {
        case "injectCss":
            main().then();
            break;
        case "removeInjectedCss":
            removeInjectedCss();
            break;
    }
});