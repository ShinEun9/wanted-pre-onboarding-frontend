import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import styled from "styled-components";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import ToDoItem from "./ToDoItem";

function ToDo() {
  const navigate = useNavigate();
  const [todosList, setToDosList] = useState([]);
  const [newToDoInput, setNewToDoInput] = useState("");

  // 새로운 ToDo 추가 버튼 클릭 시
  const handleSubmitNewToDo = async (event) => {
    const token = localStorage.getItem("token");

    event.preventDefault();
    await axios
      .post(
        "https://www.pre-onboarding-selection-task.shop/todos",
        { todo: newToDoInput },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        if (res.status === 201) {
          getToDos();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getToDos = async () => {
    const token = localStorage.getItem("token");
    await axios
      .get("https://www.pre-onboarding-selection-task.shop/todos", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        if (res.status === 200) {
          setToDosList(res.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    const acessToken = localStorage.getItem("token");
    if (!acessToken) {
      navigate("/signin");
    } else {
      getToDos();
    }
  }, []);

  return (
    <>
      <h1 className="a11y-hidden">ToDo페이지</h1>
      <StyledMain>
        <Form onSubmit={handleSubmitNewToDo}>
          <StyledInput
            onChange={(event) => setNewToDoInput(event.target.value)}
            inputProps={{
              "data-testid": "new-todo-input",
            }}
            label="TODO"
            id="new-todo"
            variant="outlined"
          />
          <Button
            type="submit"
            data-testid="new-todo-add-button"
            variant="contained"
          >
            추가
          </Button>
        </Form>

        <ul>
          {todosList.map((item) => (
            <ToDoItem key={item.id} todo={item} getToDos={getToDos} />
          ))}
        </ul>
      </StyledMain>
    </>
  );
}

export default ToDo;

const StyledMain = styled.main`
  width: 350px;
  margin: 100px auto;
`;

const Form = styled.form`
  display: flex;
  align-items: center;
  & :first-child {
    margin-right: 20px;
  }
  margin-bottom: 40px;
`;

const StyledInput = styled(TextField)`
  width: 300px;
`;
