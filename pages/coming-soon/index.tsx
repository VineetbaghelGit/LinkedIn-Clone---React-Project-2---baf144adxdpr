/* eslint-disable quote-props */
import AuthHeader from '@/components/shared/AuthHeader'
import {Button} from '@mui/material'
import Link from 'next/link'
import React from 'react'

function Index(): React.JSX.Element {
  return (
    <div>
      <AuthHeader />
      <div className="coming-soon-wrapper">
        <h1>
          Coming soon<span className="dot">.</span>
        </h1>
        <p>We are building our website.</p>
        <Link href="/">
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
            Go to your feed
          </Button>
        </Link>
      </div>
    </div>
  )
}

export default Index
