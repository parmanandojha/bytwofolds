import express from 'express'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()
const PORT = process.env.PORT || 5001

// CORS middleware - must be before other middleware
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS, PUT, PATCH')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With, Accept, Origin')
  res.setHeader('Access-Control-Allow-Credentials', 'true')
  res.setHeader('Access-Control-Max-Age', '86400') // 24 hours
  
  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    res.status(200).end()
    return
  }
  
  next()
})

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const dataDir = path.join(__dirname, 'data')
const submissionsFile = path.join(dataDir, 'submissions.json')

// Ensure data directory exists
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true })
}

// Initialize JSON file if it doesn't exist
if (!fs.existsSync(submissionsFile)) {
  fs.writeFileSync(submissionsFile, JSON.stringify([], null, 2))
}

// Get all submissions
app.get('/api/submissions', (req, res) => {
  try {
    const data = fs.readFileSync(submissionsFile, 'utf8')
    const submissions = JSON.parse(data)
    res.json(submissions)
  } catch (error) {
    res.status(500).json({ error: 'Failed to read submissions' })
  }
})

// Save new submission
app.post('/api/submissions', (req, res) => {
  try {
    console.log('Received submission:', req.body)
    const data = fs.readFileSync(submissionsFile, 'utf8')
    const submissions = JSON.parse(data)
    
    const newSubmission = {
      id: Date.now().toString(),
      ...req.body,
      createdAt: new Date().toISOString()
    }
    
    submissions.push(newSubmission)
    fs.writeFileSync(submissionsFile, JSON.stringify(submissions, null, 2))
    
    console.log('Submission saved successfully:', newSubmission.id)
    res.json({ success: true, submission: newSubmission })
  } catch (error) {
    console.error('Error saving submission:', error)
    res.status(500).json({ error: 'Failed to save submission', details: error.message })
  }
})

// Delete a submission
app.delete('/api/submissions/:id', (req, res) => {
  try {
    const submissionId = req.params.id
    console.log('Deleting submission:', submissionId)
    
    const data = fs.readFileSync(submissionsFile, 'utf8')
    const submissions = JSON.parse(data)
    
    const initialLength = submissions.length
    const filteredSubmissions = submissions.filter(sub => sub.id !== submissionId)
    
    if (filteredSubmissions.length === initialLength) {
      return res.status(404).json({ error: 'Submission not found' })
    }
    
    fs.writeFileSync(submissionsFile, JSON.stringify(filteredSubmissions, null, 2))
    
    console.log('Submission deleted successfully:', submissionId)
    res.json({ success: true, message: 'Submission deleted successfully' })
  } catch (error) {
    console.error('Error deleting submission:', error)
    res.status(500).json({ error: 'Failed to delete submission', details: error.message })
  }
})

app.get('/api', (req, res) => {
  res.json({ message: 'Server is running' })
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
