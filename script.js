function getData() {
  fetch("http://localhost:3000/products").then((res) =>
    res.json().then((data) => {
      var products = data;
      var html_ = "";
      for (let index = 0; index < products.length; index++) {
        const element = products[index];
        html_ += `  <div class="col-sm-4">
<div class="card mb-3">
        <div class="card-body">
            <h5 class="card-title">${element.title}</h5>
            <a href="#" class="btn btn-primary">Buy $${element.price}</a>
            <button class="btn btn-primary" id="delete" value=${element.id}>Delete</button>

        </div>
        </div></div>`;
      }
      document.getElementById("products").innerHTML = html_;
    })
  );
}
// <img src=${element.image} style="width:150px;height:150px;display:block;margin:0 auto" class="card-img-top mt-1 mb-1" alt="...">

getData();

document.getElementById("form").addEventListener("submit", function (e) {
  e.preventDefault();
  const producttitle = document.getElementById("producttitle").value;
  const productprice = document.getElementById("price").value;
  const productimage = document.getElementById("pimage").value;
  // const url = URL.createObjectURL(productimage);
  const data = {
    title: producttitle,
    price: productprice,
    image: productimage,
  };
  console.log(data);
  var options = {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  };
  fetch("http://localhost:3000/products", options)
    .then((opt) => opt.json())
    .then((p) => getData());
});

document.addEventListener("click", function (e) {
  var options = {
    method: "DELETE",

    headers: {
      "Content-Type": "application/json",
    },
  };
  if (e.target && e.target.id == "delete") {
    const id = e.target.value;
    fetch(`http://localhost:3000/products/${id}`, options)
      .then((opt) => opt.json())
      .then((p) => getData());
  }
});
