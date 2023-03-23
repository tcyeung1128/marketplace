export function productsList() {
  return fetch("http://localhost:8000/information/products", {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      return data;
    });
}

export function productsDetail(params) {
  return fetch("http://localhost:8000/information/products/" + params, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      return data;
    });
}

export function activity() {
  return fetch("http://localhost:8000/information/activity", {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      return data;
    });
}

export function activityDetail(params) {
  return fetch("http://localhost:8000/information/activity/" + params, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      return data;
    });
}

export function loginService(userAccount,password){
  console.log('login service');
  console.log()
  return fetch("http://localhost:8000/information/login",{
    method:"POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ user: userAccount, password: password }),
  })
  .then((response)=>response.json())
  .then((data)=>{
    return data;
  })
  .catch((error)=>{
    return "error"
  })
}