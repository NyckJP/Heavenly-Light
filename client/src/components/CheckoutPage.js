import React, { useState } from "react"
import { Redirect } from "react-router-dom"
import { loadStripe } from '@stripe/stripe-js'
import { EmbeddedCheckoutProvider, EmbeddedCheckout } from '@stripe/react-stripe-js'

const stripePromise = loadStripe("pk_test_51R86e101Vs2rgnVPoeaLW0gSjcwoT4TpxiaY6UqlyHn9NVykRklaFOEzKRI5IF8vmLHDmajKpL0DsFvtPSFDfIoX006pja8D6G")

const CheckoutPage = () => {
    const [shouldRedirect, setShouldRedirect] = useState(false)

    if (shouldRedirect) {
        return <Redirect push to="/basket" />
    }
    
    const fetchClientSecret = async () => {
        try {
            const response = await fetch('/api/v1/stripe/create_checkout_session', {
                method: 'POST'
            })
            const parsedResponse = await response.json()
            if(response.status === 404)
                setShouldRedirect(true)
            return parsedResponse.clientSecret
        } catch (error) {
            console.log(`Error in getClientSecret fetch: ${error}`)
        }
    }

    const options = {fetchClientSecret}

    return(
        <div id="checkout" className="checkout">
            <h1>Review and Payment</h1>
            <EmbeddedCheckoutProvider stripe={stripePromise} options={options}>
                <EmbeddedCheckout />
            </EmbeddedCheckoutProvider>
        </div>
    )
}

export default CheckoutPage