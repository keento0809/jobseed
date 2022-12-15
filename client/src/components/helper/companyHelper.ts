const getLat = (location : string) => {
    let lat = location.split(":")[1]
    let lat2 = lat.split(",")[0]
    return lat2;
}

const getLng = (location : string) => {
    let lng = location.split(":")[2]
    let lng2 = lng.split("}")[0]
    return lng2;
}

export {getLng, getLat};