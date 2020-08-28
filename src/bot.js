require("dotenv").config()

const { Client } = require("discord.js")

const client = new Client({ partials: ["MESSAGE", "REACTION"] })
const PREFIX = "$"

client.login(process.env.DISCORDJS_BOT_TOKEN)

client.on("message", async (message) => {
  if (!message.author.bot) {
    if (message.content.startsWith(PREFIX)) {
      const [CMD_NAME, ...args] = message.content
        .trim()
        .substring(PREFIX.length)
        .split(/\s+/)
      if (CMD_NAME === "kick") {
        if (!message.member.hasPermission("KICK_MEMBERS")) {
          return message.reply("You do not have permissions to kick the user")
        }
        if (args.length === 0) return message.reply("Please provide an ID")
        const member = message.guild.members.cache.get(args[0])
        if (member) {
          member
            .kick()
            .then((member) => message.channel.send(`${member} was kicked`))
            .catch((err) => message.channel.send("I cannot kick that user"))
        } else {
          message.channel.send("That member was not found")
        }
        message.channel.send("kick the user")
      } else if (CMD_NAME === "ban") {
        if (!message.member.hasPermission("BAN_MEMBERS")) {
          return message.reply("You do not have permissions to ban the user")
        }
        if (args.length === 0) return message.reply("Please provide an ID")
        try {
          const user = await message.guild.members.ban(args[0])
          message.channel.send("User was banned successfully")
        } catch (err) {
          message.channel.send(
            "An error occured: Either I do not have permissions or user ID is not correct"
          )
        }
      }
    }
  }
})

client.on("messageReactionAdd", (reaction, user) => {
  const { name } = reaction.emoji

  const member = reaction.message.guild.members.cache.get(user.id)
  if (reaction.message.id === "748928295009124403") {
    switch (name) {
      // Frontend
      case "🍌":
        member.roles
          .add("748904831254790183")
          .then((member) => console.log(member))
          .catch((err) => console.log(err))
        break
      //  backend
      case "🟠":
        member.roles
          .add("748904831254790183")
          .then((member) => console.log(member))
          .catch((err) => console.log(err))
        break
      // design
      case "🍉":
        member.roles
          .add("748904831254790183")
          .then((member) => console.log(member))
          .catch((err) => console.log(err))
        break
    }
  }
})

client.on("ready", () => {
  console.log(`${client.user.username} has logged in`)
})
