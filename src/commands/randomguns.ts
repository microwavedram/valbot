import { Command } from "src/util/Command"
import { SlashCommandBuilder, Embed } from "@discordjs/builders"
import { GuildMember } from "discord.js"

export const cmd: Command = {
    name: "randomguns",
    description: "Send Everyone Random Guns",
    command: () => {
        return new SlashCommandBuilder()
        .setName(cmd.name)
        .setDescription(cmd.description)
    },
    execute: async (interaction) => {
        const guns = require("../../guns.json")["guns"]
        const shields = require("../../shields.json")["shields"]
        const author = await interaction.guild?.members.fetch(interaction.user.id)


        if (author?.voice) {
            const members = author.voice.channel?.members

            

            members?.forEach((member: GuildMember) => {
                const gun = guns[Math.floor(Math.random() * guns.length)]
                const shield = shields[Math.floor(Math.random() * shields.length)]
                const embed = new Embed()
                embed.setTitle("Random Gun")
                embed.setDescription(`
\`\`\`
${gun}
Shield Amount: ${shield}
\`\`\`            
`)

                member.send({embeds: [embed]})
                console.log(`${member.user.username}#${member.user.discriminator} got ${gun} shield: ${shield}`)
            })
        } else {
            interaction.reply({content: "You need to be in a voice channel", ephemeral: false})
        }

        interaction.reply({content: "Sent Direct Messages",ephemeral: false})
        console.log("----------------------------------------------------------------------------------------------------------------")
    }
}

        