const Discord = require("discord.js")
const { Util } = require("discord.js")

module.exports = {
    name: "say",
    alias: [],

    run: async (bot, message, args) => {
        
        let mensaje = args.join(" ")

        for(let i = 0; mensaje.includes("@here") || mensaje.includes("@everyone"); i++){
            mensaje = mensaje.replace(/@here/g, "here")
            mensaje = mensaje.replace(/@everyone/g, "everyone")
        }

        return message.channel.send(Util.cleanContent(mensaje, message))
    }
}