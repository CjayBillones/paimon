const { google } = require("googleapis");
const Discord = require("discord.js");
const discordClient = new Discord.Client();

const JwtClient = new google.auth.JWT(
  process.env.EMAIL,
  null,
  process.env.KEY.replace(/\\n/gm, "\n"),
  ["https://www.googleapis.com/auth/spreadsheets"]
);

const client = google.sheets({ version: "v4", auth: JwtClient });

const { fetchUID } = require("../helpers/fetch_uid")

module.exports = {
  name: "wish",
  description: "For logging wishes to the wish accounting sheet",
  async execute(message, args) {
    if(args.length == 0) {
      message.channel.send(
        "https://docs.google.com/spreadsheets/d/1jiEO3Ciq7Hb8ggo5Ix3GH5_VqjHR5ndYAJ7OR3AVtRA/edit#gid=0"
      );
      sendHelpMessage(message); 
      return;
    };
    
    var row = validateArgs(args, message);

    if(!row) {
      message.channel.send("🔴 Invalid input")
      sendHelpMessage(message)
      return
    }

    const uid = await fetchUID(message.author.id);

    if(!uid) {
      message.channel.send("🔴 You don't have a linked UID. Please use ?uid to link your UID")
      return
    }

    let date = new Date().toUTCString().substr(0, 25);

    const response = await client.spreadsheets.values.append({
      spreadsheetId: "1jiEO3Ciq7Hb8ggo5Ix3GH5_VqjHR5ndYAJ7OR3AVtRA",
       range: "Wish Accounting!A1:D1",
       valueInputOption: "USER_ENTERED",
       resource: {
         majorDimension: "ROWS",
         values: [[uid, date, row["banner"], row["chars"], row["weapons"], row["wishes"]]],
       },
    });

    if (response != null) {
      message.channel.send(
        `🟢 Successfully logged ${row['wishes']} pulls for ${row['banner']} banner with ${row['chars']} character/s and ${row['weapons']} weapon/s for UID: ${uid}`
      );
    } else {
      message.channel.send("🔴 Error logging wish");
    }
  },
};

function validateArgs(args, message) {
  var shorthandBanners = {
    c: "character",
    w: "weapon",
    b: "beginner",
    s: "standard"
  }

  var banners = Object.values(shorthandBanners);

  if(args.length == 2 || args.length > 4) { return false };

  if(args[0].length > 1 && !banners.includes(args[0].toLowerCase())) { return false };
  if(args[0].length == 1 && !banners.map(x => x[0]).includes(args[0].toLowerCase())) { return false };

  if(!/^[0-9]*$/.test(args[1])) { return false };

  if(!/((char)|(weap))=\d+$/.test(args[2])) { return false };
  if(args[3] && !/((char)|(weap))=\d+$/.test(args[3])) { return false };

  if(args[0].length == 1) { args[0] = shorthandBanners[args[0]] };

  args[0] = args[0].replace(/^\w/, (c) => c.toUpperCase());

  var counts = getCounts(args[2], args[3])

  var result = {
    banner: args[0],
    wishes: args[1],
    chars: counts["chars"] || '0',
    weapons: counts["weapons"] || '0'
  }

  return result;
}

function getCounts(arg3, arg4) {
  var counts = {}

  if(arg3.charAt(0) == "c") {
    counts["chars"] = arg3.slice(5);
    counts["weapons"] = arg4 && arg4.slice(5);
  } else {
    counts["weapons"] = arg3.slice(5);
    counts["chars"] = arg4 && arg4.slice(5)
  }

  return counts
}

function sendHelpMessage(message){
  var embed = new Discord.MessageEmbed().setColor("#FF0000");

  embed.addFields(
    {
      name: "Log your wishes",
      value: "`?wish <banner> <number of pulls> [char=<num>|weap=<num>]`"
    },
    { 
      name: "Banner options",
      value: "`character, weapon, beginner, standard`"
    },
    {
      name: "Example for pulling one 5star character with 65 pulls on character b anner",
      value: "`?wish character 65 char=1`"
    },
    {
      name: "Banner options can be replaced by their first letters",
      value: "`?wish c 65 char=1`"
    }
  )

  message.channel.send(embed);
}
