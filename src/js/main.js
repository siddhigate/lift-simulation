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
  (el) => ({ htmlEl: el, busy: false, currFloor: 0 })
);

function getLifts() {
  return lifts;
}

function getClosestEmptyLift(destFloor) {
  const lifts = getLifts();

  const emptyLifts = lifts.reduce(
    (result, value, i) =>
      result.concat(
        value.busy === false
          ? {
              i,
              currFloor: value.currFloor,
              distance: Math.abs(destFloor - value.currFloor),
            }
          : []
      ),
    []
  );

  if (emptyLifts.length <= 0) {
    return { lift: {}, index: -1 };
  }

  const closestLift = emptyLifts.reduce((result, value, index) =>
    value.distance < result.distance ? value : result
  );

  const index = closestLift.i;

  return { lift: lifts[index], index };
}

const getMaxLifts = () => {
  const viewportwidth = document.getElementsByTagName("body")[0].clientWidth;
};

const callLift = () => {
  const { lift, index } = getClosestEmptyLift(requests.peek());

  if (index >= 0) {
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
  const distance = Math.abs(destFloor - lifts[index].currFloor);
  lift.style.transform = `translateY(${destFloor * 100 * -1}%)`;
  lift.style.transition = `transform ${1500 * distance}ms ease-in-out`;

  setTimeout(() => {
    openCloseLift(index);
  }, distance * 1500 + 1000);

  lifts[index].currFloor = destFloor;
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
  if (!requests.isEmpty()) {
    callLift();
  }
});

/**
 *
 * MAIN
 *
 */

let requests = new Queue();

function main() {
  for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener("click", () => {
      addRequest(buttons[i].dataset.liftNum);
    });
  }
}

main();
