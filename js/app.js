const listEl = document.querySelector(".list");
const detailEl = document.getElementById("detail");

const modal = document.getElementById("userModal");
const openModalBtn = document.getElementById("openModal");
const closeModalBtn = document.getElementById("closeModal");
const addUserBtn = document.getElementById("addUser");
const newNameInput = document.getElementById("newName");

let users = [];

const showDetail = (user) => {
  detailEl.innerHTML = `
    <h3>${user.name} (@${user.username || "no-username"})</h3>
    <p><strong>Email:</strong> ${user.email || "-"}</p>
    <p><strong>Phone:</strong> ${user.phone || "-"}</p>
    <p><strong>Company:</strong> ${user.company?.name || "-"}</p>
  `;
};

const updateUI = function (dataArr) {
  listEl.innerHTML = "";
  dataArr.forEach((user) => {
    const liEl = document.createElement("li");
    liEl.textContent = user.name;
    liEl.addEventListener("click", () => showDetail(user));
    listEl.append(liEl);
  });
};

const getData = async () => {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    if (!response.ok) {
      throw new Error("malumot yoq");
    }
    const data = await response.json();
    users = data;
    updateUI(users);
  } catch (error) {
    console.log(error.message);
  }
};
getData();

openModalBtn.addEventListener("click", () => {
  modal.style.display = "flex";
});

closeModalBtn.addEventListener("click", () => {
  modal.style.display = "none";
  newNameInput.value = "";
});

addUserBtn.addEventListener("click", () => {
  const name = newNameInput.value.trim();
  if (name) {
    const newUser = {
      id: users.length + 1,
      name: name,
      username: "",
      email: "",
      phone: "",
      company: { name: "" },
    };
    users.push(newUser);
    updateUI(users);
    modal.style.display = "none";
    newNameInput.value = "";
  }
});
