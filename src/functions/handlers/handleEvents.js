const fs = require('fs');

// Export
module.exports = (client) => {

    // handleEvents function
    client.handleEvents = async () => {

        const eventFolders = fs.readdirSync(`./src/events`);

        for (const folder of eventFolders) {

            // Read folder within events folder and filter files that end with ".js"
            const eventFiles = fs
                .readdirSync(`./src/events/${folder}`)
                .filter((file) => file.endsWith(".js"));

            switch (folder) {

                // Go to events folder, based on folder were in, execute proper events for folder we are in
                case "client":
                    for (const file of eventFiles) {
                        const event = require(`../../events/${folder}/${file}`); 

                            // If event is on once, tell client that on once, to execute that event
                            if (event.once)
                                client.once(event.name, (...args) => 
                                    event.execute(...args, client));

                            else 
                                client.on(event.name, (...args) => 
                                    event.execute(...args, client));
                    }
                    break;

                default:
                    break;
            }
        }
    }
}