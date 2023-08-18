const Discord = require("discord.js");

module.exports = {
    name: "moneda",
    alias: [],

    run: async (bot, message, args) => {

      const monedaCara = "https://cdn.discordapp.com/attachments/1129966854073483268/1129974292982022154/cara_moneda_1.png"

      const monedaCruz = "https://cdn.discordapp.com/attachments/1129966854073483268/1129973972960804874/cruz_moneda_2.png"
      
      let respuestas = ["Cara", "Cruz"]
      let respuestasImagenes = [`${monedaCara}`, `${monedaCruz}`]
      
        let random = respuestas[Math.floor(Math.random() * respuestas.length)]

        let randomMoneda = respuestasImagenes[Math.floor(Math.random() * respuestas.length)]

        const embed = new Discord.MessageEmbed()
        .setTitle("**¡Vamos a lanzar una moneda al aire!**")
        .setDescription(`**La moneda fue lanzada por: **:\n**¡Ahí va! ¿Cara o Cruz?**\n**${random}**`)
        .setImage(`${randomMoneda}`)
        .setColor("RANDOM")

        message.channel.send({ embeds: [embed] })
    }
}