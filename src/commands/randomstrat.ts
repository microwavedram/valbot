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

        
        const embed = new Embed()
        embed.setTitle(message[0])
        embed.setTimestamp()
        embed.setDescription(message[1])

        interaction.reply({embeds: [embed]})
    }
}

        