import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      alert('Please select a file');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await axios.post('http://localhost:5000/upload', formData);
      setMessage(res.data.message + ' → ' + res.data.filename);
    } catch (err) {
      console.error(err);
      setMessage('Error uploading file');
    }
  };

  return (
    <div style={{ padding: '50px' }}>
      <h1>File Upload Demo</h1>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload} style={{ marginLeft: '10px' }}>Upload</button>
      <p>{message}</p>
    </div>
  );
}

export default App;
