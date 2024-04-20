const { EmbedBuilder, ApplicationCommandOptionType } = require("discord.js");

module.exports = {
  name: "poe",
  description: "Replies with helpful links for Path of Exile.",
  devOnly: false,
  testOnly: false,
  adminOnly: false,
  deleted: false,
  options: [
    {
      name: "type",
      description: "Choose Profiles or Links",
      type: ApplicationCommandOptionType.String,
      choices: [
        {
          name: "links",
          value: "links",
        },
        {
          name: "profiles",
          value: "profiles",
        },
      ],
    },
  ],

  callback: (client, interaction) => {
    //Get the option from the arguments
    const option = interaction.options.getString("type");

    if (option === "links") {
      const embed = new EmbedBuilder()
        .setTitle("Path of Exile Helpful Links")
        .setDescription("Here are some useful links related to Path of Exile:")
        .addFields(
          {
            name: "Official Website",
            value: "[Path of Exile](https://www.pathofexile.com/)",
          },
          {
            name: "Official Trade",
            value: "[Trade](https://www.pathofexile.com/trade)",
          },
          {
            name: "Path of Regex",
            value: "[Regex Generator](https://poe.re/#/maps)",
          },
          {
            name: "POE Lab Notes",
            value: "[Lab Notes](https://www.poelab.com/)",
          },
          {
            name: "Loot Filter",
            value: "[FilterBlade](https://www.filterblade.xyz/)",
          },
          {
            name: "POE Ninja",
            value: "[Prices and Builds](https://poe.ninja/)",
          },
          {
            name: "Craft of Exile",
            value: "[Simulate Crafting](https://www.craftofexile.com/)",
          },
          {
            name: "Awakened POE Trade",
            value:
              "[Price Checker](https://github.com/SnosMe/awakened-poe-trade)",
          },
          {
            name: "Vorici Chromatic Calculator",
            value:
              "[Chromatic Calculator](https://siveran.github.io/calc.html)",
          },
          {
            name: "Timeless Jewel Calculator",
            value:
              "[Timeless Jewel](https://vilsol.github.io/timeless-jewels/)",
          },
          {
            name: "Path of Building (Community Fork)",
            value: "[Build Planner](https://pathofbuilding.community/)",
          }
        )
        .setColor("#0099ff");

      interaction.reply({ embeds: [embed] });
      return;
    } else if (option === "profiles") {
      const embed = new EmbedBuilder()
        .setTitle("Path of Exile Profile Links")
        .setDescription("Here are some profiles from users in this discord:")
        .addFields(
          {
            name: "Arrgh",
            value:
              "https://www.pathofexile.com/account/view-profile/skills697/characters",
          },
          {
            name: "BigBird",
            value:
              "https://www.pathofexile.com/account/view-profile/callmebigbird/characters",
          },
          {
            name: "Crayons",
            value:
              "https://www.pathofexile.com/account/view-profile/Assailance/characters",
          },
          {
            name: "Fendy",
            value:
              "https://www.pathofexile.com/account/view-profile/offendour/characters",
          },
          {
            name: "Flux",
            value:
              "https://www.pathofexile.com/account/view-profile/Fluxified/characters",
          },
          {
            name: "Mowk",
            value:
              "https://www.pathofexile.com/account/view-profile/mowkmeister/characters",
          },
          {
            name: "Seaweed",
            value:
              "https://www.pathofexile.com/account/view-profile/Seaweed1107/characters",
          },
          {
            name: "Slynk",
            value:
              "https://www.pathofexile.com/account/view-profile/Slynk_Dkron/characters",
          }
        )
        .setColor("#0099ff");

      interaction.reply({ embeds: [embed] });
      return;
    } else {
      interaction.reply("An error occurred...");
    }
  },
};
