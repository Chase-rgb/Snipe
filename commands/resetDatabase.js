const { SlashCommandBuilder } = require('discord.js');
const { deleteServerSnipeData } = require('../helper/firebase.js')

const data = new SlashCommandBuilder()
	.setName('reset_database')
	.setDescription("[Owner Only Command] This command will completely reset the database")

execute = async(interaction) => {
    let currUser = interaction.user
    let ownerId = interaction.member.guild.ownerId
    let message
    if (currUser.id != ownerId) {
        interaction.reply({content: "This command is only available to the owner", ephemeral: true})
        return
    } else {
        message = await interaction.reply({content: "Are you 100% about this? There's no going back once you click that green button.", fetchReply: true})
    }
    message.react('🟩')
    message.react('🟥')

    const filter = (reaction, user) => {
        return (reaction.emoji.name == '🟩' || reaction.emoji.name == '🟥') && user.id == ownerId && user.id == "280538761710796800"
    }

    const collector = message.createReactionCollector({ filter, time: 1000 * 10, dispose: true, maxUsers: 1})

    collector.on("end", async (collected) => {
        let accept = collected.get('🟩')
        if (accept == undefined) {
            // await deleteServerSnipeData(collected.)
            message.reply("Reset did not take place. Database remains unchanged")
        } else {
            let guildId = accept.message.guildId
            await deleteServerSnipeData(guildId)
            message.reply("Reset initiated. All scores reset. Happy hunting!")
        }

        message.reactions.removeAll().catch(error => console.error("Failed to clear reactions" , error))

    })


}

module.exports = {data, execute}