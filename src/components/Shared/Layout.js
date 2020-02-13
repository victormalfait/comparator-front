import React from "react";
import { Route, Switch } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";
import StoreForm from "../Store/Form";
import Signup from "../Login/Signup";
import ProductForm from "../Product/Form";
import Home from "../Shared/Home";
import ListStore from "../Store/List";
import Page404 from "./404";
import Login from "../Login/Login";

export default function Layout(props) {
  return (
    <div>
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="/">Comparator</Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link href="/">Home</Nav.Link>
          <Nav.Link href="/stores">Store</Nav.Link>
          <Nav.Link href="/pricing">Pricing</Nav.Link>
        </Nav>
      </Navbar>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/product/add" component={ProductForm} />
        <Route exact path="/stores" component={ListStore} />
        <Route exact path="/stores/add" component={StoreForm} />
        <Route component={Page404} />
      </Switch>
    </div>
  );
}
