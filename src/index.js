import TG from 'telegram-bot-api'

const api = new TG({
  token: '2074302246:AAEgP3iVSbtHhx0syX4q-XvMAujWb2llSoQ'
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