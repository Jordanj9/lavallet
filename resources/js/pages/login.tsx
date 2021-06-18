import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Dispatch } from "redux";
import { useSelector, shallowEqual, useDispatch } from "react-redux";
import { useFormik } from "formik";
import { signIn } from "../redux/actionCreators/userCreators";
import axios from "axios";

const validate = (values: any) => {
  const errors: any = {};

  if (!values.password) {
    errors.password = "Requerido";
  }

  if (!values.email) {
    errors.email = "Requerido";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Correo electronico invalido";
  }

  return errors;
};

const Login: React.FC = () => {
  const [message, setMessage] = useState<string>();

  const user: UserState = useSelector((state: any) => state.user, shallowEqual);

  const dispatch: Dispatch<any> = useDispatch();

  const login = React.useCallback((user: IUser) => dispatch(signIn(user)), [
    dispatch
  ]);

  let history = useHistory();

  const formik = useFormik({
    initialValues: {
      email: "colonca1999@gmail.com",
      password: "password",
      empresa: "santa lucia"
    },
    validate,
    onSubmit: values => {
        axios.get("/sanctum/csrf-cookie").then(resp => {
        axios
          .post("/login", values)
          .then(resp => {
            if (resp.status == 200) {
              const { data } = resp;
              login({
                name: data.name,
                email: data.email,
                company: values.empresa
              });
              history.push("/dashboard");
            }
          })
          .catch(error => {
            const message = "Usuario y/o contraseña incorrecta";
            setMessage(message);
          });
      });
    }
  });

  useEffect(() => {
    document.title = "login";
    if (user.isLogged) history.push("/dashboard");
  }, []);

  return (
    <div className="font-sans">
      <div className="relative min-h-screen flex flex-col sm:justify-center items-center bg-gray-100 ">
        <div className="relative sm:max-w-sm w-full">
          <div className="card bg-green-400 shadow-lg  w-full h-full rounded-3xl absolute  transform -rotate-6"></div>
          <div className="card bg-green-700 shadow-lg  w-full h-full rounded-3xl absolute  transform rotate-6"></div>
          <div className="relative w-full rounded-3xl  px-6 py-4 bg-gray-100 shadow-md">
            <label
              htmlFor=""
              className="block text-sm text-gray-700 text-center font-semibold"
            >
              Iniciar Sesión
            </label>
            <form onSubmit={formik.handleSubmit} className="mt-10">
              <div className="">
                <span className="text-gray-700">Empresa</span>
                <select
                  onChange={formik.handleChange}
                  value={formik.values.empresa}
                  name="empresa"
                  className="mt-1 block w-full border-none bg-gray-100 h-11 rounded-xl shadow-lg hover:bg-blue-100 focus:bg-blue-100 focus:ring-0"
                >
                  <option value="lavallet">Lavallet S.A.S</option>
                  <option value="santa lucia">Santa Lucia S.A.S</option>
                </select>
              </div>

              <div className="mt-7">
                <span className="text-gray-700">Usuario</span>
                <input
                  name="email"
                  type="email"
                  onChange={formik.handleChange}
                  value={formik.values.email}
                  placeholder="Email"
                  className="mt-1 block w-full border-none bg-gray-100 h-11 rounded-xl shadow-lg hover:bg-blue-100 focus:bg-blue-100 focus:ring-0"
                />
                {formik.errors.email ? (
                  <div className="mt-2 text-red-500">{formik.errors.email}</div>
                ) : null}
              </div>

              <div className="mt-7">
                <span className="text-gray-700">Contraseña</span>
                <input
                  name="password"
                  type="password"
                  placeholder="Contraseña"
                  onChange={formik.handleChange}
                  value={formik.values.password}
                  className="mt-1 block w-full border-none bg-gray-100 h-11 rounded-xl shadow-lg hover:bg-blue-100 focus:bg-blue-100 focus:ring-0"
                />
                {formik.errors.password ? (
                  <div className="mt-2 text-red-500">
                    {formik.errors.password}
                  </div>
                ) : null}
                {message ? (
                  <div className="mt-2 text-red-500">{message}</div>
                ) : null}
              </div>

              <div className="mt-7 flex">
                <label
                  htmlFor="remember_me"
                  className="inline-flex items-center w-full cursor-pointer"
                >
                  <input
                    id="remember_me"
                    type="checkbox"
                    className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    name="remember"
                  />
                  <span className="ml-2 text-sm text-gray-600">Recuerdame</span>
                </label>

                <div className="w-full text-right">
                  <a
                    className="underline text-sm text-gray-600 hover:text-gray-900"
                    href="#"
                  >
                    ¿Olvido su contraseña?
                  </a>
                </div>
              </div>

              <div className="mt-7">
                <button
                  type="submit"
                  className="bg-green-400 w-full py-3 rounded-xl text-white shadow-xl hover:shadow-inner focus:outline-none transition duration-500 ease-in-out  transform hover:-translate-x hover:scale-105"
                >
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
