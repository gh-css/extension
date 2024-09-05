<div align=center>

<img src="https://raw.githubusercontent.com/gh-css/extension/master/assets/ghcss.png" width="500" height="220" alt="ghcss banner">

<br>

![Badge Firefox Version] 
![Badge Chrome Version] 
![Badge License] 
![Badge Issues Open]

<br>

A simple extension that allows users to view custom css on GitHub profiles.
<br>
<br>

---

**[<kbd> <br> Firefox <br> </kbd>][Firefox]** 
**[<kbd> <br> Chrome <br> </kbd>][Chrome]** 

---

<br>

</div>

# Usage
### For User Pages
Create a `user.css` file inside your user profile repository (e.g. `github.com/someuser/someuser`).

### For Repositories
Create a `repo.css` file inside your repository. (e.g. `github.com.com/someuser/somerepo`).

### For Organizations
Create a `org.css` file inside the `.github` repository (e.g. `github.com/someorg/.github`).

# Building
1. Install required npm packages with `npm install` after cloning the repository
2. Building the extension

   Run either `npm run build:all` to build it for all browsers at the same time,
   `npm run build:chrome` to just build for chromium or
   `npm run build:ff` to build the extension for firefox.
3. The build output is located in `dist/`

> [!NOTE]
> If you try to use the firefox build, you may need to update the manifest.json because there is an issue with the current build tool.<br/>
> To do this either change `background/services.js` to `background/service_worker.js` yourself or simply run the following command:<br/>
> `sed -i 's/background\/scripts\.js/background\/service_worker\.js/g' dist/firefox/manifest.json`


<!----------------------------------------------------------------------------->

[Firefox]: https://addons.mozilla.org/en-US/firefox/addon/ghcss-extension
[Chrome]: https://chromewebstore.google.com/detail/ghcss-extension/aelelmkakekefmdealedjjckjjmdoldl

<!----------------------------------{ Badges }--------------------------------->

[Badge Firefox Version]: https://img.shields.io/amo/v/ghcss-extension
[Badge Chrome Version]: https://img.shields.io/chrome-web-store/v/aelelmkakekefmdealedjjckjjmdoldl
[Badge License]: https://img.shields.io/github/license/gh-css/extension
[Badge Issues Open]: https://img.shields.io/github/issues/gh-css/extension
