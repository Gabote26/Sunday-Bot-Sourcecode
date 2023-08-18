const { SlashCommandBuilder } = require('@discordjs/builders');
const Discord = require('discord.js')
const distube = require("distube")

module.exports = {
  data: new SlashCommandBuilder()
  .setName("queue")
  .setDescription("Para ver la lista de las canciones"),

async run(client, interaction){
    
    if(!interaction.member.voice.channel) return interaction.reply({ content: `Debes estar en un canal de voz` })
    if(interaction.guild.me.voice.channel && interaction.member.voice.channel.id !== interaction.guild.me.voice.channel.id) return interaction.reply({ content: `Debes estar en el mismo canal de voz que yo` })

    const queue = client.distube.getQueue(interaction.member.voice.channel);
    if(!queue) return interaction.reply({ content: `No hay canciones reproduciendose` });
    
    let embed = new Discord.MessageEmbed()
    .setTitle(`Lista De Canciones De <#${interaction.member.voice.channel.id}>`)
    .setDescription(
      `Canciones Reproduciendose:\n ${queue.songs.map((song, id) => `**${id + 1}**.${song.name} |\`${song.formattedDuration}\``).slice(0, 10).join("\n")}`
    )
    .setTimestamp()
    .setColor("RANDOM");

    interaction.reply({ embeds: [embed] });

}
}