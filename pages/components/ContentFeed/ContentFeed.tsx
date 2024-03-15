/* eslint-disable no-void */
/* eslint-disable @typescript-eslint/no-confusing-void-expression */
/* eslint-disable arrow-parens */
/* eslint-disable max-len */
/* eslint-disable operator-linebreak */
/* eslint-disable indent */
/* eslint-disable quote-props */
/* eslint-disable prettier/prettier */
import {Box, Button, Menu, MenuItem, Typography} from '@mui/material'
import React, {useState} from 'react'
import Image from 'next/image'
import DefaultUserImg from '@/components/images/default_user_placeholder.jpg'
import Link from 'next/link'
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt'
import CommentIcon from '@mui/icons-material/Comment'
import SendIcon from '@mui/icons-material/Send'
import ReplyAllIcon from '@mui/icons-material/ReplyAll'
import {formatRelativeTime} from '@/components/helpers/TimeFomat'
import {type PostTypes} from '@/components/utils/TypeConfig'
import ImageCarousel from './ImageCarousel'
import ApiUtils from '@/components/apis/ApiUtils'
import {ToasterMessage} from '@/components/helpers/ToastMessage'
import CommentBox from './CommentBox'
// import MoreIcon from '@mui/icons-material/MoreVert'
// import ShareBoxModal from '../ShareBoxFeed/ShareBoxModal'
import ThumbUpIcon from '@mui/icons-material/ThumbUp'
interface PostProps {
  readonly feedContent: PostTypes[]
  setFeedContent: React.Dispatch<React.SetStateAction<PostTypes[]>>
  index: number
  // open: boolean
  // handleOpen: () => void
  // handleClose: () => void
}

function ContentFeed({
  feedContent,
  setFeedContent,
  index, // open,
  // handleOpen,
} // handleClose,
: Readonly<PostProps>): React.JSX.Element {
  const [showMoreStates, setShowMoreStates] = useState<Record<string, boolean>>(
    {},
  )
  const [showCommentsStates, setShowCommentsStates] = useState<
    Record<string, boolean>
  >({})
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] =
    React.useState<null | HTMLElement>(null)
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl)
  // const [postDetails, setPostDetails] = useState<PostTypes>()
  const mobileMenuId = 'primary-search-account-menu-mobile'
  // const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>): void => {
  //   setMobileMoreAnchorEl(event.currentTarget)
  // }
  const handleMobileMenuClose = (): void => {
    setMobileMoreAnchorEl(null)
  }
  const handleShowMoreToggle = (contentId: string): void => {
    setShowMoreStates(prev => ({...prev, [contentId]: !prev[contentId]}))
  }
  const handleShowComments = (contentId: string): void => {
    setShowCommentsStates(prev => ({...prev, [contentId]: !prev[contentId]}))
  }

  const handleUpvotePost = async (postId: string): Promise<void> => {
    try {
      const response: any = await ApiUtils.upvotePost(`/${postId}`)
      ToasterMessage('success', response?.message)

      const updatedFeedContent = feedContent.map((newPost: any) => {
        if (newPost._id === postId) {
          // If the post ID matches, update the post in the feed
          return {
            ...newPost,
            isLiked: true,
            likeCount: newPost.likeCount + 1,
          }
        }
        return newPost // Return the post as it is if ID doesn't match
      })

      // Set the updated feed content
      setFeedContent(updatedFeedContent)
    } catch (err: any) {
      ToasterMessage('error', err?.response?.data.message)
    }
  }

  const handleDeletePost = async (postId: string): Promise<void> => {
    try {
      await ApiUtils.deletePost(`/${postId}`)
      ToasterMessage('success', 'Post deleted successfully')
      const getPostResponse: any = await ApiUtils.getPosts(
        `?limit=10&page=${index - 1}`,
      )
      setFeedContent(prevItems => [...prevItems, ...getPostResponse.data])
    } catch (err: any) {
      ToasterMessage('error', err?.response?.data.message)
    }
  }
  const openEditPostModal = (post: PostTypes): void => {
    console.log('🚀 ~ openEditPostModal ~ post:', post)
    // setPostDetails(post)
    // handleOpen()
  }
  return (
    <>
      {feedContent?.length > 0
        ? feedContent?.map((content: PostTypes) => {
            const showMore = showMoreStates[content._id] || false
            const showComments = showCommentsStates[content._id] || false

            return (
              <Box
                id="content_feed"
                key={content._id}
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
                    {content?.title}
                  </Box> */}
                  {/* <MoreIcon
                    sx={{fontSize: '16px', cursor: 'pointer'}}
                    onClick={(e: any) => {
                      handleMobileMenuOpen(e)
                    }}
                  /> */}
                </Box>
                <Menu
                  anchorEl={mobileMoreAnchorEl}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  id={mobileMenuId}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={isMobileMenuOpen}
                  onClose={handleMobileMenuClose}>
                  <MenuItem>
                    <Typography
                      component="a"
                      sx={{fontSize: '13px'}}
                      onClick={() => openEditPostModal(content)}>
                      Edit Post
                    </Typography>
                  </MenuItem>
                  <MenuItem>
                    <Typography
                      component="a"
                      sx={{fontSize: '13px'}}
                      onClick={async () =>
                        await handleDeletePost(content?._id)
                      }>
                      Delete
                    </Typography>
                  </MenuItem>
                </Menu>

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
                        src={content?.author?.profileImage ?? DefaultUserImg}
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
                        href={`/profile/${content?.author.name.replace(
                          /\s+/g,
                          '-',
                        )}-${content?.author._id}`}>
                        <Box
                          component="span"
                          sx={{
                            display: 'flex',
                            color: 'rgb(0 0 0/0.8)',
                            fontWeight: '550',
                            fontSize: '15px',
                          }}>
                          {content?.author?.name}
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
                        <Box
                          component="span"
                          sx={{
                            display: 'block',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            color: 'rgb(0 0 0/.6)',
                            whiteSpace: 'nowrap',
                          }}>
                          {formatRelativeTime(content?.createdAt)}
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
                      {showMore
                        ? content?.content
                        : `${content?.content
                            .split(' ')
                            .slice(0, 15)
                            .join(' ')}${
                            content?.content.split(' ').length > 15
                              ? ' ...'
                              : ''
                          }`}
                      {content?.content.length > 120 && (
                        <Typography
                          component="p"
                          sx={{
                            float: 'right',
                            fontSize: '12px',
                            cursor: 'pointer',
                            color: '#ACACAC',
                            mt: '17px',
                            mb: '8px',
                          }}
                          onClick={() => {
                            handleShowMoreToggle(content._id)
                          }}>
                          {showMore ? '...see less' : '...see more'}
                        </Typography>
                      )}
                    </Box>
                    {content?.images?.length > 0 && (
                      <ImageCarousel content={content.images} />
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
                        {content?.likeCount}
                      </Typography>
                    </Box>

                    <Typography
                      component="a"
                      onClick={() => {
                        handleShowComments(content._id)
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
                      {content?.commentCount} comments
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
                      await handleUpvotePost(content?._id)
                    }}
                    sx={{
                      padding: '13px 15px',
                      ':hover': {
                        background: 'rgba(0,0,0,0.08)',
                      },
                    }}>
                    {content?.isLiked ? (
                      <ThumbUpIcon
                        sx={{color: '#1976D2', transform: 'scaleX(-1)'}}
                      />
                    ) : (
                      <ThumbUpOffAltIcon
                        sx={{color: '#5E5E5E', transform: 'scaleX(-1)'}}
                      />
                    )}
                    <span>{content?.isLiked ? 'Liked' : 'Like'}</span>
                  </Button>
                  <Button
                    sx={{
                      padding: '13px 15px',
                      ':hover': {
                        background: 'rgba(0,0,0,0.08)',
                      },
                    }}
                    onClick={() => {
                      handleShowComments(content._id)
                    }}>
                    <CommentIcon sx={{color: '#5E5E5E'}} />
                    <span>Comment</span>
                  </Button>
                  <Link href="/coming-soon">
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
                    isSinglePostComment={false}
                  />
                )}
              </Box>
            )
          })
        : ''}
      {/* <ShareBoxModal
        postDetails={postDetails}
        open={open}
        // onClose={handleClose}
        setFeedContent={setFeedContent}
      /> */}
    </>
  )
}

export default ContentFeed
