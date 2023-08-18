const ownerid = "702659221841379358";

module.exports = {
        name: "get-invite",
        alias: ['getinv', 'g-i'],
      
     run: async (bot, message, args) => {
        if (message.author.id === ownerid) {
        let guild = null;

        if (!args[0]) return message.channel.send("Ingrese el nombre del servidor o la id del servidor del que desea generar el enlace de invitacion.")

        if(args[0]){
            let fetched = bot.guilds.cache.find(g => g.name === args.join(" "));
            let found = bot.guilds.cache.get(args[0]);
            if(!found) {
                if(fetched) {
                    guild = fetched;
                }
            } else {
                guild = found
            }
        } else {
            return message.channel.send("El nombre del servidor no es válido");
        }
        if(guild){
            let tChannel = guild.channels.cache.find(ch => ch.type == "text" && ch.permissionsFor(ch.guild.me).has("CREATE_INSTANT_INVITE"));
            if(!tChannel) {
                return message.channel.send("Lo siento, no tengo el permiso CREATE_INSTANT_INVITE en ese servidor!"); 
            }
            let invite = await tChannel.createInvite({ temporary: false, maxAge: 0 }).catch(err => {
                return message.channel.send(`${err} ha pasado!`);
            });
            message.channel.send(invite.url);
        } else {
            return message.channel.send(`\`${args.join(' ')}\` - No estoy en ese servidor.`);
        }
    } else {
        return;
    }
    }

}