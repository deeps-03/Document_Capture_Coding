import React from 'react';
import { FileScanner } from './components/FileScanner';
import { ScannerHeader } from './components/ScannerHeader';

function App() {
  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      <div className="container mx-auto px-4 py-8">
        <ScannerHeader />
        <FileScanner />
      </div>
    </div>
  );
}

export default App;