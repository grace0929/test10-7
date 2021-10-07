import logo from './logo.svg';
import './App.css';
import React, { useEffect } from "react";
import Start from "./Pages/Start";
import Login from "./Pages/Login";
import ChooseRole from "./Pages/ChooseRole";
import Register from "./Pages/Register";
import Retailer from "./Pages/Retailer";
import Supplier from "./Pages/Supplier";
import BasicInfo from "./components/BasicInfo";
import BasicInfoSupplier from "./components/BasicInfoSupplier";
import Explanation from "./Pages/Explanation";
import ExplanationSupplier from "./Pages/Explanation/ExplanationSupplier";
import Match from "./Pages/Match";
import MatchSupplier from "./Pages/Match/MatchSupplier";
import BargainFirstRetailer from "./Pages/BargainFirst/BargainFirstRetailer";
import BargainFirstSupplier from "./Pages/BargainFirst/BargainSupplier";
import SupplierAdmin from "./layouts/SupplierAdmin";
import RetailerAdmin from "./layouts/RetailerAdmin";
import { useSelector } from "react-redux";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

function App() {
  const { accessToken } = useSelector(state => state.accessToken)
  const ProtectedRoute = ({ component: Component, ...rest }) => {
    return (
      <Route
        {...rest}
        render={(compProps) => accessToken ? (<Component {...compProps} />) : (<Redirect to="/" />)}
      />
    );
  };




  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Start} />
        <Route path="/Login" exact component={Login} />
        <ProtectedRoute path="/ChooseRole" exact component={ChooseRole} />
        <Route path="/Register" exact component={Register} />
        <ProtectedRoute path="/Retailer" component={Retailer} />
        <ProtectedRoute path="/Supplier" component={Supplier} />
        <ProtectedRoute path="/basicinfo" exact component={BasicInfo} />
        <ProtectedRoute path="/basicinfosupplier" exact component={BasicInfoSupplier} />
        <ProtectedRoute
          path="/explanationsupplier"
          exact
          component={ExplanationSupplier}
        />
        <ProtectedRoute path="/explanation" exact component={Explanation} />

        <ProtectedRoute path="/match" exact component={Match} />
        <ProtectedRoute path="/matchsupplier" exact component={MatchSupplier} />
        <ProtectedRoute
          path="/bargainfirstretailer"
          exact
          component={BargainFirstRetailer}
        />
        <ProtectedRoute
          path="/bargainfirstsupplier"
          exact
          component={BargainFirstSupplier}
        />
        <ProtectedRoute path="/supplieradmin" component={SupplierAdmin} />
        <Redirect from="/supplieradmin" to="/supplieradmin/dashboard" />

        <ProtectedRoute path="/retaileradmin" component={RetailerAdmin} />
        <Redirect from="/retaileradmin" to="/retaileradmin/dashboard" />
        {/* <ProtectedRoute path="*" exact component={Login} /> */}
      </Switch>
    </Router>
  );
}

export default App;
