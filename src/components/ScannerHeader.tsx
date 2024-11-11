import React from 'react';
import { Scan } from 'lucide-react';

export function ScannerHeader() {
  return (
    <div className="text-center mb-8">
      <div className="flex items-center justify-center mb-4">
        <Scan className="w-12 h-12 text-gray-400" />
      </div>
      <h1 className="text-3xl font-bold mb-2 text-gray-200">Document Scanner</h1>
      <p className="text-gray-500">
        Upload your documents for quick and secure information extraction
      </p>
    </div>
  );
}