export function changePassword(userName,oldPassword,newPassword,token){
  console.log(userName)
  console.log(oldPassword)
  console.log(newPassword)
  console.log(token)
  return fetch('http://localhost:8000/member/changepassword',{
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      // "Content-Type": "application/x-www-form-urlencoded",
      authorization: token,
    },
    body:JSON.stringify({
      userName:userName,
      oldPassword:oldPassword,
      newPassword:newPassword
    }),
  })
  .then((response)=>response.json())
  .then(data=>{
    return data
  })
}

export function getCartList(userName,token){
  return fetch('http://localhost:8000/member/cartlist/'+userName,{
    method:"GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      // "Content-Type": "application/x-www-form-urlencoded",
      authorization: token,
    },
  })
  .then((response)=>response.json())
  .then(data=>{
    return data
  })
}

export function putChangeCartQTY(value,cartID,token){
  return fetch('http://localhost:8000/member/cartlist',{
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      // "Content-Type": "application/x-www-form-urlencoded",
      authorization: token,
    },
    body:JSON.stringify({
      cartID:cartID,
      newQty:value
    }),
  })
  .then(response=>response.json())
  .then(data=>{
    return data
  })
}

export function delCartcartID(cartID,token){
  return fetch(
    "http://localhost:8000/member/delcart/" + cartID,
    {
      method: "delete",
      headers: {
        "Content-Type": "application/json",
        authorization: token,
      },
    }
  )
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
    });
}

export function putaddCartQTY(userID,itemID,token){
  console.log(userID)
  console.log(itemID)
  console.log(token)
  return fetch('http://localhost:8000/member/addnewcartlist',{
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      // "Content-Type": "application/x-www-form-urlencoded",
      authorization: token,
    },
    body:JSON.stringify({
      userID:userID,
      itemID:itemID
    }),
  })
  .then(response=>response.json())
  .then(data=>{
    return data
  })
}

export function buyButtonFromCart(userID,token){
  console.log("buy")
  console.log(userID)
  console.log(token)
  return fetch('http://localhost:8000/member/buyfromcart',{
    method:'POST',
    headers:{
      Accept: "application/json",
      "Content-Type": "application/json",
      // "Content-Type": "application/x-www-form-urlencoded",
      authorization: token,
    },
    body:JSON.stringify({
      userID:userID,
    }),
  })
  .then(response=>response.json())
  .then(data=>{
    console.log(data)
    return data
  })
}

export function getOrderList(userID,token){
  return fetch('http://localhost:8000/member/orderlist/'+userID,{
    method:"GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      // "Content-Type": "application/x-www-form-urlencoded",
      authorization: token,
    },
  })
  .then((response)=>response.json())
  .then(data=>{
    return data
  })
}