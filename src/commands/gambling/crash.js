const { EmbedBuilder, ApplicationCommandOptionType } = require("discord.js");

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

  callback: async (client, interaction) => {
    await interaction.deferReply();

    //Do checks for if the user can play :)

    //Set variables
    let currentMultiplier = 1; //Initial Multiplier
    let returnedMultiplier = 0; //The returned multiplier from the while loop
    let crashedMultiplier = 0; //Get the multiplier when the crash occured
    let potentialMultiplier = 0; //The potential multiplier
    let betAmmount = 0; //Initial Bet
    let isGameRunning = true; //Check if game is running
    const crashChance = 10; //Chance to crash the multiplier >:D
    let adjuster = 0.1;

    //Every time the multiplier goes up by 1% then the adjuster goes up too. So while at 1x add .1 while at 2x add .2 while at 3x add .3
    while ((isGameRunning = true)) {
      //Track the loops
      let counter = ++counter || 0;

      //Calculate random crash :)
      let crash = Math.floor(Math.random() * 10);
      if (crash == 0) {
        returnedMultiplier = 0;
        crashedMultiplier = currentMultiplier;
        break;
      }

      //Adjust the adjuster every
      if (counter % 5 == 0) {
        adjuster += adjuster;
      }

      //Iterate the multiplier value
      currentMultiplier += adjuster;
    }

    //Set the potential multiplier
    potentialMultiplier = currentMultiplier;

    //Build the embed and return it to the interaction
    const embed = new EmbedBuilder()
      .setTitle(`Crash!`)
      .setThumbnail(`?`)
      .addFields({
        name: `Multiplier`,
        value: `Increment the multiplier here :)`,
      });

    //Change embed reply per the results of the game

    interaction.editReply({ embeds: [embed] });
  },
};
