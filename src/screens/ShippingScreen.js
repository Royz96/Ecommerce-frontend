import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { saveShipping } from '../actions/cartActions';
import CheckoutSteps from '../components/CheckoutSteps';

function ShippingScreen(props) {

  const [direccion, setDireccion] = useState('');
  const [ciudad, setCiudad] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [pais, setPais] = useState('');

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveShipping({ direccion, ciudad, postalCode, pais }));
    props.history.push('payment');
  }
  return <div>
    <CheckoutSteps step1 step2 ></CheckoutSteps>
    <div className="form">
      <form onSubmit={submitHandler} >
        <ul className="form-container">
          <li>
            <h2>Envío</h2>
          </li>

          <li>
            <label htmlFor="direccion">
              Direccion
          </label>
            <input type="text" name="direccion" id="direccion" onChange={(e) => setDireccion(e.target.value)}>
            </input>
          </li>
          <li>
            <label htmlFor="ciudad">
              Ciudad
          </label>
            <input type="text" name="ciudad" id="ciudad" onChange={(e) => setCiudad(e.target.value)}>
            </input>
          </li>
          <li>
            <label htmlFor="postalCode">
              Código Postal
          </label>
            <input type="text" name="postalCode" id="postalCode" onChange={(e) => setPostalCode(e.target.value)}>
            </input>
          </li>
          <li>
            <label htmlFor="pais">
              Pais
          </label>
            <input type="text" name="pais" id="pais" onChange={(e) => setPais(e.target.value)}>
            </input>
          </li>


          <li>
            <button type="submit" className="button primary">Continuar</button>
          </li>

        </ul>
      </form>
    </div>
  </div>

}
export default ShippingScreen;