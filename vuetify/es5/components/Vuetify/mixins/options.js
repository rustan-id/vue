"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = options;
var OPTIONS_DEFAULTS = {
    minifyTheme: null,
    themeCache: null,
    customProperties: false,
    cspNonce: null
};
function options() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    return Object.assign({}, OPTIONS_DEFAULTS, options);
}
//# sourceMappingURL=options.js.map