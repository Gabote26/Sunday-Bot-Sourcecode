const Discord = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders")
const Leveling = require("discord-xp");
Leveling.setURL("mongodb+srv://gabote26:gomitasacidas@cluster0.3fsmwsw.mongodb.net/?retryWrites=true&w=majority");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("leaderboard")
    .setDescription("Ve los mejores 10 tops del servidor"),

  async run(client, interaction){
  
  const LB = await Leveling.fetchLeaderboard(interaction.guild.id, 10)
  if(LB.length < 1) return interaction.reply({ content: `Este servidor no tiene un leaderboard`})

  const LBCo = await Leveling .computeLeaderboard(client, LB, true);

  const lb = LBCo.map(
    (e) => `${e.position}. ${e.username}#${e.discriminator} | Nivel: ${e.level}`
  )

  const embed = new Discord.MessageEmbed()

  .setTitle(`Top 10 de ${interaction.guild.name}`)
  .setColor("#c4a0ee")
  .setDescription(`\n\n${lb.join("\n\n")}`)
  .setTimestamp()

  interaction.reply({embeds: [embed] })
  
  }
}