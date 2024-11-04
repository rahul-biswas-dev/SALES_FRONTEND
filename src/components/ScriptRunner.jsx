import React, { useState } from 'react'
import {
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  Alert,
  CircularProgress
} from '@mui/material'
import { runScript } from '@/services/api'

const ScriptRunner = () => {
  const [category, setCategory] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setSuccess(false)

    try {
      const result = await runScript(category, password)
      if (result.success) {
        setSuccess(true)
      } else {
        setError(result.error || 'Script execution failed')
      }
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ maxWidth: 400, m: 'auto', p: 2 }}
    >
      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel>Category</InputLabel>
        <Select
          value={category}
          label="Category"
          onChange={(e) => setCategory(e.target.value)}
          required
        >
          <MenuItem value="GM">GM</MenuItem>
          <MenuItem value="STAPLES">STAPLES</MenuItem>
          <MenuItem value="F&V">F&V</MenuItem>
        </Select>
      </FormControl>

      <TextField
        fullWidth
        type="password"
        label="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        sx={{ mb: 2 }}
      />

      <Button
        fullWidth
        type="submit"
        variant="contained"
        disabled={loading}
        sx={{
          mb: 2,
          background: 'linear-gradient(45deg, #1e3c72 30%, #2a5298 90%)',
          boxShadow: '0 3px 5px 2px rgba(30, 60, 114, .3)',
          transition: 'transform 0.2s ease',
          '&:hover': {
            transform: 'scale(1.02)',
            background: 'linear-gradient(45deg, #1e3c72 30%, #2a5298 90%)'
          }
        }}
      >
        {loading ? <CircularProgress size={24} /> : 'Run Script'}
      </Button>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {success && (
        <Alert severity="success" sx={{ mb: 2 }}>
          Script executed successfully!
        </Alert>
      )}
    </Box>
  )
}

export default ScriptRunner
