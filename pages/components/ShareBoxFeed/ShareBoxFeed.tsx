/* eslint-disable indent */
/* eslint-disable max-len */
/* eslint-disable quote-props */
/* eslint-disable prettier/prettier */
import {Box, Button} from '@mui/material'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import DefaultUserImg from '@/components/images/default_user_placeholder.jpg'
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'
import ArticleIcon from '@mui/icons-material/Article'
import ShareBoxModal from './ShareBoxModal'
import {type PostTypes} from '@/components/utils/TypeConfig'
import {LoggedInUserDetails} from '@/components/utils/SelectorConfig'
interface ShareBoxFeedProps {
  // open: boolean
  // handleOpen: () => void
  // handleClose: () => void
  readonly setFeedContent: React.Dispatch<React.SetStateAction<PostTypes[]>>
}
function ShareBoxFeed({
  // open,
  // handleOpen,
  // handleClose,
  setFeedContent,
}: ShareBoxFeedProps): React.JSX.Element {
  const userDetails = LoggedInUserDetails()
  const [open, setOpen] = React.useState(false)
  const [postType, setPostType] = React.useState('')

  const handleOpen = (): void => {
    setOpen(true)
  }
  const handleClose = (): void => {
    setOpen(false)
  }

  return (
    <Box
      className="avatar"
      sx={{margin: '0 0 .8rem', background: '#fff', borderRadius: '0.4rem'}}>
      <Box
        sx={{
          padding: '.8rem 1.6rem 0',
          display: 'flex',
          alignItems: 'center',
        }}>
        <Link
          style={{textDecoration: 'none'}}
          href={`/profile/${userDetails?.name?.replace(
            /\s+/g,
            '-',
          )}-${userDetails?._id}`}>
          {' '}
          <Box sx={{marginRight: '0.8rem'}} className="border_radius-50">
            <Image
              src={userDetails?.profileImage ?? DefaultUserImg}
              width={48}
              height={48}
              alt="avatar"
            />
          </Box>
        </Link>
        <Box
          onClick={handleOpen}
          component="button"
          sx={{
            margin: '.4rem 0',
            border: '1px solid rgb(0 0 0/.3)',
            borderRadius: '35px',
            padding: '1.3rem',
            width: '100%',
            textAlign: 'left',
            cursor: 'pointer',
            background: '#fff',
          }}>
          <Box component="span" sx={{color: 'rgb(0 0 0/.6)'}}>
            Start Post
          </Box>
        </Box>
      </Box>
      <Box
        className="toolbar_wrapper"
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-around',
          border: 'none',
          paddingBottom: '0.8rem',
        }}>
        <Button
          onClick={() => {
            handleOpen()
            setPostType('media')
          }}
          sx={{
            padding: '13px 15px',
            ':hover': {
              background: 'rgba(0,0,0,0.08)',
            },
          }}>
          <InsertPhotoIcon />
          <span>Media</span>
        </Button>
        <Button
          disabled
          sx={{
            padding: '13px 15px',
            ':hover': {
              background: 'rgba(0,0,0,0.08)',
            },
          }}>
          <CalendarMonthIcon sx={{color: '#C37D16'}} />
          <span>Event</span>
        </Button>
        <Button
          onClick={() => {
            handleOpen()
            setPostType('article')
          }}
          sx={{
            padding: '13px 15px',
            ':hover': {
              background: 'rgba(0,0,0,0.08)',
            },
          }}>
          <ArticleIcon sx={{color: '#E06847'}} />
          <span>Write Article</span>
        </Button>
      </Box>
      <ShareBoxModal
        open={open}
        onClose={handleClose}
        setFeedContent={setFeedContent}
        postType={postType}
      />
    </Box>
  )
}

export default ShareBoxFeed
