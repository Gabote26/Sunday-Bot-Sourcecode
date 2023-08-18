const Discord = require("discord.js")
const { SlashCommandBuilder } = require("@discordjs/builders")
const db = require("megadb")
const canalf = new db.crearDB("canalConfesiones")

module.exports = {
    data: new SlashCommandBuilder()
    .setName("confesion")
    .setDescription("Manda una confesion al servidor")
    .addStringOption(c => c.setName("confesion").setDescription("Manda tu confesion al servidor").setRequired(true))
  .addBooleanOption(b => b.setName("privado").setDescription("Elije si quieres que tu confesion sea privada o pública").setRequired(true)),

    async run(client, interaction){
        
      let confe = interaction.options.getString("confesion")
      let priv = interaction.options.getBoolean("privado")

      if(priv === false){
        
        let privf = new Discord.MessageEmbed()
        .setAuthor(interaction.user.username, interaction.user.avatarURL())
        .setTitle("Confesion")
        .setDescription(confe)
        .setColor("RANDOM")

        interaction.reply({ content: "Tu sugerencia se envio con exito.", ephemeral: true})
        client.channels.cache.get(await canalf.obtener(interaction.guild.id)).send({ embeds: [privf] })
      } else if(priv === true){
        let privt = new Discord.MessageEmbed()
        .setAuthor("Anonimo")
        .setTitle("Confesion")
        .setDescription(confe)
        .setColor("RANDOM")

        interaction.reply({ content: "Tu sugerencia se envio con exito.", ephemeral: true})
        client.channels.cache.get(await canalf.obtener(interaction.guild.id)).send({ embeds: [privt] })
      }

    }
}