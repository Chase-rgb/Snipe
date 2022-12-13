const { EmbedBuilder } = require('@discordjs/builders');
const { SlashCommandBuilder } = require('discord.js');




const data = new SlashCommandBuilder()
    .setName('leaderboard')
    .setDescription('See who the top snipers are!')

async function execute(interaction) {
    const embedMessage = new EmbedBuilder()
        .setTitle(`Sever Leaderboard`)
        .setThumbnail(`https://cdn-icons-png.flaticon.com/512/473/473409.png`)
        .setColor(0xa30000)
        .setTimestamp()

    
}

function getLeaderboardText() {
    
}

module.exports = { data, execute };