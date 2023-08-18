const Discord = require('discord.js');
const { Client, MessageEmbed } = require('discord.js');
 
module.exports = {
  name: "ban",
  alias: [],
 
run: async (bot, message, args) => {
 
if(!message.guild.me.hasPermission("BAN_MEMBERS")) return message.channel.send('No tengo suficientes permisos')
 
let user = message.mentions.members.first();
 
let banReason = args.join(' ').slice(22);
 
if(!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send("No tienes suficientes permisos")
 
if(!user) return message.channel.send("Debes mencionar a alguien")
 
if(message.member.roles.highest.comparePositionTo(user.roles.highest) <= 0) return message.channel.send("No puedes banear a un miembro mayor o igual que tu en roles")
 
if(user === message.author) return message.channel.send("No puedes banearte a ti mismo")
 
if(!banReason) return message.channel.send("Debes escribir una razon")
 
user.ban({ reason: banReason})
 
const banembed = new Discord.MessageEmbed()
 
.setTitle('Miembro baneado')
.setDescription(`El usuario **${user}** ha sido baneado por **${banReason}**`)
.setColor("GREEN")
.setTimestamp();
 
message.channel.send({ embeds: [banembed] });
 
  }
 
}