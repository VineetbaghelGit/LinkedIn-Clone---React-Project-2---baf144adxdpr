/* eslint-disable max-len */
import React from 'react'
import {
  Box,
  Container,
  Divider,
  Fab,
  Grid,
  List,
  ListItem,
  ListItemText,
  Paper,
  TextField,
} from '@mui/material'
import AuthLayout from '@/components/appLayouts/AuthLayout'
import SendIcon from '@mui/icons-material/Send'
const Chat = (): React.JSX.Element => {
  return (
    <AuthLayout>
      <Container>
        <Box sx={{margin: '0px 30px'}} className="premium_page">
          <Grid
            container
            component={Paper}
            style={{width: '100%', height: '80vh', display: 'flex'}}>
            <Grid item xs={12}>
              <List style={{height: '65vh', overflowY: 'auto'}}>
                <ListItem key="1">
                  <Grid container>
                    <Grid item xs={12}>
                      <ListItemText
                        sx={{textAlign: 'right'}}
                        primary="Hey man, What's up ?"></ListItemText>
                    </Grid>
                    <Grid item xs={12}>
                      <ListItemText
                        sx={{textAlign: 'right'}}
                        secondary="09:30"></ListItemText>
                    </Grid>
                  </Grid>
                </ListItem>
                <ListItem key="2">
                  <Grid container>
                    <Grid item xs={12}>
                      <ListItemText
                        sx={{textAlign: 'left'}}
                        primary="Hey, I am Good! What about you ?"></ListItemText>
                    </Grid>
                    <Grid item xs={12}>
                      <ListItemText
                        sx={{textAlign: 'left'}}
                        secondary="09:31"></ListItemText>
                    </Grid>
                  </Grid>
                </ListItem>
                <ListItem key="3">
                  <Grid container>
                    <Grid item xs={12}>
                      <ListItemText
                        sx={{textAlign: 'right'}}
                        primary="Cool. I am good, let's catch up!"></ListItemText>
                    </Grid>
                    <Grid item xs={12}>
                      <ListItemText
                        sx={{textAlign: 'right'}}
                        secondary="10:30"></ListItemText>
                    </Grid>
                  </Grid>
                </ListItem>
              </List>
              <Divider />
              <Grid container style={{padding: '20px'}}>
                <Grid item xs={11}>
                  <TextField
                    id="outlined-basic-email"
                    label="Type Something"
                    fullWidth
                  />
                </Grid>
                <Grid xs={1} sx={{textAlign: 'right'}}>
                  <Fab color="primary" aria-label="add">
                    <SendIcon />
                  </Fab>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </AuthLayout>
  )
}

export default Chat
