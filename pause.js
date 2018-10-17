module.exports = {
  name: 'pause',
  async execute(bot,message,now,args){
    if (!message.member.voiceChannel) return message.reply("You are not in voice channel");

    if(message.member.voiceChannel !== message.guild.me.voiceChannel) return message.reply(`You must be in ***${message.guild.me.voiceChannel.name}*** to Pause`);

    let fetched = now.get(message.guild.id);

    if(!fetched) return message.channgel.send("Sorry there is no song playing right now!");

    if(fetched.dispatcher.pasued) return message.channel.send("Song is already pasued");

    fetched.dispatcher.pause();

    message.reply("Sucessfully Paused");
  }
}
