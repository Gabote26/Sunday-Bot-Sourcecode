const Discord = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders')
const distube = require("distube")

module.exports = {
  data: new SlashCommandBuilder()
  .setName("play")
  .setDescription("Para reproducir una cancion")
  .addStringOption(option => option.setName("cancion").setDescription("La cancion que quieres reproducir").setRequired(true)),

  async run(client, interaction){

    const cancion = interaction.options.getString('cancion')
    if(!interaction.member.voice.channel) return interaction.reply({ content: `Debes estar en un canal de voz` })

    if(interaction.guild.me.voice.channel && interaction.member.voice.channel.id !== interaction.guild.me.voice.channel.id) return interaction.reply({ content: `Debes estar en el mismo canal de voz que yo` })

    interaction.client.distube.playVoiceChannel(
      interaction.member.voice.channel,
      cancion,
      {
        textChannel: interaction.channel,
        member: interaction.member
      }
    );

    interaction.reply({ content: `Reproduciendo cancion...` })


  }
}