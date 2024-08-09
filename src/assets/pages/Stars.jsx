export function Stars({ rate }) {
  switch (rate) {
    case 1:
      return (
        <div>
          <i className='fa-solid fa-star star'></i>
        </div>
      )
    case 2:
      return (
        <div>
          <i className='fa-solid fa-star star'></i>
          <i className='fa-solid fa-star star'></i>
        </div>
      )
    case 3:
      return (
        <div>
          <i className='fa-solid fa-star star'></i>
          <i className='fa-solid fa-star star'></i>
          <i className='fa-solid fa-star star'></i>
        </div>
      )
    case 4:
      return (
        <div>
          <i className='fa-solid fa-star star'></i>
          <i className='fa-solid fa-star star'></i>
          <i className='fa-solid fa-star star'></i>
          <i className='fa-solid fa-star star'></i>
        </div>
      )
    case 5:
      return (
        <div>
          <i className='fa-solid fa-star star'></i>
          <i className='fa-solid fa-star star'></i>
          <i className='fa-solid fa-star star'></i>
          <i className='fa-solid fa-star star'></i>
          <i className='fa-solid fa-star star'></i>
        </div>
      )
  }
}
