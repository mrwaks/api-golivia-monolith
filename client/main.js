"use strict";

const form = document.getElementById("form");
const loginBtn = document.getElementById("login");
const logoutBtn = document.getElementById("logout");

const secure = document.getElementById("secure");

loginBtn.addEventListener("click", login);
logoutBtn.addEventListener("click", logout);
secure.addEventListener("click", getAccountSecure);

async function login() {
    const response = await fetch("http://localhost:3000/api/v1/account/login", {
        method: "POST",
        mode: "cors",
        body: JSON.stringify({
            accountEmail: "hello123@test.com",
            password: "Password66€",
        }),
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
    });
    console.log(await response.json());
}

async function logout() {
    const response = await fetch("http://localhost:3000/api/v1/account/logout");
    console.log(await response.json());
}

async function getAccountSecure() {
    const response = await fetch("http://localhost:3000/api/v1/account/authentified");
    console.log(await response.json());
};