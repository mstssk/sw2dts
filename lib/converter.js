"use strict";

const dtsgen = require("dtsgenerator").default;

module.exports = function (data, callback) {
	let jsonSchemas = [];
	for (let title in data.definitions) {
		let schema = data.definitions[title];
		fixRef(schema);
		schema.id = title;
		jsonSchemas.push(schema);
	}
	dtsgen(jsonSchemas).then((model => {
		callback(model);
	})).catch(err => {
		throw err;
	});
}

function fixRef(obj) {
	for (let key in obj) {
		if (key === "$ref") {
			obj["$ref"] = obj["$ref"].split("/").pop();
		} else if (typeof obj[key] === "object") {
			fixRef(obj[key]);
		}
	}
}