const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "avatar",
  alias: ["icon-user"],
  run: async (bot, message, args) => {

    let Member = message.mentions.users.first() || message.author;

    let embed = new MessageEmbed()
      .setColor("RANDOM")
      .addField(
        "Links",
        `[Png](${Member.displayAvatarURL({
          format: "png",
          dynamic: true
        })}) | [Jpg](${Member.displayAvatarURL({
          format: "jpg",
          dynamic: true
        })}) | [Webp](${Member.displayAvatarURL({
          format: "webp",
          dynamic: true
        })})`
      )
      .setImage(Member.displayAvatarURL({size: 2048, dynamic: true }))
      .setTimestamp();

    message.channel.send({ embeds: [embed] });

  }
};