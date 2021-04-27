"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ToggleSet = exports.initToggleTargets = void 0;
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
};
exports.initToggleTargets = initToggleTargets;
var hide = function (target) {
    target.setAttribute("hidden", "");
};
var hideAll = function (targets) {
    targets.forEach(function (t) {
        hide(t);
    });
};
var show = function (target) {
    target.removeAttribute("hidden");
};
var isShown = function (target) {
    return target.getAttribute("hidden") == null;
};
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
            if (isShown(target)) {
                target && hide(target);
            }
            else {
                target && show(target);
                notTargets && hideAll(notTargets);
                var focus_1 = target.querySelector("[data-tt-focus]");
                if (focus_1) {
                    setTimeout(function () {
                        focus_1.focus();
                    }, 250);
                }
            }
            return;
        }
        if (this.blur &&
            !this.targets.find(function (t) { return t.contains(e.target); })) {
            hideAll(this.targets);
            return;
        }
        if (e.target.getAttribute("data-tt-untoggle") != null &&
            this.targets.find(function (t) { return t.contains(e.target); })) {
            e.preventDefault();
            e.stopPropagation();
            e.stopImmediatePropagation();
            var parentTarget = e.target.closest("[data-tt-target]");
            parentTarget && hide(parentTarget);
            return;
        }
    };
    return ToggleSet;
}());
exports.ToggleSet = ToggleSet;
