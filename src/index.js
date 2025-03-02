import { Client, IntentsBitField, EmbedBuilder } from 'discord.js';
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

    if (interaction.commandName === 'embed') {
        const embed = new EmbedBuilder()
        .setTitle('Embed Title')
        .setDescription('Embed Description')
        .setColor('Random')
        .addFields({
            name: 'Field 1', 
            value: 'Some Random Value' , 
            inline: true},
        {
            name: 'Field 2', 
            value: 'Some Random Value' , 
            inline: true},
        {
            name: 'Field 3', 
            value: 'Some Random Value' , 
            inline: true},
        {

        })

        interaction.reply({ embeds: [embed] });
    }
});

client.on('messageCreate', (message) => {
    if (message.content === 'embed') {
        const embed = new EmbedBuilder()
        .setTitle('Embed Title')
        .setDescription('Embed Description')
        .setColor('Random')
        .addFields({
            name: 'Field 1', 
            value: 'Some Random Value' , 
            inline: true},
        {
            name: 'Field 2', 
            value: 'Some Random Value' , 
            inline: true},
        {
            name: 'Field 3', 
            value: 'Some Random Value' , 
            inline: true},
        {
        });

        message.reply({ embeds: [embed] });
    }
});

client.login(config.token);
