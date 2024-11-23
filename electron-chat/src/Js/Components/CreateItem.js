import React, { useEffect, useState } from "react";
// import db from "../nedb/items";
import "../App.css";
import host from "../../constants/hostName";

const CreateItem = ({items, setItems, loggedInUserEmail, todoCategories}) => {
  // const items =  [];
  const [item, setItem] = useState("");
  const [localCategories, setLocalCategories] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState(0);
  const [date, setDate] = useState(new Date());

  useEffect(()=> {
    setLocalCategories(todoCategories);
  }, [todoCategories]);

  const saveItemToDB = (e) => {
    e.preventDefault();
    let doc = {
      name:item,
      dateAdded: String(
        new Date().getDate() +
          "/" +
          (new Date().getMonth() + 1) +
          "/" +
          new Date().getFullYear(),
      ),
      user: loggedInUserEmail,
      date: date,
      category: selectedCategoryId
    };
    fetch(`${host}/todos/add-todo`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(doc)
    })
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data);
    //   setResponseData(data);
    })
    .catch(error => {
      console.error('Error:', error);
    });

    // db.insert(doc, (err, newDoc) => {
      // if (!err) {
        console.info("Item Added");
        setItems([...items, doc]);
        setItem("");
      // }
    // });
  };
  return (
    <div className="formContainer">
      <input
        type="text"
        placeholder="Enter Item"
        className="inputTODO"
        onChange={(e) => {
          setItem(e.target.value);
        }}
        value={item}
      />
      <select title="Select category"
        value={selectedCategoryId}
        onChange={e => setSelectedCategoryId(e.target.value)}
        style={{backgroundColor: '#282c34', color: 'white'}}
      >
        {localCategories.map((category, index) => (
          <option key={index} title={category.title} value={category.id}>{category.title}</option>
        ))}
      </select>
      <input className="date" type="date" value={date} onChange={(e) => setDate(new Date(e.target.value))} style={{backgroundColor: '#282c34', color: 'white'}}/>
      <button className="addItem" onClick={saveItemToDB}>
        Add Item
      </button>

    </div>
  );
};

export default CreateItem;