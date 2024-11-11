import React from 'react';
import { AlertCircle } from 'lucide-react';

interface ErrorMessageProps {
  message: string;
}

export function ErrorMessage({ message }: ErrorMessageProps) {
  return (
    <div className="bg-red-900/50 border border-red-700 p-4 rounded-lg mb-8 flex items-start">
      <AlertCircle className="w-5 h-5 text-red-500 mr-2 flex-shrink-0 mt-0.5" />
      <p className="text-red-200">{message}</p>
    </div>
  );
}