import { useState } from "react";
import Folder from "./components/Folder";
import useFile from "./hooks/useFile";
import "./styles.css";
import explorer from "./data/folderData";

export default function App() {
  const [explorerData, setExplorerData] = useState(explorer);

  const { insertNode, renameNode, deleteNode } = useFile();

  const handleInsertNode = (folderId, item, isFolder) => {
    const finalTree = insertNode(explorerData, folderId, item, isFolder);
    setExplorerData(finalTree);
  };

  const handleRenameNode = (nodeId, item) => {
    const finalTree = renameNode(explorerData, nodeId, item);
    setExplorerData(finalTree);
  };

  const handleDeleteNode = (nodeId) => {
    const finalTree = deleteNode(explorerData, nodeId);
    setExplorerData((prevState) => {
      return { ...prevState, ...finalTree };
    });
  };

  return (
    <div className="App">
      <Folder
        handleInsertNode={handleInsertNode}
        handleRenameNode={handleRenameNode}
        handleDeleteNode={handleDeleteNode}
        explorer={explorerData}
      />
    </div>
  );
}
