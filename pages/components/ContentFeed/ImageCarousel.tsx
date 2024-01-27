import {Box} from '@mui/material'
import Image from 'next/image'
import React from 'react'
import AliceCarousel from 'react-alice-carousel'
import 'react-alice-carousel/lib/alice-carousel.css'
interface ImageCarouselProps {
  readonly content: string[]
}
function ImageCarousel({content}: ImageCarouselProps): React.JSX.Element {
  const techResponsive = {
    0: {items: 1},
  }
  const handleDragStart = (e: React.DragEvent<HTMLImageElement>): void => {
    e.preventDefault()
  }
  return (
    <Box component="div" sx={{marginTop: '14px'}}>
      <AliceCarousel
        mouseTracking
        items={content?.map((img: string) => (
          <div key={img} className="banner">
            <Image
              src={img}
              onDragStart={handleDragStart}
              alt="img"
              height={400}
              width={500}
              layout="responsive"
              priority
              style={{objectFit: 'contain'}}
            />
          </div>
        ))}
        responsive={techResponsive}
        controlsStrategy="alternate"
        autoPlay={false}
        autoPlayInterval={1200}
        infinite={false}
        animationDuration={1500}
        disableButtonsControls={content?.length < 2}
        disableDotsControls={true}
      />
    </Box>
  )
}

export default ImageCarousel
