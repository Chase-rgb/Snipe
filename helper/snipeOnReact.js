function snipeOnReact(message, sniperId, ...targets) {
    message.react('🟩')
    message.react('🟥')

    //Filter so that the Reaction Collector knows what to look for

    const filter = (reaction, user) => {
        return (reaction.emoji.name == '🟩' || reaction.emoji.name == '🟥') && targets.includes(user)
    }

    //Set up collector to expire in 1 day
    const collector = message.createReactionCollector({ filter, time: 1000 * 5, dispose: true, maxUsers: 2})

    collector.on("collect", (reaction, user) => {
        console.log(`Collected ${user.tag}`);
    })

    collector.on("end", (collected) => {
        snipedUsers = collected.get('🟩')
        //Makes sure that a target has reacted
        snipedUsers = snipedUsers == undefined ? [] : Array.from(collected.get('🟩')?.users.cache.values()).filter(user => targets.includes(user))
        console.log(snipedUsers);

        missedUsers = collected.get('🟥')
        missedUsers = missedUsers == undefined ? [] : Array.from(collected.get('🟥')?.users.cache.values()).filter(user => targets.includes(user))
        console.log(missedUsers);

        successfulSnipedUsers = snipedUsers.filter(user => !missedUsers.includes(user))
        console.log(successfulSnipedUsers);
        // message.reactions.removeAll().catch(error => console.error("Failed to clear reactions" , error))
    })

    

}

module.exports = {
    snipeOnReact
}