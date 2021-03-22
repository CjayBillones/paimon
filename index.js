require("dotenv").config();
const Discord = require("discord.js");
const config = require("./config.json");
const bot = new Discord.Client();
const fs = require("fs");
const TOKEN = process.env.TOKEN;

const readline = require("readline");
const { google } = require("googleapis");

const firebase = require("firebase/app");
require("firebase/firestore");

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  appId: process.env.FIREBASE_APP_ID,
  projectId: process.env.FIREBASE_PROJECT_ID,
};

firebase.initializeApp(firebaseConfig);

bot.commands = new Discord.Collection();

const commandFiles = fs
  .readdirSync("./commands/")
  .filter((file) => file.endsWith(".js"));

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  bot.commands.set(command.name, command);
}

const memes = require(`./memes/meme_commands.js`);
memes.commands.forEach((command) => {
  bot.commands.set(command.name, command);
});

bot.on("ready", () => {
  console.info(`Logged in as ${bot.user.tag}!`);
});

bot.on("message", (message) => {
  let prefix = config.prefix;
  if (!message.content.startsWith(prefix) || message.author.bot) return;

  const args = message.content.slice(prefix.length).split(/ +/);
  const commandName = args.shift().toLowerCase();

  if (!bot.commands.has(commandName)) return;
  const command = bot.commands.get(commandName);
  command.execute(message, args);
});

bot.login(TOKEN);
