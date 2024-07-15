// src/components/EditTodo.tsx
import React, { useEffect, useState } from "react";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Button,
  Input,
  Textarea,
  Switch,
} from "@nextui-org/react";
import { AppState } from "@/App";
import {
  UpdateTodoTitle,
  UpdateTodoDescription,
  UpdateTodoCompleted,
} from "../../wailsjs/go/todo/TodoApp";


interface EditTodoProps {
  appState: AppState;
  SyncApp: () => void;
}

const EditTodo: React.FC<EditTodoProps> = ({
  appState,
  SyncApp,
}) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [_, setCategory] = useState("");
  const [isSelected, setIsSelected] = useState(false);

  const isOpen = appState.editTodo !== null;
  const onClose = () => {
    appState.editTodo = null;
    SyncApp();
  };



  useEffect(() => {
    setTitle(appState.editTodo?.title|| "");
    setDescription(appState.editTodo?.description || "");
    setCategory(appState.editTodo?.category || "");
    setIsSelected(appState.editTodo?.completed || false);
  }, [appState]);


  const handleSave = () => {
    if( appState.editTodo?.id == null) return;
    const id = appState.editTodo?.id;



    UpdateTodoTitle(id, title).then(() => {
      UpdateTodoDescription(id, description).then(() => {
        UpdateTodoCompleted(id, isSelected).then(() => {
          SyncApp();
          onClose();
        });
    
      });
    });
  };

  if (!isOpen) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="3xl">
      <ModalContent>
        <ModalHeader className="flex gap-2">Edit Todo</ModalHeader>
        <ModalBody>
          <div className="flex flex-col gap-5">
            <Switch isSelected={isSelected} onValueChange={setIsSelected}>
              Completed
            </Switch>
            <Input
              label="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <Textarea
              label="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
        </ModalBody>
        <ModalFooter>
          <Button variant="light" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSave}>Save</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default EditTodo;
