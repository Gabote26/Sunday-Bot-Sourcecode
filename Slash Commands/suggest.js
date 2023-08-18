const Discord = require("discord.js")
const { SlashCommandBuilder } = require("@discordjs/builders")
const db = require("megadb")
const canales = new db.crearDB("canales")

module.exports = {
    data: new SlashCommandBuilder()
    .setName("sugerencia")
    .setDescription("Manda una sugerencia para mejorar este servidor")
    .addStringOption(p => p.setName("texto")
    .setDescription("Envia tu sugerencia para mejorar el servidor")
    .setRequired(true)),

    async run(client, interaction){
        
        let sugerencia = interaction.options.getString("texto")

        if(!canales.tiene(interaction.guild.id)){
            return interaction.reply({ content: "Este servidor no tiene un canal de sugerencias establecido aun"})
        }

        let canal = await canales.obtener(interaction.guild.id)

        //embed del comando en la sugerencia
        const suggestEmbed = new Discord.MessageEmbed()
        .setTitle("Sugerencias")
        .setDescription(`__**Tu sugerencia:**__ **${sugerencia}**`)
        .setColor("YELLOW")
        .setTimestamp()
        //Enviar embed 

        interaction.reply({ content: "Se ha enviado con exito tu sugerencia", ephemeral: true})
        
        client.channels.cache.get(canal).send({ embeds: [suggestEmbed] }).then(msg => {
            msg.react("✅")
            msg.react("❌")
        })
    }
}