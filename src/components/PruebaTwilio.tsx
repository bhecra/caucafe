import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [data, setData] = useState('');

  const sendDataToServer = async () => {
    try {
      const response = await axios.post<string>('http://localhost:3001/sendData', { data });
      console.log(response.data);
      console.log(data)
    } catch (error) {
      console.error('Error sending data:', error);
    }
  };

  return (
    <div>
      <input
        type="text"
        value={data}
        onChange={(e) => setData(e.target.value)}
      />
      <button onClick={sendDataToServer}>Enviar Datos</button>
    </div>
  );
}

export default App;


