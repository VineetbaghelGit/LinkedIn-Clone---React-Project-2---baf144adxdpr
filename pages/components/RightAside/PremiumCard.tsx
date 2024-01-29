import {Box, Button, Typography} from '@mui/material'
import Image from 'next/image'
import React from 'react'
import DefaultUserImg from '@/components/images/default_user_placeholder.jpg'
import LinkdeinPremiumLogo from '@/components/images/linkedin_premium_logo.jpg'
import {LoggedInUserDetails} from '@/components/utils/SelectorConfig'
import Link from 'next/link'
function PremiumCard(): React.JSX.Element {
  const userDetails = LoggedInUserDetails()

  return (
    <Box
      sx={{
        margin: '0 0 .8rem',
        background: '#fff',
        borderRadius: '0.4rem',
      }}>
      <Box sx={{padding: '0.8rem'}}>
        <Typography
          component="p"
          sx={{
            fontSize: '11px',
            color: 'rgb(0 0 0/.6)',
            mt: '6px',
            textAlign: 'center',
          }}>
          {userDetails?.name?.split(' ')[0]}, uncover new Opportunities with
          LinkedIn Premium
        </Typography>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-evenly',
            my: '10px',
          }}>
          <Box className="border_radius-50">
            <Image
              src={DefaultUserImg}
              height={65}
              width={65}
              alt="user_profile"
            />
          </Box>
          <Box>
            <Image
              src={LinkdeinPremiumLogo}
              height={65}
              width={65}
              alt="user_profile"
            />
          </Box>
        </Box>
        <Typography
          component="p"
          sx={{
            fontSize: '14px',
            color: 'rgb(0 0 0/.7)',
            mt: '6px',
            textAlign: 'center',
          }}>
          Get ahead in 2024 with new Premium features{' '}
        </Typography>
        <Box sx={{textAlign: 'center', mt: '3px'}}>
          <Link href="/go-premium">
            <Button
              variant="outlined"
              sx={{
                margin: '0.5rem 0',
                height: '34px',
                overflow: 'hidden',
                padding: '10px',
                borderRadius: '28px',
                fontSize: '12px',
                fontWeight: '500',
                color: '#0a66c2',
              }}>
              Try for free !
            </Button>
          </Link>
        </Box>
      </Box>
    </Box>
  )
}

export default PremiumCard
