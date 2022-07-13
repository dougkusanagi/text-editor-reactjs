import { useState } from "react";

export default function SideExplorer() {
  const [fileHandlerArray, setFileHandlerArray] = useState([]);
  const [currentFileIndex, setCurrentFileIndex] = useState(0);
  // const fileOpenedInEditor = fileHandlerArray[currentFileIndex];

  async function handleOpenDir() {
    const fileHandleList = await getContentDir();

    setFileHandlerArray(fileHandleList);

    console.log(fileHandleList);
    console.log(fileHandlerArray);

    showDirContentInList();
    activeEventListen();
  }

  async function getContentDir() {
    const directoryHandle = await window.showDirectoryPicker();

    const fileHandleList = [];
    for await (const entry of directoryHandle.values()) {
      fileHandleList.push(entry);
    }

    return fileHandleList;
  }

  async function showFileInEditor(e) {
    e.preventDefault();

    clearEditorContent();

    const button = e.currentTarget;
    setCurrentFileIndex(getDataId(button));
    const fileHandler = getFileHandler(currentFileIndex);
    const file = await fileHandler.getFile();
    const fileContent = await file.text();

    showFileContentInEditor(fileContent);
  }

  function clearEditorContent() {
    const textArea = document.querySelector("#editorContent");
    textArea.innerHTML = "";
  }

  function showFileContentInEditor(fileContent) {
    const textArea = document.querySelector("#editorContent");
    textArea.innerHTML = fileContent;
  }

  function activeEventListen() {
    document
      .querySelectorAll(".itemList")
      .forEach((item) => (item.onclick = showFileInEditor));
  }

  function showDirContentInList() {
    const contentDirList = document.getElementById("contentDirList");

    for (let i = 0; i < fileHandlerArray.length; i++) {
      let icon = '<i class="fa-regular fa-file"></i>';

      if (fileHandlerArray[i].kind === "directory") {
        icon = '<i class="fa-regular fa-folder-closed"></i>';
      }

      contentDirList.innerHTML += `<button class="itemList"
        data-id="${i}"
        data-type="${fileHandlerArray[i].kind}"
        data-name="${fileHandlerArray[i].name}">
          ${icon}
          ${fileHandlerArray[i].name}
      </button>`;
    }
  }

  const getDataId = (el) => el.dataset.id;

  const getFileHandler = (index) => fileHandlerArray[index];

  return (
    <div className="flex flex-col h-full min-w-[200px] w-max">
      <div className="flex">
        <button
          onClick={handleOpenDir}
          className="w-full px-6 py-2 bg-violet-700 text-white text-center"
        >
          <i className="fa-regular fa-folder-closed"></i>
          {/* <span>Abrir Diretório</span> */}
        </button>

        <button
          id="button-save"
          className="w-full px-6 py-2 bg-emerald-700 text-white text-center"
        >
          <i className="fa-regular fa-floppy-disk"></i>
          {/* <span>Abrir Diretório</span> */}
        </button>
      </div>

      <div className="flex w-full h-full bg-white">
        <div
          className="flex flex-col w-full bg-slate-800 text-slate-200 items-start px-4 py-2"
          id="contentDirList"
        ></div>
      </div>
    </div>
  );
}
