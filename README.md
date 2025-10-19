Document AI App

A web-based application to process PDF/DOC/DOCX files for Summarization and Question Generation using NLP.

Features

- File Upload: Upload PDF/DOC/DOCX files
- Page Range Selection: Select specific pages or full document
- Summarization: Summarize content in points or paragraph style
- Question Generation: Generate short-answer and long-answer questions
- Dynamic UI: Interactive frontend with copy and download options

Installation & Running

Clone the Repository

bash
git clone https://github.com/Harshitha8117/document-ai-app.git
cd document-ai-app


Install Dependencies

bash
cd backend
npm install
cd ../frontend
npm install


Start the App

bash
cd backend
node server.js
cd ../frontend
live-server


Usage

1. Upload a PDF or DOC/DOCX file
2. Select page range (optional)
3. Choose action: Summarize or Generate Questions
4. Choose summary style (points/paragraph)
5. View, copy, or download results

Project Structure

- backend/: Express server and NLP processing
- frontend/: Dynamic UI and interactivity
- uploads/: Temporary storage for uploaded files

License

MIT License


