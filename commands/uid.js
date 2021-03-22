const Discord = require("discord.js");
const discordClient = new Discord.Client();
const firebase = require("firebase/app");
require("firebase/firestore");

var db = firebase.firestore();

module.exports = {
  name: "uid",
  description: "Links UID to Discord user",
  async execute(message, args) {
    try {
      if (!validateArgs(args)) fail(message);

      if (args.length == 0) {
        var uid = await lookupUID(message.author.id);
        if (uid) {
          message.channel.send(`🟢 You have a linked UID. UID: ${uid}`);
        } else {
          message.channel.send("🔴 You don't have a linked UID.");
          sendHelpMessage(message);
        }
      } else {
        if (!validateGenshinUID(args[0])) fail(message, "GenshinUID");

        if (await linkUID(message, args[0])) {
          message.channel.send(`🟢 Successfully linked UID: ${args[0]}`);
        } else {
          message.channel.send(
            "🔴 Failed to link UID. Please contact paimon devs."
          );
        }
      }
    } catch {}
  },
};

async function lookupUID(discordUID) {
  var response = false;

  await db
    .collection("users")
    .doc(discordUID)
    .get()
    .then((doc) => {
      if (doc.exists) {
        response = doc.data()["genshinUID"];
      }
    });

  return response;
}

async function linkUID(message, genshinUID) {
  var discordUID = message.author.id;
  var status = false;
  var userExists = false;

  await db
    .collection("users")
    .where("genshinUID", "==", genshinUID)
    .get()
    .then((snap) => {
      userExists = snap.size > 0 && snap.docs[0].id != discordUID;
    });

  if (userExists) {
    message.channel.send(
      `UID: ${genshinUID} is already linked to another user.`
    );
    return status;
  }

  await db
    .collection("users")
    .doc(discordUID)
    .set({
      genshinUID: genshinUID,
    })
    .then(() => {
      status = true;
    })
    .catch((err) => {
      status = false;
    });

  return status;
}

function validateArgs(args) {
  if (args.length > 1) {
    return false;
  }
  return true;
}

function validateGenshinUID(genshinUID) {
  if (isNaN(filterInt(genshinUID)) || genshinUID.length !== 9) {
    return false;
  } else {
    return true;
  }
}

function filterInt(value) {
  if (/^[0-9]*$/.test(value)) {
    return Number(value);
  } else {
    return NaN;
  }
}

function fail(message, error = null) {
  if (error == "GenshinUID") {
    sendGenshinUIDHelpMessage(message);
  } else {
    sendHelpMessage(message);
  }
  throw "Invalid Args";
}

function sendHelpMessage(message) {
  var embed = new Discord.MessageEmbed().setColor("#FF0000");

  embed.addFields(
    {
      name: "Link your UID to Discord",
      value: "`?uid <Genshin Impact UID>`",
    },
    {
      name: "Check link status",
      value: "`?uid`",
    }
  );

  message.channel.send(embed);
}

function sendGenshinUIDHelpMessage(message) {
  var embed = new Discord.MessageEmbed().setColor("#FF0000");
  embed.addFields({
    name: "Invalid UID Format",
    value:
      "Make sure that you placed the right UID. This can be seen at the bottom right corner ingame.",
  });

  message.channel.send(embed);
}
