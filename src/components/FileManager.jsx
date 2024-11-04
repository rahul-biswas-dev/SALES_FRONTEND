import React, { useState, useEffect } from 'react'
import {
  Box,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Button,
  Typography,
  Alert,
  Checkbox
} from '@mui/material'
import { Delete, Download } from '@mui/icons-material'
import { managePivot, manageScreenshot } from '@/services/api'

const FileManager = ({ type }) => {
  const [files, setFiles] = useState([])
  const [error, setError] = useState(null)
  const [selectedFiles, setSelectedFiles] = useState([])

  const manageFunction = type === 'pivot' ? managePivot : manageScreenshot

  const loadFiles = async () => {
    try {
      const response = await manageFunction('list')
      setFiles(response)
    } catch (err) {
      setError(err.message)
    }
  }

  useEffect(() => {
    loadFiles()
  }, [])

  const handleDelete = async (filename) => {
    try {
      await manageFunction('delete', [filename])
      loadFiles()
    } catch (err) {
      setError(err.message)
    }
  }

  const handleFileSelect = (filename) => {
    setSelectedFiles((prev) =>
      prev.includes(filename)
        ? prev.filter((f) => f !== filename)
        : [...prev, filename]
    )
  }

  const handleDownload = async () => {
    try {
      const response = await manageFunction('download', selectedFiles)
      const blob = new Blob([response], { type: 'application/zip' })
      const url = window.URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', `${type}_files.zip`)
      document.body.appendChild(link)
      link.click()
      link.remove()
      window.URL.revokeObjectURL(url)
      setSelectedFiles([])
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <Box sx={{ maxWidth: 600, m: 'auto', p: 2 }}>
      <Typography variant="h6" sx={{ mb: 2 }}>
        {type === 'pivot' ? 'Pivot Files' : 'Screenshots'}
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <List
        sx={{
          backgroundColor: 'rgba(255, 255, 255, 0.8)',
          borderRadius: '8px',
          padding: '16px',
          '& .MuiListItem-root': {
            marginBottom: '8px',
            borderRadius: '8px',
            '&:hover': {
              backgroundColor: 'rgba(30, 60, 114, 0.1)'
            }
          }
        }}
      >
        {files.map((file) => (
          <ListItem key={file}>
            <Checkbox
              checked={selectedFiles.includes(file)}
              onChange={() => handleFileSelect(file)}
            />
            <ListItemText primary={file} />
            <ListItemSecondaryAction>
              <IconButton onClick={() => handleDelete(file)}>
                <Delete />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>

      {selectedFiles.length > 0 && (
        <Button
          variant="contained"
          startIcon={<Download />}
          onClick={handleDownload}
          sx={{ mt: 2 }}
        >
          Download Selected ({selectedFiles.length}) Files
        </Button>
      )}
    </Box>
  )
}

export default FileManager
