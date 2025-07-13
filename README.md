# FB Video Downloader

## 📌 Table of Contents
1. [Main Purpose of the Project](#1-main-purpose-of-the-project)
2. [Setting Up the Development Environment](#2-setting-up-the-development-environment)

---

## 1. Main Purpose of the Project

I was frustrated with existing online Facebook video downloaders—especially because most of them don't work with videos in **private groups**.  
So, I decided to create my own **Chrome extension** to solve this issue and meet my specific needs.

---

## 2. Setting Up the Development Environment

1. In the main project directory, run:

   ```bash
   npm install
   npx tsc
   ```
2. Once compiled, the extension is ready to load via `chrome://extensions/`
3. Enable **Developer Mode**, then click **"Load unpacked"** and select the compiled project folder.
