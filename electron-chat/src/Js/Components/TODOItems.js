import React, { useEffect, useState } from "react";
import "../App.css";
import { Item } from "./Item";
import host from "../../constants/hostName";

const TODOItems = ({
  items,
  setItems,
  handleOpenModal,
  setUpdateModalTodoId,
  loggedInUserEmail,
  todoCategories,
}) => {
  const [localCategories, setLocalCategories] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState(-1);
  const [sortingOption, setSortingOption] = useState(null);

  const handleSortingOptionChange = (event) => {
    setSortingOption(event.target.value);
  };

  useEffect(() => {
    setLocalCategories(todoCategories);
  }, [todoCategories]);

  useEffect(() => {
    if (sortingOption && loggedInUserEmail) {
      let url = "";
      if (sortingOption === "name") {
        url = `${host}/todos/sorted-todo-on-name?user=${loggedInUserEmail}`;
        if (
          selectedCategoryId >= 0 &&
          selectedCategoryId < todoCategories.length
        ) {
          url += `&category=${selectedCategoryId}`;
        }
      } else if (sortingOption === "date") {
        url = `${host}/todos/sorted-todo-on-date?user=${loggedInUserEmail}`;
        if (
          selectedCategoryId >= 0 &&
          selectedCategoryId < todoCategories.length
        ) {
          url += `&category=${selectedCategoryId}`;
        }
      }
      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          console.log("Success12:", data);
          setItems(data);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  }, [sortingOption]);

  useEffect(() => {
    if (selectedCategoryId >= 0 && selectedCategoryId < todoCategories.length) {
      fetch(
        `${host}/todos/filtered-todos?category=${selectedCategoryId}&user=${loggedInUserEmail}`
      )
        .then((response) => response.json())
        .then((data) => {
          console.log("Success12:", data);
          setItems(data);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  }, [selectedCategoryId, loggedInUserEmail]);

  return (
    <div className="filter">
      <div className="filter1">
        <div className="fil">Filtering</div>
        <select
          title="Select category"
          value={selectedCategoryId}
          onChange={(e) => setSelectedCategoryId(e.target.value)}
          style={{backgroundColor: '#282c34', color: 'white'}}
        >
          {localCategories.map((category, index) => (
            <option key={index} title={category.title} value={category.id}>
              {category.title}
            </option>
          ))}
        </select>
      </div>
      <div className="sorting">
        <div>Sorting</div>
        <div className="radio">
          <label>
            <input
              type="radio"
              value="name"
              checked={sortingOption === "name"}
              onChange={handleSortingOptionChange}
            />
            Name
          </label>
          <label>
            <input
              type="radio"
              value="date"
              checked={sortingOption === "date"}
              onChange={handleSortingOptionChange}
            />
            Date
          </label>
        </div>
      </div>
      <div className="items-cont">
        {items &&
          items.map((val, idx) => (
            <Item
              key={idx}
              item={val}
              idx={idx}
              items={items}
              setItems={setItems}
              handleOpenModal={handleOpenModal}
              setUpdateModalTodoId={setUpdateModalTodoId}
              todoCategories={todoCategories}
            />
          ))}
      </div>
    </div>
  );
};

export default TODOItems;
