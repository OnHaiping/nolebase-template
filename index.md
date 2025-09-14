---
layout: home
sidebar: true

title: HaipingBolgs
titleTemplate: 海上生明月，天涯共此时

hero:
  name: Tenacity
  text: 天涯共此时。
  tagline: 人生不如意十之八九,可与人言无二三,这里大于二三
  actions:
    - theme: brand
      text: 开始阅读
      link: /笔记/index
    - theme: alt
      text: 我的协会网站
      link: https://openctia.site
    - theme: alt
      text: GitHub主页
      link: https://github.com/onhaiping

features:
  - details: “人总是在接近幸福时倍感幸福，在幸福进行时却患得患失。” --张爱玲
    icon: <img src="PartyPopper.png" width="40px" height="40px"/>
  - details: <p id="hitokoto">  <a href="#" id="hitokoto_text">:D 获取中...</a></p><script>  fetch('https://v1.hitokoto.cn/?c=h&c=b&c=i&c=d&c=a').then(response => response.json()).then(data => { const hitokoto = document.querySelector('#hitokoto_text') hitokoto.href = `https://hitokoto.cn/?uuid=${data.uuid}` hitokoto.innerText = data.hitokoto }).catch(console.error)</script>
    icon: <img src="Robot.webp" width="40px" height="40px"/>
  - details: “爱所有人，信任少数人，不负任何人。” --莎士比亚
    icon: <img src="Comet.png" width="40px" height="40px"/>
---

<HomePage />
