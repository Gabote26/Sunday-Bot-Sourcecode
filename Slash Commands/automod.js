const { SlashCommandBuilder } = require("@discordjs/builders")
const Discord = require("discord.js")
const { MessageEmbed } = require("discord.js")

module.exports = {
    data: new SlashCommandBuilder()
    .setName("automod")
    .setDescription("Configura un sistema de automod")
    .addSubcommand(command => command.setName("palabras-a-prohibir").setDescription("Bloquea malas palabras, contenido sexual e insultos"))
    .addSubcommand(command => command.setName("spam-de-mensajes").setDescription("Establece un numero que sera el limite para ser considerado spam"))
    .addSubcommand(command => command.setName("spam-de-menciones").setDescription("Bloquea menciones por spam").addIntegerOption(command => command.setName("numero").setDescription("Establece un numero que sea el limite de menciones para ser considerado spam").setRequired(true)))
    .addSubcommand(command => command.setName("keyword").setDescription("Bloquea una palabra especifica").addStringOption(command => command.setName("palabra").setDescription("Palabra a bloquear en el automod").setRequired(true))),
   
    async run(client, interaction){
        const { guild, options } = interaction;
        const sub = options.getSubcommand();

        if(!interaction.member.permissions.has("ADMINISTRATOR")) return interaction.reply({content: "Necesitas ser Administrador para usar este comando", ephemeral: true});
        
        switch (sub) {
            case "palabras-a-prohibir":

            await interaction.reply({content: "Cargando la regla de automod"})

            const rule = await guild.autoModerationRules.create({
                name: "Bloquear malas palabras, contenido sexual e insultos",
                creatorId: "702659221841379358",
                enabled: true,
                eventType: 1,
                triggerType: 4,
                triggerMetadata:
                {
                    presets: [1, 2,3]
                },
                actions: [
                    {
                        type: 1,
                        metadata: {
                            channel: interaction.channel,
                            durationSeconds: 10,
                            customMessage: "Este mensaje fue prohibido por Sunday Bot Auto Moderación"
                        }
                    }
                ]
            }).catch(async err => {
                setTimeout(async () => {
                    console.log(err);
                    await interaction.editReply({content: `${err}`});
                }, 2000)
            })

            setTimeout(async () => {
                if (!rule) return;

                const embed = new MessageEmbed()
                .setDescription(`<:verified:1045796884616335511> La regla de Automod fue creada!`)
                .setColor("GOLD")

                await interaction.editReply({embeds: [embed]})
            }, 3000)

            break;

            case "keyword":

            await interaction.reply({content: "Cargando la regla de automod"})
            const word = options.getString("palabra")

            const rule2 = await guild.autoModerationRules.create({
                name: `Previene la palabra ${word} de ser usada`,
                creatorId: "702659221841379358",
                enabled: true,
                eventType: 1,
                triggerType: 4,
                triggerMetadata:
                {
                    keywordFilter: (`${word}`)
                },
                actions: [
                    {
                        type: 1,
                        metadata: {
                            channel: interaction.channel,
                            durationSeconds: 10,
                            customMessage: "Este mensaje fue prohibido por Sunday Bot Auto Moderación"
                        }
                    }
                ]
            }).catch(async err => {
                setTimeout(async () => {
                    console.log(err);
                    await interaction.editReply({content: `${err}`});
                }, 2000)
            })

            setTimeout(async () => {
                if (!rule2) return;

                const embed1 = new MessageEmbed()
                .setDescription(`<:verified:1045796884616335511> La regla de Automod fue creada!, Todos los mensajes que contengan la palabra ${word} seran borrados`)
                .setColor("GOLD")

                await interaction.editReply({embeds: [embed1]})
            }, 3000)

            break;

            case "spam-de-mensajes":

            await interaction.reply({content: "Cargando la regla de automod"})

            const rule3 = await guild.autoModerationRules.create({
                name: "Previene el spam de mensajes",
                creatorId: "702659221841379358",
                enabled: true,
                eventType: 1,
                triggerType: 3,
                triggerMetadata:
                {
                    //mentionTotalLimit: numero
                },
                actions: [
                    {
                        type: 1,
                        metadata: {
                            channel: interaction.channel,
                            durationSeconds: 10,
                            customMessage: "Este mensaje fue prohibido por Sunday Bot Auto Moderación"
                        }
                    }
                ]
            }).catch(async err => {
                setTimeout(async () => {
                    console.log(err);
                    await interaction.editReply({content: `${err}`});
                }, 2000)
            })

            setTimeout(async () => {
                if (!rule3) return;

                const embed3 = new MessageEmbed()
                .setDescription(`<:verified:1045796884616335511> La regla de Automod fue creada!`)
                .setColor("GOLD")

                await interaction.editReply({embeds: [embed3]})
            }, 3000)

            break;

           case "spam-de-menciones":

            await interaction.reply({content: "Cargando la regla de automod"})
            const numero = options.getInteger('numero');

            const rule4 = await guild.autoModerationRules.create({
                name: "Previene el spam de menciones",
                creatorId: "702659221841379358",
                enabled: true,
                eventType: 1,
                triggerType: 5,
                triggerMetadata:
                {
                    mentionTotalLimit: numero
                },
                actions: [
                    {
                        type: 1,
                        metadata: {
                            channel: interaction.channel,
                            durationSeconds: 10,
                            customMessage: "Este mensaje fue prohibido por Sunday Bot Auto Moderación"
                        }
                    }
                ]
            }).catch(async err => {
                setTimeout(async () => {
                    console.log(err);
                    await interaction.editReply({content: `${err}`});
                }, 2000)
            })

            setTimeout(async () => {
                if (!rule4) return;

                const embed4 = new MessageEmbed()
                .setDescription(`<:verified:1045796884616335511> La regla de Automod fue creada!`)
                .setColor("GOLD")

                await interaction.editReply({embeds: [embed4]})
            }, 3000)

            break;
        }
    }
} 