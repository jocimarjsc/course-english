import { Toggle } from "./toggle.js";
import { takeSelectors } from "./takeSelectors.js"
import { convertNodelistInArray } from "./convertNodeListInArray.js"
import { changeClass } from "./changeClass.js"
import data from "../data/a1.json" assert { type: 'json' }
const { playList, sidebar } = takeSelectors()

const { toggleSidebar } = sidebar
const { toggleListvideo } = playList
let widthWindow = window.innerWidth

export function App() {
  const LocalstorageSidebar = getLocalStorage("sidebar")
  const LocalstoragePlayList = getLocalStorage("playList")
  window.addEventListener("resize", updateSize)

  const titleLessons = document.querySelector("#titleLessons")
  const listGrammar = document.querySelector("#listGrammar")
  const totalLessonGrammar = document.querySelector("#totalLessonGrammar")
  const listVocabulary = document.querySelector("#listVocabulary")
  const totalLessonVocabulary = document.querySelector("#totalLessonVocabulary")
  const listTopics = document.querySelector("#listTopics")
  const totalLessonTopics = document.querySelector("#totalLessonTopics")

  const iframeVideo = document.querySelector("#iframeVideo")

  const listLevelArray = Array.from(sidebar.levelEnglishSidebar.querySelectorAll("a"))
  
  listLevelArray.forEach(link => {
    link.addEventListener("click", level => {
      listGrammar.innerHTML = ""
      const { a1 } = data
      const title = link.innerText.replace("\n-", "-")
      titleLessons.innerText = title

      totalLessonGrammar.innerText = `${a1.gramatica.length} aulas`
      totalLessonVocabulary.innerText = `${a1.vocabulario.length} aulas`
      totalLessonTopics.innerText = `${a1.topicos.length} aulas`

      a1.gramatica.forEach(element => {
        const elementLi = document.createElement("li")
        const [https, _, baseUrlYoutube, embed, id] = element.embed.split("/")
        elementLi.setAttribute("class", "mb-1 p-4 rounded cursor-pointer transition duration-150 ease-out hover:ease-in hover:bg-slate-800")
        elementLi.setAttribute("id", id)
        elementLi.innerText = element.title
        listGrammar.append(elementLi)
      })

      a1.vocabulario.forEach(element => {
        const elementLi = document.createElement("li")
        const [https, _, baseUrlYoutube, embed, id] = element.embed.split("/")
        elementLi.setAttribute("id", id)
        elementLi.setAttribute("class", "mb-1 p-4 rounded cursor-pointer transition duration-150 ease-out hover:ease-in hover:bg-slate-800")
        elementLi.innerText = element.title
        listVocabulary.append(elementLi)
      })

      a1.topicos.forEach(element => {
        const elementLi = document.createElement("li")
        const [https, _, baseUrlYoutube, embed, id] = element.embed.split("/")
        elementLi.setAttribute("id", id)
        elementLi.setAttribute("class", "mb-1 p-4 rounded cursor-pointer transition duration-150 ease-out hover:ease-in hover:bg-slate-800")
        elementLi.innerText = element.title
        listTopics.append(elementLi)
      })

      const listLessonGrammar = Array.from(listGrammar.querySelectorAll("li"))
      listLessonGrammar.forEach(element => {
        element.addEventListener("click", el => {
          iframeVideo.src = `https://www.youtube.com/embed/${element.id}`
          console.log(element.id)
        })
      })
    })
  })
  



  if (LocalstorageSidebar === null && widthWindow <= 1024) {
    setLocalStorage("sidebar", false)

    return
  }

  if (LocalstorageSidebar === null && widthWindow >= 1024) {
    setLocalStorage("sidebar", true)
    return
  }
  if (LocalstorageSidebar === false && widthWindow >= 1024) {
    setLocalStorage("sidebar", true)
    return
  }
  console.log(LocalstorageSidebar)

  widthWindow <= 1024 ? setLocalStorage("sidebar", false) : setLocalStorage("sidebar", true)
  toggleSidebar.addEventListener("click", handleSidebar)
  toggleListvideo.addEventListener("click", handlePlayList)
}

function setLocalStorage(type, data) {
  const Localstorage = getLocalStorage(type)

  if (type === "sidebar" && Localstorage === data) {
    localStorage.setItem(type, JSON.stringify(true))
    return
  }

  if (type === "playList" && Localstorage === data) {
    localStorage.setItem(type, JSON.stringify(true))
    return
  }

  localStorage.setItem(type, JSON.stringify(data))
  return
}

function getLocalStorage(type) {
  return JSON.parse(localStorage.getItem(type))
}

function handleSidebar(event) {
  event.preventDefault()
  setLocalStorage(sidebar.type, false)
  handleClick(sidebar)
}

function handlePlayList(event) {
  event.preventDefault()
  setLocalStorage(playList.type, false)
  handleClick(playList)
}

function handleClick(selectors) {
  const { type } = selectors

  if (type === "sidebar") {
    const {
      changeWidthSidebar,
      titleSidebar,
      toggleSidebar,
      levelEnglishSidebar,
      levelEnglishArraySidebar,
      hiddenTitleSidebar
    } = selectors

    levelEnglishArraySidebar.forEach(element => {
      Toggle(element, ["lg:block"])
    })
    Toggle(levelEnglishSidebar, ["lg:items-stretch", "lg:justify-stretch"])
    Toggle(titleSidebar, ["lg:block"])
    Toggle(changeWidthSidebar, ["lg:w-full"])
    Toggle(hiddenTitleSidebar, ["lg:pl-3"])
    return
  }

  const {
    changeWidthListVideo,
    hiddenListTitleVideo,
    titleListVideo,
    hiddenListVideo,
    toggleListvideo
  } = selectors

  const arrayHiddenListVideo = convertNodelistInArray(hiddenListVideo.classList)

  Toggle(changeWidthListVideo, ["hidden"])
  Toggle(titleListVideo, ["hidden"])
  Toggle(hiddenListTitleVideo, ["pl-3"])
  if (arrayHiddenListVideo.includes("w-full")) {
    changeClass(hiddenListVideo, "w-full", "w-16")
    return
  }

  changeClass(hiddenListVideo, "w-16", "w-full")
}

function updateSize() {
  widthWindow = window.innerWidth
  console.log(widthWindow)
}