// import db from "../nedb/items";
import host from "../../constants/hostName";
import "../App.css";
import React, { useEffect } from "react";

export const Item = ({ item, idx, items, setItems, handleOpenModal, setUpdateModalTodoId, loggedInUserEmail, todoCategories }) => {
  const deleteItem = (e) => {
    e.preventDefault();
    // 
    // db.remove({ _id: item._id }, {}, (err, numRemoved) => {
      // if (!err) {
        // console.log("DELETED: ", item._id);
        fetch(`${host}/todos/delete-todo/${item.id}`, {
          method: 'DELETE',
          headers: {
              'Content-Type': 'application/json'
            },
      })
      .then(response => response.json())
      .then(data => {
        console.log('Success:', data);
      //   setResponseData(data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
        setItems([...items.slice(0, idx), ...items.slice(idx + 1)]);
      // }
    // });
  };

  const updateItem  = () => {
    setUpdateModalTodoId(item.id);
    console.log('item.id', item.id);
    handleOpenModal(item);
  };

  return (
    <div className="item">
      <div className="title">{item.name}</div>
      {
        todoCategories && item && item.category !== null  && item.category !== undefined && item.category >= 0 && item.category < todoCategories.length &&
        <div className="title">{[todoCategories[item.category].title]}</div>
      }
      
      <div className="date">
        {new Date(item.date).toLocaleDateString('en-In', { day: '2-digit', month: '2-digit', year: 'numeric' })}
        <button className="update" onClick={updateItem}>
          Update
        </button>
        <button className="delete" onClick={deleteItem}>
          delete
        </button>
      </div>
    </div>
  );
};