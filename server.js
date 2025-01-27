const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(bodyParser.json());
app.use(cors());

// משתמשים לדוגמה
const users = [
  { username: "admin", password: "1234" }
];

// נתונים זמניים בזיכרון
let formData = {}; // נתוני הטופס
let reports = []; // רשימת דוחות שהופקו
let editorContent = ""; // תוכן תיבת עריכת דוח

// נתיב התחברות
app.post("/login", (req, res) => {
  const { username, password } = req.body;

  console.log("בקשת התחברות התקבלה עם הנתונים:", req.body);

  const user = users.find(u => u.username === username && u.password === password);
  if (user) {
    console.log("התחברות הצליחה עבור המשתמש:", username);
    res.send({ message: "התחברות הצליחה" });
  } else {
    console.log("התחברות נכשלה: שם משתמש או סיסמה שגויים");
    res.status(401).send({ message: "שם משתמש או סיסמה שגויים" });
  }
});

// נתיב שמירת נתונים מהטופס
app.post("/save-data", (req, res) => {
  console.log("נתונים שהתקבלו לשמירה:", req.body);
  formData = req.body;
  res.send({ message: "נתונים נשמרו בהצלחה!", formData });
});

// נתיב שליפת נתוני הטופס
app.get("/get-data", (req, res) => {
  console.log("בקשה לשליפת נתונים התקבלה");
  res.send(formData || {});
});

// נתיב מחיקת נתונים מהטופס
app.delete("/clear-data", (req, res) => {
  console.log("בקשה למחיקת נתונים התקבלה");
  formData = {};
  res.send({ message: "כל הנתונים נמחקו בהצלחה!" });
});

// נתיב לשמירת דוח
app.post("/save-report", (req, res) => {
  console.log("דוח שהתקבל:", req.body.report);
  reports.push(req.body.report);
  res.send({ message: "הדוח נשמר בהצלחה!" });
});

// נתיב לשליפת רשימת דוחות
app.get("/get-reports", (req, res) => {
  console.log("בקשה לשליפת דוחות התקבלה");
  res.send(reports);
});

// נתיב לשמירת תוכן תיבת "עריכת דוח"
app.post("/save-editor-content", (req, res) => {
  editorContent = req.body.editorContent || "";
  console.log("תוכן תיבת עריכת דוח נשמר:", editorContent);
  res.send({ message: "תוכן העריכה נשמר בהצלחה!" });
});

// נתיב לשליפת תוכן תיבת "עריכת דוח"
app.get("/get-editor-content", (req, res) => {
  console.log("בקשה לשליפת תוכן תיבת עריכת דוח התקבלה");
  res.send({ editorContent });
});

// נתיב ברירת מחדל
app.get("/", (req, res) => {
  res.send("Server is running!");
});

// הפעלת השרת
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});