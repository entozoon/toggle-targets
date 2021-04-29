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
  return toggleSets;
};
export const toggleHide = (target: HTMLElement): void => {
  target.setAttribute("hidden", "");
};
export const toggleHideAll = (targets: HTMLElement[]): void => {
  targets.forEach((t) => {
    toggleHide(t);
  });
};
export const toggleShow = (target: HTMLElement): void => {
  target.removeAttribute("hidden");
};
export const toggleIsShown = (target: HTMLElement): boolean =>
  target.getAttribute("hidden") == null;
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
    // Find one of our known toggles that either is the target clicked, or contains the target
    const toggleClicked = this.toggles.find(
      (t) => t == e.target || t.contains(e.target as HTMLElement)
    );
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
      if (toggleIsShown(target)) {
        target && toggleHide(target);
      } else {
        // Reveal its target item
        target && toggleShow(target);
        // Unreveal the others
        notTargets && toggleHideAll(notTargets);
        // Focus any elements within, if necessary
        const focus = target.querySelector("[data-tt-focus]") as HTMLElement;
        if (focus) {
          setTimeout(() => {
            focus.focus();
          }, 250); // JIC
        }
      }
      return false;
    }
    if (
      // We're not clicking a toggle and it's set to blur
      this.blur &&
      // So unless we're clicking within the target..
      !this.targets.find((t) => t.contains(e.target as HTMLElement))
    ) {
      toggleHideAll(this.targets);
    }
    // Oh, or if clicking an untoggle element!
    if (
      // It's a toggle element (doesn't currently handle nested clicks)
      (e.target as HTMLElement).getAttribute("data-tt-untoggle") != null &&
      // If it's within one of the targets..
      this.targets.find((t) => t.contains(e.target as HTMLElement))
    ) {
      e.preventDefault();
      e.stopPropagation();
      e.stopImmediatePropagation();
      // Figure out exactly which target we're inside (as they can be nested)
      // super annoying, as I've managed to avoid using Element.closest so far
      let parentTarget = (e.target as HTMLElement).closest("[data-tt-target]");
      parentTarget && toggleHide(parentTarget as HTMLElement);
      return false;
    }
  }
}
