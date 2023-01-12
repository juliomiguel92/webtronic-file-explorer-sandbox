import { createSlice } from '@reduxjs/toolkit';
import explorerData from '../../data/folderData';

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

const treeIterator = (node, id, action, parent = false) => {
    const { items } = node;
    if (!parent && node.id === id || parent && items.some(item => item.id === id)) {
        action(node);
    } else {
        node.items?.forEach((item) => treeIterator(item, id, action, parent))
    }
}

export const fileSlice = createSlice({
    name: 'file',
    initialState: { ...explorerData },
    reducers: {
        addNode: (state, action) => {
            const { payload } = action;
            const { folderId, item, isFolder } = payload;
            const add = (node) => {
                const { items } = node;
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

                node.items = [...folders, ...files];
            };

            treeIterator(state, folderId, add);
        },
        renameNode: (state, action) => {
            const { payload } = action;
            const { itemId, item } = payload;
            const rename = (node) => {
                node.name = item;
            }

            treeIterator(state, itemId, rename);
        },
        deleteNode: (state, action) => {
            const { payload } = action;
            const { itemId } = payload;
            const del = (node) => {
                const nodeIndex = node.items.findIndex((item) => item.id == itemId);
                node.items.splice(nodeIndex, 1);
            }

            treeIterator(state, itemId, del, true);
        },
    },
})

export const { addNode, renameNode, deleteNode } = fileSlice.actions

export const selectExplorer = (state) => state;

export default fileSlice.reducer