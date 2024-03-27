/* eslint-disable indent */
/* eslint-disable arrow-parens */
/* eslint-disable max-len */
/* eslint-disable prettier/prettier */
/* eslint-disable quote-props */
import {Box, Button, Typography} from '@mui/material'
import React, {useEffect, useRef, useState} from 'react'
import DefaultUserImg from '@/components/images/default_user_placeholder.jpg'
import Image from 'next/image'
import InputTextField from '../InputField/InputTextField'
import Link from 'next/link'
import ApiUtils from '@/components/apis/ApiUtils'
import {formatRelativeTime} from '@/components/helpers/TimeFomat'
import {type CommentsDataTypes} from '@/components/utils/TypeConfig'
import {ToasterMessage} from '@/components/helpers/ToastMessage'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import {LoggedInUserId} from '@/components/utils/SelectorConfig'
interface CommentBoxProps {
  contentId: string
  feedContent?: any
  setFeedContent: React.Dispatch<React.SetStateAction<any>>
  isSinglePostComment: boolean
}

function CommentBox({
  contentId,
  feedContent,
  setFeedContent,
  isSinglePostComment,
}: Readonly<CommentBoxProps>): React.JSX.Element {
  const [userComments, setUserComments] = useState<CommentsDataTypes[]>([])
  const [commentInputValue, setCommentInputValue] = useState('')
  const [commentEditMode, setCommentEditMode] = useState(false)
  const [currentCommentId, setCurrentCommentId] = useState('')
  console.log('🚀 ~ currentCommentId:', currentCommentId)
  const [numberOfDisplayComment, setNumberOfDisplayComment] =
    useState<number>(5)
  const inputRef = useRef<HTMLInputElement | null>(null)
  const currentLoggedInUserId: string = LoggedInUserId()

  async function fetchCommentsForPost(id: string): Promise<void> {
    try {
      const response: any = await ApiUtils.getPostComments(`/${id}/comments`)
      const sortedComments = response?.data?.sort(
        (a: CommentsDataTypes, b: CommentsDataTypes) => {
          const dateA = new Date(a.createdAt)
          const dateB = new Date(b.createdAt)
          return dateB.getTime() - dateA.getTime()
        },
      )
      setUserComments(sortedComments)
    } catch (err: any) {
      ToasterMessage('error', err?.response?.data.message)
    }
  }
  async function handlePostComment(): Promise<void> {
    try {
      const body = {
        content: commentInputValue,
      }
      if (commentEditMode) {
        const response: any = await ApiUtils.updateComment(
          body,
          `${currentCommentId}`,
        )
        ToasterMessage('success', response?.message)
      } else {
        const response: any = await ApiUtils.postComment(body, contentId)
        ToasterMessage('success', response?.message)

        if (isSinglePostComment) {
          const updatedContent = {
            ...feedContent,
            commentCount: feedContent.commentCount + 1,
          }
          setFeedContent(updatedContent)
        } else {
          const updatedFeedContent = feedContent.map((newPost: any) => {
            if (newPost._id === contentId) {
              return {
                ...newPost,
                commentCount: newPost.commentCount + 1,
              }
            }
            return newPost
          })

          setFeedContent(updatedFeedContent)
        }
      }

      setCommentInputValue('')
      void fetchCommentsForPost(contentId)
    } catch (err: any) {
      ToasterMessage('error', err?.response?.data.message)
    }
  }
  async function handleDeleteComment(commentId: string): Promise<void> {
    try {
      await ApiUtils.deleteComment(`/${commentId}`)
      ToasterMessage('success', 'Comment deleted successfully')
      if (commentId === currentCommentId) {
        setCommentInputValue('')
        setCommentEditMode(prv => !prv)
        setCurrentCommentId('')
      }
      void fetchCommentsForPost(contentId)
      if (isSinglePostComment) {
        const updatedContent = {
          ...feedContent,
          commentCount: feedContent.commentCount - 1,
        }
        setFeedContent(updatedContent)
      } else {
        const updatedFeedContent = feedContent.map((newPost: any) => {
          if (newPost._id === contentId) {
            return {
              ...newPost,
              commentCount: newPost.commentCount - 1,
            }
          }
          return newPost
        })

        setFeedContent(updatedFeedContent)
      }
    } catch (err: any) {
      ToasterMessage('error', err?.response?.data.message)
    }
  }
  const handleEditComment = (commentId: string, content: string): void => {
    setCommentEditMode(prv => !prv)
    setCurrentCommentId(commentId)
    setCommentInputValue(content)
    if (inputRef.current != null) {
      inputRef.current.focus()
    }
  }
  const handleLoadMore = (): void => {
    setNumberOfDisplayComment(prv => prv + 5)
  }
  useEffect(() => {
    void fetchCommentsForPost(contentId)
  }, [contentId])
  return (
    <Box
      sx={{
        marginLeft: '1rem',
        marginRight: '1rem',
        padding: '0.1rem 0.3rem',
        paddingBottom: '0.8rem',
      }}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
        }}>
        <Box component="span" className="border_radius-50">
          <Image
            src={DefaultUserImg}
            height={35}
            width={35}
            alt="user_profile"
          />
        </Box>
        <Box sx={{flex: '1'}}>
          <InputTextField
            ref={inputRef}
            className={'comment-box'}
            label={'Add comment...'}
            type={'comment'}
            fullWidth={true}
            value={commentInputValue}
            multiline={true}
            maxRows={6}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setCommentInputValue(e.target.value)
            }}
          />
        </Box>
      </Box>
      {commentInputValue.trim().length > 0 && (
        <Button
          variant="contained"
          onClick={handlePostComment}
          sx={{
            margin: '0.5rem 0',
            marginLeft: '45px',
            height: '25px',
            overflow: 'hidden',
            padding: '0px 10px',
            borderRadius: '28px',
            fontSize: '12px',
            background: '#0a66c2',
            ':hover': {background: '#004182'},
          }}>
          {' '}
          Post{' '}
        </Button>
      )}
      <Box sx={{maxHeight: '300px', overflowY: 'auto', mt: '10px'}}>
        {userComments.length > 0 &&
          userComments.slice(0, numberOfDisplayComment).map(data => {
            return (
              <Box
                key={data?._id}
                sx={{
                  flexWrap: 'nowrap',
                  marginBottom: '0.8rem',
                  marginTop: '0.8rem',
                  display: 'flex',
                  alignItems: 'center',
                }}>
                <Box
                  sx={{
                    display: 'flex',
                    overflow: 'hidden',
                    width: '100%',
                  }}>
                  <Box className="border_radius-50">
                    <Image
                      src={data?.author_details?.profileImage ?? DefaultUserImg}
                      height={35}
                      width={35}
                      alt="user_profile"
                    />
                  </Box>
                  <Box
                    className="content_feed_name"
                    sx={{
                      flex: '1',
                      display: 'flex',
                      marginLeft: '0.8rem',
                      overflow: 'hidden',
                      background: '#F2F2F2',
                      padding: '0.3rem 0.6rem',
                      justifyContent: 'space-between',
                    }}>
                    <Box>
                      <Link
                        href={`/profile/${data?.author_details.name?.replace(
                          /\s+/g,
                          '-',
                        )}-${data?.author_details?._id}`}>
                        <Box
                          component="span"
                          sx={{
                            display: 'flex',
                            color: 'rgb(0 0 0/0.8)',
                            fontWeight: '550',
                            fontSize: '13px',
                          }}>
                          {data?.author_details?.name}
                        </Box>
                        <Box
                          component="p"
                          sx={{
                            display: 'block',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            color: 'rgb(0 0 0/.6)',
                            whiteSpace: 'nowrap',
                            fontSize: '11px',
                          }}>
                          {/* Sr Test Automation Engineer at Accolite Digital */}
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
                          {formatRelativeTime(data?.createdAt)}
                        </Box>
                      </Link>
                      <Typography
                        component="span"
                        sx={{fontSize: '13px', color: '#000'}}>
                        {data?.content}
                      </Typography>
                    </Box>
                    <Box>
                      {data?.author === currentLoggedInUserId && (
                        <EditIcon
                          onClick={() => {
                            handleEditComment(data?._id, data?.content)
                          }}
                          sx={{
                            fontSize: '1rem',
                            mr: '8px',
                            transition: '0.1s',
                            color: '#9f9fbe',
                            cursor: 'pointer',
                            ':hover': {
                              color: '#666666',
                            },
                          }}
                        />
                      )}

                      <DeleteIcon
                        onClick={async () => {
                          await handleDeleteComment(data?._id)
                        }}
                        sx={{
                          fontSize: '1rem',
                          transition: '0.1s',
                          color: '#9f9fbe',
                          cursor: 'pointer',
                          ':hover': {
                            color: '#666666',
                          },
                        }}
                      />
                    </Box>
                  </Box>
                </Box>
              </Box>
            )
          })}
        {userComments.length > numberOfDisplayComment && (
          <Button
            variant="outlined"
            onClick={handleLoadMore}
            sx={{
              margin: '0.5rem 0',
              marginLeft: '45px',
              height: '25px',
              padding: '0px 10px',
              borderRadius: '28px',
              fontSize: '12px',
              color: '#0a66c2',
            }}>
            Load More
          </Button>
        )}
      </Box>
    </Box>
  )
}

export default CommentBox
