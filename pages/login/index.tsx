/* eslint-disable quote-props */
import GuestHeader from '@/components/shared/GuestHeader'
import {
  Box,
  Container,
  Stack,
  Typography,
  FormControl,
  Button,
} from '@mui/material'
import React from 'react'
import TextField from '@mui/material/TextField'
import Link from 'next/link'

function LoginPage(): React.JSX.Element {
  return (
    <>
      <GuestHeader />
      <Box sx={{display: 'flex', justifyContent: 'center', margin: '0 auto'}}>
        <Container
          sx={{
            width: '350px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
            padding: '24px',
            borderRadius: '8px',
            margin: '0 auto',
            height: '400px',
            '@media screen and (max-width:360px)': {
              width: '98%',
            },
          }}>
          <Stack>
            <Typography
              variant="h4"
              component="h2"
              sx={{
                lineHeight: '1.25',
                color: 'rgba(0,0,0,0.9)',
                padding: '0 0 4px 0',
              }}>
              Sign in
            </Typography>
            <Typography
              component="p"
              sx={{
                fontSize: '13px',
                lineHeight: '1.25',
                color: 'rgba(0,0,0,0.9)',
                margin: '4px 0px',
              }}>
              Stay updated on your professional world
            </Typography>
          </Stack>
          <Box
            component="form"
            sx={{
              '& .MuiTextField-root': {m: 1, width: '28ch'},
            }}>
            <FormControl
              sx={{
                marginTop: '24px',
                marginBottom: '0px',
              }}>
              <TextField
                id="filled-search"
                label="Email"
                type="search"
                sx={{
                  lineHeight: '1.33333',
                  fontWeight: '400',
                  color: 'rgba(0,0,0,0.9)',
                  borderRadius: '4px !important',
                }}
              />
            </FormControl>
            <FormControl
              sx={{
                marginTop: '10px',
                marginBottom: '0px',
              }}>
              <TextField
                id="filled-search"
                label="Password"
                type="password"
                sx={{
                  lineHeight: '1.33333',
                  fontWeight: '400',
                  color: 'rgba(0,0,0,0.9)',
                  borderRadius: '4px !important',
                }}
              />
              <Typography
                sx={{
                  fontSize: '1rem',
                  lineHeight: '1.25',
                  color: 'rgba(0,0,0,0.9)',
                  marginTop: '8px',
                  fontWeight: '550',
                  position: 'relative',
                  left: '9px',
                }}>
                <Link
                  href="/forgot-password"
                  style={{color: '#0073b1', textDecoration: 'none'}}>
                  Forgot Password?
                </Link>
              </Typography>
            </FormControl>
          </Box>

          <Stack sx={{padding: '16px', marginTop: '10px'}}>
            <Button
              variant="contained"
              sx={{
                height: '52px',
                overflow: 'hidden',
                padding: '0 24px',
                borderRadius: '28px',
                background: '#0a66c2',
                ':hover': {
                  background: '#004182',
                },
              }}>
              Sign in
            </Button>
          </Stack>
        </Container>
      </Box>
    </>
  )
}

export default LoginPage
