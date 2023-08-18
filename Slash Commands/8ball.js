const { SlashCommandBuilder } = require('@discordjs/builders')
const { MessageEmbed } = require('discord.js-light')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('8ball')
		.setDescription('Pregúntale algo de si o no al bot.')
		.addStringOption(option => option.setName('pregunta').setDescription('dime tu pregunta.').setRequired(true)),
 async run(client, interaction, args) {

		const pregunta = interaction.options.getString('pregunta')
   let respuestas = ["Si", "No" , "Probablemente no", "Probablemente si", "Estas en lo correcto", "Por supuesto que no!", "Pregunta otra vez", "No lo dudes"]
        let random = respuestas[Math.floor(Math.random() * respuestas.length)]
		if (pregunta.length > 40) {
			return await interaction.reply({
				embeds: [
					new MessageEmbed()
						.setTitle(':x: Error')
						.setDescription("El maximo de caracteres son 40")
						.setColor('RED'),
				],
				ephemeral: true,
			})
		}

		const embed = new MessageEmbed()
			.setTitle(`:8ball:`)
			.setDescription(
				`➡ ***Tu pregunta:***` +
					'\n' +
					`${pregunta}` +
					'\n' +
					`👀 *Mi respuesta:* \n` +
					`${random}`,
			)
			.setColor('RANDOM')
		interaction.reply({ embeds: [embed] })
	},
}
