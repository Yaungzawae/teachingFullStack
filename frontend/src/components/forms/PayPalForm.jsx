// frontend here

import {
    PayPalScriptProvider,
    PayPalButtons,
    usePayPalScriptReducer
} from "@paypal/react-paypal-js";
import axios from "axios";

// This value is from the props in the UI
const style = {"layout":"vertical"};

// Custom component to wrap the PayPalButtons and show loading spinner
const ButtonWrapper = ({ showSpinner, courseId, type }) => {

    async function createOrder() {

        const response = await axios.post("/api/payment/paypal/register", {
            course_id: courseId,
            type: type
        })

        return response.data.orderID;
    }
    async function onApprove(data) {

        const response = await axios.post("/api/payment/paypal/confirm", {
            orderID: data.orderID
        })

        // return fetch("https://react-paypal-js-storybook.fly.dev/api/paypal/capture-order", {
        //     method: "POST",
        //     headers: {
        //         "Content-Type": "application/json",
        //     },
        //     body: JSON.stringify({
        //         orderID: data.orderID,
        //     }),
        // })
        //     .then((response) => response.json())
        //     .then((orderData) => {
        //         // Your code here after capture the order
        //     });
    }

    const [{ isPending }] = usePayPalScriptReducer();

    return (
        <>
            { (showSpinner && isPending) && <div className="spinner" /> }
            <PayPalButtons
                style={style}
                disabled={false}
                forceReRender={[style]}
                fundingSource={"paypal"}
                createOrder={createOrder}
                onApprove={onApprove}
            />
        </>
    );
}

const PayPalForm = ({courseId, type}) => {
    return     <div style={{ maxWidth: "750px"}}>
    <PayPalScriptProvider
      options={{ clientId: "test", components: "buttons", currency: "THB" }}
    >
      <ButtonWrapper showSpinner={false} courseId={courseId} type={type}/>
    </PayPalScriptProvider>
  </div>
}

export default PayPalForm;