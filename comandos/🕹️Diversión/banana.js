const Discord = require("discord.js");

module.exports = {
    name: "banana",
    alias: [],

    run: async (bot, message, args) => {

        let respuestas = ["7cm", "8cm" , "10cm", "11cm", "12cm", "13cm", "14cm", "15cm", "16cm", "17cm", "18cm", "19cm", "20cm", "21cm", "22cm", "23cm", "24cm", "25cm",  "26cm", "27cm", "28cm",  "29cm", "30cm"]
        let random = respuestas[Math.floor(Math.random() * respuestas.length)]

        const embedBanana = new Discord.MessageEmbed()
        .setTitle(`Banana`)
        .setDescription(`La banana de: ${message.author} mide:\n**${random}**`)
        .setColor("RANDOM")
        .setImage("https://nekocdn.com/res/menus/banana.png")

        message.channel.send({ embeds: [embedBanana] })
    }
}