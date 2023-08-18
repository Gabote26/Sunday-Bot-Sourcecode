const { SlashCommandBuilder } = require('@discordjs/builders')
const { MessageEmbed } = require('discord.js-light')
const emojisi = '<:verified:1045796884616335511> '
const emojino = '<:not_verified:1045797226385002667>'

/**
 * @type {import('../../types/typeslash').Command}
 */

const command = {
	data: new SlashCommandBuilder()
		.setName('encuesta')
		.setDescription('Crea una encuesta con 2 opciones!')
		.addStringOption((o) =>
			o
				.setName('pregunta')
				.setDescription('La opcion a votar a favor')
				.setRequired(true),
		),

	/**
	 *
	 * @param {Client} client
	 * @param {Commandteraction} interaction
	 */

	async run(client, interaction) {
        
        if(!interaction.member.permissions.has("MANAGE_MESSAGES")) return interaction.reply({ content: "No tienes los permisos necesarios para ejecutar este comando.", ephemeral: true })
        
        if(!interaction.guild.me.permissions.has("MANAGE_MESSAGES")) return interaction.reply({ content: "No tengo los permisos necesarios para ejecutar este comando.", ephemeral: true })
        
		const args = interaction.options
		const si = args.getString('pregunta')

		const embed = new MessageEmbed()
			.setTitle('Nueva encuesta!')
			.setDescription(
				'Se ha generado una nueva encuesta en la que tú puedes participar, a continuación, elige tu opción haciendo click sobre esa reacción.',
			)
			.addField('LA PREGUNTA ES:', si, true)
			.setColor('#00FFFF')

		interaction.reply({
			embeds: [
				new MessageEmbed()
					.setTitle(`${emojisi} Encuesta enviada`)
					.setColor('GREEN'),
			],
			ephemeral: true,
		})
		await interaction.channel.send({ embeds: [embed] }).then(async (msg) => {
			await msg.react(emojisi)
			await msg.react(emojino)
		})
	},
}

module.exports = command
