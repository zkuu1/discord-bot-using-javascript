import { REST, Routes, ApplicationCommandOptionType } from "discord.js";
import fs from 'fs';


const config = JSON.parse(fs.readFileSync('./config.json', 'utf8'));


const commands = [
    {
        name: 'hello',
        description: 'Hello Command'
    },
    {
        name: 'waifu',
        description: 'My Waifu'
    },
    {
        name: 'embed',
        description: 'Send a Embed'
    },
    {
        name: 'add',
        description: 'Add two numbers',
        options: [
            {
                name: 'first-number',
                description: 'First Number',
                type: ApplicationCommandOptionType.Number,
                choices: [
                    {
                        name: 'One',
                        value: 1
                    },
                    {
                        name: 'Two',
                        value: 2
                    },
                    {
                        name: 'Three',
                        value: 3
                    }
                ],
                required: true,
            },
            {
                name: 'second-number',
                description: 'Second Number',
                type: ApplicationCommandOptionType.Number,
                required: true
            },
        ],
    },
];


const rest = new REST({ version: '10' }).setToken(config.token);

(async () => {
    try {
        console.log('Registering slash commands...');

        await rest.put(
            Routes.applicationGuildCommands(config.clientId, config.guildId),
            { body: commands },
        );

        console.log('Successfully registered application commands.');
    } catch (error) {
        console.error('Error registering commands:', error);
    }
})();
