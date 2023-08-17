"use strict";
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ToggleSet = exports.isWithinAnyToggle = exports.toggleIsShown = exports.toggleShow = exports.toggleHideAll = exports.toggleHide = exports.initToggleTargets = void 0;
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
    }, false);
    if (toggleSets.length) {
        document.addEventListener("click", function (e) {
            stoppyMcStopFace({ e: e, toggleSets: toggleSets });
        });
    }
    return toggleSets;
};
exports.initToggleTargets = initToggleTargets;
var stoppyMcStopFace = function (_a) {
    var e = _a.e, toggleSets = _a.toggleSets;
    if (exports.isWithinAnyToggle(e.target, toggleSets.map(function (s) { return s.toggles; }).reduce(function (a, b) { return __spreadArray(__spreadArray([], __read(a)), __read(b)); }))) {
        e.preventDefault();
    }
};
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
var isWithinAnyToggle = function (element, toggles) { return toggles.find(function (t) { return t == element || t.contains(element); }); };
exports.isWithinAnyToggle = isWithinAnyToggle;
var ToggleSet = (function () {
    function ToggleSet(set) {
        Object.assign(this, set);
    }
    ToggleSet.prototype.handleAnyOldClick = function (e) {
        if (!this.toggles.length)
            return;
        var toggleClicked = exports.isWithinAnyToggle(e.target, this.toggles);
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
