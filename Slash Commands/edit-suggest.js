const Discord = require("discord.js")
const { SlashCommandBuilder } = require("@discordjs/builders")
const db = require("megadb")
const canales = new db.crearDB("canales")

module.exports = {
    data: new SlashCommandBuilder()
    .setName("editar-sugerencia")
    .setDescription("Edita una sugerencia")
    .addStringOption(p => p.setName("id").setDescription("Id de la sugerencia").setRequired(true))
    .addStringOption(p => p.setName("texto").setDescription("Nuevo texto de la sugerencia existente").setRequired(true)),

    async run(client, interaction){
        
        let id = interaction.options.getString("id")
        let texto = interaction.options.getString("texto")
        let mensaje = await interaction.channel.messages.fetch(id)
        if(mensaje.author.id !== client.user.id) return interaction.reply( "La id proporcionada no es valida, o la sugerencia le pertenece a alguien más")

        const editSuggestEmbed = new Discord.MessageEmbed()
        .setTitle("Sugerencias")
        .setDescription(`__**Tu sugerencia:**__ **${texto}**`)
        .setColor("AQUA")
        .setTimestamp()
        
        mensaje.edit({ embeds: [editSuggestEmbed] })
        interaction.reply( { content: "Se edito tu sugerencia con exito", ephemeral: true })

    }
}