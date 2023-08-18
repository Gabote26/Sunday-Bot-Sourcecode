const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require("discord.js")

module.exports = {
    data: new SlashCommandBuilder()
    .setName("ban")
    .setDescription("Banea un miembro del servidor")
    .addUserOption((option) => option.setName('user').setDescription('El miembro a banear').setRequired(true))
    .addStringOption(option => option.setName('reason').setDescription('Razón del baneo').setRequired(true)),
   async run(client, interaction) {

       if(!interaction.member.permissions.has("BAN_MEMBERS")) return interaction.reply({ content: "No tienes los permisos necesarios para ejecutar este comando.", ephemeral: true })

        const user = interaction.options.getUser('user')
       const member = interaction.guild.members.cache.get(user.id) || await interaction.guild.members.fetch(user.id).catch(err => {})

        if(!member) return interaction.reply("El miembro mencionado no se encontro o no existe, intenta de nuevo!.");
        const reason = interaction.options.getString('reason')

        if(!member.bannable || member.user.id === client.user.id) 
        return interaction.reply("No puedo banear a este miembro");
        
        if(interaction.member.roles.highest.position <= member.roles.highest.position) 
        return interaction.followUp('El miembro especificado tiene un rol igual o mayor al tuyo por lo que no puedes banearlo.')
        
        const banEmbed = new MessageEmbed()
        .setDescription(`**${member.user.tag}** ha sido baneado del servidor por \`${reason}\``)
        .setColor("GREEN")
        .setFooter("Miembro Baneado!")
        .setTimestamp()

        await member.user.send(`Fuiste baneado de **\`${interaction.guild.name}\`** por \`${reason}\``).catch(err => {})
        member.ban({ reason })

        return interaction.reply({ embeds: [ banEmbed ]})

    },
    
};