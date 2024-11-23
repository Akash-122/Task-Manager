import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import host from '../../constants/hostName';

const UpdateModal = ({ isOpen, onClose, items, setItems, todoId, loggedInUserEmail }) => {

    const [localId, setLocalId] = useState(-1);
    const [name, setName] = useState('');

    useEffect(()=> {
        let found = false;
        for (let index = 0; index < items.length; index++) {
            const element = items[index];
            if (element.id === todoId) {
                console.log('returning', index);
                setLocalId(index);
                setName(items[index].name);
                found = true;
            }
        }
        if (!found) {
            setLocalId(-1);
        }
    }, [items, todoId]);



    const handleSubmit = () => {
        const toUpdateTodo = {
            name: name
        };
        fetch(`${host}/todos/edit-todo/${todoId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(toUpdateTodo)
        })
        .then(response => response.json())
        .then(data => {
          console.log('Success:', data);
        //   setResponseData(data);
        })
        .catch(error => {
          console.error('Error:', error);
        });
    };


  return (
    <Modal className="modal"
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Example Modal"
      style={{
        overlay: {
          backgroundColor: 'white',
        },
        content:  {
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          transform: 'translate(-50%, -50%)',
          position: 'fixed',
          maxWidth: '80%',
          maxHeight: '80%',
          overflow: 'auto',
          backgroundColor: '#282c34',
          borderRadius: '8px',
          padding: '20px',
        }
      }}
      
    >
      <button onClick={onClose}>Close Modal</button>
      <input
        type="text"
        placeholder="Enter Item"
        className="inputTODO"
        onChange={(e) => {
          setName(e.target.value);
        }}
        value={name}
      />
        <button onClick={handleSubmit}>
            Submit
        </button>
    </Modal>
  );
};

export default UpdateModal;
