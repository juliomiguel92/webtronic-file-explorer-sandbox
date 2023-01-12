import { useSelector } from 'react-redux';
import { selectExplorer } from './redux/slices/fileSlice';
import Folder from "./components/Folder";
import useFile from "./hooks/useFile";
import "./styles.css";

export default function App() {
  const explorerData = useSelector(selectExplorer);

  const { insertNode, renameNode, deleteNode } = useFile();

  const handleInsertNode = (folderId, item, isFolder) => {
    insertNode(folderId, item, isFolder);
  };

  const handleRenameNode = (nodeId, item) => {
    renameNode(nodeId, item);
  };

  const handleDeleteNode = (nodeId) => {
    deleteNode(nodeId);
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
