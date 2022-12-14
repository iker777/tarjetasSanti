import React, { useState, useEffect } from 'react';
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {

  const navigate = useNavigate()

  useEffect(() => {
    if (localStorage.getItem("user")) {
      navigate("/");
      return;
    }
  });

  const [data, setData] = useState({
    mail: null,
    paswd: null
  });

  const handleOnChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value
    })
  }

    const onClick = (e) => {
      e.preventDefault();
      axios
        .post("http://localhost:3030/login", data)
        .then((res) => {

          if(!res || !res.data){
            alert("Error general");
            return;
          }
          if(res.data.error){
            alert(res.data.text);
            return;
          }
          alert(`Hola ${res.data.mail}`);
          localStorage.setItem("user", JSON.stringify(res.data))
          window.location.href = "/"
          // navigate("/", {replace: true})
          // getSavedCards();
        });
    };

  return (
    <>
      <h1 className='form__h1'>Iniciar sesión</h1>
      <div className="formContainer">
        <form className="form">
          <input
            name="mail"
            type="text"
            placeholder="Email"
            onChange={handleOnChange}
            className="form__textInput"
          />
          <input
            name="paswd"
            type="password"
            placeholder="password"
            onChange={handleOnChange}
            className="form__textInput"
          />
          <input
            type="submit"
            value="Enviar"
            onClick={onClick}
            className="form__submit"
          />
        <Link className='form__link' to="/register">¿No tienes cuenta?</Link>
        </form>
      </div>
    </>
  );
}

export default Login