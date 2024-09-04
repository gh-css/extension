export function getBaseUrl(url: string): string {
    try {
        const urlObj = new URL(url);
        return `${urlObj.protocol}//${urlObj.host}${urlObj.pathname}`;
    } catch (e) {
        console.error("Invalid URL:", e);
        return url;
    }
}