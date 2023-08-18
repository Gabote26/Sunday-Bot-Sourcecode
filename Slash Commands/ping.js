const Discord = require("discord.js")
const { SlashCommandBuilder } = require("@discordjs/builders")

module.exports = {
    data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Ve la latencia del bot"),

    async run(client, interaction){
        const pingEmbed = new Discord.MessageEmbed()
        .setTitle("Ping")
        .setDescription(`🏓**Pong ${client.ws.ping}ms**`)
        .setColor("RANDOM")
        .setTimestamp()
        
         interaction.reply({ embeds: [pingEmbed] })
    }
}