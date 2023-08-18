const { SlashCommandBuilder } = require('@discordjs/builders')
const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js-light')

const command = {
	data: new SlashCommandBuilder()
		.setName('server-info')
		.setDescription('Observa información del servidor.'),

	async run(client, interaction) {
        const members = interaction.guild.members.cache;
        
		const row = new MessageActionRow().addComponents(
			new MessageButton()
				.setLabel('Mapeo de los roles.')
				.setStyle('DANGER')
				.setCustomId('mapa'),
		)
		const icono = interaction.guild.iconURL({ size: 512, dynamic: true })
		const guild = interaction.guild

		const owner = await interaction.guild.fetchOwner()
		let guildDescription = guild.description
		let guildTier = guild.premiumTier.toString()

		if (!guildDescription) guildDescription = 'No establecida.'

		if (guildTier == 'NONE') guildTier = 'Sin nivel actual.'

		const Embed = new MessageEmbed()
			.setTitle('Información Servidor.')
			.addFields(
				{name: '💼Nombre:', value: `\`\`\`${guild.name}\`\`\``, inline: true, },
				{name: '🗃️Id del Servidor:', value: `\`\`\`${guild.id}\`\`\``, inline: true, },
				{name: '✔️Descripción:', value: `\`\`\`${guildDescription}\`\`\``, inline: true, },
				{name: '📆Creado el:', value: `\`\`\`<t:${parseInt(interaction.guild.createdTimestamp / 1000)}:R>\`\`\``,inline: true, },
				{name: '👑Dueño del Servidor:', value: `\`\`\`${owner.user.tag}\`\`\``, inline: true, },
				{name: '👨‍👩‍👧‍👦Miembros Totales:', value: `\`\`\`${guild.memberCount.toString()}\`\`\``, inline: true, },
				{name: '🟣Mejoras del Servidor:', value: `\`\`\`${guild.premiumSubscriptionCount.toString()}\`\`\``, inline: true, },
				{name: '🗄️Roles:', value: `\`\`\`${guild.roles.cache.size.toString()}\`\`\``, inline: true, },
				{name: '🟢Mejoras de Nivel:', value: `\`\`\`${guildTier}\`\`\``, inline: true, },
                {name: '🤖Bots:', value: `\`\`\`${members.filter(member => member.user.bot).size}\`\`\``, inline: true, },
			)
			.setColor('#00FFFF')
			.setFooter({
				text: 'Pedido por: ' + interaction.member.displayName,
				iconURL: interaction.user.displayAvatarURL({ dynamic: true, size: 1024 }),
			})

		if (icono) Embed.setThumbnail(`${icono}`)

		if (interaction.guild.banner != null)
			Embed.setImage(`${interaction.guild.bannerURL({ dynamic: true })}`)

		await interaction.reply({ embeds: [Embed], components: [row] })

		const filtro = (x) => x.user.id === interaction.user.id
		const collector = interaction.channel.createMessageComponentCollector({
			filter: filtro,
			time: 30000,
		})

		collector.on('collect', async (i) => {
			i.deferUpdate()
			if (i.user.id != interaction.user.id) {
				return interaction.reply({
					embeds: [
						new MessageEmbed()
							.setTitle(':x: Error')
							.setDescription('Esta no es tu interacción.')
							.setColor('RED'),
					],
				})
			}

			if (i.customId === 'mapa') {
				const embed = new MessageEmbed()
					.setTitle('Mapeo de roles.')
					.addField(
						'Roles:',
						interaction.guild.roles.cache.map((x) => x.name).join('\n'),
					)
					.setColor('GREEN')
				interaction.followUp({ embeds: [embed], ephemeral: true })
			}
		})

		collector.on('end', async () => {
			interaction.editReply({ embeds: [Embed], components: [] })
		})
	},
}

module.exports = command
