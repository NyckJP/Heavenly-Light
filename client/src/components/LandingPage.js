import React from "react"
import ProductList from "./ProductList.js"

const LandingPage = () => {
    return (
        <>
            <div className="hero-section">
                <h1>Heavenly Light T-Shirt Printing</h1>
                <h3>Check Out Our Designs <a href="#products"><i class="fa-solid fa-arrow-down" /></a></h3>
            </div>
            <ProductList />
        </>
    )
}

export default LandingPage