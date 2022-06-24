console.log("linked");

document.querySelector("#login-form").addEventListener("submit", e => {
  e.preventDefault();
  const userLogin = {
    username: document.querySelector("#username-login").value,
    password: document.querySelector("#password-login").value,
  }
  console.log(userLogin);
  fetch("/api/users/login", {
    method: "POST",
    body: JSON.stringify(userLogin),
    headers: {
      "Content-Type":"application/json"
    }
  }).then(res => {
    if (res.ok) {
      document.location.replace('/profile');
    } else {
      alert(res.statusText);
    }
  })
});

document.querySelector("#signup-form").addEventListener("submit", e => {
  e.preventDefault();
  const userSignup = {
    username: document.querySelector("#username-signup").value,
    password: document.querySelector("#password-signup").value,
  }
  console.log(userSignup);
  fetch("/api/users/", {
    method: "POST",
    body: JSON.stringify(userSignup),
    headers: {
      "Content-Type":"application/json"
    }
  }).then(res => {
    if (res.ok) {
      document.location.replace('/profile');
    } else {
      alert(res.statusText);
    }
  })
});