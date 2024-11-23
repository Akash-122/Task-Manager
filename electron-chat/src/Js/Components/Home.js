import React, { useEffect, useState } from "react";
import CreateItem from "./CreateItem";
import TODOItems from "./TODOItems";
import UpdateModal from "./UpdateModal";
import CategoryChart from "./PieChart";
import Notification from "../../utils/notification";
import host from "../../constants/hostName";

function Home({ loggedInUserEmail }) {
  const [items, setItems] = useState([]);
  const [isUpdateModalOpen, setUpdateModalOpen] = useState(false);
  const [updateModalTodoId, setUpdateModalTodoId] = useState(-1);
  const [todoCategories, setTodoCategories] = useState([]);

  useEffect(() => {
    fetch(`${host}/todos/fetch-todo?user=${loggedInUserEmail}`)
      .then((response) => response.json())
      .then((data) => {
        setItems(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, [loggedInUserEmail]);

  useEffect(() => {
    // show deadlines
    if (loggedInUserEmail && items) {
      console.log("Checking pending tasks", items, loggedInUserEmail);
      const pendingTasks = items
        .filter((item) => {
          const itemDate = new Date(item.date);
          const todayDate = new Date();
          return (
            todayDate.getDate() === itemDate.getDate() &&
            todayDate.getMonth() === itemDate.getMonth() &&
            todayDate.getFullYear() === itemDate.getFullYear()
          );
        })
        .map((task) => task.name)
        .join(",");
      console.log("pendingTasks", pendingTasks);
      if (pendingTasks) {
        Notification.show({ title: "Deadlines", body: pendingTasks });
      }
    }
  }, [loggedInUserEmail, items]);

  useEffect(() => {
    // Setup notification
    Notification.setup();
    fetch(`${host}/todos/fetch-todo-categories`)
      .then((response) => response.json())
      .then((data) => {
        setTodoCategories(data.categories);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  const handleOpenModal = () => {
    setUpdateModalOpen(true);
  };

  return (
    <div>
      <CreateItem
        items={items}
        setItems={setItems}
        loggedInUserEmail={loggedInUserEmail}
        todoCategories={todoCategories}
      />
      <TODOItems
        items={items}
        setItems={setItems}
        handleOpenModal={handleOpenModal}
        setUpdateModalTodoId={setUpdateModalTodoId}
        loggedInUserEmail={loggedInUserEmail}
        todoCategories={todoCategories}
      />
      <CategoryChart items={items} todoCategories={todoCategories} />
      <UpdateModal
        isOpen={isUpdateModalOpen}
        onClose={() => setUpdateModalOpen(false)}
        items={items}
        setItems={setItems}
        todoId={updateModalTodoId}
      />
    </div>
  );
}

export default Home;
