//author:daniellukonis

const canvas = document.querySelector('canvas')
const context = canvas.getContext('2d')

const panelWidth = fxrand()
const rotateStep = fxrand()
const panelHeight = fxrand() * 0.25

const panelColor = 'rgba(0,0,0,0.5)'
const panelBorder = 'rgba(255,255,255,0.25)'
const backgroundColor = 'rgb(255,255,255)'

let canvasCenter = Math.floor(canvas.width * 0.5)
let radius = canvasCenter - 10
let angle = 0

function resizeCanvas(){
  const w = window.innerWidth - 10
  const h = window.innerHeight - 10
  w>h ? x = h : x = w;
  canvas.width = x
  canvas.height = x
  canvasCenter = Math.floor(canvas.width * 0.5)
}
resizeCanvas()

function fillCanvas(){
  context.save()
  context.fillStyle = backgroundColor
  context.fillRect(0,0,canvas.width,canvas.width)
  context.restore()
}
fillCanvas()

function drawPanel(){
  context.save()
  context.lineWidth = 1
  context.strokeStyle = panelBorder
  context.fillStyle = panelColor
  context.translate(canvasCenter,canvasCenter)
  context.rotate(angle)
  context.beginPath()
  context.arc(0,0,radius * panelWidth,0,panelHeight)
  context.arc(0,0,radius,panelHeight,-panelHeight,true)
  context.arc(0,0,radius * panelWidth,-panelHeight,0)
  context.fill()
  context.stroke()
  context.restore()
}

function rotatePanel(){
  angle += rotateStep;
}

function randomRadius(){
  radius = Math.floor(fxrand()*(canvasCenter-60))+50
}

function drawScene(){
  for(let i=0; i<10000; i++){
    randomRadius()
    rotatePanel()
    drawPanel()    
  }
}
drawScene()

function loop(){
  randomRadius()
  rotatePanel()
  drawPanel()

  window.requestAnimationFrame(loop)
}
loop()

window.addEventListener("contextmenu",e => e.preventDefault())
window.addEventListener("resize", () => resizeCanvas())

window.$fxhashFeatures = {
  "Panel Width": panelWidth,
  "Panel Height": panelHeight,
  "Rotation Speed": rotateStep,
}