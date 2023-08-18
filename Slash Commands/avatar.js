const Discord = require("discord.js")
const { SlashCommandBuilder } = require("@discordjs/builders")
const { MessageEmbed } = require("discord.js")

module.exports = {
    data: new SlashCommandBuilder()
    .setName("avatar")
    .setDescription("Muestra tu avatar o el de otro usuario")
    .addUserOption((option) => option.setName('user').setDescription('El miembro del que se mostrara el avatar').setRequired(false)),
    
    async run(client, interaction, args){
    
        const user = interaction.options.getUser('user') || interaction.user;
        const avatarURL = user.displayAvatarURL({ dynamic: true, size: 4096 });

    const embed = new MessageEmbed()
      .setColor("RANDOM")
      .setTitle(`**Avatar de:** ${user.username}'`)
      .setImage(avatarURL);

    interaction.reply({ embeds: [embed] });
    }
}


