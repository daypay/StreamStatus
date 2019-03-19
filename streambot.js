var Discord = require('discord.js');
var logger = require('winston');
const config = require("./config.json");

// Configure logger settings
logger.remove(logger.transports.Console);
logger.add(new logger.transports.Console, {
    colorize: true
});
logger.level = 'debug';

const client = new Discord.Client();

client.on("ready", () => {
    for (let guild of client.guilds.array()) {
        for (let member of guild.members.array()) {
            memberStatus(member)
        }
    }
});

client.on('presenceUpdate', (old, member) => {
    memberStatus(member)
})

const memberStatus = async (member) => {
    try {
        let activity = member.presence.status
        let streamRole = member.guild.roles.find(role => role.name === "STREAMING")
        console.log(activity)
        if (activity !== null && activity === 'online') {
            // Add Roles
            member.addRole(streamRole)
        } else {
            member.removeRole(streamRole)
        }
    } catch (err) {
        // Silently Fail
        console.error(err)
    }
}


client.destroy();
client.login(config.token);