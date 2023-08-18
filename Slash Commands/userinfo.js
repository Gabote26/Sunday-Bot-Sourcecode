const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require("discord.js")

module.exports = {
	data: new SlashCommandBuilder()
    .setName("userinfo")
    .setDescription("Obten la informacion de un usuario.")
    .addUserOption(option => option.setName("member").setDescription("El miembro del que quieras obtener informacion.")),
	run: async (client, interaction) => {
        const member = interaction.options.getMember("member") || interaction.member
        const activities = member.presence?.activities || []

        const focusActivity = activities.find(x => x.assets)
        const userInfoEmbed = new MessageEmbed()
        .setAuthor(member.user.tag, member.user.displayAvatarURL())
        .setColor("AQUA")
        .setThumbnail(focusActivity ? `https://cdn.discordapp.com/app-assets/${focusActivity.applicationId}/${focusActivity.assets.largeImage}` : member.user.displayAvatarURL())
        .setDescription(activities.map((x, i) => `**${x.type}**: \`${x.name || "None"} : ${x.details || "None"} : ${x.state || "None"}\``).join("\n"))
        .addField("Se unio:", member.joinedAt.toLocaleString(), true)
        .addField("Cuenta creada:", member.user.createdAt.toLocaleString(), true)
        .addField("Informacion comun", [
            `Nombre: \`${member.displayName}\``,
            `Miembro pendiente?: \`${member.pending ? 'Yes' : 'No'}\``,
            `Booster: \`${member.premiumSince ? 'since ' + member.premiumSince.toLocaleString() : 'Nope'}\``
        ].join("\n"))

        return interaction.reply({ embeds: [userInfoEmbed] })
	},
};