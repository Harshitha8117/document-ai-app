const fileInput = document.getElementById('fileInput');
const uploadBtn = document.getElementById('uploadBtn');
const uploadStatus = document.getElementById('uploadStatus');
const processBtn = document.getElementById('processBtn');
const outputContent = document.getElementById('outputContent');
const summaryOptions = document.getElementById('summaryOptions');
const actionRadios = document.querySelectorAll('input[name="action"]');
const copyBtn = document.getElementById('copyBtn');
const downloadBtn = document.getElementById('downloadBtn');

let uploadedFile = null;

// File selection
fileInput.addEventListener('change', () => {
  uploadedFile = fileInput.files[0];
  uploadStatus.textContent = uploadedFile ? `Selected: ${uploadedFile.name}` : 'No file selected.';
});

// Upload file
uploadBtn.addEventListener('click', async () => {
  if (!uploadedFile) { alert('Select a file first'); return; }
  const formData = new FormData();
  formData.append('document', uploadedFile);
  uploadStatus.textContent = 'Uploading...';
  try {
    const res = await fetch('http://localhost:5000/api/upload', { method: 'POST', body: formData });
    const data = await res.json();
    uploadStatus.textContent = res.ok ? 'Upload successful!' : `Upload failed: ${data.message}`;
  } catch (err) { console.error(err); uploadStatus.textContent = 'Upload failed!'; }
});

// Show/hide summary options based on selected action
actionRadios.forEach(radio => {
  radio.addEventListener('change', () => {
    summaryOptions.style.display = radio.value === 'summarize' ? 'flex' : 'none';
  });
});

// Ensure correct initial state on page load
document.addEventListener('DOMContentLoaded', () => {
  summaryOptions.style.display = document.querySelector('input[name="action"]:checked').value === 'summarize' ? 'flex' : 'none';
});

// Process document
processBtn.addEventListener('click', async () => {
  if (!uploadedFile) { alert('Upload file first'); return; }
  const action = document.querySelector('input[name="action"]:checked').value;
  const pageRange = document.getElementById('pageRange').value;
  const summaryStyle = document.querySelector('input[name="summaryStyle"]:checked')?.value || 'points';
  outputContent.textContent = 'Processing...';

  try {
    const formData = new FormData();
    formData.append('document', uploadedFile);
    formData.append('action', action);
    formData.append('pageRange', pageRange);
    formData.append('summaryStyle', summaryStyle);
    const res = await fetch('http://localhost:5000/api/upload', { method: 'POST', body: formData });
    const data = await res.json();

    if (res.ok) {
      const result = data.result || data.message;
      if (action === 'summarize') {
        outputContent.innerHTML = summaryStyle === 'points'
          ? '<h3>Summary:</h3><ul>' + result.split(/\n|•/).filter(Boolean).map(p => `<li>${p.trim()}</li>`).join('') + '</ul>'
          : `<h3>Summary:</h3><p>${result}</p>`;
      } else if (action === 'questions') {
        outputContent.innerHTML = '<h3>Questions:</h3>' + result.split(/\n/).filter(Boolean).map(q => `<div class="question">${q}</div>`).join('');
      } else { outputContent.textContent = result; }
    } else {
      outputContent.textContent = `Error: ${data.message}`;
    }
  } catch (err) { console.error(err); outputContent.textContent = 'Error processing document'; }
});

// Copy & Download
copyBtn.addEventListener('click', () => {
  const text = outputContent.innerText;
  if (!text.trim()) { alert('No output!'); return; }
  navigator.clipboard.writeText(text).then(() => alert('Copied!')).catch(() => alert('Copy failed'));
});

downloadBtn.addEventListener('click', () => {
  const text = outputContent.innerText;
  if (!text.trim()) { alert('No output!'); return; }
  const blob = new Blob([text], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a'); a.href = url; a.download = 'document_output.txt';
  document.body.appendChild(a); a.click(); document.body.removeChild(a); URL.revokeObjectURL(url);
});
