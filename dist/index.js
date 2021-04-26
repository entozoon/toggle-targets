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
            s.checkForClicks(e);
        });
    });
};
exports.initToggleTargets = initToggleTargets;
var ToggleSet = (function () {
    function ToggleSet(set) {
        Object.assign(this, set);
    }
    ToggleSet.prototype.checkForClicks = function (e) {
        var toggleClicked = this.toggles.find(function (t) { return t == e.target; });
        if (toggleClicked) {
            var dataToggle_1 = toggleClicked.getAttribute("data-tt-toggle");
            var target = this.targets.find(function (t) {
                return t.getAttribute("data-tt-target") == dataToggle_1;
            });
            var notTargets = this.targets.find(function (t) {
                return t.getAttribute("data-tt-target") != dataToggle_1;
            });
            if (target.getAttribute("hidden") == null) {
                target && target.setAttribute("hidden", "");
            }
            else {
                target && target.removeAttribute("hidden");
                notTargets && notTargets.setAttribute("hidden", "");
                var focus_1 = target.querySelector("[data-tt-focus]");
                if (focus_1) {
                    setTimeout(function () {
                        focus_1.focus();
                    }, 250);
                }
            }
        }
    };
    return ToggleSet;
}());
exports.ToggleSet = ToggleSet;
