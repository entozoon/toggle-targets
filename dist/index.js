"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initToggleTargets = void 0;
var initToggleTargets = function () {
    var sets = [];
    var setItems = document.querySelectorAll("[data-toggle-set]");
    if (!setItems)
        return;
    setItems.forEach(function (item) {
        var id = item.getAttribute("data-toggle-set");
        if (!id)
            return console.error("Toggle targets all need a data-toggle-set");
        var i = sets.findIndex(function (s) { return s.id == id; });
        i = i >= 0 ? i : sets.length;
        if (!sets[i])
            sets[i] = { id: id, toggles: [], targets: [] };
        if (item.getAttribute("data-toggle")) {
            sets[i].toggles.push(item);
        }
        if (item.getAttribute("data-target")) {
            sets[i].targets.push(item);
        }
    });
    console.log(sets);
};
exports.initToggleTargets = initToggleTargets;
