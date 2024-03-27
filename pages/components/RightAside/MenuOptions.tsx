/* eslint-disable quote-props */
import {Box, Typography} from '@mui/material'
import Image from 'next/image'
import React from 'react'
import logoLinkedin from '@/components/images/LinkedIn_logo.svg'

function MenuOptions(): React.JSX.Element {
  return (
    <Box
      sx={{
        margin: '0 0 .8rem',
        borderRadius: '0.4rem',
      }}>
      <Box
        sx={{
          padding: '0.8rem',
          display: 'flex',
          justifyContent: 'space-evenly',
          flexWrap: 'wrap',
          gap: '12px',
        }}>
        <Typography
          component="a"
          sx={{
            cursor: 'not-allowed',

            fontSize: '12px',
            fontWeight: '500',
            color: '#ACACAC',
            '&:hover': {
              color: '#1976D2',
              textDecoration: 'underline',
            },
          }}>
          About
        </Typography>
        <Typography
          component="a"
          sx={{
            cursor: 'not-allowed',

            fontSize: '12px',
            fontWeight: '500',
            color: '#ACACAC',
            '&:hover': {
              color: '#1976D2',
              textDecoration: 'underline',
            },
          }}>
          Accessibility
        </Typography>
        <Typography
          component="a"
          sx={{
            cursor: 'not-allowed',

            fontSize: '12px',
            fontWeight: '500',
            color: '#ACACAC',
            '&:hover': {
              color: '#1976D2',
              textDecoration: 'underline',
            },
          }}>
          Help center
        </Typography>
        <Typography
          component="a"
          sx={{
            cursor: 'not-allowed',

            fontSize: '12px',
            fontWeight: '500',
            color: '#ACACAC',
            '&:hover': {
              color: '#1976D2',
              textDecoration: 'underline',
            },
          }}>
          Privacy & Terms
        </Typography>
        <Typography
          component="a"
          sx={{
            cursor: 'not-allowed',

            fontSize: '12px',
            fontWeight: '500',
            color: '#ACACAC',
            '&:hover': {
              color: '#1976D2',
              textDecoration: 'underline',
            },
          }}>
          Ad choices
        </Typography>
        <Typography
          component="a"
          sx={{
            cursor: 'not-allowed',

            fontSize: '12px',
            fontWeight: '500',
            color: '#ACACAC',
            '&:hover': {
              color: '#1976D2',
              textDecoration: 'underline',
            },
          }}>
          Advertising
        </Typography>
        <Typography
          component="a"
          sx={{
            cursor: 'not-allowed',

            fontSize: '12px',
            fontWeight: '500',
            color: '#ACACAC',
            '&:hover': {
              color: '#1976D2',
              textDecoration: 'underline',
            },
          }}>
          Business Services
        </Typography>
        <Typography
          component="a"
          sx={{
            cursor: 'not-allowed',

            fontSize: '12px',
            fontWeight: '500',
            color: '#ACACAC',
            '&:hover': {
              color: '#1976D2',
              textDecoration: 'underline',
            },
          }}>
          Get the LinkedIn app
        </Typography>
        <Typography
          component="a"
          sx={{
            cursor: 'not-allowed',

            fontSize: '12px',
            fontWeight: '500',
            color: '#ACACAC',
            '&:hover': {
              color: '#1976D2',
              textDecoration: 'underline',
            },
          }}>
          More
        </Typography>
      </Box>
      <Box
        sx={{
          padding: '0.8rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-evenly',
        }}>
        <Image src={logoLinkedin} width={55} height={30} alt="linkedin_logo" />
        <Typography
          component="p"
          sx={{
            fontSize: '11px',
            color: 'rgb(0 0 0/.9)',
          }}>
          LinkedIn Corporation © 2024
        </Typography>
      </Box>
    </Box>
  )
}

export default MenuOptions
