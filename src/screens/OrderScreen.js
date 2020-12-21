import { Button, Empty } from 'antd';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { createOrder, detailsOrder, payOrder } from '../actions/orderActions';
import PaypalButton from '../components/PaypalButton';
function OrderScreen(props) {

  const orderPay = useSelector(state => state.orderPay);
  const { loading: loadingPay, success: successPay, error: errorPay } = orderPay;
  const dispatch = useDispatch();
  useEffect(() => {
    if (successPay) {
      props.history.push("/profile");
    } else {
      dispatch(detailsOrder(props.match.params.id));
    }
    return () => {
    };
  }, [successPay]);

  const handleSuccessPayment = (paymentResult) => {
    dispatch(payOrder(order, paymentResult));
  }

  const orderDetails = useSelector(state => state.orderDetails);
  const { loading, order, error } = orderDetails;

  return loading ? <div>Loading ...</div> : error ? <div>{error}</div> :

    <div>
      <div className="placeorder">
        <div className="placeorder-info">
          <div>
            <h3>
              Envío
          </h3>
            <div>
              {order.shipping.address}, {order.shipping.city},
          {order.shipping.postalCode}, {order.shipping.country},
          </div>
            <div>
              {order.isDelivered ? "Enviado  " + order.deliveredAt : "No se ha enviado."}
            </div>
          </div>
          <div>
            <h3>Pago</h3>
            <div>
              Método de Pago: {order.payment.paymentMethod}
            </div>
            <div>
              {order.isPaid ? "Pagado " + order.paidAt : "No se ha efectuado el pago."}
            </div>
          </div>
          <div>
            <ul className="cart-list-container">
              <li>
                <h3>
                  Carrito
          </h3>
                <div>
                  Precio
          </div>
              </li>
              {
                order.orderItems.length === 0 ?
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
                  order.orderItems.map(item =>
                    <li key={item._id}>
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
                          Cantidad: {item.qty}
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


        </div>
        <div className="placeorder-action">
          <ul>
            <li className="placeorder-actions-payment">
              {loadingPay && <div>Finishing Payment...</div>}
              {!order.isPaid &&
                <PaypalButton
                  amount={order.totalPrice}
                  onSuccess={handleSuccessPayment} />
              }
            </li>
            <li>
              <h3>Resumen de la orden</h3>
            </li>
            <li>
              <div>Artículos</div>
              <div>${order.itemsPrice}</div>
            </li>
            <li>
              <div>Envío</div>
              <div>${order.shippingPrice}</div>
            </li>
            <li>
              <div>Impuestos</div>
              <div>${order.taxPrice}</div>
            </li>
            <li>
              <div>Total</div>
              <div>${order.totalPrice}</div>
            </li>
          </ul>



        </div>

      </div>
    </div>

}

export default OrderScreen;