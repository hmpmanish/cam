// =========================================================================
// Smart CCTV Node - Google Apps Script Backend
// =========================================================================
// This script acts as the backend endpoint to receive base64 encoded images 
// from the web app and saves them securely in a designated Google Drive folder.
// =========================================================================

// 1. IMPORTANT: Replace this with your specific Google Drive Folder ID
// You can find the ID in the URL of your Google Drive folder:
// e.g. drive.google.com/drive/folders/YOUR_FOLDER_ID_IS_HERE
const TARGET_FOLDER_ID = "1Ul6lNYdqNdahsMIT4MaKQsgoKYlbN6I8";

// 2. IMPORTANT: Telegram Bot Configuration
// Create a bot via BotFather on Telegram and get the Token.
// Find your Chat ID via @userinfobot or similar.
const TELEGRAM_BOT_TOKEN = "8640928461:AAEhKN50XntYfX6prKiWqmgdppKaF_6ABqY";
const TELEGRAM_CHAT_ID = "7919817821";

/**
 * Handle HTTP POST requests from the web app
 */
function doPost(e) {
  try {
    // Basic validation
    if (!e || !e.postData || !e.postData.contents) {
      return createJsonResponse({ status: "error", message: "No data received" });
    }

    // Parse the incoming JSON payload sent from our frontend
    var data = JSON.parse(e.postData.contents);
    
    // The base64 string format usually looks like: "data:image/jpeg;base64,/9j/4AAQ..."
    // We need to strip off the "data:image/jpeg;base64," part.
    var base64Data = data.base64.split(',')[1];
    if (!base64Data) {
      return createJsonResponse({ status: "error", message: "Invalid Base64 format" });
    }

    // Decode the base64 string into binary data
    var fileData = Utilities.base64Decode(base64Data);
    
    // Create a binary Blob with the provided MIME type and filename
    var blob = Utilities.newBlob(fileData, data.mimeType || 'image/jpeg', data.filename || 'Capture.jpg');
    
    // Fetch the target parent folder
    var parentFolder = DriveApp.getFolderById(TARGET_FOLDER_ID);
    
    // Organize by Date: Create a subfolder for the current day (e.g. "2026-10-04")
    var dateString = Utilities.formatDate(new Date(), Session.getScriptTimeZone(), "yyyy-MM-dd");
    var dateFolders = parentFolder.getFoldersByName(dateString);
    var dateFolder;
    
    // Check if the daily folder already exists, otherwise create it
    if (dateFolders.hasNext()) {
      dateFolder = dateFolders.next();
    } else {
      dateFolder = parentFolder.createFolder(dateString);
    }
    
    // Create the file in the designated folder
    var file = dateFolder.createFile(blob);
    
    // Attempt to send the same photo to Telegram
    sendPhotoToTelegram(blob, file.getName());
    
    // Return a success JSON response to the client
    return createJsonResponse({
      status: "success", 
      message: "File securely uploaded to Drive",
      fileId: file.getId(),
      filename: file.getName(),
      folderUrl: dateFolder.getUrl()
    });
    
  } catch(error) {
    // Catch and return any server-side errors
    return createJsonResponse({
      status: "error", 
      message: error.toString()
    });
  }
}

/**
 * Handle HTTP OPTIONS requests (CORS Preflight)
 * Needed for browsers making complex requests across domains
 */
function doOptions(e) {
  return ContentService.createTextOutput("")
    .setMimeType(ContentService.MimeType.TEXT);
}

/**
 * Helper function to structure JSON output
 */
function createJsonResponse(responseObject) {
  return ContentService.createTextOutput(JSON.stringify(responseObject))
    .setMimeType(ContentService.MimeType.JSON);
}

/**
 * Test function to verify the folder ID is correct (run manually in editor)
 */
function testFolderAccess() {
  try {
    var folder = DriveApp.getFolderById(TARGET_FOLDER_ID);
    Logger.log("Success! Found folder: " + folder.getName());
  } catch (e) {
    Logger.log("Error: Could not find folder. Please check your TARGET_FOLDER_ID. Details: " + e.message);
  }
}

/**
 * Sends the captured photo to a Telegram Chat
 */
function sendPhotoToTelegram(blob, filename) {
  if (TELEGRAM_BOT_TOKEN === "YOUR_TELEGRAM_BOT_TOKEN_HERE" || !TELEGRAM_BOT_TOKEN) {
    return; // Skip if not configured
  }

  // First send a basic text notification so we know the bot is working
  var textUrl = "https://api.telegram.org/bot" + TELEGRAM_BOT_TOKEN + "/sendMessage";
  UrlFetchApp.fetch(textUrl, {
    "method": "post",
    "payload": {
      "chat_id": TELEGRAM_CHAT_ID,
      "text": "📸 New photo successfully saved to Drive: " + filename
    },
    "muteHttpExceptions": true
  });
  
  var url = "https://api.telegram.org/bot" + TELEGRAM_BOT_TOKEN + "/sendPhoto";
  
  var payload = {
    "chat_id": TELEGRAM_CHAT_ID,
    "photo": blob,
    "caption": "🚨 CCTV Auto-Capture:\n" + filename
  };
  
  var options = {
    "method": "post",
    "payload": payload,
    "muteHttpExceptions": true
  };
  
  try {
    var response = UrlFetchApp.fetch(url, options);
    // Log the response text to see if Telegram gave an error
    Logger.log("Telegram Response: " + response.getContentText());
  } catch (e) {
    Logger.log("Failed to send to Telegram: " + e.message);
  }
}

/**
 * Run this function from the Apps Script Editor to test Telegram
 */
function testTelegram() {
  var url = "https://api.telegram.org/bot" + TELEGRAM_BOT_TOKEN + "/sendMessage";
  var payload = {
    "chat_id": TELEGRAM_CHAT_ID,
    "text": "🚨 Test Message: Your Telegram integration is working!"
  };
  var options = {
    "method": "post",
    "payload": payload,
    "muteHttpExceptions": true
  };
  var response = UrlFetchApp.fetch(url, options);
  Logger.log("Telegram Test Response: " + response.getContentText());
}
