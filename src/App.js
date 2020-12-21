import React, { useState } from "react";
import { BrowserRouter, Route, Link,withRouter } from "react-router-dom";
import "./App.css";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import CartScreen from "./screens/CartScreen";
import SigninScreen from "./screens/SigninScreen";
import { useDispatch, useSelector } from "react-redux";
import RegisterScreen from "./screens/RegisterScreen";
import ProductsScreen from "./screens/ProductsScreen";
import ShippingScreen from "./screens/ShippingScreen";
import PaymentScreen from "./screens/PaymentScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import OrderScreen from "./screens/OrderScreen";
import ProfileScreen from "./screens/ProfileScreen";
import OrdersScreen from "./screens/OrdersScreen";
import { logout, update } from './actions/userActions';
import { listProducts } from './actions/productActions';
import { useHistory } from "react-router";
import "antd/dist/antd.css";
import {
  ShoppingCartOutlined,
  UserOutlined,
  CloseCircleOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { Button, Dropdown, Menu, Popover } from "antd";

function App(props) {
  const userSignin = useSelector((state) => state.userSignin);
  const [sortOrder, setSortOrder] = useState('');
  const category = props.match.params.id ? props.match.params.id : '';
  const [searchKeyword, setSearchKeyword] = useState('');
  const history=useHistory()
  const [visible, setvisible] = useState(false)
  const { userInfo } = userSignin;
  const dispatch = useDispatch();
  const [open, setopen] = useState(false);
  const handleLogout = () => {
    dispatch(logout());
    props.history.push("/");
  }
  const openMenu = () => {
    document.querySelector(".sidebar").classList.add("open");
    setopen(true);
  };
  const closeMenu = () => {
    document.querySelector(".sidebar").classList.remove("open");
    setopen(false);
  };
  const content = (
    <div>
      <a href="/profile"><p>Perfil</p></a>
      <a><p onClick={handleLogout}>Cerrar Sesión</p></a>
    </div>
  );
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(listProducts(category, searchKeyword, sortOrder));
  };
  return (
    <>
      <div className="grid-container">
        <header className="header">
          <div className="brand">
            <button onClick={openMenu}>&#9776;</button>
            <Link to="/">
              <img className="logo" src={require("./logo.png")} />
            </Link>
          </div>
          <div className="header-links">
            <form onSubmit={submitHandler}>
            <input
            placeholder="Buscar..."
              name="searchKeyword"
              onChange={(e) => setSearchKeyword(e.target.value)}
            />
            <Button icon={<SearchOutlined />} type="text" htmlType="submit" onClick={submitHandler}/>
            </form>
            <a href="/cart">
              <ShoppingCartOutlined />
            </a>
            {userInfo ? (
              <Popover placement="bottomLeft" visible={visible} onVisibleChange={(e)=>{setvisible(e)}} trigger="click" title={userInfo.name} content={content}>

                <UserOutlined />
              </Popover>
            ) : (
              <Link to="/signin">Inicia Sesión</Link>
            )}
            {userInfo && userInfo.isAdmin && (
              <div className="dropdown">
                <a href="#">Admin</a>
                <ul className="dropdown-content">
                  <li>
                    <Link to="/orders">Ordenes</Link>
                    <Link to="/products">Productos</Link>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </header>
        <aside className="sidebar">
          <div className="sidebarTop">
            <h3>Categorias de productos</h3>
            <CloseCircleOutlined onClick={closeMenu} />
          </div>
          <ul className="categories">
            <li>
              <Link to="/category/Videojuegos">Videojuegos</Link>
            </li>

            <li>
              <Link to="/category/Accesorios">Accesorios</Link>
            </li>
            <li>
              <Link to="/category/Ropa">Ropa</Link>
            </li>

          </ul>
        </aside>
        {open ? <div className="backdrop" onClick={closeMenu}></div> : null}
        <main className="main">
          <div className="content">
            <Route path="/orders" component={OrdersScreen} />
            <Route path="/profile" component={ProfileScreen} />
            <Route path="/order/:id" component={OrderScreen} />
            <Route path="/products" component={ProductsScreen} />
            <Route path="/shipping" component={ShippingScreen} />
            <Route path="/payment" component={PaymentScreen} />
            <Route path="/placeorder" component={PlaceOrderScreen} />
            <Route path="/signin" component={SigninScreen} />
            <Route path="/register" component={RegisterScreen} />
            <Route path="/product/:id" component={ProductScreen} />
            <Route path="/cart/:id?" component={CartScreen} />
            <Route path="/category/:id" component={HomeScreen} />
            <Route path="/" exact={true} component={HomeScreen} />
          </div>
        </main>
        <footer className="footer">Rodrigo Silva González (2020)</footer>
      </div>
      </>
  );
}

export default withRouter(App);
