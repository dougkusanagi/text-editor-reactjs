import SideExplorer from "./SideExplorer";

function App() {
  return (
    <div className="h-screen">
      <div className="flex h-full">
        <SideExplorer></SideExplorer>

        <div className="flex flex-1">
          <textarea
            className="w-full bg-slate-700 text-slate-200 p-1"
            id="editorContent"
          ></textarea>
        </div>
      </div>
    </div>
  );
}

export default App;
