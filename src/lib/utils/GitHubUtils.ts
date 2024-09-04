import {GitHubPageType} from "../types/GitHubPageType";
import {fetchPlainCss, tryFetchFromAllCommonBranches} from "./FetchData";

export async function fetchGitHubCss(): Promise<string | null> {
    let css: string | null = null;
    const pageType = getGitHubPageType().type;

    if (pageType === null) {
        return null;
    }

    try {
        const cssPath = await getGitHubCssPath(pageType);

        if (!cssPath) {
            return null;
        }

        css = await fetchPlainCss(cssPath);
    } catch (error) {
        console.log(`Failed to fetch CSS: ${error}`);
        return null;
    }

    return css;
}

export function getGitHubPageType(): { type: GitHubPageType | null, id: string | null } {
    const metaOrganization = document.querySelector('meta[content^="organization:"]')?.getAttribute("content")?.split(":").pop() || null;
    const metaRepository = document.querySelector('meta[content^="repository:"]')?.getAttribute("content")?.split(":").pop() || null;
    const metaUser = document.querySelector('meta[name="octolytics-dimension-user_id"]')?.getAttribute("content") || null;
    
    return {
        type: metaOrganization ? GitHubPageType.Organization : metaRepository ? GitHubPageType.Repo : metaUser ? GitHubPageType.User : null,
        id: metaOrganization || metaRepository || metaUser || null
    }
}

async function getGitHubCssPath(pageType: GitHubPageType): Promise<string | null> {
    const basePath = `https://raw.githubusercontent.com`;
    const pathSegments = new URL(window.location.href).pathname.split("/").filter(segment => segment !== "");

    const owner = pathSegments[0];
    const repo = pathSegments[1] || "";

    try {
        let cssPath: string | null;
        
        // fetching the main branch without auth causes ip wide rate limits pretty quickly, we probably need to cache this or store the css on our end
        /*const mainBranch = await fetchMainBranch(owner, pageType === GitHubPageType.Organization ? ".github" : repo || owner);

        if (!mainBranch) {
            return null;
        }

        switch (pageType) {
            case GitHubPageType.Organization:
                cssPath = `${basePath}/${owner}/.github/${mainBranch}/org.css`;
                break;
            case GitHubPageType.Repo:
                cssPath = `${basePath}/${owner}/${repo}/${mainBranch}/repo.css`;
                break;
            case GitHubPageType.User:
                cssPath = `${basePath}/${owner}/${owner}/${mainBranch}/user.css`;
                break;
        }*/
        
        // temporary "fix"
        cssPath = await tryFetchFromAllCommonBranches(basePath, pageType, owner, repo);

        return cssPath;
    } catch (error) {
        console.log(`Failed to get CSS path: ${error}`);
        return null;
    }
}