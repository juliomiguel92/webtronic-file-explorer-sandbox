import { useDispatch } from 'react-redux';
import {
  addNode as addNodeAction,
  renameNode as renameNodeAction,
  deleteNode as deleteNodeAction
} from '../redux/slices/fileSlice';

const useFile = () => {
  const dispatch = useDispatch();

  // Add a file or folder in tree
  const insertNode = function (folderId, item, isFolder) {
    dispatch(addNodeAction({ folderId, item, isFolder }));
  }; // Do it Yourself

  const deleteNode = (itemId) => {
    dispatch(deleteNodeAction({ itemId }));
  }; // Do it Yourself

  const renameNode = (itemId, item) => {
    dispatch(renameNodeAction({ itemId, item }));
  }; // Do it Yourself

  return { insertNode, deleteNode, renameNode };
};

export default useFile;
