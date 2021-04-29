"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ToggleSet = exports.toggleIsShown = exports.toggleShow = exports.toggleHideAll = exports.toggleHide = exports.initToggleTargets = void 0;
var initToggleTargets = function () {
    var sets = [];
    var setItems = document.querySelectorAll("[data-tt-set]");
    if (!setItems)
        return;
    setItems.forEach(function (item) {
        var id = item.getAttribute("data-tt-set");
        if (!id)
            return console.error("Toggle targets all need a data-tt-set");
        var i = sets.findIndex(function (s) { return s.id == id; });
        i = i >= 0 ? i : sets.length;
        if (!sets[i])
            sets[i] = { id: id, toggles: [], targets: [], blur: false };
        if (item.getAttribute("data-tt-toggle")) {
            sets[i].toggles.push(item);
        }
        if (item.getAttribute("data-tt-target")) {
            sets[i].targets.push(item);
        }
    });
    sets = sets.map(function (s) {
        s.blur = s.targets.some(function (t) { return t.getAttribute("data-tt-blur") != null; });
        return s;
    });
    var toggleSets = sets.map(function (s) { return new ToggleSet(s); });
    document.addEventListener("mousedown", function (e) {
        toggleSets.forEach(function (s) {
            s.handleAnyOldClick(e);
        });
    });
    return toggleSets;
};
exports.initToggleTargets = initToggleTargets;
var toggleHide = function (target) {
    target.setAttribute("hidden", "");
};
exports.toggleHide = toggleHide;
var toggleHideAll = function (targets) {
    targets.forEach(function (t) {
        exports.toggleHide(t);
    });
};
exports.toggleHideAll = toggleHideAll;
var toggleShow = function (target) {
    target.removeAttribute("hidden");
};
exports.toggleShow = toggleShow;
var toggleIsShown = function (target) {
    return target.getAttribute("hidden") == null;
};
exports.toggleIsShown = toggleIsShown;
var ToggleSet = (function () {
    function ToggleSet(set) {
        Object.assign(this, set);
    }
    ToggleSet.prototype.handleAnyOldClick = function (e) {
        var toggleClicked = this.toggles.find(function (t) { return t == e.target || t.contains(e.target); });
        if (toggleClicked) {
            e.preventDefault();
            e.stopPropagation();
            e.stopImmediatePropagation();
            var dataToggle_1 = toggleClicked.getAttribute("data-tt-toggle");
            var target = this.targets.find(function (t) {
                return t.getAttribute("data-tt-target") == dataToggle_1;
            });
            var notTargets = this.targets.filter(function (t) {
                return t.getAttribute("data-tt-target") != dataToggle_1;
            });
            if (exports.toggleIsShown(target)) {
                target && exports.toggleHide(target);
            }
            else {
                target && exports.toggleShow(target);
                notTargets && exports.toggleHideAll(notTargets);
                var focus_1 = target.querySelector("[data-tt-focus]");
                if (focus_1) {
                    setTimeout(function () {
                        focus_1.focus();
                    }, 250);
                }
            }
            return false;
        }
        if (this.blur &&
            !this.targets.find(function (t) { return t.contains(e.target); })) {
            exports.toggleHideAll(this.targets);
        }
        if (e.target.getAttribute("data-tt-untoggle") != null &&
            this.targets.find(function (t) { return t.contains(e.target); })) {
            e.preventDefault();
            e.stopPropagation();
            e.stopImmediatePropagation();
            var parentTarget = e.target.closest("[data-tt-target]");
            parentTarget && exports.toggleHide(parentTarget);
            return false;
        }
    };
    return ToggleSet;
}());
exports.ToggleSet = ToggleSet;
