console.log(`version de nodejs ${process.version}`)
const config = require(`${process.cwd()}/config/config.json`);
const serverSchema =  require(`${process.cwd()}/modelos/servidor.js`)
const {asegurar_todo} = require(`${process.cwd()}/handlers/funciones.js`)
const Discord = require("discord.js");
const { Client, Intents, MessageEmbed, Collection, Guilds } = require("discord.js");
const intents = new Discord.Intents(32767)
const client = new Discord.Client( {intents} );
const db = require("megadb")
const blacklist = new db.crearDB("blacklist")
const canales = new db.crearDB("canales")
const fs = require("fs");
const ms = require("ms")
require("colors")
require("./slashcommands.js")

//command handler

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();

//evento messageCreate> message
client.on("message", async (message) => {
    if(!message.guild || !message.channel || message.author.bot) return;
    await asegurar_todo(message.guild.id, message.author.id);
    let data = await serverSchema.findOne({guildID: message.guild.id})
    if(!message.content.startsWith(data.prefijo)) return;
    const args = message.content.slice(data.prefijo.length).trim().split(" ");
    const cmd = args.shift()?.toLowerCase();
    const command = client.commands.get(cmd) || client.commands.find(c => c.aliases && c.aliases.includes(cmd));
    if(command) {
		if(command.permisos_bot){
            if(!message.guild.me.permissions.has(command.permisos_bot)) return message.reply(`:x: **No tengo los permisos necesarios para ejecutar este comando**\nNecesito los permisos: ${command.permisos_bot.map(permiso => `\`${permiso}\``).join(", ")}`)
        }
        
        if(command.permisos){
            if(!message.member.permissions.has(command.permisos)) return message.reply(`:x: **No tienes los permisos necesarios para ejecutar este comando**\nNecesitas los permisos: ${command.permisos.map(permiso => `\`${permiso}\``).join(", ")}`)
        }
        
        if(command.owner){
            
        if(!config.ownerIDS.includes(message.author.id)) return message.reply(`<:not_verified:1045797226385002667> **Solo los Owners del bot pueden usar este comando!**\n**Dueños del bot:** ${config.ownerIDS.map(ownerid => `<@${ownerid}>`)}`)
        }
            //ejecutar el comando
            command.run(client, message, args, data.prefijo)
    }
    
    //mencion al bot
    if(message.content.includes(client.user.id)) return message.reply({
        embeds: [
            new Discord.MessageEmbed()
            .setTitle(`✅ **Para ver mis comandos usa \`${data.prefijo}help\`!**`)
            .setColor(client.color)
        ]
    })
});
//requerir handlers
function requerirhandlers(){
    ["command", "events", "distube", "reaccion_roles"].forEach(handler => {
        try {
            require(`./handlers/${handler}`)(client, Discord)
        } catch(e){
            console.warn(e)
        }
    })
}
requerirhandlers();


client.slashcommands = new Discord.Collection(); //creamos una coleccion para guardar los slash commands
const slashComandos = fs.readdirSync("./Slash Commands").filter(file => file.endsWith("js")) //creamos un filtro para eliminar archivos que no tengan "js" en el final

for (const file of slashComandos){
  const slash = require(`./Slash Commands/${file}`)
  console.log(`Slash command ${file} cargado`)
  client.slashcommands.set(slash.data.name, slash)
  

  const slashcommandName = file.split(".")[0];
}

client.on("interactionCreate", async (interaction) => {
  if(!interaction.isCommand) return;

  const slashComs = client.slashcommands.get(interaction.commandName)

  if(!slashComs) return;
  try{
       await slashComs.run(client, interaction)
  } catch(e){
    console.error(e)
  }
})

//Sistema de Niveles//

const Leveling = require("discord-xp");
Leveling.setURL(config.mongodb)

//presencia y estados de conexion
client.on("ready", () => {
    client.user.setActivity("s!help", { type: "PLAYING"})
    

});
//fin del proceso

//mensaje guildCreate para cuando el bot se una al servidor envie un mensaje a un canal especifico
client.on('guildCreate', guild =>{

    const channelId = '1040353824130474034'; //id del canal

    const channel = client.channels.cache.get(channelId); 
     
    if(!channel) return; //si no existe el canal no envia nada
    const embed = new Discord.MessageEmbed()
        .setTitle('Me uni a un servidor!')
        .setDescription(`**Nombre del servidor:** ${guild.name} (${guild.id})\n**Miembros:** ${guild.memberCount}`)
        .setTimestamp()
        .setColor('RANDOM')
        .setFooter(`Estoy en ${client.guilds.cache.size} Servidores ahora!`);
    channel.send({embeds: [embed]});
});
//evento guildDelete
client.on('guildDelete', guild =>{
    const channelId = '1040353824130474034'; // id del canal
    const channel = client.channels.cache.get(channelId); //obtiene el id del canal
    
    if(!channel) return;  //si el canal no existe no envia nada
    const embed = new Discord.MessageEmbed()
        .setTitle('Sali de un servidor!')
        .setDescription(`**Nombre del servidor:** ${guild.name} (${guild.id})\n**Members:** ${guild.memberCount}`)
        .setTimestamp()
        .setColor('RED')
        .setFooter(`Estoy en ${client.guilds.cache.size} Servidores Ahora!`);
    channel.send({embeds: [embed]});
});
//

client.login(config.token); //Sistema de secret para la clave de acceso unica del bot(TOKEN)