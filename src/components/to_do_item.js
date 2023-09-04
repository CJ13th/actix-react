import axios from "axios";
import { useState } from "react";
import "../index.css";

const TodoItem = (props) => {
  const processStatus = (status) => {
    if (status === "PENDING") {
      return "edit";
    } else {
      return "delete";
    }
  };

  const [todo, setTodo] = useState({
    title: props.title,
    status: props.status,
    button: processStatus(props.status),
  });

  const inverseStatus = (status) => {
    if (status === "PENDING") {
      return "DONE";
    } else {
      return "PENDING";
    }
  };

  const sendRequest = () => {
    axios
      .post(
        "http://127.0.0.1:8000/v1/item/" + todo.button,
        {
          title: todo.title,
          status: inverseStatus(todo.status),
        },
        { headers: { token: "some_token" } }
      )
      .then((response) => {
        props.passBackResponse(response);
      });
  };

  return (
    <div className="itemContainer">
      <p>{todo.title}</p>
      <div className="actionButton" onClick={sendRequest}>
        {todo.button}
      </div>
    </div>
  );
};

export default TodoItem;
