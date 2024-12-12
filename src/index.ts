import { Client, GatewayIntentBits, TextChannel } from 'discord.js';
import 'dotenv/config'


// Create a new Discord client instance
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
  ],
});

const token = process.env.BOT_TOKEN

// Bot ready event
client.once('ready', () => {
  console.log(`Logged in as ${client.user?.tag}!`);
});

// Function to fetch the latest message in a specific channel
const fetchLatestMessage = async (channelId: string) => {
  try {
    const channel = await client.channels.fetch(channelId);

    if (!channel || !channel.isTextBased()) {
      console.log('Specified channel is not text-based or does not exist.');
      return;
    }

    const messages = await (channel as TextChannel).messages.fetch({ limit: 1 });
    const lastMessage = messages.first();

    if (lastMessage) {
      console.log(`Latest message: ${lastMessage.content}`);
    } else {
      console.log('No messages found in this channel.');
    }
  } catch (error) {
    console.error('Error fetching the latest message:', error);
  }
};

// Example usage: Replace 'YOUR_CHANNEL_ID_HERE' with a real channel ID
client.on('ready', async () => {
  // const channelId = 'YOUR_CHANNEL_ID_HERE'; // Replace this with the channel ID
  // await fetchLatestMessage(channelId);

});

client.on('messageCreate', (message) => {
  console.log(message.content)
})

// Log in to Discord
client.login(token);
