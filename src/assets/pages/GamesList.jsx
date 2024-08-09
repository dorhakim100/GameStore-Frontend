import { useDispatch, useSelector } from 'react-redux'

import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { addGameToCart } from '../../store/actions/user.actions.js'
import { setCart } from '../../store/actions/user.actions.js'

import { userService } from '../../services/user.service.js'
import { showSuccessMsg } from '../../services/event-bus.service.js'
import { showErrorMsg } from '../../services/event-bus.service.js'

import { Button, Autocomplete, TextField } from '@mui/material'

// import Loader from './Loader.jsx'
import loader from '/loader.svg'

export function GamesList({ games }) {
  // const games = useSelector((storeState) => storeState.gameModule.games)
  console.log(games)

  const [user, setUser] = useState(userService.getLoggedinUser() || {})

  useEffect(() => {
    // loadGames().then(() => {})
  }, [])

  async function onAddGameToCart(game) {
    if (!game.inStock) {
      showErrorMsg('Game is not in stock')
      return
    }

    if (!user.gamesInCart) {
      showErrorMsg('Please login or create account')

      return
    }
    try {
      const updatedUser = await addGameToCart(game)
      console.log(updatedUser)
      setUser(updatedUser)
      setCart(updatedUser.gamesInCart)
      showSuccessMsg('Game added')
    } catch (err) {
      console.log(err)
      showErrorMsg(`Couldn't add game`)
    }
  }

  return (
    <div className='games-container'>
      {(games.length > 0 &&
        games.map((game) => {
          return (
            <div key={game._id} className='game-card-container'>
              <div className='game-container'>
                <Link
                  to={`/game/${game._id}`}
                  onClick={() => (document.documentElement.scrollTop = 0)}
                >
                  <div className='game-name-container'>
                    <h3 className='game-name'>{game.name}</h3>
                  </div>
                  {!game.inStock && (
                    <span className='unavailable'>OUT OF STOCK</span>
                  )}
                  <div className='hover-shadow'>
                    <img className='game-cover' src={game.cover} alt='' />
                  </div>

                  <img className='game-cover' src={game.cover} alt='' />
                  <span className='game-price'>{game.price}$</span>
                </Link>
              </div>
              <Button variant='contained' onClick={() => onAddGameToCart(game)}>
                Add to Cart
              </Button>
            </div>
          )
        })) || (
        <div className='loader'>
          <img src={loader} alt='' />
        </div>
      )}
    </div>
  )
}
