/* eslint-disable prettier/prettier */
import * as React from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import {Container} from '@mui/material'
import Image from 'next/image'
import logoLinkedin from '@/components/images/LinkedIn_logo.svg'

function GuestHeader(): React.JSX.Element {
  return (
    <Box className="guest_header" sx={{flexGrow: 1}}>
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar>
            <Image
              src={logoLinkedin}
              width={100}
              height={100}
              alt="linkedin-logo"
            />
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  )
}

export default GuestHeader
