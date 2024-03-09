/* eslint-disable arrow-parens */
import React, {useCallback, useEffect, useRef, useState} from 'react'
import ShareBoxFeed from '../ShareBoxFeed/ShareBoxFeed'
import ContentFeed from '../ContentFeed/ContentFeed'
import ApiUtils from '@/components/apis/ApiUtils'
import {type PostTypes} from '@/components/utils/TypeConfig'
import Loader from '@/components/utils/Loader'
import {ToasterMessage} from '@/components/helpers/ToastMessage'

function MainFeed(): React.JSX.Element {
  const [feedContent, setFeedContent] = useState<PostTypes[]>([])
  console.log('🚀 ~ MainFeed ~ feedContent:', feedContent)
  const [isLoading, setIsLoading] = useState(false)
  const [index, setIndex] = useState(1)
  const loaderRef = useRef(null)
  // const [open, setOpen] = React.useState(false)

  // const handleOpen = (): void => {
  //   setOpen(true)
  // }
  // const handleClose = (): void => {
  //   setOpen(false)
  // }
  const fetchData = useCallback(async () => {
    if (isLoading) return

    setIsLoading(true)
    try {
      const response: any = await ApiUtils.getPosts(`?limit=10&page=${index}`)
      setFeedContent(prevItems => [...prevItems, ...response.data])
    } catch (err: any) {
      ToasterMessage('error', err?.response?.data?.message)
    }

    setIndex(prevIndex => prevIndex + 1)

    setIsLoading(false)
  }, [index, isLoading])
  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      const target = entries[0]
      if (target?.isIntersecting) {
        void fetchData()
      }
    })

    if (loaderRef?.current != null) {
      observer.observe(loaderRef.current)
    }

    return () => {
      if (loaderRef?.current != null) {
        observer.unobserve(loaderRef.current)
      }
    }
  }, [fetchData])
  return (
    <>
      <ShareBoxFeed
        setFeedContent={setFeedContent}
        // open={open}
        // handleOpen={handleOpen}
        // handleClose={handleClose}
      />
      <ContentFeed
        feedContent={feedContent}
        setFeedContent={setFeedContent}
        index={index}
        // open={open}
        // handleOpen={handleOpen}
        // handleClose={handleClose}
      />
      <div ref={loaderRef}>{isLoading && <Loader />}</div>
    </>
  )
}

export default MainFeed
