module.exports = {
  name: "swipe_help",
  description: "Returns a google sheet link of the whale leaderboard",
  execute(message, args) {
    message.channel.send(
      "Use the format ?swipe {UID} {ITEM} where ITEM can be: \nBP1K\nBP500\nWelkin\nGC5000\nGC2500\nGC1500\nGC750\nGC250\nGC50"
    );
  },
};
