import React from 'react'
import Slider from 'react-slick'
import { useEffect, useState } from 'react'

import { Link } from 'react-router-dom'
import { Stars } from './Stars.jsx'

import { utilService } from '../../services/util.service.js'

export function ReviewsSlider({ reviews }) {
  console.log(reviews.length)

  if (reviews.length === 1) {
    const randomReview = utilService.getRandomReviewContent()
    reviews.push(randomReview)
  }

  //   useEffect(() => {
  //     console.log(randomGames)
  //   }, [randomGames])

  const settings = {
    dots: true,
    infinite: true,
    speed: 1500,
    autoplay: true,
    autoplaySpeed: 7000,
    slidesToShow: 3,
    slidesToScroll: 3,
    responsive: [
      {
        breakpoint: 500,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          dots: true,
          infinite: true,
          speed: 1500,
          autoplay: true,
          autoplaySpeed: 6500,
        },
      },
    ],
  }
  return (
    <div className='slider-container'>
      <div className='reviews-card-container'>
        <Slider {...settings}>
          {/* <div className='games-card-container'> */}
          {reviews.map((review) => {
            return (
              <div className='review-container' key={review.id}>
                <h4>{review.fullName}</h4>
                <h5>{review.date}</h5>
                <Stars rate={review.rating} />
                <p>{review.txt}</p>
              </div>
            )
          })}
          {/* </div> */}
        </Slider>{' '}
      </div>
    </div>
  )
}

// export default MultipleItems
