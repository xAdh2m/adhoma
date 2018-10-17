const Discord = require("discord.js");

module.exports = {
  name: 'help',
  async execute(bot,message,args) {

    let helpEmbed = new Discord.RichEmbed()
    .setAuthor(message.author.username, message.author.avatarURL)
    .setThumbnail(message.author.avatarURL)
    .setColor("#4800ff")
    .addField("#play","Uses to play song by doing #play Youtube link", true)
    .addField("#pause","to freeze music", true)
    .addField("#resume","to resume music", true)
    .addField("#skip","to skip song", true)
    .setFooter("Developed by Jazora#0001");

    message.channel.send(helpEmbed);
  }


}
