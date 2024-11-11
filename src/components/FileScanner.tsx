import React, { useState } from 'react';
import { DocumentType } from '../types/document';
import { extractDocumentData } from '../utils/documentParser';
import { DocumentTypeSelector } from './DocumentTypeSelector';
import { FileUploader } from './FileUploader';
import { LoadingSpinner } from './LoadingSpinner';
import { ErrorMessage } from './ErrorMessage';
import { ResultsDisplay } from './ResultsDisplay';
import { Notification } from './Notification';

export function FileScanner() {
  const [documentType, setDocumentType] = useState<DocumentType>('passport');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [results, setResults] = useState<any>(null);
  const [notification, setNotification] = useState<{
    type: 'success' | 'error' | 'info';
    message: string;
  } | null>(null);

  const showNotification = (type: 'success' | 'error' | 'info', message: string) => {
    setNotification({ type, message });
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setError(null);
    setResults(null);
    setLoading(true);
    showNotification('info', 'Processing your document...');

    try {
      if (file.size > 10 * 1024 * 1024) {
        throw new Error('File size should be less than 10MB');
      }

      if (!file.type.startsWith('image/')) {
        throw new Error('Please upload an image file');
      }

      const reader = new FileReader();
      reader.onload = async () => {
        try {
          const data = await extractDocumentData(reader.result as string, documentType);
          if (data.fields.length === 0) {
            setError('No information could be extracted. Please ensure the image is clear.');
            showNotification('error', 'No information could be extracted');
          } else {
            setResults(data);
            showNotification('success', 'Document processed successfully!');
          }
        } catch (err) {
          setError('Failed to process the document. Please try again.');
          showNotification('error', 'Failed to process document');
        } finally {
          setLoading(false);
        }
      };
      reader.readAsDataURL(file);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'An error occurred';
      setError(message);
      showNotification('error', message);
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <DocumentTypeSelector value={documentType} onChange={setDocumentType} />
      <FileUploader onFileSelect={handleFileUpload} />
      {loading && <LoadingSpinner />}
      {error && <ErrorMessage message={error} />}
      {results && !loading && <ResultsDisplay data={results} />}
      {notification && (
        <Notification
          type={notification.type}
          message={notification.message}
          onClose={() => setNotification(null)}
        />
      )}
    </div>
  );
}