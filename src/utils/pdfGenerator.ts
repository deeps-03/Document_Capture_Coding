import { jsPDF } from 'jspdf';
import { DocumentData } from '../types/document';

export function generatePDF(data: DocumentData): string {
  const doc = new jsPDF();
  
  // Set up fonts and styles
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(20);
  
  // Add header
  doc.text('Document Information Report', 20, 20);
  
  // Add document type
  doc.setFontSize(14);
  doc.text(`Document Type: ${data.documentType.toUpperCase()}`, 20, 35);
  
  // Add separator line
  doc.setLineWidth(0.5);
  doc.line(20, 40, 190, 40);
  
  // Add extracted information
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(12);
  let yPosition = 50;
  
  data.fields.forEach(field => {
    // Add field key
    doc.setFont('helvetica', 'bold');
    doc.text(`${field.key}:`, 20, yPosition);
    
    // Add field value with proper spacing
    doc.setFont('helvetica', 'normal');
    const value = doc.splitTextToSize(field.value, 150);
    doc.text(value, 60, yPosition);
    
    // Calculate next position based on content height
    yPosition += (Array.isArray(value) ? value.length : 1) * 8 + 8;
  });
  
  // Add footer with scan date
  doc.setFontSize(10);
  doc.setTextColor(100);
  doc.text(`Scan Date: ${new Date(data.scanDate).toLocaleString()}`, 20, 280);
  
  return doc.output('datauristring');
}