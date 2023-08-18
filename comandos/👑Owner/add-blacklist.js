const Discord = require("discord.js")
const db = require("megadb")
const blacklist = new db.crearDB("blacklist")

module.exports = {
    name: "addblacklist",
    alias: [],

    run: async (bot, message, args) => {
         
        let user = message.mentions.members.first()
        if(!user) return message.channel.send({ content: "Tienes que mencionar a una persona" })

        if(blacklist.has(user.id)) return message.channel.send("Este usuario ya esta en la blacklist")

        blacklist.establecer(user.id, user.user.tag)

        message.channel.send({ content: "El usuario se registro correctamente" })
    }
}