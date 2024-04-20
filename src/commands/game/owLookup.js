const { EmbedBuilder, ApplicationCommandOptionType } = require("discord.js");
const https = require("https");

async function get_page(url) {
  return new Promise((resolve) => {
    let data = "";

    https.get(url, (res) => {
      res.on("data", (chunk) => {
        data += chunk;
      });

      res.on("end", () => {
        resolve(data);
      });
    });
  });
}

module.exports = {
  name: "owlookup",
  description: `Replies with player's competitive rank data.`,
  devOnly: false,
  testOnly: false,
  adminOnly: false,
  deleted: true,
  options: [
    {
      name: "battle-tag-id",
      description: `Put in a player's battle tag id`,
      type: ApplicationCommandOptionType.String,
      required: true,
    },
  ],

  callback: async (client, interaction) => {
    await interaction.deferReply();
    //Get the battle-tag and substitute the '#' for '-'
    const accountId = interaction.options.get("battle-tag-id").value;
    const accountIdModified = accountId.replace("#", "-");
    const accountName = accountId.substring(0, accountId.indexOf("#"));
    //Construct the api url
    let url_string = `https://overfast-api.tekrop.fr/players/${accountIdModified}/summary`; //TwentyTwo#11407

    //Declare variables
    let priv = "";
    let tankDiv = "";
    let tankRank = "";
    let damDiv = "";
    let damRank = "";
    let supDiv = "";
    let supRank = "";
    let openDiv = "";
    let openRank = "";
    let jsonData = "";
    let playerThumbnail = "";
    let season = "";

    //Use the url_string to get a response from the api and parse the json
    let url_response = await get_page(url_string);

    //Try and parse the file
    try {
      jsonData = JSON.parse(url_response);
    } catch (error) {
      console.log(
        `An error occured while trying to parse the json data... Error: ${error}`
      );
      return;
    }
    //Check Responses: 200 Success, 404 Player Not Found, 422 Validation Error, 500 Internal Server Error, 504 Blizzard Server Error

    //Check jsonData for error
    if (Object.hasOwn(jsonData, "error")) {
      interaction.editReply(`${accountId} does not exist or is private!`);
      return;
    }

    //Assign json variables
    //Try and get privacy, avatar and season info.
    try {
      priv = "Public";
      playerThumbnail = jsonData.avatar ?? "https://i.imgur.com/uG8PF2F.png"; //This can be NULL
      season = jsonData.competitive.pc.season;
    } catch (error) {
      //console.log(`${accountId} doesn't have a profile status/avatar/season!`);
    }
    //Try and get tank division and rank
    try {
      tankDiv = jsonData.competitive.pc.tank.division;
      tankRank = jsonData.competitive.pc.tank.tier;
    } catch (error) {
      //console.log(`${accountId} doesn't have a tank rank!`);
      tankDiv = "Unranked";
      tankRank = "";
    }
    //Try and get dps division and rank
    try {
      damDiv = jsonData.competitive.pc.damage.division;
      damRank = jsonData.competitive.pc.damage.tier;
    } catch (error) {
      //console.log(`${accountId} doesn't have a damage rank!`);
      damDiv = "Unranked";
      damRank = "";
    }
    //Try and get support division and rank
    try {
      supDiv = jsonData.competitive.pc.support.division;
      supRank = jsonData.competitive.pc.support.tier;
    } catch (error) {
      //console.log(`${accountId} doesn't have a support rank!`);
      supDiv = "Unranked";
      supRank = "";
    }
    //Try and get open division and rank
    try {
      openDiv = jsonData.competitive.pc.open.division;
      openRank = jsonData.competitive.pc.open.tier;
    } catch (error) {
      //console.log(`${accountId} doesn't have an open division rank!`);
      openDiv = "Unranked";
      openRank = "";
    }

    //Build the embed and return it to the interaction
    const embed = new EmbedBuilder()
      .setTitle(`${accountName}'s Profile`)
      .setThumbnail(`${playerThumbnail}`)
      .addFields(
        {
          name: ` `,
          value: `[View Profile](https://www.overbuff.com/players/${accountIdModified})`,
        },
        {
          name: "Profile Status",
          value: `${priv}`,
        },
        {
          name: "Tank Rank",
          value: `${tankDiv} ${tankRank}`,
          inline: true,
        },
        {
          name: "Damage Rank",
          value: `${damDiv} ${damRank}`,
          inline: true,
        },
        {
          name: "Support Rank",
          value: `${supDiv} ${supRank}`,
          inline: true,
        },
        {
          name: "Open Queue Rank",
          value: `${openDiv} ${openRank}`,
          inline: true,
        }
      )
      .setColor("#0099ff")
      .setFooter({
        text: `Season ${season}`,
      })
      .setTimestamp();

    interaction.editReply({ embeds: [embed] });
  },
};
