/* eslint-disable operator-linebreak */
/* eslint-disable indent */
/* eslint-disable quote-props */
/* eslint-disable quotes */
import * as React from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Badge from '@mui/material/Badge'
import MenuItem from '@mui/material/MenuItem'
import Menu from '@mui/material/Menu'
import AccountCircle from '@mui/icons-material/AccountCircle'
import NotificationsIcon from '@mui/icons-material/Notifications'
import MoreIcon from '@mui/icons-material/MoreVert'
import Image from 'next/image'
import logoLinkedin from '@/components/images/LinkedIn_icon.svg.png'
import DefaultUserImg from '@/components/images/default_user_placeholder.jpg'
import {Home, Message, People, Work} from '@mui/icons-material'
import {Button, Divider} from '@mui/material'
import Link from 'next/link'
import {useAppDispatch} from '@/components/store/hooks'
import {removeLoginToken} from '@/components/store/slices/auth/reducer'
import {deleteCookie} from 'cookies-next'
import {USER_DETAILS, USER_ID, USER_TOKEN} from '@/components/utils/AppConfig'
import {ToasterMessage} from '@/components/helpers/ToastMessage'
import Backdrop from '@mui/material/Backdrop'
import SearchBox from './SearchBox'
import {LoggedInUserDetails} from '@/components/utils/SelectorConfig'
import {
  removeLoggedInUserDetails,
  removeLoggedInUserId,
} from '@/components/store/slices/user/reducer'

export default function AuthHeader(): React.JSX.Element {
  const dispatch = useAppDispatch()
  const userDetails = LoggedInUserDetails()

  const [openBackdrop, setOpenBackdrop] = React.useState(false)
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] =
    React.useState<null | HTMLElement>(null)

  const isMenuOpen = Boolean(anchorEl)
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl)

  const handleProfileMenuOpen = (
    event: React.MouseEvent<HTMLElement>,
  ): void => {
    setAnchorEl(event.currentTarget)
  }

  const handleMobileMenuClose = (): void => {
    setMobileMoreAnchorEl(null)
  }

  const handleMenuClose = (): void => {
    setAnchorEl(null)
    handleMobileMenuClose()
  }

  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>): void => {
    setMobileMoreAnchorEl(event.currentTarget)
  }

  const menuId = 'primary-search-account-menu'
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      className="main_header_dropdown"
      open={isMenuOpen}
      onClose={handleMenuClose}>
      <Link
        style={{textDecoration: 'none'}}
        href={`/profile/${userDetails?.name?.replace(
          /\s+/g,
          '-',
        )}-${userDetails?._id}`}>
        <MenuItem onClick={handleMenuClose}>
          <Image
            src={userDetails?.profileImage ?? DefaultUserImg}
            width={50}
            height={50}
            className="profile-image"
            alt="profile-image"
          />
          <Typography
            variant="h4"
            component="h2"
            sx={{
              lineHeight: '1.25',
              color: 'rgba(0,0,0,0.9)',
              fontSize: '16px',
              marginLeft: '10px',
            }}>
            {userDetails?.name}
            <Typography
              variant="h4"
              component="p"
              sx={{
                lineHeight: '1.50',
                color: 'rgba(0,0,0,0.9)',
                fontSize: '14px',
                marginTop: '10px',
              }}>
              {userDetails != null && userDetails?.workExperience?.length > 0
                ? `${userDetails?.workExperience[0]?.companyName}`
                : 'Full Stack Developer at Adobe Oraganiztion'}
            </Typography>
          </Typography>
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>
          <Button
            sx={{
              padding: '1px 10px',
              width: '100%',
              border: '1px solid #0a66c2',
              marginTop: '10px',
              ':hover': {
                backgroundColor: 'none !important',
              },
            }}>
            View Profile
          </Button>
        </MenuItem>
      </Link>
      <Divider light={true} />
      <Typography
        variant="h4"
        component="h2"
        sx={{
          lineHeight: '1.50',
          color: 'rgba(0,0,0,0.9)',
          fontSize: '15px',
          margin: '10px 0px 10px 16px',
          fontWeight: '550',
        }}>
        Account
      </Typography>
      <Typography sx={{fontSize: '14px'}}>
        <Link href="#" className="dropdown-menu">
          Settings & Privacy
        </Link>
      </Typography>
      <Typography sx={{fontSize: '14px', marginTop: '6px'}}>
        <Link href="#" className="dropdown-menu">
          Help
        </Link>
      </Typography>
      <Typography
        sx={{fontSize: '14px', marginTop: '6px', marginBottom: '10px'}}>
        <Link href="#" className="dropdown-menu">
          Language
        </Link>
      </Typography>
      <Divider light={true} />

      <Typography
        variant="h4"
        component="h2"
        sx={{
          lineHeight: '1.50',
          color: 'rgba(0,0,0,0.9)',
          fontSize: '15px',
          margin: '10px 0px 10px 16px',
          fontWeight: '550',
        }}>
        Manage
      </Typography>
      <Typography sx={{fontSize: '14px'}}>
        <Link href="#" className="dropdown-menu">
          Posts & Activity
        </Link>
      </Typography>
      <Typography sx={{fontSize: '14px', marginTop: '6px'}}>
        <Link href="#" className="dropdown-menu">
          Company
        </Link>
      </Typography>
      <Typography
        sx={{fontSize: '14px', marginTop: '6px', marginBottom: '10px'}}>
        <Link href="#" className="dropdown-menu">
          Company
        </Link>
      </Typography>
      <Divider light={true} />
      <Typography
        sx={{fontSize: '14px', marginTop: '6px', marginBottom: '10px'}}>
        <Link
          href="/login"
          className="dropdown-menu"
          onClick={() => {
            dispatch(removeLoginToken())
            dispatch(removeLoggedInUserId())
            dispatch(removeLoggedInUserDetails())
            deleteCookie(USER_TOKEN)
            deleteCookie(USER_ID)
            deleteCookie(USER_DETAILS)
            ToasterMessage('success', 'Logout Successfully')
          }}>
          Sign out
        </Link>
      </Typography>
    </Menu>
  )

  const mobileMenuId = 'primary-search-account-menu-mobile'
  const renderMobileMenu = (
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
      className="main_header_dropdown"
      onClose={handleMobileMenuClose}>
      <MenuItem>
        <IconButton
          disabled
          size="large"
          aria-label="show 4 new mails"
          className="header_icon"
          color="inherit">
          <Home />
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem>
        <IconButton
          size="large"
          disabled
          aria-label="show 4 new mails"
          className="header_icon"
          color="inherit">
          <People />
        </IconButton>
        <p>Network</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          disabled
          size="large"
          aria-label="show 4 new mails"
          className="header_icon"
          color="inherit">
          <Work />
        </IconButton>
        <p>Jobs</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          disabled
          aria-label="show 17 new notifications"
          className="header_icon"
          color="inherit">
          <Badge badgeContent={0} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
    </Menu>
  )
  const handleCloseBackdrop = (): void => {
    setOpenBackdrop(false)
  }
  const onFocusedInput = (): void => {
    setOpenBackdrop(true)
  }

  return (
    <>
      <Backdrop
        sx={{color: '#fff', zIndex: 999}}
        open={openBackdrop}
        onClick={handleCloseBackdrop}></Backdrop>
      <Box className="header">
        <Box sx={{flexGrow: 1}} className="global_header">
          <AppBar position="static">
            <Toolbar>
              <Link href="/">
                <Image
                  src={logoLinkedin}
                  width={36}
                  height={36}
                  alt="linkedin-logo"
                  style={{marginTop: '6px'}}
                />{' '}
              </Link>
              <SearchBox
                onFocusedInput={onFocusedInput}
                openBackdrop={openBackdrop}
              />
              <Box sx={{flexGrow: 1}} />
              <Box sx={{display: {xs: 'none', md: 'flex', gap: '13px'}}}>
                <Link href="/">
                  <IconButton
                    size="large"
                    aria-label="show 4 new mails"
                    className="header_icon"
                    color="inherit">
                    <Home />
                    <Typography variant="h5">Home</Typography>
                  </IconButton>
                </Link>
                <Link href="/groups">
                  <IconButton
                    size="large"
                    aria-label="show 4 new mails"
                    className="header_icon"
                    color="inherit">
                    <People />
                    <Typography variant="h5">Groups</Typography>
                  </IconButton>
                </Link>

                <IconButton
                  disabled
                  size="large"
                  aria-label="show 4 new mails"
                  className="header_icon"
                  color="inherit">
                  <Work />
                  <Typography variant="h5">Coming Soon</Typography>
                </IconButton>
                <IconButton
                  disabled
                  size="large"
                  aria-label="show 4 new mails"
                  className="header_icon"
                  color="inherit">
                  <Message />
                  <Typography variant="h5">Coming Soon</Typography>
                </IconButton>

                <IconButton
                  disabled
                  size="large"
                  aria-label="show 17 new notifications"
                  className="header_icon"
                  color="inherit">
                  <Badge badgeContent={0} color="error">
                    <NotificationsIcon />
                  </Badge>
                  <Typography variant="h5">Coming Soon</Typography>
                </IconButton>
                <IconButton
                  size="large"
                  edge="end"
                  aria-label="account of current user"
                  className="header_icon"
                  aria-controls={menuId}
                  aria-haspopup="true"
                  onClick={handleProfileMenuOpen}
                  color="inherit">
                  <AccountCircle />
                  <Typography variant="h5">Me</Typography>
                </IconButton>
              </Box>
              <Box sx={{display: {xs: 'flex', md: 'none'}}}>
                <IconButton
                  size="large"
                  edge="end"
                  aria-label="account of current user"
                  className="header_icon"
                  aria-controls={menuId}
                  aria-haspopup="true"
                  onClick={handleProfileMenuOpen}
                  color="inherit">
                  <AccountCircle />
                  <Typography variant="h5">Me</Typography>
                </IconButton>
                <IconButton
                  size="large"
                  aria-label="show more"
                  aria-controls={mobileMenuId}
                  aria-haspopup="true"
                  onClick={handleMobileMenuOpen}
                  className="header_more_icon"
                  color="inherit">
                  <MoreIcon />
                </IconButton>
              </Box>
            </Toolbar>
          </AppBar>
          {renderMobileMenu}
          {renderMenu}
        </Box>
      </Box>
    </>
  )
}
