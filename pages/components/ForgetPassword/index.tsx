/* eslint-disable indent */
/* eslint-disable arrow-parens */
/* eslint-disable prettier/prettier */
/* eslint-disable quote-props */
import {
  Box,
  Container,
  Stack,
  FormControl,
  Button,
  Typography,
} from '@mui/material'
import React from 'react'
import {useFormik} from 'formik'
import {object, ref, string} from 'yup'
import ApiUtils from '@/components/apis/ApiUtils'
import {ToasterMessage} from '@/components/helpers/ToastMessage'
import InputTextField from '../InputField/InputTextField'
function ForgetPassword(): React.JSX.Element {
  const signupValidation = useFormik({
    initialValues: {
      name: '',
      email: '',
      passwordCurrent: '',
      password: '',
      appType: 'linkedin',
    },
    validationSchema: object().shape({
      name: string().required('Name is required'),
      email: string().required('Email is required'),
      passwordCurrent: string().required('Current Password is required'),
      password: string()
        .required('New Password is required')
        .oneOf([ref('passwordCurrent')], 'Passwords must match'),
    }),
    onSubmit: async values => {
      try {
        await ApiUtils.updatePassword(values)
        ToasterMessage('success', 'Password Updated Successfully')
        signupValidation.resetForm()
      } catch (err: any) {
        ToasterMessage('error', err?.response?.data?.message)
      }
    },
  })
  return (
    <Box sx={{display: 'flex', justifyContent: 'center', margin: '0 auto'}}>
      <Container
        sx={{
          width: '100%',
          //   padding: '1px',
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
              fontSize: '1.4rem',
            }}>
            Reset Password
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
              marginTop: '10px',
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
              id="passwordCurrent"
              name="passwordCurrent"
              label="Current Password"
              type="passwordCurrent"
              value={signupValidation.values.passwordCurrent}
              onChange={signupValidation.handleChange}
              onBlur={signupValidation.handleBlur}
              error={
                (signupValidation.touched.passwordCurrent ?? false) &&
                Boolean(signupValidation.errors.passwordCurrent)
              }
              helperText={
                (signupValidation.touched.passwordCurrent ?? false) &&
                signupValidation.errors.passwordCurrent
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
          </FormControl>

          <Stack sx={{padding: '10px', marginTop: '2px'}}>
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
              Reset Password
            </Button>
          </Stack>
        </Box>
      </Container>
    </Box>
  )
}

export default ForgetPassword
