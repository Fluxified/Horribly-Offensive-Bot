module.exports = {
  name: "ping",
  description: "Replies with the Client and Websocket ping.",
  devOnly: false,
  testOnly: false,
  adminOnly: false,
  deleted: false,

  callback: async (client, interaction) => {
    await interaction.deferReply();

    const reply = await interaction.fetchReply();

    const ping = reply.createdTimestamp - interaction.createdTimestamp;

    interaction.editReply(`Client: ${ping}ms | Websocket: ${client.ws.ping}ms`);
  },
};
