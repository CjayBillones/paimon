const { google } = require("googleapis");
const Discord = require("discord.js");

const JwtClient = new google.auth.JWT(
  process.env.EMAIL,
  null,
  process.env.KEY.replace(/\\n/gm, "\n"),
  ["https://www.googleapis.com/auth/spreadsheets"]
);

const client = google.sheets({ version: "v4", auth: JwtClient });

const { fetchUID } = require("../helpers/fetch_uid");

module.exports = {
  name: "swipe",
  description: "Returns a google sheet link of the whale leaderboard",
  async execute(message, args) {
    const costMap = {
      bp500: 0,
      bp1k: 1,
      welkin: 2,
      gc5000: 3,
      gc2500: 4,
      gc1500: 5,
      gc750: 6,
      gc250: 7,
      gc50: 8,
    };

    if (args.length === 0) {
      message.channel.send(process.env.SPREADSHEET_LINK);
      sendHelpMessage(message);
    } else {
      const str_UID = await fetchUID(message.author.id);
      if (!str_UID) {
        message.channel.send(
          "🔴 You don't have a linked UID. Please use ?uid to link your UID"
        );

        return;
      }
      const UID = filterInt(str_UID);
      const item_code = args[0].toLowerCase();
      const item = costMap[item_code];

      if (isNaN(UID)) {
        message.channel.send("UID is not a number.");
      } else if (str_UID.length !== 9) {
        message.channel.send("Invalid UID length.");
      } else if (!(item_code in costMap)) {
        message.channel.send(
          "🔴 Swiped item is invalid. Please use command ?swipe for the correct items."
        );
      } else {
        let date = new Date().toUTCString().substr(0, 25);

        const response = await client.spreadsheets.values.append({
          spreadsheetId: process.env.SPREADSHEET_ID,
          range: "Top-up History!A1:D1",
          valueInputOption: "USER_ENTERED",
          resource: {
            majorDimension: "ROWS",
            values: [[str_UID, date, item, item_code]],
          },
        });

        if (response != null) {
          message.channel.send(
            "🟢 Successfully swiped " + item_code + " for UID: " + str_UID
          );
        } else {
          message.channel.send("🔴 Error swiping");
        }
      }
    }
  },
};

function filterInt(value) {
  if (/^[-+]?(\d+|Infinity)$/.test(value)) {
    return Number(value);
  } else {
    return NaN;
  }
}

function sendHelpMessage(message) {
  var embed = new Discord.MessageEmbed().setColor("#FF0000");

  embed.addFields({
    name: "Use the format ?swipe {ITEM} where ITEM can be:",
    value: "BP1K\nBP500\nWelkin\nGC5000\nGC2500\nGC1500\nGC750\nGC250\nGC50",
  });

  message.channel.send(embed);
}
