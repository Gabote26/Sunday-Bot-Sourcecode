const Discord = require('discord.js');
const { Client, MessageEmbed } = require('discord.js');
 
module.exports = {
  name: "kick",
  alias: [],
 
run: async (bot, message, args) => {
 
  var perms = message.member.hasPermission("KICK_MEMBERS")
  if(!perms) return message.channel.send("No puedes expulsar a los miembros")
 
  const user = message.mentions.members.first()
  if(!user) return message.channel.send("Debes mencionar a un miembro que quieres expulsar")
 
  if(user === message.author) return message.channel.send("No puedes expulsarte a ti mismo")
 
  var razon = args.slice(1).join(' ')
  if(!razon){
    razon = 'No hay razon'
  }
 
  message.guild.member(user).kick(razon);

  const kickembed = new Discord.MessageEmbed()

  .setTitle("Usuario kickeado")
  .setDescription(`**El usuario** *${user}* **fue expulado por** *${razon}* \n\n**Moderador:** *${message.author}*`)
  .setColor("AQUA")
  .setTimestamp()
 
  message.channel.send({ embeds: [kickembed] })
 
  }
  
}
