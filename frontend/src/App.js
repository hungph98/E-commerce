import React from "react";
import './App.css';
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import Home from "../src/pages/Home";
import ProductList from "./pages/ProductList";
import Product from "./pages/Product";
import Cart from "./pages/Cart";
import Success from "./pages/Success";
import Login from "./pages/Login";
import Register from "./pages/Register";
import {useSelector} from "react-redux";

function App() {
    const user = useSelector((state) => state.user.currentUser);
    return (
        <Router>
            <Switch>
                <Route exact path="/">
                    <Home/>
                </Route>
                <Route path="/products/:category">
                    <ProductList/>
                </Route>
                <Route path="/product/:id">
                    <Product/>
                </Route>
                <Route path="/cart">
                    <Cart/>
                </Route>
                <Route path="/success">
                    <Success/>
                </Route>
                <Route path="/login">{user ? <Redirect to="/"/> : <Login/>}</Route>
                <Route path="/register">
                    {user ? <Redirect to="/"/> : <Register/>}
                </Route>
            </Switch>
        </Router>
    );
}

export default App;
