```markdown
# Document AI App

A web-based application to process PDF/DOC/DOCX files for **summarization** and **question generation** using NLP.

---

## **Project Structure**
```

document-ai-app/
│
├── backend/
│   ├── server.js              # Express server
│   ├── routes/upload.js       # File upload route
│   └── services/nlpProcessor.js # Summarization & question generation
│
├── frontend/
│   ├── index.html             # Main UI
│   ├── styles.css             # Frontend styling
│   └── script.js              # Frontend interactivity
│
├── uploads/                   # Temporary storage for uploaded files
├── start-app.bat              # Start backend and frontend simultaneously
├── package.json               # Node dependencies
└── README.md                  # Project documentation

````

---

## **Features**
- Upload PDF/DOC/DOCX files
- Page range selection (full or specific pages)
- Summarization (points or paragraph style)
- Question generation (short-answer & long-answer)
- Dynamic frontend UI
- Copy & download output

---

## **Installation & Running**
1. **Clone the repository**
```bash
git clone https://github.com/Harshitha8117/document-ai-app.git
cd document-ai-app/src
````

2. **Install backend dependencies**

```bash
cd backend
npm install
```

3. **Install frontend server (optional)**

```bash
cd ../frontend
npm install -g live-server
```

4. **Start backend**

```bash
cd ../backend
node server.js
```

5. **Start frontend**

```bash
cd ../frontend
live-server
```

6. Open your browser → interact with the app: upload, summarize, generate questions.

---

## **Usage**

1. Upload a PDF or DOC/DOCX file.
2. Select page range (optional).
3. Choose action: Summarize or Generate Questions.
4. Choose summary style if summarizing (points/paragraph).
5. View, copy, or download results.

---

## **License**

MIT License

````

---

Once you add these files:  

```powershell
git add .gitignore README.md
git commit -m "Add gitignore and professional README"
git push
````


