// src/components/PrintPage.js
import React, { useState } from 'react';
import { pdfjs } from 'react-pdf';
import { Document, Page } from 'react-pdf';
import Dropzone from 'react-dropzone';
import styled from 'styled-components';
import axios from 'axios';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const Container = styled.div`
  padding: 20px;
  text-align: center;
`;

const PdfPreview = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
`;

const PageWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;

const SubmitButton = styled.button`
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

export default function PrintPage() {
  const [file, setFile] = useState(null);
  const [numPages, setNumPages] = useState(null);
  const [selectedPages, setSelectedPages] = useState([]);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  const handlePageSelect = (pageNumber) => {
    if (selectedPages.includes(pageNumber)) {
      setSelectedPages(selectedPages.filter(page => page !== pageNumber));
    } else {
      setSelectedPages([...selectedPages, pageNumber]);
    }
  };

  const handleSubmit = async () => {
    // Send the selected pages to the API
    const formData = new FormData();
    formData.append('file', file);
    formData.append('pages', selectedPages);

    await axios.post('/api/print', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  };

  return (
    <Container>
      <h2>Print Page</h2>
      <Dropzone onDrop={acceptedFiles => setFile(acceptedFiles[0])}>
        {({ getRootProps, getInputProps }) => (
          <div {...getRootProps()} className="dropzone">
            <input {...getInputProps()} />
            <p>Drag 'n' drop a PDF here, or click to select one</p>
          </div>
        )}
      </Dropzone>

      {file && (
        <PdfPreview>
          <Document file={file} onLoadSuccess={onDocumentLoadSuccess}>
            {Array.from(new Array(numPages), (el, index) => (
              <PageWrapper key={index}>
                <input
                  type="checkbox"
                  onChange={() => handlePageSelect(index + 1)}
                  checked={selectedPages.includes(index + 1)}
                />
                <Page
                  pageNumber={index + 1}
                  width={300}
                />
              </PageWrapper>
            ))}
          </Document>
        </PdfPreview>
      )}

      {selectedPages.length > 0 && (
        <SubmitButton onClick={handleSubmit}>Submit</SubmitButton>
      )}
    </Container>
  );
}