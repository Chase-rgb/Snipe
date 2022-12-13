function buildTargetString(targets) {
    if (targets.length == 1) {
        return `${targets[0]}`
    } else if (targets.length == 2) {
        return `${targets[0]} and ${targets[1]}`
    } else {
        let currString = ""
        for (let i = 0; i < targets.length - 1; i++){
            currString += `${targets[i]}, `
        }
        currString += `and ${targets[targets.length - 1]}`
        return currString
    }
}

module.exports = {
    buildTargetString
}