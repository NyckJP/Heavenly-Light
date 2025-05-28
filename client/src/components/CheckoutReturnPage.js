import React, { useState, useEffect } from "react"

const CheckoutReturnPage = () => {
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

    useEffect(() => {
        getCheckoutStatus()
    }, [])  

    if (status === 'open') {
        return (
          <Navigate to="/checkout" />
        )
      }
    
      if (status === 'complete') {
        return (
          <section id="success" className="success">
            <p>
              We appreciate your business! A confirmation email will be sent to {customerEmail}.
    
              If you have any questions, please email <a href="mailto:orders@example.com">orders@example.com</a>.
            </p>
          </section>
        )
      }
    
      return null;
}

export default CheckoutReturnPage