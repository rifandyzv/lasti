import { useEffect, useState } from 'react'
import { Button, Col, Form, Image, ListGroup, Row } from 'react-bootstrap'
import { AiFillDelete } from 'react-icons/ai'
import { CartState } from '../context/Context'

const Cart = () => {
  const {
    state: { cart },
    dispatch
  } = CartState()
  const [total, setTotal] = useState()

  useEffect(() => {
    setTotal(cart.reduce((acc, curr) => acc + Number(curr.harga) * curr.qty, 0))
  }, [cart])

  return (
    <div className="home">
      <div className="productContainer">
        <ListGroup>
          {cart.map((prod) => (
            <ListGroup.Item key={prod.id}>
              <Row>
                <Col md={2}>
                  <Image
                    src="https://www.lottemart.co.id/themes/lottenew/asset/static/xlogo-latest.png.pagespeed.ic.PCbntBQpax.webp"
                    alt={prod.nama}
                    fluid
                    rounded
                  />
                </Col>
                <Col md={2}>
                  <span>{prod.nama}</span>
                </Col>
                <Col md={2}>
                  {new Intl.NumberFormat('ja-JP', {
                    style: 'currency',
                    currency: 'IDR'
                  }).format(prod.harga)}
                </Col>
                <Col md={2}>{/* <Rating rating={prod.jumlah} /> */}</Col>
                <Col md={2}>
                  <Form.Control
                    as="select"
                    value={prod.qty}
                    onChange={(e) =>
                      dispatch({
                        type: 'CHANGE_CART_QTY',
                        payload: {
                          id: prod.id,
                          qty: e.target.value
                        }
                      })
                    }
                  >
                    {[...Array(prod.jumlah).keys()].map((x) => (
                      <option key={x + 1}>{x + 1}</option>
                    ))}
                  </Form.Control>
                </Col>
                <Col md={2}>
                  <Button
                    type="button"
                    variant="light"
                    onClick={() =>
                      dispatch({
                        type: 'REMOVE_FROM_CART',
                        payload: prod
                      })
                    }
                  >
                    <AiFillDelete fontSize="20px" />
                  </Button>
                </Col>
              </Row>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </div>
      <div className="filters summary">
        <span className="title">Subtotal ({cart.length}) items</span>
        <span style={{ fontWeight: 700, fontSize: 20 }}>
          {new Intl.NumberFormat('ja-JP', {
            style: 'currency',
            currency: 'IDR'
          }).format(total)}
        </span>
        <Button
          type="button"
          disabled={cart.length === 0}
          onClick={() => console.log(cart)}
        >
          Proceed to Checkout
        </Button>
      </div>
    </div>
  )
}

export default Cart
