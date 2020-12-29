import React, { useState, useEffect } from "react";
import {
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import Input from "../../components/forms/Input";
import Button from "../../components/forms/Button";
import { CountryDropdown } from "react-country-region-selector";
import { saveOrderHistory } from "../../redux/Order/order.actions";
import { apiInstance } from "../../Utils";
import {
  selectCartTotal,
  selectCartItemsCount,
  selectCartIems,
} from "../../redux/Cart/cart.selectors";

import "./styles.scss";
import { createStructuredSelector } from "reselect";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

const initialState = {
  line1: "",
  line2: "",
  city: "",
  state: "",
  country: "",
  postal_code: "",
};

const mapState = createStructuredSelector({
  total: selectCartTotal,
  itemsCount: selectCartItemsCount,
  cartItems: selectCartIems,
});

const PaymentDetails = () => {
  const stripe = useStripe();
  const { total, itemsCount, cartItems } = useSelector(mapState);
  const dispatch = useDispatch();
  const history = useHistory();
  const elements = useElements();
  const [billingAddress, setBillingAddress] = useState({
    ...initialState,
  });
  const [shippingAddress, setShippingAddress] = useState({
    ...initialState,
  });
  const [recipientName, setRecipientName] = useState("");
  const [nameOnCard, setNameOnCard] = useState("");

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const cardElement = elements.getElement("card");

    if (
      !shippingAddress.line1 ||
      !shippingAddress.city ||
      !shippingAddress.state ||
      !shippingAddress.postal_code ||
      !shippingAddress.country ||
      !billingAddress.line1 ||
      !billingAddress.city ||
      !billingAddress.city ||
      !billingAddress.state ||
      !billingAddress.postal_code ||
      !billingAddress.country ||
      !recipientName ||
      !nameOnCard
    ) {
      return;
    }

    apiInstance
      .post("/payments/create", {
        amount: total * 100,
        shipping: {
          name: recipientName,
          address: {
            ...shippingAddress,
          },
        },
      })
      .then(({ data: clientSecret }) => {
        stripe
          .createPaymentMethod({
            type: "card",
            card: cardElement,
            billing_details: {
              name: nameOnCard,
              address: {
                ...billingAddress,
              },
            },
          })
          .then(({ paymentMethod }) => {
            stripe
              .confirmCardPayment(clientSecret, {
                payment_method: paymentMethod.id,
              })
              .then(({ paymentIntent }) => {
                const configOrder = {
                  orderTotal: total,
                  orderItems: cartItems.map((item) => {
                    const {
                      documentID,
                      productThumbnail,
                      productName,
                      productPrice,
                      quantity,
                    } = item;
                    return {
                      documentID,
                      productThumbnail,
                      productName,
                      productPrice,
                      quantity,
                    };
                  }),
                };

                dispatch(saveOrderHistory(configOrder));
              });
          });
      });
  };

  useEffect(() => {
    if (itemsCount < 1) {
      // eslint-disable-next-line
      history.push("/dashboard");
    }
  }, [itemsCount, history]);

  const handleShippingChange = (e) => {
    const { name, value } = e.target;
    setShippingAddress({
      ...shippingAddress,
      [name]: value,
    });
  };

  const handleBillingChange = (e) => {
    const { name, value } = e.target;
    setBillingAddress({
      ...billingAddress,
      [name]: value,
    });
  };

  const configCardElement = {
    iconStyle: "solid",
    style: {
      base: {
        fontSize: "24px",
      },
    },
    hidePostalCode: true,
  };

  return (
    <div className="paymentDetails">
      <form onSubmit={handleFormSubmit}>
        <div className="group">
          <h2>Shipping Address</h2>
          <Input
            required
            placeholder="Recipient name"
            type="text"
            name="recipientname"
            handleChange={(e) => setRecipientName(e.target.value)}
            value={recipientName}
          />
          <Input
            required
            placeholder="Line 1"
            type="text"
            name="line1"
            handleChange={(e) => handleShippingChange(e)}
            value={shippingAddress.line1}
          />
          <Input
            required
            placeholder="Line 2"
            type="text"
            name="line2"
            handleChange={(e) => handleShippingChange(e)}
            value={shippingAddress.line2}
          />
          <Input
            required
            placeholder="City"
            type="text"
            name="city"
            handleChange={(e) => handleShippingChange(e)}
            value={shippingAddress.city}
          />
          <Input
            required
            placeholder="State"
            type="text"
            name="state"
            handleChange={(e) => handleShippingChange(e)}
            value={shippingAddress.state}
          />
          <Input
            required
            placeholder="Postal Code"
            type="text"
            name="postal_code"
            handleChange={(e) => handleShippingChange(e)}
            value={shippingAddress.postal_code}
          />
          <div className="formrow checkoutInput">
            <CountryDropdown
              required
              value={shippingAddress.country}
              onChange={(val) => {
                handleShippingChange({
                  target: {
                    name: "country",
                    value: val,
                  },
                });
              }}
              valueType="short"
            />
          </div>
        </div>
        <div className="group">
          <h2>Billing Address</h2>
          <Input
            required
            placeholder="Name on card"
            type="text"
            name="nameOnCard"
            handleChange={(e) => setNameOnCard(e.target.value)}
            value={nameOnCard}
          />
          <Input
            required
            placeholder="Line 1"
            type="text"
            name="line1"
            handleChange={(e) => handleBillingChange(e)}
            value={billingAddress.line1}
          />
          <Input
            required
            placeholder="Line 2"
            type="text"
            name="line2"
            handleChange={(e) => handleBillingChange(e)}
            value={billingAddress.line2}
          />
          <Input
            required
            placeholder="City"
            type="text"
            name="city"
            handleChange={(e) => handleBillingChange(e)}
            value={billingAddress.city}
          />
          <Input
            required
            placeholder="State"
            type="text"
            name="state"
            handleChange={(e) => handleBillingChange(e)}
            value={billingAddress.state}
          />
          <Input
            required
            placeholder="Postal Code"
            type="text"
            name="postal_code"
            handleChange={(e) => handleBillingChange(e)}
            value={billingAddress.postal_code}
          />
          <div className="formrow checkoutInput">
            <CountryDropdown
              required
              value={billingAddress.country}
              onChange={(val) =>
                handleBillingChange({
                  target: {
                    name: "country",
                    value: val,
                  },
                })
              }
              valueType="short"
            />
          </div>
        </div>
        <div className="group">
          <h2>Card details</h2>
          <CardElement options={configCardElement} />
        </div>
        <Button type="submit">Continue</Button>
      </form>
    </div>
  );
};

export default PaymentDetails;
