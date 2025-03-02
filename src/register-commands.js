import { REST, Routes } from "discord.js";
import fs from 'fs';

const config = JSON.parse(fs.readFileSync('./config.json', 'utf8'));
const commands = [
{
    name: 'hello',
    description: 'Hello Command'
},
];

const rest = new REST({ version: '10' }).setToken(config.token);

 (async () => {
    try {

        console.log('registering slash commands...');

        await rest.put(
            Routes.applicationGuildCommands(config.clientId, config.guildId),
            { body: commands },
        );

        console.log('Successfully registered application commands.');

    } catch (error) {
        console.error(error);
    }
 }) ();