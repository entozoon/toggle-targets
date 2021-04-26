import set = require("lodash/set");
// interface ToggleTargetsInterface {
//   toggleSelector?: string;
// }
// export class ToggleTargets {
//   constructor({
//     toggleSelector = "data-tt-toggle-target",
//   }: ToggleTargetsInterface = {}) {
//     console.log("constructing..");
//   }
// }
interface Set {
  id: string;
  toggles: [Element?];
  targets: [Element?];
  blur: boolean;
}
export const initToggleTargets = () => {
  let sets: Set[] = [];
  const setItems = document.querySelectorAll("[data-tt-set]");
  if (!setItems) return;
  // Run through all [data-tt-set] elements
  setItems.forEach((item) => {
    const id = item.getAttribute("data-tt-set");
    if (!id) return console.error("Toggle targets all need a data-tt-set");
    // Collate them into a set of unique object keys
    let i = sets.findIndex((s) => s.id == id);
    i = i >= 0 ? i : sets.length;
    if (!sets[i]) sets[i] = { id, toggles: [], targets: [], blur: false };
    // Collect the toggle elements for this particular set
    if (item.getAttribute("data-tt-toggle")) {
      sets[i].toggles.push(item);
    }
    // Collect the target elements too JIC
    if (item.getAttribute("data-tt-target")) {
      sets[i].targets.push(item);
    }
  });
  // If we detect a data-tt-blur let's assume they all are for ease
  sets = sets.map((s) => {
    // Got a sneaking suspicion that IE11 won't notice a data attr without a value
    s.blur = s.targets.some((t) => t.getAttribute("data-tt-blur") != null);
    return s;
  });
  // console.log(sets);
  // Cool, so we've got our sets in a nice format, let's instanciate some instances
  const toggleSets = sets.map((s) => new ToggleSet(s));
  // console.log("toggleSets", toggleSets);
  // Global click event check against all sets
  // Has to be mousedown not click, as click actually fires on mouseup
  // which is a problem if, say you highlight your email address in login drop and mouseup away from the drop, it'll blur.
  //
  document.addEventListener("mousedown", (e) => {
    toggleSets.forEach((s) => {
      s.checkForClicks(e);
    });
  });
};
export class ToggleSet {
  // Infuriating that I have to write the interface out again
  // It seems like TS doesn't current do anything with implements concept
  // Otherwise I'd have an interface that extends Set, and then implement it
  id: string;
  toggles: [Element?];
  targets: [Element?];
  blur: boolean;
  constructor(set: Set) {
    // this.toggles = set.toggles;
    Object.assign(this, set);
  }
  checkForClicks(e: Event) {
    const toggleClicked = this.toggles.find((t) => t == e.target);
    if (toggleClicked) {
      // This set's toggle was clicked!
      // Find the target item, specifically within this set
      // (so the data-tt-target values don't have to be unique!)
      const dataToggle = toggleClicked.getAttribute("data-tt-toggle");
      const target = this.targets.find((t) => {
        return t.getAttribute("data-tt-target") == dataToggle;
      });
      const notTargets = this.targets.find((t) => {
        return t.getAttribute("data-tt-target") != dataToggle;
      });
      // Is the target already revealed? In which case unreveal
      if (target.getAttribute("hidden") == null) {
        target && target.setAttribute("hidden", "");
      } else {
        // Reveal its target item
        target && target.removeAttribute("hidden");
        // Unreveal the others
        notTargets && notTargets.setAttribute("hidden", "");
      }
    }
  }
}
// export class ToggleTargets {
//   constructor(
//     { targetSelector } = {
//       targetSelector: "data-tt-toggle-target",
//     }
//   ) {
//     console.log("constructing..");
//   }
// }
// const getToggles = (attribute: any) =>
//   document.querySelectorAll(`[${attribute}]`);
// const clickingWithinToggleTarget = (target: any, attribute: any) => {
//   return [...getToggles(attribute)].filter((t) =>
//     target.closest(t.getAttribute(attribute))
//   ).length
//     ? true
//     : false;
//   // NB: This probably doesn't properly handle blurring of sets
//   // NNB: Holy heck that was hard to write!
// };
// const clickingUntoggle = (target: any, untoggleAttribute?: string) => {
//   if (!untoggleAttribute) return false;
//   console.log("target", target);
//   console.log(target.getAttribute(untoggleAttribute));
//   return untoggleAttribute && target.getAttribute(untoggleAttribute)
//     ? target
//     : false;
// };
// const getTargetFromToggle = (toggle: any, attribute: any) =>
//   document.querySelector(toggle.getAttribute(attribute));
// const setActivation = (params: any, activating: any) => {
//   const { toggle, attribute } = params;
//   let target = getTargetFromToggle(toggle, attribute);
//   let targetSelector = toggle.getAttribute(attribute);
//   if (target) {
//     activating
//       ? toggle.classList.add("active")
//       : toggle.classList.remove("active");
//     activating
//       ? target.classList.add("active")
//       : target.classList.remove("active");
//     // Add an attribute to body for clever stylages
//     document.body.setAttribute(
//       "data-tt-toggle-target-active",
//       activating ? targetSelector : ""
//     );
//   } else {
//     console.error("No toggle target element found for", targetSelector);
//   }
// };
// const findToggle = ({ e, attribute }: { e: any; attribute: any }) =>
//   e.target.closest(`[${attribute}]`)
//     ? e.target.closest(`[${attribute}]`)
//     : // If literally clicking the target selector, but unlikely (e.g. span within)
//     e.target.getAttribute(attribute)
//     ? e.target
//     : null;
// const stoppyMcStopFace = ({ e, attribute }: { e: any; attribute: any }) => {
//   let toggle = findToggle({ e, attribute });
//   if (toggle) {
//     // Clicking the toggle button
//     e.preventDefault();
//   }
//   // Should then also propagate and run clickyMcClickFace
// };
// // Clicking anywhere, with touch or mousedown
// interface ClickyMcClickFace {
//   e: any;
//   attribute: string;
//   toggleSetAttribute: string;
//   focusAttribute: string;
//   blurAttribute: string;
//   untoggleAttribute: string;
// }
// const clickyMcClickFace = ({
//   e,
//   attribute,
//   toggleSetAttribute,
//   focusAttribute,
//   blurAttribute,
//   untoggleAttribute,
// }: ClickyMcClickFace) => {
//   let toggle = findToggle({ e, attribute });
//   if (toggle) {
//     // Clicking the toggle button
//     e.preventDefault();
//     e.stopPropagation();
//     e.stopImmediatePropagation();
//     if (toggle.classList.length && toggle.classList.contains("active")) {
//       // Previously actived, so de-activate stuff
//       deactivate({
//         toggle,
//         attribute,
//       });
//     } else {
//       // Is it part of a toggle set?
//       if (toggle.getAttribute(toggleSetAttribute)) {
//         getToggles(
//           `${toggleSetAttribute}="${toggle.getAttribute(toggleSetAttribute)}"`
//         ).forEach((t) => {
//           // If so, close all the other things!
//           if (t !== toggle) {
//             deactivate({
//               toggle: t,
//               attribute,
//             });
//           }
//         });
//       }
//       // Activate all the thing!
//       activate({
//         toggle,
//         attribute,
//       });
//       // Optionally focus on an element within
//       if (toggle.getAttribute(focusAttribute)) {
//         let focus = document.querySelector(toggle.getAttribute(focusAttribute));
//         // console.log(toggle.getAttribute(focusAttribute));
//         // console.log(focus);
//         setTimeout(() => {
//           focus && focus.focus();
//         }, 250);
//       }
//     }
//   } else if (clickingUntoggle(e.target, untoggleAttribute)) {
//     console.log("untoggle click");
//   } else if (clickingWithinToggleTarget(e.target, attribute)) {
//     // Chill
//   } else if (e.target.id && e.target.id.includes("lpform")) {
//     // Last bloody pass
//   } else {
//     // Clicking anywhere else - blur everything
//     if (
//       // I'm not sure i've considered this right.. I mean
//       // data-tt-blur is on the toggle button but we're considering clicks elsewhere.. so.. how do we get that?
//       // This is a point to nest dev in poject
//       !(blurAttribute && blurAttribute === "false")
//     ) {
//       getToggles(attribute).forEach((toggle) => {
//         deactivate({
//           toggle,
//           attribute,
//         });
//       });
//     }
//   }
// };
// const activate = (_: any) => setActivation(_, true);
// const deactivate = (_: any) => setActivation(_, false);
// export const toggleTargets = ({
//   attribute,
//   toggleSetAttribute,
//   blurAttribute,
//   focusAttribute,
//   untoggleAttribute,
// }: ClickyMcClickFace) => {
//   if (getToggles(attribute)) {
//     // Has to be mousedown not click, as click actually fires on mouseup
//     // which is a problem if, say you highlight your email address in login drop and mouseup away from the drop, it'll blur.
//     //
//     // Can't really target touchstart, or it fires twice and I can't stop it.. but it appears to work on touch devices (Android at least)
//     document.addEventListener(
//       "mousedown",
//       (e) => {
//         clickyMcClickFace({
//           e,
//           attribute,
//           toggleSetAttribute,
//           focusAttribute,
//           blurAttribute,
//           untoggleAttribute,
//         });
//       },
//       false
//     );
//     // But, that said, let's also hook into the click event just for the sake of preventing default (scrolling page to the top and messing with react routes)
//     document.addEventListener("click", (e) => {
//       stoppyMcStopFace({ e, attribute });
//       // return false;
//     });
//   }
// };
// export const toggleCloseSet = ({
//   attribute,
//   setAttribute,
// }: {
//   attribute: any;
//   setAttribute: any;
// }) => {
//   getToggles(setAttribute).forEach((toggle) => {
//     deactivate({
//       toggle,
//       attribute,
//     });
//   });
// };
