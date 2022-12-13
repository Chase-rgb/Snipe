const { SlashCommandBuilder } = require('discord.js');
const { addSnipe } = require('../helper/firebase')
const { snipeOnReact } = require('../helper/snipeOnReact.js')

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
    let guildID = interaction.guildId
    let sniperID = interaction.user
    let targetID = interaction.options.getUser('target1');
    let image = interaction.options.getAttachment("image")


    // console.log(sniperID);
    // console.log(targetID);
    // console.log(guildID);

    // const message = await interaction.reply(
    //     content: ""
    // )

    // addSnipe(guildID, sniperID, targetID)

    // console.log(sniperUser);

    const message = await interaction.reply({
        content: `${targetID} just got sniped by ${sniperID}`,
        files: [image],
        fetchReply: true
        
    });
    snipeOnReact(message, sniperID, targetID)
}

module.exports = {data, execute}