import express, { response } from "express";
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const speech = require("@google-cloud/speech");
const fs = require("fs");
var bodyParser = require("body-parser");
var jsonParser = bodyParser.json();
var sqlite3 = require("sqlite3");

const app = express();

app.listen(8000, "0.0.0.0", () => console.log("listening on port 8000"));
app.use(express.static("public"));
app.use((req, res, next) => {
  res.append("Access-Control-Allow-Origin", ["*"]);
  res.append("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.append("Access-Control-Allow-Headers", "Content-Type");
  next();
});

app.use(bodyParser.json({ limit: "200mb" }));

var db;
db = new sqlite3.Database("./forum.db", sqlite3.OPEN_READWRITE);

app.post("/getClasses", jsonParser, async (request, response) => {
  let data = request.body;
  console.log(request.body);
  let username = data["username"];

  db.all(
    `
    SELECT * FROM 'userToClass' WHERE username='${username}';
  `,
    (error, rows) => {
      let sql_string = `SELECT * FROM 'classes' WHERE `;
      rows.forEach((item, index) => {
        if (index > 0) {
          sql_string = sql_string + " OR ";
        }
        sql_string += `classId=${item["classId"]}`;
      });
      sql_string = sql_string + `;`;
      db.all(sql_string, (err, rows) => {
        response.send(JSON.stringify(rows));
      });
    }
  );
});

app.post("/getPosts", jsonParser, async (request, response) => {
  console.log(request.body);
  db.all(
    `SELECT * FROM posts WHERE classId=?`,
    [request.body["classId"]],
    (error, rows) => {
      console.log(JSON.stringify(rows));
      response.send(JSON.stringify(rows));
    }
  );
});
//we need to make sure the database doesnt get filled with a bunch of duplicate entries!!!
app.post("/joinClass", jsonParser, async (request, response) => {
  db.all(`INSERT INTO userToClass (username, classId) VALUES (?, ?);`, [
    request.body["username"],
    request.body["classId"],
  ]);

  response.status(200).send(JSON.stringify({}));
});

app.post("/createClass", jsonParser, async (request, response) => {
  db.all(
    `SELECT * FROM classes WHERE classId=?`,
    [request.body["classId"]],
    (error, rows) => {
      if (rows.length > 0) {
        response.status(400).send(JSON.stringify({}));
        return;
      } else {
        console.log(request.body);
        db.all(
          `INSERT INTO classes (classId, className, classDesc) VALUES (?, ?, ?);`,
          [
            request.body["classId"],
            request.body["subject"],
            request.body["description"],
          ]
        );
        db.all(`INSERT INTO userToClass (username, classId) VALUES (?, ?);`, [
          request.body["username"],
          request.body["classId"],
        ]);
        response.status(200).send(JSON.stringify({}));
      }
    }
  );
});

app.post("/createPost", jsonParser, (request, response) => {
  console.log(request.body);
  db.all(
    `INSERT INTO posts (classId, subject, description, date) VALUES (?, ?, ?, CURRENT_TIMESTAMP);`,
    [request.body["classId"], request.body["subject"], request.body["body"]]
  );
  response.status(200).send(JSON.stringify({}));
});

app.post("/transcribe", jsonParser, async (request, response) => {
  let body = await request.body;
  let data = body["data"]["audio"]["content"];
  console.log(data);

  let base64Audio = data.split(";base64,").pop();

  fs.writeFile(
    "recording.wav",
    base64Audio,
    { encoding: "base64" },
    async () => {
      const client = new speech.SpeechClient();
      const filename = "./recording.wav";

      const file = fs.readFileSync(filename);
      console.log(file);
      const audioBytes = file.toString("base64");

      const audio = {
        content: audioBytes,
      };

      const config = {
        encoding: "LINEAR16",
        languageCode: "en-US",
      };

      const data2 = {
        audio,
        config,
      };

      const [transcribed] = await client.recognize(data2);

      console.log(transcribed["results"][0]["alternatives"][0]);
      fs.unlinkSync(filename);
      response.send({
        transcribed: transcribed["results"][0]["alternatives"][0],
      });
    }
  );
});
