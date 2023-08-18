const fs = require("fs")
const Discord = require("discord.js")
const { REST } = require("@discordjs/rest")
const { Routes } = require("discord-api-types/v9")
const { clientId } = require("./config/config.json")
const commands = []
const slashComandos = fs.readdirSync("./Slash Commands").filter(file => file.endsWith("js"))

for(const file of slashComandos){
    const slash = require(`./Slash Commands/${file}`)
    commands.push(slash.data.toJSON())
}

const rest = new REST({ version: "9" }).setToken("OTk2NTcxMTUyNjQwMTI3MTE2.GyiYel.N73iR02QFYJ9VAw_vkP59n0tulBEntWDV4ioqw")

createSlash()

async function createSlash(){
    try{
        await rest.put(
            Routes.applicationCommands(clientId),{
                body: commands
            }
        )
        console.log("Slash Commands Agregados.")
    } catch(e) {
        console.error(e)
    }
}