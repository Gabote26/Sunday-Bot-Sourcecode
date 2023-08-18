const { MessageEmbed } = require("discord.js");
const db = require('quick.db');

module.exports = {
  name: "addrole",
  alias: ["a-role", "qrole"],
 run: async (bot, message, args) => {

        if (!message.member.permissions.has("MANAGE_ROLES")) return message.channel.send("**No tienes permiso para añadir roles a usuarios! - Necesitas el permiso de [MANAGE_ROLES]**");
        if (!message.guild.me.permissions.has("MANAGE_ROLES")) return message.channel.send("**No tengo permiso para añadir roles a usuarios! - Necesito el permiso de [MANAGE_ROLES]**");
        
        if (!args[0]) return message.channel.send("**Ingresa un rol!**")

        let rMember = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(r => r.user.username.toLowerCase() === args[0].toLocaleLowerCase()) || message.guild.members.cache.find(ro => ro.displayName.toLowerCase() === args[0].toLocaleLowerCase());
        if (!rMember) return message.channel.send("**Ingresa un Usuario!**");
        if (rMember.roles.highest.comparePositionTo(message.guild.me.roles.highest) >= 0) return message.channel.send('**No puedes añadir roles a este usuario!**')

        let role = message.mentions.roles.first() || message.guild.roles.cache.get(args[1]) || message.guild.roles.cache.find(rp => rp.name.toLowerCase() === args.slice(1).join(' ').toLocaleLowerCase());
        if (!args[1]) return message.channel.send("**Ingresa un rol!**")

        if (!role) return message.channel.send("**No se pudo encontrar ese rol!**")

        if (role.managed) return message.channel.send("**No se puede agregar ese rol al usuario!**")
        if (message.guild.me.roles.highest.comparePositionTo(role) <= 0) return message.channel.send('**El rol es actualmente más alto que el mio, por lo tanto, no se le puede agregar al usuario!**')

        if (rMember.roles.cache.has(role.id)) return message.channel.send("**El usuario ya tiene ese rol!**")
        if (!rMember.roles.cache.has(role.id)) await rMember.roles.add(role.id);
        var sembed = new MessageEmbed()
            .setColor("GREEN")
            .setAuthor(message.guild.name, message.guild.iconURL())
            .setDescription(`Role has been added to ${rMember.user.username}`)
        message.channel.send({embeds: [sembed]})

        let channel = db.fetch(`modlog_${message.guild.id}`)
        if (!channel) return;

        const embed = new MessageEmbed()
            .setAuthor(`${message.guild.name} Modlogs`, message.guild.iconURL())
            .setColor("#ff0000")
            .setThumbnail(rMember.user.displayAvatarURL({ dynamic: true }))
            .setFooter(message.guild.name, message.guild.iconURL())
            .addField("**Moderación**", "addrole")
            .addField("**Rol añadido a**", rMember.user.username)
            .addField("**Rol añadido**", role.name)
            .addField("**Añadido por**", message.author.username)
            .addField("**Fecha**", message.createdAt.toLocaleString())
            .setTimestamp();

        let sChannel = message.guild.channels.cache.get(channel)
        if (!sChannel) return;
        sChannel.send({embeds: [embed]})
    }
};