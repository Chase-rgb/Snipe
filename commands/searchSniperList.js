const { EmbedBuilder } = require('@discordjs/builders');
const { SlashCommandBuilder } = require('discord.js');
const { getSniperData } = require('../helper/firebase.js')

const data = new SlashCommandBuilder()
    .setName('search_snipe_list')
    .setDescription('See the snipe list of someone else!')
    .addUserOption(option => option.setName('sniper').setDescription("Display this sniper's list").setRequired(true));

async function execute(interaction) {
    let guildID = interaction.guildId
    let sniperID = interaction.options.getUser('sniper');

    console.log(sniperID);

    const embedMessage = new EmbedBuilder()
        .setTitle(`${sniperID.username}'s Hunted Leaderboard`)
        .setThumbnail(`https://cdn-icons-png.flaticon.com/512/473/473409.png`)
        .setColor(0xa30000)
        .setTimestamp()
        .setDescription(await getSniperData(guildID, sniperID))    

    const message = await interaction.reply({
        embeds: [embedMessage]
    });
}

module.exports = { data, execute };