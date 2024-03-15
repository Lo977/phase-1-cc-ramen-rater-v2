// Global variable
let ramenId;

// Fetching
function getAllRamens() {
  fetch(`http://localhost:3000/ramens`)
    .then((res) => res.json())
    .then((ramens) => {
      ramens.forEach((ramen) => {
        // Creating Tags
        const img = document.createElement("img");
        let imgBtn = document.createElement("button");
        img.src = ramen.image;
        imgBtn.innerText = " x  ";
        // Creating Eventlistener
        img.addEventListener("click", () => handleClick(ramen));
        imgBtn.addEventListener("click", () => {
          handleDelete(ramenId);
          img.remove();
          imgBtn.remove();
        });
        // Rendering to the DOM
        document.getElementById("ramen-menu").append(img, imgBtn);
      });
    })
    .catch((error) => console.log(error));
}
// Handle Clicks
const handleClick = (ramen) => {
  document.querySelector(".name").innerText = ramen.name;
  document.querySelector(".detail-image").src = ramen.image;
  document.querySelector(".restaurant").innerText = ramen.restaurant;
  document.querySelector("#rating-display").innerText = ramen.rating;
  document.querySelector("#comment-display").innerText = ramen.comment;
  ramenId = ramen.id;
};

// New submit listner
const inputs = document.getElementById(`new-ramen`);
inputs.addEventListener("submit", (e) => {
  handleSubmit(e);
  inputs.reset();
});
// New submit funtion
function handleSubmit(e) {
  e.preventDefault();
  const newInput = {
    name: e.target.name.value,
    restaurant: e.target.restaurant.value,
    image: e.target.image.value,
    rating: e.target.rating.value,
    comment: e.target["new-comment"].value,
  };
  // Sending  Submit(POST) Request to the Server
  fetch(`http://localhost:3000/ramens`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newInput),
  });
}

// Update Listener
const updates = document.getElementById(`edit-ramen`);
updates.addEventListener("submit", (e) => {
  handdleUpdate(e);
  updates.reset();
});
// Update funtion
function handdleUpdate(e) {
  e.preventDefault();
  const update = {
    rating: e.target.rating.value,
    comment: e.target.comment.value,
  };
  // Sending Update(PATCH) request to the Server
  fetch(`http://localhost:3000/ramens/${ramenId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(update),
  }).catch((error) => console.log(error));
}
//  Delete funtion request to the Server
function handleDelete() {
  fetch(`http://localhost:3000/ramens/${ramenId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
}

//Invokes functions
const main = () => {
  getAllRamens();
};

main();

// Export functions for testing
export { getAllRamens, main };
