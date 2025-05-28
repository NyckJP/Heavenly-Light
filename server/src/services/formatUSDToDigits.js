const formatUSDToDigits = (price) => {
    const digitArray = price.split(".")
    const digits = digitArray[0] + digitArray[1]
    return digits
}

export default formatUSDToDigits