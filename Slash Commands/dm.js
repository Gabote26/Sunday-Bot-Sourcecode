const { SlashCommandBuilder } = require('@discordjs/builders')
const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js-light')

/**
 * @type {import('../../types/typeslash').Command}
 */

const command = {
	userPerms: ['MANAGE_MESSAGES'],
	botPerms: ['MANAGE_MESSAGES'],
	category: 'Moderación',

	data: new SlashCommandBuilder()
		.setName('dm')
		.setDescription('Envía un mensaje a un usuario a través de este bot')
		.addUserOption((o) =>
			o
				.setName('usuario')
				.setDescription('Usuario a enviar mensaje')
				.setRequired(true),
		)
		.addStringOption((o) =>
			o.setName('mensaje').setDescription('Qué dirá el mensaje').setRequired(true),
		),

	/**
	 *
	 * @param {Client} client
	 * @param {CommandInteraction} interaction
	 */

	async run(client, interaction) {
		const args = interaction.options

		const usuario = args.getUser('usuario')

		if (usuario.bot) {
			interaction.reply({
				embeds: [
					new MessageEmbed()
						.setTitle(':x: Error')
						.setDescription('No puedo enviar un mensaje a un bot!')
						.setColor('RED'),
				],
				ephemeral: true,
			})
		}

		if (usuario.id === interaction.user.id) {
			return interaction.reply({
				embeds: [
					new MessageEmbed()
						.setTitle(':x: Error')
						.setDescription('No puedes enviarte mensaje a ti mismo/a!')
						.setColor('RED'),
				],
				ephemeral: true,
			})
		}

		if (usuario.id === client.user.id) {
			return interaction.reply({
				embeds: [
					new MessageEmbed()
						.setTitle(':x: Error')
						.setDescription('No puedo enviarme un mensaje a mi misma.')
						.setColor('RED'),
				],
				ephemeral: true,
			})
		}

		const mensaje = args.getString('mensaje')

		const embed = new MessageEmbed()
			.setTitle('💝 Mensaje Privado!')
			.setDescription(`He enviado un mensaje a ${usuario} diciendo lo siguiente.`)
			.addField('Mensaje:', mensaje, true)
			.setColor('GREEN')

		const row = new MessageActionRow().addComponents(
			new MessageButton()
				.setLabel(`Enviado desde: ${interaction.guild.name}`)
				.setStyle('SECONDARY')
				.setDisabled(true),

			new MessageButton()
				.setLabel(`Enviado por: ${interaction.user.tag}`)
				.setStyle('SECONDARY')
				.setDisabled(true),
		)

		usuario
			.send({ content: mensaje, components: [row] })
			.then(() => {
				interaction.reply({ embeds: [embed], ephemeral: true })
			})
			.catch(() => {
				interaction.reply({
					embeds: [
						new MessageEmbed()
							.setTitle('💔 Mensaje No Enviado.')
							.setDescription(
								'Vaya, al parecer el usuario tiene los mensajes bloqueados.',
							)
							.setColor('RED'),
					],
					ephemeral: true,
				})
			})

		const log = new MessageEmbed()
      .setTitle('Comando DM usado.')
      .addFields({ name: 'Texto:', value: mensaje, inline: true }, 
                 { name: 'Autor:', value: `${client.users.cache.get(interaction.user.id).tag} (${interaction.user.id})`, inline: true }, 
                 { name: 'Servidor:', value: `${client.guilds.cache.get(interaction.guild.id).name} (${interaction.guild.id})` })
		client.channels.cache.get('1040353824130474034').send({ embeds: [log] })
	},
}

module.exports = command
