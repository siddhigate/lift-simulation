const buttons = document.querySelectorAll(".call-lift-btn");
const liftEls = document.querySelectorAll(".lift-container");
const leftDoors = document.querySelectorAll(".left-door");
const rightDoors = document.querySelectorAll(".right-door");

class Queue {
  constructor() {
    this.items = [];
  }

  enqueue(element) {
    return this.items.push(element);
  }

  dequeue() {
    if (this.items.length > 0) {
      return this.items.shift();
    }
  }

  peek() {
    return this.items[this.items.length - 1];
  }

  isEmpty() {
    return this.items.length == 0;
  }

  size() {
    return this.items.length;
  }

  clear() {
    this.items = [];
  }
}

/**
 *
 *    LIFT Management
 *    - get lifts
 *    - get empty lift
 *    - add lift
 *
 */

const lifts = Array.from(
  document.querySelectorAll(".lift-container"),
  (el) => ({ htmlEl: el, busy: false })
);

function getLifts() {
  return lifts;
}

function getEmptyLift() {
  const lifts = getLifts();
  const index = lifts.findIndex((lift) => lift.busy === false);

  return { lift: lifts[index], index };
}

const getMaxLifts = () => {
  const viewportwidth = document.getElementsByTagName("body")[0].clientWidth;
};

const callLift = () => {
  const { lift, index } = getEmptyLift();

  if (index >= 0 && !requests.isEmpty()) {
    lifts[index].busy = true;
    moveLift(lift.htmlEl, requests.dequeue(), index);
  }
};

function addLift() {}

/**
 *
 *    LIFT ACTIONS -> animations
 *    open, close, move up, down.
 *
 */
const openLift = (index) => {
  buttons.disabled = true;
  rightDoors[index].classList.add("right-door-open");
  leftDoors[index].classList.add("left-door-open");

  rightDoors[index].classList.remove("right-door-close");
  leftDoors[index].classList.remove("left-door-close");
};

const closeLift = (index) => {
  rightDoors[index].classList.add("right-door-close");
  leftDoors[index].classList.add("left-door-close");

  rightDoors[index].classList.remove("right-door-open");
  leftDoors[index].classList.remove("left-door-open");
  buttons.disabled = false;

  setTimeout(() => {
    lifts[index].busy = false;
    dispatchliftIdle();
  }, 2500);
};

const openCloseLift = (index) => {
  openLift(index);
  setTimeout(() => {
    closeLift(index);
  }, 3000);
};

const moveLift = (lift, destFloor, index) => {
  const distance = Math.abs(destFloor - currFloors[index]);
  console.log(distance, 1500 * distance)
  lift.style.transform = `translateY(${destFloor * 100 * -1}%)`;
  lift.style.transition = `transform ${1500 * distance}ms ease-in-out`;

  setTimeout(() => {
    openCloseLift(index);
  }, distance * 1500 + 1000);

  currFloors[index] = destFloor;
};


/**
 *
 *    REQUESTS:
 *    addRequest
 *    removeRequest
 *
 */

function addRequest(destFloor) {
  requests.enqueue(destFloor);
  dispatchRequestAdded();
}

function removeRequest() {
  requests.dequeue();
}

/**
 *
 *      EVENTS:
 *      requestAddedEvent
 *      liftIdleEvent
 *
 */

const requestAddedEvent = new Event("requestAdded");
const liftIdleEvent = new Event("liftIdle");

function dispatchRequestAdded() {
  document.dispatchEvent(requestAddedEvent);
}

function dispatchliftIdle() {
  document.dispatchEvent(liftIdleEvent);
}

document.addEventListener("requestAdded", () => {
  callLift();
});

document.addEventListener("liftIdle", () => {
  callLift();
});

/**
 *
 * MAIN
 *
 */

let currFloors = [0, 0];
let requests = new Queue();

function main() {
  for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener("click", () => {
      addRequest(buttons[i].dataset.liftNum);
    });
  }
}

main();
