/* eslint-disable quote-props */
import React from 'react'
import MenuOptions from '../../components/RightAside/MenuOptions'
import PremiumCard from '../../components/RightAside/PremiumCard'
import {Box, Typography} from '@mui/material'
import {usePathname} from 'next/navigation'

function ProfileRightSide(): React.JSX.Element {
  const pathname = usePathname()
  return (
    <>
      <Box
        sx={{
          margin: '0 0 .8rem',
          borderRadius: '0.4rem',
          background: '#fff',
        }}>
        <Box
          sx={{
            flexWrap: 'nowrap',
            padding: '1.2rem 1rem 0',
          }}>
          <Box
            sx={{
              paddingBottom: '0.8rem',
              flexGrow: '1',
              overflow: 'hidden',
            }}>
            <Box
              className="content_feed_name"
              sx={{
                flexGrow: '1',
                overflow: 'hidden',
                borderBottom: '1px solid rgb(140 140 140/.2)',
                pb: '0.5rem',
              }}>
              <Typography
                component="span"
                sx={{
                  color: 'rgb(0 0 0/0.8)',
                  fontWeight: '550',
                  fontSize: '15px',
                }}>
                Profile language
              </Typography>
              <Typography
                component="p"
                sx={{
                  color: 'rgb(0 0 0/0.5)',
                  fontWeight: '500',
                  fontSize: '12px',
                }}>
                English
              </Typography>
            </Box>
            <Box
              className="content_feed_name"
              sx={{
                flexGrow: '1',
                overflow: 'hidden',
                borderBottom: '1px solid rgb(140 140 140/.2)',
                pb: '0.5rem',
                mt: '0.5rem',
              }}>
              <Typography
                component="span"
                sx={{
                  color: 'rgb(0 0 0/0.8)',
                  fontWeight: '550',
                  fontSize: '15px',
                }}>
                Public profile & URL
              </Typography>
              <Typography
                component="p"
                sx={{
                  color: 'rgb(0 0 0/0.5)',
                  fontWeight: '500',
                  fontSize: '12px',
                }}>
                https://linked-in-clone-react-project-2-baf144adxdpr-kex4.vercel.app
                {pathname}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>

      <PremiumCard />
      <MenuOptions />
    </>
  )
}

export default ProfileRightSide
