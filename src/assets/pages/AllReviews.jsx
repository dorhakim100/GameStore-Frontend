import { gameService } from '../../services/game.service.js'
import { userService } from '../../services/user.service.js'

import { setIsLoadingTrue } from '../../store/actions/game.actions.js'
import { setIsLoadingFalse } from '../../store/actions/game.actions.js'

import { useDispatch, useSelector } from 'react-redux'
// import { NavLink } from 'react-router-dom'
import { Link } from 'react-router-dom'

import { Button, Autocomplete, TextField } from '@mui/material'
import { Loader, Placeholder } from 'rsuite'

import { Stars } from './Stars.jsx'
import { ReviewsSlider } from './ReviewsSlider.jsx'

import { useEffect, useState, useRef } from 'react'

import loader from '/loader.svg'

export function AllReviews() {
  const isLoading = useSelector((storeState) => storeState.gameModule.isLoading)

  const [games, setGames] = useState([
    {
      gameName: '',
      reviewContent: [
        {
          date: '',
          fullName: '',
          id: '',
          rating: '',
          txt: '',
          userName: '',
        },
      ],
      gameCover: '',
    },
  ])
  useEffect(() => {
    setIsLoadingTrue()

    getReviews().then((games) => {
      setTimeout(() => {
        setIsLoadingFalse()
      }, 400)
      console.log(games)
      setGames(games)
    })
  }, [])

  async function getReviews() {
    try {
      const reviews = await gameService.getReviews()

      return reviews
    } catch (err) {
      console.log(err)
    }
  }
  let average = 0
  return (
    <section className='review-all-games-container'>
      {isLoading && (
        <div className='loader'>
          <img src={loader} alt='' />
        </div>
      )}
      <h2 className='reviews-header'>Reviews</h2>
      {games.map((game) => {
        let averageRating = 0
        let lengthCounter = 0
        console.log(game.reviewContent)
        if (game.reviewContent.length > 1) {
          const sumWithInitial = game.reviewContent.reduce(
            (accumulator, review) => {
              if (typeof review.rating === 'number') {
                accumulator += review.rating
                lengthCounter++
                console.log(lengthCounter)
              }
              return accumulator
            },
            averageRating
          )
          averageRating = sumWithInitial / lengthCounter
        }
        return (
          <div className='review-game-container' key={game}>
            <Link
              className='title-container'
              to={`/game/${game.gameId}`}
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              <h3>{game.gameName}</h3>
              <h3 className='rating'>
                {Math.round(averageRating * 100) / 100}
              </h3>
              <Stars rate={Math.ceil(averageRating)} />
            </Link>

            <Link
              className='img-container'
              to={`/game/${game.gameId}`}
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              <img src={game.gameCover} alt='' />
            </Link>
            <ReviewsSlider
              className={'reviews-slider'}
              reviews={game.reviewContent}
            />
          </div>
        )
      })}
    </section>
  )
}
