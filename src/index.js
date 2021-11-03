import TG from 'telegram-bot-api'
import dotenv from 'dotenv'
import SocketService from './socketService.js';

dotenv.config()

const api = new TG({
  token: process.env.BOT_TOKEN
})
const mp = new TG.GetUpdateMessageProvider();
const socketService = new SocketService()

const sendUpdate = (chatId, data) => {
  let msg = '*Обновление!* \n\n'
  data.forEach(manga => {
    msg += `${manga.name}\n[${manga.chapter}](${manga.link}) \n\n`
  })
  api.sendMessage({chat_id: chatId, text: msg, parse_mode: 'Markdown'}).catch(console.error)
}

socketService.addSubscriber(process.env.MY_ID)
socketService.subscribe(sendUpdate)
api.setMessageProvider(mp);
api.start().then(() => console.log('Manga Observer bot is up'));
api.setMyCommands({commands: [
  {
    command: '/info',
    description: 'Информация о боте'
  },
  {
    command: '/subscribe',
    description: 'Подписка на выход новых глав манги. Бот будет присылать сообщение, когда выйдет новая глава'
  },
]}).catch(console.error)

api.on('update', ({message}) => {
  const chatId = message.chat.id
  const rawMessage = message.text.split(' ')
  const command = rawMessage[0]

  if (chatId.toString() !== process.env.MY_ID) {
    api.sendMessage({chat_id: chatId, text: 'Добро пожаловать!\nЭто персональный бот для уведомления о выходе новых глав манги\nВы не можете им пользоваться'}).catch(console.error)
    return
  }

  switch(command) {
    case '/info': 
      api.sendMessage({chat_id: chatId, text: 'Бот для уведомления о выходе новых глав манги'}).catch(console.error)
      break
    case '/subscribe':
      api.sendMessage({chat_id: chatId, text: 'Вы подписались на рассылку уведомлений о выходе новых глав манги'}).catch(console.error)
      socketService.addSubscriber(chatId)
      break
    default:
      api.sendMessage({chat_id: chatId, text: 'Введите команду'}).catch(console.error)
      break
  }
})

