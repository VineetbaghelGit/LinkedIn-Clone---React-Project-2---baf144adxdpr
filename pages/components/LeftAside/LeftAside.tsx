/* eslint-disable quote-props */
import {Box, Divider, Stack, Typography} from '@mui/material'
import Image from 'next/image'
import Link from '@mui/material/Link'
import React from 'react'
import ProfileImage from '../../../images/linkedin_profile.jpg'
function LeftAside(): React.JSX.Element {
  return (
    <>
      <Stack
        sx={{
          marginBottom: '0.8rem',
          boxShadow: '0px 0px 0px 1px rgb(140 140 140/.2)',
          border: 'none',
          position: 'relative',
          borderRadius: '0.4rem',
          background: '#fff',
        }}>
        <Box sx={{padding: '1.2rem 1.2rem 1.6rem'}}>
          <Box className="bg_linkedin_main"></Box>
          <Link href="/profile" style={{textDecoration: 'none'}}>
            <Box sx={{display: 'flex', justifyContent: 'center'}}>
              <Image
                className="member_photo"
                src={ProfileImage}
                width={64}
                height={64}
                alt="profile_image"
              />
            </Box>
            <Box
              sx={{
                color: 'rgb(0 0 0/.9)',
                fontSize: '15px',
                lineHeight: '1.5',
                textAlign: 'center',
              }}>
              Vineet Baghel
            </Box>
            <Typography
              sx={{
                fontSize: '12px',
                lineHeight: '1.4',
                color: 'rgb(0 0 0/.6)',
                marginTop: '0.4rem',
                textAlign: 'center',
              }}>
              Frontend Developer at TecMantras Solutions{' '}
            </Typography>
          </Link>
        </Box>
        <Divider light={true} />
        <Box sx={{padding: '1rem 0'}}>
          <Typography
            sx={{
              fontSize: '12px',
              padding: '.3rem 1.2rem',
              cursor: 'pointer',
              ':hover': {
                background: 'rgba(0,0,0,0.08)',
              },
            }}>
            <Link
              href="#"
              underline="none"
              sx={{
                color: 'gray',
                display: 'flex',
                justifyContent: 'space-between',
              }}>
              <span>Profile viewers</span>
              <span style={{color: '#0a66c2', fontWeight: '550'}}>24</span>{' '}
            </Link>
          </Typography>
          <Typography
            sx={{
              fontSize: '12px',
              padding: '.3rem 1.2rem',
              cursor: 'pointer',
              ':hover': {
                background: 'rgba(0,0,0,0.08)',
              },
            }}>
            <Link
              href="#"
              underline="none"
              sx={{
                color: 'gray',
                display: 'flex',
                justifyContent: 'space-between',
              }}>
              <span>Post impressions</span>
              <span style={{color: '#0a66c2', fontWeight: '550'}}>24</span>
            </Link>
          </Typography>
        </Box>
        <Divider light={true} />
        <Box sx={{padding: '0.6rem 0'}}>
          <Typography
            sx={{
              fontSize: '12px',
              padding: '.3rem 1.2rem',
              cursor: 'pointer',
              ':hover': {
                background: 'transparent',
              },
            }}>
            <Link
              href="#"
              sx={{
                color: 'rgb(0 0 0/.9)',
              }}
              underline="none">
              <span>Try Premium for ₹0</span>
            </Link>
          </Typography>
        </Box>
      </Stack>

      <Stack
        sx={{
          marginBottom: '0.8rem',
          boxShadow: '0px 0px 0px 1px rgb(140 140 140/.2)',
          border: 'none',
          position: 'relative',
          borderRadius: '0.4rem',
          background: '#fff',
        }}>
        <Typography
          component="h4"
          sx={{
            fontSize: '15px',
            padding: '0.7rem 1.2rem!important',
            color: 'rgb(0 0 0/.9)',
          }}>
          My Pages (2)
        </Typography>
        <Box className="page_item">
          <Box sx={{display: 'flex', marginTop: '10px'}}>
            <Link sx={{padding: '0.1rem 0rem 1.1rem 1.1rem'}}>
              <Image src={ProfileImage} width={32} height={32} alt="image" />
            </Link>
            <Box
              sx={{
                marginLeft: '0.8rem',
                marginTop: '0.1rem',
              }}
              className="page_desc">
              <Typography
                component="h4"
                sx={{
                  fontSize: '15px',
                  color: 'rgb(0 0 0/.9)',
                }}>
                LinkRick
              </Typography>
              <Typography
                sx={{
                  fontSize: '12px',
                  marginTop: '4px',
                }}>
                <Link
                  href="#"
                  underline="none"
                  sx={{
                    color: 'gray',
                    display: 'flex',
                    justifyContent: 'space-between',
                    gap: '10px',
                  }}>
                  <span>Post impressions</span>
                  <span style={{color: '#0a66c2', fontWeight: '550'}}>24</span>
                </Link>
              </Typography>
            </Box>
          </Box>
          <Divider light={true} />

          <Box sx={{display: 'flex', marginTop: '10px'}}>
            <Link sx={{padding: '0.1rem 0rem 1.1rem 1.1rem'}}>
              <Image src={ProfileImage} width={32} height={32} alt="image" />
            </Link>
            <Box
              sx={{
                marginLeft: '0.8rem',
              }}
              className="page_desc">
              <Typography
                component="h4"
                sx={{
                  fontSize: '15px',
                  color: 'rgb(0 0 0/.9)',
                }}>
                LinkRick
              </Typography>
              <Typography
                sx={{
                  fontSize: '12px',
                  marginTop: '4px',
                }}>
                <Link
                  href="#"
                  underline="none"
                  sx={{
                    color: 'gray',
                    display: 'flex',
                    justifyContent: 'space-between',
                    gap: '10px',
                  }}>
                  <span>Post impressions</span>
                  <span style={{color: '#0a66c2', fontWeight: '550'}}>24</span>
                </Link>
              </Typography>
            </Box>
          </Box>
        </Box>
      </Stack>
    </>
  )
}

export default LeftAside
