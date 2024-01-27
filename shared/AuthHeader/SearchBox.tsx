/* eslint-disable indent */
/* eslint-disable max-len */
/* eslint-disable prettier/prettier */
/* eslint-disable quote-props */
import {styled, alpha} from '@mui/material/styles'
import Image from 'next/image'
import SearchIcon from '@mui/icons-material/Search'
import InputBase from '@mui/material/InputBase'
import React, {useEffect, useState} from 'react'
import {Box, Typography} from '@mui/material'
import ProfileImage from '@/components/images/linkedin_profile.jpg'
import Link from 'next/link'
import ApiUtils from '@/components/apis/ApiUtils'
import {type PostTypes} from '@/components/utils/TypeConfig'
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
interface SearchBoxProps {
  onFocusedInput: () => void
  openBackdrop: boolean
}

function SearchBox({
  onFocusedInput,
  openBackdrop,
}: Readonly<SearchBoxProps>): React.JSX.Element {
  const [searchInputValue, setSearchInputValue] = useState('')
  const [errorMsg, setErrorMsg] = useState('')
  const [searchedData, setSearchedData] = useState<PostTypes[]>([])

  useEffect(() => {
    if (!openBackdrop) {
      setSearchedData([])
    }
  }, [openBackdrop])
  useEffect(() => {
    if (searchInputValue.length > 0) {
      const fetchData = setTimeout(async () => {
        try {
          const response: any = await ApiUtils.searchFilter(
            `?search=${encodeURIComponent(
              '{"author.name":"' + searchInputValue + '"}',
            )}`,
          )
          setSearchedData(response?.data)
        } catch (err: any) {
          setSearchedData([])
          setErrorMsg(err?.response?.data?.message)
        }
      }, 500)
      return () => {
        clearTimeout(fetchData)
      }
    }
  }, [searchInputValue])
  return (
    <>
      <Search sx={{position: 'relative'}}>
        <SearchIconWrapper>
          <SearchIcon className="search_icon-header" />
        </SearchIconWrapper>
        <StyledInputBase
          placeholder="Search…"
          inputProps={{'aria-label': 'search'}}
          onChange={(e: any) => {
            setSearchInputValue(e.target.value)
          }}
          onFocus={onFocusedInput}
          value={searchInputValue}
        />
      </Search>
      {openBackdrop && searchInputValue.length > 0 && (
        <Box
          sx={{
            position: 'absolute',
            top: '80px',
            left: '80px',
            background: '#fff',
            borderRadius: '0.4rem',
            width: '300px',
            padding: '10px 13px',
          }}>
          {searchedData.length > 0 ? (
            searchedData.map(data => {
              return (
                <Box
                  key={data?._id}
                  sx={{
                    display: 'flex',
                    flexGrow: '1',
                    overflow: 'hidden',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    mt: '10px',
                  }}>
                  <Box
                    className="content_feed_name"
                    sx={{
                      flexGrow: '1',
                      overflow: 'hidden',
                    }}>
                    <Link
                      href={`/profile/${data?.author.name.replace(
                        /\s+/g,
                        '-',
                      )}-${data?.author._id}`}>
                      <Box
                        component="span"
                        sx={{
                          display: 'flex',
                          color: 'rgb(0 0 0/0.8)',
                          fontWeight: '550',
                          fontSize: '13px',
                        }}>
                        {data?.title}
                      </Box>
                    </Link>
                  </Box>
                  <Box className="border_radius-50">
                    <Image
                      src={ProfileImage}
                      height={30}
                      width={30}
                      alt="user_profile"
                    />
                  </Box>
                </Box>
              )
            })
          ) : (
            <Typography
              sx={{color: '#000', textAlign: 'center', fontSize: '14px'}}>
              {errorMsg}
            </Typography>
          )}
        </Box>
      )}
    </>
  )
}

export default SearchBox
