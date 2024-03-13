import { Toggle } from "./toggle.js";
import { takeSelectors } from "./takeSelectors.js"
import { convertNodelistInArray } from "./convertNodeListInArray.js"
import { changeClass } from "./changeClass.js"
import data from "../data/data.json" assert { type: 'json' }
const { playList, sidebar } = takeSelectors()

const { toggleSidebar } = sidebar
const { toggleListvideo } = playList
let widthWindow = window.innerWidth
const listGrammar = document.querySelector("#listGrammar")

export function App() {
  const LocalstorageSidebar = getLocalStorage("sidebar")
  const LocalstoragePlayList = getLocalStorage("playList")
  window.addEventListener("resize", updateSize)

  loadContentLevelEnglish("a1", listGrammar)
  routes(sidebar.levelEnglishSidebar.querySelectorAll("a"))

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

  widthWindow <= 1024 ? setLocalStorage("sidebar", false) : setLocalStorage("sidebar", true)
  toggleSidebar.addEventListener("click", handleSidebar)
  toggleListvideo.addEventListener("click", handlePlayList)
  toggleSidebar.addEventListener("touchstart", handleSidebar)
  toggleListvideo.addEventListener("touchstart", handlePlayList)
}

function routes(selectorRouteClick) {
  const listLevelArray = convertNodelistInArray(selectorRouteClick)
  listLevelArray.forEach(routesCLick)
}

function routesCLick(link) {
  const listGrammar = document.querySelector("#listGrammar")

  link.addEventListener("click", level => {
    listGrammar.innerHTML = ""
    const title = link.innerText.replace("\n-", "-")
    loadContentLevelEnglish(title, listGrammar)
  })
}

function loadContentLevelEnglish(title, listGrammar) {
  const [shortTitle, _] = title.split("-")
  const dataLesson = data[shortTitle.toLowerCase()]
  const titleLessons = document.querySelector("#titleLessons")
  const totalLessonGrammar = document.querySelector("#totalLessonGrammar")
  const listVocabulary = document.querySelector("#listVocabulary")
  const totalLessonVocabulary = document.querySelector("#totalLessonVocabulary")
  const listTopics = document.querySelector("#listTopics")
  const totalLessonTopics = document.querySelector("#totalLessonTopics")

  const iframeVideo = document.querySelector("#iframeVideo")
  titleLessons.innerText = title

  totalLessonGrammar.innerText = `${dataLesson.gramatica.length} aulas`
  totalLessonVocabulary.innerText = `${dataLesson.vocabulario.length} aulas`
  totalLessonTopics.innerText = `${dataLesson.topicos.length} aulas`

  dataLesson.gramatica.forEach(element => {
    const elementLi = document.createElement("li")
    const [https, _, baseUrlYoutube, embed, id] = element.embed.split("/")
    elementLi.setAttribute("class", "mb-1 p-4 rounded-lg cursor-pointer transition duration-150 ease-out hover:ease-in hover:bg-slate-900")
    elementLi.setAttribute("id", id)
    elementLi.innerText = element.title
    listGrammar.append(elementLi)
  })

  dataLesson.vocabulario.forEach(element => {
    const elementLi = document.createElement("li")
    const [https, _, baseUrlYoutube, embed, id] = element.embed.split("/")
    elementLi.setAttribute("id", id)
    elementLi.setAttribute("class", "mb-1 p-4 rounded cursor-pointer transition duration-150 ease-out hover:ease-in hover:bg-slate-800")
    elementLi.innerText = element.title
    listVocabulary.append(elementLi)
  })

  dataLesson.topicos.forEach(element => {
    const elementLi = document.createElement("li")
    const [https, _, baseUrlYoutube, embed, id] = element.embed.split("/")
    elementLi.setAttribute("id", id)
    elementLi.setAttribute("class", "mb-1 p-4 rounded cursor-pointer transition duration-150 ease-out hover:ease-in hover:bg-slate-800")
    elementLi.innerText = element.title
    listTopics.append(elementLi)
  })

  const listLessonGrammar = convertNodelistInArray(listGrammar.querySelectorAll("li"))
  let lastClick
  listLessonGrammar.forEach((element, index) => {
    element.addEventListener("click", event => {
      if (lastClick !== undefined) {
        lastClick.classList.remove("bg-slate-900")
      }
      lastClick = element
      event.target.classList.add("bg-slate-900")
      iframeVideo.src = `https://www.youtube.com/embed/${element.id}`
    })
  })
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