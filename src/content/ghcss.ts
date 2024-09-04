import {fetchGitHubCss} from "../lib/utils/GitHubUtils";
import {injectCss} from "../lib/utils/InjectCss";

async function main() {
    try {
        const css = await fetchGitHubCss();
        
        if (css !== null) {
            injectCss(css);
        }
    } catch (error) {
        console.error(error);
    }
}

main().then();