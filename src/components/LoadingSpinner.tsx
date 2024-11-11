import React from 'react';
import { Loader2 } from 'lucide-react';

export function LoadingSpinner() {
  return (
    <div className="text-center py-8">
      <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4" />
      <p>Processing document...</p>
    </div>
  );
}