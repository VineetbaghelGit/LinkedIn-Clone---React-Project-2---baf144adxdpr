import React from 'react'
import AuthLayout from '../appLayouts/AuthLayout'
import {Box, Container, Grid} from '@mui/material'
import LeftAside from './components/LeftAside/LeftAside'
import MainFeed from './components/MainFeed/MainFeed'
import PremiumCard from './components/RightAside/PremiumCard'
import MenuOptions from './components/RightAside/MenuOptions'

function PageHome(): React.JSX.Element {
  return (
    <AuthLayout>
      <Container>
        <Box sx={{margin: '0px 30px'}}>
          <Grid container={true}>
            <Grid item={true} xs={12} sm={4} md={3}>
              <Box sx={{padding: '0px 10px'}}>
                <LeftAside />
              </Box>
            </Grid>
            <Grid item={true} xs={12} sm={8} md={6}>
              <Box sx={{padding: '0px 10px'}}>
                <MainFeed />
              </Box>
            </Grid>
            <Grid item={true} sm={3} md={3}>
              <Box sx={{padding: '0px 10px', position: 'sticky', top: '80px'}}>
                <PremiumCard />
                <MenuOptions />
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </AuthLayout>
  )
}

export default PageHome
