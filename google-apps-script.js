/**
 * EDITING CREW - Google Sheets Web App Backend
 * 
 * Instructions to Update Google Apps Script:
 * 1. Open your Google Sheet: https://sheets.google.com
 * 2. Click "Extensions" (Erweiterungen) -> "Apps Script"
 * 3. Replace all code in Code.gs with this entire script.
 * 4. Click "Deploy" (Bereitstellen) -> "Manage deployments" (Bereitstellungen verwalten)
 *    - Click the Edit (pencil) icon next to your active Web app deployment
 *    - In "Version", select "New version" (Neue Version)
 *    - Click "Deploy" (Bereitstellen)
 *    (Or click "New deployment" -> Web app -> Anyone can access -> Deploy)
 */

function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    // Parse incoming data safely
    var data = {};
    if (e && e.postData && e.postData.contents) {
      try {
        data = JSON.parse(e.postData.contents);
      } catch (err) {
        data = e.parameter || {};
      }
    } else if (e && e.parameter) {
      data = e.parameter;
    }

    // Format individual values
    var date = data.date || Utilities.formatDate(new Date(), "Europe/Berlin", "dd.MM.yyyy, HH:mm");
    var name = (data.name || data["Your Name"] || "").toString().trim();
    var email = (data.email || data["Email Address *"] || data["Email"] || "").toString().trim();
    var phone = (data.phone || data.phoneNumber || data["Phone / WhatsApp"] || "").toString().trim();
    var projectType = (data.projectType || data["Project Type"] || "General Enquiry").toString().trim();
    var duration = data.duration || data["Target Duration (minutes)"] || 1;
    var description = (data.description || data["Tell us about your product or idea"] || "").toString().trim();
    var totalPrice = data.totalPrice || ("€" + ((parseInt(duration) || 1) * 69));

    // Prefix phone with a single quote so Google Sheets stores +49... as text instead of a formula
    var formattedPhone = phone ? ("'" + phone.replace(/^'+/, '')) : "";

    var lastCol = sheet.getLastColumn();
    var lastRow = sheet.getLastRow();

    if (lastRow === 0 || lastCol === 0) {
      // Sheet is completely empty, create default 7 headers matching client requirements
      var defaultHeaders = [
        "Date",
        "Your Name",
        "Email Address *",
        "Phone / WhatsApp",
        "Project Type",
        "Target Duration (minutes)",
        "Tell us about your product or idea"
      ];
      sheet.appendRow(defaultHeaders);
      
      // Style headers
      var headerRange = sheet.getRange(1, 1, 1, defaultHeaders.length);
      headerRange.setFontWeight("bold");
      headerRange.setBackground("#1E293B"); // Slate-800
      headerRange.setFontColor("#FFFFFF");
      headerRange.setHorizontalAlignment("center");
      sheet.setFrozenRows(1);
      
      sheet.appendRow([
        date,
        name,
        email,
        formattedPhone,
        projectType,
        duration,
        description
      ]);
    } else {
      // Smart Header-to-Column Mapping based on existing Row 1 headers
      var headerValues = sheet.getRange(1, 1, 1, lastCol).getValues()[0];
      var newRow = new Array(headerValues.length);

      for (var i = 0; i < headerValues.length; i++) {
        var header = (headerValues[i] || "").toString().toLowerCase().trim();

        if (header.indexOf("date") !== -1 || header.indexOf("datum") !== -1) {
          newRow[i] = date;
        } else if (header.indexOf("name") !== -1) {
          newRow[i] = name;
        } else if (header.indexOf("email") !== -1 || header.indexOf("e-mail") !== -1 || header.indexOf("mail") !== -1) {
          newRow[i] = email;
        } else if (header.indexOf("phone") !== -1 || header.indexOf("whatsapp") !== -1 || header.indexOf("telefon") !== -1 || header.indexOf("tel") !== -1 || header.indexOf("handy") !== -1) {
          newRow[i] = formattedPhone;
        } else if (header.indexOf("project") !== -1 || header.indexOf("projekttyp") !== -1) {
          newRow[i] = projectType;
        } else if (header.indexOf("duration") !== -1 || header.indexOf("dauer") !== -1 || header.indexOf("minute") !== -1) {
          newRow[i] = duration;
        } else if (header.indexOf("idea") !== -1 || header.indexOf("idee") !== -1 || header.indexOf("product") !== -1 || header.indexOf("tell us") !== -1 || header.indexOf("beschreibung") !== -1 || header.indexOf("description") !== -1) {
          newRow[i] = description;
        } else if (header.indexOf("total") !== -1 || header.indexOf("price") !== -1 || header.indexOf("preis") !== -1) {
          newRow[i] = totalPrice;
        } else {
          newRow[i] = data[headerValues[i]] || "";
        }
      }

      sheet.appendRow(newRow);
    }

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

// Support GET requests for health check testing and optional direct parameter submissions
function doGet(e) {
  if (e && e.parameter && (e.parameter.name || e.parameter.email || e.parameter.phone)) {
    return doPost(e);
  }
  return ContentService
    .createTextOutput(JSON.stringify({ 
      status: "active", 
      service: "Editing Crew Lead Collector" 
    }))
    .setMimeType(ContentService.MimeType.JSON);
}
