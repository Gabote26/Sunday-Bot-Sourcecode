const Discord = require("discord.js");

module.exports = {
    name: "8ball",
    alias: [],

     run: async(bot, message, args) => {

        const pregunta = args.join(" ")
        if(!pregunta) return message.channel.send("Debes escribir una pregunta")

        let respuestas = ["Si", "No" , "Probablemente no", "Probablemente si", "Estas en lo correcto", "Por supuesto que no!", "Pregunta otra vez", "No lo dudes"]
        let random = respuestas[Math.floor(Math.random() * respuestas.length)]

        const embed = new Discord.MessageEmbed()
        .setTitle("8ball")
        .setDescription(`A tu pregunta:\n**${pregunta}**\n\nMi respuesta es:\n**${random}**`)
        .setColor("RANDOM")

        message.channel.send({ embeds: [embed] })
    }
}