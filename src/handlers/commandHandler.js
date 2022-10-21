const { REST, Routes } = require('discord.js');
const fs = require('fs');

// Export
module.exports = (client) => {

    // Handle commands functions
    client.handleCommands = async () => {

        const commandFolders = fs.readdirSync(`./src/commands`);

        for (const folder of commandFolders) {

            // Read folder within commands folder and filter files that end with ".js"
            const commandFiles = fs
                .readdirSync(`./src/commands/${folder}`)
                .filter((file) => file.endsWith(".js"));

            const {commands, commandArray} = client;

                for (const file of commandFiles) {

                    const command = require(`../../commands/${folder}/${file}`);

                    commands.set(command.data.name, command);

                    commandArray.push(command.data.toJSON());
                    
                    console.log(`Command: ${command.data.name} has passed through handler`);
                }
        }

        // Client ID and REST
        const clientId = '1032555150348406824';
        const rest = new REST ({ version: '10' }).setToken(process.env.token);
            try {
                console.log('Started refreshing application (/) commands');

                await rest.put(Routes.applicationCommands(clientId), { body: client.commandArray });

                console.log('Successfully reloaded application (/) commands');
            } catch (error) {
                console.error(error);
            }
    };
};