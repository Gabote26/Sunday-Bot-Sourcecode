const { SlashCommandBuilder } = require("@discordjs/builders")
const Discord = require("discord.js");
const Leveling = require("discord-xp");
Leveling.setURL("mongodb+srv://gabote26:gomitasacidas@cluster0.3fsmwsw.mongodb.net/?retryWrites=true&w=majority");
const canvacord = require("canvacord");

module.exports = {
  data: new SlashCommandBuilder()
  .setName("rank")
  .setDescription("Ve tu XP y tu nivel")
  .addUserOption(option => 
    option
    .setName("miembro")
    .setDescription("Miembro para ver su XP")
    .setRequired(false)),
  async run(client, interaction){
    
  const target = interaction.options.getUser("miembro") || interaction.member;

  const avatar = target.user.displayAvatarURL({ dynamic: true, format: 'png' });

  const user = await Leveling.fetch(target.id, interaction.guild.id, true);

  const XPfaltante = Leveling.xpFor(user.level + 1);

  const rank = new canvacord.Rank()

    .setAvatar(avatar)
    .setCurrentXP(user.xp)
    .setRequiredXP(XPfaltante)
    .setLevel(user.level)
    .setRank(user.position)
    .setStatus(target.presence.status)
    .setBackground("IMAGE", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqzwfq2VH03AEmmju0t76oGYFeCJ7_kO-OIw&usqp=CAU")
    .setOverlay("#000000")
    .setProgressBar("#9e96e7", "COLOR")
    .setUsername(target.user.username)
    .setDiscriminator(target.user.discriminator)

    rank.build().then(data => {
      const fileR = new Discord.MessageAttachment(data, "rank.png")

      interaction.reply({ files: [fileR] })
    })
 }
}