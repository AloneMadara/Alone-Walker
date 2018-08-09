const bot = new (require('discord.js')).Client()
const ytdl = require('ytdl-core')

const num = parseInt(process.env.NUM) - 1

const bots = [
    {
        'channel': '469095281535877130',
        'stream': 'youtube.com/watch?v=sKIbH-gXmX0',
    },
    {
        'channel': '477108380067037208',
        'stream': 'youtube.com/watch?v=GVC5adzPpiE'
    },
    {
        'channel': '477108390414385156',
        'stream': 'youtube.com/watch?v=j99wM1_eXPs'
    },
    {
        'channel': '477115603308511232',
        'stream': 'youtube.com/watch?v=Wxu9yDI7a6k'
    },
    {
        'channel': '477115614549508106',
        'stream': 'youtube.com/watch?v=86jRi9goYLQ'
    }
]

const play = conn => {
    const stream = ytdl(bots[num].stream)
    const dispatcher = conn.playStream(stream)

    dispatcher.on('end', () => play(conn))
    dispatcher.on('error', () => play(conn))
}

bot.on('ready', () => {
  const channel = bot.channels.get(bots[num].channel)
  
  channel.join().then(play)

  console.log(`auth as ${bot.user.tag}`)
})

bot.login(process.env.TOKEN).catch(console.error)