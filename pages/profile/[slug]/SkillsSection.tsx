import {Box, Typography} from '@mui/material'
import React from 'react'

interface SkillsSectionProps {
  skillsDetails?: string[]
}
function SkillsSection({skillsDetails}: SkillsSectionProps): React.JSX.Element {
  return (
    <Box
      sx={{
        margin: '0 0 .8rem',
        background: '#fff',
        borderRadius: '0.4rem',
        padding: '0.4rem',
        pb: '1.3rem',
      }}>
      <Box
        sx={{
          minHeight: '36px',
          marginLeft: '1rem',
          marginRight: '1rem',
          paddingTop: '0.5rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
        className="content_feed_header">
        <Box component="span" sx={{fontSize: '1rem', fontWeight: '550'}}>
          Skills
        </Box>
      </Box>
      {skillsDetails != null && skillsDetails?.length > 0 ? (
        skillsDetails?.map((data: string, i) => {
          return (
            <Box
              key={i}
              sx={{
                flexWrap: 'nowrap',
                padding: '1.2rem 1rem 0',
                display: 'flex',
                alignItems: 'center',
              }}>
              <Box
                sx={{
                  display: 'flex',
                  paddingBottom: '0.8rem',
                  flexGrow: '1',
                  overflow: 'hidden',
                  borderBottom: '1px solid rgb(140 140 140/.2)',
                }}>
                <Box
                  className="content_feed_name"
                  sx={{
                    flexGrow: '1',
                    overflow: 'hidden',
                  }}>
                  <Typography
                    component="span"
                    sx={{
                      color: 'rgb(0 0 0/0.8)',
                      fontWeight: '550',
                      fontSize: '13px',
                    }}>
                    {data}
                  </Typography>
                </Box>
              </Box>
            </Box>
          )
        })
      ) : (
        <>
          <Box
            sx={{
              flexWrap: 'nowrap',
              padding: '1.2rem 1rem 0',
              display: 'flex',
              alignItems: 'center',
            }}>
            <Box
              sx={{
                display: 'flex',
                paddingBottom: '0.8rem',
                flexGrow: '1',
                overflow: 'hidden',
                borderBottom: '1px solid rgb(140 140 140/.2)',
              }}>
              <Box
                className="content_feed_name"
                sx={{
                  flexGrow: '1',
                  overflow: 'hidden',
                }}>
                <Typography
                  component="span"
                  sx={{
                    color: 'rgb(0 0 0/0.8)',
                    fontWeight: '550',
                    fontSize: '13px',
                  }}>
                  Data Structure & Algorithms
                </Typography>
              </Box>
            </Box>
          </Box>
          <Box
            sx={{
              flexWrap: 'nowrap',
              padding: '1.2rem 1rem 0',
              display: 'flex',
              alignItems: 'center',
            }}>
            <Box
              sx={{
                display: 'flex',
                paddingBottom: '0.8rem',
                flexGrow: '1',
                overflow: 'hidden',
                borderBottom: '1px solid rgb(140 140 140/.2)',
              }}>
              <Box
                className="content_feed_name"
                sx={{
                  flexGrow: '1',
                  overflow: 'hidden',
                }}>
                <Typography
                  component="span"
                  sx={{
                    color: 'rgb(0 0 0/0.8)',
                    fontWeight: '550',
                    fontSize: '13px',
                  }}>
                  Javascript
                </Typography>
              </Box>
            </Box>
          </Box>
          <Box
            sx={{
              flexWrap: 'nowrap',
              padding: '1.2rem 1rem 0',
              display: 'flex',
              alignItems: 'center',
            }}>
            <Box
              sx={{
                display: 'flex',
                paddingBottom: '0.8rem',
                flexGrow: '1',
                overflow: 'hidden',
                borderBottom: '1px solid rgb(140 140 140/.2)',
              }}>
              <Box
                className="content_feed_name"
                sx={{
                  flexGrow: '1',
                  overflow: 'hidden',
                }}>
                <Typography
                  component="span"
                  sx={{
                    color: 'rgb(0 0 0/0.8)',
                    fontWeight: '550',
                    fontSize: '13px',
                  }}>
                  ReactJs
                </Typography>
              </Box>
            </Box>
          </Box>
          <Box
            sx={{
              flexWrap: 'nowrap',
              padding: '1.2rem 1rem 0',
              display: 'flex',
              alignItems: 'center',
            }}>
            <Box
              sx={{
                display: 'flex',
                paddingBottom: '0.8rem',
                flexGrow: '1',
                overflow: 'hidden',
                borderBottom: '1px solid rgb(140 140 140/.2)',
              }}>
              <Box
                className="content_feed_name"
                sx={{
                  flexGrow: '1',
                  overflow: 'hidden',
                }}>
                <Typography
                  component="span"
                  sx={{
                    color: 'rgb(0 0 0/0.8)',
                    fontWeight: '550',
                    fontSize: '13px',
                  }}>
                  NodeJs
                </Typography>
              </Box>
            </Box>
          </Box>
        </>
      )}
    </Box>
  )
}

export default SkillsSection
