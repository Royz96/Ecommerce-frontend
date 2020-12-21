import React, { useEffect } from 'react';
import { addToCart, removeFromCart } from '../actions/cartActions';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button, Empty } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
function CartScreen(props) {

  const cart = useSelector(state => state.cart);

  const { cartItems } = cart;
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const productId = props.match.params.id;
  const qty = props.location.search ? Number(props.location.search.split("=")[1]) : 1;
  const dispatch = useDispatch();
  const removeFromCartHandler = (productId) => {
    dispatch(removeFromCart(productId));
  }
  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
  }, []);

  const checkoutHandler = () => {
    props.history.push("/signin?redirect=shipping");
  }

  return <div className="cart">
    
    <div className="cart-list">
      <ul className="cart-list-container">
        <li>
          <h3>
            Mi carrito
          </h3>
          <div>
            Precio
          </div>
        </li>
        {
          cartItems.length === 0 ?
          <Empty
          image="https://cdn140.picsart.com/294431291045211.png?type=webp&to=min&r=640"
          imageStyle={{
            height: 200,
          }}
          description={
            <span>
              Tu carrito esta vacío
            </span>
          }
        >
          <Link to="/"><Button type="primary">Volver al inicio</Button></Link>
        </Empty>
            :
            cartItems.map(item =>
              <li>
                <div className="cart-image">
                  <img src={item.image} alt="product" />
                </div>
                <div className="cart-name">
                  <div>
                    <Link to={"/product/" + item.product}>
                      {item.name}
                    </Link>

                  </div>
                  <div>
                Cantidad:
                  <select value={item.qty} onChange={(e) => dispatch(addToCart(item.product, e.target.value))}>
                      {[...Array(item.countInStock).keys()].map(x =>
                        <option key={x + 1} value={x + 1}>{x + 1}</option>
                      )}
                    </select>
                    <Button type="text" icon={<DeleteOutlined />} onClick={() => removeFromCartHandler(item.product)} />
                     
                  </div>
                </div>
                <div className="cart-price">
                  ${item.price}
                </div>
              </li>
            )
        }
      </ul>

    </div>
   {cartItems.length>0?
    <div className="cart-action">
    <h3>
      Sub-total ({cartItems.reduce((a, c) => a + c.qty, 0)} artículos)
      :
       $ {cartItems.reduce((a, c) => a + c.price * c.qty, 0)}
    </h3>
    <button onClick={checkoutHandler} className="button primary full-width" disabled={cartItems.length === 0}>
      Proceder al pago
    </button>

  </div>:null}

  </div>
}

export default CartScreen;