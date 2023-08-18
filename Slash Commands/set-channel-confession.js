const Discord = require("discord.js")
const { SlashCommandBuilder } = require("@discordjs/builders")
const db = require("megadb")
const canalf = new db.crearDB("canalConfesiones")

module.exports = {
    data: new SlashCommandBuilder()
    .setName("confesiones-setchannel")
    .setDescription("Canal donde se enviaran las confesiones del servidor")
    .addChannelOption(c => c.setName("canal").setDescription("Canal donde se enviaran las confesiones").setRequired(false)),

    async run(client, interaction){
        
        let canal = interaction.options.getChannel("canal")

      if(canal){
        if(canal.type !== "GUILD_TEXT") return interaction.reply({ content: "El canal debe ser de texto", ephemeral: true })

        interaction.reply({ content: `El canal de confesiones fue establecido en <#${canal.id}>` })
        canalf.establecer(interaction.guild.id, canal.id)
      } else {
        let asd;
        if(canalf.tiene(interaction.guild.id)){
          asd = `<#${await canalf.obtener(interaction.guild.id)}>`
        } else {
          asd = "No establecido"
        }

        const canalFalseOptions = new Discord.MessageEmbed()
        .setTitle("Informacion")
        .addField("Canal", `${asd}`)

        interaction.reply({ embeds: [canalFalseOptions] })
      }

    }
}