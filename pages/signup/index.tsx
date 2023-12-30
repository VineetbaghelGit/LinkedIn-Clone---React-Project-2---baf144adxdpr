/* eslint-disable arrow-parens */
/* eslint-disable prettier/prettier */
/* eslint-disable quote-props */
import {
  Box,
  Container,
  Stack,
  Typography,
  FormControl,
  Button,
} from '@mui/material'
import React from 'react'
import Link from 'next/link'
import InputTextField from '../components/InputField/InputTextField'
import {useFormik} from 'formik'
import * as Yup from 'yup'
import GuestLayout from '@/components/appLayouts/GuestLayout'
import ApiUtils from '@/components/apis/ApiUtils'
import {ToasterMessage} from '@/components/helpers/ToastMessage'
function SignupPage(): React.JSX.Element {
  const signupValidation = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      appType: 'linkedin',
    },
    validationSchema: Yup.object().shape({
      name: Yup.string().required('Name is required'),
      email: Yup.string().required('Email is required'),
      password: Yup.string().required('Password is required'),
    }),
    onSubmit: async values => {
      try {
        await ApiUtils.authSignup(values)
        ToasterMessage('success', 'Signup Successfully')
        signupValidation.resetForm()
      } catch (err: any) {
        ToasterMessage('error', err?.response?.data?.message)
      }
    },
  })
  return (
    <GuestLayout>
      <Box sx={{display: 'flex', justifyContent: 'center', margin: '0 auto'}}>
        <Container
          sx={{
            width: '350px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
            padding: '24px',
            borderRadius: '8px',
            margin: '0 auto',
            height: 'max-content',
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
              Sign up
            </Typography>
            <Typography
              component="p"
              sx={{
                fontSize: '13px',
                lineHeight: '1.25',
                color: 'rgba(0,0,0,0.9)',
                margin: '4px 0px',
              }}>
              Make the most of your professional life
            </Typography>
          </Stack>
          <Box
            component="form"
            sx={{
              '& .MuiTextField-root': {m: 1, width: '28ch'},
            }}
            onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
              e.preventDefault()
              signupValidation.handleSubmit()
            }}>
            <FormControl
              sx={{
                marginTop: '24px',
                marginBottom: '0px',
              }}>
              <InputTextField
                id="name"
                name="name"
                label="Name"
                type="text"
                value={signupValidation.values.name}
                onChange={signupValidation.handleChange}
                onBlur={signupValidation.handleBlur}
                error={
                  (signupValidation.touched.name ?? false) &&
                  Boolean(signupValidation.errors.name)
                }
                helperText={
                  (signupValidation.touched.name ?? false) &&
                  signupValidation.errors.name
                }
              />
            </FormControl>
            <FormControl
              sx={{
                marginTop: '10px',
                marginBottom: '0px',
              }}>
              <InputTextField
                id="email"
                name="email"
                label="Email"
                type="email"
                value={signupValidation.values.email}
                onChange={signupValidation.handleChange}
                onBlur={signupValidation.handleBlur}
                error={
                  (signupValidation.touched.email ?? false) &&
                  Boolean(signupValidation.errors.email)
                }
                helperText={
                  (signupValidation.touched.email ?? false) &&
                  signupValidation.errors.email
                }
              />
            </FormControl>
            <FormControl
              sx={{
                marginTop: '10px',
                marginBottom: '0px',
              }}>
              <InputTextField
                id="password"
                name="password"
                label="Password"
                type="password"
                value={signupValidation.values.password}
                onChange={signupValidation.handleChange}
                onBlur={signupValidation.handleBlur}
                error={
                  (signupValidation.touched.password ?? false) &&
                  Boolean(signupValidation.errors.password)
                }
                helperText={
                  (signupValidation.touched.password ?? false) &&
                  signupValidation.errors.password
                }
              />
              <Typography
                sx={{
                  fontSize: '15px',
                  lineHeight: '1.25',
                  color: 'rgba(0,0,0,0.9)',
                  marginTop: '8px',
                  fontWeight: '500',
                  position: 'relative',
                  left: '9px',
                }}>
                Already on LinkedIn?
                <Link
                  href="/login"
                  style={{color: '#0073b1', textDecoration: 'none'}}>
                  &nbsp;Sign in
                </Link>
              </Typography>
            </FormControl>

            <Stack sx={{padding: '16px', marginTop: '4px'}}>
              <Button
                variant="contained"
                type="submit"
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
                Sign up
              </Button>
            </Stack>
          </Box>
        </Container>
      </Box>
    </GuestLayout>
  )
}

export default SignupPage
