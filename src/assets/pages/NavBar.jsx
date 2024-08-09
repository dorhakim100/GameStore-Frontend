import { useDispatch, useSelector } from 'react-redux'
import { NavLink, Link, useNavigate, useParams } from 'react-router-dom'
import { useState, useRef, useEffect } from 'react'

import { Button } from '@mui/material'

import { setFilterBy } from '../../store/actions/game.actions.js'
import { utilService } from '../../services/util.service.js'
import { gameService } from '../../services/game.service.js'
import { userService } from '../../services/user.service.js'

export function NavBar({ navBarRef, toggleCart, toggleNavBar }) {
  const [user, setUser] = useState(userService.getLoggedinUser())
  const navigate = useNavigate()
  return (
    <div className='nav-bar-container' ref={navBarRef}>
      <nav className='app-nav'>
        <Button
          className='nav-button'
          variant='contained'
          onClick={() => {
            window.scrollTo({ top: 0, behavior: 'smooth' })
            navigate('/')
            toggleNavBar()
          }}
        >
          Home
        </Button>
        <Button
          className='nav-button'
          variant='contained'
          onClick={() => {
            window.scrollTo({ top: 0, behavior: 'smooth' })
            navigate('/game')
            toggleNavBar()
          }}
        >
          Games
        </Button>
        <Button
          className='nav-button'
          variant='contained'
          onClick={() => {
            window.scrollTo({ top: 0, behavior: 'smooth' })
            navigate('/dashboard')
            toggleNavBar()
          }}
        >
          Dashboard
        </Button>
        <Button
          className='nav-button'
          variant='contained'
          onClick={() => {
            window.scrollTo({ top: 0, behavior: 'smooth' })
            navigate('/about')
            toggleNavBar()
          }}
        >
          About
        </Button>
        <Button
          className='nav-button'
          variant='contained'
          onClick={() => {
            window.scrollTo({ top: 0, behavior: 'smooth' })
            navigate('/review')
            toggleNavBar()
          }}
        >
          Reviews
        </Button>
        {user && (
          <Button
            className='nav-button'
            variant='contained'
            onClick={() => {
              window.scrollTo({ top: 0, behavior: 'smooth' })
              navigate(`user/${user._id}`)
              toggleNavBar()
            }}
          >
            My Account
          </Button>
        )}
        <Button
          className='nav-button'
          variant='contained'
          onClick={() => {
            toggleCart()
            toggleNavBar()
          }}
        >
          Cart
        </Button>
      </nav>
    </div>
  )
}
