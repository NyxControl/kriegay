// ==UserScript==
// @name            gays Hacks 
// @match           https://*.tankionline.com/*
// @run-at         document-body
// @grant          GM_addStyle
// ==/UserScript==

(() => {
    "use strict";
    var e = {
            43: (e, t, n) => {
                const o = n(323).Z.aimbot;
                addEventListener("cheat-base-ready", (e => {
                    let t, n, a;
                    e.utils.prototypeHook(TargetingSystemWithHorizontalAimAssist, "i:0", (function() {
                        (t && n && a || (t = e.utils.find(this, "HorizontalAimingParams")?.[0], n = e.utils.find(this, "i:1.i:0")?.[0], a = e.utils.find(this, "i:1.i:1")?.[0], t && n && a)) && (this[t][a] = o.enabled ? .017453292 : .0034906584520148633, this[t][n] = o.enabled ? Math.round(Math.PI / 180 / this[t][a] * 180) : 13)
                    }))
                }))
            },
            823: (e, t, n) => {
                const o = n(323).Z.other;
                addEventListener("cheat-base-ready", (e => {
                    let t, n = !1;
                    addEventListener("onPlayerCreated", (e => {
                        e.local && (t = e.components.WeaponTrigger, n = !1)
                    })), e.runAfterPhysicsUpdate.push((() => {
                        t && (o.autoShoot || !0 !== n || (n = !1, t.pulled = !1), o.autoShoot && (n = !0, t.pulled = !0))
                    }))
                }))
            },
            997: (e, t, n) => {
                const o = n(323).Z.fly,
                    a = o.binds;
                addEventListener("cheat-base-ready", (e => {
                    const t = e.utils.isKeyPressed,
                        n = e.features.battleChat.isInputActive,
                        s = e.utils.find,
                        i = e.features.battleMap.getKillZone,
                        l = s(Quaternion.prototype, "i:15")[0],
                        c = new FollowCamera,
                        d = (s(c, "i:9")[0], s(c, "i:17")[0]),
                        r = s(c, "i:17.i:1")[0];
                    let p, u, y, v;
                    document.addEventListener("keyup", (e => {
                        n && !n() && e.code === a.toggleState && y && o.enabled && (p = !p, y.body.movable = !p, p ? (u.x = y.body.state.position.x, u.y = y.body.state.position.y, u.z = y.body.state.position.z) : (y.body.state.velocity = new Vector3, y.body.state.angularVelocity = new Vector3))
                    })), addEventListener("onPlayerCreated", (t => {
                        t.local && (p = !1, u = new Vector3, y = t, v = e.battleClasses.localPlayer.components.FollowCamera)
                    })), e.runAfterPhysicsUpdate.push((() => {
                        if (!o.enabled && p && (p = !1, y.body.movable = !0, y.body.state.velocity = new Vector3, y.body.state.angularVelocity = new Vector3), p) {
                            const e = v[d][r];
                            t(a.forward) && (u.x = u.x + o.speed * Math.sin(-e), u.y = u.y + o.speed * Math.cos(-e)), t(a.back) && (u.x = u.x - o.speed * Math.sin(-e), u.y = u.y - o.speed * Math.cos(-e)), t(a.right) && (u.x = u.x + o.speed * Math.sin(-(e - Math.PI / 2)), u.y = u.y + o.speed * Math.cos(-(e - Math.PI / 2))), t(a.left) && (u.x = u.x - o.speed * Math.sin(-(e - Math.PI / 2)), u.y = u.y - o.speed * Math.cos(-(e - Math.PI / 2))), t(a.up) && (u.z += o.speed), t(a.down) && (u.z -= o.speed), t("ArrowRight") && (o.speed += 10), t("ArrowLeft") && (o.speed -= 10), (e => {
                                const t = i();
                                t && (e.x > t.maxX && (e.x = t.maxX), e.x < t.minX && (e.x = t.minX), e.y > t.maxY && (e.y = t.maxY), e.y < t.minY && (e.y = t.minY), e.z > t.maxZ && (e.z = t.maxZ), e.z < t.minZ && (e.z = t.minZ))
                            })(u), y.body.state.position.x = u.x, y.body.state.position.y = u.y, y.body.state.position.z = u.z, y.body.state.orientation[l](0, 0, e)
                        }
                    }))
                }))
            },
            907: (e, t, n) => {
                const o = n(323).Z.camera;
                addEventListener("cheat-base-ready", (e => {
                    {
                        let t;
                        e.utils.prototypeHook(CameraComponent, "i:1", (n => {
                            o.fov.enabled && e.battleClasses.world && (t || (t = e.utils.find(n, "i:0")?.[0], t)) && (n[t] = o.fov.value)
                        }), !0)
                    }
                }))
            },
            107: (e, t, n) => {
                const o = n(323).Z.other;
                let a, s = !1;
                addEventListener("cheat-base-ready", (e => {
                    a = e.battleClasses, e.runAfterPhysicsUpdate.push((() => {
                        if (a && a.players) {
                            if (o.freezeTanks || !0 !== s) o.freezeTanks && (s = !0);
                            else {
                                for (const e of a.players) e.local || (e.body.movable = !0, e.body.state.velocity = new Vector3, e.body.state.angularVelocity = new Vector3);
                                s = !1
                            }
                            if (o.freezeTanks)
                                for (const e of a.players) e.local || (e.body.movable = !1, e.body.state.velocity = new Vector3, e.body.state.angularVelocity = new Vector3)
                        }
                    }))
                }))
            },
            917: () => {},
            651: (e, t, n) => {
                const o = n(323).Z.movement;
                addEventListener("cheat-base-ready", (e => {
                    const t = e.utils.find(TankPhysicsComponent.prototype, "i:5")[0],
                        n = e.utils.find(TankPhysicsComponent.prototype, "i:6")[0];
                    let a, s = !1;
                    addEventListener("onPlayerCreated", (e => {
                        e.local && (s = !1, a = e.components.TankPhysicsComponent)
                    })), e.runAfterPhysicsUpdate.push((() => {
                        if (!o.ignoreTanks && s) return a[t](11), void(s = !1);
                        o.ignoreTanks && (a[n](11), s = !0)
                    }))
                }))
            },
            457: () => {},
            622: () => {},
            290: () => {},
            111: () => {},
            335: (e, t, n) => {
                const o = n(323).Z.fps.removeMines;
                let a, s;
                addEventListener("cheat-base-ready", (e => {
                    a = e.battleClasses, s = e.utils.toLong;
                    const t = e.utils.find(BattleMinesModel.prototype, "i:5")[1];
                    e.utils.prototypeHook(BattleMinesModel, "i:6", (function() {
                        if (o.enabled && a && a.game && a.players)
                            for (const e of a.players) o.enabled && e.local || o.enabled && e.isEnemy ? t.call(this, s(e.id)) : !o.enabled || e.isEnemy || e.local || t.call(this, s(e.id))
                    }), !0)
                }))
            },
            256: (e, t, n) => {
                const o = n(323).Z.shot;
                addEventListener("cheat-base-ready", (e => {
                    let t = [],
                        n = null,
                        a = !1;
                    document.addEventListener("keyup", (t => {
                        t.code === o.key && e.battleClasses.localPlayer && n?.entity && (a = !0, e.battleClasses.localPlayer.send(new Real))
                    })), addEventListener("onTargetIsSet", (({
                        player: e
                    }) => n = e)), addEventListener("onPlayerCreated", (e => {
                        e.local && setTimeout((() => {
                            t = [], a = !1
                        }), 100)
                    })), e.utils.prototypeHook(SmokyModel, "i:10", (function() {
                        return "skip"
                    })), e.utils.prototypeHook(MachineGunModel, "i:9", (function() {
                        return "skip"
                    })), e.utils.prototypeHook(RicochetModel, "i:12", (function() {
                        return "skip"
                    })), e.utils.prototypeHook(SmokyModel, "i:8", (function() {
                        o.enabled && (t.push(arguments[1]), a && n?.entity && (() => {
                            a = !1, this[e.utils.find(SmokyModel.prototype, "i:11")[0]].call(this, arguments[0], 0, n.entity, new ArrayList([n.body.state.position]))
                        })())
                    })), e.utils.prototypeHook(SmokyModel, "i:11", (function() {
                        for (const e of t) arguments[1] = e, arguments[4].apply(this, arguments);
                        return t = [], "skip"
                    })), e.utils.prototypeHook(MachineGunModel, "i:8", (function() {
                        o.enabled && (t.push(arguments[1]), a && n?.entity && (() => {
                            a = !1, this[e.utils.find(MachineGunModel.prototype, "i:10")[0]].call(this, arguments[0], n.entity, 0, n.body.state.position, new ArrayList([n.body.state.position]))
                        })())
                    })), e.utils.prototypeHook(MachineGunModel, "i:10", (function() {
                        for (const e of t) arguments[2] = e, arguments[5].apply(this, arguments);
                        return t = [], "skip"
                    })), e.utils.prototypeHook(RicochetModel, "i:10", (function() {
                        o.enabled && (t.push(arguments[1]), a && n?.entity && (() => {
                            a = !1, this[e.utils.find(RicochetModel.prototype, "i:13")[0]].call(this, arguments[0], n.entity, 0, n.body.state.position, new ArrayList([n.body.state.position]))
                        })())
                    })), e.utils.prototypeHook(RicochetModel, "i:13", (function() {
                        if (arguments[1] === e.battleClasses.localPlayer.entity) return "skip";
                        for (const e of t) arguments[2] = e, arguments[5].apply(this, arguments);
                        return t = [], "skip"
                    })), setInterval((() => {
                        document.querySelector(".value.shells-value > span").textContent = t.length
                    }), 100)
                }))
            },
            271: (e, t, n) => {
                const o = n(323).Z.movement;
                addEventListener("cheat-base-ready", (e => {
                    let t, n, a, s, i, l = 500,
                        c = 0;
                    const d = e.utils.find(new Quaternion, "__proto__.i:12")[0],
                        r = e.features.battleMap.getKillZone;
                    document.addEventListener("keyup", (n => {
                        if (n.code === o.stick) {
                            const n = e.battleClasses.players.filter((e => !e.local));
                            if (c++, !n || 0 === n.length) return;
                            c > n.length - 1 && (c = 0), n[c] || (c = 0), t = n[c]
                        }
                        "KeyB" === n.code && (t = null, l = 500)
                    })), addEventListener("onPlayerCreated", (e => {
                        e.local && (t = null, n = e.body.state.position, s = e.body.state.velocity, i = e.body.state.angularVelocity, a = e.body.state.orientation)
                    })), e.runAfterPhysicsUpdate.push((() => {
                        if (!t) return;
                        e.utils.isKeyPressed("KeyW") && (l -= 10), e.utils.isKeyPressed("KeyS") && (l += 10);
                        const o = new Vector3;
                        t.body.state.orientation[d](o);
                        const c = Math.atan2(o.y, o.x);
                        n.x = t.body.state.position.x - l * Math.sin(-(c - Math.PI / 2)), n.y = t.body.state.position.y - l * Math.cos(-(c - Math.PI / 2)), n.z = t.body.state.position.z + l, s.x = 0, s.y = 0, s.z = 999999, a = new Vector3, i = new Vector3, (e => {
                            const t = r();
                            t && (e.x > t.maxX && (e.x = t.maxX), e.x < t.minX && (e.x = t.minX), e.y > t.maxY && (e.y = t.maxY), e.y < t.minY && (e.y = t.minY), e.z > t.maxZ && (e.z = t.maxZ), e.z < t.minZ && (e.z = t.minZ))
                        })(n)
                    }))
                }))
            },
            455: (e, t, n) => {
                var o = n(323),
                    a = n(487);
                const s = o.Z.movement.antiAim;
                addEventListener("cheat-base-ready", (e => {
                    e.utils.prototypeHook(TankModel, "i:14", ((t, n, o) => {
                        s.state && (t => {
                            const n = e.features.battleMap.getKillZone();
                            n && (t.x = e.utils.getRandomArbitrary(n.minX, n.maxX), t.y = e.utils.getRandomArbitrary(n.minY, n.maxY), t.z = e.utils.getRandomArbitrary(n.boundZ + 100, n.maxZ))
                        })(o.position), (t => {
                            const n = e.features.battleMap.getKillZone();
                            n && (t.x > n.maxX && (t.x = n.maxX), t.x < n.minX && (t.x = n.minX), t.y > n.maxY && (t.y = n.maxY), t.y < n.minY && (t.y = n.minY), t.z > n.maxZ && (t.z = n.maxZ), t.z < n.minZ && (t.z = n.minZ))
                        })(o.position)
                    })), document.addEventListener("keyup", (({
                        code: e
                    }) => {
                        e === s.key && (s.state = !s.state, (0, a.V)())
                    }))
                }))
            },
            477: () => {
                addEventListener("cheat-base-ready", (e => {
                    e.utils.prototypeHook(UserContextMenuItems, "i:1", (t => {
                        try {
                            const n = e.utils.find(t, "array.i:1")[1],
                                o = Object.create(n[n.length - 1]);
                            o.props = {
                                content: "Set target",
                                onClick: () => {
                                    e.battleClasses.players.forEach((e => e.isTarget = !1));
                                    const t = e.battleClasses.players.find((t => document.querySelector(".ContextMenuStyle-menu span.Common-whiteSpaceNoWrap").textContent.includes(e.utils.find(t.components, "UserTitleComponent.UserTitleConfiguration.i:0")?.[1])));
                                    t.isTarget = !t.isTarget;
                                    const n = new Event("onTargetIsSet");
                                    n.player = t, dispatchEvent(n)
                                }
                            }, n.push(o)
                        } catch (e) {
                            console.error(e)
                        }
                    }), !0)
                }))
            },
            560: (e, t, n) => {
                var o = n(323),
                    a = n(487);
                const s = o.Z.shot.throughWalls;
                addEventListener("cheat-base-ready", (e => {
                    Vector3.prototype.split = function(e) {
                        this.x = this.x / e, this.y = this.y / e, this.z = this.z / e
                    };
                    const t = e.utils.find(Vector3.prototype, "i:19")?.[0],
                        n = 3.25;
                    addEventListener("OnUserJoinTheBattle", (({
                        action: o
                    }) => {
                        const a = (t => {
                            for (const n of e.battleClasses.players)
                                if (n.id === t) return n
                        })(o.namedClasses.Long.string);
                        if (a.isEnemy) {
                            const o = a.components.TankPhysicsComponent,
                                i = e.utils.find(o, "i:6")?.[1],
                                l = e.utils.find(i, "Vector3")?.[0];
                            if (!i[l] || !s.state) return;
                            i[l][t](n)
                        }
                    })), document.addEventListener("keyup", (({
                        code: o
                    }) => {
                        e.features.battleChat.isInputActive() || o === s.key && (s.state = !s.state, function() {
                            for (const o of e.battleClasses?.players)
                                if (o.isEnemy) {
                                    const a = o.components.TankPhysicsComponent,
                                        i = e.utils.find(a, "i:6")?.[1],
                                        l = e.utils.find(i, "Vector3")?.[0];
                                    if (!i[l]) return;
                                    s.state ? i[l][t](n) : i[l].split(n)
                                }
                        }(), (0, a.V)())
                    }))
                }))
            },
            730: (e, t, n) => {
                const o = n(323).Z.other;
                addEventListener("cheat-base-ready", (e => {
                    e.runAfterPhysicsUpdate.push((() => {
                        if (e.battleClasses.players)
                            for (const t of e.battleClasses.players) t.isEnemy && (o.wallHack ? t.send(new ShowHighlight(16711680, !1)) : t.send(new HideHighlight))
                    }))
                }))
            },
            487: (e, t, n) => {
                n.d(t, {
                    V: () => r
                });
                var o = n(323);
                const a = `\n  <div class="container" id="reborn-container" style="display: none;">\n      <div class="menu">\n          <div class="menu-item" id="button-local">Local</div>\n          <div class="menu-item" id="button-visual">Weapon</div>\n          <div class="menu-item" id="button-other">Other</div>\n          <div class="menu-item" id="button-binds">Binds</div>\n      </div>\n      <div id="content-local" class="content">\n          <div class="option">\n              <div class="label">Fly Hack</div>\n              <div class="value">\n                  <label class="switch">\n                    <input type="checkbox" class="toggle" data-config-path="fly.enabled">\n                    <span class="slider"></span>\n                  </label>\n              </div>\n          </div>\n          <div class="option">\n              <div class="label">FPS Hack</div>\n              <div class="value">\n                <label class="switch">\n                  <input type="checkbox" class="toggle" data-config-path="fps.removeMines.enabled">\n                  <span class="slider"></span>\n                </label>\n              </div>\n          </div>\n           <div class="option">\n              <div class="label">Hitboxes</div>\n              <div class="value">\n                <label class="switch">\n                  <input type="checkbox" class="toggle" data-config-path="shot.throughWalls.state">\n                  <span class="slider"></span>\n                </label>\n              </div>\n          </div>\n          <div class="option">\n              <div class="label">Anti-Aim</div>\n              <div class="value">\n                  <label class="switch">\n                    <input type="checkbox" class="toggle" data-config-path="movement.antiAim.state">\n                    <span class="slider"></span>\n                  </label>\n              </div>\n          </div>\n          <div class="option">\n              <div class="label">FOV</div>\n              <div class="value fov-control">\n                  <input type="range" id="fov-range" min="1.04" max="2" step="0.01" data-config-path="camera.fov.value" />\n                  <div class="fov-value" tabindex="-1">1.04</div>\n                  <label class="switch">\n                    <input type="checkbox" class="toggle" data-config-path="camera.fov.enabled">\n                    <span class="slider"></span>\n                  </label>\n              </div>\n          </div>\n      </div>\n      <div id="content-visual" class="content" style="display: none;">\n          <div class="option">\n              <div class="label">One Shot</div>\n              <div class="value">\n                  <label class="switch">\n                    <input type="checkbox" class="toggle" data-config-path="shot.enabled">\n                    <span class="slider"></span>\n                  </label>\n              </div>\n          </div>\n          <div class="option">\n              <div class="label">Aimbot</div>\n              <div class="value">\n                  <label class="switch">\n                    <input type="checkbox" class="toggle" data-config-path="aimbot.enabled">\n                    <span class="slider"></span>\n                  </label>\n              </div>\n          </div>\n          <div class="option">\n              <div class="label">Auto Shoot</div>\n              <div class="value">\n                  <label class="switch">\n                    <input type="checkbox" class="toggle" data-config-path="other.autoShoot">\n                    <span class="slider"></span>\n                  </label>\n              </div>\n          </div>\n          <div class="option shells-option">\n              <div class="label">Shells</div>\n                <div class="value shells-value"><span>0</span></div>\n          </div>\n      </div>\n      <div id="content-other" class="content" style="display: none;">\n          <div class="option">\n              <div class="label">WallHack</div>\n              <div class="value">\n                  <label class="switch">\n                    <input type="checkbox" class="toggle" data-config-path="other.wallHack">\n                    <span class="slider"></span>\n                  </label>\n              </div>\n          </div>\n          <div class="option">\n              <div class="label">Ignore Tanks</div>\n              <div class="value">\n                  <label class="switch">\n                    <input type="checkbox" class="toggle" data-config-path="movement.ignoreTanks">\n                    <span class="slider"></span>\n                  </label>\n              </div>\n          </div>\n          <div class="option">\n              <div class="label">Freeze Tanks</div>\n              <div class="value">\n                  <label class="switch">\n                    <input type="checkbox" class="toggle" data-config-path="other.freezeTanks">\n                    <span class="slider"></span>\n                  </label>\n              </div>\n          </div>\n      </div>\n      <div id="content-binds" class="content" style="display: none;">\n          <div class="option">\n              <div class="label">Fly Hack</div>\n              <div class="value"><span class="hotkey" data-config-path="fly.binds.toggleState">[${o.Z.fly.binds.toggleState}]</span></div>\n          </div>\n            <div class="option">\n              <div class="label">Anti-Aim</div>\n              <div class="value"><span class="hotkey" data-config-path="movement.antiAim.key">[${o.Z.movement.antiAim.key}]</span></div>\n          </div>\n          <div class="option">\n              <div class="label">Stick</div>\n              <div class="value"><span class="hotkey" data-config-path="movement.stick">[${o.Z.movement.stick}]</span></div>\n          </div>\n           <div class="option">\n              <div class="label">Hitboxes</div>\n              <div class="value"><span class="hotkey" data-config-path="shot.throughWalls.key">[${o.Z.shot.throughWalls.key}]</span></div>\n          </div>\n          <div class="option">\n              <div class="label">OneShot</div>\n              <div class="value"><span class="hotkey" data-config-path="shot.key">[${o.Z.shot.key}]</span></div>\n          </div>\n      </div>\n  </div>\n`;
                GM_addStyle('\n        .container {\n            width: 470px;\n            background-color: #333;\n            border: 1px solid #000;\n            padding: 10px;\n            margin: 20px auto;\n            display: flex;\n            position: absolute;\n            cursor: move;\n        }\n        .menu {\n            display: flex;\n            flex-direction: column;\n            margin-right: 10px;\n        }\n        .menu .menu-item {\n            background-color: #444;\n            color: #ccc;\n            padding: 10px;\n            margin-bottom: 5px;\n            text-align: center;\n            cursor: pointer;\n        }\n        .menu .menu-item:hover {\n            background-color: #555;\n        }\n        .content {\n            background-color: #222;\n            padding: 10px;\n            flex-grow: 1;\n        }\n        .content .option {\n            display: flex;\n            align-items: center;\n            justify-content: flex-start;\n            margin-bottom: 10px;\n        }\n       .shells-option {\n          display: flex;\n          align-items: center; \n          gap: 8px;\n       }  \n\n      .shells-value span {\n        font-weight: bold;\n        color: #00ff00;\n        font-family: monospace;\n         margin-right: 15px;\n\n       }\n        .content .option .label {\n            color: #d4d4d4;\n            width: 70px;\n            user-select: none;\n        }\n        .content .option .value {\n            color: #00ff00;\n            display: flex;\n            align-items: center;\n            gap: 8px;\n            margin-left: auto;\n        }\n        .value.fov-control label.switch {\n          margin-left: 0;\n        }\n        .value.fov-control input[type="range"] {\n          margin-left: 0;\n          margin-right: 0;\n          vertical-align: middle;\n          height: 6px;\n          cursor: pointer;\n          transition: background-color 0.3s ease;\n        }\n        .value.fov-control .fov-value {\n          width: 50px;\n          padding: 2px 6px;\n          background: #1a1a1a;\n          border-radius: 4px;\n    \n          font-size: 14px;\n          text-align: center;\n          user-select: none;\n          transition: background-color 0.3s ease;\n          margin-left: 10px;\n          vertical-align: middle;\n          outline: none !important;\n          box-shadow: none !important;\n        }\n        .switch {\n          position: relative;\n          display: inline-block;\n          width: 30px;\n          height: 14px;\n          margin-left: 10px;\n        }\n        .switch input {\n          opacity: 0;\n          width: 0;\n          height: 0;\n        }\n        .switch input:focus {\n          outline: none;\n          box-shadow: none;\n        }\n        .slider {\n          position: absolute;\n          cursor: pointer;\n          top: 0; left: 0; right: 0; bottom: 0;\n          background-color: #555;\n          transition: 0.3s;\n          border-radius: 14px;\n          box-shadow: inset 0 0 4px #222;\n        }\n        .slider:before {\n          position: absolute;\n          content: "";\n          height: 10px;\n          width: 10px;\n          left: 2px;\n          bottom: 2px;\n          background-color: #eee;\n          transition: 0.3s;\n          border-radius: 50%;\n          box-shadow: 0 1px 2px rgba(0,0,0,0.3);\n        }\n        .switch input:checked + .slider {\n          background-color: #bbb;\n        }\n        .switch input:checked + .slider:before {\n          transform: translateX(16px);\n          background-color: #fff;\n        }\n  ');
                const s = document.createElement("div");
                s.style = "z-index: 9999; position: absolute; top: 5%; left: calc(100% - 1000px); height: auto; width: auto;", s.innerHTML = a, document.body.appendChild(s), document.querySelectorAll(".menu-item").forEach((e => {
                    e.addEventListener("click", (() => {
                        return t = "content-" + e.id.split("-")[1], document.querySelectorAll(".content").forEach((e => e.style.display = "none")), void(document.getElementById(t).style.display = "block");
                        var t
                    }))
                })), document.addEventListener("keydown", (function(e) {
                    if ("Insert" === e.key) {
                        const e = document.getElementById("reborn-container");
                        e && (e.style.display = "none" === e.style.display ? "flex" : "none")
                    }
                }));
                const i = s.querySelector(".fov-value"),
                    l = s.querySelector("#fov-range");
                if (i && l) {
                    l.value = o.Z.camera.fov.value;
                    const e = e => {
                        i.textContent = parseFloat(e).toFixed(2)
                    };
                    e(l.value), l.addEventListener("input", (t => {
                        const n = parseFloat(t.target.value);
                        o.Z.camera.fov.value = n, e(n), (0, o.O)()
                    }))
                }

                function c(e, t) {
                    return t.split(".").reduce(((e, t) => e?.[t]), e)
                }

                function d(e, t, n) {
                    const o = t.split("."),
                        a = o.pop();
                    o.reduce(((e, t) => e[t]), e)[a] = n, r()
                }
                const r = () => {
                    document.querySelectorAll("input.toggle[data-config-path]").forEach((e => {
                        const t = e.dataset.configPath;
                        e.checked = !!c(o.Z, t)
                    })), s.querySelectorAll(".hotkey[data-config-path]").forEach((e => {
                        const t = e.dataset.configPath;
                        e.textContent = `[${c(o.Z,t)}]`
                    }))
                };
                s.querySelector("#reborn-container").addEventListener("mousedown", (function(e) {
                    if (0 !== e.button) return;
                    const t = e.target.tagName.toLowerCase();
                    if (["input", "textarea", "label", "select", "button"].includes(t)) return;
                    const n = this;
                    let o = e.clientX - n.offsetLeft,
                        a = e.clientY - n.offsetTop;

                    function s(e) {
                        n.style.left = e.clientX - o + "px", n.style.top = e.clientY - a + "px"
                    }
                    document.addEventListener("mousemove", s), document.addEventListener("mouseup", (function e() {
                        document.removeEventListener("mousemove", s), document.removeEventListener("mouseup", e), document.body.style.userSelect = ""
                    })), document.body.style.userSelect = "none", e.preventDefault()
                })), document.addEventListener("DOMContentLoaded", (() => {
                    var e;
                    e = o.Z, document.querySelectorAll("input.toggle[data-config-path]").forEach((t => {
                        const n = t.dataset.configPath;
                        t.checked = !!c(e, n), t.addEventListener("change", (() => {
                            d(e, n, t.checked), (0, o.O)()
                        }))
                    })), r(), s.querySelectorAll(".hotkey[data-config-path]").forEach((e => {
                        e.style.cursor = "pointer", e.addEventListener("click", (() => {
                            e.textContent = "[...]", addEventListener("keydown", (function t(n) {
                                n.preventDefault();
                                const a = n.code,
                                    s = e.dataset.configPath;
                                d(o.Z, s, a), (0, o.O)(), e.textContent = `[${a}]`, removeEventListener("keydown", t, !0)
                            }), !0)
                        }))
                    }))
                }))
            },
            323: (e, t, n) => {
                n.d(t, {
                    O: () => i,
                    Z: () => l
                });
                let o = {
                    movement: {
                        speedHack: !1,
                        oldPhysics: !1,
                        ignoreTanks: !1,
                        gravity: -1,
                        knockback: 1,
                        stick: "Numpad4",
                        antiAim: {
                            key: "KeyO",
                            state: !1
                        },
                        antiOD: !1
                    },
                    fly: {
                        enabled: !0,
                        speed: 120,
                        type: "simple",
                        binds: {
                            toggleState: "ShiftRight",
                            forward: "KeyW",
                            back: "KeyS",
                            left: "KeyA",
                            right: "KeyD",
                            up: "KeyQ",
                            down: "KeyE"
                        }
                    },
                    fps: {
                        removeMines: {
                            enabled: !1
                        }
                    },
                    camera: {
                        fov: {
                            enabled: !1,
                            value: 1.04
                        }
                    },
                    shot: {
                        enabled: !1,
                        key: "KeyV",
                        auto: 10,
                        throughWalls: {
                            key: "KeyR",
                            state: !1
                        }
                    },
                    aimbot: {
                        enabled: !1,
                        fov: 180
                    },
                    other: {
                        freezeTanks: !1,
                        wallHack: !1,
                        autoShoot: !1
                    }
                };
                const a = (e, t = "") => {
                    let n = {};
                    for (const o in e) {
                        const s = t ? `${t}.${o}` : o;
                        "object" == typeof e[o] && null !== e[o] ? n = {
                            ...n,
                            ...a(e[o], s)
                        } : n[s] = e[o]
                    }
                    return n
                };
                let s;
                const i = () => {
                    s || (s = setTimeout((() => {
                        const e = a(o);
                        for (const [t, n] of Object.entries(e)) localStorage.setItem(t, n);
                        s = null
                    }), 300))
                };
                (() => {
                    const e = a(o);
                    for (const t of Object.keys(e)) {
                        const n = localStorage.getItem(t);
                        null !== n && (e[t] = "boolean" == typeof e[t] ? "true" === n : "number" == typeof e[t] ? parseFloat(n) : n)
                    }
                    o = (e => {
                        let t = {};
                        for (const n in e) {
                            const o = n.split(".");
                            o.reduce(((t, a, s) => (t[a] || (t[a] = {}), s === o.length - 1 && (t[a] = e[n]), t[a])), t)
                        }
                        return t
                    })(e)
                })();
                const l = o
            },
            817: () => {
                new class {
                    constructor() {
                        this.cheatBase = null, this.isMenuVisible = !1, this.states = {
                            showPPS: {},
                            showResponseTime: {},
                            showHealth: {},
                            showMines: {},
                            showShells: {}
                        }
                    }
                    get mobile() {
                        let e = !1;
                        var t;
                        return t = navigator.userAgent || navigator.vendor || window.opera, (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(t) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(t.substr(0, 4))) && (e = !0), e || navigator.userAgentData.mobile
                    }
                }
            }
        },
        t = {};

    function n(o) {
        var a = t[o];
        if (void 0 !== a) return a.exports;
        var s = t[o] = {
            exports: {}
        };
        return e[o](s, s.exports, n), s.exports
    }
    n.d = (e, t) => {
        for (var o in t) n.o(t, o) && !n.o(e, o) && Object.defineProperty(e, o, {
            enumerable: !0,
            get: t[o]
        })
    }, n.o = (e, t) => Object.prototype.hasOwnProperty.call(e, t), n(323), n(817), n(43), n(823), n(997), n(907), n(107), n(917), n(651), n(457), n(622), n(290), n(111), n(335), n(256), n(271), n(455), n(477), n(560), n(730), n(487)
})();