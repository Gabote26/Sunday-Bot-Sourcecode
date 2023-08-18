const Discord = require('discord.js');
const { Client, MessageEmbed } = require('discord.js');
 
module.exports = {
  name: "unban",
  alias: [],
 
run: async (bot, message, args) => {
 
  var perms = message.member.hasPermission("BAN_MEMBERS")
  if(!perms) return message.channel.send("No tienes suficientes permisos")
 
  if(!message.guild.me.hasPermission("BAN_MEMBERS")) return message.channel.send("No tengo suficientes permisos")
 
  let userID =  args[0];
  if(!userID) return message.channel.send("Debes escribir una ID ")
  const member = await client.users.fetch(userID)
 
  message.guild.fetchBans().then(bans => {
    if(bans.size === 0) return message.channel.send("Este servidor no tiene ningun miembro baneado :D")
 
    let bUser = bans.find(b => b.user.id == userID)
    if(!bUser) return message.channel.send("Ese miembro no esta baneado ")
 
    message.guild.members.unban(bUser.user)
  })
 
  const unbanembed = new Discord.MessageEmbed()
 
  .setTitle('Usuario Desbaneado')
  .setDescription(`El usuario **${member.username}** fue desbaneado`)
  .setColor("GREEN")
  .setTimestamp();
 
  message.channel.send({ embeds: [unbanembed] });
 
  }
 
}