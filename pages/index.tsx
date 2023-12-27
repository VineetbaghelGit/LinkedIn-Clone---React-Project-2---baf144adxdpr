import React from 'react'
import AuthLayout from '../layouts/AuthLayout'
import {Box, Container, Grid} from '@mui/material'
import LeftAside from './components/LeftAside/LeftAside'
import MainFeed from './components/MainFeed/MainFeed'

function PageHome(): React.JSX.Element {
  return (
    <AuthLayout>
      <Container>
        <Box sx={{margin: '0px 30px'}}>
          <Grid container={true}>
            <Grid item={true} md={3}>
              <Box sx={{padding: '0px 10px'}}>
                <LeftAside />
              </Box>
            </Grid>
            <Grid item={true} md={6}>
              <Box sx={{padding: '0px 10px'}}>
                <MainFeed />
              </Box>
            </Grid>
            <Grid item={true} md={3}>
              <Box sx={{padding: '0px 10px'}}>Hello</Box>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </AuthLayout>
  )
}

export default PageHome
