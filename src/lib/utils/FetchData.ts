import {GitHubPageType} from "../types/GitHubPageType";

export async function fetchMainBranch(owner: string, repo: string): Promise<string | null> {
    const url = `https://api.github.com/repos/${owner}/${repo}`;

    try {
        const response = await fetch(url);
        
        if (response.status === 404) {
            return null;
        }
        
        const data = await response.json();

        return data.default_branch || null;
    } catch (error) {
        console.log(`Failed to fetch JSON: ${error}`);
        return null;
    }
}

export async function tryFetchFromAllCommonBranches(basePath: string, pageType: GitHubPageType, owner: string, repo: string): Promise<string | null> {
    const commonBranches = ["main", "master"];
    const cssFileNames = {
        [GitHubPageType.Organization]: "org.css",
        [GitHubPageType.Repo]: "repo.css",
        [GitHubPageType.User]: "user.css"
    };

    const cssFile = cssFileNames[pageType];

    for (const branch of commonBranches) {
        const url = `${basePath}/${owner}/${repo || owner}/${branch}/${cssFile}`;
        try {
            const response = await fetch(url, { method: 'HEAD' });
            if (response.ok) {
                return url;
            } else if (response.status === 404) {
                console.log(`Could not find custom css for ${owner} on branch ${branch}`);
            }
        } catch (error) {
            console.log(`Failed to fetch CSS file at ${url}: ${error}`);
        }
    }
    
    return null;
}

export async function fetchPlainCss(url: string): Promise<string | null> {
    try {
        const response = await fetch(url, { headers: { "Accept": "text/plain" } });
        
        if (response.status === 404) {
            return null;
        }
        
        console.log(`Successfully fetched custom CSS from ${url}`);
        
        return await response.text();
    } catch (error) {
        console.log(`Failed to fetch text: ${error}`);
        return null;
    }
}