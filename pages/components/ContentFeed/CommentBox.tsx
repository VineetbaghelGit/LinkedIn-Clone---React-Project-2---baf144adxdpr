/* eslint-disable max-len */
/* eslint-disable prettier/prettier */
/* eslint-disable quote-props */
import {Box, Button, Typography} from '@mui/material'
import React, {useEffect, useRef, useState} from 'react'
import ProfileImage from '../../../images/linkedin_profile.jpg'
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
}

function CommentBox({contentId}: CommentBoxProps): React.JSX.Element {
  const [userComments, setUserComments] = useState<CommentsDataTypes[]>([])
  const [commentInputValue, setCommentInputValue] = useState('')
  const [commentEditMode, setCommentEditMode] = useState(false)
  const [currentCommentId, setCurrentCommentId] = useState('')
  const inputRef = useRef<HTMLInputElement | null>(null)
  const userId: string = LoggedInUserId()
  const currentLoggedInUserId = userId.slice(1, -1)

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
    } catch (err) {
      console.log('🚀 ~ fetchCommentsForPost ~ err:', err)
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
      void fetchCommentsForPost(contentId)
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
          <Image src={ProfileImage} height={35} width={35} alt="user_profile" />
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
      {commentInputValue.length > 0 && (
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
      {userComments.length > 0 &&
        userComments.map(data => {
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
                    src={ProfileImage}
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
                    <Link href="/profile">
                      <Box
                        component="span"
                        sx={{
                          display: 'flex',
                          color: 'rgb(0 0 0/0.8)',
                          fontWeight: '550',
                          fontSize: '13px',
                        }}>
                        {/* {content?.author?.name} */}
                        Vineet Baghel
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
    </Box>
  )
}

export default CommentBox
