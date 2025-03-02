import { Client, IntentsBitField } from 'discord.js';
import fs from 'fs';


const config = JSON.parse(fs.readFileSync('./config.json', 'utf8'));

const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,
  ],
});

client.on('ready', (c) => {
    console.log(`Logged in as ${c.user.tag}!`);
})

client.on('interactionCreate', async (interaction) => {
    if (!interaction.isChatInputCommand()) return;

    if (interaction.commandName === 'hello') {
        await interaction.reply('Hello! im Zkuu ^-^');
    console.log(interaction);
    }

    if (interaction.commandName === 'waifu') {
        await interaction.reply('Encore Desu ^-^ !');
    console.log(interaction);
    }

    if (interaction.commandName === 'add') {
       const num1 = interaction.options.get('first-number')?.value;
       const num2 = interaction.options.get('second-number')?.value;

       interaction.reply(`The sum is ${num1 + num2}`);

       console.log(num1, num2);
    console.log(interaction);
    }

    
});

client.login(config.token);
