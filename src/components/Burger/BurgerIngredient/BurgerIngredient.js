"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var BurgerIngredient_module_css_1 = __importDefault(require("./BurgerIngredient.module.css"));
var BurgerIngredient = function (_a) {
    var type = _a.type;
    return (react_1.default.createElement("img", { src: require("../../../assets/burger-ingredients/" + type + ".svg"), className: BurgerIngredient_module_css_1.default.BurgerIngredients, alt: "burger-ingredients" }));
};
exports.default = BurgerIngredient;
