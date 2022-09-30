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
            .addChoice("pearl","pearl")
            .addChoice("icebox","icebox")
            .addChoice("ascent","ascent")
            .addChoice("breeze","breeze")
            .addChoice("fracture","fracture")
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

        let map: string | null = interaction.options.getString("map") || ""
        let team: string | null = interaction.options.getString("team") || ""

        let pool: any[] = [];


        for (let i = 0; i < strats["common"].length; i++) {
            const element = strats["common"][i];
            
            if (element["team"] != "any" && element["team"] != team) continue

            pool.push(element)
        }

        if (map in strats) {
            for (let index = 0; index < strats[map].length; index++) {
                const element = strats[map][index];
                
                if (element["team"] != "any" && element["team"] != team) continue

                pool.push(element)
            }
        }

        const choice = randomFromArray(pool)

        const embed = new Embed()
        embed.setTitle(choice["title"])
        embed.setTimestamp()
        embed.setDescription(choice["description"])

        interaction.reply({embeds: [embed]})
    }
}

        