require("dotenv"); // Agrega esto al principio de tu archivo server/index.js
const express = require("express");
const bodyParser = require("body-parser");
const pino = require("express-pino-logger")();
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
var cors = require('cors')
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(pino);
app.use(cors())
app.get("/api/greeting/:name", (req, res) => {
  const name = req.query.name || req.params.name;
  res.setHeader("Content-Type", "application/json");
  res.send(JSON.stringify({ greeting: `Hello ${name}!` }));

});

app.post('/sendData', (req, res) => {
  const receivedData = req.body.data;
  console.log('Received data:', receivedData);
  
  // Aquí puedes realizar cualquier lógica adicional con los datos recibidos
  // y enviar una respuesta de vuelta si es necesario.

  res.send('Datos recibidos con éxito en el servidor.');
});
app.listen(3001, () =>
  console.log("Express server is running on localhost:3001")
);

// const PORT = 3002;
// app.listen(PORT, () => {
//   console.log(`Servidor Express ejecutándose en el puerto ${PORT}`);
// });
  const client = require("twilio")(
    accountSid,
    authToken,
  );
  const mivariable = "hola mundo";
  client.messages
    .create({
      body: mivariable,
      from: "whatsapp:+14155238886",
      to: "whatsapp:+573166313394",
    })
    .then((message) => console.log(message.sid));

  // ESTA FUNCION ES LA QUE MANDA EL MENSAJE A WHATSAPP, COMENTADA PARA QUE NO SE EJECUTE CADA QUE SE INICIE EL PROYECTO Y NO GASTAR LOS CREDITOS DE PUREBA