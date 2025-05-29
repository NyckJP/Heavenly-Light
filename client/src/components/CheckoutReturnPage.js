import React, { useState, useEffect } from "react"

const CheckoutReturnPage = (props) => {
    const [status, setStatus] = useState(null)
    const [customerEmail, setCustomerEmail] = useState('')

    const getCheckoutStatus = async () => {
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const sessionId = urlParams.get('session_id');
    
        const response = await fetch(`api/v1/stripe/session-status?session_id=${sessionId}`)
        const parsedResponse = await response.json()
        setStatus(parsedResponse.status)
        setCustomerEmail(parsedResponse.customer_email)
    }

    const clearBasket = async () => {
      const response = await fetch(`api/v1/user-sessions/new-guest`, {
        method: "post"
      })
      props.getBasketCount()
    }

    useEffect(() => {
        getCheckoutStatus()
    }, [])  

    if (status === 'open') {
        return (
          <Navigate to="/checkout" />
        )
      }
    
      if (status === 'complete') {
        clearBasket()
        return (
          <section id="success" className="success">
            <h1>Success</h1>
            <p>
              We appreciate your business! A confirmation email will be sent to {customerEmail}.
            </p>
            <p>
              If you have any questions, please email <a href="mailto:orders@example.com">orders@example.com</a>.
            </p>
            <a href="/" className="button">Back to Products</a>
          </section>
        )
      }
    
      return null;
}

export default CheckoutReturnPage