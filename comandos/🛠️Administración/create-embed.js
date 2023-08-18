const { MessageEmbed } = require("discord.js");

module.exports = {
	name: "crear-embed",
    alias: ["cr-em", "gen-embed"],
    
    run: async (bot, message, args) => {
        if(!message.member.permissions.has("ADMINISTRATOR")) return message.reply({ embeds: [new MessageEmbed()
            .setTitle("<:not_verified:1045797226385002667> **No tienes los permisos necesarios!**")
            .setDescription("**Necesitas el permiso:** \`ADMINISTRATOR\`")
            .setColor("RED_BLACK")
           
             ]});
        
        const texto = args.join(" ");
        if(!texto) return message.channel.send({ embeds: [new MessageEmbed()
            .setTitle("<:not_verified:1045797226385002667> **Debes especificar el contenido del embed!**")
            .setDescription("**Uso del comando:** \`${prefix}crear-embed <titulo> - <descripcion> - <colorhex> - <footer>\`")
            .setColor("RED")
            
              ]});
        
        const opciones = texto.split(" - ");
        message.channel.send({ embeds: [new MessageEmbed()
          .setTitle(opciones[0])
          .setDescription(opciones[1])
          .setColor(opciones[2])
          .setFooter({text: opciones[3]})
          
         ]});
    }
}