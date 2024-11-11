import React, { useState } from 'react';
import { FileDown, Copy, Check } from 'lucide-react';
import { DocumentData } from '../types/document';
import { generatePDF } from '../utils/pdfGenerator';

interface ResultsDisplayProps {
  data: DocumentData;
}

export function ResultsDisplay({ data }: ResultsDisplayProps) {
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const handleDownloadPDF = () => {
    const pdfData = generatePDF(data);
    const link = document.createElement('a');
    link.href = pdfData;
    link.download = `document-info-${Date.now()}.pdf`;
    link.click();
  };

  const copyToClipboard = async (value: string, key: string) => {
    await navigator.clipboard.writeText(value);
    setCopiedField(key);
    setTimeout(() => setCopiedField(null), 2000);
  };

  return (
    <div className="bg-dark-alt rounded-lg overflow-hidden border border-border">
      <div className="p-4 bg-accent-dark border-b border-border flex justify-between items-center">
        <h2 className="text-lg font-medium text-gray-200">Extracted Information</h2>
        <button
          onClick={handleDownloadPDF}
          className="flex items-center bg-accent hover:bg-accent-light text-gray-200 px-4 py-2 rounded transition-colors"
        >
          <FileDown className="w-5 h-5 mr-2" />
          Download PDF
        </button>
      </div>
      
      <div className="p-6 space-y-6">
        {data.fields.map((field, index) => (
          <div
            key={index}
            className="group border-b border-border pb-4 last:border-0 hover:bg-accent/50 -mx-6 px-6 py-2 transition-colors"
          >
            <div className="flex justify-between items-start">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">
                  {field.key}
                </label>
                <p className="text-lg text-gray-200">{field.value}</p>
              </div>
              <button
                onClick={() => copyToClipboard(field.value, field.key)}
                className="opacity-0 group-hover:opacity-100 transition-opacity"
                title="Copy to clipboard"
              >
                {copiedField === field.key ? (
                  <Check className="w-5 h-5 text-green-500" />
                ) : (
                  <Copy className="w-5 h-5 text-gray-400 hover:text-gray-200 transition-colors" />
                )}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}