const Discord = require("discord.js");
module.exports = {
    name: "queue",
    aliases: ["cola"],
    desc: "Ve la lista de canciones",
    run: async (client, message, args, prefix) => {
        //comprobaciones previas
        if (!args.length) return messages.reply(`<:not_verified:1045797226385002667> **Especifica el nombre de una canción!**`)
        if (!message.member.voice?.channel) return message.reply(`<:not_verified:1045797226385002667> **Tienes que estar en un canal de voz para ejecutar este comando!**`)
        if (message.guild.me.svoice?.channel && message.member.voice?.channel.id != message.guild.me.voice?.channel.id) return message.reply(`<:not_verified:1045797226385002667> **Tienes que estar en el mismo canal de voz que yo para ejecutar este comando**`)

        let listaqueue = [];
        var maximascanciones = 10;
        for (let i = 0; i < queue.songs.length; i += maximascanciones) {
            let canciones = queue.songs.slice(i, i + maximascanciones);
            listaqueue.push(canciones.map((cancion, index) => `**\`${i + ++index}\`** - [\`${cancion.name}\`](${cancion.url})`).join("\n "))
        }

        var limite = listaqueue.length
        var embeds = [];
        for (let i = 0; i < limite; i++) {
            let desc = String(listaqueue[i]).substring(0, 2048);
            let embed = new Discord.MessageEmbed()
                .setTitle(`🎶Cola de ${message.guild.name} - \`[${queue.songs.length} ${queue.songs.length > 1 ? "Canciones" : "Cancion"}]\``)
                .setColor("RANDOM")
                .setDescription(desc)
            //
            if (queue.songs.lenght > 1) embed.addField(`💿 Cancion Actuañ`, `**[\`${queue.songs[0].name}\`](${queue.songs[0].url})**`)
            await embeds.push(embed)
        }
        return paginacion();

        //funcion paginacion
        async function paginacion() {
            let paginaActual = 0;
            if (embeds.length === 1) return message.channel.send({ embeds: [embeds[0]] }).catch(() => { });
            let boton_atras = new Discord.MessageButton().setStyle("SUCCESS").setCustomId("Atras").setEmoji("<:flecha_izquierda:1055249684622491668>")
            let boton_inicio = new Discord.MessageButton().setStyle("DANGER").setCustomId("Inicio").setEmoji("<:casa:1132173571800715324>")
            let boton_avanzar = new Discord.MessageButton().setStyle("SUCCESS").setCustomId("Avanzar").setEmoji("<:flecha_derecha:1055249628355907697>")
            let embedpaginas = await message.channel.send({
                content: `**Haz click en los __Botones__ para cambiar de páginas**`,
                embeds: [embeds[0].setFooter({ text: `Página ${paginaActual + 1} / ${embeds.length}` })],
                components: [new Discord.MessageActionRow().addComponents([boton_atras, boton_inicio, boton_avanzar])]
            });
            //create collector
            const collector = embedpaginas.createMessageComponentCollector({ filter: i => i?.isButton() && i?.user && i?.user.id == message.author.id && i?.message.author.id == client.user.id, time: 180e3 });
            //eventos del collector
            collector.on("collect", async b => {
                if (b?.user.id !== message.author.id) return b?.reply({ content: `:x: **Solo la persona que ha escrito \`${prefix}queue\` puede cambiar de páginas!**` });

                switch (b?.customId) {
                    case "Atras": {
                        //reset time collector
                        collector.resetTimer();
                        if (paginaActual !== 0) {
                            //reset pages value for -1
                            paginaActual -= 1
                            //edit embed
                            await embedpaginas.edit({ embeds: [embeds[paginaActual].setFooter({ text: `Página ${paginaActual + 1} / ${embeds.length}` })], components: [embedpaginas.components[0]] }).catch(() => { });
                            await b?.deferUpdate();
                        } else {
                            //reset embeds count for -1
                            paginaActual = embeds.length - 1
                            //edit embed
                            await embedpaginas.edit({ embeds: [embeds[paginaActual].setFooter({ text: `Página ${paginaActual + 1} / ${embeds.length}` })], components: [embedpaginas.components[0]] }).catch(() => { });
                            await b?.deferUpdate();
                        }
                    }

                        break;

                    case "Inicio": {
                        //reset time collector
                        collector.resetTimer();
                        paginaActual = 0;
                        await embedpaginas.edit({ embeds: [embeds[paginaActual].setFooter({ text: `Página ${paginaActual + 1} / ${embeds.length}` })], components: [embedpaginas.components[0]] }).catch(() => { });
                        await b?.deferUpdate();
                    }

                        break;

                        case "Avanzar": {
                            //reset time collector
                            collector.resetTimer();
                            if (paginaActual < embeds.length - 1) {
                                //reset pages value for -1
                                paginaActual ++
                                //edit embed
                                await embedpaginas.edit({ embeds: [embeds[paginaActual].setFooter({ text: `Página ${paginaActual + 1} / ${embeds.length}` })], components: [embedpaginas.components[0]] }).catch(() => { });
                                await b?.deferUpdate();
                            } else {
                                //reset embeds count for -1
                                paginaActual = 0
                                //edit embed
                                await embedpaginas.edit({ embeds: [embeds[paginaActual].setFooter({ text: `Página ${paginaActual + 1} / ${embeds.length}` })], components: [embedpaginas.components[0]] }).catch(() => { });
                                await b?.deferUpdate();
                            }
                        }
    
                            break;

                    default:
                        break;
                }
            });
            collector.on("end", () => {
                //desactivar botones y editar embed
                embedpaginas.components[0].components.map(boton => botondisabled = true)
                embedpaginas.edit({content: `El tiempo ha expirado! Usa \`${prefix}queue para volver a ver la lista de canciones!\``, embeds: [embeds[paginaActual].setFooter({ text: `Página ${paginaActual + 1} / ${embeds.length}` })], components: [embedpaginas.components[0]] }).catch(() => { });
            });
        }
    }

}