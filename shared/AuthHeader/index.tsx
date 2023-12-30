/* eslint-disable indent */
/* eslint-disable quote-props */
/* eslint-disable quotes */
import * as React from 'react'
import {styled, alpha} from '@mui/material/styles'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import InputBase from '@mui/material/InputBase'
import Badge from '@mui/material/Badge'
import MenuItem from '@mui/material/MenuItem'
import Menu from '@mui/material/Menu'
import SearchIcon from '@mui/icons-material/Search'
import AccountCircle from '@mui/icons-material/AccountCircle'
import NotificationsIcon from '@mui/icons-material/Notifications'
import MoreIcon from '@mui/icons-material/MoreVert'
import Image from 'next/image'
import logoLinkedin from '@/components/images/LinkedIn_icon.svg.png'
import ProfileImage from '@/components/images/linkedin_profile.jpg'
import {Home, Message, People, Work} from '@mui/icons-material'
import {Button, Divider} from '@mui/material'
import Link from '@mui/material/Link'
import {useAppDispatch} from '@/components/store/hooks'
import {removeLoginToken} from '@/components/store/slices/auth/reducer'
import {deleteCookie} from 'cookies-next'
import {USER_TOKEN} from '@/components/utils/AppConfig'

const Search = styled('div')(({theme}) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}))

const SearchIconWrapper = styled('div')(({theme}) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}))

const StyledInputBase = styled(InputBase)(({theme}) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}))

export default function AuthHeader(): React.JSX.Element {
  const dispatch = useAppDispatch()
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
      className="header_dropdown"
      open={isMenuOpen}
      onClose={handleMenuClose}>
      <MenuItem onClick={handleMenuClose}>
        <Image
          src={ProfileImage}
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
          Vineet Baghel
          <Typography
            variant="h4"
            component="p"
            sx={{
              lineHeight: '1.50',
              color: 'rgba(0,0,0,0.9)',
              fontSize: '14px',
              marginTop: '10px',
            }}>
            Frontend Developer at Tecmantras Solution
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
        <Link
          href="#"
          underline="hover"
          sx={{color: 'gray', marginLeft: '16px'}}>
          Settings & Privacy
        </Link>
      </Typography>
      <Typography sx={{fontSize: '14px', marginTop: '6px'}}>
        <Link
          href="#"
          underline="hover"
          sx={{color: 'gray', marginLeft: '16px'}}>
          Help
        </Link>
      </Typography>
      <Typography
        sx={{fontSize: '14px', marginTop: '6px', marginBottom: '10px'}}>
        <Link
          href="#"
          underline="hover"
          sx={{color: 'gray', marginLeft: '16px'}}>
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
        <Link
          href="#"
          underline="hover"
          sx={{color: 'gray', marginLeft: '16px'}}>
          Posts & Activity
        </Link>
      </Typography>
      <Typography sx={{fontSize: '14px', marginTop: '6px'}}>
        <Link
          href="#"
          underline="hover"
          sx={{color: 'gray', marginLeft: '16px'}}>
          Company
        </Link>
      </Typography>
      <Typography
        sx={{fontSize: '14px', marginTop: '6px', marginBottom: '10px'}}>
        <Link
          href="#"
          underline="hover"
          sx={{color: 'gray', marginLeft: '16px'}}>
          Company
        </Link>
      </Typography>
      <Divider light={true} />
      <Typography
        sx={{fontSize: '14px', marginTop: '6px', marginBottom: '10px'}}>
        <Link
          onClick={() => {
            dispatch(removeLoginToken())
            deleteCookie(USER_TOKEN)
          }}
          underline="hover"
          sx={{color: 'gray', marginLeft: '16px', cursor: 'pointer'}}>
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
      className="header_dropdown"
      onClose={handleMobileMenuClose}>
      <MenuItem>
        <IconButton
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
          aria-label="show 4 new mails"
          className="header_icon"
          color="inherit">
          <People />
        </IconButton>
        <p>Network</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
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
          aria-label="show 17 new notifications"
          className="header_icon"
          color="inherit">
          <Badge badgeContent={17} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
    </Menu>
  )

  return (
    <Box className="header">
      <Box sx={{flexGrow: 1}} className="global_header">
        <AppBar position="static">
          <Toolbar>
            <Image
              src={logoLinkedin}
              width={36}
              height={36}
              alt="linkedin-logo"
            />{' '}
            <Search>
              <SearchIconWrapper>
                <SearchIcon className="search_icon-header" />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{'aria-label': 'search'}}
              />
            </Search>
            <Box sx={{flexGrow: 1}} />
            <Box sx={{display: {xs: 'none', md: 'flex', gap: '13px'}}}>
              <IconButton
                size="large"
                aria-label="show 4 new mails"
                className="header_icon"
                color="inherit">
                <Home />
                <Typography variant="h5">Home</Typography>
              </IconButton>
              <IconButton
                size="large"
                aria-label="show 4 new mails"
                className="header_icon"
                color="inherit">
                <People />
                <Typography variant="h5">Network</Typography>
              </IconButton>

              <IconButton
                size="large"
                aria-label="show 4 new mails"
                className="header_icon"
                color="inherit">
                <Work />
                <Typography variant="h5">Jobs</Typography>
              </IconButton>
              <IconButton
                size="large"
                aria-label="show 4 new mails"
                className="header_icon"
                color="inherit">
                <Message />
                <Typography variant="h5">Messaging</Typography>
              </IconButton>

              <IconButton
                size="large"
                aria-label="show 17 new notifications"
                className="header_icon"
                color="inherit">
                <Badge badgeContent={17} color="error">
                  <NotificationsIcon />
                </Badge>
                <Typography variant="h5">Notifications</Typography>
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
  )
}
