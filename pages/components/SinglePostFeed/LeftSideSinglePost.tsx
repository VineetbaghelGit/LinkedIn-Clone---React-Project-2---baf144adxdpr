/* eslint-disable indent */
/* eslint-disable prettier/prettier */
import {type PostTypes} from '@/components/utils/TypeConfig'
import {Box, Stack, Typography} from '@mui/material'
import Image from 'next/image'
import DefaultUserImg from '@/components/images/default_user_placeholder.jpg'
import Link from 'next/link'
import React from 'react'
interface PostProps {
  content: PostTypes
}
function LeftSideSinglePost({content}: PostProps): React.JSX.Element {
  return (
    <Stack
      sx={{
        marginBottom: '0.8rem',
        boxShadow: '0px 0px 0px 1px rgb(140 140 140/.2)',
        border: 'none',
        position: 'relative',
        borderRadius: '0.4rem',
        background: '#fff',
      }}>
      <Box sx={{padding: '1.2rem 1.2rem 1.6rem'}}>
        <Box className="bg_linkedin_main"></Box>
        <Link
          style={{textDecoration: 'none'}}
          href={`/profile/${content?.author?.name?.replace(
            /\s+/g,
            '-',
          )}-${content?.author?._id}`}>
          {' '}
          <Box sx={{display: 'flex', justifyContent: 'center'}}>
            <Image
              className="member_photo"
              src={content?.author?.profileImage ?? DefaultUserImg}
              width={64}
              height={64}
              alt="profile_image"
            />
          </Box>
          <Box
            sx={{
              color: 'rgb(0 0 0/.9)',
              fontSize: '15px',
              lineHeight: '1.5',
              textAlign: 'center',
            }}>
            {content?.author?.name}
          </Box>
          <Typography
            sx={{
              fontSize: '12px',
              lineHeight: '1.4',
              color: 'rgb(0 0 0/.6)',
              marginTop: '0.4rem',
              textAlign: 'center',
            }}>
            Full Stack Developer at Adobe Oraganiztion
          </Typography>
        </Link>
      </Box>
    </Stack>
  )
}

export default LeftSideSinglePost
