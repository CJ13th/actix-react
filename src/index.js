import { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import axios from "axios";
import TodoItem from "./components/to_do_item";
import CreateTodoItem from "./components/create_to_do_item";
import "./index.css";

function App() {
  const [items, setItems] = useState({
    pending_items: [],
    done_items: [],
    pending_items_count: 0,
    done_items_count: 0,
  });

  const processItemValues = (items) => {
    let itemList = [];
    items.forEach((item, _) => {
      itemList.push(
        <TodoItem
          key={item.title + item.status}
          title={item.title}
          status={item.status}
          passBackResponse={handleReturnedState}
        />
      );
    });
    return itemList;
  };

  const handleReturnedState = (response) => {
    let pending_items = response.data["pending_items"];
    let done_items = response.data["done_items"];
    setItems({
      pending_items: processItemValues(pending_items),
      done_items: processItemValues(done_items),
      pending_items_count: response.data["pending_item_count"],
      done_items_count: response.data["done_item_count"],
    });
  };

  const getItems = () => {
    axios
      .get("http://127.0.0.1:8000/v1/item/get", {
        headers: { token: "some_token" },
      })
      .then((response) => {
        let pending_items = response.data["pending_items"];
        let done_items = response.data["done_items"];

        setItems({
          pending_items: processItemValues(pending_items),
          done_items: processItemValues(done_items),
          pending_items_count: response.data["pending_item_count"],
          done_items_count: response.data["done_item_count"],
        });
      });
  };

  useEffect(() => {
    getItems();
  }, []);

  return (
    <div className="App">
      <div className="mainContainer">
        <div className="header">
          <p>
            complete tasks:
            {items.done_items_count}
          </p>
          <p>
            pending tasks:
            {items.pending_items_count}
          </p>
        </div>
        <h1>Pending Items</h1>
        {items.pending_items}
        <h1>Done Items</h1>
        {items.done_items}
        <CreateTodoItem passBackResponse={handleReturnedState} />
      </div>
    </div>
  );
}

const container = document.getElementById("root");
const root = ReactDOM.createRoot(container);
root.render(<App />);
