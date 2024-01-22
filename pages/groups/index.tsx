import AuthLayout from '@/components/appLayouts/AuthLayout'
import {Box, Container, Grid} from '@mui/material'
import React from 'react'
import GroupsList from './GroupsList'

function Groups(): React.JSX.Element {
  return (
    <AuthLayout>
      <Container>
        <Box sx={{margin: '0px 30px'}}>
          <Grid container={true}>
            <Grid item={true} xs={12} md={9}>
              <Box sx={{padding: '0px 10px'}}>
                <GroupsList />
              </Box>
            </Grid>
            <Grid item={true} xs={12} md={3}>
              <Box sx={{padding: '0px 10px'}}>
                {/* <LeftAside /> */}
                Grousp
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </AuthLayout>
  )
}

export default Groups
