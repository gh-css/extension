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