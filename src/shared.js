import ESM from "./constant/esm.js"

import binding from "./binding.js"
import encodeId from "./util/encode-id.js"
import satisfies from "./util/satisfies.js"
import setDeferred from "./util/set-deferred.js"
import setGetter from "./util/set-getter.js"
import setSetter from "./util/set-setter.js"

const {
  PKG_PREFIX
} = ESM

let shared

if (__shared__) {
  shared = __shared__
} else {
  const fastPath = { __proto__: null }
  const utilBinding = { __proto__: null }
  const { versions } = process

  const support = {
    __proto__: null,
    wasm: typeof WebAssembly === "object" && WebAssembly !== null
  }

  const symbol = {
    __proto__: null,
    _compile: Symbol.for(PKG_PREFIX + ":module._compile"),
    mjs: Symbol.for(PKG_PREFIX + ':Module._extensions[".mjs"]'),
    package: Symbol.for(PKG_PREFIX + ":package"),
    realGetProxyDetails: Symbol.for(PKG_PREFIX + ":realGetProxyDetails"),
    realRequire: Symbol.for(PKG_PREFIX + ":realRequire"),
    wrapper: Symbol.for(PKG_PREFIX + ":wrapper")
  }

  shared = {
    __proto__: null,
    binding,
    entry: {
      __proto__: null,
      cache: new WeakMap,
      skipExports: { __proto__: null }
    },
    env: {
      __proto__: null,
      win32: process.platform === "win32"
    },
    fastPath,
    inited: false,
    memoize: {
      __proto__: null,
      cjsResolveFilename: { __proto__: null },
      esmResolveFilename: { __proto__: null },
      findPath: { __proto__: null },
      getProxyDetails: new WeakMap,
      maskFunction: new WeakMap,
      maxSatisfying: { __proto__: null },
      parseURL: { __proto__: null },
      proxyExports: new WeakMap,
      readPackage: { __proto__: null },
      satisfies: { __proto__: null },
      shimFunctionPrototypeToString: new WeakMap,
      shimProcessBindingUtilGetProxyDetails: new WeakMap,
      unwrapProxy: new WeakMap
    },
    module: { __proto__: null },
    package: {
      __proto__: null,
      cache: { __proto__: null },
      default: null,
      dir: { __proto__: null },
      root: { __proto__: null }
    },
    pendingMetas: { __proto__: null },
    pendingWrites: { __proto__: null },
    process: {
      __proto__: null,
      dlopen: process.dlopen,
      pid: process.pid,
      release: {
        __proto__: null,
        name: process.release.name
      },
      version: process.version.replace(/[^\d.]/g, ""),
      versions: {
        __proto__: null,
        chakracore: versions.chakracore,
        v8: versions.v8
      }
    },
    safeContext: Function("return this")(),
    support,
    symbol,
    unsafeContext: global,
    utilBinding
  }

  setDeferred(shared, "customInspectKey", () => {
    const customInspectSymbol = symbol.customInspect

    return typeof customInspectSymbol === "symbol"
      ? customInspectSymbol
      : "inspect"
  })

  setDeferred(shared, "runtimeName", () =>
    encodeId(
      "_" +
      shared.module.safeCrypto.createHash("md5")
        .update(Date.now().toString())
        .digest("hex")
        .slice(0, 3)
    )
  )

  setDeferred(fastPath, "readFile", () =>
    support.internalModuleReadFile
  )

  setDeferred(fastPath, "readFileFast", () =>
    support.internalModuleReadJSON ||
      support.internalModuleReadFile
  )

  setDeferred(fastPath, "stat", () =>
    typeof binding.fs.internalModuleStat === "function"
  )

  setDeferred(support, "await", () => {
    try {
      Function("async()=>await 1")()
      return true
    } catch (e) {}

    return false
  })

  setDeferred(support, "getProxyDetails", () =>
    typeof binding.util.getProxyDetails === "function"
  )

  setGetter(support, "inspectProxies", () => {
    support.inspectProxies = false

    const proxy = new Proxy({ __proto__: null }, {
      __proto__: null,
      [PKG_PREFIX]: 1
    })

    const inspected = shared.module.safeUtil.inspect(proxy, {
      __proto__: null,
      showProxy: true
    })

    return support.inspectProxies =
      inspected.startsWith("Proxy") &&
      inspected.indexOf(PKG_PREFIX) !== -1
  })

  setSetter(support, "inspectProxies", (value) => {
    Reflect.defineProperty(support, "inspectProxies", {
      __proto__: null,
      configurable: true,
      enumerable: true,
      value,
      writable: true
    })
  })

  setDeferred(support, "internalModuleReadFile", () =>
    typeof binding.fs.internalModuleReadFile === "function"
  )

  setDeferred(support, "internalModuleReadJSON", () =>
    typeof binding.fs.internalModuleReadJSON === "function"
  )

  setDeferred(support, "internalModuleReadJSON", () => {
    const { types } = shared.module.safeUtil

    return typeof (types && types.isProxy) === "function"
  })

  setDeferred(support, "proxiedClasses", () => {
    class A {}

    Reflect.setPrototypeOf(A.prototype, null)

    const proxy = new Proxy(A, { __proto__: null })

    class B extends proxy {
      b() {}
    }

    Reflect.setPrototypeOf(B.prototype, null)

    return new B().b !== void 0
  })

  setDeferred(support, "proxiedFunctions", () =>
    support.proxiedClasses &&
      support.proxiedFunctionToStringTag
  )

  setDeferred(support, "proxiedFunctionToStringTag", () => {
    const { toString } = Object.prototype
    const proxy = new Proxy(toString, { __proto__: null })

    return toString.call(proxy) === "[object Function]"
  })

  setDeferred(support, "replShowProxy", () =>
    satisfies(shared.process.version, ">=10")
  )

  setDeferred(support, "safeGetEnv", () =>
    typeof binding.util.safeGetenv === "function"
  )

  setDeferred(support, "safeToString", () =>
    typeof binding.util.safeToString === "function"
  )

  setDeferred(support, "setHiddenValue", () =>
    typeof binding.util.setHiddenValue === "function"
  )

  setDeferred(symbol, "customInspect", () =>
    shared.module.safeUtil.inspect.custom
  )

  setDeferred(utilBinding, "arrowSymbol", () => {
    return satisfies(shared.process.version, "<7.0.0")
      ? "node:arrowMessage"
      : binding.util.arrow_message_private_symbol
  })

  setDeferred(utilBinding, "decoratedSymbol", () => {
    return satisfies(shared.process.version, "<7.0.0")
      ? "node:decorated"
      : binding.util.decorated_private_symbol
  })

  setDeferred(utilBinding, "hiddenKeyType", () =>
    satisfies(shared.process.version, "<7.0.0")
      ? "string"
      : typeof utilBinding.arrowSymbol
  )
}

export default shared
