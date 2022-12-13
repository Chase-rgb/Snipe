const { SlashCommandBuilder } = require('discord.js');
const numTargets = 5

const data = new SlashCommandBuilder()
	.setName('snipe_multiple')
	.setDescription("Enter list of people being snipe (don't need to select all options)!")
    .addUserOption(option => option.setName('target1').setDescription("Target"))
    .addUserOption(option => option.setName('target2').setDescription("Target"))
    .addUserOption(option => option.setName('target3').setDescription("Target"))
    .addUserOption(option => option.setName('target4').setDescription("Target"))
    .addUserOption(option => option.setName('target5').setDescription("Target"));
	// .addUserOption(option =>
	// 	option.setName('user')
	// 		.setDescription('Get Sniped User')
    //         .setRequired(true));

execute = async(interaction) => {
    let users = []
    try {
        for (let i = 0; i < numTargets; i++) {
            const user = interaction.options.getUser('target' + i);
            if (user) {
                users.push(user)
            }
        }  
    } catch (error) {
        console.log(error)
    }
    
    console.log(users)
    // const user = interaction.options.getUser('target1');
    // console.log(user)

    await interaction.reply('Pong!');
}

module.exports = {data, execute}