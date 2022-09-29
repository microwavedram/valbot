import { Command } from "src/util/Command"
import { SlashCommandBuilder, Embed } from "@discordjs/builders"
import { GuildMember } from "discord.js"

function randomFromArray(array: Array<any>): any {
    return array[Math.floor(Math.random()*array.length)]
}

export const cmd: Command = {
    name: "randomstrat",
    description: "Create a randoms strat",
    command: () => {
        return new SlashCommandBuilder()
        .setName(cmd.name)
        .setDescription(cmd.description)
        .addStringOption(option => option.setName("map")
            .addChoice("bind","bind")
            .addChoice("haven","haven")
            .addChoice("split","split")
            .addChoice("ascent","ascent")
            .setDescription("The map for the strat")
            .setRequired(true)
        )
        .addStringOption(option => option.setName("team")
            .addChoice("attackers","a")
            .addChoice("defenders","d")
            .setDescription("The team for the strat")
            .setRequired(true)
        )
    },
    execute: async (interaction) => {
        const strats = require("../../strats.json")

        let message = "";

        switch (`${interaction.options.getString("map")}:${interaction.options.getString("team")}`) {
            case "bind:a":
                message = randomFromArray(strats["bindStratsAttackers"])
                break;
            case "bind:d":
                message = randomFromArray(strats["bindStratsDefenders"])
                break;
            case "haven:a":
                message = randomFromArray(strats["havenStratsAttackers"])
                break;
            case "haven:d":
                message = randomFromArray(strats["havenStratsDefenders"])
                break;
            case "split:a":
                message = randomFromArray(strats["splitStratsAttackers"])
                break;
            case "split:d":
                message = randomFromArray(strats["splitStratsDefenders"])
                break;
            case "ascent:a":
                message = randomFromArray(strats["ascentStratsAttackers"])
                break;
            case "ascent:d":
                message = randomFromArray(strats["ascentStratsDefenders"])
                break;
                
            default:
                interaction.reply("Failed to locate resource")
                return;
        }
        const embed = new Embed()
        embed.setTitle(message[0])
        embed.setTimestamp()
        embed.setDescription(message[1])

        interaction.reply({embeds: [embed]})
    }
}

        