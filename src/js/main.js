const buttons = document.querySelectorAll(".call-lift-btn");
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
  lift.style.transition = `transform ${1500 * distance}ms ease-in-out`;
};

let currFloor = 0;

function callLift(destFloor) {
  const distance = Math.abs(destFloor - currFloor);
  moveLift(distance, destFloor);

  setTimeout(() => {
    openCloseLift();
  }, distance * 1500 + 1000);

  currFloor = destFloor;
}

for (let i = 0; i < buttons.length; i++) {
  console.log(buttons[i].dataset.liftNum)
  buttons[i].addEventListener("click", () => {
    callLift(buttons[i].dataset.liftNum);
  });
}

const getMaxLifts = () => {
  const viewportwidth = document.getElementsByTagName("body")[0].clientWidth;
};
