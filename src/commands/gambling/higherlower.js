const {
  ButrtonBuilder,
  ButtonStyle,
  ApplicationCommandOptionType,
} = require("discord.js");

//Functions go here :)

//Command starts here :)
module.exports = {
  name: "higherlower",
  description: `Guess higher or lower!`,
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
    //Do checks if the user can wager

    //Set Variables
    let wager = interaction.options.getInteger("wager");
    let eval = "";

    //Get starting random number and display to user
    const randStart = Math.floor(Math.random() * 91) + 5;

    //Get the higher lower numer and don't display
    const value = Math.floor(Math.random() * 101);

    //Don't let the numbers be the same
    while (randStart == value) {
      value = Math.floor(Math.random() * 101);
    }

    //Determine if the number is higher or lower
    if (value > randStart) {
      eval = "higher";
    } else {
      eval = "lower";
    }

    //Print the game and buttons then wait for user. Add a timeout.
    targetHigherButton = new ButtonBuilder()
      .setCustomId("higher_button")
      .setLabel("Higher")
      .setStyle(ButtonStyle.Success);

    targetLowerButton = new ButtonBuilder()
      .setCustomId("lower_button")
      .setLabel("Lower")
      .setStyle(ButtonStyle.Danger);

    const row = new ActionRowBuilder().addComponents(
      targetHigherButton,
      targetLowerButton
    );

    const response = await interaction.editReply({
      content: `Wager: ${wager}\nIs the random number higher or lower than ${randStart}?`,
      components: [row],
    });

    //Ignore responses from users other than the interation owner
    const filter = (i) => i.user.id === interaction.user.id;
    //Get the response from user input

    //Check the user's response and compare to the values

    //Return the response and update player's balance

    interaction.editReply();
  },
};
