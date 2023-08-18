const Discord = require("discord.js")
const db = require("quick.db")

module.exports = {
  name: "snipe",
  alias: ["message-snipe"],
  run: async (bot, message, args) => {
    
    const msg = client.snipes.get(message.channel.id)
    if(!msg) return message.channel.send("No hay nada que regenerar!")
    const embed = new Discord.MessageEmbed()
    .setAuthor(msg.author)
    .setDescription(msg.content)
    if(msg.image)embed
    .setImage(msg.image)
    .setColor("00FFFF")
    .setTimestamp()
    
    message.channel.send({embeds: {embed}})
   
    
  }
}