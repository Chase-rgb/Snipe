const { SlashCommandBuilder } = require('discord.js');
const { snipeOnReact } = require('../helper/snipeOnReact.js')
const { buildTargetString } = require('../helper/stringHelper.js')
const numTargets = 5

const data = new SlashCommandBuilder()
	.setName('snipe')
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

async function execute(interaction) {
    let sniperID = interaction.user
    let targetID = []
    let image = interaction.options.getAttachment("image")

    try {
        for (let i = 0; i < numTargets; i++) {
            const user = interaction.options.getUser(`target${i+1}`);
            // console.log(user);
            if (user == undefined) {continue}

            // Don't allow the snipe bot to be sniped
            if (user.id == "1051605729531924590") {
                interaction.reply({content: "Unfortunately, you can't snipe the bot ;-;", ephemeral: true})
                return 
            }

            // Don't allow users to snipe themselves
            if (user.id == sniperID.id) {
                interaction.reply({content: "Sniping yourself sounds like a bad time ;-;", ephemeral: true})
                return
            }
            targetID.push(user)
            
        }  
    } catch (error) {
        
        console.log(error)
    }
    targetID = [...new Set(targetID)];
    const message = await interaction.reply({
        content: `${buildTargetString(targetID)} just got sniped by ${sniperID}. (If you're a target, please confirm the snipe by reacting)`,
        files: [image],
        fetchReply: true
    });

    snipeOnReact(message, sniperID, ...targetID)
}

module.exports = {data, execute}