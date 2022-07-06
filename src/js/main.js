const buttons = document.querySelectorAll(".open-lift-btn");
const lift = document.querySelector(".lift-container");
const leftDoor = document.querySelector(".left-door");
const rightDoor = document.querySelector(".right-door");

const openLift = () => {
  buttons.disabled = true;
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
  buttons.disabled = false;
};

const openCloseLift = () => {
  openLift();
  setTimeout(() => {
    closeLift();
  }, 3000);
};

const moveLift = (distance, destFloor) => {
  lift.style.transform = `translateY(${destFloor * 100 * -1}%)`;
  lift.style.transition = `transform ${2000 * distance}ms ease-in-out`;
};

let currFloor = 1;

function callLift(destFloor) {
  const distance = Math.abs(destFloor - currFloor);
  moveLift(distance, destFloor);

  setTimeout(() => {
    openCloseLift();
  }, distance * 2000 + 1000);

  currFloor = destFloor;
}

for (let i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener("click", () => {
    callLift(buttons.length - i - 1);
  });
}

const viewportwidth = document.getElementsByTagName("body")[0].clientWidth,
  viewportheight = document.getElementsByTagName("body")[0].clientHeight;

console.log(viewportwidth, viewportheight);
