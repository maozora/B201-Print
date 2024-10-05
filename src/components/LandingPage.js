// src/components/LandingPage.js
import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f8f9fa;
`;

const Button = styled.button`
  background-color: #ff4d4d;
  border: none;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  font-size: 16px;
  margin: 10px;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: #e63946;
  }
`;

export default function LandingPage() {
  const navigate = useNavigate();
  
  return (
    <Container>
      <h1>Welcome to the B201 Printing Services</h1>
      <Button onClick={() => navigate('/print')}>Print</Button>
      <p>Select a PDF, choose pages, and print them.</p>
      <Button onClick={() => navigate('/scan')}>Scan</Button>
      <p>Scan documents and download them as PNG files.</p>
    </Container>
  );
}
