const { SlashCommandBuilder } = require('discord.js');
const { addSnipe } = require('../helper/firebase')
const { snipeOnReact } = require('../helper/snipeOnReact.js')
const { buildTargetString } = require('../helper/stringHelper.js')
const numTargets = 5

const data = new SlashCommandBuilder()
	.setName('snipe_multiple')
	.setDescription("Enter list of people being snipe (don't need to select all options)!")
    .addAttachmentOption(option => option.setName('image').setDescription("Snipe image").setRequired(true))
    .addUserOption(option => option.setName('target1').setDescription("Target").setRequired(true))
    // .addUserOption(option => option.setName('target2').setDescription("Target"))
    // .addUserOption(option => option.setName('target3').setDescription("Target"))
    // .addUserOption(option => option.setName('target4').setDescription("Target"))
    // .addUserOption(option => option.setName('target5').setDescription("Target"));
for (let i = 1; i < numTargets; i++){ 
    data.addUserOption(option => option.setName(`target${i+1}`).setDescription("Target"))
}

execute = async(interaction) => {
    let sniperID = interaction.user
    let targetID = []
    let image = interaction.options.getAttachment("image")

    try {
        for (let i = 0; i < numTargets; i++) {
            const user = interaction.options.getUser(`target${i+1}`);
            if (user) {
                targetID.push(user)
            }
        }  
    } catch (error) {
        console.log(error)
    }

    const message = await interaction.reply({
        content: `${buildTargetString(targetID)} just got sniped by ${sniperID}`,
        files: [image],
        fetchReply: true
        
    });

    snipeOnReact(message, sniperID, ...targetID)
}

module.exports = {data, execute}