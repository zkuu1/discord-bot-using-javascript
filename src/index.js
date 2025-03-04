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

// ==================== Login Bot ======================

client.on('ready', (c) => {
    console.log(`Logged in as ${c.user.tag}!`);
});

// ==================== Slash Command ======================

client.on('interactionCreate', async (interaction) => {
    if (!interaction.isChatInputCommand()) return;

    if (interaction.commandName === 'hello') {
        await interaction.reply('Hello! I\'m Zkuu ^-^');
        console.log(interaction);
    }

    if (interaction.commandName === 'waifu') {
        await interaction.reply('Encore Desu ^-^ !');
        console.log(interaction);
    }

    if (interaction.commandName === 'add') {
        const num1 = interaction.options.getNumber('first-number');
        const num2 = interaction.options.getNumber('second-number');

        if (num1 === null || num2 === null) {
            return interaction.reply('Please provide two valid numbers.');
        }

        await interaction.reply(`The sum is ${num1 + num2}`);

        console.log(num1, num2);
        console.log(interaction);
    }

    // ==================== Give EMBED ======================

    if (interaction.commandName === 'embed') {
        const embed = new EmbedBuilder()
            .setTitle('Embed Title')
            .setDescription('Embed Description')
            .setColor('Random')
            .addFields(
                { name: 'Field 1', value: 'Some Random Value', inline: true },
                { name: 'Field 2', value: 'Some Random Value', inline: true },
                { name: 'Field 3', value: 'Some Random Value', inline: true }
            );

        await interaction.reply({ embeds: [embed] });
    }
});

// ==================== Message Event Embed ======================

client.on('messageCreate', (message) => {
    if (message.content === 'embed') {
        const embed = new EmbedBuilder()
            .setTitle('Embed Title')
            .setDescription('Embed Description')
            .setColor('Random')
            .addFields(
                { name: 'Field 1', value: 'Some Random Value', inline: true },
                { name: 'Field 2', value: 'Some Random Value', inline: true },
                { name: 'Field 3', value: 'Some Random Value', inline: true }
            );

        message.reply({ embeds: [embed] });
    }
});

// ==================== Give Role ======================

client.on('interactionCreate', async (interaction) => {
    if (!interaction.isButton()) return; // Jika bukan tombol, keluar

    await interaction.deferReply({ ephemeral: true });

    const role = interaction.guild.roles.cache.get(interaction.customId);
    if (!role) {
        await interaction.editReply({
            content: 'I could not find the role',
        });
        return;
    }

    const hasRole = interaction.member.roles.cache.has(role.id);
    if (hasRole) {
        await interaction.member.roles.remove(role);
        await interaction.editReply({
            content: `Role ${role.name} removed`,
        });
    } else {
        await interaction.member.roles.add(role);
        await interaction.editReply({
            content: `Role ${role.name} added`,
        });
    }
});

// Login Bot
client.login(config.token);
