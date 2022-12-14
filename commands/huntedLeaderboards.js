const { EmbedBuilder } = require('@discordjs/builders');
const { SlashCommandBuilder } = require('discord.js');
const { getGuildHuntedData } = require('../helper/firebase.js')


const data = new SlashCommandBuilder()
    .setName('hunted_leaderboard')
    .setDescription('See who are the most hunted!')

async function execute(interaction) {
    let guildID = interaction.guildId

    const embedMessage = new EmbedBuilder()
        .setTitle(`Hunted Leaderboard`)
        .setThumbnail(`https://cdn-icons-png.flaticon.com/512/473/473409.png`)
        .setColor(0xa30000)
        .setTimestamp()
        .setDescription(await getGuildHuntedData(guildID))    

    const message = await interaction.reply({
        embeds: [embedMessage]
    });
}

module.exports = { data, execute };