import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

function ToDoItem({ todo, getToDos }) {
  const [editMode, setEditMode] = useState(false);
  const [toDoInput, setToDoInput] = useState(todo.todo);
  const [isCompleted, setIsCompleted] = useState(todo.isCompleted);

  useEffect(() => {
    console.log(isCompleted);
  }, [isCompleted]);

  const handleSubmitButton = async (event, id) => {
    event.preventDefault();
    console.log(toDoInput);

    const token = localStorage.getItem("token");
    await axios
      .put(
        `https://www.pre-onboarding-selection-task.shop/todos/${id}`,
        {
          todo: toDoInput,
          isCompleted,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          setEditMode(false);
          getToDos();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deleteToDo = async (event) => {
    const id = event.target.id;
    const token = localStorage.getItem("token");
    await axios
      .delete(`https://www.pre-onboarding-selection-task.shop/todos/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        console.log(res);
        if (res.status === 204) {
          getToDos();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <StyledLi>
      <label>
        <Checkbox
          disabled={!editMode ? true : false}
          checked={isCompleted}
          onChange={() => {
            setIsCompleted((prev) => !prev);
          }}
        />
        {!editMode ? <span>{todo.todo}</span> : null}
      </label>

      {!editMode ? (
        <>
          <Button
            id={todo.id}
            type="button"
            data-testid="modify-button"
            variant="contained"
            sx={{ mr: 1 }}
            style={{ margin: " 0 1rem 0 auto" }}
            onClick={() => {
              setEditMode(true);
            }}
          >
            수정
          </Button>
          <Button
            id={todo.id}
            type="button"
            data-testid="delete-button"
            variant="contained"
            onClick={deleteToDo}
          >
            삭제
          </Button>
        </>
      ) : (
        <form
          onSubmit={(event) => {
            handleSubmitButton(event, todo.id);
          }}
        >
          <StyledInput
            onChange={(event) => {
              setToDoInput(event.target.value);
            }}
            value={toDoInput}
            inputProps={{
              "data-testid": "modify-input",
            }}
            label="TODO 수정"
            id="modify-todo"
            variant="outlined"
          />

          <Button
            id={todo.id}
            type="submit"
            data-testid="submit-button"
            variant="contained"
            sx={{ mx: 1 }}
          >
            제출
          </Button>

          <Button
            type="button"
            data-testid="cancel-button"
            variant="contained"
            onClick={() => {
              setEditMode(false);
              setToDoInput(todo.todo);
              setIsCompleted(todo.isCompleted);
            }}
          >
            취소
          </Button>
        </form>
      )}
    </StyledLi>
  );
}

export default ToDoItem;

const StyledInput = styled(TextField)`
  width: 300px;
`;

const StyledLi = styled.li`
  width: 100%;
  height: 40px;
  display: flex;
  align-items: center;
  margin-bottom: 50px;

  & > form {
    display: flex;
    align-items: center;
  }
`;
