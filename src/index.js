import TG from 'telegram-bot-api'
import dotenv from 'dotenv'

dotenv.config()

const api = new TG({
  token: process.env.BOT_TOKEN
})
const mp = new TG.GetUpdateMessageProvider();

api.setMessageProvider(mp);
api.start().then(() => console.log('ready'));
api.setMyCommands({commands: [
  {
    command: '/info',
    description: 'Информация о боте'
  },
  {
    command: '/new_manga',
    description: 'Информация о новых главах манги'
  },
]}).then(() => api.getMyCommands().then(console.log)).catch(console.error)

api.on('update', ({message}) => {
  api.sendMessage({chat_id: chatId, text: message.text}).catch(console.error)
})