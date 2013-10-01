/*jslint plusplus: true, devel: true, nomen: true, vars: true, node: true, indent: 4, maxerr: 50 */
/*global setImmediate */

"use strict";

var readline    = require("readline"),
    rl          = readline.createInterface(process.stdin, process.stdout),
    count       = 1000,
    items       = [],
    i;

for (i = 0; i < count; i++) {
    items.push("Item " + i);
}

console.log("Items loaded");

function Cursor(items) {
    this.items = items;
    this.current = 0;
}

Cursor.prototype._next = function (callback) {
    var that = this;
    setTimeout(function () {
        if (that.current < that.items.length) {
            callback(that.items[that.current++]);
        } else {
            callback(null);
        }
    }, 30);
};

Cursor.prototype.each = function (callback) {
    var that = this;
    this._next(function (item) {
        callback(item);
        if (item) {
            setImmediate(function () {
                that.each(callback);
            });
        }
    });
};

function quit() {
    console.log("Have a great day!");
    process.exit(0);
}



rl.setPrompt("> ");
rl.prompt();

rl.on("line", function (line) {
    line = line.trim();
    if (line === "quit") {
        quit();
    } else if (line === "iterate") {
        var count = 0,
            cursor = new Cursor(items);

        cursor.each(function (item) {
            count++;
            //console.log(count);
            if (!item) {
                console.log("Iterations: " + count);
            }
        });
    } else {
        console.log("unknown command");
        rl.prompt();
    }
}).on("close", function () {
    quit();
});
