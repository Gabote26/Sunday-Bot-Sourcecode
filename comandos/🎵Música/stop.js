module.exports = {
    name: "stop",
    aliases: ["desconectar"],
    desc: "Desconecta al bot de la sala de voz.",
    run: async (client, message, args, prefix) => {
        //comprobaciones previas
        if(!args.length) return messages.reply(`<:not_verified:1045797226385002667> **Especifica el nombre de una canción!**`)
        if(!message.member.voice?.channel) return message.reply(`<:not_verified:1045797226385002667> **Tienes que estar en un canal de voz para ejecutar este comando!**`)
        if(message.guild.me.svoice?.channel && message.member.voice?.channel.id != message.guild.me.voice?.channel.id) return message.reply(`<:not_verified:1045797226385002667> **Tienes que estar en el mismo canal de voz que yo para ejecutar este comando**`)
        client.distube.stop(message)
        message.reply(`🏃**Desconectado!**`)
    }
}