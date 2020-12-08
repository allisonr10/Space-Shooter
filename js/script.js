const suaNave = document.querySelector('.player-shooter')
const areaJogo = document.querySelector('#main-play-area')

//movimento e tiros
function vooNave(evento) {
  if (evento.key === 'ArrowUp') {
    evento.preventDefault()
    subir()
  } else if (evento.key === 'ArrowDown') {
    evento.preventDefault()
    descer()
  } else if (evento.key === " ") {
    evento.preventDefault()
    atirar()
  }
}

//função para subir

function subir() {
  let topPosition = getComputedStyle(suaNave).getPropertyValue('top')
  if (topPosition === '0px') {
    return
  } else {
    let posicao = parseInt(topPosition)
    posicao -= 25
    suaNave.style.top = `${posicao}px`
  }
}

//função para descer

function descer() {
  let topPosition = getComputedStyle(suaNave).getPropertyValue('top')
  if (topPosition === '550px') {
    return
  } else {
    let posicao = parseInt(topPosition)
    posicao += 25
    suaNave.style.top = `${posicao}px`
  }
}

//tiros
function atirar() {
  let laser = criarLaser()
  areaJogo.appendChild(laser)
  movimentoLaser(laser)
}

function criarLaser() {
  let posicaoX = parseInt(window.getComputedStyle(suaNave).getPropertyValue('left'))
  let posicaoY = parseInt(window.getComputedStyle(suaNave).getPropertyValue('top'))
  let novoLaser = document.createElement('img')
  novoLaser.src = '../img/shoot.png'
  novoLaser.classList.add('laser')
  novoLaser.style.left = `${posicaoX}px`
  novoLaser.style.top = `${posicaoY - 10}px`
  return novoLaser
}

function movimentoLaser(laser) {
  let intervaloLaser = setInterval(() => {
    //pegar posição do laser
    let posicaoX = parseInt(laser.style.left)
    //ver onde está a posição do tiro
    if (posicaoX === 340) {
      laser.remove()
    } else {
      laser.style.left = `${posicaoX + 8}px`
    }
  }, 10)
}


window.addEventListener('keydown', vooNave)