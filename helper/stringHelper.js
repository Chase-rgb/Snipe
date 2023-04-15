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

// When given a list of names, prints out names in listing format: (John, Alex, and Jack)
function buildTargetUserString(targets) {
    try {
        if (targets.length == 1) {
            return `${targets[0].username}`
        } else if (targets.length == 2) {
            return `${targets[0].username} and ${targets[1].username}`
        } else {
            let currString = ""
            for (let i = 0; i < targets.length - 1; i++){
                currString += `${targets[i].username}, `
            }
            currString += `and ${targets[targets.length - 1].username}`
            return currString
        }
    } catch (error) {console.error("Error in building target user strings", error)}
}

module.exports = {
    buildTargetString, 
    buildTargetUserString
}