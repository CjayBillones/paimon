# Paimon Bot

Your number one travel companion in Genshin Impact.

Paimon is a discord bot that helps Genshin Impact players plan their farming routine, calculate their DPS, or get info from wiki among other useful commands.

## Development Setup

1. Download and install [nodejs](https://nodejs.org/en/download/).
2. Clone [this repository](https://github.com/CjayBillones/paimon).
3. Create your own bot application in [discord](https://discord.com/developers/applications) so you can get your own bot token.
4. Create a `.env` file in the root folder of the project then add your own token.

```
# .env file

TOKEN = "<INSERT YOUR TOKEN HERE>"
```

5. Add your own bot to a discord server (you can make a dev server for testing your bots).
6. Run `npm install` to install node packages.
7. Run `node index.js` then check if the bot will go online in discord.

## UID Link

The `?uid` command allows you to link a discord user to a given Genshin Impact UID. This would require you to have a linked [firestore](https://firebase.google.com/docs/firestore) database and add your credentials to the env file.

### Required .env Variables

```
FIREBASE_API_KEY
FIREBASE_APP_ID
FIREBASE_PROJECT_ID
```

## Auto Swipe and Wish

The `?swipe` and `?wish` commands are special commands that're being used by our server. They require a specific Google sheet for them to become usable on your own server. However, these are not yet available for other servers to use. If anyone is interested in setting this up on your own server, please leave a Github issue.

## Google Sheets Link

Linking to google sheets requires creating a google service account that has edit access to that sheet. Follow the link below to create your own google service account.

https://cloud.google.com/iam/docs/creating-managing-service-accounts

- Note that another account hosts/stores the google sheet, (yours or other actual google accounts) not the google service account.
- After creating the service account, shared your google sheet to the service account with edit permissions.
- You need to also generate a public/private key pair for your service account, follow the link below to generate your keys.

https://cloud.google.com/iam/docs/creating-managing-service-account-keys

### Required .env Variables

```
EMAIL
KEY
SPREADSHEET_LINK
SPREADSHEET_ID
```

#### Variables Explanation

- EMAIL contains the service account email
- KEY contains the service account private_key
- SPREADSHEET_LINK contains the sheet link
- SPREADSHEET_ID contains the sheet id: https://docs.google.com/spreadsheets/d/`SPREADSHEET_ID`/edit#gid=0
