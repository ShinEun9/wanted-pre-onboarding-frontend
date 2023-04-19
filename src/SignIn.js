import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

function SignIn() {
  const navigate = useNavigate();
  const [input, setInput] = useState({ loginID: "", password: "" });
  const [idCorrect, setIdCorrect] = useState(false);
  const [passwordCorrect, setPasswordCorrect] = useState(false);
  const [disabled, setDisabled] = useState(true);

  const handleChange = (event) => {
    const { id, value } = event.target;
    if (id === "loginID") {
      setInput({ ...input, loginID: value });
      if (value.includes("@")) setIdCorrect(true);
      else setIdCorrect(false);
    } else {
      setInput({ ...input, password: value });
      if (value.length >= 8) setPasswordCorrect(true);
      else setPasswordCorrect(false);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { loginID: email, password } = input;
    await axios
      .post(
        "https://www.pre-onboarding-selection-task.shop/auth/signin",
        { email, password },
        { headers: { "Content-Type": "application/json" } }
      )
      .then((res) => {
        if (res.status === 200) {
          localStorage.setItem("token", res.data.access_token);
          navigate("/todos");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    if (idCorrect && passwordCorrect) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [idCorrect, passwordCorrect]);

  useEffect(() => {
    if (localStorage.getItem("token")) navigate("/todos");
  });

  return (
    <>
      <h1 class="a11y-hidden">로그인 페이지</h1>
      <Form onSubmit={handleSubmit}>
        <StyledInput
          onChange={handleChange}
          inputProps={{
            "data-testid": "email-input",
          }}
          id="loginID"
          label="email"
          variant="outlined"
          helperText={!idCorrect ? "@를 포함하여 아이디를 작성해주세요" : ""}
          sx={{ mb: 4 }}
        />
        <StyledInput
          type="password"
          onChange={handleChange}
          inputProps={{
            "data-testid": "password-input",
          }}
          id="password"
          label="Password"
          variant="outlined"
          helperText={
            !passwordCorrect ? "비밀번호를 8자 이상 작성해주세요" : ""
          }
          sx={{ mb: 4 }}
        />
        <Button
          type="submit"
          data-testid="signin-button"
          variant="contained"
          disabled={disabled}
          sx={{ width: "200px" }}
        >
          로그인
        </Button>
      </Form>
    </>
  );
}

export default SignIn;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const StyledInput = styled(TextField)`
  width: 300px;
`;
