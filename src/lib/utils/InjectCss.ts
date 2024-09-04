export function injectCss(css: string): void {
    let styleElement = document.getElementById("ghss-container") as HTMLStyleElement;

    if (!styleElement) {
        styleElement = document.createElement("style");
        styleElement.id = "ghss-container";
        document.head.appendChild(styleElement);
    }

    styleElement.textContent = css;
}