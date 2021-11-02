import io from 'socket.io-client'

export default class SocketService {
  constructor() {
    this.subscribers = [process.env.MY_ID]
    this.io = io(process.env.MANGA_SERVER)
  }

  addSubscriber(id) {
    const subscriberExists = this.subscribers.some(user => user === id)

    if (subscriberExists) return;

    this.subscribers.push(id)
  }

  subscribe(cb) {
    this.io.on('manga', (data) => {
      this.subscribers.forEach(user => cb(user, data))
    })
  }
}