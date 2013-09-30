/*jslint plusplus: true, devel: true, nomen: true, vars: true, node: true, indent: 4, maxerr: 50 */

"use strict";

var count = 100000,
    items = [],
    i;

for (i = 0; i < count; i++) {
    items.push("Item " + i);
}

i = 0;
function next(callback) {
    process.nextTick(function () {
        if (i < count) {
            callback(items[i++]);
        }
    });
}

function each(callback) {
    next(callback);
    each(callback);
}


