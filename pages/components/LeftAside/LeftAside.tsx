/* eslint-disable operator-linebreak */
/* eslint-disable indent */
/* eslint-disable quote-props */
import {Box, Divider, Stack, Typography} from '@mui/material'
import Image from 'next/image'
import Link from '@mui/material/Link'
import React from 'react'
import DefaultUserImg from '@/components/images/default_user_placeholder.jpg'
import DefaultPageImg from '@/components/images/my_page_default.svg'

import {LoggedInUserDetails} from '@/components/utils/SelectorConfig'
function LeftAside(): React.JSX.Element {
  const userDetails = LoggedInUserDetails()
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
          <Link
            style={{textDecoration: 'none'}}
            href={`/profile/${userDetails?.name?.replace(
              /\s+/g,
              '-',
            )}-${userDetails?._id}`}>
            {' '}
            <Box sx={{display: 'flex', justifyContent: 'center'}}>
              <Image
                className="member_photo"
                src={userDetails?.profileImage ?? DefaultUserImg}
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
              {userDetails?.name}
            </Box>
            <Typography
              sx={{
                fontSize: '12px',
                lineHeight: '1.4',
                color: 'rgb(0 0 0/.6)',
                marginTop: '0.4rem',
                textAlign: 'center',
              }}>
              {userDetails != null && userDetails?.workExperience?.length > 0
                ? `${userDetails?.workExperience[0]?.companyName}`
                : 'Full Stack Developer at Adobe Oraganiztion'}
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
              href="/coming-soon"
              underline="none"
              sx={{
                color: 'gray',
                display: 'flex',
                cursor: 'not-allowed',
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
              href="/coming-soon"
              underline="none"
              sx={{
                color: 'gray',
                display: 'flex',
                justifyContent: 'space-between',
                cursor: 'not-allowed',
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
              href="/go-premium"
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
              <Image src={DefaultPageImg} width={32} height={32} alt="image" />
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
                Company Page1
              </Typography>
              <Typography
                sx={{
                  fontSize: '12px',
                  marginTop: '4px',
                }}>
                <Link
                  href="/coming-soon"
                  underline="none"
                  sx={{
                    color: 'gray',
                    display: 'flex',
                    cursor: 'not-allowed',
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
              <Image src={DefaultPageImg} width={32} height={32} alt="image" />
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
                Company Page2
              </Typography>
              <Typography
                sx={{
                  fontSize: '12px',
                  marginTop: '4px',
                }}>
                <Link
                  href="/coming-soon"
                  underline="none"
                  sx={{
                    color: 'gray',
                    display: 'flex',
                    justifyContent: 'space-between',
                    cursor: 'not-allowed',
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
