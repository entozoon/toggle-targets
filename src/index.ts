interface Set {
  id: string;
  toggles: [HTMLElement?];
  targets: [HTMLElement?];
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
      sets[i].toggles.push(item as HTMLElement);
    }
    // Collect the target elements too JIC
    if (item.getAttribute("data-tt-target")) {
      sets[i].targets.push(item as HTMLElement);
    }
  });
  // If we detect a data-tt-blur let's assume they all are for ease
  sets = sets.map((s) => {
    // Got a sneaking suspicion that IE11 won't notice a data attr without a value
    // Update: crazily enough, it's fine!
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
      s.handleAnyOldClick(e);
    });
  });
};
export class ToggleSet {
  // Infuriating that I have to write the interface out again
  // It seems like TS doesn't current do anything with implements concept
  // Otherwise I'd have an interface that extends Set, and then implement it
  id: string;
  toggles: [HTMLElement?];
  targets: [HTMLElement?];
  blur: boolean;
  constructor(set: Set) {
    // this.toggles = set.toggles;
    Object.assign(this, set);
  }
  handleAnyOldClick(e: Event) {
    const toggleClicked = this.toggles.find((t) => t == e.target);
    if (toggleClicked) {
      // This set's toggle was clicked!
      e.preventDefault();
      e.stopPropagation();
      e.stopImmediatePropagation();
      // Find the target item, specifically within this set
      // (so the data-tt-target values don't have to be unique!)
      const dataToggle = toggleClicked.getAttribute("data-tt-toggle");
      const target = this.targets.find((t) => {
        return t.getAttribute("data-tt-target") == dataToggle;
      });
      const notTargets = this.targets.filter((t) => {
        return t.getAttribute("data-tt-target") != dataToggle;
      });
      // Is the target already revealed? In which case unreveal
      if (target.getAttribute("hidden") == null) {
        target && target.setAttribute("hidden", "");
      } else {
        // Reveal its target item
        target && target.removeAttribute("hidden");
        // Unreveal the others
        notTargets &&
          notTargets.forEach((n) => {
            n.setAttribute("hidden", "");
          });
        // Focus any elements within, if necessary
        const focus = target.querySelector("[data-tt-focus]") as HTMLElement;
        if (focus) {
          setTimeout(() => {
            focus.focus();
          }, 250); // JIC
        }
      }
      return;
    }
    if (
      // We're not clicking a toggle and it's set to blur
      (this.blur &&
        // So unless we're clicking within the target..
        !this.targets.find((t) => t.contains(e.target as HTMLElement))) ||
      // Oh, or if clicking an untoggle element!
      (this.targets.find((t) => t.contains(e.target as HTMLElement)) &&
        (e.target as HTMLElement).getAttribute("data-tt-untoggle") != null)
      // Might have to stopPropagation with this but not sure ^
    ) {
      // Hide all targets
      this.targets.forEach((t) => {
        t.setAttribute("hidden", "");
      });
    }
  }
}
