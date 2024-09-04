import {fetchGitHubCss} from "./GitHubUtils";
import {getBaseUrl} from "./Urls";

let lastBaseUrl: string | null = null;

export async function injectOrUpdateCss(url: string) {
    if (lastBaseUrl !== getBaseUrl(url) || lastBaseUrl === null) {
        lastBaseUrl = url;
        
        removeInjectedCss();

        const css = await fetchGitHubCss();
        
        if (css !== null && css.length > 0) {
            injectCss(css);
        }
    }
}

function injectCss(css: string): void {
    let styleElement = document.getElementById("ghss-container") as HTMLStyleElement;

    if (!styleElement) {
        styleElement = document.createElement("style");
        styleElement.id = "ghss-container";
        document.head.appendChild(styleElement);
    } 

    styleElement.textContent = css;
}

export function removeInjectedCss(): void {
    let styleElement = document.getElementById("ghss-container") as HTMLStyleElement;
    if (styleElement !== null) {
        styleElement.remove();
    }
}

export function isCssInjected(): boolean {
    let styleElement = document.getElementById("ghss-container") as HTMLStyleElement;
    return styleElement === null;
}