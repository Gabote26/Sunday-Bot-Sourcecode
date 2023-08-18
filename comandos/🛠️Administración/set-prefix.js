const schema = require(`${process.cwd()}/modelos/servidor.js`)

module.exports = {
    name: "set-prefix",
    aliases: ["establecer-prefijo"],
    desc: "Establece un nuevo prefix  para el bot en tu servidor",
    run: async (client, message, args, prefix) => {
        if(!args[0]) return message.reply(`❌ Tienes que especificar el prefix nuevo para el bot`)
        await schema.findOneAndUpdate({guildID: message.guild.id}, {
            prefijo: args[0]
        })
        return message.reply(`✅ El prefix fue cambiado de \`${prefix}\` a \`${args[0]}\`` )
    }
}
