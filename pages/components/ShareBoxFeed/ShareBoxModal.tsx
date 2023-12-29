/* eslint-disable indent */
/* eslint-disable quote-props */
/* eslint-disable prettier/prettier */
import {Box, Button, TextField} from '@mui/material'
import Image from 'next/image'
import React, {useEffect, useRef, useState} from 'react'
import ProfileImage from '../../../images/linkedin_profile.jpg'
import Modal from '@mui/material/Modal'
import Popover from '@mui/material/Popover'
// eslint-disable-next-line max-len
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt'
import Typography from '@mui/material/Typography'
import {type EmojiClickData} from 'emoji-picker-react'
import EmojiPicker from 'emoji-picker-react'

const style = {
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  boxShadow: 24,
  borderRadius: '0.8rem',
  p: 4,
  height: '85vh',
  ':focus-visible': {
    outline: 'none',
  },
}

interface ShareModalProps {
  open: boolean
  onClose: () => void
}

const ShareBoxModal: React.FC<ShareModalProps> = ({open, onClose}) => {
  const [inputValue, setInputValue] = useState<string>('')
  const [showEmojiPicker, setShowEmojiPicker] = React.useState(false)
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null)
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
                  src={ProfileImage}
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
                  Vineet Baghel
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
                    marginLeft: '-23px',
                  }}>
                  Post to Anyone
                </Box>
              </Box>
            </Button>
          </Box>

          <Box className="share_text_editor" sx={{margin: '0.7rem 1rem'}}>
            <TextField
              variant="standard"
              multiline
              rows={12}
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
        </Box>
      </Box>
    </Modal>
  )
}

export default ShareBoxModal