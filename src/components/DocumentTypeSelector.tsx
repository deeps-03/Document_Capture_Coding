import React from 'react';
import { DocumentType } from '../types/document';
import { FileText, CreditCard } from 'lucide-react';

interface DocumentTypeSelectorProps {
  value: DocumentType;
  onChange: (type: DocumentType) => void;
}

export function DocumentTypeSelector({ value, onChange }: DocumentTypeSelectorProps) {
  return (
    <div className="mb-8">
      <label className="block text-sm font-medium mb-4 text-gray-300">Select Document Type</label>
      <div className="grid grid-cols-2 gap-4">
        <button
          className={`flex items-center justify-center p-6 rounded-lg border transition-all duration-200 ${
            value === 'passport'
              ? 'border-border-hover bg-accent-light shadow-lg scale-[1.02]'
              : 'border-border hover:border-border-hover hover:bg-accent-light/50'
          }`}
          onClick={() => onChange('passport')}
        >
          <div className="text-center">
            <FileText className="w-8 h-8 mx-auto mb-2" />
            <span>Passport</span>
          </div>
        </button>
        <button
          className={`flex items-center justify-center p-6 rounded-lg border transition-all duration-200 ${
            value === 'license'
              ? 'border-border-hover bg-accent-light shadow-lg scale-[1.02]'
              : 'border-border hover:border-border-hover hover:bg-accent-light/50'
          }`}
          onClick={() => onChange('license')}
        >
          <div className="text-center">
            <CreditCard className="w-8 h-8 mx-auto mb-2" />
            <span>Driver's License</span>
          </div>
        </button>
      </div>
    </div>
  );
}