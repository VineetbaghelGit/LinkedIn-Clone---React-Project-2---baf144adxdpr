/* eslint-disable operator-linebreak */
import {Box, Typography} from '@mui/material'
import React from 'react'
import DefaultPlaceholderImg from '@/components/images/default-placeholder.jpg'
import Image from 'next/image'
import {type WorkExperienceType} from '@/components/utils/TypeConfig'
import {monthYearFomatter} from '@/components/helpers/MonthYearFormat'
interface ExperienceSectionProps {
  workingDetails?: WorkExperienceType[]
}
function ExperienceSection({
  workingDetails,
}: ExperienceSectionProps): React.JSX.Element {
  return (
    <Box
      sx={{
        margin: '0 0 .8rem',
        background: '#fff',
        borderRadius: '0.4rem',
        padding: '0.4rem',
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
          Experience
        </Box>
      </Box>
      {workingDetails != null && workingDetails?.length > 0 ? (
        workingDetails?.map((data: WorkExperienceType) => {
          return (
            <Box
              key={data._id}
              sx={{
                flexWrap: 'nowrap',
                padding: '1.2rem 1rem 0',
                marginBottom: '0.8rem',
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
                <Box className="border_radius-50">
                  <Image
                    src={DefaultPlaceholderImg}
                    height={48}
                    width={48}
                    alt="user_profile"
                  />
                </Box>
                <Box
                  className="content_feed_name"
                  sx={{
                    flexGrow: '1',
                    marginLeft: '0.8rem',
                    overflow: 'hidden',
                  }}>
                  <Typography
                    component="span"
                    sx={{
                      color: 'rgb(0 0 0/0.8)',
                      fontWeight: '550',
                      fontSize: '15px',
                    }}>
                    {data != null ? data?.designation : 'Full Stack Developer'}
                  </Typography>
                  <Typography
                    component="span"
                    sx={{
                      display: 'block',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      fontSize: '12px',
                      color: 'rgb(0 0 0/.8)',
                      whiteSpace: 'nowrap',
                      mt: '1px',
                    }}>
                    {data != null
                      ? `${data?.companyName} · Full-time`
                      : 'Adobe Oraganization · Full-time'}
                  </Typography>
                  <Typography
                    component="span"
                    sx={{
                      display: 'block',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      color: 'rgb(0 0 0/.6)',
                      mt: '1px',
                      whiteSpace: 'nowrap',
                      fontSize: '12px',
                    }}>
                    {data != null
                      ? monthYearFomatter(data?.startDate) +
                        ' - ' +
                        monthYearFomatter(data?.endDate)
                      : 'Oct 2020 - Sept 2023'}
                  </Typography>
                  <Typography
                    component="span"
                    sx={{
                      display: 'block',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      color: 'rgb(0 0 0/.8)',
                      mt: '1px',
                      whiteSpace: 'nowrap',
                      fontSize: '12px',
                    }}>
                    {data != null ? data?.location : 'Mumbai, Maharashtra'}
                  </Typography>
                </Box>
              </Box>
            </Box>
          )
        })
      ) : (
        <Box
          sx={{
            flexWrap: 'nowrap',
            padding: '1.2rem 1rem 0',
            marginBottom: '0.8rem',
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
            <Box className="border_radius-50">
              <Image
                src={DefaultPlaceholderImg}
                height={48}
                width={48}
                alt="user_profile"
              />
            </Box>
            <Box
              className="content_feed_name"
              sx={{
                flexGrow: '1',
                marginLeft: '0.8rem',
                overflow: 'hidden',
              }}>
              <Typography
                component="span"
                sx={{
                  color: 'rgb(0 0 0/0.8)',
                  fontWeight: '550',
                  fontSize: '15px',
                }}>
                Full Stack Developer
              </Typography>
              <Typography
                component="span"
                sx={{
                  display: 'block',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  fontSize: '12px',
                  color: 'rgb(0 0 0/.8)',
                  whiteSpace: 'nowrap',
                  mt: '1px',
                }}>
                Adobe Oraganization · Full-time
              </Typography>
              <Typography
                component="span"
                sx={{
                  display: 'block',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  color: 'rgb(0 0 0/.6)',
                  mt: '1px',
                  whiteSpace: 'nowrap',
                  fontSize: '12px',
                }}>
                Oct 2020 - Sept 2023
              </Typography>
              <Typography
                component="span"
                sx={{
                  display: 'block',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  color: 'rgb(0 0 0/.8)',
                  mt: '1px',
                  whiteSpace: 'nowrap',
                  fontSize: '12px',
                }}>
                Mumbai, Maharashtra
              </Typography>
            </Box>
          </Box>
        </Box>
      )}
    </Box>
  )
}

export default ExperienceSection
