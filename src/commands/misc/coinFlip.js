module.exports = {
  name: "coinflip",
  description: "Flips a coin.",
  devOnly: false,
  testOnly: false,
  adminOnly: false,
  deleted: false,

  callback: async (client, interaction) => {
    await interaction.deferReply();

    const result = Math.floor(Math.random() * 1000);

    if (result <= 499) {
      interaction.editReply(`Heads (${result})`);
      return;
    } else if (result >= 501) {
      interaction.editReply(`Tails (${result})`);
      return;
    } else {
      interaction.editReply(`Side (${result})`);
      return;
    }
  },
};
