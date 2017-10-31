import { StitchClient } from 'mongodb-stitch';
const client = new StitchClient('poolcam-pro-nqood');

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