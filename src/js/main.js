const openLiftBtn = document.querySelector(".open-lift-btn");
const leftDoor = document.querySelector(".left-door");
const rightDoor = document.querySelector(".right-door");

const openLift = () => {
  openLiftBtn.disabled = true;
  rightDoor.classList.add("right-door-open");
  leftDoor.classList.add("left-door-open");

  rightDoor.classList.remove("right-door-close");
  leftDoor.classList.remove("left-door-close");
};

const closeLift = () => {
  rightDoor.classList.add("right-door-close");
  leftDoor.classList.add("left-door-close");

  rightDoor.classList.remove("right-door-open");
  leftDoor.classList.remove("left-door-open");
  openLiftBtn.disabled = false;
};

const openCloseLift = () => {
    openLift();
    setTimeout(() => {
      closeLift();
    }, 3000);
}

openLiftBtn.addEventListener("click", () => {
  openCloseLift();
});
