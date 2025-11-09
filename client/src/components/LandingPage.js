import React from "react"
import ProductList from "./ProductList.js"

const LandingPage = () => {
    return (
        <>
            <div className="hero-section">
                <div className="hero-text">
                    <h1>Heavenly Light T-Shirt Printing</h1>
                    <a href="#products"><h3>Check Out Our Designs <i className="fa-solid fa-arrow-down" /></h3></a>
                </div>
            </div>
            <ProductList />
        </>
    )
}

export default LandingPage