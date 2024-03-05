import { Toggle } from "./toggle.js";
import { takeSelectors } from "./takeSelectors.js"
import { convertNodelistInArray } from "./convertNodeListInArray.js"
import { changeClass } from "./changeClass.js"
const { playList, sidebar } = takeSelectors()

const { toggleSidebar } = sidebar
const { toggleListvideo } = playList
let widthWindow = window.innerWidth

export function App() {
  const LocalstorageSidebar = getLocalStorage("sidebar")
  const LocalstoragePlayList = getLocalStorage("playList")
  window.addEventListener("resize", updateSize)
  
  
  if(LocalstorageSidebar === null && widthWindow <= 1024) {
    setLocalStorage("sidebar", false)
    
    return
  }
  
  if(LocalstorageSidebar === null && widthWindow >= 1024) {
    setLocalStorage("sidebar", true)
    return
  }
  if(LocalstorageSidebar === false && widthWindow >= 1024) {
    setLocalStorage("sidebar", true)
    return
  }
  console.log(LocalstorageSidebar)
  
  widthWindow <= 1024 ? setLocalStorage("sidebar",false) : setLocalStorage("sidebar",true)
  toggleSidebar.addEventListener("click", handleSidebar)
  toggleListvideo.addEventListener("click", handlePlayList)
}

function setLocalStorage(type, data) {
  const Localstorage = getLocalStorage(type)

  if(type === "sidebar"  && Localstorage === data) {
    localStorage.setItem(type, JSON.stringify(true))
    return
  }

  if(type === "playList"  && Localstorage === data) {
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