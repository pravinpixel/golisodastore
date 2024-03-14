/* eslint-disable react-hooks/exhaustive-deps */
import HomeProductsSlider from 'components/Home/HomeProductsSlider/HomeProductsSlider'
import React, { useEffect, useMemo, useState } from 'react'
import { Helmet } from 'react-helmet'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { brandsListApi } from 'services/customer.service'
import { homePageApi } from 'services/page.service'

function BrandsPage() {
  // const brands = useSelector(state => state.homePageCollection.brands)

  const [take, setTake] = useState(20);
  const [brands, setBrands] = useState(null);
  const [tackLoader, setTackLoader] = useState(false);

  const brandListApi = () => {
    setTackLoader(true)
    brandsListApi(take).then(({ data }) => {
      setBrands(data)
      setTackLoader(false)
    });
  }

  useEffect(() => {
    brandListApi()
  }, [take])


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
                brands?.brands?.map((item, i) => (
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

          <center>
            {
              brands?.total_count !== brands?.to ?
                <button
                  onClick={() => setTake(take + 10)}
                  loading={tackLoader.toString()}
                  className="btn my-4 btn-info"
                >
                  Load more
                </button>
                : ''
            }
          </center>

        </div>



      }



    </div>
  )
}

export default BrandsPage