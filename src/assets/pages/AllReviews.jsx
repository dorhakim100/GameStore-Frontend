import { gameService } from '../../services/game.service.js'
import { userService } from '../../services/user.service.js'

import { useDispatch, useSelector } from 'react-redux'
// import { NavLink } from 'react-router-dom'
import { Link } from 'react-router-dom'

import { Button, Autocomplete, TextField } from '@mui/material'
import { Loader, Placeholder } from 'rsuite'

import { Stars } from './Stars.jsx'
import { ReviewsSlider } from './ReviewsSlider.jsx'

import { useEffect, useState, useRef } from 'react'

export function AllReviews() {
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
    getReviews().then((games) => {
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
  return (
    <section className='review-all-games-container'>
      <h2 className='reviews-header'>Reviews</h2>
      {games.map((game) => {
        return (
          <div className='review-game-container' key={game}>
            <Link to={`/game/${game._id}`}>
              <h3>{game.gameName}</h3>
            </Link>

            <Link to={`/game/${game._id}`}>
              <img src={game.gameCover} alt='' />
            </Link>
            <ReviewsSlider reviews={game.reviewContent} />
          </div>
        )
      })}
    </section>
  )
}
