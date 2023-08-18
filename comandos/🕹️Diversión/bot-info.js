const { MessageEmbed } = require("discord.js");
module.exports = {
name: "bot-info",
alias: ["detail"],
run: async (bot, message, args) => {

let servers_count = message.client.guilds.cache.size;
let members_count = message.client.users.cache.size;

let totalSeconds = message.client.uptime / 1000;
let days = Math.floor(totalSeconds / 86400);
totalSeconds %= 86400;
let hours = Math.floor(totalSeconds / 3600);
totalSeconds %= 3600;
let minutes = Math.floor(totalSeconds / 60);
let seconds = Math.floor(totalSeconds % 60);

let uptime = `\`\`\`${days} dias, ${hours} horas, ${minutes} minutos y ${seconds} segundos\`\`\``;

let embed = new MessageEmbed()

  .setDescription(`Mi nombre es **${message.bot.user.username}** y estoy hecha para divertirte y ayudarte en tu servidor.`)
  .setTitle(`${message.bot.user.username} Estadisticas`)
  .addFields(
    { name: "🗃️ Servidores:", value: `\`\`\`${servers_count}\`\`\``, inline: true },
    { name: "👨👩 Usuarios:", value: `\`\`\`${members_count}\`\`\``, inline: true },
    { name: "📓 Canales",value: `\`\`\`${message.bot.channels.cache.size}\`\`\``, inline: true },
    { name: "⌚ Tiempo activo: ", value: uptime , inline: true },
    { name: "🔴 Ping:",value: `\`\`\`${Math.round(message.bot.ws.ping)} ms\`\`\``, inline: true },
    { name: "<:ram:1126282624399323187>  RAM: ", value: `\`\`\`${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB\`\`\``, inline: true  },
    { name: "👑 Desarrollador del bot:",value: `\`\`\`luckscience\`\`\``},
    { name: "**🛠️ Comandos**", value: `\`\`\`${bot.commands.size} cmds\`\`\``, inline: true },
    { name: "**/ SlashCommands**", value: `\`\`\`${bot.slashcommands.size} slashcmds\`\`\``, inline: true },
  )
  .setColor("3498DB")

return message.channel.send({embeds: [embed]});
    return message.react("<:verified:1045796884616335511>");
}
};

console.log("Estadisticas en funcionamiento")