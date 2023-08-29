require("dotenv"); // Agrega esto al principio de tu archivo server/index.js
const express = require("express");
const bodyParser = require("body-parser");
const pino = require("express-pino-logger")();
const accountSid = process.env.TWILIO_ACCOUNT_SID;

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



  // const client = require("twilio")(
  //   "ACb55a91863b1edc341d35b33984b2f908",
  //   "ca86ec5eb1c7cc0d02f95bb2a1cdf99a"
  // );
  // const mivariable = "hola mundo";
  // client.messages
  //   .create({
  //     body: mivariable,
  //     from: "whatsapp:+14155238886",
  //     to: "whatsapp:+573166313394",
  //   })
  //   .then((message) => console.log(message.sid));

  // ESTA FUNCION ES LA QUE MANDA EL MENSAJE A WHATSAPP, COMENTADA PARA QUE NO SE EJECUTE CADA QUE SE INICIE EL PROYECTO Y NO GASTAR LOS CREDITOS DE PUREBA