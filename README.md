# Document Scanner

A powerful document information extraction tool specialized for passports and driver's licenses.

## Features

- 📝 Accurate text extraction from documents
- 🔍 Specialized handling for:
  - Passports
  - Driver's Licenses
- 📄 PDF report generation
- 🎯 Extracts key information:
  - Full Name
  - Document Number
  - Expiration Date
- 🔒 Local processing (no data sent to external servers)
- 💻 Modern, responsive UI
- 🚀 Fast processing


## Technical Stack

- React + TypeScript
- Tesseract.js for OCR
- TailwindCSS for styling
- jsPDF for report generation
- Vite for development and building
- Docker for containerization

## Docker Hub Link 

Link: https://hub.docker.com/repository/docker/deepaksuresh03/document_capture_coding/general

## Getting Started

### Local Development

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start development server:
   ```bash
   npm run dev
   ```
   The application will be available at `http://localhost:1234`

3. Build for production:
   ```bash
   npm run build
   ```

### Using Docker

#### Development Mode

1. Start the development container:
   ```bash
   docker compose up dev
   ```
   This will start the development server with hot-reload enabled.

#### Production Mode

1. Build and start the production container:
   ```bash
   docker compose up prod -d
   ```
   This will build an optimized production version and serve it.

2. Stop the production container:
   ```bash
   docker compose down
   ```

### Manual Docker Commands

If you prefer to use Docker directly:

1. Build the image:
   ```bash
   docker build -t document-scanner .
   ```

2. Run in development mode:
   ```bash
   docker run -it -p 1234:1234 -v $(pwd):/app document-scanner
   ```

3. Run in production mode:
   ```bash
   docker run -d -p 1234:1234 document-scanner
   ```

## Usage Guide

1. Select document type (Passport or Driver's License)
2. Upload a clear image of your document
3. Wait for processing
4. Review extracted information
5. Download PDF report if needed

## Best Practices for Document Scanning

For optimal results:
- Use clear, well-lit images
- Ensure text is clearly visible
- Avoid glare and shadows
- Use high-resolution scans/photos
- Keep the document straight (not tilted)

## Privacy & Security

- All processing is done locally in your browser
- No data is sent to external servers
- No information is stored or saved

## Development

### Project Structure
```
document-scanner/
├── src/
│   ├── components/    # React components
│   ├── utils/         # Utility functions
│   └── types/         # TypeScript types
├── public/           # Static assets
└── docker/          # Docker configuration
```

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally

## License

MIT License

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
