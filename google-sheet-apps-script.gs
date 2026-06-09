/**
 * Bacchanalian Society — ticket buyers → Google Sheet
 *
 * SETUP (do this in the OWNER's Google account):
 * 1. Create a new Google Sheet (e.g. "BAC Ticket Buyers").
 * 2. Extensions → Apps Script. Delete any starter code and paste this whole file.
 * 3. Click Deploy → New deployment → type "Web app".
 *      - Description: BAC tickets webhook
 *      - Execute as: Me
 *      - Who has access: Anyone
 *    Click Deploy, authorize when prompted.
 * 4. Copy the "Web app URL" it gives you (ends in /exec).
 * 5. Send that URL to your developer — it goes in BAC_SHEETS_WEBHOOK_URL.
 *
 * Every ticket purchase then appends one row PER attendee automatically.
 */
function doPost(e) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName('Tickets') || ss.getSheets()[0];

  // Write a header row the first time
  if (sheet.getLastRow() === 0) {
    sheet.appendRow([
      'Timestamp', 'First Name', 'Last Name', 'Email',
      'Event', 'Order Total', 'Stripe Session',
    ]);
  }

  try {
    var data = JSON.parse(e.postData.contents);
    var ts = new Date();
    (data.attendees || []).forEach(function (a) {
      sheet.appendRow([
        ts,
        a.firstName || '',
        a.lastName || '',
        a.email || '',
        data.event || '',
        data.orderTotal || '',
        data.stripeSessionId || '',
      ]);
    });
    return ContentService
      .createTextOutput(JSON.stringify({ ok: true }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ ok: false, error: String(err) }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
