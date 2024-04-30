import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import CssBaseline from '@mui/material/CssBaseline'
import Grid from '@mui/material/Grid'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import * as React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Axios as axios } from '../config'
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

export default function SignUp() {
  const navigate = useNavigate()
  async function handlePost(newUser) {
    try {
      axios
        .post('/users/add-user', newUser)
        .then((response) => {
          navigate('/admin')
        })
        .catch((error) => {
          console.log(error.response.data)
          alert(error.response.data.message)
        })
    } catch (error) {
      alert(error.response.data.message)
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    console.log(`submit data${data}`)
    const passwordsMatch = data.get('password') === data.get('confirm-password')
    if (!passwordsMatch) {
      toast.warn('passwords do not match', {
        position: 'bottom-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        progress: undefined,
        theme: 'light',
      })
    } else {
      const newUser = {
        firstName: data.get('firstName'),
        lastName: data.get('lastName'),
        email: data.get('email'),
        password: data.get('password'),
        role: data.get('role'),
      }
      console.log(newUser)
      handlePost(newUser)
    }
  }

  const roles = ['waiter', 'chef', 'manager', 'admin', 'owner']

  return (
    <ThemeProvider theme={theme}>
      <Container component='main' maxWidth='xs'>
        <CssBaseline />
        <Box
          sx={{
            marginTop: 3,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <img
            src={cartoonImage}
            style={{ height: 90, width: 90 }}
            alt='cartoonImage'
          />

          <Typography component='h1' variant='h5'>
            Staff
          </Typography>
          <Box
            component='form'
            onSubmit={(e) => handleSubmit(e)}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  name='firstName'
                  required
                  fullWidth
                  id='firstName'
                  label='First Name'
                  autoFocus
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name='lastName'
                  required
                  fullWidth
                  id='lastName'
                  label='Last Name'
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id='email'
                  type='email'
                  label='Email'
                  name='email'
                />
              </Grid>
              <Grid item xs={12}>
                <Select fullWidth label='Role' id='role' name='role'>
                  {roles.map((role) => (
                    <MenuItem key={role} value={role}>
                      {role}
                    </MenuItem>
                  ))}
                </Select>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name='password'
                  label='Password'
                  type='password'
                  id='password'
                  inputProps={{ minLength: 8 }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name='confirm-password'
                  label='Confirm Password'
                  type='password'
                  id='confirm-password'
                  inputProps={{ minLength: 8 }}
                />
              </Grid>
            </Grid>
            <Button
              type='submit'
              fullWidth
              variant='contained'
              sx={{ mt: 2, mb: 2 }}
              style={{ backgroundColor: '#ff841c', color: 'white' }}
            >
              Add Staff
            </Button>
            <Link to='/admin'>
              <Button
                fullWidth
                variant='contained'
                sx={{ mb: 2 }}
                style={{ backgroundColor: '#000000', color: 'white' }}
              >
                Close
              </Button>
            </Link>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  )
}
