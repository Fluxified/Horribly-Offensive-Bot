const { EmbedBuilder, ApplicationCommandOptionType } = require("discord.js");
const https = require("https");

//Functions go here :)

//Command starts here :)
module.exports = {
  name: "crash",
  description: `Crash! Start at a 1x multiplier and every time the multiplier goes up by .1 theres a chance to lose it all!`,
  devOnly: false,
  testOnly: false,
  adminOnly: false,
  deleted: false,
  options: [
    {
      name: "wager",
      description: `The amount of currency you want to wager`,
      type: ApplicationCommandOptionType.Integer,
      required: true,
    },
  ],

  //Return final message to user
  callback: async (client, interaction) => {
    await interaction.deferReply();

    //Crash Logic
    let currentMultiplier = 1; //Initial Multiplier
    let betAmmount = 0; //Initial Bet
    let isGameRunning = false;

    //Build the embed and return it to the interaction
    const embed = new EmbedBuilder()
      .setTitle(`Crash!`)
      .setThumbnail(`?`)
      .addFields({
        name: `Multiplier`,
        value: `Increment the multiplier here :)`,
      });

    interaction.editReply({ embeds: [embed] });
  },
};
