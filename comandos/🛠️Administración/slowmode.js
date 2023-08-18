const Discord = require("discord.js")
const ms = require("ms")

module.exports = {
    name: "slowmode",
    alias: [],

    run: async (bot, message, args) => {
        
        let channel = message.channel;

        let tiempo = args.join(" ")

        if(tiempo === "desactivar"){
            channel.setRateLimitPerUser(0)
            channel.send("El slowmode fue desactivado")
        }

        let convertidor = ms(tiempo)

        let aSegundo = Math.floor(convertidor / 1000)

        if(!aSegundo) return channel.send("El numero que se ha especificado no es válido")

        await channel.setRateLimitPerUser(aSegundo)

        channel.send(`El slowmode del canal se ha establecido en ${tiempo}`)
        
    }
}