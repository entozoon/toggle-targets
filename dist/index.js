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
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.toggleCloseSet = exports.toggleTargets = void 0;
var getToggles = function (attribute) {
    return document.querySelectorAll("[" + attribute + "]");
};
var clickingWithinToggleTarget = function (target, attribute) {
    return __spread(getToggles(attribute)).filter(function (t) {
        return target.closest(t.getAttribute(attribute));
    }).length
        ? true
        : false;
};
var clickingUntoggle = function (target, untoggleAttribute) {
    if (!untoggleAttribute)
        return false;
    console.log("target", target);
    console.log(target.getAttribute(untoggleAttribute));
    return untoggleAttribute && target.getAttribute(untoggleAttribute)
        ? target
        : false;
};
var getTargetFromToggle = function (toggle, attribute) {
    return document.querySelector(toggle.getAttribute(attribute));
};
var setActivation = function (params, activating) {
    var toggle = params.toggle, attribute = params.attribute;
    var target = getTargetFromToggle(toggle, attribute);
    var targetSelector = toggle.getAttribute(attribute);
    if (target) {
        activating
            ? toggle.classList.add("active")
            : toggle.classList.remove("active");
        activating
            ? target.classList.add("active")
            : target.classList.remove("active");
        document.body.setAttribute("data-toggle-target-active", activating ? targetSelector : "");
    }
    else {
        console.error("No toggle target element found for", targetSelector);
    }
};
var findToggle = function (_a) {
    var e = _a.e, attribute = _a.attribute;
    return e.target.closest("[" + attribute + "]")
        ? e.target.closest("[" + attribute + "]")
        :
            e.target.getAttribute(attribute)
                ? e.target
                : null;
};
var stoppyMcStopFace = function (_a) {
    var e = _a.e, attribute = _a.attribute;
    var toggle = findToggle({ e: e, attribute: attribute });
    if (toggle) {
        e.preventDefault();
    }
};
var clickyMcClickFace = function (_a) {
    var e = _a.e, attribute = _a.attribute, toggleSetAttribute = _a.toggleSetAttribute, focusAttribute = _a.focusAttribute, blurAttribute = _a.blurAttribute, untoggleAttribute = _a.untoggleAttribute;
    var toggle = findToggle({ e: e, attribute: attribute });
    if (toggle) {
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();
        if (toggle.classList.length && toggle.classList.contains("active")) {
            deactivate({
                toggle: toggle,
                attribute: attribute,
            });
        }
        else {
            if (toggle.getAttribute(toggleSetAttribute)) {
                getToggles(toggleSetAttribute + "=\"" + toggle.getAttribute(toggleSetAttribute) + "\"").forEach(function (t) {
                    if (t !== toggle) {
                        deactivate({
                            toggle: t,
                            attribute: attribute,
                        });
                    }
                });
            }
            activate({
                toggle: toggle,
                attribute: attribute,
            });
            if (toggle.getAttribute(focusAttribute)) {
                var focus_1 = document.querySelector(toggle.getAttribute(focusAttribute));
                setTimeout(function () {
                    focus_1 && focus_1.focus();
                }, 250);
            }
        }
    }
    else if (clickingUntoggle(e.target, untoggleAttribute)) {
        console.log("untoggle click");
    }
    else if (clickingWithinToggleTarget(e.target, attribute)) {
    }
    else if (e.target.id && e.target.id.includes("lpform")) {
    }
    else {
        if (!(toggle.getAttribute(blurAttribute) &&
            toggle.getAttribute(blurAttribute) === "false")) {
            getToggles(attribute).forEach(function (toggle) {
                deactivate({
                    toggle: toggle,
                    attribute: attribute,
                });
            });
        }
    }
};
var activate = function (_) { return setActivation(_, true); };
var deactivate = function (_) { return setActivation(_, false); };
var toggleTargets = function (_a) {
    var _b = _a.attribute, attribute = _b === void 0 ? "data-toggle-target" : _b, _c = _a.toggleSetAttribute, toggleSetAttribute = _c === void 0 ? "data-toggle-set" : _c, _d = _a.blurAttribute, blurAttribute = _d === void 0 ? "data-toggle-blur" : _d, _e = _a.focusAttribute, focusAttribute = _e === void 0 ? "data-toggle-focus" : _e, _f = _a.untoggleAttribute, untoggleAttribute = _f === void 0 ? "data-untoggle-target" : _f;
    if (getToggles(attribute)) {
        document.addEventListener("mousedown", function (e) {
            clickyMcClickFace({
                e: e,
                attribute: attribute,
                toggleSetAttribute: toggleSetAttribute,
                focusAttribute: focusAttribute,
                blurAttribute: blurAttribute,
                untoggleAttribute: untoggleAttribute,
            });
        }, false);
        document.addEventListener("click", function (e) {
            stoppyMcStopFace({ e: e, attribute: attribute });
        });
    }
};
exports.toggleTargets = toggleTargets;
var toggleCloseSet = function (_a) {
    var attribute = _a.attribute, setAttribute = _a.setAttribute;
    getToggles(setAttribute).forEach(function (toggle) {
        deactivate({
            toggle: toggle,
            attribute: attribute,
        });
    });
};
exports.toggleCloseSet = toggleCloseSet;
