import { convertNodelistInArray } from "./convertNodeListInArray.js"

export function takeSelectors() {
  const changeWidthListVideo = document.querySelector("#removeAllList")
  const hiddenListTitleVideo = document.querySelector("#removeTitleContent")
  const titleListVideo = hiddenListTitleVideo.querySelector("h2")
  const hiddenListVideo = document.querySelector("#containerList")
  const toggleListvideo = document.querySelector("#buttonList")

  const changeWidthSidebar = document.querySelector("#widthSidebar")
  const titleSidebar = widthSidebar.querySelector("h2")
  const toggleSidebar = document.querySelector("#buttonSidebar")
  const levelEnglishSidebar = document.querySelector("#listLevelEnglish")
  const levelEnglishArraySidebar = convertNodelistInArray(levelEnglishSidebar.querySelectorAll("a"))
  const hiddenTitleSidebar = widthSidebar.querySelector(".pl-3")

  return {
    playList: {
      type: "playList",
      changeWidthListVideo,
      hiddenListTitleVideo,
      titleListVideo,
      hiddenListVideo,
      toggleListvideo
    },
    sidebar: {
      type: "sidebar",
      changeWidthSidebar,
      titleSidebar,
      toggleSidebar,
      levelEnglishSidebar,
      levelEnglishArraySidebar,
      hiddenTitleSidebar
    }
  }
}