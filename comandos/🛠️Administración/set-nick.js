const { MessageEmbed } = require('discord.js');
const db = require('quick.db');
module.exports = {
     name: "set-nick",
     alias: ["sn", 's-nick'],
   run: async (bot, message, args) => {
        if (!message.member.permissions.has("MANAGE_GUILD")) return message.channel.send("**No tienes permiso para cambiar los nombres de Usuarios! - Necesitas el permiso de [MANAGE_GUILD]**");

        if (!message.guild.me.permissions.has("CHANGE_NICKNAME")) return message.channel.send("**No tengo permiso para cambiar los nombres de Usuarios! - Necesito el permiso de [CHANGE_NICKNAME]**");
      
        if (!args[0]) return message.channel.send("**Ingresa un usuario!**")
      
        let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(r => r.user.username.toLowerCase() === args[0].toLocaleLowerCase()) || message.guild.members.cache.find(ro => ro.displayName.toLowerCase() === args[0].toLocaleLowerCase()) || message.member;
        if (!member) return message.channel.send("**Ingresa un nombre de usuario!**");

        if (member.roles.highest.comparePositionTo(message.guild.me.roles.highest) >= 0) return message.channel.send('**No se puede establecer o cambiar el apodo de este usuario!**')

        if (!args[1]) return message.channel.send("**Ingresa un nombre de usuario**");

        let nick = args.slice(1).join(' ');

        try {
        member.setNickname(nick)
        const embed = new MessageEmbed()
            .setColor("GREEN")
            .setDescription(`**Nombre de usuario cambiado de ${member.displayName} a ${nick}**`)
        message.channel.send({embeds: [embed]})
        } catch {
            return message.channel.send("**Permisos faltantes - [CHANGE_NICKNAME]")
        }

        let channel = db.fetch(`modlog_${message.guild.id}`)
        if (!channel) return;

        const sembed = new MessageEmbed()
            .setAuthor(`${message.guild.name} Modlogs`, message.guild.iconURL())
            .setColor("#ff0000")
            .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
            .setFooter(message.guild.name, message.guild.iconURL())
            .addField("**Moderación**", "setnick")
            .addField("**Nombre de usuario cambiado de**", member.user.username)
            .addField("**Nombre de usuario cambiado por**", message.author.username)
            .addField("**Nombre de usuario cambiado a**", args[1])
            .addField("**Fecha**", message.createdAt.toLocaleString())
            .setTimestamp();

            var sChannel = message.guild.channels.cache.get(channel)
            if (!sChannel) return;
            sChannel.send({embeds: [sembed]})
    }
}