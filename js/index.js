const canvas = document.getElementById("maze-map");
const ctx = canvas.getContext("2d");
canvas.width = 1024
canvas.height = 654

const image = new Image()
image.src = './assets/imgs/Map_Test.png'

const playerImage = new Image()
playerImage.src = './assets/imgs/Character-down.png'

image.onload = () => {
    ctx.drawImage(image, 0, 0)
    ctx.drawImage(playerImage,
        0,
        0,
        playerImage.width / 4,
        playerImage.height,
        92,
        605,
        playerImage.width / 4,
        playerImage.height)
}
