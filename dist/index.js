"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initToggleTargets = void 0;
var initToggleTargets = function () {
    var sets = {};
    var setItems = document.querySelectorAll("[data-toggle-set]");
    if (!setItems)
        return;
    setItems.forEach(function (i) {
        var setAttribute = i.getAttribute("data-toggle-set");
        if (!setAttribute)
            return console.error("Toggle targets all need a data-toggle-set");
        if (!sets[setAttribute])
            sets[setAttribute] = {};
        if (i.getAttribute("data-toggle")) {
            if (!sets[setAttribute].toggles)
                sets[setAttribute].toggles = [];
            sets[setAttribute].toggles.push(i);
        }
        if (i.getAttribute("data-target")) {
            if (!sets[setAttribute].targets)
                sets[setAttribute].targets = [];
            sets[setAttribute].targets.push(i);
        }
    });
    sets = sets.map(function (s) {
        s.blur = s.targets.some(function (t) { return t.getAttribute("data-toggle-blur"); });
        return s;
    });
    console.log(sets);
};
exports.initToggleTargets = initToggleTargets;
