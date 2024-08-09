import { Chart } from './Chart.jsx'

export function Dashboard() {
  const companies = ['Sony', 'Nintendo', 'Microsoft']
  return (
    <section className='section-container dashboard'>
      <h2>Dashboard</h2>
      <Chart companies={companies} />
    </section>
  )
}
