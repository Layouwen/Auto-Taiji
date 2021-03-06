let js_content = document.querySelector('.content')
let js_style = document.querySelector('.js_style')
let isTouchDevice = 'ontouchstart' in document.documentElement

let str = `
/* 你好，我是一名前端工程师，因这学期课程接触到了前端

学校教的很基础，主要靠自学，目前已经学习将近大半年

接触前端后发现自己深深的爱上了编程，为了实现自己的一个界面或功能

促使我发现能力和解决问题的能力

下面展示我的一个小想法，实现一个PC/PE端自适应的太极 */

@keyframes turn {
  0%{
    transform: rotate(0deg);
  }
    100% {
    transform: rotate(360deg);
  }
}

.bigCircle {
  position: relative;
  width: 400px;
  height: 400px;
  border-radius: 50%;
  box-shadow: 0 0 3px rgba(0, 0, 0, .5);
  background: linear-gradient(to right, #ffffff 0%, #ffffff 50%, #000000 50%, #000000 100%);
}

.bigCircle::before,
.bigCircle::after {
  content: '';
  position: absolute;
  left: 50%;
  width: 200px;
  height: 200px;
  border-radius: 50%;
  transform: translateX(-50%);
}

.bigCircle::before {
  top: 0;
  background: radial-gradient(ellipse at center, #000000 0%, #000000 25%, #ffffff 25%, #ffffff 100%);
}

.bigCircle::after {
  bottom: 0;
  background: radial-gradient(ellipse at center, #ffffff 0%, #ffffff 25%, #000000 25%, #000000 100%);
}

.bigCircle {
  animation: turn 2s linear infinite;
}

/* 希望这个想法对刚学习动画和CSS的你有所帮助 */
`

let contentStr = ''
let n = 0
let speed = 50
let time

let run = () => {
  time = setTimeout(() => {
    if (str[n] === '\n') {
      contentStr += '<br>'
    } else if (str[n] === ' ') {
      contentStr += '&nbsp;'
    } else {
      contentStr += str[n]
    }
    js_style.innerHTML = str.substring(0, n)
    js_content.innerHTML = contentStr
    n++;
    js_content.scrollTo(0, 99999)
    if (n < str.length) run()
    else {
      n = 0
      contentStr = ''
      js_start.innerHTML = '开始'
      js_start.id = ''
      js_start.style = 'color: #000'
    }
  }, speed)
}

let js_start = document.querySelector('.start')

const begin = dom => {
  const text = dom.innerText
  const isBegin = text === '开始'
  isBegin ? run() : clearTimeout(time)
  dom.innerHTML = isBegin ? '暂停' : '开始'
  dom.id = isBegin ? 'active' : ''
  dom.style = isBegin ? 'color: #fff' : 'color: #000'
}

const clickMap = {
  'slow': 200,
  'middling': 50,
  'quick': 0,
  'start': begin
}

const clickNames = Object.keys(clickMap)

document.querySelector('.buttons').addEventListener('click', (e) => {
  const elClassName = e.target.className
  if (!clickNames.includes(elClassName)) return (console.error("你的标签触发在，意料之外"))
  if (elClassName === 'start') return begin(e.target)
  speed = clickMap[elClassName]
})