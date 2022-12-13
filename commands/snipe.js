const { SlashCommandBuilder } = require('discord.js');

const data = new SlashCommandBuilder()
	.setName('snipe')
	.setDescription("Enter person being sniped")
    .addAttachmentOption(option => option.setName('image').setDescription("Snipe image").setRequired(true))
    .addUserOption(option => option.setName('target1').setDescription("Target").setRequired(true));
	// .addUserOption(option =>
	// 	option.setName('user')
	// 		.setDescription('Get Sniped User')
    //         .setRequired(true));

execute = async(interaction) => {
    let sniperUser = interaction.user
    let targetUser = interaction.options.getUser('target1');

    console.log(sniperUser);

    await interaction.reply('Pong!');
}

module.exports = {data, execute}