/* eslint-disable max-len */
/* eslint-disable quote-props */
/* eslint-disable prettier/prettier */
import {Box, Button} from '@mui/material'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import ProfileImage from '../../../images/linkedin_profile.jpg'
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'
import ArticleIcon from '@mui/icons-material/Article'
import ShareBoxModal from './ShareBoxModal'
import {type PostTypes} from '@/components/utils/TypeConfig'
interface ShareBoxFeedProps {
  readonly setFeedContent: React.Dispatch<React.SetStateAction<PostTypes[]>>
}
function ShareBoxFeed({setFeedContent}: ShareBoxFeedProps): React.JSX.Element {
  const [open, setOpen] = React.useState(false)

  const handleOpen = (): void => {
    setOpen(true)
  }
  const handleClose = (): void => {
    setOpen(false)
  }

  return (
    <Box className="avatar" sx={{margin: '0 0 .8rem', background: '#fff', borderRadius: '0.4rem'}}>
      <Box
        sx={{
          padding: '.8rem 1.6rem 0',
          display: 'flex',
          alignItems: 'center',
        }}>
        <Link href="/profile">
          <Box sx={{marginRight: '0.8rem'}} className="border_radius-50">
            <Image src={ProfileImage} width={48} height={48} alt="avatar" />
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
      <ShareBoxModal open={open} onClose={handleClose} setFeedContent={setFeedContent} />
    </Box>
  )
}

export default ShareBoxFeed
