import AuthLayout from '@/components/appLayouts/AuthLayout'
import {Box, Button, Container, Grid, Typography} from '@mui/material'
import Image from 'next/image'
import React from 'react'
import LinkdeinLearning from '@/components/images/linkedin_learning.jpg'
import LinkedinInmails from '@/components/images/linkedin_inmails.jpg'
import LinkedinOpportunity from '@/components/images/linkedin_opportunity.jpg'
import Link from 'next/link'

function GoPremium(): React.JSX.Element {
  return (
    <AuthLayout>
      <Container>
        <Box sx={{margin: '0px 30px'}} className="premium_page">
          <Box
            sx={{
              padding: '30px 80px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              pb: '15px',
            }}>
            <Typography
              component="p"
              sx={{
                fontWeight: '550',
                fontSize: '1.2rem',
                textAlign: 'center',
                lineHeight: '1.45',
              }}>
              Get hired 2x faster on average{' '}
              <Typography
                component="span"
                sx={{
                  fontWeight: '500',
                  fontSize: '1.2rem',
                  color: 'rgb(0 0 0/.7)',
                }}>
                by discovering over 20 million open jobs and exploring valuable
                resource to help with your search.
              </Typography>{' '}
            </Typography>
            <Link href="/coming-soon">
              <Button
                variant="outlined"
                sx={{
                  margin: '1rem 0',
                  height: '34px',
                  overflow: 'hidden',
                  padding: '10px',
                  fontSize: '12px',
                  color: '#0a66c2',
                  mb: '0px',
                }}>
                TRY NOW
              </Button>
            </Link>
          </Box>
          <Box sx={{my: '10px'}}>
            <Box
              sx={{
                margin: '0 0 .8rem',
                borderRadius: '0.4rem',
              }}>
              <Grid container={true}>
                <Grid item={true} xs={12} md={4} sm={6}>
                  <Box
                    sx={{
                      display: 'flex',
                      flexWrap: 'nowrap',
                      padding: '1.2rem',
                      flexDirection: 'column',
                      alignItems: 'center',
                      borderRadius: '0.4rem',
                      background: '#fff',
                      mx: '5px',
                    }}>
                    <Typography
                      component="h2"
                      sx={{
                        fontWeight: '550',
                        color: 'rgb(0 0 0/0.7)',
                        textAlign: 'center',
                      }}>
                      InMail Credits
                    </Typography>
                    <Image
                      alt="linkedin_learning"
                      src={LinkedinInmails}
                      width={500}
                      height={200}
                      layout="responsive"
                      style={{objectFit: 'contain', margin: '15px 0px'}}
                    />
                    <Typography
                      component="h2"
                      sx={{
                        fontWeight: '550',
                        color: 'rgb(0 0 0/0.6)',
                        textAlign: 'center',
                        my: '10px',
                      }}>
                      Connect with hiring managers
                    </Typography>
                    <Typography
                      component="span"
                      sx={{
                        fontWeight: '550',
                        fontSize: '13px',
                        color: 'rgb(0 0 0/.5)',
                        textAlign: 'center',
                      }}>
                      Show your interest in an open role with InMail. It's 2.6x
                      more effective than emails alone.
                    </Typography>{' '}
                  </Box>
                </Grid>
                <Grid item={true} xs={12} md={4} sm={6}>
                  <Box
                    sx={{
                      display: 'flex',
                      flexWrap: 'nowrap',
                      padding: '1.2rem',
                      flexDirection: 'column',
                      alignItems: 'center',
                      mx: '5px',
                      borderRadius: '0.4rem',
                      background: '#fff',
                    }}>
                    <Typography
                      component="h2"
                      sx={{
                        fontWeight: '550',
                        color: 'rgb(0 0 0/0.7)',
                        textAlign: 'center',
                      }}>
                      Who's Viewed Your Profile
                    </Typography>
                    <Image
                      alt="linkedin_learning"
                      src={LinkedinOpportunity}
                      width={500}
                      height={200}
                      layout="responsive"
                      style={{objectFit: 'contain', margin: '15px 0px'}}
                    />
                    <Typography
                      component="h2"
                      sx={{
                        fontWeight: '550',
                        color: 'rgb(0 0 0/0.6)',
                        textAlign: 'center',
                        my: '10px',
                      }}>
                      Turn views into opportunities
                    </Typography>
                    <Typography
                      component="span"
                      sx={{
                        fontWeight: '550',
                        fontSize: '13px',
                        color: 'rgb(0 0 0/.5)',
                        textAlign: 'center',
                      }}>
                      See who's viewed your profile over the last 90 days, and
                      who looks next.
                    </Typography>{' '}
                  </Box>
                </Grid>
                <Grid item={true} xs={12} md={4} sm={6}>
                  <Box
                    sx={{
                      display: 'flex',
                      flexWrap: 'nowrap',
                      padding: '1.2rem',
                      mx: '5px',
                      flexDirection: 'column',
                      alignItems: 'center',
                      borderRadius: '0.4rem',
                      background: '#fff',
                    }}>
                    <Typography
                      component="h2"
                      sx={{
                        fontWeight: '550',
                        color: 'rgb(0 0 0/0.7)',
                        textAlign: 'center',
                      }}>
                      LinkedIn Learning Courses
                    </Typography>
                    <Image
                      alt="linkedin_learning"
                      src={LinkdeinLearning}
                      width={500}
                      height={200}
                      layout="responsive"
                      style={{objectFit: 'contain', margin: '15px 0px'}}
                    />
                    <Typography
                      component="h2"
                      sx={{
                        fontWeight: '550',
                        color: 'rgb(0 0 0/0.6)',
                        textAlign: 'center',
                        my: '10px',
                      }}>
                      Sharpen your skills
                    </Typography>
                    <Typography
                      component="span"
                      sx={{
                        fontWeight: '550',
                        fontSize: '13px',
                        color: 'rgb(0 0 0/.5)',
                        textAlign: 'center',
                      }}>
                      Hone your skills or try something new - access over 15000
                      expert-led LinkedIn Learning Courses
                    </Typography>{' '}
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Box>
      </Container>
    </AuthLayout>
  )
}

export default GoPremium
