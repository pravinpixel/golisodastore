import HomeProductsSlider from 'components/Home/HomeProductsSlider/HomeProductsSlider'
import React from 'react'
import { Helmet } from 'react-helmet'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

function BrandsPage() {
  const brands = useSelector(state => state.homePageCollection.brands)

  return (
    <div>
      <Helmet>
        <title>Golisoda | Brands</title>
        <link rel="canonical" href={window.location.href} />
        <meta name="description" content="Golisoda | Brands" />
      </Helmet>
      <HomeProductsSlider />
      {brands &&
        <div className='container'>
          <div className='text-center my-4'>
            <h2>Shop from the top brands</h2>
          </div>
          <div className='brands-shots'>
            <ul>
              {
                brands.map((item, i) => (
                  <li key={i}>
                    <Link to={`/products?brands=${item.slug}`}>
                      <img src={item.image}
                        alt="Alhambra" />
                      <span>{item.title}</span>
                    </Link>
                  </li>
                ))}
            </ul>
          </div>
        </div>
      }
    </div>
  )
}

export default BrandsPage