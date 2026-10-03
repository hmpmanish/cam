# Smart CCTV Node & Google Drive Auto-Save System

This project is a modern, responsive, CCTV-style web application designed to capture photos from a mobile device (or laptop camera) and securely upload them directly to your Google Drive. When combined with Google Drive for Desktop, these images automatically sync to your laptop folder.

## System Architecture

1. **Frontend:** `index.html` (Runs on the phone browser, requests camera permission, captures frame)
2. **Backend:** `Code.gs` (Runs on Google Apps Script, receives image, saves to Drive)
3. **Storage & Sync:** Google Drive + Google Drive for Desktop (Syncs images locally)

---

## 🚀 Step-by-Step Setup Guide

### Phase 1: Prepare Google Drive
1. Go to your [Google Drive](https://drive.google.com).
2. Create a new folder where you want the CCTV photos to be saved (e.g., `CCTV_Uploads`).
3. Open the new folder and look at the URL in your browser.
   - It will look like: `https://drive.google.com/drive/folders/1aBcDeFgHiJkLmNoP_QrStUvWxYz`
4. Copy the long string of characters at the end (the ID). 

### Phase 2: Deploy the Backend (Google Apps Script)
1. Go to [Google Apps Script](https://script.google.com) and click **New Project**.
2. Name the project `CCTV Backend`.
3. Delete any default code in the editor and copy-paste the entire contents of `Code.gs` from this repository.
4. On line 10, replace `YOUR_GOOGLE_DRIVE_FOLDER_ID_HERE` with the ID you copied in Phase 1.
5. Click the **Deploy** button (top right) > **New deployment**.
6. Click the gear icon next to "Select type" and choose **Web app**.
7. Configure the deployment:
   - **Description:** Version 1
   - **Execute as:** `Me (your email)` *(Crucial for saving to your drive)*
   - **Who has access:** `Anyone` *(Crucial so the phone browser doesn't need to sign in)*
8. Click **Deploy**.
9. You will be asked to authorize access. Click **Authorize access**, select your account, click **Advanced**, and proceed to the unsafe link (this is normal for custom scripts). Allow Drive permissions.
10. Once deployed, copy the **Web app URL** (starts with `https://script.google.com/macros/s/.../exec`).

### Phase 3: Configure the Frontend
1. Open the `index.html` file in a code editor.
2. Scroll down to the `<script>` section around line 290.
3. Replace the placeholder `"YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL"` with the Web app URL you copied in Phase 2.
4. Save the file.

### Phase 4: Host the Website (HTTPS Required)
For mobile browsers to allow camera access (`getUserMedia`), the website **must** be served over HTTPS. You cannot simply open the local HTML file on your phone. 

**Free Hosting Options:**
- **GitHub Pages:** Upload `index.html` to a public GitHub repository and enable GitHub Pages in settings.
- **Vercel / Netlify:** Drag and drop the folder containing `index.html` into their dashboard.

Once deployed, copy your live website link (e.g., `https://my-cctv.netlify.app`).

### Phase 5: Setup Auto-Sync to Laptop
To make photos appear automatically on your computer:
1. Download and install [Google Drive for Desktop](https://www.google.com/drive/download/).
2. Sign in with the same Google Account used in Phase 2.
3. In your File Explorer (Windows) or Finder (Mac), you will now see a `Google Drive` volume.
4. Navigate to `My Drive` > `CCTV_Uploads` (or whatever you named the folder).
5. (Optional) Right-click the folder and choose **Offline Access > Available offline** to ensure files aggressively download to your local disk immediately.

---

## 🧪 Testing Instructions

1. **Test on Phone 1:** Open the hosted `index.html` link. Grant camera permissions. Capture a photo, and click "Confirm & Secure Upload".
2. **Verify on Laptop:** Open the synced local folder on your computer. The photo should appear within seconds, neatly organized in a date-based subfolder (e.g., `2026-10-04`).
3. **Test on Phone 2:** Send the link to a second phone and repeat the process. Both phones will seamlessly upload to the central Drive, and sync to the laptop.

---

## ⚠️ Troubleshooting & Error Handling

- **Camera Error (Not Allowed):** Ensure the phone didn't block camera permissions in browser settings. Ensure you are accessing the site via `https://`.
- **Upload Fails / CORS Errors:** Ensure the Google Apps Script Web App was deployed as **Execute as: Me** and **Who has access: Anyone**. 
- **Internet Disconnection:** The frontend requires an active internet connection to submit the POST request. If offline, the request will fail immediately and notify the user via the red UI text.
- **Unsupported Browsers:** Extremely old browsers without WebRTC (`getUserMedia`) support will throw an error immediately upon clicking "Initialize Camera". Use a modern iOS Safari or Android Chrome browser.
- **Drive Quota:** Ensure your Google Drive has sufficient free space.

*Note: The browser itself cannot directly save files to a laptop hard drive across the internet. The data flows: Browser -> Google Servers (Apps Script -> Drive) -> Google Drive Desktop App -> Local Disk.*
