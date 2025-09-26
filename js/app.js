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
    <h3 class="text-lg font-bold mb-2">Foydalanuvchi ma’lumotlari</h3>
    <p><strong>ID:</strong> ${user.id}</p>
    <p><strong>Name:</strong> ${user.name}</p>
    <p><strong>Username:</strong> ${user.username}</p>
    <p><strong>Email:</strong> ${user.email}</p>
    <p><strong>Phone:</strong> ${user.phone}</p>
    <p><strong>Website:</strong> ${user.website}</p>
    <p><strong>Company:</strong> ${user.company?.name}</p>
    <p><strong>Catch Phrase:</strong> ${user.company?.catchPhrase}</p>
    <p><strong>BS:</strong> ${user.company?.bs}</p>
    <p><strong>Address:</strong> 
      ${user.address?.street}, ${user.address?.suite}, 
      ${user.address?.city} (${user.address?.zipcode})
    </p>
  `;
};

const updateUI = function (dataArr) {
  listEl.innerHTML = "";
  dataArr.forEach((user) => {
    const liEl = document.createElement("li");
    liEl.className =
      "user-card bg-white shadow rounded-lg p-4 cursor-pointer hover:bg-gray-50 transition";
    liEl.innerHTML = `
      <div>
        <h4 class="font-semibold text-lg">${user.name}</h4>
        <p class="text-sm text-gray-500">${
          user.email || "Email mavjud emas"
        }</p>
      </div>
    `;
    liEl.addEventListener("click", () => showDetail(user));
    listEl.append(liEl);
  });
};

const getData = async () => {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    if (!response.ok) throw new Error("Ma'lumot topilmadi");
    const data = await response.json();
    users = data;
    updateUI(users);
  } catch (error) {
    console.log(error.message);
  }
};
getData();

openModalBtn.addEventListener("click", () => {
  modal.classList.remove("hidden");
});

closeModalBtn.addEventListener("click", () => {
  modal.classList.add("hidden");
  newNameInput.value = "";
});

addUserBtn.addEventListener("click", () => {
  const name = newNameInput.value.trim();
  if (name) {
    const newUser = {
      id: users.length + 1,
      name,
      username: "",
      email: "",
      phone: "",
      website: "",
      company: { name: "", catchPhrase: "", bs: "" },
      address: { street: "", suite: "", city: "", zipcode: "" },
    };
    users.push(newUser);
    updateUI(users);
    modal.classList.add("hidden");
    newNameInput.value = "";
  }
});
