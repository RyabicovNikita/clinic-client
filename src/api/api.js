import { request } from "../core";

export const getComplaints = (token) =>
  request({
    url: "complaints",
    options: {
      headers: {
        Authorization: token,
      },
    },
  }).then((res) => res);

export const loginUser = async (email, password, setCookie, token) =>
  fetch(`http://localhost:5000/login`, {
    method: "POST",
    url: "login",
    body: JSON.stringify({ email: email, password: password }),
    headers: { "Content-Type": "application/json", Authorization: token },
  }).then((res) => {
    const token = res.headers.get("token");
    if (token) setCookie("token", token, { path: "/", maxAge: 300 });
    return res.json();
  });

export const addComplaint = (fullName, phone, problem, date) =>
  request({
    options: {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ fullName: fullName, phone: phone, problem: problem, date: date }),
    },
  }).then((res) => res);
