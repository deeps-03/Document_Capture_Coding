import React, { useState } from 'react';
import { Upload, FileDown, AlertCircle } from 'lucide-react';  // Import icons
import type { DocumentType, DocumentData } from '../types/document';
import { extractDocumentData } from '../utils/documentParser';
import { generatePDF } from '../utils/pdfGenerator';

export default function Scanner() {
  // State management
  const [documentType, setDocumentType] = useState<DocumentType>('other');  // Selected document type
  const [loading, setLoading] = useState(false);                            // Loading state
  const [documentData, setDocumentData] = useState<DocumentData | null>(null);  // Extracted data
  const [error, setError] = useState<string | null>(null);                  // Error message

  // Handle document file upload
  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Reset previous states
    setError(null);
    setDocumentData(null);
    setLoading(true);

    try {
      // Validate file size (10MB limit)
      if (file.size > 10 * 1024 * 1024) {
        throw new Error('File size should be less than 10MB');
      }

      // Validate file type (must be image)
      if (!file.type.startsWith('image/')) {
        throw new Error('Please upload an image file');
      }

      // Process the document
      const base64Image = await convertFileToBase64(file);
      const data = await extractDocumentData(base64Image, documentType);
      
      // Check if any data was extracted
      if (data.fields.length === 0) {
        setError('No information could be extracted from this image. Please ensure the image is clear and contains text.');
      } else {
        setDocumentData(data);
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : 'An error occurred while processing the document');
      console.error('Error processing document:', error);
    } finally {
      setLoading(false);
    }
  };

  // Convert file to base64 for processing
  const convertFileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  // Generate and download PDF report
  const downloadPDF = () => {
    if (!documentData) return;
    
    const pdfData = generatePDF(documentData, documentType);
    const link = document.createElement('a');
    link.href = pdfData;
    link.download = `document-info-${Date.now()}.pdf`;
    link.click();
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        {/* Page header */}
        <h1 className="text-3xl font-bold mb-8 text-center">Document Scanner</h1>
        
        {/* Document type selector */}
        <div className="mb-8">
          <label className="block text-sm font-medium mb-2">Document Type</label>
          <select
            className="w-full bg-gray-800 border border-gray-700 rounded-lg p-3"
            value={documentType}
            onChange={(e) => setDocumentType(e.target.value as DocumentType)}
          >
            <option value="other">General Document</option>
            <option value="passport">Passport</option>
            <option value="license">Driver's License</option>
            <option value="aadhaar">Aadhaar Card</option>
            <option value="pan">PAN Card</option>
          </select>
        </div>

        {/* File upload section */}
        <div className="bg-gray-800 p-6 rounded-lg mb-8">
          <h2 className="text-xl font-semibold mb-4">Upload Document</h2>
          <label className="flex flex-col items-center p-6 border-2 border-dashed border-gray-600 rounded-lg cursor-pointer hover:border-gray-500 transition-colors">
            <Upload className="w-8 h-8 mb-2" />
            <span className="text-sm text-gray-300 mb-1">Choose file or drag & drop</span>
            <span className="text-xs text-gray-500">Supported formats: JPG, PNG, JPEG (Max 10MB)</span>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              className="hidden"
            />
          </label>
        </div>

        {/* Loading indicator */}
        {loading && (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
            <p className="mt-4">Processing document...</p>
          </div>
        )}

        {/* Error message */}
        {error && (
          <div className="bg-red-900/50 border border-red-700 p-4 rounded-lg mb-8 flex items-start">
            <AlertCircle className="w-5 h-5 text-red-500 mr-2 flex-shrink-0 mt-0.5" />
            <p className="text-red-200">{error}</p>
          </div>
        )}

        {/* Results display */}
        {documentData && !loading && documentData.fields.length > 0 && (
          <div className="bg-gray-800 p-6 rounded-lg">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">Extracted Information</h2>
              <button
                onClick={downloadPDF}
                className="flex items-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition-colors"
              >
                <FileDown className="w-5 h-5 mr-2" />
                Download PDF
              </button>
            </div>
            <div className="grid gap-6">
              {documentData.fields.map((field, index) => (
                <div key={index} className="border-b border-gray-700 pb-4 last:border-0">
                  <label className="block text-sm font-medium text-gray-400 capitalize mb-1">
                    {field.key}
                  </label>
                  <p className="text-lg">{field.value}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}