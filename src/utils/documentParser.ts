import { createWorker } from 'tesseract.js';
import type { DocumentData, DocumentType } from '../types/document';

const patterns = {
  passport: {
    name: [
      /Surname[\s:]+([A-Z][a-z]+)[\s\n]+Given Names?[\s:]+([A-Z][a-z]+(?:\s+[A-Z][a-z]+)*)/i,
      /P<[A-Z]{3}([A-Z]+)<<([A-Z]+)/,
    ],
    documentNumber: [
      /Passport No[\s.:]+([A-Z]\d{7})/i,
      /Document No[\s.:]+([A-Z]\d{7})/i,
      /([A-Z]\d{7})/
    ],
    expirationDate: [
      /Date of expiry[\s.:]+(\d{2}[-/.]\d{2}[-/.]\d{4})/i,
      /Expiry[\s.:]+(\d{2}[-/.]\d{2}[-/.]\d{4})/i,
      /(\d{2}[-/.]\d{2}[-/.]\d{4})/
    ]
  },
  license: {
    name: [
      /NAME\s*[.:]\s*([A-Z][A-Z\s]+(?:\s+[A-Z])?)/i,
      /Name\s*[.:]\s*([A-Z][A-Z\s]+(?:\s+[A-Z])?)/i,
      /([A-Z][A-Z\s]+(?:\s+[A-Z])?)[\s\n]+(?:S\/O|D\/O|C\/O)/i
    ],
    documentNumber: [
      /DL No\s*[.:]\s*([A-Z]{2}\d{2}\s*\d{8})/i,
      /License No\s*[.:]\s*([A-Z]{2}\d{2}\s*\d{8})/i,
      /([A-Z]{2}\d{2}\s*\d{8})/
    ],
    expirationDate: [
      /VALID TILL\s*[.:]\s*(\d{2}[-/.]\d{2}[-/.]\d{4})(?:\s*\([^)]*\))?/i,
      /Valid Till\s*[.:]\s*(\d{2}[-/.]\d{2}[-/.]\d{4})(?:\s*\([^)]*\))?/i,
      /Valid up to\s*[.:]\s*(\d{2}[-/.]\d{2}[-/.]\d{4})(?:\s*\([^)]*\))?/i
    ]
  }
};

const extractField = (text: string, patterns: RegExp[]): string => {
  for (const pattern of patterns) {
    const match = text.match(pattern);
    if (match) {
      if (pattern.toString().includes('P<')) {
        return `${match[2]} ${match[1]}`.replace(/</g, ' ').trim();
      }
      return match[1].trim();
    }
  }
  return '';
};

const formatDate = (date: string): string => {
  return date.replace(/[-/.]/g, '/');
};

const formatLicenseNumber = (number: string): string => {
  // Format: KA03 20240007716 -> KA03 2024 0007716
  return number.replace(/(\w{2}\d{2})\s*(\d{4})(\d{4})/, '$1 $2 $3');
};

export async function extractDocumentData(
  image: string,
  documentType: DocumentType
): Promise<DocumentData> {
  try {
    const worker = await createWorker();
    
    await worker.setParameters({
      tessedit_char_whitelist: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-/.:, ()',
      tessedit_pageseg_mode: '1',
      preserve_interword_spaces: '1',
      tessedit_ocr_engine_mode: '1'
    });

    const { data: { text } } = await worker.recognize(image);
    await worker.terminate();

    const fields: DocumentField[] = [];
    const processedText = text.replace(/\s+/g, ' ').trim();

    const typePatterns = patterns[documentType as keyof typeof patterns];
    
    if (typePatterns) {
      // Extract name
      const name = extractField(processedText, typePatterns.name);
      if (name) fields.push({ key: 'Full Name', value: name });

      // Extract document number
      const docNumber = extractField(processedText, typePatterns.documentNumber);
      if (docNumber) {
        fields.push({
          key: 'Document Number',
          value: documentType === 'license' ? formatLicenseNumber(docNumber) : docNumber
        });
      }

      // Extract expiration date
      const expiryDate = extractField(processedText, typePatterns.expirationDate);
      if (expiryDate) fields.push({ key: 'Expiration Date', value: formatDate(expiryDate) });
    }

    return {
      fields,
      documentType,
      scanDate: new Date().toISOString()
    };
  } catch (error) {
    console.error('Error in document parsing:', error);
    throw new Error('Failed to process document');
  }
}