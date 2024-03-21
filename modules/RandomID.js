const RandomID = (prefix, length) => {
    return `${prefix}_${Math.floor(Math.random() * (10 ** length))}`
}

export default RandomID