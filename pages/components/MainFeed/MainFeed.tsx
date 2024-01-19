import React, {useEffect, useState} from 'react'
import ShareBoxFeed from '../ShareBoxFeed/ShareBoxFeed'
import ContentFeed from '../ContentFeed/ContentFeed'
import ApiUtils from '@/components/apis/ApiUtils'
import {type PostTypes} from '@/components/utils/TypeConfig'

function MainFeed(): React.JSX.Element {
  const [feedContent, setFeedContent] = useState<PostTypes[]>([])
  useEffect(() => {
    void fetchPosts()
  }, [])
  async function fetchPosts(): Promise<void> {
    try {
      const response: any = await ApiUtils.getPosts()
      setFeedContent(response.data)
    } catch (err) {
      console.log('🚀 ~ fetchPosts ~ err:', err)
    }
  }
  return (
    <>
      <ShareBoxFeed setFeedContent={setFeedContent} />
      <ContentFeed feedContent={feedContent} />
    </>
  )
}

export default MainFeed
