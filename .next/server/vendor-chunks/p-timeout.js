"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/p-timeout";
exports.ids = ["vendor-chunks/p-timeout"];
exports.modules = {

/***/ "(rsc)/./node_modules/p-timeout/index.js":
/*!*****************************************!*\
  !*** ./node_modules/p-timeout/index.js ***!
  \*****************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\nconst pFinally = __webpack_require__(/*! p-finally */ \"(rsc)/./node_modules/p-finally/index.js\");\nclass TimeoutError extends Error {\n    constructor(message){\n        super(message);\n        this.name = \"TimeoutError\";\n    }\n}\nconst pTimeout = (promise, milliseconds, fallback)=>new Promise((resolve, reject)=>{\n        if (typeof milliseconds !== \"number\" || milliseconds < 0) {\n            throw new TypeError(\"Expected `milliseconds` to be a positive number\");\n        }\n        if (milliseconds === Infinity) {\n            resolve(promise);\n            return;\n        }\n        const timer = setTimeout(()=>{\n            if (typeof fallback === \"function\") {\n                try {\n                    resolve(fallback());\n                } catch (error) {\n                    reject(error);\n                }\n                return;\n            }\n            const message = typeof fallback === \"string\" ? fallback : `Promise timed out after ${milliseconds} milliseconds`;\n            const timeoutError = fallback instanceof Error ? fallback : new TimeoutError(message);\n            if (typeof promise.cancel === \"function\") {\n                promise.cancel();\n            }\n            reject(timeoutError);\n        }, milliseconds);\n        // TODO: Use native `finally` keyword when targeting Node.js 10\n        pFinally(// eslint-disable-next-line promise/prefer-await-to-then\n        promise.then(resolve, reject), ()=>{\n            clearTimeout(timer);\n        });\n    });\nmodule.exports = pTimeout;\n// TODO: Remove this for the next major release\nmodule.exports[\"default\"] = pTimeout;\nmodule.exports.TimeoutError = TimeoutError;\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvcC10aW1lb3V0L2luZGV4LmpzIiwibWFwcGluZ3MiOiJBQUFBO0FBRUEsTUFBTUEsV0FBV0MsbUJBQU9BLENBQUM7QUFFekIsTUFBTUMscUJBQXFCQztJQUMxQkMsWUFBWUMsT0FBTyxDQUFFO1FBQ3BCLEtBQUssQ0FBQ0E7UUFDTixJQUFJLENBQUNDLElBQUksR0FBRztJQUNiO0FBQ0Q7QUFFQSxNQUFNQyxXQUFXLENBQUNDLFNBQVNDLGNBQWNDLFdBQWEsSUFBSUMsUUFBUSxDQUFDQyxTQUFTQztRQUMzRSxJQUFJLE9BQU9KLGlCQUFpQixZQUFZQSxlQUFlLEdBQUc7WUFDekQsTUFBTSxJQUFJSyxVQUFVO1FBQ3JCO1FBRUEsSUFBSUwsaUJBQWlCTSxVQUFVO1lBQzlCSCxRQUFRSjtZQUNSO1FBQ0Q7UUFFQSxNQUFNUSxRQUFRQyxXQUFXO1lBQ3hCLElBQUksT0FBT1AsYUFBYSxZQUFZO2dCQUNuQyxJQUFJO29CQUNIRSxRQUFRRjtnQkFDVCxFQUFFLE9BQU9RLE9BQU87b0JBQ2ZMLE9BQU9LO2dCQUNSO2dCQUVBO1lBQ0Q7WUFFQSxNQUFNYixVQUFVLE9BQU9LLGFBQWEsV0FBV0EsV0FBVyxDQUFDLHdCQUF3QixFQUFFRCxhQUFhLGFBQWEsQ0FBQztZQUNoSCxNQUFNVSxlQUFlVCxvQkFBb0JQLFFBQVFPLFdBQVcsSUFBSVIsYUFBYUc7WUFFN0UsSUFBSSxPQUFPRyxRQUFRWSxNQUFNLEtBQUssWUFBWTtnQkFDekNaLFFBQVFZLE1BQU07WUFDZjtZQUVBUCxPQUFPTTtRQUNSLEdBQUdWO1FBRUgsK0RBQStEO1FBQy9EVCxTQUNDLHdEQUF3RDtRQUN4RFEsUUFBUWEsSUFBSSxDQUFDVCxTQUFTQyxTQUN0QjtZQUNDUyxhQUFhTjtRQUNkO0lBRUY7QUFFQU8sT0FBT0MsT0FBTyxHQUFHakI7QUFDakIsK0NBQStDO0FBQy9DZ0IseUJBQXNCLEdBQUdoQjtBQUV6QmdCLDJCQUEyQixHQUFHckIiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9haS1tYXJrZXQtcmVzZWFyY2gtYWdlbnQvLi9ub2RlX21vZHVsZXMvcC10aW1lb3V0L2luZGV4LmpzPzdhYWQiXSwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuXG5jb25zdCBwRmluYWxseSA9IHJlcXVpcmUoJ3AtZmluYWxseScpO1xuXG5jbGFzcyBUaW1lb3V0RXJyb3IgZXh0ZW5kcyBFcnJvciB7XG5cdGNvbnN0cnVjdG9yKG1lc3NhZ2UpIHtcblx0XHRzdXBlcihtZXNzYWdlKTtcblx0XHR0aGlzLm5hbWUgPSAnVGltZW91dEVycm9yJztcblx0fVxufVxuXG5jb25zdCBwVGltZW91dCA9IChwcm9taXNlLCBtaWxsaXNlY29uZHMsIGZhbGxiYWNrKSA9PiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG5cdGlmICh0eXBlb2YgbWlsbGlzZWNvbmRzICE9PSAnbnVtYmVyJyB8fCBtaWxsaXNlY29uZHMgPCAwKSB7XG5cdFx0dGhyb3cgbmV3IFR5cGVFcnJvcignRXhwZWN0ZWQgYG1pbGxpc2Vjb25kc2AgdG8gYmUgYSBwb3NpdGl2ZSBudW1iZXInKTtcblx0fVxuXG5cdGlmIChtaWxsaXNlY29uZHMgPT09IEluZmluaXR5KSB7XG5cdFx0cmVzb2x2ZShwcm9taXNlKTtcblx0XHRyZXR1cm47XG5cdH1cblxuXHRjb25zdCB0aW1lciA9IHNldFRpbWVvdXQoKCkgPT4ge1xuXHRcdGlmICh0eXBlb2YgZmFsbGJhY2sgPT09ICdmdW5jdGlvbicpIHtcblx0XHRcdHRyeSB7XG5cdFx0XHRcdHJlc29sdmUoZmFsbGJhY2soKSk7XG5cdFx0XHR9IGNhdGNoIChlcnJvcikge1xuXHRcdFx0XHRyZWplY3QoZXJyb3IpO1xuXHRcdFx0fVxuXG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXG5cdFx0Y29uc3QgbWVzc2FnZSA9IHR5cGVvZiBmYWxsYmFjayA9PT0gJ3N0cmluZycgPyBmYWxsYmFjayA6IGBQcm9taXNlIHRpbWVkIG91dCBhZnRlciAke21pbGxpc2Vjb25kc30gbWlsbGlzZWNvbmRzYDtcblx0XHRjb25zdCB0aW1lb3V0RXJyb3IgPSBmYWxsYmFjayBpbnN0YW5jZW9mIEVycm9yID8gZmFsbGJhY2sgOiBuZXcgVGltZW91dEVycm9yKG1lc3NhZ2UpO1xuXG5cdFx0aWYgKHR5cGVvZiBwcm9taXNlLmNhbmNlbCA9PT0gJ2Z1bmN0aW9uJykge1xuXHRcdFx0cHJvbWlzZS5jYW5jZWwoKTtcblx0XHR9XG5cblx0XHRyZWplY3QodGltZW91dEVycm9yKTtcblx0fSwgbWlsbGlzZWNvbmRzKTtcblxuXHQvLyBUT0RPOiBVc2UgbmF0aXZlIGBmaW5hbGx5YCBrZXl3b3JkIHdoZW4gdGFyZ2V0aW5nIE5vZGUuanMgMTBcblx0cEZpbmFsbHkoXG5cdFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHByb21pc2UvcHJlZmVyLWF3YWl0LXRvLXRoZW5cblx0XHRwcm9taXNlLnRoZW4ocmVzb2x2ZSwgcmVqZWN0KSxcblx0XHQoKSA9PiB7XG5cdFx0XHRjbGVhclRpbWVvdXQodGltZXIpO1xuXHRcdH1cblx0KTtcbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHBUaW1lb3V0O1xuLy8gVE9ETzogUmVtb3ZlIHRoaXMgZm9yIHRoZSBuZXh0IG1ham9yIHJlbGVhc2Vcbm1vZHVsZS5leHBvcnRzLmRlZmF1bHQgPSBwVGltZW91dDtcblxubW9kdWxlLmV4cG9ydHMuVGltZW91dEVycm9yID0gVGltZW91dEVycm9yO1xuIl0sIm5hbWVzIjpbInBGaW5hbGx5IiwicmVxdWlyZSIsIlRpbWVvdXRFcnJvciIsIkVycm9yIiwiY29uc3RydWN0b3IiLCJtZXNzYWdlIiwibmFtZSIsInBUaW1lb3V0IiwicHJvbWlzZSIsIm1pbGxpc2Vjb25kcyIsImZhbGxiYWNrIiwiUHJvbWlzZSIsInJlc29sdmUiLCJyZWplY3QiLCJUeXBlRXJyb3IiLCJJbmZpbml0eSIsInRpbWVyIiwic2V0VGltZW91dCIsImVycm9yIiwidGltZW91dEVycm9yIiwiY2FuY2VsIiwidGhlbiIsImNsZWFyVGltZW91dCIsIm1vZHVsZSIsImV4cG9ydHMiLCJkZWZhdWx0Il0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/p-timeout/index.js\n");

/***/ })

};
;