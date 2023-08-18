const {DisTube} = require("distube");
const { SoundCloudPlugin } = require("@distube/soundcloud");
const { SpotifyPlugin} = require("@distube/spotify");
const Discord = require("discord.js");
module.exports = (client) => {
    console.log("✔️ Módulo de Musica Cargado".red)

    client.distube = new DisTube(client, Discord, {
        emitNewSongOnly: false,
        leaveOnEmpty: true,
        leaveOnFinish: true,
        leaveOnStop: true,
        savePreviousSongs: true,
        emitAddSongWhenCreatingQueue: false,
        searchSongs: 0,
        nsfw: false,
        emptyCooldown: 25,
        ytdlOptions: {
            highWaterMark: 1024 * 1024 * 64,
            quality: "highestaudio",
            liveBuffer: 60000,
            dlChunkSize: 1024 * 1024 * 4,
        },
        youtubeDl: false,
        plugins: [
           new SpotifyPlugin({
            parallel: true,
            emitEventsAfterFetching: true,
           }),
           new SoundCloudPlugin()
        ],
    });
    
    //eventos de distube

    client.on("playSong", (queue, song) => {
        queue.textChannel.send({
            embeds: [new Discord.MessageEmbed()
            .setTitle(`🎶**Reproduciendo \`${song.name}\` - \`${song.formattedDuration}\`**`)
            .setThumbnail(song.thumbnail)
            .setURL(song.url)
            .setColor("#c25f76")
            .setFooter({text: `Añadida por ${song.user.tag}`, iconURL: song.user.displayAvatarURL({dynamic: true})} )
            ]
        })
        
    });

    client.on("addSong", (queue, song) => {
        queue.textChannel.send({
            embeds: [new Discord.MessageEmbed()
            .setTitle(`<:verified:1045796884616335511>**Añadido \`${song.name}\` - \`${song.formattedDuration}\`**`)
            .setThumbnail(song.thumbnail)
            .setURL(song.url)
            .setColor("#c25f76")
            .setFooter({text: `Añadida por ${song.user.tag}`, iconURL: song.user.displayAvatarURL({dynamic: true})} )
            ]
        })
        
    });

    client.distube.on("initQueue", (queue) => {
        queue.autoplay = true;
    });
};