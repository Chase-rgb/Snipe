const { SlashCommandBuilder } = require('discord.js');




const data = new SlashCommandBuilder()
    .setName('leaderboard')
    .setDescription('See who the top snipers are!')

async function execute(interaction) {
    
}

module.exports = { data, execute };