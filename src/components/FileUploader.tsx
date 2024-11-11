import React from 'react';
import { Upload, Image as ImageIcon } from 'lucide-react';

interface FileUploaderProps {
  onFileSelect: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export function FileUploader({ onFileSelect }: FileUploaderProps) {
  return (
    <div className="bg-dark-alt rounded-lg mb-8 overflow-hidden border border-border">
      <div className="p-4 bg-accent-dark border-b border-border">
        <h3 className="text-lg font-medium flex items-center text-gray-200">
          <ImageIcon className="w-5 h-5 mr-2" />
          Upload Document
        </h3>
      </div>
      <label className="flex flex-col items-center p-8 cursor-pointer group transition-all duration-200 hover:bg-accent-light/30">
        <div className="w-16 h-16 rounded-full bg-accent-dark flex items-center justify-center mb-4 group-hover:bg-accent-light transition-colors">
          <Upload className="w-8 h-8 text-gray-300 group-hover:scale-110 transition-transform" />
        </div>
        <div className="text-center">
          <p className="text-sm mb-1 text-gray-300">Choose file or drag & drop</p>
          <p className="text-xs text-gray-500">Supported: JPG, PNG (Max 10MB)</p>
        </div>
        <input
          type="file"
          accept="image/*"
          onChange={onFileSelect}
          className="hidden"
        />
      </label>
    </div>
  );
}