require('dotenv').config();

const { token } = process.env;
const { Client, Collection, GatewayIntentBits } = require('discord.js');
const fs = require('fs');

const client = new Client({ intents: GatewayIntentBits.Guilds });
client.commands = new Collection();
client.commandArray = [];

// Function Files
const functionFolders = fs.readdirSync(`./src/handlers`);

for (const folder of functionFolders) {

    const functionFiles = fs
        .readdirSync(`./src/handlers`)
        .filter(file => file.endsWith('.js'));
        
    for (const file of functionFiles) 
        require(`./handlers/${file}`)(client);
}

// Initialize functions
client.handleEvents();
client.handleCommands();
client.login(token);