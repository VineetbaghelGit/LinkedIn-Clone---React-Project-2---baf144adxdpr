/* eslint-disable max-len */
/* eslint-disable operator-linebreak */
/* eslint-disable prettier/prettier */
/* eslint-disable indent */
import React, {useEffect, useState} from 'react'
import Card from '@mui/material/Card'
// import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import DefaultUserImg from '@/components/images/default_user_placeholder.jpg'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import {Box, CardHeader} from '@mui/material'
// import MoreIcon from '@mui/icons-material/MoreVert'

import Image from 'next/image'
import CreateGrpModal from './CreateGrpModal'
import ApiUtils from '@/components/apis/ApiUtils'
import {ToasterMessage} from '@/components/helpers/ToastMessage'
interface GroupData {
  createdAt: string
  description: string
  image: string
  isEdited: boolean
  name: string
  __v: number
  _id: string
}
function GroupsList(): React.JSX.Element {
  const [open, setOpen] = React.useState(false)
  const [groupListData, setGroupListData] = useState<GroupData[]>([])
  console.log('🚀 ~ GroupsList ~ groupListData:', groupListData)
  const handleOpen = (): void => {
    setOpen(true)
  }
  const handleClose = (): void => {
    setOpen(false)
  }
  // const [mobileMoreAnchorEl, setMobileMoreAnchorEl] =
  //   React.useState<null | HTMLElement>(null)
  // const isMobileMenuOpen = Boolean(mobileMoreAnchorEl)

  // const mobileMenuId = 'primary-search-account-menu-mobile'
  // const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>): void => {
  //   setMobileMoreAnchorEl(event.currentTarget)
  // }
  // const handleMobileMenuClose = (): void => {
  //   setMobileMoreAnchorEl(null)
  // }

  // const deleteGroup = async (groupId: string): Promise<void> => {
  //   try {
  //     await ApiUtils.deleteGroup(`/${groupId}`)
  //     setMobileMoreAnchorEl(null)
  //     ToasterMessage('success', 'Group deleted successfully')
  //     void fetchGroupList()
  //   } catch (err: any) {
  //     ToasterMessage('error', err?.response?.data.message)
  //   }
  // }
  useEffect(() => {
    void fetchGroupList()
  }, [])
  async function fetchGroupList(): Promise<void> {
    try {
      const response: any = await ApiUtils.getGroupsList()
      setGroupListData(response?.data)
    } catch (err: any) {
      ToasterMessage('error', err?.response?.data.message)
    }
  }
  return (
    <Card className="groups-list-card">
      <CardHeader
        title="Your groups"
        sx={{borderBottom: '1px solid rgb(140 140 140/.2)'}}
        action={
          <Button
            className="create-grp-btn"
            variant="contained"
            onClick={handleOpen}
            sx={{
              background: 'transparent',
              boxShadow: 'none',
              borderRadius: '28px',
              height: '30px',
              color: '#1976D2',
              border: '1px solid #1976D2',
              textTransform: 'none',
            }}>
            Create group
          </Button>
        }
      />

      <CardContent>
        {groupListData?.length > 0
          ? groupListData?.map((data, index) => (
              <Box key={`${data._id}-${index}`}>
                <Box
                  sx={{
                    display: 'flex',
                    gap: '10px',
                    marginTop: '10px',
                  }}>
                  <Image
                    src={data?.image?.length > 0 ? data?.image : DefaultUserImg}
                    width={40}
                    height={40}
                    className="profile-image"
                    alt="profile-image"
                  />{' '}
                  <Box
                    sx={{
                      display: 'flex',
                      gap: '10px',
                      justifyContent: 'space-between',
                      width: '100%',
                    }}>
                    <Typography
                      gutterBottom
                      variant="h6"
                      component="a"
                      sx={{
                        fontSize: '15px',
                        cursor: 'pointer',
                      }}>
                      {data?.name}
                    </Typography>
                    {/* <CardActions>
                      <IconButton
                        size="large"
                        aria-label="show more"
                        aria-haspopup="true"
                        onClick={handleMobileMenuOpen}
                        className="header_more_icon"
                        color="inherit">
                        <MoreIcon />
                      </IconButton>{' '}
                    </CardActions> */}
                  </Box>
                </Box>
                {/* <Menu
                  anchorEl={mobileMoreAnchorEl}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={isMobileMenuOpen}
                  onClose={handleMobileMenuClose}>
                  <MenuItem>
                    <Typography sx={{fontSize: '13px'}}>View Group</Typography>
                  </MenuItem>
                  <MenuItem>
                    <Typography
                      sx={{fontSize: '13px'}}
                      onClick={() => {
                        void deleteGroup(data?._id)
                      }}>
                      Delete
                    </Typography>
                  </MenuItem>
                </Menu> */}
              </Box>
            ))
          : 'No data'}
      </CardContent>

      <CreateGrpModal
        open={open}
        onClose={handleClose}
        setGroupListData={setGroupListData}
      />
    </Card>
  )
}

export default GroupsList
