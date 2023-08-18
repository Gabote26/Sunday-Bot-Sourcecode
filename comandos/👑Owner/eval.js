const { MessageEmbed } = require('discord.js');
const Discord = require('discord.js');
module.exports = {
    name: 'eval',
    aliases: ["evaluacion"],
    owner: true,
   run: async (client, message, args) => {
        if (message.author.id !== "702659221841379358") return message.channel.send("No tienes permiso para usar este comando!");
        const embed = new MessageEmbed()
            .setTitle('Evaluando...')
        const msg = await message.channel.send({embeds: [embed]});
        try {
            const data = eval(args.join(' ').replace(/```/g, ''));
            const embed1 = new MessageEmbed()
                .setTitle('Resultado:')
                .setDescription(`${await data}`)
            .setColor('GREEN')
            await msg.edit({embeds: [embed1]})
            await msg.react('✅')
            await msg.react('❌')
            const filter = (reaction, user) => (reaction.emoji.name === '❌' || reaction.emoji.name === '✅') && (user.id === message.author.id);
            msg.awaitReactions(filter, { max: 1 })
                .then((collected) => {
                    collected.map((emoji) => {
                        switch (emoji._emoji.name) {
                            case '✅':
                                msg.reactions.removeAll();
                                break;
                            case '❌':
                                msg.delete()
                                break;
                        }
                    })
                })
        } catch (e) {
            const embed2 = new MessageEmbed()
                .setTitle('error')
                .setDescription(`${e}`)
                .setColor("#FF0000")
            return await msg.edit({embeds: [embed2]});
        }
    }
}