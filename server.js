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
let formData = {};

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

// נתיב שמירת נתונים
app.post("/save-data", (req, res) => {
  console.log("נתונים שהתקבלו לשמירה:", req.body);
  formData = req.body;
  res.send({ message: "נתונים נשמרו בהצלחה!", formData });
});

// נתיב שליפת נתונים
app.get("/get-data", (req, res) => {
  console.log("בקשה לשליפת נתונים התקבלה");
  res.send(formData || {});
});

// נתיב מחיקת נתונים
app.delete("/clear-data", (req, res) => {
  console.log("בקשה למחיקת נתונים התקבלה");
  formData = {};
  res.send({ message: "כל הנתונים נמחקו בהצלחה!" });
});

// הפעלת השרת
const PORT = 3000;
// נתיב ברירת מחדל לנתיב /
app.get("/", (req, res) => {
  res.send("Server is running!");
});
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});