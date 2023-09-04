import axios from "axios";
import { useState } from "react";
import "../index.css";

const CreateTodoItem = (props) => {
  const [title, setTitle] = useState("");

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const createItem = () => {
    axios
      .post(
        "http://127.0.0.1:8000/v1/item/create/" + title,
        {},
        { headers: { token: "some_token" } }
      )
      .then((response) => {
        setTitle("");
        props.passBackResponse(response);
      });
  };

  return (
    <div className="inputContainer">
      <input
        type="text"
        id="name"
        placeholder="create to do item"
        value={title}
        onChange={handleTitleChange}
      />
      <div className="actionButton" id="create-button" onClick={createItem}>
        Create
      </div>
    </div>
  );
};

export default CreateTodoItem;
