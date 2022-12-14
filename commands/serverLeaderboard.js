const { EmbedBuilder } = require('@discordjs/builders');
const { SlashCommandBuilder } = require('discord.js');
const { getGuildSniperData } = require('../helper/firebase.js')



const data = new SlashCommandBuilder()
    .setName('leaderboard')
    .setDescription('See who the top snipers are!')

async function execute(interaction) {
    let guildID = interaction.guildId

    const embedMessage = new EmbedBuilder()
        .setTitle(`Sever Leaderboard`)
        .setThumbnail(`https://cdn-icons-png.flaticon.com/512/473/473409.png`)
        .setColor(0xa30000)
        .setTimestamp()
        .setDescription(await getGuildSniperData(guildID))    

    const message = await interaction.reply({
        embeds: [embedMessage]
    });
}

function getLeaderboardText() {

}

module.exports = { data, execute };