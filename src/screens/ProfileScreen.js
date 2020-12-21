import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { logout, update } from '../actions/userActions';
import { listMyOrders } from '../actions/orderActions';
import { useDispatch, useSelector } from 'react-redux';
import {Spin} from 'antd'
import { LoadingOutlined } from '@ant-design/icons';
function ProfileScreen(props) {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const dispatch = useDispatch();

  const userSignin = useSelector(state => state.userSignin);
  const { userInfo } = userSignin;
const handleLogout = () => {
    dispatch(logout());
    props.history.push("/");
  }
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(update({ userId: userInfo._id, email, name, password }))
  }
  const userUpdate = useSelector(state => state.userUpdate);
  const { loading, success, error } = userUpdate;

  const myOrderList = useSelector(state => state.myOrderList);
  const { loading: loadingOrders, orders, error: errorOrders } = myOrderList;
  useEffect(() => {
    if (userInfo) {
      console.log(userInfo.name)
      setEmail(userInfo.email);
      setName(userInfo.name);
      setPassword(userInfo.password);
    }
    dispatch(listMyOrders());
    return () => {

    };
  }, [userInfo])

  return <div className="profile">
    <div className="profile-info">
        <h2>Perfil</h2>
      <div className="form">
        <form onSubmit={submitHandler} >
          <ul className="form-container">
            <li>
              <h2>Mis datos</h2>
            </li>
            <li>
              {loading && <Spin indicator={<LoadingOutlined spin style={{fontSize:24}}/>}/>}
              {error && <div>{error}</div>}
              {success && <div>Profile Saved Successfully.</div>}
            </li>
            <li>
              <label htmlFor="name">
                Nombre
          </label>
              <input value={name} type="name" name="name" id="name" onChange={(e) => setName(e.target.value)}>
              </input>
            </li>
            <li>
              <label htmlFor="email">
                Email
          </label>
              <input value={email} type="email" name="email" id="email" onChange={(e) => setEmail(e.target.value)}>
              </input>
            </li>
            <li>
              <label htmlFor="password">Contraseña</label>
              <input value={password} type="password" id="password" name="password" onChange={(e) => setPassword(e.target.value)}>
              </input>
            </li>

            <li>
              <button type="submit" className="button primary">Guardar</button>
            </li>
            <li>
              <button type="button" onClick={handleLogout} className="button secondary full-width">Cerrar sesión</button>
            </li>

          </ul>
        </form>
      </div>
    </div>
    <div className="profile-orders content-margined">
      {
        loadingOrders ? <Spin indicator={<LoadingOutlined spin style={{fontSize:24}}/>}/> :
          errorOrders ? <div>{errorOrders} </div> :
          <>
          <h2>Mis Pedidos</h2>
            <table className="table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>FECHA</th>
                  <th>TOTAL</th>
                  <th>PAGADO</th>
                  <th>ACCIONES</th>
                </tr>
              </thead>
              <tbody>
                {orders.map(order => <tr key={order._id}>
                  <td>{order._id}</td>
                  <td>{order.createdAt}</td>
                  <td>{order.totalPrice}</td>
                  <td>{order.isPaid}</td>
                  <td>
                    <Link to={"/order/" + order._id}>DETALLES</Link>
                  </td>
                </tr>)}
              </tbody>
            </table>
            </>
      }
    </div>
  </div>
}

export default ProfileScreen;