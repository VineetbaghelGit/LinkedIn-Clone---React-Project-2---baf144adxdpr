/* eslint-disable operator-linebreak */
/* eslint-disable indent */
/* eslint-disable max-len */
/* eslint-disable quote-props */
/* eslint-disable prettier/prettier */

import {Box, Button, Typography} from '@mui/material'
import Image from 'next/image'
import React, {useEffect, useState} from 'react'
import DefaultPlaceholderImg from '@/components/images/default-placeholder.jpg'
import LinkedinBannerDefault from '@/components/images/linkedin_banner.png'
import PersonAddIcon from '@mui/icons-material/PersonAdd'
import ExperienceSection from './ExperienceSection'
import EducationSection from './EducationSection'
import SkillsSection from './SkillsSection'
import {useParams} from 'next/navigation'
import {
  type ApiResponseType,
  type UserProfileType,
} from '@/components/utils/TypeConfig'
import {ToasterMessage} from '@/components/helpers/ToastMessage'
import CheckIcon from '@mui/icons-material/Check'
import ApiUtils from '@/components/apis/ApiUtils'
import {LoggedInUserDetails} from '@/components/utils/SelectorConfig'
import DefaultUserImg from '@/components/images/default_user_placeholder.jpg'
import Link from 'next/link'

function ProfileLeftAside(): React.JSX.Element {
  const searchParams = useParams()
  const [userData, setUserData] = useState<UserProfileType>()
  const userDetails = LoggedInUserDetails()

  useEffect(() => {
    if (typeof searchParams?.slug === 'string') {
      const id = searchParams?.slug?.split('-').pop() ?? ''
      void fetchUserInfo(id)
    }
  }, [searchParams])
  async function fetchUserInfo(userId: string): Promise<void> {
    try {
      const response: ApiResponseType = (await ApiUtils.getUserDetails(
        `/${userId}`,
      )) as ApiResponseType
      setUserData(response?.data)
    } catch (err: any) {
      ToasterMessage('error', err?.response?.data.message)
    }
  }
  const handleFollowFeature = async (userId: string): Promise<void> => {
    if (userData?.isFollowed ?? false) {
      try {
        await ApiUtils.unfollowUser(`/${userId}`)
        ToasterMessage('success', 'User unfollowed successfully')
        void fetchUserInfo(userId)
      } catch (err: any) {
        ToasterMessage('error', err?.response?.data.message)
      }
    } else {
      try {
        const response: any = await ApiUtils.followUser(`/${userId}`)
        ToasterMessage('success', response?.message)
        void fetchUserInfo(userId)
      } catch (err: any) {
        ToasterMessage('error', err?.response?.data.message)
      }
    }
  }

  return (
    <>
      <Box
        className="user_info_card"
        sx={{
          margin: '0 0 .8rem',
          background: '#fff',
          borderRadius: '0.4rem',
        }}>
        <Box
          sx={{
            width: '100%',
            cursor: 'pointer',
            borderTopLeftRadius: '0.8rem',
          }}>
          <Image
            width={100}
            height={100}
            style={{
              objectFit: 'contain',
              borderTopLeftRadius: '0.6rem',
              borderTopRightRadius: '0.6rem',
            }}
            alt="banner-imge"
            layout="responsive"
            src={LinkedinBannerDefault}
          />
        </Box>
        <Box sx={{padding: '1.4rem', pb: '1rem'}}>
          <Box className="border_radius-50" sx={{mt: '-113px'}}>
            <Image
              src={userData?.profileImage ?? DefaultUserImg}
              style={{zIndex: 100, border: '4px solid #fff'}}
              height={130}
              width={130}
              alt="user_profile"
            />
          </Box>
          <Box
            sx={{
              mt: '0.5rem',
              ml: '0.8rem',
              display: 'flex',
              justifyContent: 'space-between',
              flex: 'wrap',
            }}>
            <Box>
              <Typography
                component="h1"
                sx={{
                  fontWeight: '550',
                  color: 'rgb(0 0 0/.8)',
                  fontSize: '1.2rem',
                }}>
                {userData?.name}
              </Typography>
              <Typography
                component="p"
                sx={{fontSize: '13px', color: 'rgb(0 0 0/.8)'}}>
                {userData != null && userData?.workExperience?.length > 0
                  ? `${userData?.workExperience[0]?.designation} at ${userData?.workExperience[0]?.companyName}`
                  : 'Adobe Oraganiztion'}
              </Typography>

              <Typography
                component="p"
                sx={{fontSize: '12px', color: 'rgb(0 0 0/.6)', mt: '6px'}}>
                {userData != null && userData?.address.length > 0
                  ? `${userData?.address[0]?.state}, ${userData?.address[0]?.country}`
                  : 'Maharashtra, India'}
              </Typography>
              <Typography
                component="a"
                sx={{
                  fontSize: '13px',
                  fontWeight: '550',
                  color: '#1976D2',
                  mt: '6px',
                  cursor: 'not-allowed',
                  '&:hover': {
                    textDecoration: 'underline',
                  },
                }}>
                500+ connections
              </Typography>
            </Box>
            <Box className="job_education">
              <Box sx={{display: 'flex', alignItems: 'center', gap: '8px'}}>
                <Image
                  alt="company_img"
                  src={DefaultPlaceholderImg}
                  width={30}
                  height={30}
                  style={{borderRadius: '50%'}}
                />
                <Typography
                  component="h2"
                  sx={{
                    fontSize: '14px',
                    fontWeight: '550',
                    color: 'rgb(0 0 0/.8)',
                  }}>
                  {userData != null && userData?.workExperience?.length > 0
                    ? `${userData?.workExperience[0]?.companyName}`
                    : 'Adobe Oraganiztion'}
                </Typography>
              </Box>

              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  mt: '10px',
                }}>
                <Image
                  alt="company_img"
                  src={DefaultPlaceholderImg}
                  width={30}
                  height={30}
                  style={{borderRadius: '50%'}}
                />
                <Typography
                  component="h2"
                  sx={{
                    fontSize: '14px',
                    fontWeight: '550',
                    color: 'rgb(0 0 0/.8)',
                  }}>
                  {userData != null && userData?.education?.length > 0
                    ? userData?.education[0]?.schoolName
                    : 'Shri Ram College of Engineering'}
                </Typography>
              </Box>
            </Box>
          </Box>
          <Box
            sx={{
              display: 'flex',
              gap: '10px',
              alignItems: 'center',
              ml: '0.7rem',
            }}>
            {userData?._id === userDetails?._id ? (
              <Button
                variant="contained"
                sx={{
                  margin: '0.5rem 0',
                  height: '34px',
                  overflow: 'hidden',
                  padding: '10px',
                  borderRadius: '28px',
                  fontSize: '12px',
                  cursor: 'not-allowed',
                  background: '#0a66c2',
                  ':hover': {background: '#004182'},
                }}>
                Open to
              </Button>
            ) : (
              <Button
                variant="contained"
                onClick={async () => {
                  if (userData != null) {
                    await handleFollowFeature(userData._id)
                  }
                }}
                sx={{
                  margin: '0.5rem 0',
                  height: '34px',
                  overflow: 'hidden',
                  padding: '10px',
                  borderRadius: '28px',
                  fontSize: '12px',
                  background: '#0a66c2',
                  ':hover': {background: '#004182'},
                }}>
                {' '}
                {userData?.isFollowed ?? false ? (
                  <CheckIcon sx={{fontSize: '1.1rem', mr: '5px'}} />
                ) : (
                  <PersonAddIcon sx={{fontSize: '1.1rem', mr: '5px'}} />
                )}
                {userData?.isFollowed ?? false ? 'Following' : 'Follow'}
              </Button>
            )}
            {userData?._id !== userDetails?._id && (
              <Link
                href={userData?._id === userDetails?._id ? '#' : '/message'}>
                <Button
                  variant="outlined"
                  sx={{
                    margin: '0.5rem 0',
                    height: '34px',
                    overflow: 'hidden',
                    padding: '10px',
                    borderRadius: '28px',
                    fontSize: '12px',
                    color: '#0a66c2',
                  }}>
                  Message
                </Button>
              </Link>
            )}
          </Box>
        </Box>
      </Box>
      <ExperienceSection workingDetails={userData?.workExperience} />
      <EducationSection educationDetails={userData?.education} />
      <SkillsSection skillsDetails={userData?.skills} />
    </>
  )
}

export default ProfileLeftAside
