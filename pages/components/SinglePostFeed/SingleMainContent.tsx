/* eslint-disable arrow-parens */
/* eslint-disable quote-props */
/* eslint-disable indent */
/* eslint-disable max-len */
/* eslint-disable prettier/prettier */
import {Box, Button, Typography} from '@mui/material'
import Image from 'next/image'
import React, {useEffect, useState} from 'react'
import DefaultUserImg from '@/components/images/default_user_placeholder.jpg'
import Link from 'next/link'
import ImageCarousel from '../ContentFeed/ImageCarousel'
import ThumbUpIcon from '@mui/icons-material/ThumbUp'

import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt'
import CommentIcon from '@mui/icons-material/Comment'
import SendIcon from '@mui/icons-material/Send'
import ReplyAllIcon from '@mui/icons-material/ReplyAll'
import ApiUtils from '@/components/apis/ApiUtils'
import {ToasterMessage} from '@/components/helpers/ToastMessage'
import {type PostTypes} from '@/components/utils/TypeConfig'
import CommentBox from '../ContentFeed/CommentBox'
interface PostProps {
  content: PostTypes
}
function SingleMainContent({content}: PostProps): React.JSX.Element {
  const [showCommentsStates, setShowCommentsStates] = useState<
    Record<string, boolean>
  >({})
  const [feedContent, setFeedContent] = useState<PostTypes>(content)
  const handleShowComments = (contentId: string): void => {
    setShowCommentsStates(prev => ({...prev, [contentId]: !prev[contentId]}))
  }
  const handleUpvotePost = async (postId: string): Promise<void> => {
    try {
      const response: any = await ApiUtils.upvotePost(`/${postId}`)
      ToasterMessage('success', response?.message)
      const updatedContent = {
        ...content,
        isLiked: true,
        likeCount: content.likeCount + 1,
      }
      setFeedContent(updatedContent)
    } catch (err: any) {
      ToasterMessage('error', err?.response?.data.message)
    }
  }
  const showComments = showCommentsStates[content?._id] || false
  useEffect(() => {
    setFeedContent(content)
  }, [content])
  return (
    <Box
      id="content_feed"
      key={feedContent?._id}
      sx={{
        margin: '0 0 .8rem',
        background: '#fff',
        borderRadius: '0.4rem',
      }}>
      <Box
        sx={{
          borderBottom: '1px solid rgb(140 140 140/.2)',
          minHeight: '36px',
          marginLeft: '1rem',
          marginRight: '1rem',
          paddingTop: '0.5rem',
          paddingBottom: '0.5rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
        className="content_feed_header">
        {/* <Box component="span" sx={{fontSize: '14px'}}>
          {feedContent?.title}
        </Box> */}
        {/* <MoreIcon
                    sx={{fontSize: '16px', cursor: 'pointer'}}
                    onClick={(e: any) => {
                      handleMobileMenuOpen(e)
                    }}
                  /> */}
      </Box>

      <Box
        sx={{
          flexWrap: 'nowrap',
          padding: '1.2rem 1rem 0',
          marginBottom: '0.8rem',
          display: 'flex',
          alignItems: 'center',
        }}>
        <Box
          sx={{
            display: 'flex',
            flexGrow: '1',
            overflow: 'hidden',
            marginRight: '3rem',
          }}>
          <Box className="border_radius-50">
            <Image
              src={feedContent?.author?.profileImage ?? DefaultUserImg}
              height={48}
              width={48}
              alt="user_profile"
            />
          </Box>
          <Box
            className="content_feed_name"
            sx={{
              flexGrow: '1',
              marginLeft: '0.8rem',
              overflow: 'hidden',
            }}>
            <Link
              href={`/profile/${feedContent?.author?.name.replace(
                /\s+/g,
                '-',
              )}-${feedContent?.author?._id}`}>
              <Box
                component="span"
                sx={{
                  display: 'flex',
                  color: 'rgb(0 0 0/0.8)',
                  fontWeight: '550',
                  fontSize: '15px',
                }}>
                {feedContent?.author?.name}
              </Box>
              <Box
                component="span"
                sx={{
                  display: 'block',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  color: 'rgb(0 0 0/.6)',
                  whiteSpace: 'nowrap',
                }}>
                Sr Test Automation Engineer at Accolite Digital
              </Box>
            </Link>
          </Box>
        </Box>
      </Box>
      <Box
        component="div"
        className="description_wrapper"
        sx={{
          borderBottom: '1px solid rgb(140 140 140/.2)',
          marginRight: '0.8rem',
          marginLeft: '0.8rem',
        }}>
        <Box
          component="span"
          sx={{
            fontSize: '14px',
            fontWeight: '550',
            margin: '0 0.8rem 1rem 0.2rem',
          }}>
          {content?.title}
        </Box>
        <Box
          sx={{
            margin: '0 0.8rem 1rem 0.2rem',
            overflow: 'hidden',
            lineHeight: '1.4rem',
            display: 'block',
            maxWidth: '930px',
          }}>
          <Box
            sx={{
              color: 'rgb(0 0 0/.9),',
              wordWrap: 'break-word',
              fontSize: '13px',
            }}
            component="span">
            {feedContent?.content}
          </Box>
          {feedContent?.images?.length > 0 && (
            <ImageCarousel content={feedContent.images} />
          )}
        </Box>
        <Box
          component="div"
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            mb: '10px',
          }}>
          <Box
            component="span"
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: '3px',
            }}>
            <ThumbUpOffAltIcon
              sx={{
                color: '#5E5E5E',
                fontSize: '16px',
                transform: 'scaleX(-1)',
              }}
            />
            <Typography
              component="span"
              sx={{color: '#5E5E5E', fontSize: '12px'}}>
              {feedContent?.likeCount}
            </Typography>
          </Box>

          <Typography
            component="a"
            onClick={() => {
              handleShowComments(content?._id)
            }}
            sx={{
              cursor: 'pointer',
              fontSize: '12px',
              color: '#ACACAC',
              '&:hover': {
                color: '#1976D2',
                textDecoration: 'underline',
              },
            }}>
            {feedContent?.commentCount} comments
          </Typography>
        </Box>
      </Box>

      <Box
        sx={{
          minHeight: '40px',
          marginLeft: '1rem',
          marginRight: '1rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0.5rem 0.3rem',
          paddingBottom: '0.8rem',
        }}
        className="toolbar_wrapper_post">
        <Button
          onClick={async () => {
            await handleUpvotePost(feedContent?._id)
          }}
          sx={{
            padding: '13px 15px',
            ':hover': {
              background: 'rgba(0,0,0,0.08)',
            },
          }}>
          {feedContent?.isLiked ? (
            <ThumbUpIcon sx={{color: '#1976D2', transform: 'scaleX(-1)'}} />
          ) : (
            <ThumbUpOffAltIcon
              sx={{color: '#5E5E5E', transform: 'scaleX(-1)'}}
            />
          )}
          <span>{feedContent?.isLiked ? 'Liked' : 'Like'}</span>
        </Button>
        <Button
          sx={{
            padding: '13px 15px',
            ':hover': {
              background: 'rgba(0,0,0,0.08)',
            },
          }}
          onClick={() => {
            handleShowComments(content?._id)
          }}>
          <CommentIcon sx={{color: '#5E5E5E'}} />
          <span>Comment</span>
        </Button>
        <Link href="coming-soon">
          <Button
            sx={{
              padding: '13px',
              ':hover': {
                background: 'rgba(0,0,0,0.08)',
              },
            }}>
            <ReplyAllIcon sx={{color: '#5E5E5E'}} />
            <span>Repost</span>
          </Button>
        </Link>
        <Link href="/coming-soon">
          <Button
            sx={{
              padding: '13px',
              ':hover': {
                background: 'rgba(0,0,0,0.08)',
              },
            }}>
            <SendIcon sx={{color: '#5E5E5E'}} />
            <span>Send</span>
          </Button>
        </Link>
      </Box>
      {showComments && (
        <CommentBox
          contentId={content?._id}
          setFeedContent={setFeedContent}
          feedContent={feedContent}
          isSinglePostComment={true}
        />
      )}
    </Box>
  )
}

export default SingleMainContent
