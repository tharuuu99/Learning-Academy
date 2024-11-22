import { loadStripe } from "@stripe/stripe-js";
import { Navigate, useLocation } from "react-router-dom";
import './Payment.css'
//import Payment from "./Payment";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutPage from "./CheckoutPage";


const stripePromise = loadStripe("pk_test_51QKvCrGCRH6i01H5mBDaUO5HfGOhAPWrvBUx999MqoXXk8aMA3RLl4nbcClQEgwPJTk7hsCsOEe2tG4QdDIS1z1d00BFIyYIDb");
const key = import.meta.env.VITE_STRIPE;

const Payment = () => {
  const location = useLocation();
  console.log(location);
  const price = location?.state?.price;
  const cartItm = location.state?.itemId;
  if(!price){
    return <Navigate to="/dashboard/my-selected"/>
  }

  return (
    <div className="my-40 stripe-custom-class">
      <Elements stripe={stripePromise}>
        <CheckoutPage price={price} cartItm={cartItm}/>
      </Elements>
    </div>
  );
}

export default Payment;
