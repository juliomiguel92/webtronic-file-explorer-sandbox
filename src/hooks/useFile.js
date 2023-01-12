import { ACTIONS } from "../utils/constants";

const orderByName = (items) => {
  items.sort((a, b) => {
    if (a.name < b.name) {
      return -1;
    } else if (a.edad > b.edad) {
      return 1;
    } else {
      return 0;
    }
  })
}

const findNodeById = (node, id, parent = false) => {
  let nodeFounded = {};

  const treeIterator = (node, id, parent) => {
    const { items } = node;
    if (!parent && node.id === id || parent && items.some(item => item.id === id)) {
      nodeFounded = node;
    } else {
      node.items?.forEach((item) => treeIterator(item, id, parent))
    }
  }

  treeIterator(node, id, parent)

  return nodeFounded;
};

const mutateNodeById = (action, treeNode, searchId, name = null, isFolder = null) => {
  if (treeNode.id == searchId) {
    if (ACTIONS.ADD === action) {
      const { items } = treeNode;
      let folders = items.filter(({ isFolder }) => isFolder);
      let files = items.filter(({ isFolder }) => !isFolder);

      if (isFolder) {
        folders.push({
          id: Math.random(),
          name,
          isFolder,
          items: []
        })

        orderByName(folders)
      } else {
        files.push({
          id: Math.random(),
          name,
          isFolder,
          items: []
        })

        orderByName(files)
      }

      treeNode.items = [...folders, ...files];
    } else if (ACTIONS.RENAME === action) {
      treeNode.name = name;
    } else if (ACTIONS.DELETE === action) {
      treeNode = {}
    }
  }
  else {
    treeNode.items?.forEach((item) => {
      mutateNodeById(action, item, searchId, name, isFolder)
    })
  }
};

const useFile = () => {
  // Add a file or folder in tree
  const insertNode = function (tree, folderId, item, isFolder) {
    const parentNode = findNodeById(tree, folderId);

    const { items } = parentNode;
    let folders = items.filter(({ isFolder }) => isFolder);
    let files = items.filter(({ isFolder }) => !isFolder);

    if (isFolder) {
      folders.push({
        id: Math.random(),
        name: item,
        isFolder,
        items: []
      })

      orderByName(folders)
    } else {
      files.push({
        id: Math.random(),
        name: item,
        isFolder,
        items: []
      })

      orderByName(files)
    }

    parentNode.items = [...folders, ...files];

    return tree;

  }; // Do it Yourself

  const deleteNode = (tree, itemId) => {
    if (tree.id == itemId) {
      console.log(tree.id == itemId);
      alert("A")
    } else {
      const parentNode = findNodeById(tree, itemId, true);
      const nodeIndex = parentNode.items.findIndex((item) => item.id == itemId);
      parentNode.items.splice(nodeIndex, 1);
    }

    return tree;
  }; // Do it Yourself

  const renameNode = (tree, itemId, item) => {
    const node = findNodeById(tree, itemId);
    node.name = item;

    return tree;
  }; // Do it Yourself

  return { insertNode, deleteNode, renameNode };
};

export default useFile;
