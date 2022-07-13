import { useState } from "react";

function SideExplorerItem({ id, kind, name, showFileInEditor, isActive = "" }) {
  return (
    <button
      className={isActive ? "bg-teal-800" : ""}
      data-id={id}
      data-type={kind}
      data-name={name}
      onClick={showFileInEditor}
    >
      <i className="fa-regular fa-file mr-1"></i>
      {name}
    </button>
  );
}

export default function SideExplorer({ setEditorContent }) {
  const [fileHandlerList, setFileHandlerList] = useState([]);
  const [currentFileIndex, setCurrentFileIndex] = useState(0);
  const fileOpenedInEditor = fileHandlerList[currentFileIndex];

  async function handleOpenDir() {
    const directoryContent = await getContentDir();

    setFileHandlerList(directoryContent);
  }

  async function showFileInEditor(e) {
    e.preventDefault();

    const button = e.currentTarget;
    setCurrentFileIndex(getDataId(button));
    const file = await fileOpenedInEditor.getFile();
    const fileContent = await file.text();

    setEditorContent(fileContent);
  }

  async function getContentDir() {
    const directoryHandle = await window.showDirectoryPicker();

    const entryList = [];
    for await (const entry of directoryHandle.values()) {
      entryList.push(entry);
    }

    return entryList;
  }

  const getDataId = (el) => el.dataset.id;

  const getFileHandler = (index) => fileHandlerList[index];

  return (
    <div className="flex flex-col h-full min-w-[200px] w-max">
      <div className="flex">
        <button
          onClick={handleOpenDir}
          className="w-full px-6 py-2 bg-violet-700 text-white text-center"
        >
          <i className="fa-regular fa-folder-closed"></i>
        </button>

        <button
          id="button-save"
          className="w-full px-6 py-2 bg-emerald-700 text-white text-center"
        >
          <i className="fa-regular fa-floppy-disk"></i>
        </button>
      </div>

      <div className="flex w-full h-full bg-white">
        <div
          className="flex flex-col w-full bg-slate-800 text-slate-200 items-start px-4 py-2"
          id="contentDirList"
        >
          {fileHandlerList.map((item, index) => (
            <SideExplorerItem
              key={index}
              id={index}
              name={item.name}
              kind={item.kind}
              showFileInEditor={showFileInEditor}
            ></SideExplorerItem>
          ))}
        </div>
      </div>
    </div>
  );
}
