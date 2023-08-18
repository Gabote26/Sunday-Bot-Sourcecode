const Discord = require("discord.js")
const { SlashCommandBuilder } = require("@discordjs/builders")

module.exports = {
    data: new SlashCommandBuilder()
    .setName("reseña")
    .setDescription("Da tu opinion acerca del bot al equipo de desarrollo")
    .addNumberOption(x => x.setName("puntuacion").setDescription("Puntua del 1 al 5 el bot").setRequired(true))
    .addStringOption(p => p.setName("opinion").setDescription("Danos al equipo tu opinion personal del bot!").setRequired(false)),

    async run(client, interaction){
        
        let pun = interaction.options.getNumber("puntuacion")
        let op = interaction.options.getString("opinion")

        if(op){

            if(pun > 5) return interaction.reply({ content: "La puntuacion no puede ser mayor a 5!", ephemeral: true })
            if(pun < 1) return interaction.reply({ content: "La puntuacion no puede ser menor a 1!", ephemeral: true })
        
            let ResEmbed = new Discord.MessageEmbed()
            .setTitle("Nueva Reseña!")
            .setAuthor(interaction.user.username, interaction.user.avatarURL())
            .setDescription(`${op}`)
            .addField("Puntuacion", `${pun}/5`)
            .setColor("RANDOM")
            .setTimestamp()

            interaction.reply("Tu reseña se envio correctamente, gracias por darnos tu opinion! 😊")
            client.channels.cache.get("1125224169014050879").send({ embeds: [ResEmbed] })
        }
    }
}