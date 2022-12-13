function snipeOnReact(message, sniperId, ...targets) {
    message.react('✅')

    //Filter so that the Reaction Collector knows what to look for
    const filter = (reaction, user) => {
        return reaction.emoji.name == '✅' && targets.includes(interaction.user.id)
    }

    //Set up collector to expire in 1 day
    const collector = message.createReactionCollector({ filter, time: 8.64e+7, dispose: true})

    collector.on('collect', (reaction, user) => {
        console.log(`Collected ${reaction.emoji.name} from ${user.tag}`);
    })

    collector.on('end', collected => {
        console.log(`Collected ${collected.size} reaction`);
    })
}

module.exports = {
    snipeOnReact
}