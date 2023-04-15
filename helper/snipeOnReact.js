const { addSnipe } = require('../helper/firebase')
const { buildTargetUserString } = require('../helper/stringHelper.js')

function snipeOnReact(message, sniperId, ...targets) {
    message.react('🟩')
    message.react('🟥')

    //Filter so that the Reaction Collector knows what to look for
    const filter = (reaction, user) => {
        return (reaction.emoji.name == '🟩' || reaction.emoji.name == '🟥') && targets.includes(user)
    }

    //Set up collector to expire in 1 day
    const collector = message.createReactionCollector({ filter, time: 1000 * 86400, dispose: true, maxUsers: targets.length})

    //Debug message
    console.log(`${buildTargetString(targetID)} have just been sniped. Pending acceptance`)

    collector.on("collect", (reaction, user) => {
        console.log(`Collected ${user.tag}`);
    })


    collector.on("end", async (collected) => {
        snipedUsers = collected.get('🟩')
        //Makes sure that a target has reacted
        snipedUsers = snipedUsers == undefined ? [] : Array.from(collected.get('🟩')?.users.cache.values()).filter(user => targets.includes(user))
        // console.log(snipedUsers);

        missedUsers = collected.get('🟥')
        missedUsers = missedUsers == undefined ? [] : Array.from(collected.get('🟥')?.users.cache.values()).filter(user => targets.includes(user))
        // console.log(missedUsers);

        successfulSnipedUsers = snipedUsers.filter(user => !missedUsers.includes(user))
        // console.log(successfulSnipedUsers);
        message.reactions.removeAll().catch(error => console.error("Failed to clear reactions" , error))

        //Check to see if there were any successful snipes
        if (successfulSnipedUsers.length == 0) {
            message.reply({content: "No successful snipes this time ;-;"})
            return
        //If there are successful snipes, update database
        }
        if (await !addSnipe(message.guildId, sniperId, successfulSnipedUsers)) {
            message.reply({content: "Error in updating database"})
            return
        }

        let responseMessage = ""
        if (successfulSnipedUsers.length > 0) {
            responseMessage += `Snipe confirmed on ${buildTargetUserString(successfulSnipedUsers)}!`
        }
        if (missedUsers.length > 0) {
            responseMessage += `\n${buildTargetUserString(missedUsers)} successfully got away!`
        }
        message.reply({content: `${responseMessage}`})
    })


}

module.exports = {
    snipeOnReact
}