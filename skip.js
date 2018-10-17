module.exports = {
  name:'skip',
  async execute(bot,message,args,now){
    if(!message.member.voiceChannel) return ("You are not in voice channel");

    let fetched = now.get(message.guild.id);

    if(!fetched) return message.reply("Sorry there is no music to skip");

    if(message.member.voiceChannel !== message.guild.me.voiceChannel) return message.reply(`You must be in ***${message.guild.me.voiceChannel.name}*** to skip`);


    now.set(message.guild.id, fetched);

    if (fetched.queue[0]) {
     await message.channel.send('Seccessfully Skipped the Song');
      return fetched.dispatcher.end();
    }

  }
}
