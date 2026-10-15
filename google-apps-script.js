/**
 * EDITING CREW - Google Sheets Web App Backend
 * 
 * Instructions:
 * 1. Open your Google Sheet: https://sheets.google.com
 * 2. Click "Extensions" (Erweiterungen) -> "Apps Script"
 * 3. Delete any default code in Code.gs and paste this entire script.
 * 4. Click "Deploy" (Bereitstellen) -> "New deployment" (Neue Bereitstellung)
 * 5. Select type: "Web app" (Web-App)
 * 6. Set Description: "Editing Crew Lead Form"
 * 7. Set "Execute as": "Me" (your Google account)
 * 8. Set "Who has access": "Anyone" (Jeder)  <-- IMPORTANT!
 * 9. Click "Deploy" and authorize permissions.
 * 10. Copy the Web App URL and paste it into `src/config/googleSheets.js`.
 */

function doPost(e) {
  try {
    // Open the active spreadsheet and the first sheet
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    // Parse the incoming POST body
    var rawData = e.postData.contents;
    var data = JSON.parse(rawData);

    // If sheet is empty, create formatted headers automatically
    if (sheet.getLastRow() === 0) {
      var headers = [
        "Datum / Date",
        "Name",
        "E-Mail",
        "Telefonnummer / Phone",
        "Land / Country",
        "Projekttyp / Project Type",
        "Dauer / Duration",
        "Gesamtpreis / Total",
        "Beschreibung / Description"
      ];
      sheet.appendRow(headers);
      
      // Style header row (Dark Slate background with White bold text)
      var headerRange = sheet.getRange(1, 1, 1, headers.length);
      headerRange.setFontWeight("bold");
      headerRange.setBackground("#1E293B"); // Slate-800
      headerRange.setFontColor("#FFFFFF");
      headerRange.setHorizontalAlignment("center");
      sheet.setFrozenRows(1);
    }

    // Format fields safely
    var date = data.date || Utilities.formatDate(new Date(), "Europe/Berlin", "dd.MM.yyyy HH:mm");
    var name = data.name || "";
    var email = data.email || "";
    var phone = data.phone || data.phoneNumber || "";
    var country = data.country ? (data.country + " (" + (data.countryCode || "") + ")") : (data.countryCode || "");
    var projectType = data.projectType || "General Enquiry";
    var duration = data.duration ? (data.duration + " Min.") : "1 Min.";
    var totalPrice = data.totalPrice || ("€" + ((parseInt(data.duration) || 1) * 69));
    var description = data.description || "";

    // Append the new row to the sheet
    sheet.appendRow([
      date,
      name,
      email,
      phone,
      country,
      projectType,
      duration,
      totalPrice,
      description
    ]);

    // Return success JSON
    return ContentService
      .createTextOutput(JSON.stringify({ 
        status: "success", 
        message: "Entry recorded successfully" 
      }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ 
        status: "error", 
        message: error.toString() 
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Support GET requests for health check testing
function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({ 
      status: "active", 
      service: "Editing Crew Lead Collector" 
    }))
    .setMimeType(ContentService.MimeType.JSON);
}
