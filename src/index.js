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

client.on ('messageCreate', (message) => {

   if (message.author.bot){
        return;
   };

   if (message.content === 'hello') {
       message.reply('Hello ! Im Zkuu Nice To Meet You ^-^');
   }
});

client.login(config.token);
