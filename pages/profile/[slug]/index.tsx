import {useParams} from 'next/navigation'
import React from 'react'

function Profile(): React.JSX.Element {
  const searchParams = useParams()
  console.log('🚀 ~ Profile ~ searchParams:', searchParams)
  // console.log(
  //     '🚀 ~ Profile ~ searchParams:',
  //     searchParams?.slug?.split('-').pop(),
  // )
  return <div>Profile</div>
}

export default Profile
