const Discord = require("discord.js")

module.exports = {
    name: "lock-channel",
    alias: [],

    run: async (bot, message, args) => {
        
        if(!message.member.permissions.has("ADMINISTRATOR")) return message.channel.send("No tienes los permisos necesarios")

        const everyone = message.guild.roles.cache.find(r => r.name === "@everyone")

        message.channel.permissionOverwhrites.edit(everyone, { SEND_MESSAGES: false })

        message.channel.send({ content: "Este canal ha sido bloqueado!"})
    }
}