const Discord = require("discord.js")
const { SlashCommandBuilder } = require("@discordjs/builders")

module.exports = {
    data: new SlashCommandBuilder()
    .setName("nuke")
    .setDescription("Elimina el canal y lo crea de nuevo"),

    async run(client, interaction){
            var posicion = interaction.channel.position

            interaction.channel.clone().then(canal => {
                interaction.channel.delete()


                canal.setPosition(posicion)

                const nukeEmbed = new Discord.MessageEmbed()
                .setTitle("Canal Nukeado")
                .setDescription("El canal fue nukeado")
                .setColor("DARK_RED")
                .setTimestamp()

                canal.send({ embeds: [nukeEmbed] })

            })

    }
}