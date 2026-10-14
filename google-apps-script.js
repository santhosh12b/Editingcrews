/**
 * Google Apps Script for Editing Crew Form Submissions
 * 
 * Column mapping in Google Sheet:
 * Column A: Date
 * Column B: Your Name
 * Column C: Email Address *
 * Column D: Project Type
 * Column E: Target Duration (minutes)
 * Column F: Tell us about your product or idea
 * 
 * -------------------------------------------------------------
 * HOW TO INSTALL IN YOUR GOOGLE SHEET:
 * -------------------------------------------------------------
 * 1. Open your "Editing Crew" Google Sheet
 * 2. In top menu, click: Extensions -> Apps Script
 * 3. Delete any code in the editor and paste this entire code
 * 4. Click the blue "Deploy" button (top right) -> "New deployment"
 * 5. Click the gear icon next to "Select type" -> choose "Web app"
 * 6. Set the following settings:
 *    - Description: Editing Crew Form Handler
 *    - Execute as: Me (your Google account)
 *    - Who has access: Anyone  <-- (IMPORTANT: Must be "Anyone")
 * 7. Click "Deploy"
 * 8. Authorize permissions when prompted by Google
 * 9. Copy the "Web app URL" (it ends with /exec)
 * 10. Paste the URL into src/config/googleSheets.js or send it here!
 */

function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.tryLock(10000); // Wait up to 10 seconds for concurrent requests

  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var data = {};

    if (e.postData && e.postData.contents) {
      try {
        data = JSON.parse(e.postData.contents);
      } catch (err) {
        data = e.parameter;
      }
    } else if (e.parameter) {
      data = e.parameter;
    }

    var timestamp = data.date || Utilities.formatDate(new Date(), "Europe/Berlin", "yyyy-MM-dd HH:mm:ss");

    var row = [
      timestamp,
      data.name || "",
      data.email || "",
      data.projectType || "",
      data.duration || "",
      data.description || ""
    ];

    sheet.appendRow(row);

    return ContentService.createTextOutput(JSON.stringify({
      result: "success",
      row: row
    })).setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      result: "error",
      error: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);

  } finally {
    lock.releaseLock();
  }
}

function doGet(e) {
  return ContentService.createTextOutput("Editing Crew Google Sheets Webhook is active and running!");
}
