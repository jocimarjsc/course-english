import { Toggle } from "./toggle.js";
import { takeSelectors } from "./takeSelectors.js"
import { convertNodelistInArray } from "./convertNodeListInArray.js"
import { changeClass } from "./changeClass.js"
const { playList, sidebar } = takeSelectors()

const { toggleSidebar } = sidebar
const { toggleListvideo } = playList
let fullNamesLevelEnglish = []

export function App() {
  const LocalstorageSidebar = getLocalStorage("sidebar")
  const LocalstoragePlayList = getLocalStorage("playList")

  !LocalstorageSidebar ? setLocalStorage("sidebar", true) : null
  !LocalstoragePlayList ? setLocalStorage("playList", true) : null

  toggleSidebar.addEventListener("click", handleSidebar)
  toggleListvideo.addEventListener("click", handlePlayList)
}

function setLocalStorage(type, value) {
  const Localstorage = getLocalStorage(type)

  if (!!Localstorage) {
    localStorage.setItem(type, JSON.stringify(value === undefined ? false : value))
    return
  }

  if(type === "sidebar"  && Localstorage === false) {
    console.log("storage false")
    localStorage.setItem(type, JSON.stringify(true))
    return
  }

  console.log("storage true")
  localStorage.setItem(type, JSON.stringify(false))

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
  setLocalStorage(playList.type)
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

    fullNamesLevelEnglish.length !== 0 ? null : levelEnglishArraySidebar.forEach(e => fullNamesLevelEnglish.push(e.innerText))

    const changeWidthSidebarArray = convertNodelistInArray(changeWidthSidebar.classList)

    Toggle(titleSidebar, ["hidden"])
    Toggle(hiddenTitleSidebar, ["pl-3"])
    Toggle(levelEnglishSidebar, ["items-center", "justify-center"])

    if (changeWidthSidebarArray.includes("w-full")) {
      changeClass(changeWidthSidebar, "w-full", "w-16")

      levelEnglishArraySidebar.forEach((level, index) => {
        const [sigla, _] = level.innerText.split("-")
        levelEnglishArraySidebar[index].innerText = sigla
      })
      return
    }

    changeClass(changeWidthSidebar, "w-16", "w-full")
    fullNamesLevelEnglish.forEach((level, index) => {
      levelEnglishArraySidebar[index].innerText = level
    })
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