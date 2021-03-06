// #region Import Directives
define(["require", "exports", "jquery", "knockout"], function (require, exports, jquery, knockout) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    // #endregion
    /**
     * Represents a binding handler for constraints on text input.
     */
    knockout.bindingHandlers["inputConstraint"] = {
        /**
         * Initializes the bindings for the input that this binding is used on.
         * @param {any} element The DOM element involved in this binding. Should be a text input.
         * @param {() => any} valueAccessor A JavaScript function that you can call to get the current model property that is involved in this binding.
         * @param {KnockoutAllBindingsAccessor} allBindingsAccessor A JavaScript object that you can use to access all the model values bound to this DOM element.
         */
        init: function (element, valueAccessor, allBindingsAccessor) {
            // Retrieves the options from the parameter of the binding
            var options = knockout.utils.unwrapObservable(valueAccessor());
            // Prevents input of invalid characters
            if (element.tagName.toLowerCase() == "input") {
                jquery(element).keydown(function (e) {
                    // Allows backspace, delete, tab, escape, and enter
                    if (jquery.inArray(e.keyCode, [46, 8, 9, 27, 13]) !== -1 ||
                        // Allows Ctrl+A
                        (e.keyCode == 65 && e.ctrlKey === true) ||
                        // Allows Ctrl+C
                        (e.keyCode == 67 && e.ctrlKey === true) ||
                        // Allows Ctrl+X
                        (e.keyCode == 88 && e.ctrlKey === true) ||
                        // Allows home, end, left, right
                        (e.keyCode && e.keyCode >= 35 && e.keyCode <= 39)) {
                        // Returns as this input is valid
                        return;
                    }
                    // Checks whether numeric values should be valid
                    if (!!options.numeric) {
                        // Allows comma, dash and period
                        if ((jquery.inArray(e.keyCode, [188, 189, 190]) !== -1) ||
                            //Allows numbers
                            (!e.shiftKey && !e.ctrlKey && !e.altKey && (e.keyCode && e.keyCode >= 48 && e.keyCode <= 57)) ||
                            // Allows numpad numbers
                            (e.keyCode && e.keyCode >= 96 && e.keyCode <= 105)) {
                            // Returns as this input is valid
                            return;
                        }
                    }
                    // Checks whether literal values should be valid
                    if (!!options.literal) {
                        // Allows anything but numeric values
                        if ((e.shiftKey || e.ctrlKey || e.altKey || (e.keyCode && (e.keyCode < 48 || e.keyCode > 57))) &&
                            // Allows anything but numeric values
                            (e.keyCode && (e.keyCode < 96 || e.keyCode > 105))) {
                            // Returns as this input is valid
                            return;
                        }
                    }
                    // Prevents the default input
                    if (!!options.numeric || !!options.literal) {
                        e.preventDefault();
                    }
                });
                jquery(element).blur(function (evt) {
                    // Capitalizes the input
                    if (!!options.capitalize && jquery(element).val().length > 0) {
                        jquery(element).val(jquery(element).val().charAt(0).toUpperCase() + jquery(element).val().slice(1)).change();
                    }
                    // Formats the input
                    if (!!options.upperCase && jquery(element).val().length > 0) {
                        jquery(element).val(jquery(element).val().toUpperCase()).change();
                    }
                    if (!!options.lowerCase && jquery(element).val().length > 0) {
                        jquery(element).val(jquery(element).val().toLowerCase()).change();
                    }
                });
            }
        }
    };
});
