# oh-StarTrek-LCARS

> 🖥️ *"Computer, display user preferences."*  
> 📌 *"Preferences pinned to side panel. Ready for quick access."*

Turn Orca Note into a Starfleet terminal. The LCARS toolbox injects starship DNA into your workflow — PADD pins your favorite toggles, Morphic Field reshapes your editing space.

[中文文档](README.md)

---

## LCARS Toolbox

oh-StarTrek-LCARS is a Star Trek-themed Orca Note plugin suite inspired by the starship operation interface, providing efficient workflow enhancement tools.

### 📌 PADD (Personal Access Display Device)

**A portable access device from Star Trek**, used by crew members to quickly access systems and personal preferences.

In Orca Note, PADD pins switches from the settings panel to the editor sidebar:

1. Open the settings panel (`Ctrl+,`)
2. Click the `+` pin button next to any toggle
3. Choose an icon from over a thousand options

The toggle then stays in the sidebar — one tap to switch.

![PADD Demo](images/demo.gif)

**Toggle:** The plugin settings panel provides a "📱 PADD ► Pin Settings to Sidebar ◄" switch to enable/disable. When disabled, sidebar pin icons are automatically hidden.

**Compatible with:**
- Orca native settings (24-hour format, spell check, auto-download web images…)
- Third-party plugin boolean switches (oh-StarTrek, tana-tag-color, task-planner, etc.)

### ✨ Morphic Field

**The underlying force of shape-shifting in Star Trek**, altering the structure and form of space.

In Orca Note, Morphic Field lets you drag to expand the editor width — both sides shrink simultaneously while the editing area expands from the center.

![Morphic Field Demo](images/morphic-field.gif)

When used with the oh-StarTrek theme, the starfield reacts to Morphic Field — stars near the indicator line are pulled by gravity, streaking toward your hand with luminous trails; upon release, they drift back and their glow fades, as if a starship is adjusting course at warp.

![Morphic Field + Starfield](images/morphic-field-starfield.gif)

**How to use:**
1. Enable "✨ Morphic Field ► Drag to Resize Editor ◄" in the plugin settings panel
2. Invisible handles appear on both sides of the editor — hover to reveal the indicator line
3. Drag the handle to expand the editor; double-click to reset to original width

---

## Installation

Place the plugin folder in your Orca Note plugins directory and restart the app.

---

## Changelog

**v1.1.0** — Morphic Field
- ✨ Morphic Field: drag to expand editor width, star gravity pull and luminous trails
- ✨ Handle indicator line visual enhancement: orange gradient + blue outer glow
- 📌 PADD / Morphic Field feature naming after Star Trek lore
- ⚡ Drag performance optimization: RAF throttling + skip layout calculations
- 🐛 Independent original values per panel, fixed dual-panel width mismatch

**v1.0.1** — Improvements
- 🐛 PADD toggle response optimization
- 🐛 First-load default value initialization

**v1.0.0** — Initial Release  
- 📌 PADD settings pin tool
- 🎨 1000+ Tabler Icons icon picker
- ⚡ PADD toggle (can be dynamically enabled/disabled)
- 🔧 Debug mode

---

## 🔗 Related Projects

- 🖖 **oh-StarTrek Theme** — [github.com/XxKARLxX/oh-StarTrek](https://github.com/XxKARLxX/oh-StarTrek)  
  Star Trek-themed Orca Note theme — starfield canvas + warp animation + Morphic Field integration

- 🐋 **Orca Note** — [github.com/sethyuan/orca-note](https://github.com/sethyuan/orca-note)

- 📚 **Awesome OrcaNote** — [github.com/sethyuan/awesome-orcanote](https://github.com/sethyuan/awesome-orcanote)

---

*"Setting course for productivity. Engage."*
