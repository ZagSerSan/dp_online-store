function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

function generateUserData() {
  return {
    // image: `https://avatars.dicebear.com/api/avataaars/${(Math.random() + 1)
    //   .toString(36)
    //   .substring(7)}.svg`,
    image: `https://xsgames.co/randomusers/assets/avatars/male/${getRandomInt(0, 78)}.jpg`
  }
}

module.exports = {
  generateUserData
}