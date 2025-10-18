import React, { useState, useEffect } from "react"

const VariationImage = props => {
    const [leftArrow, setLeftArrow] = useState(false)
    const [rightArrow, setRightArrow] = useState(false)
    
    const getArrows = () => {
        if(props.renderedVariation == 0){
            setLeftArrow(false)
        } else {
            setLeftArrow(true)
        }
        if(props.renderedVariation == props.variationList.length-1){
            setRightArrow(false)
        } else {
            setRightArrow(true)
        }
    }
    
    let renderLeftArrow = <i className="fa-solid fa-arrow-left hidden" />
    let renderRightArrow = <i className="fa-solid fa-arrow-right hidden" />
    if(leftArrow){
        renderLeftArrow = <i className="fa-solid fa-arrow-left" onClick={() => props.changeSlide(-1)}/>
    }
    if(rightArrow){
        renderRightArrow = <i className="fa-solid fa-arrow-right" onClick={() => props.changeSlide(1)}/>
    }
    
    useEffect(() => {
        getArrows()
    }, [props.variationList, props.renderedVariation])

    let image = "https://placehold.co/500x600"
    if (props.imageUrl != "image") {
        image = props.imageUrl
    }
    
    return (
        <section className="left-side">
            {renderLeftArrow}
            <img src={image} />
            {renderRightArrow}
        </section>
    )
}

export default VariationImage