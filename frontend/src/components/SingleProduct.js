import { Card, Button } from 'react-bootstrap'
import { CartState } from '../context/Context'
import Rating from './Rating'

const SingleProduct = ({ prod }) => {
  const {
    state: { cart },
    dispatch
  } = CartState()

  return (
    <div className="products">
      <Card>
        <Card.Img
          variant="top"
          src="https://www.lottemart.co.id/themes/lottenew/asset/static/xlogo-latest.png.pagespeed.ic.PCbntBQpax.webp"
          alt={prod.nama}
        />
        <Card.Body>
          <Card.Title>{prod.nama}</Card.Title>
          <Card.Subtitle style={{ paddingBottom: 10 }}>
            <span>
              {new Intl.NumberFormat('ja-JP', {
                style: 'currency',
                currency: 'IDR'
              }).format(prod.harga)}
            </span>
            {/* {prod.fastDelivery ? (
              <div>Fast Delivery</div>
            ) : (
              <div>4 days delivery</div>
            )} */}
            {/* <Rating rating={prod.jumlah} /> */}
          </Card.Subtitle>
          {cart.some((p) => p.id === prod.id) ? (
            <Button
              variant="danger"
              onClick={() =>
                dispatch({
                  type: 'REMOVE_FROM_CART',
                  payload: prod
                })
              }
            >
              Remove from Cart
            </Button>
          ) : (
            <Button
              onClick={() =>
                dispatch({
                  type: 'ADD_TO_CART',
                  payload: prod
                })
              }
              disabled={prod.jumlah === 0}
            >
              {prod.jumlah === 0 ? 'Out of Stock' : 'Add to Cart'}
            </Button>
          )}
        </Card.Body>
      </Card>
    </div>
  )
}

export default SingleProduct
