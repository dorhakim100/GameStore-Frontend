import { React } from 'react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import { Bar } from 'react-chartjs-2'
import faker from 'faker'

import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { getAllGames } from '../../store/actions/game.actions.js'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

export function Chart({ companies }) {
  const games = useSelector((storeState) => storeState.gameModule.games)

  let inStockSony = 0
  let inStockNintendo = 0
  let inStockMicrosoft = 0

  let notInStockSony = 0
  let notInStockNintendo = 0
  let notInStockMicrosoft = 0

  console.log(companies)

  getStockData()
  const labels = [
    {
      company: companies[0],
      inStock: inStockSony,
      notInStock: notInStockSony,
    },
    {
      company: companies[1],
      inStock: inStockNintendo,
      notInStock: notInStockNintendo,
    },
    {
      company: companies[2],
      inStock: inStockMicrosoft,
      notInStock: notInStockMicrosoft,
    },
  ]

  useEffect(() => {
    getAllGames()
  }, [])

  //   const labels = useSelector((storeState) => storeState.gameModule.games)
  const options = {
    responsive: true,

    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Our stock',
      },
    },
  }
  const data = {
    labels: labels.map((label) => `${label.company}`),
    datasets: [
      {
        label: 'In Stock',
        data: labels.map((company) => company.inStock),
        backgroundColor: 'rgba(17, 152, 15, 0.5)',
      },
      {
        label: 'Out of Stock',
        data: labels.map((company) => company.notInStock),
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ],
  }

  function getStockData() {
    games.map((game) => {
      if (game.companies.includes('Sony') && game.inStock) {
        inStockSony++
      } else if (game.companies.includes('Sony')) {
        notInStockSony++
      }
      if (game.companies.includes('Nintendo') && game.inStock) {
        inStockNintendo++
      } else if (game.companies.includes('Nintendo')) {
        notInStockNintendo++
      }
      if (game.companies.includes('Microsoft') && game.inStock) {
        inStockMicrosoft++
      } else if (game.companies.includes('Microsoft')) {
        notInStockMicrosoft++
      }
    })
  }

  return <Bar options={options} data={data} />
}
