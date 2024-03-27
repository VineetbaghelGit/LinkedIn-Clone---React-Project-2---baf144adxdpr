/* eslint-disable arrow-parens */
/* eslint-disable indent */
/* eslint-disable prettier/prettier */
/* eslint-disable max-len */
/* eslint-disable quote-props */
/* eslint-disable quotes */
import {Box, Button, Divider, FormControl, TextField} from '@mui/material'
import Image from 'next/image'
import React, {type ChangeEvent, useEffect, useRef, useState} from 'react'
import DefaultUserImg from '@/components/images/default_user_placeholder.jpg'
import Modal from '@mui/material/Modal'
import Popover from '@mui/material/Popover'
// eslint-disable-next-line max-len
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt'
import Typography from '@mui/material/Typography'
import {type EmojiClickData} from 'emoji-picker-react'
import EmojiPicker from 'emoji-picker-react'
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'
import CloseIcon from '@mui/icons-material/Close'
import ApiUtils from '@/components/apis/ApiUtils'
import {ToasterMessage} from '@/components/helpers/ToastMessage'
import {type PostTypes} from '@/components/utils/TypeConfig'
import {LoggedInUserDetails} from '@/components/utils/SelectorConfig'
import InputTextField from '../InputField/InputTextField'

interface ShareModalProps {
  postDetails?: PostTypes
  open: boolean
  onClose: () => void
  setFeedContent: React.Dispatch<React.SetStateAction<PostTypes[]>>
  postType: string
}
const ShareBoxModal: React.FC<ShareModalProps> = ({
  postDetails,
  open,
  onClose,
  setFeedContent,
  postType,
}) => {
  const style = {
    position: 'absolute' as const,
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 620,
    bgcolor: 'background.paper',
    boxShadow: 24,
    borderRadius: '0.8rem',
    p: 4,
    height: postType === 'media' ? '90vh' : '80vh',
    ':focus-visible': {
      outline: 'none',
    },
  }
  const [inputValue, setInputValue] = useState<string>(
    postDetails?.content ?? '',
  )
  const [showEmojiPicker, setShowEmojiPicker] = React.useState(false)
  const [loader, setLoader] = useState(false)
  const [inputTitle, setInputTitle] = React.useState('')
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null)
  const [imagePreviews, setImagePreviews] = useState<string[]>(
    postDetails?.images ?? [],
  )
  const [selectedFiles, setSelectedFiles] = useState<File[]>([])
  const userDetails = LoggedInUserDetails()
  const emojiRef = useRef<HTMLDivElement | null>(null)

  const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>): void => {
    setAnchorEl(event.currentTarget)
  }

  const handlePopoverClose = (): void => {
    setAnchorEl(null)
  }
  const handleEmojiPicker = (): void => {
    setShowEmojiPicker(!showEmojiPicker)
  }
  function handleInputField(emojiData: EmojiClickData): void {
    setInputValue(
      (data: any) =>
        data + (emojiData.isCustom ? emojiData.unified : emojiData.emoji),
    )
    setShowEmojiPicker(false)
  }
  const openPopover = Boolean(anchorEl)
  const handleClickOutside = (event: MouseEvent): void => {
    if (
      emojiRef.current != null &&
      !emojiRef.current?.contains(event.target as Node)
    ) {
      setShowEmojiPicker(false)
    }
  }
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])
  const handleFileChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const files = event.target.files

    if (files != null) {
      const imageFiles = Array.from(files).filter(file =>
        file.type.startsWith('image/'),
      )

      setSelectedFiles(prevFiles => [...prevFiles, ...imageFiles])
      const newFiles = Array.from(imageFiles)?.map(async file => {
        const reader = new FileReader()

        return await new Promise<string>(resolve => {
          reader.onload = () => {
            resolve(reader.result as string)
          }
          reader.readAsDataURL(file)
        })
      })

      void Promise.all(newFiles).then(filePreviews => {
        const newImagePreviews = filePreviews.filter(
          file => typeof file === 'string',
        )

        setImagePreviews(prevImagePreviews => [
          ...prevImagePreviews,
          ...newImagePreviews,
        ])
      })
    }
  }

  const removeFile = (index: number): void => {
    setSelectedFiles(prevFiles => prevFiles.filter((_, i) => i !== index))
    setImagePreviews(prevImagePreviews =>
      prevImagePreviews.filter((_, i) => i !== index),
    )
  }
  const handleCreatePost = async (): Promise<void> => {
    if (inputValue != null) {
      try {
        setLoader(true)
        const formData = new FormData()
        selectedFiles.forEach(file => {
          formData.append(`images`, file)
        })
        formData.append('title', inputTitle)
        formData.append('content', inputValue)
        const response: any = await ApiUtils.createPost(formData)
        const getPostResponse: any = await ApiUtils.getPosts(`?limit=10&page=1`)
        setFeedContent(prevItems => [...prevItems, ...getPostResponse.data])
        setFeedContent(getPostResponse.data)
        ToasterMessage('success', response?.message)
        onClose()
        setInputValue('')
        setInputTitle('')
        setSelectedFiles([])
        setImagePreviews([])
        setLoader(false)
      } catch (err: any) {
        ToasterMessage('error', err.response.data.message)
      }
    }
  }
  useEffect(() => {
    if (open && postDetails === null) {
      setInputValue('')
      setSelectedFiles([])
      setImagePreviews([])
    }
  }, [open])

  return (
    <Modal
      className="create_post_modal"
      open={open}
      disableScrollLock={true}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description">
      <Box sx={style}>
        <Box
          className="share_box_modal"
          sx={{display: 'flex', flexDirection: 'column', height: '100%'}}>
          <Box
            className="modal_header"
            sx={{
              display: 'block',
            }}>
            <Button
              sx={{
                padding: '13px 15px',
                ':hover': {
                  background: 'rgba(0,0,0,0.08)',
                },
              }}>
              <Box className="border_radius-50">
                <Image
                  src={userDetails?.profileImage ?? DefaultUserImg}
                  height={48}
                  width={48}
                  alt="user_profile"
                />
              </Box>
              <Box
                sx={{
                  flexGrow: '1',
                  overflow: 'hidden',
                }}>
                <Box
                  component="span"
                  sx={{
                    display: 'flex',
                    color: 'rgb(0 0 0/0.8)',
                    fontWeight: '550',
                    fontSize: '19px',
                    textTransform: 'capitalize',
                    marginLeft: '0.8rem',
                  }}>
                  {userDetails?.name}
                </Box>
                <Box
                  component="span"
                  sx={{
                    display: 'block',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    color: 'rgb(0 0 0/.9)',
                    textTransform: 'capitalize',
                    whiteSpace: 'nowrap',
                    fontSize: '12px',
                    marginLeft: '0.8rem',
                  }}>
                  Post to Anyone
                </Box>
              </Box>
            </Button>
          </Box>

          <Box className="share_text_editor" sx={{margin: '0.7rem 1rem'}}>
            <FormControl
              sx={{
                marginBottom: '16px',
                width: '100%',
              }}>
              <InputTextField
                id="title"
                name="title"
                label="Post Title"
                type="text"
                value={inputTitle}
                onChange={e => {
                  setInputTitle(e.target.value)
                }}
              />
            </FormControl>
            <TextField
              variant="standard"
              multiline
              rows={imagePreviews.length > 0 ? 3 : 5}
              value={inputValue}
              InputProps={{
                disableUnderline: true,
              }}
              onChange={(e: any) => {
                setInputValue(e.target.value)
              }}
              fullWidth
              placeholder="What do you want to talk about?"
            />
            <Divider light={true} sx={{my: '8px'}} />

            <Box
              sx={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '10px',
                maxHeight: '90px',
                overflow: 'auto',
              }}>
              {imagePreviews?.map((filePreview, index) => (
                <div
                  key={index}
                  className={`mb-2 image-preview ${
                    index % 6 === 2 ? 'w-1/6' : 'w-full md:w-1/6'
                  }`}>
                  <Image
                    src={filePreview}
                    alt={`Image Preview ${index + 1}`}
                    width={80}
                    height={80}
                  />

                  <Box component="span" className="remove-preview-img">
                    <CloseIcon
                      onClick={() => {
                        removeFile(index)
                      }}
                      sx={{fontSize: '1.01rem'}}
                    />
                  </Box>
                </div>
              ))}
            </Box>
          </Box>
          <Box className="share_text_editor" sx={{margin: '0.7rem 1rem'}}>
            <Button
              aria-owns={openPopover ? 'mouse-over-popover' : undefined}
              aria-haspopup="true"
              onMouseEnter={handlePopoverOpen}
              sx={{padding: '0', justifyContent: 'start'}}
              onClick={handleEmojiPicker}
              onMouseLeave={handlePopoverClose}>
              <SentimentSatisfiedAltIcon sx={{color: 'rgb(0 0 0/0.6)'}} />
            </Button>
            <Popover
              id="mouse-over-popover"
              sx={{
                pointerEvents: 'none',
              }}
              open={openPopover}
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'center',
                horizontal: 'left',
              }}
              transformOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              onClose={handlePopoverClose}
              disableRestoreFocus>
              {!showEmojiPicker && (
                <Typography sx={{p: 0.7, fontSize: '12px'}}>
                  Open emoji keyword
                </Typography>
              )}
            </Popover>
            {showEmojiPicker && (
              <div ref={emojiRef}>
                <EmojiPicker
                  onEmojiClick={handleInputField}
                  lazyLoadEmojis={true}
                  skinTonesDisabled
                />
              </div>
            )}
          </Box>
          {postType === 'media' && (
            <Box className="share_text_editor" sx={{margin: '0.7rem 0.2rem'}}>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                }}>
                <Box sx={{marginRight: '14px'}}>
                  <label htmlFor="upload" className="cursor-pointer">
                    <Box
                      component="span"
                      sx={{
                        borderRadius: '50%',
                        padding: '0.7rem',
                        display: 'flex',
                        alignItems: 'center',
                        background: '#f4f2ee',
                        ':hover': {
                          boxShadow:
                            '0px 0px 0px 1px rgb(140 140 140/.2) ,0px 4px 4px rgb(0 0 0/.3)',
                          cursor: 'pointer',
                        },
                      }}>
                      <InsertPhotoIcon sx={{color: 'rgb(0 0 0/0.6)'}} />
                    </Box>
                  </label>
                  <input
                    id="upload"
                    type="file"
                    accept="image/*"
                    multiple
                    style={{display: 'none'}}
                    onChange={handleFileChange}
                  />
                </Box>
                <Box sx={{marginRight: '14px'}}>
                  <label htmlFor="upload" className="cursor-pointer">
                    <Box
                      component="span"
                      sx={{
                        borderRadius: '50%',
                        padding: '0.7rem',
                        display: 'flex',
                        alignItems: 'center',
                        background: '#f4f2ee',
                        ':hover': {
                          boxShadow:
                            '0px 0px 0px 1px rgb(140 140 140/.2) ,0px 4px 4px rgb(0 0 0/.3)',
                          cursor: 'pointer',
                        },
                      }}>
                      <CalendarMonthIcon sx={{color: 'rgb(0 0 0/0.6)'}} />
                    </Box>
                  </label>
                  <input
                    id="upload"
                    type="file"
                    accept="image/*"
                    multiple
                    style={{display: 'none'}}
                    onChange={handleFileChange}
                  />
                </Box>
                <Box sx={{marginRight: '14px'}}>
                  <label htmlFor="upload" className="cursor-pointer">
                    <Box
                      component="span"
                      sx={{
                        borderRadius: '50%',
                        padding: '0.7rem',
                        display: 'flex',
                        alignItems: 'center',
                        background: '#f4f2ee',
                        ':hover': {
                          boxShadow:
                            '0px 0px 0px 1px rgb(140 140 140/.2) ,0px 4px 4px rgb(0 0 0/.3)',
                          cursor: 'pointer',
                        },
                      }}>
                      <InsertPhotoIcon sx={{color: 'rgb(0 0 0/0.6)'}} />
                    </Box>
                  </label>
                  <input
                    id="upload"
                    type="file"
                    accept="image/*"
                    multiple
                    style={{display: 'none'}}
                    onChange={handleFileChange}
                  />
                </Box>
              </Box>
            </Box>
          )}

          {/* <Divider light={true} sx={{my: '10px'}} /> */}
          <Box
            sx={{
              marginTop: '1px',
              display: 'flex',
              justifyContent: 'flex-end',
            }}>
            <Button
              disabled={loader || !(inputValue.length > 0)}
              variant="contained"
              onClick={handleCreatePost}
              sx={{
                height: '25px',
                overflow: 'hidden',
                padding: '0 18px',
                borderRadius: '18px',
                background: '#0a66c2',
                ':hover': {
                  background: '#004182',
                },
              }}>
              Post
            </Button>
          </Box>
        </Box>
      </Box>
    </Modal>
  )
}

export default ShareBoxModal
