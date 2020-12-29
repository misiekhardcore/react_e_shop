import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserOrderHistory } from "../../redux/Order/order.actions";
import OrderHistory from "./../../components/OrderHistory";
import "./styles.scss";

const mapState = ({ user, orderData }) => ({
  currentUser: user.currentUser,
  orderHistory: orderData.orderHistory.data,
});

const Dashboard = (props) => {
  const dispatch = useDispatch();
  const { currentUser, orderHistory } = useSelector(mapState);

  useEffect(() => {
    dispatch(getUserOrderHistory(currentUser.id));
  }, []);

  return (
    <>
      <h1>Order History</h1>
      <OrderHistory orders={orderHistory} />
    </>
  );
};
export default Dashboard;
