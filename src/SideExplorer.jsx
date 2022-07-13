import { useState } from "react";

export default function SideExplorer() {
  const [fileHandlerArray, setFileHandlerArray] = useState([]);
  const [currentFileSelected, setCurrentFileSelected] = useState(0);

  async function handleOpenDir() {
    setFileHandlerArray([]);
    setCurrentFileSelected(0);

    await getContentDir();

    showDirContentInList(fileHandlerArray);
    activeEventListen();
  }

  async function getContentDir() {
    const directoryHandle = await window.showDirectoryPicker();

    for await (const entry of directoryHandle.values()) {
      fileHandlerArray.push(entry);
    }
  }

  async function showFileInEditor(e) {
    e.preventDefault();

    clearEditorContent();

    const button = e.currentTarget;
    setCurrentFileSelected(getDataId(button));
    const fileHandler = await getFileHandler(currentFileSelected);
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

    console.log(textArea.innerHTML);
  }

  function activeEventListen() {
    document
      .querySelectorAll(".itemList")
      .forEach((item) => (item.onclick = showFileInEditor));
  }

  function showDirContentInList(fileHandlerArray) {
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
