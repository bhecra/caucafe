import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';

const app = express();
app.use(bodyParser.json());

app.post('/sendData', (req: Request, res: Response) => {
  const receivedData: string = req.body.data;
  console.log('Received data:', receivedData);

  // Aquí puedes realizar cualquier lógica adicional con los datos recibidos
  // y enviar una respuesta de vuelta si es necesario.

  res.send('Datos recibidos con éxito en el servidor.');
});

const PORT = 3002;
app.listen(PORT, () => {
  console.log(`Servidor Express ejecutándose en el puerto ${PORT}`);
});
