let Jt = "en", Gt = {};
function Ki(i, e) {
  Jt = i, Gt = e;
}
function B(i, e, o) {
  var l;
  return ((l = Gt[o ?? Jt]) == null ? void 0 : l[i]) ?? i;
}
const Yi = {
  "settings-pin.pin": "固定到侧边栏",
  "settings-pin.unpin": "取消固定",
  "settings-pin.search-icons": "搜索图标...",
  "settings-pin.no-icons-found": "未找到图标",
  "settings-pin.clear": "关闭"
}, Vi = {
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
function Wi(i) {
  var b;
  const e = i.querySelector(".title");
  if (!e) return null;
  const o = ((b = e.textContent) == null ? void 0 : b.trim()) || "";
  if (!o) return null;
  const n = i.querySelector(".option");
  if (!n) return null;
  const l = Bi(n);
  if (!l) return null;
  const c = Ui();
  if (!c) return null;
  const g = Ji();
  let y, f = 0;
  if (g)
    y = Gi(), f = Hi(y, o);
  else {
    const k = Vi[c];
    k && k[o] ? f = k[o] : (console.debug(`未知设置映射: ${c}.${o}`), f = -1);
  }
  return {
    section: c,
    title: o,
    controlType: l,
    element: i,
    isPlugin: g,
    pluginName: y,
    key: f
  };
}
function Bi(i) {
  if (i.querySelector("button.orca-switch, button.orca-switch-on"))
    return "switch";
  if (i.querySelector("button.orca-button.plain.orca-select-button"))
    return "select";
  if (i.querySelector("span.orca-input > input.orca-input-actualinput")) {
    const e = i.querySelector("input");
    return e && e.type === "color" ? "color" : "input";
  }
  return i.querySelector("div.orca-segmented") ? "segmented" : null;
}
function Ui() {
  var n, l;
  const i = document.querySelector(".orca-modal-overlay");
  if (!i) return "";
  const e = i.querySelector(".sections .item.selected");
  if (e) {
    const c = e.querySelector("span");
    if (c) return ((n = c.textContent) == null ? void 0 : n.trim()) || "";
  }
  const o = i.querySelector("section .orca-memoizedviews-active h2");
  return o && ((l = o.textContent) == null ? void 0 : l.trim()) || "";
}
function Ji(i) {
  const e = document.querySelector(".orca-modal-overlay");
  if (!e) return !1;
  const o = e.querySelector(".sections .selected");
  return !!(o && o.classList.contains("plugin-item"));
}
function Gi(i) {
  var n;
  const e = document.querySelector(".orca-modal-overlay");
  if (!e) return "";
  const o = e.querySelector(".sections .plugin-item.selected span");
  return o && ((n = o.textContent) == null ? void 0 : n.trim()) || "";
}
function Hi(i, e) {
  var n;
  const o = (n = orca.state.plugins) == null ? void 0 : n[i];
  if (!(o != null && o.schema)) return "";
  for (const [l, c] of Object.entries(o.schema))
    if ((c == null ? void 0 : c.label) === e)
      return l;
  for (const [l, c] of Object.entries(o.schema))
    if (c != null && c.label && e.includes(c.label))
      return l;
  return console.debug(`插件 ${i} 的设置 "${e}" 未找到对应 key`), "";
}
function Xi(i) {
  return i.isPlugin && i.pluginName ? { type: "plugin", pluginName: i.pluginName, settingKey: String(i.key) } : { type: "app", appKey: Number(i.key) };
}
const Qi = [
  // 快捷键设置面板（无有效开关）
  { type: "section", value: "快捷键" },
  { type: "section", value: "Keyboard shortcuts" },
  // 调试模式（内部调试用，不应钉选）
  { type: "settingName", value: "调试模式" },
  { type: "settingName", value: "Debug mode" },
  // 启用插件（钉选后点击无效，虎鲸内部处理）
  { type: "settingName", value: "启用插件" },
  { type: "settingName", value: "Enable plugin" }
];
function Ht(i, e = Qi) {
  if (i.controlType !== "switch")
    return !1;
  for (const o of e)
    switch (o.type) {
      case "controlType":
        if (i.controlType === o.value) return !1;
        break;
      case "settingName":
        if (i.title === o.value) return !1;
        break;
      case "section":
        if (i.section === o.value) return !1;
        break;
    }
  return !0;
}
let ht, Xt = () => !1;
const j = /* @__PURE__ */ new Map();
let I = null;
function Zi(i) {
  Xt = i;
}
function te(i) {
  ht = i;
}
function ie(i) {
  I = i;
}
async function ee() {
  try {
    const i = await orca.plugins.getData(ht, "pinned");
    if (i && typeof i == "string") {
      const e = JSON.parse(i);
      j.clear();
      for (const o of e)
        j.set(o.id, o);
      Xt() && console.debug(`[PADD] 已加载 ${j.size} 个钉选设置`);
    }
  } catch (i) {
    console.warn("[PADD] 加载钉选设置失败:", i);
  }
}
async function Qt() {
  try {
    const i = Array.from(j.values());
    await orca.plugins.setData(ht, "pinned", JSON.stringify(i));
  } catch (i) {
    console.error("[PADD] 保存钉选设置失败:", i);
  }
}
async function re(i) {
  j.set(i.id, i), await Qt(), I == null || I(i);
}
async function oe(i) {
  j.delete(i) && (await Qt(), I == null || I(void 0, i));
}
function Zt() {
  return Array.from(j.values());
}
function pt(i) {
  return j.get(i);
}
function ne(i) {
  return j.has(i);
}
function ae(i, e, o, n) {
  const l = o ? "plugin" : "app", c = o && n ? `.${n}` : "";
  return `${l}${c}.${e}`;
}
var ti = { exports: {} };
const le = React;
var W = {}, Kt;
function se() {
  if (Kt) return W;
  Kt = 1;
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
    var i = le, e = Symbol.for("react.element"), o = Symbol.for("react.portal"), n = Symbol.for("react.fragment"), l = Symbol.for("react.strict_mode"), c = Symbol.for("react.profiler"), g = Symbol.for("react.provider"), y = Symbol.for("react.context"), f = Symbol.for("react.forward_ref"), b = Symbol.for("react.suspense"), k = Symbol.for("react.suspense_list"), R = Symbol.for("react.memo"), S = Symbol.for("react.lazy"), L = Symbol.for("react.offscreen"), N = Symbol.iterator, K = "@@iterator";
    function G(t) {
      if (t === null || typeof t != "object")
        return null;
      var r = N && t[N] || t[K];
      return typeof r == "function" ? r : null;
    }
    var D = i.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
    function h(t) {
      {
        for (var r = arguments.length, a = new Array(r > 1 ? r - 1 : 0), s = 1; s < r; s++)
          a[s - 1] = arguments[s];
        li("error", t, a);
      }
    }
    function li(t, r, a) {
      {
        var s = D.ReactDebugCurrentFrame, p = s.getStackAddendum();
        p !== "" && (r += "%s", a = a.concat([p]));
        var m = a.map(function(d) {
          return String(d);
        });
        m.unshift("Warning: " + r), Function.prototype.apply.call(console[t], console, m);
      }
    }
    var si = !1, ci = !1, fi = !1, ui = !1, di = !1, bt;
    bt = Symbol.for("react.module.reference");
    function pi(t) {
      return !!(typeof t == "string" || typeof t == "function" || t === n || t === c || di || t === l || t === b || t === k || ui || t === L || si || ci || fi || typeof t == "object" && t !== null && (t.$$typeof === S || t.$$typeof === R || t.$$typeof === g || t.$$typeof === y || t.$$typeof === f || // This needs to include all possible module reference object
      // types supported by any Flight configuration anywhere since
      // we don't know which Flight build this will end up being used
      // with.
      t.$$typeof === bt || t.getModuleId !== void 0));
    }
    function gi(t, r, a) {
      var s = t.displayName;
      if (s)
        return s;
      var p = r.displayName || r.name || "";
      return p !== "" ? a + "(" + p + ")" : a;
    }
    function vt(t) {
      return t.displayName || "Context";
    }
    function O(t) {
      if (t == null)
        return null;
      if (typeof t.tag == "number" && h("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), typeof t == "function")
        return t.displayName || t.name || null;
      if (typeof t == "string")
        return t;
      switch (t) {
        case n:
          return "Fragment";
        case o:
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
          case y:
            var r = t;
            return vt(r) + ".Consumer";
          case g:
            var a = t;
            return vt(a._context) + ".Provider";
          case f:
            return gi(t, t.render, "ForwardRef");
          case R:
            var s = t.displayName || null;
            return s !== null ? s : O(t.type) || "Memo";
          case S: {
            var p = t, m = p._payload, d = p._init;
            try {
              return O(d(m));
            } catch {
              return null;
            }
          }
        }
      return null;
    }
    var A = Object.assign, Y = 0, yt, wt, kt, St, xt, Et, Pt;
    function Rt() {
    }
    Rt.__reactDisabledLog = !0;
    function mi() {
      {
        if (Y === 0) {
          yt = console.log, wt = console.info, kt = console.warn, St = console.error, xt = console.group, Et = console.groupCollapsed, Pt = console.groupEnd;
          var t = {
            configurable: !0,
            enumerable: !0,
            value: Rt,
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
    function hi() {
      {
        if (Y--, Y === 0) {
          var t = {
            configurable: !0,
            enumerable: !0,
            writable: !0
          };
          Object.defineProperties(console, {
            log: A({}, t, {
              value: yt
            }),
            info: A({}, t, {
              value: wt
            }),
            warn: A({}, t, {
              value: kt
            }),
            error: A({}, t, {
              value: St
            }),
            group: A({}, t, {
              value: xt
            }),
            groupCollapsed: A({}, t, {
              value: Et
            }),
            groupEnd: A({}, t, {
              value: Pt
            })
          });
        }
        Y < 0 && h("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
      }
    }
    var nt = D.ReactCurrentDispatcher, at;
    function H(t, r, a) {
      {
        if (at === void 0)
          try {
            throw Error();
          } catch (p) {
            var s = p.stack.trim().match(/\n( *(at )?)/);
            at = s && s[1] || "";
          }
        return `
` + at + t;
      }
    }
    var lt = !1, X;
    {
      var bi = typeof WeakMap == "function" ? WeakMap : Map;
      X = new bi();
    }
    function Ct(t, r) {
      if (!t || lt)
        return "";
      {
        var a = X.get(t);
        if (a !== void 0)
          return a;
      }
      var s;
      lt = !0;
      var p = Error.prepareStackTrace;
      Error.prepareStackTrace = void 0;
      var m;
      m = nt.current, nt.current = null, mi();
      try {
        if (r) {
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
`), v = u.length - 1, w = x.length - 1; v >= 1 && w >= 0 && u[v] !== x[w]; )
            w--;
          for (; v >= 1 && w >= 0; v--, w--)
            if (u[v] !== x[w]) {
              if (v !== 1 || w !== 1)
                do
                  if (v--, w--, w < 0 || u[v] !== x[w]) {
                    var C = `
` + u[v].replace(" at new ", " at ");
                    return t.displayName && C.includes("<anonymous>") && (C = C.replace("<anonymous>", t.displayName)), typeof t == "function" && X.set(t, C), C;
                  }
                while (v >= 1 && w >= 0);
              break;
            }
        }
      } finally {
        lt = !1, nt.current = m, hi(), Error.prepareStackTrace = p;
      }
      var M = t ? t.displayName || t.name : "", $ = M ? H(M) : "";
      return typeof t == "function" && X.set(t, $), $;
    }
    function vi(t, r, a) {
      return Ct(t, !1);
    }
    function yi(t) {
      var r = t.prototype;
      return !!(r && r.isReactComponent);
    }
    function Q(t, r, a) {
      if (t == null)
        return "";
      if (typeof t == "function")
        return Ct(t, yi(t));
      if (typeof t == "string")
        return H(t);
      switch (t) {
        case b:
          return H("Suspense");
        case k:
          return H("SuspenseList");
      }
      if (typeof t == "object")
        switch (t.$$typeof) {
          case f:
            return vi(t.render);
          case R:
            return Q(t.type, r, a);
          case S: {
            var s = t, p = s._payload, m = s._init;
            try {
              return Q(m(p), r, a);
            } catch {
            }
          }
        }
      return "";
    }
    var V = Object.prototype.hasOwnProperty, _t = {}, Tt = D.ReactDebugCurrentFrame;
    function Z(t) {
      if (t) {
        var r = t._owner, a = Q(t.type, t._source, r ? r.type : null);
        Tt.setExtraStackFrame(a);
      } else
        Tt.setExtraStackFrame(null);
    }
    function wi(t, r, a, s, p) {
      {
        var m = Function.call.bind(V);
        for (var d in t)
          if (m(t, d)) {
            var u = void 0;
            try {
              if (typeof t[d] != "function") {
                var x = Error((s || "React class") + ": " + a + " type `" + d + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof t[d] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                throw x.name = "Invariant Violation", x;
              }
              u = t[d](r, d, s, a, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
            } catch (v) {
              u = v;
            }
            u && !(u instanceof Error) && (Z(p), h("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", s || "React class", a, d, typeof u), Z(null)), u instanceof Error && !(u.message in _t) && (_t[u.message] = !0, Z(p), h("Failed %s type: %s", a, u.message), Z(null));
          }
      }
    }
    var ki = Array.isArray;
    function st(t) {
      return ki(t);
    }
    function Si(t) {
      {
        var r = typeof Symbol == "function" && Symbol.toStringTag, a = r && t[Symbol.toStringTag] || t.constructor.name || "Object";
        return a;
      }
    }
    function xi(t) {
      try {
        return jt(t), !1;
      } catch {
        return !0;
      }
    }
    function jt(t) {
      return "" + t;
    }
    function Dt(t) {
      if (xi(t))
        return h("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", Si(t)), jt(t);
    }
    var Ot = D.ReactCurrentOwner, Ei = {
      key: !0,
      ref: !0,
      __self: !0,
      __source: !0
    }, zt, At;
    function Pi(t) {
      if (V.call(t, "ref")) {
        var r = Object.getOwnPropertyDescriptor(t, "ref").get;
        if (r && r.isReactWarning)
          return !1;
      }
      return t.ref !== void 0;
    }
    function Ri(t) {
      if (V.call(t, "key")) {
        var r = Object.getOwnPropertyDescriptor(t, "key").get;
        if (r && r.isReactWarning)
          return !1;
      }
      return t.key !== void 0;
    }
    function Ci(t, r) {
      typeof t.ref == "string" && Ot.current;
    }
    function _i(t, r) {
      {
        var a = function() {
          zt || (zt = !0, h("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", r));
        };
        a.isReactWarning = !0, Object.defineProperty(t, "key", {
          get: a,
          configurable: !0
        });
      }
    }
    function Ti(t, r) {
      {
        var a = function() {
          At || (At = !0, h("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", r));
        };
        a.isReactWarning = !0, Object.defineProperty(t, "ref", {
          get: a,
          configurable: !0
        });
      }
    }
    var ji = function(t, r, a, s, p, m, d) {
      var u = {
        // This tag allows us to uniquely identify this as a React Element
        $$typeof: e,
        // Built-in properties that belong on the element
        type: t,
        key: r,
        ref: a,
        props: d,
        // Record the component responsible for creating this element.
        _owner: m
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
    function Di(t, r, a, s, p) {
      {
        var m, d = {}, u = null, x = null;
        a !== void 0 && (Dt(a), u = "" + a), Ri(r) && (Dt(r.key), u = "" + r.key), Pi(r) && (x = r.ref, Ci(r, p));
        for (m in r)
          V.call(r, m) && !Ei.hasOwnProperty(m) && (d[m] = r[m]);
        if (t && t.defaultProps) {
          var v = t.defaultProps;
          for (m in v)
            d[m] === void 0 && (d[m] = v[m]);
        }
        if (u || x) {
          var w = typeof t == "function" ? t.displayName || t.name || "Unknown" : t;
          u && _i(d, w), x && Ti(d, w);
        }
        return ji(t, u, x, p, s, Ot.current, d);
      }
    }
    var ct = D.ReactCurrentOwner, $t = D.ReactDebugCurrentFrame;
    function F(t) {
      if (t) {
        var r = t._owner, a = Q(t.type, t._source, r ? r.type : null);
        $t.setExtraStackFrame(a);
      } else
        $t.setExtraStackFrame(null);
    }
    var ft;
    ft = !1;
    function ut(t) {
      return typeof t == "object" && t !== null && t.$$typeof === e;
    }
    function qt() {
      {
        if (ct.current) {
          var t = O(ct.current.type);
          if (t)
            return `

Check the render method of \`` + t + "`.";
        }
        return "";
      }
    }
    function Oi(t) {
      return "";
    }
    var It = {};
    function zi(t) {
      {
        var r = qt();
        if (!r) {
          var a = typeof t == "string" ? t : t.displayName || t.name;
          a && (r = `

Check the top-level render call using <` + a + ">.");
        }
        return r;
      }
    }
    function Nt(t, r) {
      {
        if (!t._store || t._store.validated || t.key != null)
          return;
        t._store.validated = !0;
        var a = zi(r);
        if (It[a])
          return;
        It[a] = !0;
        var s = "";
        t && t._owner && t._owner !== ct.current && (s = " It was passed a child from " + O(t._owner.type) + "."), F(t), h('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', a, s), F(null);
      }
    }
    function Ft(t, r) {
      {
        if (typeof t != "object")
          return;
        if (st(t))
          for (var a = 0; a < t.length; a++) {
            var s = t[a];
            ut(s) && Nt(s, r);
          }
        else if (ut(t))
          t._store && (t._store.validated = !0);
        else if (t) {
          var p = G(t);
          if (typeof p == "function" && p !== t.entries)
            for (var m = p.call(t), d; !(d = m.next()).done; )
              ut(d.value) && Nt(d.value, r);
        }
      }
    }
    function Ai(t) {
      {
        var r = t.type;
        if (r == null || typeof r == "string")
          return;
        var a;
        if (typeof r == "function")
          a = r.propTypes;
        else if (typeof r == "object" && (r.$$typeof === f || // Note: Memo only checks outer props here.
        // Inner props are checked in the reconciler.
        r.$$typeof === R))
          a = r.propTypes;
        else
          return;
        if (a) {
          var s = O(r);
          wi(a, t.props, "prop", s, t);
        } else if (r.PropTypes !== void 0 && !ft) {
          ft = !0;
          var p = O(r);
          h("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", p || "Unknown");
        }
        typeof r.getDefaultProps == "function" && !r.getDefaultProps.isReactClassApproved && h("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
      }
    }
    function $i(t) {
      {
        for (var r = Object.keys(t.props), a = 0; a < r.length; a++) {
          var s = r[a];
          if (s !== "children" && s !== "key") {
            F(t), h("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", s), F(null);
            break;
          }
        }
        t.ref !== null && (F(t), h("Invalid attribute `ref` supplied to `React.Fragment`."), F(null));
      }
    }
    var Mt = {};
    function Lt(t, r, a, s, p, m) {
      {
        var d = pi(t);
        if (!d) {
          var u = "";
          (t === void 0 || typeof t == "object" && t !== null && Object.keys(t).length === 0) && (u += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
          var x = Oi();
          x ? u += x : u += qt();
          var v;
          t === null ? v = "null" : st(t) ? v = "array" : t !== void 0 && t.$$typeof === e ? (v = "<" + (O(t.type) || "Unknown") + " />", u = " Did you accidentally export a JSX literal instead of a component?") : v = typeof t, h("React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", v, u);
        }
        var w = Di(t, r, a, p, m);
        if (w == null)
          return w;
        if (d) {
          var C = r.children;
          if (C !== void 0)
            if (s)
              if (st(C)) {
                for (var M = 0; M < C.length; M++)
                  Ft(C[M], t);
                Object.freeze && Object.freeze(C);
              } else
                h("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
            else
              Ft(C, t);
        }
        if (V.call(r, "key")) {
          var $ = O(t), E = Object.keys(r).filter(function(Li) {
            return Li !== "key";
          }), dt = E.length > 0 ? "{key: someKey, " + E.join(": ..., ") + ": ...}" : "{key: someKey}";
          if (!Mt[$ + dt]) {
            var Mi = E.length > 0 ? "{" + E.join(": ..., ") + ": ...}" : "{}";
            h(`A props object containing a "key" prop is being spread into JSX:
  let props = %s;
  <%s {...props} />
React keys must be passed directly to JSX without using spread:
  let props = %s;
  <%s key={someKey} {...props} />`, dt, $, Mi, $), Mt[$ + dt] = !0;
          }
        }
        return t === n ? $i(w) : Ai(w), w;
      }
    }
    function qi(t, r, a) {
      return Lt(t, r, a, !0);
    }
    function Ii(t, r, a) {
      return Lt(t, r, a, !1);
    }
    var Ni = Ii, Fi = qi;
    W.Fragment = n, W.jsx = Ni, W.jsxs = Fi;
  }(), W;
}
ti.exports = se();
var P = ti.exports;
const gt = [
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
function ce(i) {
  const e = i.toLowerCase().trim();
  return e ? gt.filter((o) => o.replace("ti ti-", "").includes(e)) : gt;
}
const fe = window.React, { useState: ue, useRef: de, useEffect: Yt, useCallback: pe } = fe;
function ge({ selectedIcon: i, onSelect: e, onClose: o }) {
  const [n, l] = ue(""), c = de(null);
  Yt(() => {
    var f;
    (f = c.current) == null || f.focus();
  }, []), Yt(() => {
    const f = (b) => {
      b.key === "Escape" && o();
    };
    return document.addEventListener("keydown", f), () => document.removeEventListener("keydown", f);
  }, [o]);
  const g = n.trim() ? ce(n) : gt, y = pe((f) => {
    e(f);
  }, [e]);
  return /* @__PURE__ */ P.jsx("div", { className: "orca-menu orca-context-menu", children: /* @__PURE__ */ P.jsxs("div", { className: "orca-icon-picker", style: { width: "300px" }, children: [
    /* @__PURE__ */ P.jsxs("div", { className: "orca-icon-picker-header", style: {
      display: "flex",
      alignItems: "center",
      marginBottom: "8px",
      gap: "4px"
    }, children: [
      /* @__PURE__ */ P.jsx("span", { className: "orca-input orca-icon-picker-search", style: { flex: "1 1 0%" }, children: /* @__PURE__ */ P.jsxs("span", { className: "orca-input-input", children: [
        /* @__PURE__ */ P.jsx("i", { className: "ti ti-search orca-input-pre" }),
        /* @__PURE__ */ P.jsx(
          "input",
          {
            ref: c,
            className: "orca-input-actualinput",
            placeholder: B("settings-pin.search-icons"),
            value: n,
            onChange: (f) => l(f.target.value)
          }
        )
      ] }) }),
      /* @__PURE__ */ P.jsx(
        "button",
        {
          className: "orca-button outline",
          tabIndex: -1,
          onClick: o,
          title: B("settings-pin.clear"),
          children: /* @__PURE__ */ P.jsx("i", { className: "ti ti-ban" })
        }
      )
    ] }),
    /* @__PURE__ */ P.jsx("div", { className: "orca-icon-picker-content", style: {
      width: "300px",
      maxHeight: "250px",
      overflowY: "auto"
    }, children: g.length === 0 ? /* @__PURE__ */ P.jsx("div", { style: {
      textAlign: "center",
      padding: "16px",
      color: "var(--orca-color-text-2)"
    }, children: B("settings-pin.no-icons-found") }) : /* @__PURE__ */ P.jsx("div", { style: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(36px, 1fr))",
      gap: "2px"
    }, children: g.map((f) => /* @__PURE__ */ P.jsx(
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
        onClick: () => y(f),
        title: f,
        children: /* @__PURE__ */ P.jsx("i", { className: f, style: { fontSize: "18px" } })
      },
      f
    )) }) })
  ] }) });
}
const me = window.React;
let T = null, tt = null, U = null, z = null;
const et = /* @__PURE__ */ new Map();
function he() {
  const i = new MutationObserver(() => {
    const n = document.querySelector(".orca-modal-overlay"), l = n == null ? void 0 : n.querySelector(".orca-settings");
    n && l && getComputedStyle(n).display !== "none" ? T || Vt(l) : T && ei();
  });
  i.observe(document.body, { childList: !0, subtree: !0 }), tt = () => i.disconnect();
  const e = document.querySelector(".orca-modal-overlay"), o = e == null ? void 0 : e.querySelector(".orca-settings");
  e && o && getComputedStyle(e).display !== "none" && Vt(o);
}
function Vt(i) {
  T && T.disconnect(), Wt(i), T = new MutationObserver(() => {
    Wt(i);
  }), T.observe(i, { childList: !0, subtree: !0 });
}
function Wt(i) {
  const e = i.querySelectorAll(".item-horizontal, .item-vertical");
  for (const o of e) {
    const n = o;
    n.dataset.pinProcessed || be(n);
  }
  ve(i);
}
function be(i) {
  i.dataset.pinProcessed = "true";
  const e = Wi(i);
  e && Ht(e) && ii(i, e);
}
function ve(i) {
  var y, f, b;
  const e = i.querySelector(".sections .selected");
  if (!e || !e.classList.contains("plugin-item")) return;
  const o = e.querySelector("span"), n = ((y = o == null ? void 0 : o.textContent) == null ? void 0 : y.trim()) || "";
  if (!n) return;
  const l = (f = orca.state.plugins) == null ? void 0 : f[n];
  if (!(l != null && l.schema)) return;
  const c = i.querySelector("section .orca-memoizedviews-active");
  if (!c) return;
  const g = c.querySelectorAll(".item-horizontal, .item-vertical");
  for (const k of g) {
    const R = k;
    if (R.dataset.pinProcessed || !R.querySelector("button.orca-switch, button.orca-switch-on")) continue;
    const L = R.querySelector(".title"), N = ((b = L == null ? void 0 : L.textContent) == null ? void 0 : b.trim()) || "";
    let K = "";
    for (const [D, h] of Object.entries(l.schema))
      if ((h == null ? void 0 : h.label) === N || h != null && h.label && N.includes(h.label)) {
        K = D;
        break;
      }
    if (!K) continue;
    R.dataset.pinProcessed = "true";
    const G = {
      section: n,
      title: N,
      controlType: "switch",
      isPlugin: !0,
      pluginName: n,
      key: K
    };
    Ht(G) && ii(R, G);
  }
}
function ii(i, e) {
  const o = ae(e.section, e.title, e.isPlugin, e.pluginName), n = pt(o), l = i.querySelector(".title"), c = l == null ? void 0 : l.querySelector(`[data-padd-mount="${o}"]`);
  if (c) {
    const f = et.get(o);
    if (f) {
      rt(f, c, e, o, n);
      return;
    }
  }
  const g = document.createElement("span");
  g.style.cssText = "display: inline-flex; margin-left: 6px;", g.dataset.paddMount = o, l ? l.appendChild(g) : i.insertBefore(g, i.firstChild);
  const y = window.createRoot(g);
  et.set(o, y), rt(y, g, e, o, n), i.dataset.pinId = o;
}
function rt(i, e, o, n, l) {
  const c = me.createElement, g = { current: null }, y = {
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
  }, f = l ? l.icon : "ti ti-plus", b = l ? "var(--orca-color-primary-5)" : void 0, k = l ? `${l.title} - ${B("settings-pin.unpin")}` : B("settings-pin.pin"), R = (S) => {
    S.stopPropagation(), S.preventDefault(), pt(n) ? oe(n).then(() => {
      rt(i, e, o, n, void 0);
    }) : ye(g.current, o, n, () => {
      rt(i, e, o, n, pt(n));
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
            g.current = S;
          },
          className: "orca-button plain settings-pin-btn",
          style: y,
          onClick: R,
          onMouseEnter: () => {
            const S = g.current;
            S && (S.style.opacity = "1");
          },
          onMouseLeave: () => {
            const S = g.current;
            S && (S.style.opacity = ne(n) ? "1" : "0.7");
          }
        },
        c("i", { className: f, style: b ? { color: b } : void 0 })
      )
    )
  );
}
function ye(i, e, o, n) {
  const l = document.querySelector(".orca-modal-overlay");
  if (!l) {
    console.warn("图标选择器：未找到设置面板 overlay");
    return;
  }
  z = document.createElement("div"), z.id = "settings-pin-icon-picker-mount", z.style.cssText = "position: absolute; z-index: 10000;", l.appendChild(z), U = window.createRoot(z);
  const c = (f) => {
    if (!f) return;
    const b = Xi(e), k = {
      id: o,
      icon: f,
      section: e.section,
      title: e.title,
      appKey: b.type === "app" ? b.appKey : b.settingKey,
      isPlugin: e.isPlugin,
      pluginName: e.pluginName,
      controlType: "switch"
    };
    re(k).then(() => {
      n();
    }), mt();
  }, g = () => {
    mt();
  }, y = window.React.createElement;
  U.render(
    y(
      orca.components.Popup,
      {
        visible: !0,
        onClose: g,
        refElement: { current: i },
        placement: "horizontal",
        defaultPlacement: "right",
        alignment: "top",
        offset: 4
      },
      y(ge, {
        selectedIcon: "",
        onSelect: c,
        onClose: g
      })
    )
  );
}
function mt() {
  U && (U.unmount(), U = null), z && (z.remove(), z = null);
}
function ei() {
  T && (T.disconnect(), T = null), et.forEach((i) => {
    try {
      i.unmount();
    } catch {
    }
  }), et.clear(), document.querySelectorAll("[data-padd-mount]").forEach((i) => i.remove()), document.querySelectorAll(".settings-pin-btn").forEach((i) => i.remove()), document.querySelectorAll("[data-pin-processed]").forEach((i) => {
    delete i.dataset.pinProcessed, delete i.dataset.pinId;
  }), mt();
}
function we() {
  ei(), tt && (tt(), tt = null);
}
const ke = window.React;
function Se(i) {
  return (e, o) => {
    const n = ke.createElement, l = Bt(i), c = (g) => {
      const f = !Bt(i);
      xe(i, f);
      const b = g.currentTarget, k = b == null ? void 0 : b.querySelector("i");
      k && (k.style.color = f ? "var(--orca-color-primary-5)" : "");
    };
    return n(
      orca.components.Tooltip,
      { text: i.title, placement: "horizontal" },
      n(
        "button",
        {
          className: "orca-button plain orca-block-editor-sidetools-btn",
          onClick: c
        },
        n("i", {
          className: i.icon,
          style: l ? { color: "var(--orca-color-primary-5)" } : void 0
        })
      )
    );
  };
}
function Bt(i) {
  var o;
  if (i.isPlugin && i.pluginName) {
    const n = (o = orca.state.plugins) == null ? void 0 : o[i.pluginName];
    return n != null && n.settings ? !!n.settings[i.appKey] : !1;
  }
  return !!orca.state.settings[i.appKey];
}
function xe(i, e) {
  var o;
  if (i.isPlugin && i.pluginName) {
    const n = (o = orca.state.plugins) == null ? void 0 : o[i.pluginName];
    if (n != null && n.settings) {
      const l = n.settings[i.appKey];
      n.settings[i.appKey] = e, J() && console.debug(
        `[PADD] 开关切换: ${i.pluginName}.${i.title} (${i.appKey})`,
        `${JSON.stringify(l)} → ${e}`
      );
    }
  } else {
    const n = i.appKey, l = orca.state.settings[n];
    if (typeof l == "number") {
      const c = e ? 1 : 0;
      orca.state.settings[n] = c, J() && console.debug(
        `[PADD] 开关切换: ${i.section}.${i.title} (key=${n})`,
        `${l} → ${c}`
      );
    } else
      orca.state.settings[n] = e, J() && console.debug(
        `[PADD] 开关切换: ${i.section}.${i.title} (key=${n})`,
        `${l} → ${e}`
      );
  }
}
function ri(i) {
  const e = `padd.${i.id}`;
  orca.editorSidetools.registerEditorSidetool(e, {
    render: Se(i)
  }), J() && console.debug(`[PADD] 已注册侧边栏工具: ${e}`);
}
function oi(i) {
  const e = `padd.${i.id}`;
  orca.editorSidetools.unregisterEditorSidetool(e), J() && console.debug(`[PADD] 已注销侧边栏工具: ${e}`);
}
const { subscribe: Ee } = window.Valtio;
let _, it = null, q = !0, ot = !1;
const Pe = {
  paddEnabled: {
    label: "PADD | 设置面板钉选",
    description: "将虎鲸笔记设置面板中的开关类型设置钉选到编辑器侧边栏，一键切换。关闭后侧边栏钉选图标将隐藏。",
    type: "boolean",
    defaultValue: !0
  },
  debugMode: {
    label: "调试模式",
    description: "开启后在控制台打印开关切换日志",
    type: "boolean",
    defaultValue: !1
  }
};
function J() {
  return ot;
}
function Re() {
  return q;
}
function ni() {
  const i = Zt();
  for (const e of i)
    ri(e);
  he(), console.log(`[PADD] 功能已启用，${i.length} 个设置已钉选`);
}
function ai() {
  const i = Zt();
  for (const e of i)
    oi(e);
  we(), console.log("[PADD] 功能已禁用");
}
function Ut() {
  var n;
  const i = (n = orca.state.plugins[_]) == null ? void 0 : n.settings, e = (i == null ? void 0 : i.paddEnabled) !== !1, o = !!(i != null && i.debugMode);
  e !== q && (q = e, console.log(`[PADD] 开关状态变化 → ${q}`), q ? ni() : ai()), o !== ot && (ot = o);
}
async function Ce(i) {
  _ = i, Ki(orca.state.locale, { "zh-CN": Yi }), console.log(`${_} LCARS 工具箱加载中...`);
  try {
    te(_), Zi(() => ot), await ee(), await orca.plugins.setSettingsSchema(_, Pe);
    const e = orca.state.plugins[_];
    e && (e.settings || (e.settings = {}), e.settings.paddEnabled === void 0 && (e.settings.paddEnabled = !0)), ie((o, n) => {
      q && (o && ri(o), n && oi({ id: n }));
    }), Ut(), it = Ee(orca.state.plugins, () => {
      Ut();
    }), q && ni(), console.log(`${_} LCARS 工具箱已加载`);
  } catch (e) {
    console.error(`${_} 加载失败:`, e);
  }
}
async function _e() {
  console.log(`${_} LCARS 工具箱卸载中...`), it && (it(), it = null), ai(), console.log(`${_} LCARS 工具箱已卸载`);
}
export {
  J as isDebugMode,
  Re as isPADDEnabled,
  Ce as load,
  _e as unload
};
