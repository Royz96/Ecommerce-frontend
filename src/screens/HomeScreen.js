import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { listProducts } from '../actions/productActions';
import Rating from '../components/Rating';
import { Button, Empty, Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import "antd/dist/antd.css";
function HomeScreen(props) {
  const [searchKeyword, setSearchKeyword] = useState('');
  const [sortOrder, setSortOrder] = useState('');
  const category = props.match.params.id ? props.match.params.id : '';
  const productList = useSelector((state) => state.productList);
  const { products, loading, error } = productList;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(listProducts(category));

    return () => {
      //
    };
  }, [category]);

  
  const sortHandler = (e) => {
    setSortOrder(e.target.value);
    dispatch(listProducts(category, searchKeyword, sortOrder));
  };

  return (
    <>
      {category && <h2>{category}</h2>}

      <ul className="filter">
        <li>
          Ordenar por{' '}
          <select name="sortOrder" onChange={sortHandler}>
            <option value="">Mas Nuevos</option>
            <option value="highest">Mayor Calificación</option>
            <option value="lowest">Menor Calificación</option>
          </select>
        </li>
      </ul>
      {loading ? (
        <Spin indicator={<LoadingOutlined spin style={{fontSize:24}}/>}/>
      ) : error ? (
        <div>{error}</div>
      ) : (

        products.length===0?
        <Empty
          image="https://stickershop.line-scdn.net/stickershop/v1/sticker/11088072/iPhone/sticker@2x.png"
          imageStyle={{
            height: 200,
          }}
          description={
            <span>
              No se encuentra ningun elemento que coincida con la búsqueda
            </span>
          }
        >
          <Button onClick={()=>{dispatch(listProducts("", "", ""));}} type="primary">Volver al inicio</Button>
        </Empty>:
        <ul className="products">
          {products.map((product) => (
            <li key={product._id}>
              <div className="product">
                <Link to={'/product/' + product._id}>
                  <img
                    className="product-image"
                    src={product.image}
                    alt="product"
                  />
                </Link>
                <div className="product-name">
                  <Link to={'/product/' + product._id}>{product.name}</Link>
                </div>
                <div className="product-brand">{product.brand}</div>
                <div className="product-price">${product.price}</div>
                <div className="product-rating">
                  <Rating
                    value={product.rating}
                    text={product.numReviews===1?product.numReviews + ' reseña':product.numReviews + ' reseñas'}
                  />
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
export default HomeScreen;
