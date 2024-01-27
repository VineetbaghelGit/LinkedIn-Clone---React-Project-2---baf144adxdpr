import AuthLayout from '@/components/appLayouts/AuthLayout'
import {Box, Container, Grid} from '@mui/material'
import React from 'react'
import ProfileLeftAside from './ProfileLeftAside'

function Profile(): React.JSX.Element {
  return (
    <AuthLayout>
      <Container>
        <Box sx={{margin: '0px 30px'}}>
          <Grid container={true}>
            <Grid item={true} xs={12} md={9}>
              <ProfileLeftAside />
            </Grid>
            <Grid item={true} xs={12} md={3}>
              vinet
            </Grid>
          </Grid>
        </Box>
      </Container>
    </AuthLayout>
  )
}

export default Profile
