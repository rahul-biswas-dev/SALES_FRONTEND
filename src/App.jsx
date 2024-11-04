import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import {
  Container,
  AppBar,
  Toolbar,
  Typography,
  Box,
  Tab,
  Tabs
} from '@mui/material'
import ScriptRunner from '@/components/ScriptRunner'
import FileManager from '@/components/FileManager'
import { useState } from 'react'

function App() {
  const [tab, setTab] = useState(0)

  return (
    <Router>
      <AppBar
        position="static"
        elevation={1}
        sx={{
          background: 'rgba(255, 255, 255, 0.9)',
          backdropFilter: 'blur(8px)',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
        }}
      >
        <Toolbar sx={{ justifyContent: 'center' }}>
          <Typography
            variant="h6"
            sx={{
              color: '#1e3c72',
              fontWeight: 600,
              letterSpacing: '0.5px'
            }}
          >
            Sales Data Manager
          </Typography>
        </Toolbar>
      </AppBar>

      <Container
        sx={{
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
          borderRadius: '16px',
          padding: '24px',
          marginTop: '24px',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
          backdropFilter: 'blur(8px)'
        }}
      >
        <Box
          sx={{
            borderBottom: 1,
            borderColor: 'divider',
            mb: 3,
            display: 'flex',
            justifyContent: 'center'
          }}
        >
          <Tabs
            value={tab}
            onChange={(e, newValue) => setTab(newValue)}
            centered
          >
            <Tab label="Run Script" />
            <Tab label="Pivot Files" />
            <Tab label="Screenshots" />
          </Tabs>
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          {tab === 0 && <ScriptRunner />}
          {tab === 1 && <FileManager type="pivot" />}
          {tab === 2 && <FileManager type="screenshot" />}
        </Box>
      </Container>
    </Router>
  )
}

export default App
