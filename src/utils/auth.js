export const BASE_URL = "https://auth.nomoreparties.co";

export const authorize = (identifier, password) => {
  return fetch(`${BASE_URL}/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: identifier,
      password: password,
    }),
  });
};

export const register = (identifier, password) => {
  return fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
        email: identifier,
        password: password,
      }),
  })    
};
