const Discord = require("discord.js")
const { SlashCommandBuilder } = require("@discordjs/builders")
const db = require("megadb")
const canales = new db.crearDB("canales")

module.exports = {
    data: new SlashCommandBuilder()
    .setName("suggest-setchannel")
    .setDescription("Indica el canal donde se mandaran las sugerencias")
    .addChannelOption(p => p.setName("canal").setDescription("Canal donde se estableceran las sugerencias").setRequired(true)),

    async run(client, interaction){
        
        let canal = interaction.options.getChannel("canal")

        if(canal.type !== "GUILD_TEXT") return interaction.reply({ content: "El canal debe ser de texto" })

        canales.establecer(interaction.guild.id, canal.id)
        interaction.reply({ content: `Se establecio el canal en <#${canal.id}>.` })
    }
}