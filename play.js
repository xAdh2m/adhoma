const ytdl = require("ytdl-core");
const Discord = require("discord.js");
const config = require("../botconfig.json");

module.exports = {
  name:'play',
  async execute(bot,message,args,now) {
    if(!message.member.voiceChannel) return message.reply("You have to be in channel to play music bot");

    if(!message.guild.me.voiceChannel){

    }else if(message.member.voiceChannel !== message.guild.me.voiceChannel){
      return message.channel.send(`You must be in **${message.guild.me.voiceChannel.name}** to play music`);
    }



    if(!args[0])
    {
     await message.member.voiceChannel.join();
      return message.reply(`${config.prefix}play How its work\n\n\`${config.prefix}play <Youtube URL>\` to play youtube links\n\`${config.prefix}play <Song title>\` to play the first result from youtube\n\nEnjoy.`);
    }





    let validate = ytdl.validateURL(args[0]);

    if(!validate){
      let commandsFiles = require ('./playwithsearch.js');
      return commandsFiles.execute(bot,message,args,now);
    }

    let info = await ytdl.getInfo(args[0]);

    let getD = now.get(message.guild.id) || {};

    if(!getD.connection) getD.connection = await message.member.voiceChannel.join();

    if(!getD.queue) getD.queue = [];
    getD.guildID = message.guild.id;

    getD.queue.push({
      songTitle: info.title,
      requested: message.author.tag,
      url: args[0],
      announceChannel: message.channel.id
    });

    if(!getD.dispatcher) play(bot, now, getD);
    else{
      const msg = await message.channel.send(`Searching...`)
      await msg.edit(`Added to Queue: **${info.title}**`)
    }

    now.set(message.guild.id, getD);





  }

}


async function play(bot,now,getD){
  const msg = await bot.channels.get(getD.queue[0].announceChannel).send(`Searching...`)
  await msg.edit(`Now Playing: **${getD.queue[0].songTitle}**`);

 getD.dispatcher = await getD.connection.playStream(ytdl(getD.queue[0].url, {filter: "audioonly"}) );
 getD.dispatcher.guildID = getD.guildID;

 getD.dispatcher.on("end", () =>{
    end(bot,now,getD);
 });
}


function end(bot, now ,getD) {
  let fetched = now.get(getD.dispatcher.guildID);

  fetched.queue.shift();

  if(fetched.queue[0]) {
    now.set(getD.dispatcher.guildID, fetched);


    play(bot,now,fetched);

  } else {
    now.delete(getD.dispatcher.guildID);
  }
}
