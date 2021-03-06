import "hard-rejection/register"
import "./mocha.js"
import resetState from "./reset-state.js"

import "./cache-tests.js"
import "./compiler-tests.mjs"
import "./builtin-modules.mjs"
import "./dynamic-import-tests.mjs"
import "./export-tests.mjs"
import "./file-extension-tests.js"
import "./import-tests.js"
import "./output-tests.mjs"
import "./setter-tests.js"
import "./top-level-await-tests.js"
import "./url-tests.mjs"
import "./wasm-tests.js"
import "./misc-tests.js"
import "./check-hook-tests.mjs"
import "./eval-hook-tests.mjs"
import "./cli-hook-tests.mjs"
import "./main-hook-tests.mjs"
import "./require-hook-tests.js"
import "./repl-hook-tests.mjs"
import "./scenario-tests.mjs"
import "./test262.mjs"

beforeEach(resetState)
