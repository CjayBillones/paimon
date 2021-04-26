const Discord = require("discord.js")

module.exports = {
  name: "level",
  description: "Returns a chart of character and weapon level cost summaries.",
  execute(message, args){
    if(args[0].toLowerCase() === "character"){
      message.channel.send("https://i.imgur.com/15D6cor.png");
    } else if(args[0].toLowerCase() === "weapon"){
      message.channel.send("https://imgur.com/ko1zwgo");
    } else if(args[0].toLowerCase() === "talent"){
      message.channel.send("https://imgur.com/VI9slUh.png");
    } else{
      sendHelpMessage(message);
    }
  }
}

function sendHelpMessage(message){
  var embed = new Discord.MessageEmbed()
                         .setColor("#FF0000")
  embed.addFields(
    {
      name: "Command Usage: ",
      value: "?level [option]\n\n Bot will accepts `character` and `weapon` as valid options and will return an image containing the summary of weapon and character levels and their corresponding costs."
    }
  )
  message.channel.send(embed);
}