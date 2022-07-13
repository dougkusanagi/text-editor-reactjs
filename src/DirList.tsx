export default function DirList() {
  return (
    <div className="flex flex-col h-full min-w-[150px] w-max">
      <div className="flex">
        <button
          id="button-read-dir"
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
