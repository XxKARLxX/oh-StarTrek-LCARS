let Vt = "en", Bt = {};
function qi(i, r) {
  Vt = i, Bt = r;
}
function V(i, r, n) {
  var l;
  return ((l = Bt[n ?? Vt]) == null ? void 0 : l[i]) ?? i;
}
const Ni = {
  "settings-pin.pin": "固定到侧边栏",
  "settings-pin.unpin": "取消固定",
  "settings-pin.search-icons": "搜索图标...",
  "settings-pin.no-icons-found": "未找到图标",
  "settings-pin.clear": "关闭"
}, Ai = {
  语言与地区: {
    "24小时制": 9
    // HourSystem (boolean: true/false)
  },
  主题: {
    生动风格: 52
    // EnableVibrant (number: 1/0)
  },
  编辑器: {
    自动下载网络图片: 42
    // AutoDownloadWebImages (number: 1/0)
    // 以下设置项的 AppKey 可能随版本变化，需要通过 CDP 动态发现
    // 拼写检查、紧凑标签属性、压缩图片等在当前版本中不存在
  },
  S3存储: {
    启用同步: 37
    // S3EnableSync (number: 1/0)
  }
};
function Di(i) {
  var b;
  const r = i.querySelector(".title");
  if (!r) return null;
  const n = ((b = r.textContent) == null ? void 0 : b.trim()) || "";
  if (!n) return null;
  const o = i.querySelector(".option");
  if (!o) return null;
  const l = Fi(o);
  if (!l) return null;
  const c = Mi();
  if (!c) return null;
  const m = Li();
  let w, f = 0;
  if (m)
    w = Yi(), f = Ki(w, n);
  else {
    const k = Ai[c];
    k && k[n] ? f = k[n] : (console.debug(`未知设置映射: ${c}.${n}`), f = -1);
  }
  return {
    section: c,
    title: n,
    controlType: l,
    element: i,
    isPlugin: m,
    pluginName: w,
    key: f
  };
}
function Fi(i) {
  if (i.querySelector("button.orca-switch, button.orca-switch-on"))
    return "switch";
  if (i.querySelector("button.orca-button.plain.orca-select-button"))
    return "select";
  if (i.querySelector("span.orca-input > input.orca-input-actualinput")) {
    const r = i.querySelector("input");
    return r && r.type === "color" ? "color" : "input";
  }
  return i.querySelector("div.orca-segmented") ? "segmented" : null;
}
function Mi() {
  var o, l;
  const i = document.querySelector(".orca-modal-overlay");
  if (!i) return "";
  const r = i.querySelector(".sections .item.selected");
  if (r) {
    const c = r.querySelector("span");
    if (c) return ((o = c.textContent) == null ? void 0 : o.trim()) || "";
  }
  const n = i.querySelector("section .orca-memoizedviews-active h2");
  return n && ((l = n.textContent) == null ? void 0 : l.trim()) || "";
}
function Li(i) {
  const r = document.querySelector(".orca-modal-overlay");
  if (!r) return !1;
  const n = r.querySelector(".sections .selected");
  return !!(n && n.classList.contains("plugin-item"));
}
function Yi(i) {
  var o;
  const r = document.querySelector(".orca-modal-overlay");
  if (!r) return "";
  const n = r.querySelector(".sections .plugin-item.selected span");
  return n && ((o = n.textContent) == null ? void 0 : o.trim()) || "";
}
function Ki(i, r) {
  var o;
  const n = (o = orca.state.plugins) == null ? void 0 : o[i];
  if (!(n != null && n.schema)) return "";
  for (const [l, c] of Object.entries(n.schema))
    if ((c == null ? void 0 : c.label) === r)
      return l;
  for (const [l, c] of Object.entries(n.schema))
    if (c != null && c.label && r.includes(c.label))
      return l;
  return console.debug(`插件 ${i} 的设置 "${r}" 未找到对应 key`), "";
}
function Wi(i) {
  return i.isPlugin && i.pluginName ? { type: "plugin", pluginName: i.pluginName, settingKey: String(i.key) } : { type: "app", appKey: Number(i.key) };
}
const Vi = [
  { type: "section", value: "快捷键" },
  { type: "settingName", value: "调试模式" }
];
function Ut(i, r = Vi) {
  if (i.controlType !== "switch")
    return !1;
  for (const n of r)
    switch (n.type) {
      case "controlType":
        if (i.controlType === n.value) return !1;
        break;
      case "settingName":
        if (i.title === n.value) return !1;
        break;
      case "section":
        if (i.section === n.value) return !1;
        break;
    }
  return !0;
}
let pt;
const j = /* @__PURE__ */ new Map();
let N = null;
function Bi(i) {
  pt = i;
}
function Ui(i) {
  N = i;
}
async function Ji() {
  try {
    const i = await orca.plugins.getData(pt, "pinned");
    if (i && typeof i == "string") {
      const r = JSON.parse(i);
      j.clear();
      for (const n of r)
        j.set(n.id, n);
      console.debug(`已加载 ${j.size} 个固定设置`);
    }
  } catch (i) {
    console.warn("加载固定设置失败:", i);
  }
}
async function Jt() {
  try {
    const i = Array.from(j.values());
    await orca.plugins.setData(pt, "pinned", JSON.stringify(i));
  } catch (i) {
    console.error("保存固定设置失败:", i);
  }
}
async function Gi(i) {
  j.set(i.id, i), await Jt(), N == null || N(i);
}
async function Hi(i) {
  j.delete(i) && (await Jt(), N == null || N(void 0, i));
}
function Gt() {
  return Array.from(j.values());
}
function st(i) {
  return j.get(i);
}
function Xi(i) {
  return j.has(i);
}
function Qi(i, r, n, o) {
  const l = n ? "plugin" : "app", c = n && o ? `.${o}` : "";
  return `${l}${c}.${r}`;
}
var Ht = { exports: {} };
const Zi = React;
var W = {}, Ft;
function te() {
  if (Ft) return W;
  Ft = 1;
  /**
   * @license React
   * react-jsx-runtime.development.js
   *
   * Copyright (c) Facebook, Inc. and its affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   */
  return function() {
    var i = Zi, r = Symbol.for("react.element"), n = Symbol.for("react.portal"), o = Symbol.for("react.fragment"), l = Symbol.for("react.strict_mode"), c = Symbol.for("react.profiler"), m = Symbol.for("react.provider"), w = Symbol.for("react.context"), f = Symbol.for("react.forward_ref"), b = Symbol.for("react.suspense"), k = Symbol.for("react.suspense_list"), P = Symbol.for("react.memo"), S = Symbol.for("react.lazy"), M = Symbol.for("react.offscreen"), A = Symbol.iterator, L = "@@iterator";
    function U(t) {
      if (t === null || typeof t != "object")
        return null;
      var e = A && t[A] || t[L];
      return typeof e == "function" ? e : null;
    }
    var O = i.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
    function h(t) {
      {
        for (var e = arguments.length, a = new Array(e > 1 ? e - 1 : 0), s = 1; s < e; s++)
          a[s - 1] = arguments[s];
        ti("error", t, a);
      }
    }
    function ti(t, e, a) {
      {
        var s = O.ReactDebugCurrentFrame, p = s.getStackAddendum();
        p !== "" && (e += "%s", a = a.concat([p]));
        var g = a.map(function(d) {
          return String(d);
        });
        g.unshift("Warning: " + e), Function.prototype.apply.call(console[t], console, g);
      }
    }
    var ii = !1, ei = !1, ri = !1, oi = !1, ni = !1, gt;
    gt = Symbol.for("react.module.reference");
    function ai(t) {
      return !!(typeof t == "string" || typeof t == "function" || t === o || t === c || ni || t === l || t === b || t === k || oi || t === M || ii || ei || ri || typeof t == "object" && t !== null && (t.$$typeof === S || t.$$typeof === P || t.$$typeof === m || t.$$typeof === w || t.$$typeof === f || // This needs to include all possible module reference object
      // types supported by any Flight configuration anywhere since
      // we don't know which Flight build this will end up being used
      // with.
      t.$$typeof === gt || t.getModuleId !== void 0));
    }
    function li(t, e, a) {
      var s = t.displayName;
      if (s)
        return s;
      var p = e.displayName || e.name || "";
      return p !== "" ? a + "(" + p + ")" : a;
    }
    function mt(t) {
      return t.displayName || "Context";
    }
    function z(t) {
      if (t == null)
        return null;
      if (typeof t.tag == "number" && h("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), typeof t == "function")
        return t.displayName || t.name || null;
      if (typeof t == "string")
        return t;
      switch (t) {
        case o:
          return "Fragment";
        case n:
          return "Portal";
        case c:
          return "Profiler";
        case l:
          return "StrictMode";
        case b:
          return "Suspense";
        case k:
          return "SuspenseList";
      }
      if (typeof t == "object")
        switch (t.$$typeof) {
          case w:
            var e = t;
            return mt(e) + ".Consumer";
          case m:
            var a = t;
            return mt(a._context) + ".Provider";
          case f:
            return li(t, t.render, "ForwardRef");
          case P:
            var s = t.displayName || null;
            return s !== null ? s : z(t.type) || "Memo";
          case S: {
            var p = t, g = p._payload, d = p._init;
            try {
              return z(d(g));
            } catch {
              return null;
            }
          }
        }
      return null;
    }
    var I = Object.assign, Y = 0, ht, bt, vt, yt, wt, kt, St;
    function xt() {
    }
    xt.__reactDisabledLog = !0;
    function si() {
      {
        if (Y === 0) {
          ht = console.log, bt = console.info, vt = console.warn, yt = console.error, wt = console.group, kt = console.groupCollapsed, St = console.groupEnd;
          var t = {
            configurable: !0,
            enumerable: !0,
            value: xt,
            writable: !0
          };
          Object.defineProperties(console, {
            info: t,
            log: t,
            warn: t,
            error: t,
            group: t,
            groupCollapsed: t,
            groupEnd: t
          });
        }
        Y++;
      }
    }
    function ci() {
      {
        if (Y--, Y === 0) {
          var t = {
            configurable: !0,
            enumerable: !0,
            writable: !0
          };
          Object.defineProperties(console, {
            log: I({}, t, {
              value: ht
            }),
            info: I({}, t, {
              value: bt
            }),
            warn: I({}, t, {
              value: vt
            }),
            error: I({}, t, {
              value: yt
            }),
            group: I({}, t, {
              value: wt
            }),
            groupCollapsed: I({}, t, {
              value: kt
            }),
            groupEnd: I({}, t, {
              value: St
            })
          });
        }
        Y < 0 && h("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
      }
    }
    var Z = O.ReactCurrentDispatcher, tt;
    function J(t, e, a) {
      {
        if (tt === void 0)
          try {
            throw Error();
          } catch (p) {
            var s = p.stack.trim().match(/\n( *(at )?)/);
            tt = s && s[1] || "";
          }
        return `
` + tt + t;
      }
    }
    var it = !1, G;
    {
      var fi = typeof WeakMap == "function" ? WeakMap : Map;
      G = new fi();
    }
    function Et(t, e) {
      if (!t || it)
        return "";
      {
        var a = G.get(t);
        if (a !== void 0)
          return a;
      }
      var s;
      it = !0;
      var p = Error.prepareStackTrace;
      Error.prepareStackTrace = void 0;
      var g;
      g = Z.current, Z.current = null, si();
      try {
        if (e) {
          var d = function() {
            throw Error();
          };
          if (Object.defineProperty(d.prototype, "props", {
            set: function() {
              throw Error();
            }
          }), typeof Reflect == "object" && Reflect.construct) {
            try {
              Reflect.construct(d, []);
            } catch (E) {
              s = E;
            }
            Reflect.construct(t, [], d);
          } else {
            try {
              d.call();
            } catch (E) {
              s = E;
            }
            t.call(d.prototype);
          }
        } else {
          try {
            throw Error();
          } catch (E) {
            s = E;
          }
          t();
        }
      } catch (E) {
        if (E && s && typeof E.stack == "string") {
          for (var u = E.stack.split(`
`), x = s.stack.split(`
`), v = u.length - 1, y = x.length - 1; v >= 1 && y >= 0 && u[v] !== x[y]; )
            y--;
          for (; v >= 1 && y >= 0; v--, y--)
            if (u[v] !== x[y]) {
              if (v !== 1 || y !== 1)
                do
                  if (v--, y--, y < 0 || u[v] !== x[y]) {
                    var _ = `
` + u[v].replace(" at new ", " at ");
                    return t.displayName && _.includes("<anonymous>") && (_ = _.replace("<anonymous>", t.displayName)), typeof t == "function" && G.set(t, _), _;
                  }
                while (v >= 1 && y >= 0);
              break;
            }
        }
      } finally {
        it = !1, Z.current = g, ci(), Error.prepareStackTrace = p;
      }
      var F = t ? t.displayName || t.name : "", q = F ? J(F) : "";
      return typeof t == "function" && G.set(t, q), q;
    }
    function ui(t, e, a) {
      return Et(t, !1);
    }
    function di(t) {
      var e = t.prototype;
      return !!(e && e.isReactComponent);
    }
    function H(t, e, a) {
      if (t == null)
        return "";
      if (typeof t == "function")
        return Et(t, di(t));
      if (typeof t == "string")
        return J(t);
      switch (t) {
        case b:
          return J("Suspense");
        case k:
          return J("SuspenseList");
      }
      if (typeof t == "object")
        switch (t.$$typeof) {
          case f:
            return ui(t.render);
          case P:
            return H(t.type, e, a);
          case S: {
            var s = t, p = s._payload, g = s._init;
            try {
              return H(g(p), e, a);
            } catch {
            }
          }
        }
      return "";
    }
    var K = Object.prototype.hasOwnProperty, Rt = {}, Pt = O.ReactDebugCurrentFrame;
    function X(t) {
      if (t) {
        var e = t._owner, a = H(t.type, t._source, e ? e.type : null);
        Pt.setExtraStackFrame(a);
      } else
        Pt.setExtraStackFrame(null);
    }
    function pi(t, e, a, s, p) {
      {
        var g = Function.call.bind(K);
        for (var d in t)
          if (g(t, d)) {
            var u = void 0;
            try {
              if (typeof t[d] != "function") {
                var x = Error((s || "React class") + ": " + a + " type `" + d + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof t[d] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                throw x.name = "Invariant Violation", x;
              }
              u = t[d](e, d, s, a, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
            } catch (v) {
              u = v;
            }
            u && !(u instanceof Error) && (X(p), h("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", s || "React class", a, d, typeof u), X(null)), u instanceof Error && !(u.message in Rt) && (Rt[u.message] = !0, X(p), h("Failed %s type: %s", a, u.message), X(null));
          }
      }
    }
    var gi = Array.isArray;
    function et(t) {
      return gi(t);
    }
    function mi(t) {
      {
        var e = typeof Symbol == "function" && Symbol.toStringTag, a = e && t[Symbol.toStringTag] || t.constructor.name || "Object";
        return a;
      }
    }
    function hi(t) {
      try {
        return _t(t), !1;
      } catch {
        return !0;
      }
    }
    function _t(t) {
      return "" + t;
    }
    function Ct(t) {
      if (hi(t))
        return h("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", mi(t)), _t(t);
    }
    var Tt = O.ReactCurrentOwner, bi = {
      key: !0,
      ref: !0,
      __self: !0,
      __source: !0
    }, jt, Ot;
    function vi(t) {
      if (K.call(t, "ref")) {
        var e = Object.getOwnPropertyDescriptor(t, "ref").get;
        if (e && e.isReactWarning)
          return !1;
      }
      return t.ref !== void 0;
    }
    function yi(t) {
      if (K.call(t, "key")) {
        var e = Object.getOwnPropertyDescriptor(t, "key").get;
        if (e && e.isReactWarning)
          return !1;
      }
      return t.key !== void 0;
    }
    function wi(t, e) {
      typeof t.ref == "string" && Tt.current;
    }
    function ki(t, e) {
      {
        var a = function() {
          jt || (jt = !0, h("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", e));
        };
        a.isReactWarning = !0, Object.defineProperty(t, "key", {
          get: a,
          configurable: !0
        });
      }
    }
    function Si(t, e) {
      {
        var a = function() {
          Ot || (Ot = !0, h("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", e));
        };
        a.isReactWarning = !0, Object.defineProperty(t, "ref", {
          get: a,
          configurable: !0
        });
      }
    }
    var xi = function(t, e, a, s, p, g, d) {
      var u = {
        // This tag allows us to uniquely identify this as a React Element
        $$typeof: r,
        // Built-in properties that belong on the element
        type: t,
        key: e,
        ref: a,
        props: d,
        // Record the component responsible for creating this element.
        _owner: g
      };
      return u._store = {}, Object.defineProperty(u._store, "validated", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: !1
      }), Object.defineProperty(u, "_self", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: s
      }), Object.defineProperty(u, "_source", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: p
      }), Object.freeze && (Object.freeze(u.props), Object.freeze(u)), u;
    };
    function Ei(t, e, a, s, p) {
      {
        var g, d = {}, u = null, x = null;
        a !== void 0 && (Ct(a), u = "" + a), yi(e) && (Ct(e.key), u = "" + e.key), vi(e) && (x = e.ref, wi(e, p));
        for (g in e)
          K.call(e, g) && !bi.hasOwnProperty(g) && (d[g] = e[g]);
        if (t && t.defaultProps) {
          var v = t.defaultProps;
          for (g in v)
            d[g] === void 0 && (d[g] = v[g]);
        }
        if (u || x) {
          var y = typeof t == "function" ? t.displayName || t.name || "Unknown" : t;
          u && ki(d, y), x && Si(d, y);
        }
        return xi(t, u, x, p, s, Tt.current, d);
      }
    }
    var rt = O.ReactCurrentOwner, zt = O.ReactDebugCurrentFrame;
    function D(t) {
      if (t) {
        var e = t._owner, a = H(t.type, t._source, e ? e.type : null);
        zt.setExtraStackFrame(a);
      } else
        zt.setExtraStackFrame(null);
    }
    var ot;
    ot = !1;
    function nt(t) {
      return typeof t == "object" && t !== null && t.$$typeof === r;
    }
    function $t() {
      {
        if (rt.current) {
          var t = z(rt.current.type);
          if (t)
            return `

Check the render method of \`` + t + "`.";
        }
        return "";
      }
    }
    function Ri(t) {
      return "";
    }
    var It = {};
    function Pi(t) {
      {
        var e = $t();
        if (!e) {
          var a = typeof t == "string" ? t : t.displayName || t.name;
          a && (e = `

Check the top-level render call using <` + a + ">.");
        }
        return e;
      }
    }
    function qt(t, e) {
      {
        if (!t._store || t._store.validated || t.key != null)
          return;
        t._store.validated = !0;
        var a = Pi(e);
        if (It[a])
          return;
        It[a] = !0;
        var s = "";
        t && t._owner && t._owner !== rt.current && (s = " It was passed a child from " + z(t._owner.type) + "."), D(t), h('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', a, s), D(null);
      }
    }
    function Nt(t, e) {
      {
        if (typeof t != "object")
          return;
        if (et(t))
          for (var a = 0; a < t.length; a++) {
            var s = t[a];
            nt(s) && qt(s, e);
          }
        else if (nt(t))
          t._store && (t._store.validated = !0);
        else if (t) {
          var p = U(t);
          if (typeof p == "function" && p !== t.entries)
            for (var g = p.call(t), d; !(d = g.next()).done; )
              nt(d.value) && qt(d.value, e);
        }
      }
    }
    function _i(t) {
      {
        var e = t.type;
        if (e == null || typeof e == "string")
          return;
        var a;
        if (typeof e == "function")
          a = e.propTypes;
        else if (typeof e == "object" && (e.$$typeof === f || // Note: Memo only checks outer props here.
        // Inner props are checked in the reconciler.
        e.$$typeof === P))
          a = e.propTypes;
        else
          return;
        if (a) {
          var s = z(e);
          pi(a, t.props, "prop", s, t);
        } else if (e.PropTypes !== void 0 && !ot) {
          ot = !0;
          var p = z(e);
          h("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", p || "Unknown");
        }
        typeof e.getDefaultProps == "function" && !e.getDefaultProps.isReactClassApproved && h("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
      }
    }
    function Ci(t) {
      {
        for (var e = Object.keys(t.props), a = 0; a < e.length; a++) {
          var s = e[a];
          if (s !== "children" && s !== "key") {
            D(t), h("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", s), D(null);
            break;
          }
        }
        t.ref !== null && (D(t), h("Invalid attribute `ref` supplied to `React.Fragment`."), D(null));
      }
    }
    var At = {};
    function Dt(t, e, a, s, p, g) {
      {
        var d = ai(t);
        if (!d) {
          var u = "";
          (t === void 0 || typeof t == "object" && t !== null && Object.keys(t).length === 0) && (u += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
          var x = Ri();
          x ? u += x : u += $t();
          var v;
          t === null ? v = "null" : et(t) ? v = "array" : t !== void 0 && t.$$typeof === r ? (v = "<" + (z(t.type) || "Unknown") + " />", u = " Did you accidentally export a JSX literal instead of a component?") : v = typeof t, h("React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", v, u);
        }
        var y = Ei(t, e, a, p, g);
        if (y == null)
          return y;
        if (d) {
          var _ = e.children;
          if (_ !== void 0)
            if (s)
              if (et(_)) {
                for (var F = 0; F < _.length; F++)
                  Nt(_[F], t);
                Object.freeze && Object.freeze(_);
              } else
                h("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
            else
              Nt(_, t);
        }
        if (K.call(e, "key")) {
          var q = z(t), E = Object.keys(e).filter(function(Ii) {
            return Ii !== "key";
          }), at = E.length > 0 ? "{key: someKey, " + E.join(": ..., ") + ": ...}" : "{key: someKey}";
          if (!At[q + at]) {
            var $i = E.length > 0 ? "{" + E.join(": ..., ") + ": ...}" : "{}";
            h(`A props object containing a "key" prop is being spread into JSX:
  let props = %s;
  <%s {...props} />
React keys must be passed directly to JSX without using spread:
  let props = %s;
  <%s key={someKey} {...props} />`, at, q, $i, q), At[q + at] = !0;
          }
        }
        return t === o ? Ci(y) : _i(y), y;
      }
    }
    function Ti(t, e, a) {
      return Dt(t, e, a, !0);
    }
    function ji(t, e, a) {
      return Dt(t, e, a, !1);
    }
    var Oi = ji, zi = Ti;
    W.Fragment = o, W.jsx = Oi, W.jsxs = zi;
  }(), W;
}
Ht.exports = te();
var R = Ht.exports;
const ct = [
  "ti ti-plus",
  "ti ti-minus",
  "ti ti-x",
  "ti ti-check",
  "ti ti-checkbox",
  "ti ti-search",
  "ti ti-settings",
  "ti ti-settings-filled",
  "ti ti-dots",
  "ti ti-dots-vertical",
  "ti ti-dots-circle-horizontal",
  "ti ti-menu-2",
  "ti ti-menu-deep",
  "ti ti-layout-sidebar",
  "ti ti-arrow-up",
  "ti ti-arrow-down",
  "ti ti-arrow-left",
  "ti ti-arrow-right",
  "ti ti-arrow-narrow-up",
  "ti ti-arrow-narrow-down",
  "ti ti-arrow-narrow-left",
  "ti ti-arrow-narrow-right",
  "ti ti-arrow-back-up",
  "ti ti-arrow-forward-up",
  "ti ti-arrows-sort",
  "ti ti-arrows-exchange",
  "ti ti-arrows-move",
  "ti ti-chevron-up",
  "ti ti-chevron-down",
  "ti ti-chevron-left",
  "ti ti-chevron-right",
  "ti ti-chevrons-up",
  "ti ti-chevrons-down",
  "ti ti-chevrons-left",
  "ti ti-chevrons-right",
  "ti ti-caret-up",
  "ti ti-caret-down",
  "ti ti-caret-left",
  "ti ti-caret-right",
  "ti ti-refresh",
  "ti ti-reload",
  "ti ti-rotate",
  "ti ti-rotate-clockwise",
  "ti ti-rotate-rectangle",
  "ti ti-zoom-in",
  "ti ti-zoom-out",
  "ti ti-zoom-scan",
  "ti ti-zoom-check",
  "ti ti-zoom-cancel",
  "ti ti-maximize",
  "ti ti-minimize",
  "ti ti-arrows-maximize",
  "ti ti-arrows-minimize",
  "ti ti-fullscreen",
  "ti ti-arrows-diagonal",
  "ti ti-arrows-diagonal-2",
  "ti ti-pinned",
  "ti ti-pinned-filled",
  "ti ti-pin",
  "ti ti-pin-filled",
  "ti ti-pin-invoke",
  "ti ti-edit",
  "ti ti-edit-circle",
  "ti ti-pencil",
  "ti ti-pencil-minus",
  "ti ti-pencil-plus",
  "ti ti-writing",
  "ti ti-writing-sign",
  "ti ti-typography",
  "ti ti-text-size",
  "ti ti-bold",
  "ti ti-italic",
  "ti ti-underline",
  "ti ti-strikethrough",
  "ti ti-align-left",
  "ti ti-align-center",
  "ti ti-align-right",
  "ti ti-align-justified",
  "ti ti-list",
  "ti ti-list-check",
  "ti ti-list-details",
  "ti ti-list-letters",
  "ti ti-list-numbers",
  "ti ti-list-search",
  "ti ti-list-tree",
  "ti ti-indent-increase",
  "ti ti-indent-decrease",
  "ti ti-quote",
  "ti ti-quote-off",
  "ti ti-blockquote",
  "ti ti-code",
  "ti ti-code-minus",
  "ti ti-code-plus",
  "ti ti-code-circle",
  "ti ti-code-dots",
  "ti ti-brackets",
  "ti ti-brackets-contain",
  "ti ti-braces",
  "ti ti-braces-off",
  "ti ti-link",
  "ti ti-link-off",
  "ti ti-link-plus",
  "ti ti-unlink",
  "ti ti-clear-formatting",
  "ti ti-eraser",
  "ti ti-eraser-off",
  "ti ti-highlight",
  "ti ti-text-wrap",
  "ti ti-text-wrap-disabled",
  "ti ti-file",
  "ti ti-file-filled",
  "ti ti-file-text",
  "ti ti-file-description",
  "ti ti-file-plus",
  "ti ti-file-minus",
  "ti ti-file-export",
  "ti ti-file-import",
  "ti ti-file-download",
  "ti ti-file-upload",
  "ti ti-file-code",
  "ti ti-file-settings",
  "ti ti-files",
  "ti ti-files-off",
  "ti ti-file-off",
  "ti ti-folder",
  "ti ti-folder-filled",
  "ti ti-folder-plus",
  "ti ti-folder-minus",
  "ti ti-folder-open",
  "ti ti-folders",
  "ti ti-folder-off",
  "ti ti-archive",
  "ti ti-archive-filled",
  "ti ti-archive-off",
  "ti ti-paperclip",
  "ti ti-clipboard",
  "ti ti-clipboard-check",
  "ti ti-clipboard-list",
  "ti ti-clipboard-text",
  "ti ti-clipboard-plus",
  "ti ti-clipboard-x",
  "ti ti-note",
  "ti ti-note-off",
  "ti ti-notes",
  "ti ti-notebook",
  "ti ti-book",
  "ti ti-book-2",
  "ti ti-book-filled",
  "ti ti-bookmark",
  "ti ti-bookmark-filled",
  "ti ti-books",
  "ti ti-book-off",
  "ti ti-bookmarks",
  "ti ti-bookmarks-filled",
  "ti ti-photo",
  "ti ti-photo-filled",
  "ti ti-photo-plus",
  "ti ti-photo-off",
  "ti ti-camera",
  "ti ti-camera-filled",
  "ti ti-camera-plus",
  "ti ti-camera-off",
  "ti ti-video",
  "ti ti-video-filled",
  "ti ti-video-plus",
  "ti ti-video-off",
  "ti ti-movie",
  "ti ti-movie-off",
  "ti ti-music",
  "ti ti-music-off",
  "ti ti-headphones",
  "ti ti-headphones-off",
  "ti ti-microphone",
  "ti ti-microphone-off",
  "ti ti-microphone-2",
  "ti ti-speakerphone",
  "ti ti-volume",
  "ti ti-volume-2",
  "ti ti-volume-3",
  "ti ti-playlist",
  "ti ti-player-play",
  "ti ti-player-play-filled",
  "ti ti-player-pause",
  "ti ti-player-pause-filled",
  "ti ti-player-stop",
  "ti ti-player-stop-filled",
  "ti ti-player-track-next",
  "ti ti-player-track-prev",
  "ti ti-player-skip-forward",
  "ti ti-player-skip-back",
  "ti ti-bell",
  "ti ti-bell-filled",
  "ti ti-bell-ringing",
  "ti ti-bell-ringing-filled",
  "ti ti-bell-plus",
  "ti ti-bell-minus",
  "ti ti-bell-x",
  "ti ti-bell-off",
  "ti ti-alert-circle",
  "ti ti-alert-circle-filled",
  "ti ti-alert-triangle",
  "ti ti-alert-triangle-filled",
  "ti ti-info-circle",
  "ti ti-info-circle-filled",
  "ti ti-help-circle",
  "ti ti-help",
  "ti ti-exclamation-circle",
  "ti ti-exclamation-mark",
  "ti ti-question-mark",
  "ti ti-ban",
  "ti ti-urgent",
  "ti ti-shield",
  "ti ti-shield-filled",
  "ti ti-shield-check",
  "ti ti-shield-x",
  "ti ti-shield-lock",
  "ti ti-shield-off",
  "ti ti-shield-check-filled",
  "ti ti-clock",
  "ti ti-clock-filled",
  "ti ti-clock-24",
  "ti ti-clock-hour-1",
  "ti ti-clock-hour-12",
  "ti ti-clock-check",
  "ti ti-clock-x",
  "ti ti-clock-off",
  "ti ti-clock-plus",
  "ti ti-clock-minus",
  "ti ti-calendar",
  "ti ti-calendar-filled",
  "ti ti-calendar-event",
  "ti ti-calendar-plus",
  "ti ti-calendar-minus",
  "ti ti-calendar-off",
  "ti ti-calendar-time",
  "ti ti-calendar-check",
  "ti ti-calendar-stats",
  "ti ti-calendar-due",
  "ti ti-hourglass",
  "ti ti-hourglass-filled",
  "ti ti-hourglass-empty",
  "ti ti-history",
  "ti ti-history-toggle",
  "ti ti-alarm",
  "ti ti-alarm-filled",
  "ti ti-alarm-off",
  "ti ti-alarm-plus",
  "ti ti-alarm-minus",
  "ti ti-timer",
  "ti ti-timer-off",
  "ti ti-sun",
  "ti ti-sun-filled",
  "ti ti-sun-off",
  "ti ti-sun-high",
  "ti ti-sun-low",
  "ti ti-sun-wind",
  "ti ti-moon",
  "ti ti-moon-filled",
  "ti ti-moon-off",
  "ti ti-moon-2",
  "ti ti-moon-stars",
  "ti ti-brightness",
  "ti ti-brightness-up",
  "ti ti-brightness-down",
  "ti ti-brightness-off",
  "ti ti-contrast",
  "ti ti-contrast-2",
  "ti ti-contrast-off",
  "ti ti-palette",
  "ti ti-palette-off",
  "ti ti-color-picker",
  "ti ti-color-swatch",
  "ti ti-paint",
  "ti ti-paint-filled",
  "ti ti-paint-off",
  "ti ti-brush",
  "ti ti-brush-off",
  "ti ti-droplet",
  "ti ti-droplet-filled",
  "ti ti-droplet-off",
  "ti ti-eye",
  "ti ti-eye-filled",
  "ti ti-eye-off",
  "ti ti-eye-check",
  "ti ti-eye-closed",
  "ti ti-user",
  "ti ti-user-filled",
  "ti ti-user-plus",
  "ti ti-user-minus",
  "ti ti-user-x",
  "ti ti-user-check",
  "ti ti-user-off",
  "ti ti-user-circle",
  "ti ti-user-square",
  "ti ti-users",
  "ti ti-users-plus",
  "ti ti-users-minus",
  "ti ti-user-exclamation",
  "ti ti-user-question",
  "ti ti-user-search",
  "ti ti-user-shield",
  "ti ti-user-share",
  "ti ti-user-edit",
  "ti ti-id",
  "ti ti-id-badge",
  "ti ti-id-off",
  "ti ti-fingerprint",
  "ti ti-fingerprint-off",
  "ti ti-key",
  "ti ti-key-filled",
  "ti ti-key-off",
  "ti ti-password",
  "ti ti-password-fingerprint",
  "ti ti-password-user",
  "ti ti-world",
  "ti ti-world-off",
  "ti ti-world-upload",
  "ti ti-globe",
  "ti ti-globe-filled",
  "ti ti-globe-off",
  "ti ti-wifi",
  "ti ti-wifi-off",
  "ti ti-wifi-0",
  "ti ti-wifi-1",
  "ti ti-wifi-2",
  "ti ti-router",
  "ti ti-router-off",
  "ti ti-antenna",
  "ti ti-antenna-bars-5",
  "ti ti-antenna-bars-off",
  "ti ti-broadcast",
  "ti ti-broadcast-off",
  "ti ti-bluetooth",
  "ti ti-bluetooth-off",
  "ti ti-bluetooth-connected",
  "ti ti-share",
  "ti ti-share-2",
  "ti ti-share-3",
  "ti ti-share-off",
  "ti ti-send",
  "ti ti-send-off",
  "ti ti-mail",
  "ti ti-mail-filled",
  "ti ti-mail-opened",
  "ti ti-mail-off",
  "ti ti-mail-forward",
  "ti ti-mail-plus",
  "ti ti-inbox",
  "ti ti-inbox-off",
  "ti ti-message",
  "ti ti-message-filled",
  "ti ti-messages",
  "ti ti-messages-filled",
  "ti ti-message-circle",
  "ti ti-message-dots",
  "ti ti-message-plus",
  "ti ti-message-report",
  "ti ti-at",
  "ti ti-at-off",
  "ti ti-hash",
  "ti ti-tag",
  "ti ti-tag-filled",
  "ti ti-tags",
  "ti ti-tags-filled",
  "ti ti-tag-off",
  "ti ti-tag-plus",
  "ti ti-tag-minus",
  "ti ti-tag-starred",
  "ti ti-cloud",
  "ti ti-cloud-filled",
  "ti ti-cloud-off",
  "ti ti-cloud-rain",
  "ti ti-cloud-download",
  "ti ti-cloud-upload",
  "ti ti-cloud-lock",
  "ti ti-cloud-computing",
  "ti ti-cloud-data-connection",
  "ti ti-upload",
  "ti ti-download",
  "ti ti-server",
  "ti ti-server-off",
  "ti ti-server-2",
  "ti ti-database",
  "ti ti-database-off",
  "ti ti-database-plus",
  "ti ti-database-minus",
  "ti ti-database-export",
  "ti ti-database-import",
  "ti ti-database-search",
  "ti ti-device-floppy",
  "ti ti-disk",
  "ti ti-disk-off",
  "ti ti-sitemap",
  "ti ti-sitemap-off",
  "ti ti-device-desktop",
  "ti ti-device-laptop",
  "ti ti-device-tablet",
  "ti ti-device-mobile",
  "ti ti-device-desktop-off",
  "ti ti-device-laptop-off",
  "ti ti-device-mobile-off",
  "ti ti-device-watch",
  "ti ti-device-speaker",
  "ti ti-device-tv",
  "ti ti-device-imac",
  "ti ti-device-ipad",
  "ti ti-device-airpods",
  "ti ti-device-gamepad",
  "ti ti-device-gamepad-2",
  "ti ti-device-cctv",
  "ti ti-device-remote",
  "ti ti-device-sd-card",
  "ti ti-monitor",
  "ti ti-monitor-off",
  "ti ti-screen-share",
  "ti ti-screen-share-off",
  "ti ti-keyboard",
  "ti ti-keyboard-off",
  "ti ti-keyboard-show",
  "ti ti-mouse",
  "ti ti-mouse-off",
  "ti ti-mouse-2",
  "ti ti-printer",
  "ti ti-printer-off",
  "ti ti-cast",
  "ti ti-cast-off",
  "ti ti-battery",
  "ti ti-battery-1",
  "ti ti-battery-2",
  "ti ti-battery-3",
  "ti ti-battery-4",
  "ti ti-battery-charging",
  "ti ti-battery-off",
  "ti ti-plug",
  "ti ti-plug-connected",
  "ti ti-plug-x",
  "ti ti-plug-off",
  "ti ti-usb",
  "ti ti-cpu",
  "ti ti-cpu-off",
  "ti ti-chart-bar",
  "ti ti-chart-bar-off",
  "ti ti-chart-bar-popular",
  "ti ti-chart-line",
  "ti ti-chart-area",
  "ti ti-chart-area-line",
  "ti ti-chart-pie",
  "ti ti-chart-donut",
  "ti ti-chart-histogram",
  "ti ti-chart-scatter",
  "ti ti-chart-bubble",
  "ti ti-chart-treemap",
  "ti ti-chart-radar",
  "ti ti-chart-sankey",
  "ti ti-chart-dots",
  "ti ti-chart-arrows",
  "ti ti-chart-infographic",
  "ti ti-graph",
  "ti ti-graph-off",
  "ti ti-presentation",
  "ti ti-presentation-off",
  "ti ti-table",
  "ti ti-table-off",
  "ti ti-table-plus",
  "ti ti-table-minus",
  "ti ti-table-export",
  "ti ti-table-import",
  "ti ti-table-options",
  "ti ti-layout",
  "ti ti-layout-2",
  "ti ti-layout-list",
  "ti ti-layout-kanban",
  "ti ti-layout-columns",
  "ti ti-layout-rows",
  "ti ti-layout-grid",
  "ti ti-layout-align-top",
  "ti ti-layout-align-bottom",
  "ti ti-robot",
  "ti ti-robot-off",
  "ti ti-robot-face",
  "ti ti-bulb",
  "ti ti-bulb-filled",
  "ti ti-bulb-off",
  "ti ti-sparkles",
  "ti ti-stars",
  "ti ti-stars-filled",
  "ti ti-brain",
  "ti ti-magic-wand",
  "ti ti-wand",
  "ti ti-wand-off",
  "ti ti-ripple",
  "ti ti-ripple-off",
  "ti ti-circuit-bulb",
  "ti ti-circuit-cell",
  "ti ti-circuit-diode-zener",
  "ti ti-puzzle",
  "ti ti-puzzle-filled",
  "ti ti-puzzle-off",
  "ti ti-puzzle-2",
  "ti ti-tool",
  "ti ti-tools",
  "ti ti-tools-off",
  "ti ti-wrench",
  "ti ti-wrench-off",
  "ti ti-screwdriver",
  "ti ti-hammer",
  "ti ti-hammer-off",
  "ti ti-ruler",
  "ti ti-ruler-off",
  "ti ti-ruler-2",
  "ti ti-ruler-measure",
  "ti ti-scissors",
  "ti ti-scissors-off",
  "ti ti-flask",
  "ti ti-flask-filled",
  "ti ti-flask-off",
  "ti ti-flask-2",
  "ti ti-test-pipe",
  "ti ti-test-pipe-2",
  "ti ti-test-pipe-off",
  "ti ti-microscope",
  "ti ti-telescope",
  "ti ti-telescope-off",
  "ti ti-magnet",
  "ti ti-magnet-off",
  "ti ti-accessible",
  "ti ti-accessible-off",
  "ti ti-accessible-filled",
  "ti ti-language",
  "ti ti-language-hiragana",
  "ti ti-language-katakana",
  "ti ti-home",
  "ti ti-home-filled",
  "ti ti-home-off",
  "ti ti-home-2",
  "ti ti-map",
  "ti ti-map-off",
  "ti ti-map-pin",
  "ti ti-map-pin-filled",
  "ti ti-map-pins",
  "ti ti-map-search",
  "ti ti-map-route",
  "ti ti-compass",
  "ti ti-compass-filled",
  "ti ti-compass-off",
  "ti ti-location",
  "ti ti-location-filled",
  "ti ti-location-off",
  "ti ti-navigation",
  "ti ti-navigation-filled",
  "ti ti-navigation-off",
  "ti ti-navigation-code",
  "ti ti-sign-left",
  "ti ti-sign-right",
  "ti ti-direction",
  "ti ti-directions",
  "ti ti-directions-off",
  "ti ti-road",
  "ti ti-road-off",
  "ti ti-road-sign",
  "ti ti-building",
  "ti ti-building-arch",
  "ti ti-building-bank",
  "ti ti-building-bridge",
  "ti ti-building-castle",
  "ti ti-building-church",
  "ti ti-building-community",
  "ti ti-building-fortress",
  "ti ti-building-hospital",
  "ti ti-building-lighthouse",
  "ti ti-building-skyscraper",
  "ti ti-building-store",
  "ti ti-building-warehouse",
  "ti ti-building-monument",
  "ti ti-star",
  "ti ti-star-filled",
  "ti ti-star-off",
  "ti ti-star-half",
  "ti ti-star-half-filled",
  "ti ti-star-plus",
  "ti ti-heart",
  "ti ti-heart-filled",
  "ti ti-heart-off",
  "ti ti-heart-plus",
  "ti ti-heart-minus",
  "ti ti-heart-handshake",
  "ti ti-heart-broken",
  "ti ti-flame",
  "ti ti-flame-off",
  "ti ti-leaf",
  "ti ti-leaf-off",
  "ti ti-seedling",
  "ti ti-seedling-off",
  "ti ti-flower",
  "ti ti-flower-off",
  "ti ti-tree",
  "ti ti-trees",
  "ti ti-mountain",
  "ti ti-mountains",
  "ti ti-wind",
  "ti ti-wind-off",
  "ti ti-umbrella",
  "ti ti-umbrella-filled",
  "ti ti-umbrella-off",
  "ti ti-rainbow",
  "ti ti-rainbow-off",
  "ti ti-car",
  "ti ti-car-off",
  "ti ti-bus",
  "ti ti-bus-off",
  "ti ti-train",
  "ti ti-bike",
  "ti ti-bike-off",
  "ti ti-plane",
  "ti ti-plane-off",
  "ti ti-plane-arrival",
  "ti ti-plane-departure",
  "ti ti-ship",
  "ti ti-ship-off",
  "ti ti-rocket",
  "ti ti-rocket-off",
  "ti ti-motorbike",
  "ti ti-scooter",
  "ti ti-walk",
  "ti ti-run",
  "ti ti-credit-card",
  "ti ti-credit-card-off",
  "ti ti-credit-card-plus",
  "ti ti-cash",
  "ti ti-cash-off",
  "ti ti-wallet",
  "ti ti-wallet-off",
  "ti ti-pig-money",
  "ti ti-coins",
  "ti ti-coin",
  "ti ti-receipt",
  "ti ti-receipt-off",
  "ti ti-receipt-2",
  "ti ti-receipt-tax",
  "ti ti-ticket",
  "ti ti-ticket-off",
  "ti ti-basket",
  "ti ti-basket-filled",
  "ti ti-basket-off",
  "ti ti-basket-plus",
  "ti ti-shopping-cart",
  "ti ti-shopping-cart-off",
  "ti ti-shopping-cart-plus",
  "ti ti-truck",
  "ti ti-truck-off",
  "ti ti-truck-delivery",
  "ti ti-truck-return",
  "ti ti-package",
  "ti ti-package-off",
  "ti ti-license",
  "ti ti-license-off",
  "ti ti-circles",
  "ti ti-circles-filled",
  "ti ti-circle",
  "ti ti-circle-filled",
  "ti ti-circle-check",
  "ti ti-circle-x",
  "ti ti-circle-plus",
  "ti ti-circle-minus",
  "ti ti-circle-dot",
  "ti ti-circle-half",
  "ti ti-circle-half-2",
  "ti ti-circle-arrow-up",
  "ti ti-circle-arrow-down",
  "ti ti-circle-arrow-left",
  "ti ti-circle-arrow-right",
  "ti ti-square",
  "ti ti-square-filled",
  "ti ti-square-check",
  "ti ti-square-x",
  "ti ti-square-plus",
  "ti ti-square-minus",
  "ti ti-square-rotated",
  "ti ti-triangle",
  "ti ti-triangle-filled",
  "ti ti-triangle-inverted",
  "ti ti-diamond",
  "ti ti-diamond-filled",
  "ti ti-hexagon",
  "ti ti-hexagon-filled",
  "ti ti-hexagon-plus",
  "ti ti-hexagon-minus",
  "ti ti-octagon",
  "ti ti-octagon-filled",
  "ti ti-octagon-plus",
  "ti ti-octagon-minus",
  "ti ti-pentagon",
  "ti ti-pentagon-filled",
  "ti ti-pentagon-plus",
  "ti ti-pentagon-minus",
  "ti ti-oval",
  "ti ti-oval-filled",
  "ti ti-rectangle",
  "ti ti-rectangle-filled",
  "ti ti-capsule",
  "ti ti-capsule-filled",
  "ti ti-apps",
  "ti ti-apps-filled",
  "ti ti-apps-off",
  "ti ti-grid-dots",
  "ti ti-grid-scan",
  "ti ti-box",
  "ti ti-box-multiple",
  "ti ti-box-off",
  "ti ti-toggle-left",
  "ti ti-toggle-right",
  "ti ti-switch",
  "ti ti-switch-horizontal",
  "ti ti-switch-vertical",
  "ti ti-power",
  "ti ti-ad",
  "ti ti-ad-filled",
  "ti ti-ad-off",
  "ti ti-ad-2",
  "ti ti-filter",
  "ti ti-filter-filled",
  "ti ti-filter-off",
  "ti ti-filters",
  "ti ti-adjustments",
  "ti ti-adjustments-filled",
  "ti ti-adjustments-off",
  "ti ti-adjustments-horizontal",
  "ti ti-adjustments-horizontal-off",
  "ti ti-adjustments-alt",
  "ti ti-sort-ascending",
  "ti ti-sort-descending",
  "ti ti-sort-ascending-2",
  "ti ti-sort-descending-2",
  "ti ti-sort-a-z",
  "ti ti-sort-z-a",
  "ti ti-lock",
  "ti ti-lock-filled",
  "ti ti-lock-off",
  "ti ti-lock-open",
  "ti ti-lock-open-off",
  "ti ti-lock-plus",
  "ti ti-lock-minus",
  "ti ti-search-off",
  "ti ti-copy",
  "ti ti-copy-off",
  "ti ti-copy-plus",
  "ti ti-copy-minus",
  "ti ti-cut",
  "ti ti-trash",
  "ti ti-trash-filled",
  "ti ti-trash-off",
  "ti ti-trash-plus",
  "ti ti-trash-minus",
  "ti ti-recycle",
  "ti ti-recycle-off",
  "ti ti-backspace",
  "ti ti-backspace-filled",
  "ti ti-corner-up-left",
  "ti ti-corner-up-right",
  "ti ti-corner-down-left",
  "ti ti-corner-down-right",
  "ti ti-virus",
  "ti ti-virus-off",
  "ti ti-virus-search",
  "ti ti-mask",
  "ti ti-mask-off",
  "ti ti-spy",
  "ti ti-spy-off",
  "ti ti-mood-smile",
  "ti ti-mood-smile-filled",
  "ti ti-mood-happy",
  "ti ti-mood-happy-filled",
  "ti ti-mood-sad",
  "ti ti-mood-sad-filled",
  "ti ti-mood-crazy-happy",
  "ti ti-mood-annoyed",
  "ti ti-mood-nerd",
  "ti ti-mood-tongue",
  "ti ti-mood-wink",
  "ti ti-mood-confuzed",
  "ti ti-mood-cry",
  "ti ti-mood-empty",
  "ti ti-mood-empty-filled",
  "ti ti-mood-neutral",
  "ti ti-mood-neutral-filled",
  "ti ti-mood-plus",
  "ti ti-mood-minus",
  "ti ti-mood-check",
  "ti ti-mood-kid",
  "ti ti-mood-boy",
  "ti ti-mood-look-left",
  "ti ti-mood-look-right",
  "ti ti-gift",
  "ti ti-gift-filled",
  "ti ti-gift-off",
  "ti ti-gift-card",
  "ti ti-trophy",
  "ti ti-trophy-filled",
  "ti ti-trophy-off",
  "ti ti-medal",
  "ti ti-medal-2",
  "ti ti-award",
  "ti ti-award-filled",
  "ti ti-award-off",
  "ti ti-flag",
  "ti ti-flag-filled",
  "ti ti-flag-off",
  "ti ti-flag-2",
  "ti ti-flag-3",
  "ti ti-anchor",
  "ti ti-anchor-off",
  "ti ti-badge",
  "ti ti-badge-filled",
  "ti ti-badges",
  "ti ti-badges-filled",
  "ti ti-balloon",
  "ti ti-balloon-filled",
  "ti ti-balloon-off",
  "ti ti-barbell",
  "ti ti-barbell-off",
  "ti ti-bell-school",
  "ti ti-bolt",
  "ti ti-bolt-off",
  "ti ti-bomb",
  "ti ti-bomb-filled",
  "ti ti-bone",
  "ti ti-bone-off",
  "ti ti-bottle",
  "ti ti-bottle-filled",
  "ti ti-bottle-off",
  "ti ti-bow",
  "ti ti-bow-filled",
  "ti ti-bug",
  "ti ti-bug-off",
  "ti ti-bug-filled",
  "ti ti-candle",
  "ti ti-candle-filled",
  "ti ti-candy",
  "ti ti-candy-off",
  "ti ti-certificate",
  "ti ti-certificate-off",
  "ti ti-cheese",
  "ti ti-chef-hat",
  "ti ti-chef-hat-off",
  "ti ti-cherry",
  "ti ti-cherry-filled",
  "ti ti-chess",
  "ti ti-chess-bishop",
  "ti ti-chess-king",
  "ti ti-chess-queen",
  "ti ti-chess-rook",
  "ti ti-chisel",
  "ti ti-christmas-tree",
  "ti ti-christmas-tree-off",
  "ti ti-cookie",
  "ti ti-cookie-off",
  "ti ti-cookie-filled",
  "ti ti-crown",
  "ti ti-crown-off",
  "ti ti-cup",
  "ti ti-cup-off",
  "ti ti-dice",
  "ti ti-dice-1",
  "ti ti-dice-2",
  "ti ti-dice-3",
  "ti ti-dice-4",
  "ti ti-dice-5",
  "ti ti-dice-6",
  "ti ti-dog",
  "ti ti-dog-bowl",
  "ti ti-egg",
  "ti ti-egg-filled",
  "ti ti-eggs",
  "ti ti-fence",
  "ti ti-fence-off",
  "ti ti-fish",
  "ti ti-fish-off",
  "ti ti-glass",
  "ti ti-glass-filled",
  "ti ti-glass-off",
  "ti ti-glasses",
  "ti ti-glasses-off",
  "ti ti-golf",
  "ti ti-golf-off",
  "ti ti-guitar-pick",
  "ti ti-guitar-pick-filled",
  "ti ti-ice-cream",
  "ti ti-ice-cream-off",
  "ti ti-infinity",
  "ti ti-infinity-off",
  "ti ti-lasso",
  "ti ti-lasso-off",
  "ti ti-lego",
  "ti ti-lego-off",
  "ti ti-lego-filled",
  "ti ti-lemon",
  "ti ti-lemon-2",
  "ti ti-lifebuoy",
  "ti ti-lifebuoy-off",
  "ti ti-math",
  "ti ti-math-function",
  "ti ti-math-symbols",
  "ti ti-meat",
  "ti ti-meat-off",
  "ti ti-medical-cross",
  "ti ti-medical-cross-filled",
  "ti ti-medical-cross-off",
  "ti ti-meteor",
  "ti ti-meteor-off",
  "ti ti-milk",
  "ti ti-milk-off",
  "ti ti-mug",
  "ti ti-mug-off",
  "ti ti-mushroom",
  "ti ti-mushroom-filled",
  "ti ti-mushroom-off",
  "ti ti-paw",
  "ti ti-paw-filled",
  "ti ti-paw-off",
  "ti ti-pepper",
  "ti ti-pepper-off",
  "ti ti-piano",
  "ti ti-pizza",
  "ti ti-pizza-off",
  "ti ti-plant",
  "ti ti-plant-off",
  "ti ti-play-card",
  "ti ti-play-card-off",
  "ti ti-pokeball",
  "ti ti-pokeball-off",
  "ti ti-pool",
  "ti ti-pool-off",
  "ti ti-poo",
  "ti ti-propeller",
  "ti ti-propeller-off",
  "ti ti-razor",
  "ti ti-razor-electric",
  "ti ti-ring",
  "ti ti-rosette",
  "ti ti-rosette-filled",
  "ti ti-salt",
  "ti ti-sausage",
  "ti ti-scale",
  "ti ti-scale-off",
  "ti ti-scale-outline",
  "ti ti-scuba-mask",
  "ti ti-scuba-mask-off",
  "ti ti-signature",
  "ti ti-signature-off",
  "ti ti-soup",
  "ti ti-soup-off",
  "ti ti-spider",
  "ti ti-spade",
  "ti ti-spade-filled",
  "ti ti-stairs",
  "ti ti-stairs-up",
  "ti ti-stairs-down",
  "ti ti-stethoscope",
  "ti ti-stethoscope-off",
  "ti ti-sword",
  "ti ti-sword-off",
  "ti ti-target",
  "ti ti-target-off",
  "ti ti-teapot",
  "ti ti-tent",
  "ti ti-tent-off",
  "ti ti-thermometer",
  "ti ti-toilet-paper",
  "ti ti-toilet-paper-off",
  "ti ti-tractor",
  "ti ti-traffic-cone",
  "ti ti-traffic-cone-off",
  "ti ti-treadmill",
  "ti ti-vaccine",
  "ti ti-vaccine-off",
  "ti ti-wash",
  "ti ti-wash-dry",
  "ti ti-wash-gentle",
  "ti ti-waterpolo",
  "ti ti-wheelchair",
  "ti ti-wheelchair-off",
  "ti ti-windmill",
  "ti ti-windmill-off",
  "ti ti-windsock",
  "ti ti-yoga",
  "ti ti-zeppelin",
  "ti ti-zeppelin-filled",
  "ti ti-zeppelin-off",
  "ti ti-zodiac-aquarius",
  "ti ti-zodiac-aries",
  "ti ti-zodiac-cancer",
  "ti ti-zodiac-capricorn",
  "ti ti-zodiac-gemini",
  "ti ti-zodiac-leo",
  "ti ti-zodiac-libra",
  "ti ti-zodiac-pisces",
  "ti ti-zodiac-sagittarius",
  "ti ti-zodiac-scorpio",
  "ti ti-zodiac-taurus",
  "ti ti-zodiac-virgo",
  "ti ti-zip"
];
function ie(i) {
  const r = i.toLowerCase().trim();
  return r ? ct.filter((n) => n.replace("ti ti-", "").includes(r)) : ct;
}
const ee = window.React, { useState: re, useRef: oe, useEffect: Mt, useCallback: ne } = ee;
function ae({ selectedIcon: i, onSelect: r, onClose: n }) {
  const [o, l] = re(""), c = oe(null);
  Mt(() => {
    var f;
    (f = c.current) == null || f.focus();
  }, []), Mt(() => {
    const f = (b) => {
      b.key === "Escape" && n();
    };
    return document.addEventListener("keydown", f), () => document.removeEventListener("keydown", f);
  }, [n]);
  const m = o.trim() ? ie(o) : ct, w = ne((f) => {
    r(f);
  }, [r]);
  return /* @__PURE__ */ R.jsx("div", { className: "orca-menu orca-context-menu", children: /* @__PURE__ */ R.jsxs("div", { className: "orca-icon-picker", style: { width: "300px" }, children: [
    /* @__PURE__ */ R.jsxs("div", { className: "orca-icon-picker-header", style: {
      display: "flex",
      alignItems: "center",
      marginBottom: "8px",
      gap: "4px"
    }, children: [
      /* @__PURE__ */ R.jsx("span", { className: "orca-input orca-icon-picker-search", style: { flex: "1 1 0%" }, children: /* @__PURE__ */ R.jsxs("span", { className: "orca-input-input", children: [
        /* @__PURE__ */ R.jsx("i", { className: "ti ti-search orca-input-pre" }),
        /* @__PURE__ */ R.jsx(
          "input",
          {
            ref: c,
            className: "orca-input-actualinput",
            placeholder: V("settings-pin.search-icons"),
            value: o,
            onChange: (f) => l(f.target.value)
          }
        )
      ] }) }),
      /* @__PURE__ */ R.jsx(
        "button",
        {
          className: "orca-button outline",
          tabIndex: -1,
          onClick: n,
          title: V("settings-pin.clear"),
          children: /* @__PURE__ */ R.jsx("i", { className: "ti ti-ban" })
        }
      )
    ] }),
    /* @__PURE__ */ R.jsx("div", { className: "orca-icon-picker-content", style: {
      width: "300px",
      maxHeight: "250px",
      overflowY: "auto"
    }, children: m.length === 0 ? /* @__PURE__ */ R.jsx("div", { style: {
      textAlign: "center",
      padding: "16px",
      color: "var(--orca-color-text-2)"
    }, children: V("settings-pin.no-icons-found") }) : /* @__PURE__ */ R.jsx("div", { style: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(36px, 1fr))",
      gap: "2px"
    }, children: m.map((f) => /* @__PURE__ */ R.jsx(
      "button",
      {
        className: "orca-button plain",
        style: {
          width: "36px",
          height: "36px",
          padding: "0",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "6px",
          background: i === f ? "var(--orca-color-primary-5)" : "transparent",
          color: i === f ? "#fff" : "inherit"
        },
        onClick: () => w(f),
        title: f,
        children: /* @__PURE__ */ R.jsx("i", { className: f, style: { fontSize: "18px" } })
      },
      f
    )) }) })
  ] }) });
}
const le = window.React;
let T = null, Q = null, B = null, $ = null;
const ft = /* @__PURE__ */ new Map();
function se() {
  const i = new MutationObserver(() => {
    const o = document.querySelector(".orca-modal-overlay"), l = o == null ? void 0 : o.querySelector(".orca-settings");
    o && l && getComputedStyle(o).display !== "none" ? T || Lt(l) : T && Qt();
  });
  i.observe(document.body, { childList: !0, subtree: !0 }), Q = () => i.disconnect();
  const r = document.querySelector(".orca-modal-overlay"), n = r == null ? void 0 : r.querySelector(".orca-settings");
  r && n && getComputedStyle(r).display !== "none" && Lt(n);
}
function Lt(i) {
  T && T.disconnect(), Yt(i), T = new MutationObserver(() => {
    Yt(i);
  }), T.observe(i, { childList: !0, subtree: !0 });
}
function Yt(i) {
  const r = i.querySelectorAll(".item-horizontal, .item-vertical");
  for (const n of r) {
    const o = n;
    o.dataset.pinProcessed || ce(o);
  }
  fe(i);
}
function ce(i) {
  i.dataset.pinProcessed = "true";
  const r = Di(i);
  r && Ut(r) && Xt(i, r);
}
function fe(i) {
  var w, f, b;
  const r = i.querySelector(".sections .selected");
  if (!r || !r.classList.contains("plugin-item")) return;
  const n = r.querySelector("span"), o = ((w = n == null ? void 0 : n.textContent) == null ? void 0 : w.trim()) || "";
  if (!o) return;
  const l = (f = orca.state.plugins) == null ? void 0 : f[o];
  if (!(l != null && l.schema)) return;
  const c = i.querySelector("section .orca-memoizedviews-active");
  if (!c) return;
  const m = c.querySelectorAll(".item-horizontal, .item-vertical");
  for (const k of m) {
    const P = k;
    if (P.dataset.pinProcessed || !P.querySelector("button.orca-switch, button.orca-switch-on")) continue;
    const M = P.querySelector(".title"), A = ((b = M == null ? void 0 : M.textContent) == null ? void 0 : b.trim()) || "";
    let L = "";
    for (const [O, h] of Object.entries(l.schema))
      if ((h == null ? void 0 : h.label) === A || h != null && h.label && A.includes(h.label)) {
        L = O;
        break;
      }
    if (!L) continue;
    P.dataset.pinProcessed = "true";
    const U = {
      section: o,
      title: A,
      controlType: "switch",
      isPlugin: !0,
      pluginName: o,
      key: L
    };
    Ut(U) && Xt(P, U);
  }
}
function Xt(i, r) {
  const n = Qi(r.section, r.title, r.isPlugin, r.pluginName), o = st(n), l = document.createElement("span");
  l.style.cssText = "display: inline-flex; margin-left: 6px;";
  const c = i.querySelector(".title");
  c ? c.appendChild(l) : i.insertBefore(l, i.firstChild);
  const m = window.createRoot(l);
  ft.set(n, m), ut(m, l, r, n, o), i.dataset.pinId = n;
}
function ut(i, r, n, o, l) {
  const c = le.createElement, m = { current: null }, w = {
    width: "22px",
    height: "22px",
    padding: 0,
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "14px",
    opacity: l ? 1 : 0.7,
    transition: "opacity 0.2s",
    cursor: "pointer",
    background: "none",
    border: "none",
    color: "inherit"
  }, f = l ? l.icon : "ti ti-plus", b = l ? "var(--orca-color-primary-5)" : void 0, k = l ? `${l.title} - ${V("settings-pin.unpin")}` : V("settings-pin.pin"), P = (S) => {
    S.stopPropagation(), S.preventDefault(), st(o) ? Hi(o).then(() => {
      ut(i, r, n, o, void 0);
    }) : ue(m.current, n, o, () => {
      ut(i, r, n, o, st(o));
    });
  };
  i.render(
    c(
      orca.components.Tooltip,
      { text: k, placement: "horizontal" },
      c(
        "button",
        {
          ref: (S) => {
            m.current = S;
          },
          className: "orca-button plain settings-pin-btn",
          style: w,
          onClick: P,
          onMouseEnter: () => {
            const S = m.current;
            S && (S.style.opacity = "1");
          },
          onMouseLeave: () => {
            const S = m.current;
            S && (S.style.opacity = Xi(o) ? "1" : "0.7");
          }
        },
        c("i", { className: f, style: b ? { color: b } : void 0 })
      )
    )
  );
}
function ue(i, r, n, o) {
  const l = document.querySelector(".orca-modal-overlay");
  if (!l) {
    console.warn("图标选择器：未找到设置面板 overlay");
    return;
  }
  $ = document.createElement("div"), $.id = "settings-pin-icon-picker-mount", $.style.cssText = "position: absolute; z-index: 10000;", l.appendChild($), B = window.createRoot($);
  const c = (f) => {
    if (!f) return;
    const b = Wi(r), k = {
      id: n,
      icon: f,
      section: r.section,
      title: r.title,
      appKey: b.type === "app" ? b.appKey : b.settingKey,
      isPlugin: r.isPlugin,
      pluginName: r.pluginName,
      controlType: "switch"
    };
    Gi(k).then(() => {
      o();
    }), dt();
  }, m = () => {
    dt();
  }, w = window.React.createElement;
  B.render(
    w(
      orca.components.Popup,
      {
        visible: !0,
        onClose: m,
        refElement: { current: i },
        placement: "horizontal",
        defaultPlacement: "right",
        alignment: "top",
        offset: 4
      },
      w(ae, {
        selectedIcon: "",
        onSelect: c,
        onClose: m
      })
    )
  );
}
function dt() {
  B && (B.unmount(), B = null), $ && ($.remove(), $ = null);
}
function Qt() {
  T && (T.disconnect(), T = null), ft.forEach((i) => {
    try {
      i.unmount();
    } catch {
    }
  }), ft.clear(), document.querySelectorAll(".settings-pin-btn").forEach((i) => i.remove()), document.querySelectorAll("[data-pin-processed]").forEach((i) => {
    delete i.dataset.pinProcessed, delete i.dataset.pinId;
  }), dt();
}
function de() {
  Qt(), Q && (Q(), Q = null);
}
const pe = window.React;
function ge(i) {
  return (r, n) => {
    const o = pe.createElement, l = Kt(i), c = (m) => {
      const f = !Kt(i);
      me(i, f);
      const b = m.currentTarget, k = b == null ? void 0 : b.querySelector("i");
      k && (k.style.color = f ? "var(--orca-color-primary-5)" : "");
    };
    return o(
      orca.components.Tooltip,
      { text: i.title, placement: "horizontal" },
      o(
        "button",
        {
          className: "orca-button plain orca-block-editor-sidetools-btn",
          onClick: c
        },
        o("i", {
          className: i.icon,
          style: l ? { color: "var(--orca-color-primary-5)" } : void 0
        })
      )
    );
  };
}
function Kt(i) {
  var n;
  if (i.isPlugin && i.pluginName) {
    const o = (n = orca.state.plugins) == null ? void 0 : n[i.pluginName];
    return o != null && o.settings ? !!o.settings[i.appKey] : !1;
  }
  return !!orca.state.settings[i.appKey];
}
function me(i, r) {
  var n;
  if (i.isPlugin && i.pluginName) {
    const o = (n = orca.state.plugins) == null ? void 0 : n[i.pluginName];
    if (o != null && o.settings) {
      const l = o.settings[i.appKey];
      o.settings[i.appKey] = r, lt() && console.debug(
        `[SettingsPin] 开关切换: ${i.pluginName}.${i.title} (${i.appKey})`,
        `${JSON.stringify(l)} → ${r}`
      );
    }
  } else {
    const o = i.appKey, l = orca.state.settings[o];
    if (typeof l == "number") {
      const c = r ? 1 : 0;
      orca.state.settings[o] = c, lt() && console.debug(
        `[SettingsPin] 开关切换: ${i.section}.${i.title} (key=${o})`,
        `${l} → ${c}`
      );
    } else
      orca.state.settings[o] = r, lt() && console.debug(
        `[SettingsPin] 开关切换: ${i.section}.${i.title} (key=${o})`,
        `${l} → ${r}`
      );
  }
}
function Wt(i) {
  const r = `settings-pin.${i.id}`;
  orca.editorSidetools.registerEditorSidetool(r, {
    render: ge(i)
  }), console.debug(`已注册侧边栏工具: ${r}`);
}
function Zt(i) {
  const r = `settings-pin.${i.id}`;
  orca.editorSidetools.unregisterEditorSidetool(r), console.debug(`已注销侧边栏工具: ${r}`);
}
let C;
const he = {
  debugMode: {
    label: "调试模式",
    description: "开启后在控制台打印开关切换日志",
    type: "boolean",
    defaultValue: !1
  }
};
function lt() {
  var i, r;
  return C ? !!((r = (i = orca.state.plugins[C]) == null ? void 0 : i.settings) != null && r.debugMode) : !1;
}
async function be(i) {
  C = i, qi(orca.state.locale, { "zh-CN": Ni }), console.log(`${C} 设置固定功能加载中...`);
  try {
    Bi(C), await Ji(), await orca.plugins.setSettingsSchema(C, he), Ui((n, o) => {
      n && Wt(n), o && Zt({ id: o });
    });
    const r = Gt();
    for (const n of r)
      Wt(n);
    se(), console.log(`${C} 设置固定功能已加载，${r.length} 个设置已固定`);
  } catch (r) {
    console.error(`${C} 加载失败:`, r);
  }
}
async function ve() {
  console.log(`${C} 设置固定功能卸载中...`);
  const i = Gt();
  for (const r of i)
    Zt(r);
  de(), console.log(`${C} 设置固定功能已卸载`);
}
export {
  lt as isDebugMode,
  be as load,
  ve as unload
};
