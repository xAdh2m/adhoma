module.exports = {
  name:'resume',
  async execute(bot,message,now,args){
    if (!message.member.voiceChannel) return message.reply("You are not in voice channel");

    if(message.member.voiceChannel !== message.guild.me.voiceChannel) return message.reply(`You must be in ***${message.guild.me.voiceChannel.name}*** to Resume`);

    let fetched = now.get(message.guild.id);

    if(!fetched) return message.reply("Sorry there is no song playing right now");

    if(!fetched.dispatcher.paused) return message.reply("This song is not pasued");

    fetched.dispatcher.resume();

    message.reply("Successfully Resumed");
  }
}
