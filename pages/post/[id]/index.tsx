/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable max-len */
import AuthLayout from '@/components/appLayouts/AuthLayout'
import {Box, Container, Grid} from '@mui/material'
import React, {useEffect, useState} from 'react'
import PremiumCard from '../../components/RightAside/PremiumCard'
import MenuOptions from '../../components/RightAside/MenuOptions'
import {useParams} from 'next/navigation'
import ApiUtils from '@/components/apis/ApiUtils'
import SingleMainContent from '../../components/SinglePostFeed/SingleMainContent'
import {ToasterMessage} from '@/components/helpers/ToastMessage'
import LeftSideSinglePost from '../../components/SinglePostFeed/LeftSideSinglePost'

function SinglePost(): React.JSX.Element {
  const id = useParams()
  const [feedContent, setFeedContent] = useState<any>(null)
  console.log('🚀 ~ SinglePost ~ feedContent:', feedContent)
  async function fetchPostById(postId: string): Promise<void> {
    try {
      const response: any = await ApiUtils.postById(`/${postId}`)
      setFeedContent(response.data)
    } catch (err: any) {
      ToasterMessage('error', err?.response?.data.message)
    }
  }
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    if (id) {
      void fetchPostById(id.id as string)
    }
  }, [id])
  return (
    <AuthLayout>
      <Container>
        <Box sx={{margin: '0px 30px'}}>
          <Grid container={true}>
            <Grid item={true} xs={12} sm={4} md={3}>
              <Box sx={{padding: '0px 10px'}}>
                <LeftSideSinglePost content={feedContent} />
              </Box>
            </Grid>
            <Grid item={true} xs={12} sm={8} md={6}>
              <Box sx={{padding: '0px 10px'}}>
                {feedContent != null && (
                  <SingleMainContent content={feedContent} />
                )}
              </Box>
            </Grid>
            <Grid item={true} sm={12} md={3}>
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

export default SinglePost
