/* eslint-disable arrow-parens */
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
import {useRouter} from 'next/navigation'

import InputTextField from '../components/InputField/InputTextField'
import {useFormik} from 'formik'
import * as Yup from 'yup'
import GuestLayout from '@/components/appLayouts/GuestLayout'
import ApiUtils from '@/components/apis/ApiUtils'
import {setCookie} from 'cookies-next'
import {USER_DETAILS, USER_ID, USER_TOKEN} from '@/components/utils/AppConfig'
import {useAppDispatch} from '@/components/store/hooks'
import {setLoginToken} from '@/components/store/slices/auth/reducer'
import {ToasterMessage} from '@/components/helpers/ToastMessage'
import {
  setLoggedInUserDetails,
  setLoggedInUserId,
} from '@/components/store/slices/user/reducer'

function LoginPage(): React.JSX.Element {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const loginValidation = useFormik({
    initialValues: {
      email: '',
      password: '',
      appType: 'linkedin',
    },
    validationSchema: Yup.object().shape({
      email: Yup.string().required('Email is required'),
      password: Yup.string().required('Password is required'),
    }),
    onSubmit: async value => {
      try {
        const response: any = await ApiUtils.authLogin(value)
        setCookie(USER_TOKEN, JSON.stringify(response?.token))
        setCookie(USER_ID, JSON.stringify(response?.data?._id))
        setCookie(USER_DETAILS, JSON.stringify(response?.data))
        dispatch(setLoginToken(response?.token))
        dispatch(setLoggedInUserId(response?.data?._id))
        dispatch(setLoggedInUserDetails(response?.data))
        router.push('/')
        ToasterMessage('success', 'Login Successfully')
        loginValidation.resetForm()
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
            }}
            onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
              e.preventDefault()
              loginValidation.handleSubmit()
            }}>
            <FormControl
              sx={{
                marginTop: '24px',
                marginBottom: '0px',
              }}>
              <InputTextField
                id="email"
                name="email"
                label="Email"
                type="email"
                value={loginValidation.values.email}
                onChange={loginValidation.handleChange}
                onBlur={loginValidation.handleBlur}
                error={
                  (loginValidation.touched.email ?? false) &&
                  Boolean(loginValidation.errors.email)
                }
                helperText={
                  (loginValidation.touched.email ?? false) &&
                  loginValidation.errors.email
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
                value={loginValidation.values.password}
                onChange={loginValidation.handleChange}
                onBlur={loginValidation.handleBlur}
                error={
                  (loginValidation.touched.password ?? false) &&
                  Boolean(loginValidation.errors.password)
                }
                helperText={
                  (loginValidation.touched.password ?? false) &&
                  loginValidation.errors.password
                }
              />
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
                Sign in
              </Button>
            </Stack>
            <Typography
              sx={{
                fontSize: '15px',
                lineHeight: '1.25',
                color: 'rgba(0,0,0,0.9)',
                marginTop: '8px',
                fontWeight: '500',
                position: 'relative',
                left: '9px',
                textAlign: 'center',
              }}>
              New to LinkdeIn?
              <Link
                href="/signup"
                style={{color: '#0073b1', textDecoration: 'none'}}>
                &nbsp;Signup
              </Link>
            </Typography>
          </Box>
        </Container>
      </Box>
    </GuestLayout>
  )
}

export default LoginPage
