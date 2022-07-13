import { useState } from "react";
import SideExplorer from "./SideExplorer";

function App() {
  const [editorContent, setEditorContent] = useState("");

  return (
    <div className="h-screen">
      <div className="flex h-full">
        <SideExplorer setEditorContent={setEditorContent}></SideExplorer>

        <div className="flex flex-1">
          <textarea
            className="w-full bg-slate-700 text-slate-200 p-1"
            defaultValue={editorContent}
            // value={editorContent}
            // onChange={() => {}}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
