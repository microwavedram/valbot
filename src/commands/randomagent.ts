import { Command } from "src/util/Command"
import { SlashCommandBuilder, Embed } from "@discordjs/builders"

export const cmd: Command = {
    name: "randomagent",
    description: "Send Everyone Random Agents",
    command: () => {
        return new SlashCommandBuilder()
        .setName(cmd.name)
        .setDescription(cmd.description)
    },
    execute: async (interaction) => {
        const agents = require("../../agents.json")
        const author = await interaction.guild?.members.fetch(interaction.user.id)
        const maps = require("../../maps.json")["maps"]
        let picked: string[] = []

        const map = maps[Math.floor(Math.random()*maps.length)]
        const globalembed = new Embed()
        globalembed.setTitle("Random Map")
        globalembed.setTimestamp()
        globalembed.setDescription(`
\`\`\`
${map}
\`\`\`            
`)      

        if (author?.voice) {
            const members = author?.voice.channel?.members
            members?.forEach((member) => {
                let playeragents: string[] = []
                let warning = false
                if (member.id in agents) {
                    playeragents = agents[member.id]
                } else {
                    playeragents = ["Brimstone","Jett","Sova","Phoenix","Sage"]
                    warning = true
                }

                let agent: string = playeragents[Math.floor(Math.random() * playeragents.length)]

                while (picked.includes(agent) == true) {
                    agent = playeragents[Math.floor(Math.random() * playeragents.length)]
                }


                const embed = new Embed()
                embed.setTitle("Random Agent")
                embed.setTimestamp()
                embed.setDescription(`
\`\`\`
${agent}
\`\`\`            
`)      
                if (warning) {
                    embed.setFooter({text:"WARNING: YOU ONLY HAVE DEFAULT AGENTS (TELL GOG UR AGENTS)"})
                }
                member.send({embeds: [embed]})
                console.log(`${member.user.username}#${member.user.discriminator} got ${agent}`)

                picked.push(agent)
            })
            interaction.reply({content: "Sent Direct Messages",ephemeral: false, embeds: [globalembed]})
        } else {
            interaction.reply({content: "You need to be in a voice channel", ephemeral: false})
        }
        console.log("----------------------------------------------------------------------------------------------------------------")
    }
}

        