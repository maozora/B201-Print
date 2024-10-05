// src/components/ScanPage.js
import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';

const Container = styled.div`
  padding: 20px;
  text-align: center;
`;

const ScanButton = styled.button`
  background-color: #ff4d4d;
  border: none;
  color: white;
  padding: 10px 20px;
  margin-top: 20px;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: #e63946;
  }
`;

export default function ScanPage() {
  const [scanning, setScanning] = useState(false);
  const [fileUrl, setFileUrl] = useState(null);

  const startScan = async () => {
    setScanning(true);
    await axios.post('/api/startscan');
    setScanning(false);

    // Get the scanned file from the API
    const response = await axios.get('/api/getscannedfile');
    setFileUrl(response.data.fileUrl);
  };

  return (
    <Container>
      <h2>Scan Page</h2>
      {!scanning && (
        <ScanButton onClick={startScan}>Start Scan</ScanButton>
      )}
      {scanning && <p>Scanning ...</p>}
      {fileUrl && (
        <a href={fileUrl} download>
          <ScanButton>Download Your File</ScanButton>
        </a>
      )}
    </Container>
  );
}
