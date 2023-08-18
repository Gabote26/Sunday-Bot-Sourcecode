const Discord = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders')
const distube = require("distube")

module.exports = {
  data: new SlashCommandBuilder()
  .setName("volume")
  .setDescription("Para cambiar el volumen de la musica")
  .addStringOption(option => option.setName("volumen").setDescription("El volumen nuevo").setRequired(true)),


  async run(client, interaction){

    if(!interaction.member.voice.channel) return interaction.reply({ content: `Debes estar en un canal de voz` })
    if(interaction.guild.me.voice.channel && interaction.member.voice.channel.id !== interaction.guild.me.voice.channel.id) return interaction.reply({ content: `Debes estar en el mismo canal de voz que yo` })

    let queue = client.distube.getQueue(interaction.member.voice.channel)
    if(!queue) return interaction.reply({ content: `No se estan reproduciendo ninguna cancion` })

    const volume = interaction.options.getString('volumen')
    if(isNaN(volume)) return interaction.reply({ content: `El volumen debe ser un numero` })
    if(parseInt(volume) < 0) return interaction.reply({ content: `El volumen debe ser mayor que 0` })
    if(parseInt(volume) > 100) return interaction.reply({ content: `El volumen debe ser menor que 100` })


//parseInt


    try {
      client.distube.setVolume(interaction.member.voice.channel, parseInt(volume))
      interaction.reply({ content: `El volumen fue establecido a ${volume}%` })
    } catch(err) {
      console.log(err)
      interaction.reply({ content: `Ha surgido un error inesperado`})
    }

  }
}