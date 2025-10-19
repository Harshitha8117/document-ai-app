const fs = require('fs');
const pdfParse = require('pdf-parse');
const mammoth = require('mammoth');

async function extractText(filePath) {
  const ext = filePath.split('.').pop().toLowerCase();
  if (ext === 'pdf') {
    const dataBuffer = fs.readFileSync(filePath);
    const pdfData = await pdfParse(dataBuffer);
    return pdfData.text;
  } else if (ext === 'docx' || ext === 'doc') {
    const result = await mammoth.extractRawText({ path: filePath });
    return result.value;
  } else {
    throw new Error('Unsupported file type');
  }
}

// Dummy NLP processor (replace with OpenAI/Groq API for real results)
async function processDocument(filePath, action, pageRange, summaryStyle) {
  let text = await extractText(filePath);

  // Simple page-range handling: just placeholder
  if (pageRange) {
    text = text.split('\n').slice(0, 50).join('\n'); // Example: first 50 lines
  }

  if (action === 'summarize') {
    if (summaryStyle === 'points') {
      return text.split('. ').slice(0, 5).map(s => '• ' + s).join('\n');
    } else {
      return text.split('. ').slice(0, 5).join('. ') + '.';
    }
  } else if (action === 'questions') {
    // Generate placeholder questions
    const sentences = text.split('. ').slice(0, 5);
    return sentences.map((s, i) => `Q${i + 1}: Explain "${s.trim()}"`).join('\n');
  }

  return text;
}

module.exports = { processDocument };
