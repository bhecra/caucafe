require("dotenv").config(); // Agrega esto al principio de tu archivo server/index.js
const express = require("express");
const bodyParser = require("body-parser");
const pino = require("express-pino-logger")();
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.authToken;
const client = require("twilio")(accountSid, authToken);
require('dotenv');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(pino);

app.get("/api/greeting/:name", (req, res) => {
  const name = req.query.name || req.params.name;
  res.setHeader("Content-Type", "application/json");
  res.send(JSON.stringify({ greeting: `Hello ${name}!` }));
});

app.listen(3001, () =>
  console.log("Express server is running on localhost:3001")
);

app.post("/api/enviar-catacion", async (req, res) => {
  const valoresCatacion = req.body;

  // Envía los datos de la catazon a WhatsApp
  const client = require("twilio")(
    process.env.TWILIO_ACCOUNT_SID,
    process.env.TWILIO_AUTH_TOKEN,
    {
      password: process.env.authToken,  
    }
  );

  const message = client.messages.create({
    body: JSON.stringify(valoresCatacion),
    to: "whatsapp:+573166313394",
  });

  console.log(message);

  res.send(200);
});
