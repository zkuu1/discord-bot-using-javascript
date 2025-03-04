import { Client, IntentsBitField, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } from 'discord.js';
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

const roles = [
    { id: '968682636983799839', label: 'Sepuh' },
    { id: '968682314936766534', label: 'Loli hunter' },
    { id: '968682550040080454', label: 'Psatir' },
];

client.on('ready', async (c) => {
    try {
        console.log(`Logged in as ${c.user.tag}!`);

        const channel = client.channels.cache.get('962953897553592334');
        if (!channel) return console.log('Channel not found!');

        const row = new ActionRowBuilder().addComponents(
            ...roles.map(role =>
                new ButtonBuilder()
                    .setCustomId(role.id)
                    .setLabel(role.label)
                    .setStyle(ButtonStyle.Primary)
            )
        );

        await channel.send({
            content: 'Claim or REMOVE your roles',
            components: [row],
        });

    } catch (error) {
        console.log(error);
    }
});

client.login(config.token);
