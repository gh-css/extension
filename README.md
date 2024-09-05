# ghcss-extension

A simple extension that allows users to view custom css on GitHub profiles.

# Usage
### For User Pages
Create a `user.css` file inside your user profile repository (e.g. https://github.com/someuser/someuser).

### For Repositories
Create a `repo.css` file inside your repository.

### For Organizations
Create a `org.css` file inside the `.github` repository (e.g. https://github.com/someorg/.github)

# Building
1. Install required npm packages with `npm install` after cloning the repository
2. Buildung the extension
   Run either `npm run build:all` to build it for all browsers at the same time,
   `npm run build:chrome` to just build for chromium or
   `npm run build:ff` to build the extension for firefox.
3. The build output is located in `dist/`

> [!NOTE]
> If you try to use the firefox build you may need to update the manifest.json because there is an issue with the current build tool.<br/>
> To do this either change `background/services.js` to `background/service_worker.js` yourself or simply run the following command:<br/>
> `sed -i 's/background\/scripts\.js/background\/service_worker\.js/g' dist/firefox/manifest.json`
