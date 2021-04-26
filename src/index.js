"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ToggleTargets = void 0;
var ToggleTargets = /** @class */ (function () {
    function ToggleTargets() {
        console.log("constructing..");
    }
    return ToggleTargets;
}());
exports.ToggleTargets = ToggleTargets;
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
//       "data-toggle-target-active",
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
//       // data-toggle-blur is on the toggle button but we're considering clicks elsewhere.. so.. how do we get that?
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
//# sourceMappingURL=index.js.map