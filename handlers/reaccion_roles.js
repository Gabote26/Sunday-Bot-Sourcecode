const setupSchema = require(`${process.cwd()}/modelos/setups.js`)
const { asegurar_todo } = require(`${process.cwd()}/handlers/funciones.js`)

module.exports = client => {
    //añadir roles
    client.on("messageReactionAdd", async (reaction, user) => {
        try {
            if(user.bot || !reaction.message.guild) return;
            if(reaction.partial) await reaction.message.fetch().catch(() => {});
            if(reaction.message && reaction.message.partial) await reaction.message.fetch();
            await asegurar_todo(reaction.message.guild.id)
            const setup = await setupSchema.findOne({guildID: reaction.message.guild.id});
            const reaccionroles = setup.reaccion_roles;
            if(!reaccion_roles || !reaccionroles.length || reaccionroles.length === 0 || reaccionroles === undefined || reaccionroles === null) return;
            for(let i = 0; i < reaccionroles.length; i++){
                if(reaction.message.id === reaccionroles[i].ID_MENSAJE){
                    let usuario = await reaction.message.guild.members.cache.get(user.id);
                    let parametros = reaccionroles[i].Parametros;
                    let rol;
                    for(let k = 0; k < parametros.length; k++){
                        if(reaction.emoji?.id == parametros[k].Emoji){
                            try {
                                if(usuario.roles.cache.has(rol)) await usuario.roles.remove(rol).catch(() => {});
                                let role = reaction.message.guild.roles.cache.get(parametros[k].Rol);
                                if(role) {
                                    if(usuario.guild.me.roles.highest.rawPosition > role.position){
                                        await usuario.roles.add(rol).catch(() => {});
                                    } else {
                                        reaction.message.channel.send(`:x: **No tengo suficientes permisos para dar ese rol!**\nAsegurate de que mi rol este por encima del rol a dar!`).catch(() => {}).then(msg => {
                                            setTimeout(() => {
                                                msg.delete();
                                            }, 3000);
                                        });
                                    }
                                } else {
                                    reaction.message.channel.send(`:x: **El rol fue eliminado**`).catch(() => {}).then(msg => {
                                        setTimeout(() => {
                                            msg.delete();
                                        }, 3000);
                                    });
                                }
                            } catch (e){console.log(e)}
                        } else if(reaction.emoji?.name == parametros[k].Emoji){
                            try {
                                rol = parametros[k].Role;
                                let role = reaction.message.guild.roles.cache.get(parametros[k].Rol);
                                if(role) {
                                    if(usuario.guild.me.roles.highest.rawPosition > role.position){
                                        await usuario.roles.add(rol).catch(() => {});
                                    } else {
                                        reaction.message.channel.send(`:x: **No tengo suficientes permisos para dar ese rol!**\nAsegurate de que mi rol este por encima del rol a dar!`).catch(() => {}).then(msg => {
                                            setTimeout(() => {
                                                msg.delete();
                                            }, 3000);
                                        });
                                    }
                                } else {
                                    reaction.message.channel.send(`:x: **El rol fue eliminado**`).catch(() => {}).then(msg => {
                                        setTimeout(() => {
                                            msg.delete();
                                        }, 3000);
                                    });
                                }
                            } catch (e){console.log(e)}
                        } else {
                            continue;
                        }
                    }
                }
            }
        } catch(e){
            console.log(e)
        }
    });
    //quitar roles
    client.on("messageReactionRemove", async (reaction, user) => {
        try {
            if(user.bot || !reaction.message.guild) return;
            if(reaction.partial) await reaction.message.fetch().catch(() => {});
            if(reaction.message && reaction.message.partial) await reaction.message.fetch();
            await asegurar_todo(reaction.message.guild.id)
            const setup = await setupSchema.findOne({guildID: reaction.message.guild.id});
            const reaccionroles = setup.reaccion_roles;
            if(!reaccion_roles || !reaccionroles.length || reaccionroles.length === 0 || reaccionroles === undefined || reaccionroles === null) return;
            for(let i = 0; i < reaccionroles.length; i++){
                if(reaction.message.id === reaccionroles[i].ID_MENSAJE){
                    let usuario = await reaction.message.guild.members.cache.get(user.id);
                    let parametros = reaccionroles[i].Parametros;
                    let rol;
                    for(let k = 0; k < parametros.length; k++){
                        if(reaction.emoji?.id == parametros[k].Emoji){
                            try {
                                rol = parametros[k].Role;
                                let role = reaction.message.guild.roles.cache.get(parametros[k].Rol);
                                if(role) {
                                    if(usuario.guild.me.roles.highest.rawPosition > role.position){
                                        if(usuario.roles.cache.has(rol)) await usuario.roles.remove(rol).catch(() => {});
                                    } else {
                                        reaction.message.channel.send(`:x: **No tengo suficientes permisos para dar ese rol!**\nAsegurate de que mi rol este por encima del rol a dar!`).catch(() => {}).then(msg => {
                                            setTimeout(() => {
                                                msg.delete();
                                            }, 3000);
                                        });
                                    }
                                } else {
                                    reaction.message.channel.send(`:x: **El rol fue eliminado**`).catch(() => {}).then(msg => {
                                        setTimeout(() => {
                                            msg.delete();
                                        }, 3000);
                                    });
                                }
                            } catch (e){console.log(e)}
                        } else if(reaction.emoji?.name == parametros[k].Emoji){
                            try {
                                rol = parametros[k].Role;
                                let role = reaction.message.guild.roles.cache.get(parametros[k].Rol);
                                if(role) {
                                    if(usuario.guild.me.roles.highest.rawPosition > role.position){
                                        if(usuario.roles.cache.has(rol)) await usuario.roles.remove(rol).catch(() => {});
                                    } else {
                                        reaction.message.channel.send(`:x: **No tengo suficientes permisos para dar ese rol!**\nAsegurate de que mi rol este por encima del rol a dar!`).catch(() => {}).then(msg => {
                                            setTimeout(() => {
                                                msg.delete();
                                            }, 3000);
                                        });
                                    }
                                } else {
                                    reaction.message.channel.send(`:x: **El rol fue eliminado**`).catch(() => {}).then(msg => {
                                        setTimeout(() => {
                                            msg.delete();
                                        }, 3000);
                                    });
                                }
                            } catch (e){console.log(e)}
                        } else {
                            continue;
                        }
                    }
                }
            }
        } catch(e){
            console.log(e)
        }
    });
}