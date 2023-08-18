const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require("discord.js")

module.exports = {
    data: new SlashCommandBuilder()
    .setName("kick")
    .setDescription("Kickea a alguien del servidor")
    .addUserOption((option) => option.setName('user').setDescription('Persona que quieres expulsar').setRequired(true))
    .addStringOption(option => option.setName('reason').setDescription('Razón de la expulsión').setRequired(true)),
    run: async (client, interaction) => {

       if(!interaction.member.permissions.has("KICK_MEMBERS")) return interaction.reply({ content: "No tienes los permisos necesarios para ejecutar este comando.", ephemeral: true })

        const user = interaction.options.getUser('user')
        const member = interaction.guild.members.cache.get(user.id) || await interaction.guild.members.fetch(user.id).catch(err => {})

        if(!member) return interaction.reply("No se encontro al usuario especificado o no existe.");
        const reason = interaction.options.getString('reason')

        if(!member.kickable || member.user.id === client.user.id) 
        return interaction.reply("No puedo expulsar a esta persona");
        
        if(interaction.member.roles.highest.position <= member.roles.highest.position) 
        return interaction.reply('El usuario que especificaste tiene un rol igual o mayor al tuyo por lo que no puedes expulsarlo.')
        
        const kickEmbed = new MessageEmbed()
        .setDescription(`**${member.user.tag}** fue expulsado del servidor por \`${reason}\``)
        .setColor("GREEN")
        .setFooter("Miembro Expulsado!")
        .setTimestamp()

        await member.user.send(`Fuiste expulsado de **\`${interaction.guild.name}\`** por \`${reason}\``).catch(err => {})
        member.kick({ reason })

        return interaction.reply({ embeds: [ kickEmbed ]})

    },
    
};