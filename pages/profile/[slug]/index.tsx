import AuthLayout from '@/components/appLayouts/AuthLayout'
import {Box, Container, Grid} from '@mui/material'
import React from 'react'
import ProfileLeftAside from './ProfileLeftAside'
import ProfileRightSide from './ProfileRightSide'

function Profile(): React.JSX.Element {
  return (
    <AuthLayout>
      <Container>
        <Box sx={{margin: '0px 30px'}}>
          <Grid container={true}>
            <Grid item={true} xs={12} md={9}>
              <Box sx={{padding: '0px 10px'}}>
                <ProfileLeftAside />
              </Box>
            </Grid>
            <Grid item={true} xs={12} md={3}>
              <Box sx={{padding: '0px 10px', position: 'sticky', top: '80px'}}>
                <ProfileRightSide />
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </AuthLayout>
  )
}

export default Profile
