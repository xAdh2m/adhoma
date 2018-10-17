/////////////////////////////////////////
///////  Developed by Jazora#0001 ///////
/////////////////////////////////////////

const Discord = require("discord.js"); //Discord.js module
const config = require("./botconfig.json"); //bot settings.
const fs = require("fs");
const bot = new Discord.Client();

//CREATING a new map ..
const now = new Map();


//New Collection for FILES.
bot.commands = new Discord.Collection();

const commandFiles = fs.readdirSync("./commands").filter(file => file.endsWith(".js"));

for (const file of commandFiles) {
  const command = require (`./commands/${file}`)
  console.log(`${file} has Loaded`);
  bot.commands.set(command.name, command);
}



bot.on("ready", () => {

    console.log(`logged in as [${bot.user.username}] in ${bot.guilds.size} Servers`);
    console.log("///////////////////////////////\n///Developed by Jazora#0001///\n///  For Adham#7519       ///\n/// ID:390866409195831296///\n///////////////////////////")

    bot.user.setActivity('Type Ahelp', {type: "PLAYING"});

});

bot.on("message", async message => {

  if(!message.content.startsWith(config.prefix) || message.author.bot) return;

  let args = message.content.slice(config.prefix.length).split(' ');
  let command = args.shift().toLowerCase();


  switch(command)
  {

    case 'play':
    bot.commands.get('play').execute(bot,message,args,now);
    break;

    case 'help':
    bot.commands.get('help').execute(bot,message,args);
    break;

    case 'pause':
    bot.commands.get('pause').execute(bot,message,now,args);
    break;

    case 'resume':
    bot.commands.get('resume').execute(bot,message,now,args);
    break;


    case 'skip':
    bot.commands.get('skip').execute(bot,message,args,now);
    break;

    default:
    message.reply(`Invalid Command ${message.content.slice(config.prefix.length)}\nPlease use #help for list of commands`);
    break;
  }

});



bot.login(config.token);
