import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import CssBaseline from '@mui/material/CssBaseline'
import Grid from '@mui/material/Grid'
import Link from '@mui/material/Link'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Axios } from '../config'
import cartoonImage from './cartoon.png'

const theme = createTheme({
  palette: {
    primary: {
      main: '#000000',
    },
  },
  typography: {
    fontFamily: ['Amaranth', 'sans-serif'].join(','),
  },
})

function LoginForm() {
  const navigate = useNavigate()
  const [error, setError] = useState(null)
  // const [formData, setFormData] = useState({
  //   email: "",
  //   password: "",
  // });

  const handleSubmit = (event) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const user = {
      email: data.get('email'),
      password: data.get('password'),
    }
    handlePost(user)
  }

  const handlePost = (formData) => {
    //e.preventDefault();
    try {
      if (!formData.email || !formData.password) {
        setError('Please fill in all required fields.')
        setTimeout(() => {
          alert('Please fill in all required fields.')
        }, 10) // Delay the alert by a small amount
        return
      }

      Axios.post('/users/signin', formData)
        .then((response) => {
          const responseData = JSON.stringify(response.data)
          localStorage.setItem('SRA_userData', responseData)
          if (response.data.role === 'customer') {
            navigate('/')
          } else {
            navigate('/admin')
          }
        })
        .catch((error) => {
          // Add a pop up with message "error.response.data.message"
          console.log(error)
          alert(error.response)
        })
    } catch (error) {
      setError(error.response.data.message)
      alert(error.response.data.message)
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <Container component='main' maxWidth='xs'>
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <img
            src={cartoonImage}
            alt='cartoonImage'
            style={{ height: 90, width: 90 }}
          />
          <Typography component='h1' variant='h5'>
            Sign in
          </Typography>
          <Box component='form' onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <TextField
              margin='normal'
              required
              fullWidth
              id='email'
              label='Email'
              type='email'
              name='email'
              autoComplete='email'
              autoFocus
            />
            <TextField
              margin='normal'
              required
              fullWidth
              name='password'
              label='Password'
              type='password'
              id='password'
              autoComplete='current-password'
            />
            <Button
              type='submit'
              fullWidth
              variant='contained'
              sx={{ mt: 3, mb: 2 }}
              style={{ backgroundColor: '#ff841c', color: 'white' }}
            >
              Sign In
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  )
}

export default LoginForm
