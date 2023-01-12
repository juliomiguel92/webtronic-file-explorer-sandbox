import { useState } from "react";
import { FileIcon, FolderIcon, RemoveIcon, RenameIcon } from "./icons";

function Folder({
  handleInsertNode = () => { },
  handleRenameNode = () => { },
  handleDeleteNode = () => { },
  explorer }) {
  const [expand, setExpand] = useState(false);
  const [showInput, setShowInput] = useState({
    visible: false,
    isFolder: false
  });

  const [renameInput, setRenameInput] = useState(false);

  const handleNewFolder = (e, isFolder) => {
    e.stopPropagation();
    setExpand(true);
    setShowInput({
      visible: true,
      isFolder
    });
  };

  const handleRename = (e) => {
    e.stopPropagation();
    setExpand(true);
    setRenameInput(true);
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    handleDeleteNode(explorer.id);
  };

  const onAddFolder = (e) => {
    if (e.keyCode === 13 && e.target.value) {
      handleInsertNode(explorer.id, e.target.value, showInput.isFolder);
      setShowInput({ ...showInput, visible: false });
    }
  };

  const onRename = (e) => {
    if (e.keyCode === 13 && e.target.value) {
      handleRenameNode(explorer.id, e.target.value);
      setRenameInput(false);
    }
  };

  return (
    <>
      {explorer.isFolder ? (
        <div style={{ marginTop: 5 }}>
          <div onClick={() => setExpand(!expand)} className="folder">
            <span>
              <FolderIcon /> {
                !renameInput
                  ? explorer.name
                  : <input
                    type="text"
                    autoFocus
                    defaultValue={explorer.name}
                    onKeyDown={onRename}
                    onBlur={() => setRenameInput(false)}
                  />
              }
            </span>

            <div>
              <button
                className="bordered"
                onClick={(e) => handleNewFolder(e, true)}
              >
                <FolderIcon /> +
              </button>
              <button
                className="bordered"
                onClick={(e) => handleNewFolder(e, false)}
              >
                <FileIcon /> +
              </button>
              <button
                className="bordered"
                onClick={(e) => handleRename(e)}
              >
                <RenameIcon />
              </button>
              {
                explorer.id != 1
                  ? <button
                    className="bordered"
                    onClick={(e) => handleDelete(e)}
                  >
                    <RemoveIcon />
                  </button>
                  : null
              }
            </div>
          </div>

          <div style={{ display: expand ? "block" : "none", paddingLeft: 25 }}>
            {showInput.visible && (
              <div className="inputContainer">
                <span>
                  {showInput.isFolder ? <FolderIcon /> : <FileIcon />}
                </span>
                <input
                  type="text"
                  className="inputContainer__input"
                  autoFocus
                  onKeyDown={onAddFolder}
                  onBlur={() => setShowInput({ ...showInput, visible: false })}
                />
              </div>
            )}

            {explorer.items.map((exp) => {
              return (
                <Folder
                  handleInsertNode={handleInsertNode}
                  handleRenameNode={handleRenameNode}
                  handleDeleteNode={handleDeleteNode}
                  key={exp.id}
                  explorer={exp}
                />
              );
            })}
          </div>
        </div>
      ) : (
        <div className="fileContainer">
          <span className="file">
            <FileIcon />
            {
              !renameInput
                ? <span>{explorer.name}</span>
                : <input
                  type="text"
                  autoFocus
                  defaultValue={explorer.name}
                  onKeyDown={onRename}
                  onBlur={() => setRenameInput(false)}
                />
            }
          </span>
          <span>
            <button
              className="bordered"
              onClick={(e) => handleRename(e)}
            >
              <RenameIcon />
            </button>
            <button
              className="bordered"
              onClick={(e) => handleDelete(e)}
            >
              <RemoveIcon />
            </button>
          </span>
        </div>
      )}
    </>
  );
}

export default Folder;
