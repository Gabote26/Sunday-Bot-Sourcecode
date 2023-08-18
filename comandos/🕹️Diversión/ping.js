const Discord = require("discord.js")

module.exports = {
    name: "ping",
    alias: [],

    run: async (bot, message, args) => {
        const pingEmbed = new Discord.MessageEmbed()
        .setTitle("Ping")
        .setDescription(`🏓**Pong ${bot.ws.ping}ms**`)
        .setColor("RANDOM")
        .setTimestamp()

        message.channel.send({embeds: [pingEmbed]})
    }
}