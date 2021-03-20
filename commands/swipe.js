const { google } = require("googleapis");

const JwtClient = new google.auth.JWT(
  process.env.EMAIL,
  null,
  process.env.KEY,
  ["https://www.googleapis.com/auth/spreadsheets"]
);

const client = google.sheets({ version: "v4", auth: JwtClient });

module.exports = {
  name: "swipe",
  description: "Returns a google sheet link of the whale leaderboard",
  async execute(message, args) {
    const costMap = {
      BP500: 0,
      BP1K: 1,
      Welkin: 2,
      GC5000: 3,
      GC2500: 4,
      GC1500: 5,
      GC750: 6,
      GC250: 7,
      GC50: 8,
    };

    if (args.length === 0) {
      message.channel.send(
        "https://docs.google.com/spreadsheets/d/1jiEO3Ciq7Hb8ggo5Ix3GH5_VqjHR5ndYAJ7OR3AVtRA/edit#gid=0"
      );
    } else {
      const str_UID = args[0];
      const UID = filterInt(str_UID);
      const item = costMap[args[1]];

      if (isNaN(UID)) {
        message.channel.send("UID is not a number.");
      } else if (str_UID.length !== 9) {
        message.channel.send("Invalid UID length.");
      } else if (!(args[1] in costMap)) {
        message.channel.send(
          "Swiped item is invalid. Please use command ?swipe_help for the correct items."
        );
      } else {
        let date = new Date().toUTCString().substr(0, 25);

        const response = await client.spreadsheets.values.append({
          spreadsheetId: "1jiEO3Ciq7Hb8ggo5Ix3GH5_VqjHR5ndYAJ7OR3AVtRA",
          range: "Top-up History!A1:D1",
          valueInputOption: "USER_ENTERED",
          resource: {
            majorDimension: "ROWS",
            values: [[str_UID, date, item]],
          },
        });

        if (response != null) {
          message.channel.send(
            "Successfully swiped " + args[1] + " for UID: " + str_UID
          );
        } else {
          message.channel.send("Error swiping");
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
