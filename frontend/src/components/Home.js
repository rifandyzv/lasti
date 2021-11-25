import { useState, useEffect } from 'react'
import { CartState } from '../context/Context'
import SingleProduct from './SingleProduct'

const Home = () => {
  const {
    state: { products },
    productState: { sort, byStock, byFastDelivery, byRating, searchQuery }
  } = CartState()
  const [product, setProduct] = useState([])

  const fetchData = async () => {
    const data = await fetch('http://localhost:8000/items')
      .then((res) => res.json())
      .then((res) => setProduct(res))
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <div className="home">
      <div className="productContainer">
        {product.map((prod) => (
          <SingleProduct prod={prod} key={prod.id} />
        ))}
      </div>
    </div>
  )
}

export default Home
