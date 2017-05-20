// puts some JSON data into an array
function jsonExtractor(data, shopType, index) {
    switch(shopType) {
        case "xkom":     
            xkomArrayData_[index] = data;
            break;
        case "rtveuroagd":              
            rtveuroagdArrayData_[index] = data;
            break;
        case "alto":     
            altoArrayData_[index] = data;
            break;
        case "komputronik":     
            komputronikArrayData_[index] = data;
            break;
        case "morele":
           moreleArrayData_[index] = data;
           break;
        default:
            window.alert("Problem with pushing JSON data into an array!");
    }
}

// gets data from array from specified index
function getArrayData(shopType, index) {
    switch(shopType) {
        case "xkom":     
            return xkomArrayData_[index];
        case "rtveuroagd":              
            returnrtveuroagdArrayData_[index];
        case "alto":     
            return altoArrayData_[index];
        case "komputronik":     
            return komputronikArrayData_[index];
        case "morele":
           return moreleArrayData_[index];
        default:
            window.alert("Problem with getting data from an array!");
    }
}