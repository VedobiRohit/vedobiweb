import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory} from "react-router-dom";
const PrivateRoute = (props) => {
 let history = useHistory();	
 let Cmp = props.component;
 const products = useSelector((state) => state.products);
 const {loggedin} = products
   useEffect(() => {
    if (!loggedin) {
      history.push("/login");
    }
  });

  return (
    <div>
      <Cmp />
    </div>
  );
};
export default PrivateRoute;
