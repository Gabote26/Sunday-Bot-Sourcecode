const Discord = require("discord.js")
const { SlashCommandBuilder } = require("@discordjs/builders")
const db = require("megadb")
const canales = new db.crearDB("canales")

module.exports = {
    data: new SlashCommandBuilder()
    .setName("eliminar-sugerencia")
    .setDescription("Elimina una sugerencia")
    .addStringOption(p => p.setName("id").setDescription("Id de la sugerencia").setRequired(true)),

    async run(client, interaction){
        
        let id = interaction.options.getString("id")
        let mensaje = await interaction.channel.messages.fetch("id")
        if(mensaje.author.id !== client.user.id) return interaction.reply( "La id proporcionada no es valida, o la sugerencia le pertenece a alguien más")
        
        mensaje.delete()
        interaction.reply("**Se ha eliminado la sugerencia**")
    }
}