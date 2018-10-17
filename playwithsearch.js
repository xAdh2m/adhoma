const search = require("youtube-search");

var opts = {
  maxResults: 1,
  key: 'AIzaSyA2YG4i9H-4ea1Qv7QD9wphNSez0ReYsbo'
};


module.exports = {
  name:'test',
  async execute(bot,message,args,now){
    search(args.join(' '),opts, (err,Svid) => {

      if(err) {
        message.channel.send("hmmmmmmm something went wrong");
        console.log(err)
        return ;
      }






      let videos = Svid;

      let Svid1 = '';
      for(var i in videos){
        Svid1 += `${videos[i].title}// ${videos[i].link}`;
      }


        let commandFiles = require('./play.js');
        commandFiles.execute(bot,message,[videos[0].link], now).catch(err => console.log(err));

    });
  }
}
