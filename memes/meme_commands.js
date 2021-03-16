const Discord = require("discord.js");

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

module.exports = {
  commands: [
    {
      name: "sucrose",
      description: "A bunch of meme commands",
      execute(message, _) {
        let messages = ["Yes.", "Tama 'yan.", "Yes! Tama 'yan"];
        message.channel.send(messages[getRandomInt(messages.length)]);
      },
    },
    {
      name: "razor",
      description: "A bunch of meme commands",
      execute(message, _) {
        let messages = ["Yesssss"];
        message.channel.send(messages[getRandomInt(messages.length)]);
      },
    },
    {
      name: "zhongli",
      description: "A bunch of meme commands",
      execute(message, _) {
        let images = [
          "https://media1.tenor.com/images/373c80cfb4498d2b043572ef58ceb516/tenor.gif",
          "https://i.imgur.com/1EON1kN.png",
          "https://i.kym-cdn.com/photos/images/original/001/925/503/5c2.jpg",
        ];
        const image = images[getRandomInt(images.length)];
        const embeddedMessage = new Discord.MessageEmbed().setImage(image);
        message.channel.send(embeddedMessage);
      },
    },
    {
      name: "ganyu",
      description: "A bunch of meme commands",
      execute(message, _) {
        //Format: [imageLink, messageTitle, probability]
        let memeBundle = [
          ["https://i.imgur.com/f5bMIO8.png", "Come home", 24.2],
          ["https://i.imgur.com/TEVaf9f.png", "Come home", 24.2],
          ["https://i.redd.it/l2x7hzja4ab61.png", "Come home", 50],
          [
            "https://media1.tenor.com/images/5405bb7f7415fe21cc5163f52a56f6f3/tenor.gif",
            "Already home",
            1.6,
          ],
        ];

        let random_index = alias_sampler(memeBundle.map((arr) => arr[2]))();
        let [image, title] = memeBundle[random_index];

        let embeddedMessage = new Discord.MessageEmbed()
          .setImage(image)
          .setTitle(title);

        message.channel.send(embeddedMessage);
      },
    },
    {
      name: "ayaka",
      description: "A bunch of meme commands",
      execute(message, _) {
        let images = [
          "https://pbs.twimg.com/media/ENKta_uXYAEO_RY?format=jpg&name=4096x4096",
        ];
        const image = images[getRandomInt(images.length)];
        const embeddedMessage = new Discord.MessageEmbed()
          .setImage(image)
          .setTitle("Come home");
        message.channel.send(embeddedMessage);
      },
    },
    {
      name: "hu",
      description: "A bunch of meme commands",
      execute(message, _) {
        let memeBundle = [
          ["https://i.imgur.com/8sOXZs4.png", "Who tao", 15.8],
          ["https://imgur.com/HuCegNK.png", "Who tao", 15.8],
          ["https://imgur.com/pkpN328.gif", "BOO tao", 15.8],
          ["https://imgur.com/QhdVOOG.png", "?swipe", 15.8],
          ["https://imgur.com/bghIusA.gif", "Yoh!", 15.8],
          [
            "https://media.tenor.com/images/c6c37c4ad12b03fb9581de61a017fcc7/tenor.gif",
            "Who tao",
            15.8,
          ],
          [
            "https://imgur.com/rzR0iOm.gif",
            "UWU",
            1.3,
          ],
          [
            "https://media1.tenor.com/images/60fa3413ac1ce122b3ef14f9572613eb/tenor.gif",
            "Nya Arigato",
            1.3,
          ],
          [
            "https://media1.tenor.com/images/dc73314354b09615c72b3e7b4346613b/tenor.gif",
            "Sayonara",
            1.3,
          ],
          [
            "https://pbs.twimg.com/media/Etn3A9yXMAEQij-?format=jpg&name=large",
            "Come home",
            1.3,
          ],
        ];

        let random_index = alias_sampler(memeBundle.map((arr) => arr[2]))();
        let [image, title] = memeBundle[random_index];

        let embeddedMessage = new Discord.MessageEmbed()
          .setImage(image)
          .setTitle(title);

        message.channel.send(embeddedMessage);
      },
    },
    {
      name: "xiao",
      description: "A bunch of meme commands",
      execute(message, _) {
        // Format: [image, title]
        let images = [
          ["https://imgur.com/g46z8mi.png", "Xiaomachurl"],
          ["https://imgur.com/xGWq8ef.png", "Xiao Long Bao"],
          ["https://imgur.com/SPczhak.png", "Xiaomai Rice"],
        ];
        let [image, title] = images[getRandomInt(images.length)];
        const embeddedMessage = new Discord.MessageEmbed()
          .setImage(image)
          .setTitle(title);
        message.channel.send(embeddedMessage);
      },
    },
    {
      name: "diluc",
      description: "A bunch of meme commands",
      execute(message, _) {
        // Format: [image, title]
        let images = [
          ["https://imgur.com/83fAdFm.png", "Kiluc"],
        ];
        let [image, title] = images[getRandomInt(images.length)];
        const embeddedMessage = new Discord.MessageEmbed()
          .setImage(image)
          .setTitle(title);
        message.channel.send(embeddedMessage);
      },
    },
    {
      name: "klee",
      description: "A bunch of meme commands",
      execute(message, _) {
        // Format: [image, title]
        let images = [
          ["https://imgur.com/s6xMcZd.png", "Dlee"],
        ];
        let [image, title] = images[getRandomInt(images.length)];
        const embeddedMessage = new Discord.MessageEmbed()
          .setImage(image)
          .setTitle(title);
        message.channel.send(embeddedMessage);
      },
    },
    {
      name: "childe",
      description: "A bunch of meme commands",
      execute(message, _) {
        // Format: [image, title]
        let images = [
          ["https://imgur.com/fRfXJ5X.png", "Childe"],
        ];
        let [image, title] = images[getRandomInt(images.length)];
        const embeddedMessage = new Discord.MessageEmbed()
          .setImage(image)
          .setTitle(title);
        message.channel.send(embeddedMessage);
      },
    },
    {
      name: "mona",
      description: "A bunch of meme commands",
      execute(message, _) {
        // Format: [image, title]
        let images = [
          ["https://i.redd.it/kh39rnph48g61.jpg", "mona..?"],
        ];
        let [image, title] = images[getRandomInt(images.length)];
        const embeddedMessage = new Discord.MessageEmbed()
          .setImage(image)
          .setTitle(title);
        message.channel.send(embeddedMessage);
      },
    },
    {
      name: "homa",
      description: "A bunch of meme commands",
      execute(message, _) {
        // Format: [image, title]
        let images = [
          ["https://imgur.com/rqrpf31.png", "lEt's go R5"],
          ["https://imgur.com/KhP6cCF.gif", "It's homa...NOT. don't be like tectone"],
        ];
        let [image, title] = images[getRandomInt(images.length)];
        const embeddedMessage = new Discord.MessageEmbed()
          .setImage(image)
          .setTitle(title);
        message.channel.send(embeddedMessage);
      },
    },
    {
      name: "weapon",
      description: "A bunch of meme commands",
      execute(message, _) {
        //Format: [imageLink, messageTitle, probability]
        let memeBundle = [
          ["https://imgur.com/KhP6cCF.gif", "It's homa...NOT. don't be like tectone", 49.7],
          ["https://imgur.com/4nVTkqv.png", "But at what cost?", 49.7],
          [
            "https://imgur.com/Vw0ja4e.png",
            "Demn boI weapon banner not a scam???",
            0.6,
          ],
        ];

        let random_index = alias_sampler(memeBundle.map((arr) => arr[2]))();
        let [image, title] = memeBundle[random_index];

        let embeddedMessage = new Discord.MessageEmbed()
          .setImage(image)
          .setTitle(title);

        message.channel.send(embeddedMessage);
      },
    },    
  ],
};

//https://gist.github.com/TheHans255/7a072162ec171e72f766ea954c5f11b3
function alias_sampler(inputProbabilities) {
  var probabilities, aliases;

  probabilities = inputProbabilities.map(function (p, i) {
    if (Number.isNaN(Number(p))) {
      throw new TypeError("Non-numerical value in distribution at index " + i);
    }
    return Number(p);
  });
  var probsum = inputProbabilities.reduce(function (sum, p) {
    return sum + p;
  }, 0);

  var probMultiplier = inputProbabilities.length / probsum;
  probabilities = probabilities.map(function (p, i) {
    return p * probMultiplier;
  });

  var overFull = [],
    underFull = [];
  probabilities.forEach(function (p, i) {
    if (p > 1) overFull.push(i);
    else if (p < 1) underFull.push(i);
    else if (p !== 1) {
      throw new Error(
        "User program has disrupted JavaScript defaults " +
          "and prevented this function from executing correctly."
      );
    }
  });

  aliases = [];
  while (overFull.length > 0 || underFull.length > 0) {
    if (overFull.length > 0 && underFull.length > 0) {
      aliases[underFull[0]] = overFull[0];
      probabilities[overFull[0]] += probabilities[underFull[0]] - 1;
      underFull.shift();
      if (probabilities[overFull[0]] > 1) overFull.push(overFull.shift());
      else if (probabilities[overFull[0]] < 1) underFull.push(overFull.shift());
      else overFull.shift();
    } else {
      var notEmptyArray = overFull.length > 0 ? overFull : underFull;
      notEmptyArray.forEach(function (index) {
        probabilities[index] = 1;
      });
      notEmptyArray.length = 0;
    }
  }

  return function sample() {
    var index = Math.floor(Math.random() * probabilities.length);
    return Math.random() < probabilities[index] ? index : aliases[index];
  };
}
