module.exports = {
    name: "play",
    aliases: ["reproducir"],
    desc: "Reproduce una cancion",
    run: async (client, message, args, prefix) => {
        //comprobaciones previas
        const queue = cient.distube.getQueue(message);
        if(!queue) return message.reply(`<:not_verified:1045797226385002667> **No hay ninguna cancion reproduciendose**`);
        if(!message.member.voice?.channel) return message.reply(`<:not_verified:1045797226385002667> **Tienes que estar en un canal de voz para ejecutar este comando!**`)
        if(message.guild.me.svoice?.channel && message.member.voice?.channel.id != message.guild.me.voice?.channel.id) return message.reply(`<:not_verified:1045797226385002667> **Tienes que estar en el mismo canal de voz que yo para ejecutar este comando**`)
        client.distube.play(message.member.voice?.channel, args.join(""), {
            member: message.member,
            textChabel: message.channel,
            message
        });
        message.reply(`🔎**Buscando \`${args.join(" ")}\`...**`)
    }
}