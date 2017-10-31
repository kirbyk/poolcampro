import { StitchClient } from 'mongodb-stitch';
const client = new StitchClient('poolcam-pro-nqood');
let db = client.service('mongodb', 'mongodb-atlas').db('poolcam_pro')
// let Games = db.collection('games')
let Users = db.collection('users')
let Queue = db.collection('queue')

export default db

export const getUserProfile = () => {
  if (client.authedId()) {
    let user = {}
    client.userProfile()
      .then(res => user = res.data)
      .catch(err => console.log(err))
    return user
  } else {
    return null
  }
}

export const addPlayerToQueue = (player) => {
  // player = { name, wins, losses }
  let inQueue = Queue.find({ name: player.name })

  if(inQueue) {
    console.log("Player cannot be added to the queue when they are already in queue.")
    return 0
  } else {
    Queue.insert({
      name: player.name,
      wins: player.wins,
      losses: player.losses,
      timeEntered: new Date()
    })
    .then(e => console.log(`added ${player.name} to queue.`))
    .catch(err => console.log("err", err))
    return 1
  }
}

export const removePlayerFromQueue = (player) => {
  Queue.delete({ name: player.name })
       .then(e => console.log(`removed ${player.name} from queue.`))
       .catch(err => console.log("err", err))
}

export const getPlayersInQueue = () => {
  let queue = [] 
  Queue.find()
       .then(q => {console.log(q); console.log("ffff")});
  console.log(queue)
  console.log("typeof:", typeof(queue))
  return queue
}

export const login = () => {
  console.log("logging in");
  client.authenticate("google");
}

export const logout = () => {
  console.log("logging out")
  client.logout()
    .then(() => console.log("logged out!"))
    .catch(e => console.log(e))
}

export const getPlayers = () => {
  var users = []
  Users.find()
       .then(u => console.log(u))
       .catch(e => console.log(e))
  // console.log("users", users);
  return users
}