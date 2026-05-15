let Ri = "en", _i = {};
function Ie(t, e) {
  Ri = t, _i = e;
}
function $(t, e, o) {
  var a;
  return ((a = _i[Ri]) == null ? void 0 : a[t]) ?? t;
}
const Ne = {
  "settings-pin.pin": "固定到侧边栏",
  "settings-pin.unpin": "取消固定",
  "settings-pin.search-icons": "搜索图标...",
  "settings-pin.no-icons-found": "未找到图标",
  "settings-pin.clear": "关闭",
  // Settings schema labels & descriptions
  "📱 PADD ► Pin Settings to Sidebar ◄": "📱 个人终端 | PADD ► 设置面板钉选 ◄",
  "Pin boolean settings from the preferences panel to the editor sidebar for one-tap toggling. PADD (Personal Access Display Device) is a handheld terminal from Star Trek.": "将虎鲸笔记设置面板中的开关类型设置钉选到编辑器侧边栏，一键切换。PADD（Personal Access Display Device）是星际迷航中的个人掌上终端。",
  "✨ Morphic Field ► Drag to Resize Editor ◄": "✨ 变形场 | Morphic Field ► 编辑区域宽度调整 ◄",
  "Drag handles to expand the editor width. 0% = original width, drag to limit = fill available space. Double-click handle to reset. Morphic Field is the underlying force of shape-shifting in Star Trek.": "启用后可拖拽手柄展宽编辑区。0%=原始宽度，拖拽至极限=占满可用空间。双击手柄重置。变形场（Morphic Field）是星际迷航中形态变换的底层力场。",
  "Debug Mode": "调试模式",
  "Enable console logging for setting toggles and show debug panel in editor area.": "开启后在控制台打印开关切换日志，编辑区显示调试面板。"
}, Le = {
  "settings-pin.pin": "Pin to sidebar",
  "settings-pin.unpin": "Unpin",
  "settings-pin.search-icons": "Search icons...",
  "settings-pin.no-icons-found": "No icons found",
  "settings-pin.clear": "Close"
}, je = {
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
function ze(t) {
  var h;
  const e = t.querySelector(".title");
  if (!e) return null;
  const o = ((h = e.textContent) == null ? void 0 : h.trim()) || "";
  if (!o) return null;
  const r = t.querySelector(".option");
  if (!r) return null;
  const a = qe(r);
  if (!a) return null;
  const s = Fe();
  if (!s) return null;
  const f = We();
  let g, c = 0;
  if (f)
    g = Be(), c = Ve(g, o);
  else {
    const S = je[s];
    S && S[o] ? c = S[o] : (console.debug(`未知设置映射: ${s}.${o}`), c = -1);
  }
  return {
    section: s,
    title: o,
    controlType: a,
    element: t,
    isPlugin: f,
    pluginName: g,
    key: c
  };
}
function qe(t) {
  if (t.querySelector("button.orca-switch, button.orca-switch-on"))
    return "switch";
  if (t.querySelector("button.orca-button.plain.orca-select-button"))
    return "select";
  if (t.querySelector("span.orca-input > input.orca-input-actualinput")) {
    const e = t.querySelector("input");
    return e && e.type === "color" ? "color" : "input";
  }
  return t.querySelector("div.orca-segmented") ? "segmented" : null;
}
function Fe() {
  var r, a;
  const t = document.querySelector(".orca-modal-overlay");
  if (!t) return "";
  const e = t.querySelector(".sections .item.selected");
  if (e) {
    const s = e.querySelector("span");
    if (s) return ((r = s.textContent) == null ? void 0 : r.trim()) || "";
  }
  const o = t.querySelector("section .orca-memoizedviews-active h2");
  return o && ((a = o.textContent) == null ? void 0 : a.trim()) || "";
}
function We(t) {
  const e = document.querySelector(".orca-modal-overlay");
  if (!e) return !1;
  const o = e.querySelector(".sections .selected");
  return !!(o && o.classList.contains("plugin-item"));
}
function Be(t) {
  var r;
  const e = document.querySelector(".orca-modal-overlay");
  if (!e) return "";
  const o = e.querySelector(".sections .plugin-item.selected span");
  return o && ((r = o.textContent) == null ? void 0 : r.trim()) || "";
}
function Ve(t, e) {
  var r;
  const o = (r = orca.state.plugins) == null ? void 0 : r[t];
  if (!(o != null && o.schema)) return "";
  for (const [a, s] of Object.entries(o.schema))
    if ((s == null ? void 0 : s.label) === e)
      return a;
  for (const [a, s] of Object.entries(o.schema))
    if (s != null && s.label && e.includes(s.label))
      return a;
  return console.debug(`插件 ${t} 的设置 "${e}" 未找到对应 key`), "";
}
function He(t) {
  return t.isPlugin && t.pluginName ? { type: "plugin", pluginName: t.pluginName, settingKey: String(t.key) } : { type: "app", appKey: Number(t.key) };
}
const Ke = [
  // 快捷键设置面板（无有效开关）
  { type: "section", value: "快捷键" },
  { type: "section", value: "Keyboard shortcuts" },
  // 调试模式（内部调试用，不应钉选）
  { type: "settingName", value: "调试模式" },
  { type: "settingName", value: "Debug Mode" },
  // 启用插件（钉选后点击无效，虎鲸内部处理）
  { type: "settingName", value: "启用插件" },
  { type: "settingName", value: "Enable plugin" }
];
function Ci(t, e = Ke) {
  if (t.controlType !== "switch")
    return !1;
  for (const o of e)
    switch (o.type) {
      case "controlType":
        if (t.controlType === o.value) return !1;
        break;
      case "settingName":
        if (t.title === o.value) return !1;
        break;
      case "section":
        if (t.section === o.value) return !1;
        break;
    }
  return !0;
}
let zt, Ai = () => !1;
const O = /* @__PURE__ */ new Map();
let B = null;
function Ge(t) {
  Ai = t;
}
function Ye(t) {
  zt = t;
}
function Ue(t) {
  B = t;
}
async function Xe() {
  try {
    const t = await orca.plugins.getData(zt, "pinned");
    if (t && typeof t == "string") {
      const e = JSON.parse(t);
      O.clear();
      for (const o of e)
        O.set(o.id, o);
      Ai() && console.debug(`[PADD] 已加载 ${O.size} 个钉选设置`);
    }
  } catch (t) {
    console.warn("[PADD] 加载钉选设置失败:", t);
  }
}
async function $i() {
  try {
    const t = Array.from(O.values());
    await orca.plugins.setData(zt, "pinned", JSON.stringify(t));
  } catch (t) {
    console.error("[PADD] 保存钉选设置失败:", t);
  }
}
async function Je(t) {
  O.set(t.id, t), await $i(), B == null || B(t);
}
async function Ze(t) {
  O.delete(t) && (await $i(), B == null || B(void 0, t));
}
function Ti() {
  return Array.from(O.values());
}
function It(t) {
  return O.get(t);
}
function Qe(t) {
  return O.has(t);
}
function to(t, e, o, r) {
  const a = o ? "plugin" : "app", s = o && r ? `.${r}` : "";
  return `${a}${s}.${e}`;
}
var Oi = { exports: {} };
const io = React;
var nt = {}, bi;
function eo() {
  if (bi) return nt;
  bi = 1;
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
    var t = io, e = Symbol.for("react.element"), o = Symbol.for("react.portal"), r = Symbol.for("react.fragment"), a = Symbol.for("react.strict_mode"), s = Symbol.for("react.profiler"), f = Symbol.for("react.provider"), g = Symbol.for("react.context"), c = Symbol.for("react.forward_ref"), h = Symbol.for("react.suspense"), S = Symbol.for("react.suspense_list"), _ = Symbol.for("react.memo"), x = Symbol.for("react.lazy"), it = Symbol.for("react.offscreen"), U = Symbol.iterator, et = "@@iterator";
    function dt(i) {
      if (i === null || typeof i != "object")
        return null;
      var n = U && i[U] || i[et];
      return typeof n == "function" ? n : null;
    }
    var M = t.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
    function v(i) {
      {
        for (var n = arguments.length, l = new Array(n > 1 ? n - 1 : 0), u = 1; u < n; u++)
          l[u - 1] = arguments[u];
        te("error", i, l);
      }
    }
    function te(i, n, l) {
      {
        var u = M.ReactDebugCurrentFrame, m = u.getStackAddendum();
        m !== "" && (n += "%s", l = l.concat([m]));
        var b = l.map(function(p) {
          return String(p);
        });
        b.unshift("Warning: " + n), Function.prototype.apply.call(console[i], console, b);
      }
    }
    var ie = !1, ee = !1, oe = !1, re = !1, ne = !1, Kt;
    Kt = Symbol.for("react.module.reference");
    function ae(i) {
      return !!(typeof i == "string" || typeof i == "function" || i === r || i === s || ne || i === a || i === h || i === S || re || i === it || ie || ee || oe || typeof i == "object" && i !== null && (i.$$typeof === x || i.$$typeof === _ || i.$$typeof === f || i.$$typeof === g || i.$$typeof === c || // This needs to include all possible module reference object
      // types supported by any Flight configuration anywhere since
      // we don't know which Flight build this will end up being used
      // with.
      i.$$typeof === Kt || i.getModuleId !== void 0));
    }
    function le(i, n, l) {
      var u = i.displayName;
      if (u)
        return u;
      var m = n.displayName || n.name || "";
      return m !== "" ? l + "(" + m + ")" : l;
    }
    function Gt(i) {
      return i.displayName || "Context";
    }
    function I(i) {
      if (i == null)
        return null;
      if (typeof i.tag == "number" && v("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), typeof i == "function")
        return i.displayName || i.name || null;
      if (typeof i == "string")
        return i;
      switch (i) {
        case r:
          return "Fragment";
        case o:
          return "Portal";
        case s:
          return "Profiler";
        case a:
          return "StrictMode";
        case h:
          return "Suspense";
        case S:
          return "SuspenseList";
      }
      if (typeof i == "object")
        switch (i.$$typeof) {
          case g:
            var n = i;
            return Gt(n) + ".Consumer";
          case f:
            var l = i;
            return Gt(l._context) + ".Provider";
          case c:
            return le(i, i.render, "ForwardRef");
          case _:
            var u = i.displayName || null;
            return u !== null ? u : I(i.type) || "Memo";
          case x: {
            var m = i, b = m._payload, p = m._init;
            try {
              return I(p(b));
            } catch {
              return null;
            }
          }
        }
      return null;
    }
    var z = Object.assign, ot = 0, Yt, Ut, Xt, Jt, Zt, Qt, ti;
    function ii() {
    }
    ii.__reactDisabledLog = !0;
    function se() {
      {
        if (ot === 0) {
          Yt = console.log, Ut = console.info, Xt = console.warn, Jt = console.error, Zt = console.group, Qt = console.groupCollapsed, ti = console.groupEnd;
          var i = {
            configurable: !0,
            enumerable: !0,
            value: ii,
            writable: !0
          };
          Object.defineProperties(console, {
            info: i,
            log: i,
            warn: i,
            error: i,
            group: i,
            groupCollapsed: i,
            groupEnd: i
          });
        }
        ot++;
      }
    }
    function ce() {
      {
        if (ot--, ot === 0) {
          var i = {
            configurable: !0,
            enumerable: !0,
            writable: !0
          };
          Object.defineProperties(console, {
            log: z({}, i, {
              value: Yt
            }),
            info: z({}, i, {
              value: Ut
            }),
            warn: z({}, i, {
              value: Xt
            }),
            error: z({}, i, {
              value: Jt
            }),
            group: z({}, i, {
              value: Zt
            }),
            groupCollapsed: z({}, i, {
              value: Qt
            }),
            groupEnd: z({}, i, {
              value: ti
            })
          });
        }
        ot < 0 && v("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
      }
    }
    var Rt = M.ReactCurrentDispatcher, _t;
    function pt(i, n, l) {
      {
        if (_t === void 0)
          try {
            throw Error();
          } catch (m) {
            var u = m.stack.trim().match(/\n( *(at )?)/);
            _t = u && u[1] || "";
          }
        return `
` + _t + i;
      }
    }
    var Ct = !1, gt;
    {
      var ue = typeof WeakMap == "function" ? WeakMap : Map;
      gt = new ue();
    }
    function ei(i, n) {
      if (!i || Ct)
        return "";
      {
        var l = gt.get(i);
        if (l !== void 0)
          return l;
      }
      var u;
      Ct = !0;
      var m = Error.prepareStackTrace;
      Error.prepareStackTrace = void 0;
      var b;
      b = Rt.current, Rt.current = null, se();
      try {
        if (n) {
          var p = function() {
            throw Error();
          };
          if (Object.defineProperty(p.prototype, "props", {
            set: function() {
              throw Error();
            }
          }), typeof Reflect == "object" && Reflect.construct) {
            try {
              Reflect.construct(p, []);
            } catch (D) {
              u = D;
            }
            Reflect.construct(i, [], p);
          } else {
            try {
              p.call();
            } catch (D) {
              u = D;
            }
            i.call(p.prototype);
          }
        } else {
          try {
            throw Error();
          } catch (D) {
            u = D;
          }
          i();
        }
      } catch (D) {
        if (D && u && typeof D.stack == "string") {
          for (var d = D.stack.split(`
`), P = u.stack.split(`
`), y = d.length - 1, w = P.length - 1; y >= 1 && w >= 0 && d[y] !== P[w]; )
            w--;
          for (; y >= 1 && w >= 0; y--, w--)
            if (d[y] !== P[w]) {
              if (y !== 1 || w !== 1)
                do
                  if (y--, w--, w < 0 || d[y] !== P[w]) {
                    var C = `
` + d[y].replace(" at new ", " at ");
                    return i.displayName && C.includes("<anonymous>") && (C = C.replace("<anonymous>", i.displayName)), typeof i == "function" && gt.set(i, C), C;
                  }
                while (y >= 1 && w >= 0);
              break;
            }
        }
      } finally {
        Ct = !1, Rt.current = b, ce(), Error.prepareStackTrace = m;
      }
      var J = i ? i.displayName || i.name : "", q = J ? pt(J) : "";
      return typeof i == "function" && gt.set(i, q), q;
    }
    function fe(i, n, l) {
      return ei(i, !1);
    }
    function de(i) {
      var n = i.prototype;
      return !!(n && n.isReactComponent);
    }
    function mt(i, n, l) {
      if (i == null)
        return "";
      if (typeof i == "function")
        return ei(i, de(i));
      if (typeof i == "string")
        return pt(i);
      switch (i) {
        case h:
          return pt("Suspense");
        case S:
          return pt("SuspenseList");
      }
      if (typeof i == "object")
        switch (i.$$typeof) {
          case c:
            return fe(i.render);
          case _:
            return mt(i.type, n, l);
          case x: {
            var u = i, m = u._payload, b = u._init;
            try {
              return mt(b(m), n, l);
            } catch {
            }
          }
        }
      return "";
    }
    var rt = Object.prototype.hasOwnProperty, oi = {}, ri = M.ReactDebugCurrentFrame;
    function ht(i) {
      if (i) {
        var n = i._owner, l = mt(i.type, i._source, n ? n.type : null);
        ri.setExtraStackFrame(l);
      } else
        ri.setExtraStackFrame(null);
    }
    function pe(i, n, l, u, m) {
      {
        var b = Function.call.bind(rt);
        for (var p in i)
          if (b(i, p)) {
            var d = void 0;
            try {
              if (typeof i[p] != "function") {
                var P = Error((u || "React class") + ": " + l + " type `" + p + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof i[p] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                throw P.name = "Invariant Violation", P;
              }
              d = i[p](n, p, u, l, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
            } catch (y) {
              d = y;
            }
            d && !(d instanceof Error) && (ht(m), v("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", u || "React class", l, p, typeof d), ht(null)), d instanceof Error && !(d.message in oi) && (oi[d.message] = !0, ht(m), v("Failed %s type: %s", l, d.message), ht(null));
          }
      }
    }
    var ge = Array.isArray;
    function At(i) {
      return ge(i);
    }
    function me(i) {
      {
        var n = typeof Symbol == "function" && Symbol.toStringTag, l = n && i[Symbol.toStringTag] || i.constructor.name || "Object";
        return l;
      }
    }
    function he(i) {
      try {
        return ni(i), !1;
      } catch {
        return !0;
      }
    }
    function ni(i) {
      return "" + i;
    }
    function ai(i) {
      if (he(i))
        return v("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", me(i)), ni(i);
    }
    var li = M.ReactCurrentOwner, be = {
      key: !0,
      ref: !0,
      __self: !0,
      __source: !0
    }, si, ci;
    function ve(i) {
      if (rt.call(i, "ref")) {
        var n = Object.getOwnPropertyDescriptor(i, "ref").get;
        if (n && n.isReactWarning)
          return !1;
      }
      return i.ref !== void 0;
    }
    function ye(i) {
      if (rt.call(i, "key")) {
        var n = Object.getOwnPropertyDescriptor(i, "key").get;
        if (n && n.isReactWarning)
          return !1;
      }
      return i.key !== void 0;
    }
    function we(i, n) {
      typeof i.ref == "string" && li.current;
    }
    function ke(i, n) {
      {
        var l = function() {
          si || (si = !0, v("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", n));
        };
        l.isReactWarning = !0, Object.defineProperty(i, "key", {
          get: l,
          configurable: !0
        });
      }
    }
    function Se(i, n) {
      {
        var l = function() {
          ci || (ci = !0, v("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", n));
        };
        l.isReactWarning = !0, Object.defineProperty(i, "ref", {
          get: l,
          configurable: !0
        });
      }
    }
    var Ee = function(i, n, l, u, m, b, p) {
      var d = {
        // This tag allows us to uniquely identify this as a React Element
        $$typeof: e,
        // Built-in properties that belong on the element
        type: i,
        key: n,
        ref: l,
        props: p,
        // Record the component responsible for creating this element.
        _owner: b
      };
      return d._store = {}, Object.defineProperty(d._store, "validated", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: !1
      }), Object.defineProperty(d, "_self", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: u
      }), Object.defineProperty(d, "_source", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: m
      }), Object.freeze && (Object.freeze(d.props), Object.freeze(d)), d;
    };
    function xe(i, n, l, u, m) {
      {
        var b, p = {}, d = null, P = null;
        l !== void 0 && (ai(l), d = "" + l), ye(n) && (ai(n.key), d = "" + n.key), ve(n) && (P = n.ref, we(n, m));
        for (b in n)
          rt.call(n, b) && !be.hasOwnProperty(b) && (p[b] = n[b]);
        if (i && i.defaultProps) {
          var y = i.defaultProps;
          for (b in y)
            p[b] === void 0 && (p[b] = y[b]);
        }
        if (d || P) {
          var w = typeof i == "function" ? i.displayName || i.name || "Unknown" : i;
          d && ke(p, w), P && Se(p, w);
        }
        return Ee(i, d, P, m, u, li.current, p);
      }
    }
    var $t = M.ReactCurrentOwner, ui = M.ReactDebugCurrentFrame;
    function X(i) {
      if (i) {
        var n = i._owner, l = mt(i.type, i._source, n ? n.type : null);
        ui.setExtraStackFrame(l);
      } else
        ui.setExtraStackFrame(null);
    }
    var Tt;
    Tt = !1;
    function Ot(i) {
      return typeof i == "object" && i !== null && i.$$typeof === e;
    }
    function fi() {
      {
        if ($t.current) {
          var i = I($t.current.type);
          if (i)
            return `

Check the render method of \`` + i + "`.";
        }
        return "";
      }
    }
    function Pe(i) {
      return "";
    }
    var di = {};
    function De(i) {
      {
        var n = fi();
        if (!n) {
          var l = typeof i == "string" ? i : i.displayName || i.name;
          l && (n = `

Check the top-level render call using <` + l + ">.");
        }
        return n;
      }
    }
    function pi(i, n) {
      {
        if (!i._store || i._store.validated || i.key != null)
          return;
        i._store.validated = !0;
        var l = De(n);
        if (di[l])
          return;
        di[l] = !0;
        var u = "";
        i && i._owner && i._owner !== $t.current && (u = " It was passed a child from " + I(i._owner.type) + "."), X(i), v('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', l, u), X(null);
      }
    }
    function gi(i, n) {
      {
        if (typeof i != "object")
          return;
        if (At(i))
          for (var l = 0; l < i.length; l++) {
            var u = i[l];
            Ot(u) && pi(u, n);
          }
        else if (Ot(i))
          i._store && (i._store.validated = !0);
        else if (i) {
          var m = dt(i);
          if (typeof m == "function" && m !== i.entries)
            for (var b = m.call(i), p; !(p = b.next()).done; )
              Ot(p.value) && pi(p.value, n);
        }
      }
    }
    function Re(i) {
      {
        var n = i.type;
        if (n == null || typeof n == "string")
          return;
        var l;
        if (typeof n == "function")
          l = n.propTypes;
        else if (typeof n == "object" && (n.$$typeof === c || // Note: Memo only checks outer props here.
        // Inner props are checked in the reconciler.
        n.$$typeof === _))
          l = n.propTypes;
        else
          return;
        if (l) {
          var u = I(n);
          pe(l, i.props, "prop", u, i);
        } else if (n.PropTypes !== void 0 && !Tt) {
          Tt = !0;
          var m = I(n);
          v("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", m || "Unknown");
        }
        typeof n.getDefaultProps == "function" && !n.getDefaultProps.isReactClassApproved && v("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
      }
    }
    function _e(i) {
      {
        for (var n = Object.keys(i.props), l = 0; l < n.length; l++) {
          var u = n[l];
          if (u !== "children" && u !== "key") {
            X(i), v("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", u), X(null);
            break;
          }
        }
        i.ref !== null && (X(i), v("Invalid attribute `ref` supplied to `React.Fragment`."), X(null));
      }
    }
    var mi = {};
    function hi(i, n, l, u, m, b) {
      {
        var p = ae(i);
        if (!p) {
          var d = "";
          (i === void 0 || typeof i == "object" && i !== null && Object.keys(i).length === 0) && (d += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
          var P = Pe();
          P ? d += P : d += fi();
          var y;
          i === null ? y = "null" : At(i) ? y = "array" : i !== void 0 && i.$$typeof === e ? (y = "<" + (I(i.type) || "Unknown") + " />", d = " Did you accidentally export a JSX literal instead of a component?") : y = typeof i, v("React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", y, d);
        }
        var w = xe(i, n, l, m, b);
        if (w == null)
          return w;
        if (p) {
          var C = n.children;
          if (C !== void 0)
            if (u)
              if (At(C)) {
                for (var J = 0; J < C.length; J++)
                  gi(C[J], i);
                Object.freeze && Object.freeze(C);
              } else
                v("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
            else
              gi(C, i);
        }
        if (rt.call(n, "key")) {
          var q = I(i), D = Object.keys(n).filter(function(Me) {
            return Me !== "key";
          }), Mt = D.length > 0 ? "{key: someKey, " + D.join(": ..., ") + ": ...}" : "{key: someKey}";
          if (!mi[q + Mt]) {
            var Oe = D.length > 0 ? "{" + D.join(": ..., ") + ": ...}" : "{}";
            v(`A props object containing a "key" prop is being spread into JSX:
  let props = %s;
  <%s {...props} />
React keys must be passed directly to JSX without using spread:
  let props = %s;
  <%s key={someKey} {...props} />`, Mt, q, Oe, q), mi[q + Mt] = !0;
          }
        }
        return i === r ? _e(w) : Re(w), w;
      }
    }
    function Ce(i, n, l) {
      return hi(i, n, l, !0);
    }
    function Ae(i, n, l) {
      return hi(i, n, l, !1);
    }
    var $e = Ae, Te = Ce;
    nt.Fragment = r, nt.jsx = $e, nt.jsxs = Te;
  }(), nt;
}
Oi.exports = eo();
var R = Oi.exports;
const bt = [
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
function oo(t) {
  const e = t.toLowerCase().trim();
  if (!e) return bt;
  const o = e.length > 50 ? e.slice(0, 50) : e;
  return o.length < 2 ? bt : bt.filter((r) => r.replace("ti ti-", "").includes(o));
}
const ro = window.React, { useState: no, useRef: ao, useEffect: vi, useCallback: lo } = ro;
function so({ selectedIcon: t, onSelect: e, onClose: o }) {
  const [r, a] = no(""), s = ao(null);
  vi(() => {
    var c;
    (c = s.current) == null || c.focus();
  }, []), vi(() => {
    const c = (h) => {
      h.key === "Escape" && o();
    };
    return document.addEventListener("keydown", c), () => document.removeEventListener("keydown", c);
  }, [o]);
  const f = r.trim() ? oo(r) : bt, g = lo((c) => {
    e(c);
  }, [e]);
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
            ref: s,
            className: "orca-input-actualinput",
            placeholder: $("settings-pin.search-icons"),
            value: r,
            onChange: (c) => a(c.target.value)
          }
        )
      ] }) }),
      /* @__PURE__ */ R.jsx(
        "button",
        {
          className: "orca-button outline",
          tabIndex: -1,
          onClick: o,
          title: $("settings-pin.clear"),
          children: /* @__PURE__ */ R.jsx("i", { className: "ti ti-ban" })
        }
      )
    ] }),
    /* @__PURE__ */ R.jsx("div", { className: "orca-icon-picker-content", style: {
      width: "300px",
      maxHeight: "250px",
      overflowY: "auto"
    }, children: f.length === 0 ? /* @__PURE__ */ R.jsx("div", { style: {
      textAlign: "center",
      padding: "16px",
      color: "var(--orca-color-text-2)"
    }, children: $("settings-pin.no-icons-found") }) : /* @__PURE__ */ R.jsx("div", { style: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(36px, 1fr))",
      gap: "2px"
    }, children: f.map((c) => /* @__PURE__ */ R.jsx(
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
          background: t === c ? "var(--orca-color-primary-5)" : "transparent",
          color: t === c ? "#fff" : "inherit"
        },
        onClick: () => g(c),
        title: c,
        children: /* @__PURE__ */ R.jsx("i", { className: c, style: { fontSize: "18px" } })
      },
      c
    )) }) })
  ] }) });
}
const co = window.React;
let lt = null, T = null, st = null, N = null;
const wt = /* @__PURE__ */ new Map(), yi = 22, uo = 14, fo = 6;
function po() {
  const t = document.querySelector(".orca-panels-container") || document.body;
  lt = new MutationObserver((r) => {
    const a = document.querySelector(".orca-modal-overlay"), s = a == null ? void 0 : a.querySelector(".orca-settings");
    a && s && getComputedStyle(a).display !== "none" ? T || wi(s) : T && Ii();
  }), lt.observe(t, { childList: !0, subtree: !0 });
  const e = document.querySelector(".orca-modal-overlay"), o = e == null ? void 0 : e.querySelector(".orca-settings");
  e && o && getComputedStyle(e).display !== "none" && wi(o);
}
function wi(t) {
  T && T.disconnect(), ki(t);
  let e = null;
  T = new MutationObserver(() => {
    e != null && cancelAnimationFrame(e), e = requestAnimationFrame(() => {
      ki(t), e = null;
    });
  }), T.observe(t, { childList: !0, subtree: !0 });
}
function ki(t) {
  const e = t.querySelectorAll(".item-horizontal, .item-vertical");
  for (const o of e) {
    const r = o;
    r.dataset.pinProcessed || go(r);
  }
  mo(t);
}
function go(t) {
  t.dataset.pinProcessed = "true";
  const e = ze(t);
  e && Ci(e) && Mi(t, e);
}
function mo(t) {
  var g, c, h;
  const e = t.querySelector(".sections .selected");
  if (!e || !e.classList.contains("plugin-item")) return;
  const o = e.querySelector("span"), r = ((g = o == null ? void 0 : o.textContent) == null ? void 0 : g.trim()) || "";
  if (!r) return;
  const a = (c = orca.state.plugins) == null ? void 0 : c[r];
  if (!(a != null && a.schema)) return;
  const s = t.querySelector("section .orca-memoizedviews-active");
  if (!s) return;
  const f = s.querySelectorAll(".item-horizontal, .item-vertical");
  for (const S of f) {
    const _ = S;
    if (_.dataset.pinProcessed || !_.querySelector("button.orca-switch, button.orca-switch-on")) continue;
    const it = _.querySelector(".title"), U = ((h = it == null ? void 0 : it.textContent) == null ? void 0 : h.trim()) || "";
    let et = "";
    for (const [M, v] of Object.entries(a.schema))
      if ((v == null ? void 0 : v.label) === U || v != null && v.label && U.includes(v.label)) {
        et = M;
        break;
      }
    if (!et) continue;
    _.dataset.pinProcessed = "true";
    const dt = {
      section: r,
      title: U,
      controlType: "switch",
      isPlugin: !0,
      pluginName: r,
      key: et
    };
    Ci(dt) && Mi(_, dt);
  }
}
function Mi(t, e) {
  const o = to(e.section, e.title, e.isPlugin, e.pluginName), r = It(o), a = t.querySelector(".title"), s = a == null ? void 0 : a.querySelector(`[data-padd-mount="${o}"]`);
  if (s) {
    const c = wt.get(o);
    if (c) {
      kt(c, s, e, o, r);
      return;
    }
  }
  const f = document.createElement("span");
  f.style.cssText = `display: inline-flex; margin-left: ${fo}px;`, f.dataset.paddMount = o, a ? a.appendChild(f) : t.insertBefore(f, t.firstChild);
  const g = window.createRoot(f);
  wt.set(o, g), kt(g, f, e, o, r), t.dataset.pinId = o;
}
function kt(t, e, o, r, a) {
  const s = co.createElement, f = { current: null }, g = {
    width: `${yi}px`,
    height: `${yi}px`,
    padding: 0,
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: `${uo}px`,
    opacity: a ? 1 : 0.7,
    transition: "opacity 0.2s",
    cursor: "pointer",
    background: "none",
    border: "none",
    color: "inherit"
  }, c = a ? a.icon : "ti ti-plus", h = a ? "var(--orca-color-primary-5)" : void 0, S = a ? `${a.title} - ${$("settings-pin.unpin")}` : $("settings-pin.pin"), _ = (x) => {
    x.stopPropagation(), x.preventDefault(), It(r) ? Ze(r).then(() => {
      kt(t, e, o, r, void 0);
    }) : ho(f.current, o, r, () => {
      kt(t, e, o, r, It(r));
    });
  };
  t.render(
    s(
      orca.components.Tooltip,
      { text: S, placement: "horizontal" },
      s(
        "button",
        {
          ref: (x) => {
            f.current = x;
          },
          className: "orca-button plain settings-pin-btn",
          style: g,
          onClick: _,
          onMouseEnter: () => {
            const x = f.current;
            x && (x.style.opacity = "1");
          },
          onMouseLeave: () => {
            const x = f.current;
            x && (x.style.opacity = Qe(r) ? "1" : "0.7");
          }
        },
        s("i", { className: c, style: h ? { color: h } : void 0 })
      )
    )
  );
}
function ho(t, e, o, r) {
  const a = document.querySelector(".orca-modal-overlay");
  if (!a) {
    console.warn("图标选择器：未找到设置面板 overlay");
    return;
  }
  N = document.createElement("div"), N.id = "settings-pin-icon-picker-mount", N.style.cssText = "position: absolute; z-index: 10000;", a.appendChild(N), st = window.createRoot(N);
  const s = (c) => {
    if (!c) return;
    const h = He(e), S = {
      id: o,
      icon: c,
      section: e.section,
      title: e.title,
      appKey: h.type === "app" ? h.appKey : h.settingKey,
      isPlugin: e.isPlugin,
      pluginName: e.pluginName,
      controlType: "switch"
    };
    Je(S).then(() => {
      r();
    }), Nt();
  }, f = () => {
    Nt();
  }, g = window.React.createElement;
  st.render(
    g(
      orca.components.Popup,
      {
        visible: !0,
        onClose: f,
        refElement: { current: t },
        placement: "horizontal",
        defaultPlacement: "right",
        alignment: "top",
        offset: 4
      },
      g(so, {
        selectedIcon: "",
        onSelect: s,
        onClose: f
      })
    )
  );
}
function Nt() {
  st && (st.unmount(), st = null), N && (N.remove(), N = null);
}
function Ii() {
  T && (T.disconnect(), T = null), wt.forEach((t) => {
    try {
      t.unmount();
    } catch {
    }
  }), wt.clear(), document.querySelectorAll("[data-padd-mount]").forEach((t) => t.remove()), document.querySelectorAll(".settings-pin-btn").forEach((t) => t.remove()), document.querySelectorAll("[data-pin-processed]").forEach((t) => {
    delete t.dataset.pinProcessed, delete t.dataset.pinId;
  }), Nt();
}
function bo() {
  Ii(), lt && (lt.disconnect(), lt = null);
}
const vo = window.React;
let Z = () => !1;
function yo(t) {
  Z = t;
}
function wo(t) {
  return (e, o) => {
    const r = vo.createElement, a = Si(t), s = (f) => {
      const c = !Si(t);
      ko(t, c);
    };
    return r(
      orca.components.Tooltip,
      { text: t.title, placement: "horizontal" },
      r(
        "button",
        {
          className: "orca-button plain orca-block-editor-sidetools-btn",
          onClick: s
        },
        r("i", {
          className: t.icon,
          style: a ? { color: "var(--orca-color-primary-5)" } : void 0
        })
      )
    );
  };
}
function Si(t) {
  var o;
  if (t.isPlugin && t.pluginName) {
    const r = (o = orca.state.plugins) == null ? void 0 : o[t.pluginName];
    return r != null && r.settings ? !!r.settings[t.appKey] : !1;
  }
  return !!orca.state.settings[t.appKey];
}
function ko(t, e) {
  var o;
  if (t.isPlugin && t.pluginName) {
    const r = (o = orca.state.plugins) == null ? void 0 : o[t.pluginName];
    if (r != null && r.settings) {
      const a = r.settings[t.appKey];
      r.settings[t.appKey] = e, Z() && console.debug(
        `[PADD] 开关切换: ${t.pluginName}.${t.title} (${t.appKey})`,
        `${JSON.stringify(a)} → ${e}`
      );
    }
  } else {
    const r = t.appKey, a = orca.state.settings[r];
    if (typeof a == "number") {
      const s = e ? 1 : 0;
      orca.state.settings[r] = s, Z() && console.debug(
        `[PADD] 开关切换: ${t.section}.${t.title} (key=${r})`,
        `${a} → ${s}`
      );
    } else
      orca.state.settings[r] = e, Z() && console.debug(
        `[PADD] 开关切换: ${t.section}.${t.title} (key=${r})`,
        `${a} → ${e}`
      );
  }
}
function Ni(t) {
  const e = `padd.${t.id}`;
  orca.editorSidetools.registerEditorSidetool(e, {
    render: wo(t)
  }), Z() && console.debug(`[PADD] 已注册侧边栏工具: ${e}`);
}
function Li(t) {
  const e = `padd.${t.id}`;
  orca.editorSidetools.unregisterEditorSidetool(e), Z() && console.debug(`[PADD] 已注销侧边栏工具: ${e}`);
}
const k = "orca-lcars-width-handle", St = "orca-lcars-width-handle-left", Lt = "orca-lcars-width-handle-right", j = "orca-lcars-editor-width", ji = "lcars-editor-width", Et = "lcars-debug-panel", So = 20, Ei = 10, Eo = 2, jt = 52, zi = 1.5, xi = 10;
let qt = () => !1;
function xo(t) {
  qt = t;
}
const qi = 0, Po = 85, xt = 0;
let Ft, G = !1, E = xt, Y = !1, Fi = 0, Wi = 0, Bi = 1, L = null, Q = null, vt = !1, ct = null, V = null, F = null;
function Do(t) {
  Ft = t, Ao(), zo(), Io(), Lo();
}
function Ro() {
  G = !1, tt(), No(), jo(), qo(), Bt(), Vt(), $o(), ut();
}
function Vi(t, e) {
  const o = G !== t, r = E !== e;
  G = t, E = Dt(e), (o || r) && tt();
}
function _o() {
  return E;
}
async function Co() {
  try {
    const t = await orca.plugins.getData(Ft, "editorWidthV2");
    if (typeof t == "number") return Dt(t);
    if (typeof t == "string") {
      const e = parseInt(t, 10);
      if (!isNaN(e)) return Dt(e);
    }
  } catch {
  }
  return xt;
}
function ft() {
  return !!document.querySelector(".orca-panel.orca-wide");
}
function H() {
  const t = [];
  return document.querySelectorAll(".orca-block-editor").forEach((e) => {
    e.getBoundingClientRect().width > 0 && t.push(e);
  }), t;
}
function ut() {
  document.querySelectorAll(".orca-block-editor").forEach((t) => {
    delete t.dataset.lcarsOrigGrid;
  });
}
function Wt(t) {
  const e = t.dataset.lcarsOrigGrid;
  if (e)
    try {
      return JSON.parse(e);
    } catch {
    }
  const o = t.classList.contains(j);
  t.classList.remove(j);
  const r = t.getBoundingClientRect().width, a = getComputedStyle(t).gridTemplateColumns;
  o && t.classList.add(j);
  const s = a.match(/[\d.]+/g);
  if (s && s.length >= 3) {
    const f = parseFloat(s[0]), g = parseFloat(s[1]), c = parseFloat(s[2]);
    if (g > 0 && f > 0 && r > 0) {
      const h = { side: f, editor: g, post: c, total: r };
      return t.dataset.lcarsOrigGrid = JSON.stringify(h), h;
    }
  }
  return null;
}
function Hi(t, e, o) {
  if (t <= 0)
    return { side: e.side, editor: e.editor, post: e.post };
  const r = t / 100, s = 1 - Ki(o) * zi / e.post, f = Math.min(r, s), g = e.side * (1 - f), c = e.post * (1 - f), h = e.total - g - c;
  return { side: g, editor: h, post: c };
}
function Ki(t) {
  const e = t.querySelector(".orca-block-editor-go-btns");
  return e && Math.ceil(e.getBoundingClientRect().width) || jt;
}
function Ao() {
  const t = `
    .orca-block-editor.${j} {
      grid-template-columns: var(--lcars-side-col) [editor-start] var(--lcars-editor-col) [editor-end post-start] var(--lcars-post-col) [post-end] !important;
      overflow-x: hidden !important;
    }

    .orca-block-editor.${j} > .orca-block-editor-main {
      position: relative !important;
      overflow: visible !important;
      will-change: width;
    }

    /* 拖拽时降低 block 渲染精度，保留布局轮廓 */
    .orca-block-editor.lcars-dragging .orca-block {
      content-visibility: auto !important;
      contain: layout style !important;
    }

    .${k} {
      position: absolute;
      top: 0;
      width: ${So}px;
      height: 100%;
      cursor: col-resize;
      z-index: 10;
      pointer-events: auto;
    }
    .${Lt} { right: -40px; }
    .${St} { left: -40px; }

    .${k}::before {
      content: '';
      position: absolute;
      top: 0;
      width: ${Eo}px;
      height: 100%;
      background: var(--lcars-handle-color, var(--orca-color-primary-5, #4a9eff));
      border-radius: 1px;
      opacity: 0;
      transition: opacity 0.2s ease;
    }
    .${Lt}::before { right: ${Ei}px; }
    .${St}::before { left: ${Ei}px; }

    .${k}:hover::before,
    .${k}.dragging::before { opacity: 0.8; }

    /* hover 任一手柄时，同 editor 下两条指示线一起显示
       注意：:has() 需 Chrome 105+ / Electron 22+（Orca 用 Electron 28+，兼容无问题）
       此规则特异性(0-4-1)高于单手柄 :hover(0-2-1)，修改 opacity 时注意同步 */
    .orca-block-editor-main:has(.${k}:hover) .${k}::before,
    .orca-block-editor-main:has(.${k}.dragging) .${k}::before { opacity: 0.8; }

    .${k}.lcars-debug {
      background: rgba(0, 120, 255, 0.15) !important;
      border: 1px dashed rgba(0, 120, 255, 0.4) !important;
    }
    .${k}.lcars-debug::before {
      background: red !important;
      opacity: 1 !important;
    }

    body.lcars-dragging-active, body.lcars-dragging-active * {
      cursor: col-resize !important;
      user-select: none !important;
    }

    #${Et} {
      position: fixed;
      top: 8px;
      left: 8px;
      z-index: 99999;
      font-family: 'Consolas', 'Monaco', monospace;
      font-size: 12px;
      line-height: 1.6;
      color: red;
      background: rgba(0, 0, 0, 0.8);
      padding: 8px 12px;
      border-radius: 4px;
      pointer-events: none;
      white-space: pre;
    }
  `;
  orca.themes.injectCSS(t, ji);
}
function $o() {
  orca.themes.removeCSS(ji);
}
function tt() {
  const t = H(), e = ft();
  if (!G || e || t.length === 0) {
    document.querySelectorAll(".orca-block-editor").forEach((o) => {
      const r = o;
      r.classList.remove(j), r.style.removeProperty("--lcars-side-col"), r.style.removeProperty("--lcars-editor-col"), r.style.removeProperty("--lcars-post-col");
      const a = r.querySelector(".orca-block-editor-main");
      a && (a.style.removeProperty("max-width"), a.style.removeProperty("margin-inline"), a.style.removeProperty("width"));
    }), ut(), Bt(), Pt();
    return;
  }
  t.forEach((o) => {
    const r = Wt(o);
    if (!r) return;
    o.classList.add(j);
    const a = Hi(E, r, o);
    o.style.setProperty("--lcars-side-col", `${Math.round(a.side)}px`), o.style.setProperty("--lcars-editor-col", `${Math.round(a.editor)}px`), o.style.setProperty("--lcars-post-col", `${Math.round(a.post)}px`);
  }), document.querySelectorAll(".orca-block-editor").forEach((o) => {
    const r = o;
    t.includes(r) || (r.classList.remove(j), r.style.removeProperty("--lcars-side-col"), r.style.removeProperty("--lcars-editor-col"), r.style.removeProperty("--lcars-post-col"), delete r.dataset.lcarsOrigGrid);
  }), To(), Pt();
}
function To() {
  if (!G || ft()) {
    Bt();
    return;
  }
  H().forEach((e) => {
    const o = e.querySelector(".orca-block-editor-main");
    o && (Pi(o, Lt), Pi(o, St));
  });
}
function Pi(t, e) {
  if (t.querySelector(`:scope > .${e}`)) return;
  const o = document.createElement("div");
  o.className = `${k} ${e}`, qt() && o.classList.add("lcars-debug"), o.title = `编辑区宽度: ${E}%（双击重置）`, t.appendChild(o);
}
function Bt() {
  document.querySelectorAll(`.${k}`).forEach((t) => t.remove());
}
function Oo() {
  document.querySelectorAll(`.${k}`).forEach((t) => {
    t.title = `编辑区宽度: ${E}%（双击重置）`;
  });
}
function Mo() {
  let t = document.getElementById(Et);
  return t || (t = document.createElement("div"), t.id = Et, document.body.appendChild(t)), t;
}
function Vt() {
  var t;
  (t = document.getElementById(Et)) == null || t.remove();
}
function Pt() {
  if (!qt()) {
    Vt();
    return;
  }
  const t = Mo(), e = H();
  document.querySelectorAll(`.${k}`).length;
  const o = [
    `百分比: ${E}%`,
    `宽屏模式: ${ft() ? "是" : "否"}`
  ];
  e.forEach((r, a) => {
    const s = Wt(r), f = r.querySelector(".orca-block-editor-main"), g = r.querySelectorAll(`.${k}`).length;
    o.push(`--- Panel ${a + 1} ---`), o.push(`手柄数: ${g}`), s && o.push(
      `原始侧边栏: ${s.side.toFixed(0)}px`,
      `原始编辑列: ${s.editor.toFixed(0)}px`,
      `原始后列: ${s.post.toFixed(0)}px`
    ), o.push(
      `当前main宽度: ${f ? f.getBoundingClientRect().width.toFixed(0) : "N/A"}px`,
      `编辑器宽度: ${r.getBoundingClientRect().width.toFixed(0)}px`
    );
  }), t.textContent = o.join(`
`);
}
function Io() {
  const t = document.querySelector(".orca-panels-container") || document.body;
  ct = new MutationObserver(() => {
    G && (Y || (F != null && cancelAnimationFrame(F), F = requestAnimationFrame(() => {
      V && document.querySelectorAll(".orca-block-editor").forEach((o) => {
        V.observe(o);
      }), ft() && ut();
      const e = H()[0];
      e != null && e.dataset.lcarsOrigGrid || ut(), tt(), F = null;
    })));
  }), ct.observe(t, { childList: !0, subtree: !0 });
}
function No() {
  ct && (ct.disconnect(), ct = null), F != null && (cancelAnimationFrame(F), F = null);
}
function Lo() {
  V = new ResizeObserver(() => {
    !G || Y || (ut(), tt());
  }), document.querySelectorAll(".orca-block-editor").forEach((t) => {
    V.observe(t);
  });
}
function jo() {
  V && (V.disconnect(), V = null);
}
function zo() {
  document.addEventListener("mousedown", Yi, !0), document.addEventListener("mousemove", Ui), document.addEventListener("mouseup", Ht), document.addEventListener("dblclick", Xi, !0), window.addEventListener("blur", Gi);
}
function qo() {
  document.removeEventListener("mousedown", Yi, !0), document.removeEventListener("mousemove", Ui), document.removeEventListener("mouseup", Ht), document.removeEventListener("dblclick", Xi, !0), window.removeEventListener("blur", Gi);
}
function Gi() {
  Y && Ht();
}
function Yi(t) {
  const e = t.target;
  if (!e.classList.contains(k)) return;
  t.preventDefault();
  const o = e.closest(".orca-block-editor");
  o && (L = Wt(o)), Y = !0, Fi = t.clientX, Wi = E, Bi = e.classList.contains(St) ? -1 : 1, e.classList.add("dragging"), document.body.classList.add("lcars-dragging-active"), o && o.classList.add("lcars-dragging");
}
function Ui(t) {
  var S;
  if (!Y || !L || ft()) return;
  const e = (L.side + L.post) / 2;
  if (e <= 0) return;
  const o = (S = t.target) == null ? void 0 : S.closest(".orca-block-editor"), s = (1 - (o ? Ki(o) : jt) * zi / L.post) * 100, c = (t.clientX - Fi) * Bi / e * 100;
  let h = Math.round((Wi + c) * 10) / 10;
  h = Math.min(s, Math.max(qi, h)), Math.abs(h - E) >= 0.1 && (E = h, vt = !0, Q == null && (Q = requestAnimationFrame(() => {
    vt && Fo(), vt = !1, Q = null;
  })));
}
function Fo() {
  if (!L || H().length === 0) return;
  const e = Hi(E, L, H()[0]), o = `${Math.round(e.side)}px`, r = `${Math.round(e.editor)}px`, a = `${Math.round(e.post)}px`;
  H().forEach((s) => {
    s.style.setProperty("--lcars-side-col", o), s.style.setProperty("--lcars-editor-col", r), s.style.setProperty("--lcars-post-col", a);
  }), Pt();
}
function Ht() {
  Y && (Y = !1, L = null, vt = !1, Q != null && (cancelAnimationFrame(Q), Q = null), E = Dt(Math.round(E * xi) / xi), document.querySelectorAll(`.${k}.dragging`).forEach((t) => t.classList.remove("dragging")), document.body.classList.remove("lcars-dragging-active"), document.querySelectorAll(".lcars-dragging").forEach((t) => t.classList.remove("lcars-dragging")), tt(), Ji());
}
function Xi(t) {
  t.target.classList.contains(k) && (t.preventDefault(), E !== xt && (E = xt, tt(), Oo(), Ji()));
}
function Wo(t) {
  document.querySelectorAll(`.${k}`).forEach((e) => {
    t ? e.classList.add("lcars-debug") : e.classList.remove("lcars-debug");
  }), t ? Pt() : Vt();
}
async function Ji() {
  try {
    await orca.plugins.setData(Ft, "editorWidthV2", E);
  } catch (t) {
    console.error("[LCARS] 保存编辑区宽度失败:", t);
  }
}
function Dt(t) {
  return Math.min(Po, Math.max(qi, t));
}
const { subscribe: Bo } = window.Valtio;
let A, yt = null, W = !0, K = !1, at = !1;
const Vo = {
  paddEnabled: {
    label: $("📱 PADD ► Pin Settings to Sidebar ◄"),
    description: $("Pin boolean settings from the preferences panel to the editor sidebar for one-tap toggling. PADD (Personal Access Display Device) is a handheld terminal from Star Trek."),
    type: "boolean",
    defaultValue: !0
  },
  editorWidthMode: {
    label: $("✨ Morphic Field ► Drag to Resize Editor ◄"),
    description: $("Drag handles to expand the editor width. 0% = original width, drag to limit = fill available space. Double-click handle to reset. Morphic Field is the underlying force of shape-shifting in Star Trek."),
    type: "boolean",
    defaultValue: !1
  },
  debugMode: {
    label: $("Debug Mode"),
    description: $("Enable console logging for setting toggles and show debug panel in editor area."),
    type: "boolean",
    defaultValue: !1
  }
};
function Ho() {
  return K;
}
function Ko() {
  return W;
}
function Zi() {
  const t = Ti();
  for (const e of t)
    Ni(e);
  po(), console.log(`[PADD] 功能已启用，${t.length} 个设置已钉选`);
}
function Qi() {
  const t = Ti();
  for (const e of t)
    Li(e);
  bo(), console.log("[PADD] 功能已禁用");
}
function Di() {
  var a;
  const t = (a = orca.state.plugins[A]) == null ? void 0 : a.settings, e = (t == null ? void 0 : t.paddEnabled) !== !1, o = !!(t != null && t.debugMode);
  e !== W && (W = e, console.log(`[PADD] 开关状态变化 → ${W}`), W ? Zi() : Qi());
  const r = !!(t != null && t.editorWidthMode);
  r !== at && (at = r, console.log(`[LCARS] 编辑区宽度开关 → ${at}`), Vi(at, _o())), o !== K && (K = o, Wo(K));
}
async function Go(t) {
  var e;
  A = t, Ie(orca.state.locale, { "zh-CN": Ne, en: Le }), console.log(`${A} LCARS 工具箱加载中...`);
  try {
    Ye(A), Ge(() => K), yo(() => K), await Xe(), Do(A);
    const o = await Co();
    xo(() => K), await orca.plugins.setSettingsSchema(A, Vo);
    const r = orca.state.plugins[A];
    r && (r.settings || (r.settings = {}), r.settings.paddEnabled === void 0 && (r.settings.paddEnabled = !0), r.settings.editorWidthMode === void 0 && (r.settings.editorWidthMode = !1)), Ue((f, g) => {
      W && (f && Ni(f), g && Li({ id: g }));
    });
    const a = ((e = r == null ? void 0 : r.settings) == null ? void 0 : e.editorWidthMode) === !0;
    at = a, Vi(a, o), Di();
    const s = orca.state.plugins[A];
    s && (yt = Bo(s, () => {
      Di();
    })), W && Zi(), console.log(`${A} LCARS 工具箱已加载`);
  } catch (o) {
    console.error(`${A} 加载失败:`, o);
  }
}
async function Yo() {
  console.log(`${A} LCARS 工具箱卸载中...`), yt && (yt(), yt = null), Ro(), Qi(), console.log(`${A} LCARS 工具箱已卸载`);
}
export {
  Ho as isDebugMode,
  Ko as isPADDEnabled,
  Go as load,
  Yo as unload
};
