	var rt1;
    var y,
        b = [-90, 30.0444];
    var x,
        T,
        w,
        E,
        A,
        C,
        k,
        R,
        S,
        N;

    var F,
        j,
        I,
        O,
        U,
        B,
        W,
        G,
        H,
        q,
		et1,
		et2,
		z,
        X,
        V,
        Y,
        K,
        J,
        Q;

function addPlace_JS(lat, lng) {
	var ttt = [];
	ttt[0] = lng;
	ttt[1] = lat;
	var coords = [];
	coords[0] = lng;
	coords[1] = lat;
	coords[2] = 0;
	//y.geocam.lerp_speed = .015, 
		//vec3.set(y.geocam.coord_target, ttt[0], ttt[1], .015), 
		//vec3.set(y.geocam.coord, ttt[0], ttt[1], .015);
            coords[0], coords[1];
            //setTimeout(function() {
                et1.set_coord(coords);
            //}, 3e3);
}
function main() {
    function e(e) {
        e !== g && (e ? (JOSHUA.Global.countryPopShow(), $("#countrypop h3 .encopy").text(e.name.en), G = 0, H = 0) : JOSHUA.Global.countryPopHide(), g = e)
    }

    function t() {
        if ("orbit" == y.camera_mode) {
            var e = x.mat4;
            mat4.identity(e), mat4.rotateY(e, e, -y.orbit.rotate[1]), mat4.rotateX(e, e, y.orbit.rotate[0]), vec3.transformMat4(y.orbit.pos, y.orbit.translate, e);
            var t = x.vec3;
            vec3.set(t, 0, 0, 1), vec3.transformMat4(t, t, e), vec3.copy(y.orbit.dir, t), y.camera.update(y.orbit.pos, y.orbit.dir)
        } else if ("geocam" == y.camera_mode) {
            var n = y.projection.dir > 0,
                r = y.geocam.coord,
                o = y.geocam.coord_target,
                i = y.geocam.coord_delta;
            vec3.add(o, o, i), o[1] = clamp(o[1], -80, 80);
            var a;
            a = n ? C.ecef : C.mercator, o[2] = clamp(o[2], a[0], a[1]), n ? r[0] < -180 ? (r[0] += 360, o[0] += 360) : r[0] > 180 && (r[0] -= 360, o[0] -= 360) : o[0] = clamp(o[0], -180, 180), vec3.lerp(r, r, o, y.geocam.lerp_speed), vec3.scale(i, i, .9), GTW.project_mercator(T, [r[0], r[1], 0]), GTW.project_mercator(w, r), w[1] -= 2, vec3.sub(E, T, w), vec3.normalize(E, E), vec3.copy(T, w);
            var u = [0, 0, 0];
            GTW.project_ecef(u, [r[0], r[1], 0]), GTW.project_ecef(w, r);
            var s = clamp(2 * (k - r[2]), 0, 1),
                s = lerp(0, 2, s);
            w[1] -= s, vec3.sub(A, u, w), vec3.normalize(A, A);
            var l = smoothstep(y.projection.blend);
            vec3.lerp(T, T, w, l), vec3.lerp(E, E, A, l), y.camera.update(T, E)
        }
        y.projection.blend = clamp(y.projection.blend + y.projection.dir / 120, 0, 1)
    }

    function n() {
        return
    }

    function r() {

    }

    function o(e, t) {
        for (var n = t.length / 3, r = Math.random(), o = n - 1, i = 0, a = 0; o >= i;) {
            var u = i + o >> 1,
                s = t[3 * u + 0];
            s > r ? o = u - 1 : i = u + 1
        }
        a = o;
        var l = 3 * a,
            c = t[l + 1],
            f = t[l + 2];
        f += Random.gauss(0, .01), c += Random.gauss(0, .01), e[0] = c, e[1] = f
    }

    function i(e, t) {
        if (0 === t) return !1;
        var n = B.key_to_country[t];
        return n ? (o(e, n.cities), !0) : !1
    }

    function a(e) {

        if (B.countries.length) {
            if (_.each(e, function (e) {
                var t = e >> 16 & 255,
                    n = e >> 8 & 255,
                    r = e >> 0 & 255,
                    o = GTW.systems[t];
                ++o.count, ++o.target_count[n], ++GTW.total_target_count[n], o.enabled && i(V, n) && (r ? (i(Y, r), I.launch(y, o.id, V, Y)) : I.launch(y, o.id, V, null))
            }), g && H < y.time) {
                var t = g.key;
                GTW.compute_total_target_rank(), z.text(GTW.total_target_rank[t]), H = y.time + 2
            }
            if (q < y.time) {
                GTW.compute_total_target_rank();
                for (var n = [], r = 0; 5 > r; ++r) {
                    var t = GTW.top_infected[r],
                        o = B.key_to_country[t];
                    o && n.push('<li data-key="' + t + '">' + o.name[GTW.lang] + "</li>")
                }
                X.html(n.join("")), q += 5
            }
            G < y.time && (_.each(GTW.systems, function (e) {
                if (e.el_count.text(e.count), g) {
                    var t = g.key,
                        n = e.target_count[t];
                    e.el_popcount.text(n)
                }
            }), G = y.time + Random.uniform(.1, .5))
        }
    }

    function u(t, n) {
        if (n || t !== K) {
            switch (t) {
            case "idle":
                y.geocam.lerp_speed = .2, J = y.time + 30, Q = "spin";
                break;
            case "spin":
                y.geocam.lerp_speed = .015, y.geocam.coord_target[2] = k, e(null), J = y.time + 30, Q = "zoom";
                break;
            case "zoom":
                y.geocam.lerp_speed = .015;
                var r = _.sample(B.countries);
                vec3.set(y.geocam.coord_target, r.center[0], r.center[1], .15), e(r), J = y.time + 30, Q = "spin"
            }
            K = t
        }
    }

    function s() {
        switch (y.time > J && u(Q), K) {
        case "spin":
            var e = y.projection.dir > 0;
            if (e) {
                var t = y.dt,
                    n = 6 * t,
                    r = Math.min(1, .2 * y.time),
                    o = lerp(10, 2, r);
                y.geocam.coord_delta[0] = o * n
            }
        }
    }

    function l() {
        u("idle", !0)
    }

    function c() {
        y.time = 1 * (timeNow() - R), y.dt = 1 / 60;
        var e = Date.now(),
            o = j.poll_events(e);
        if (a(o), s(), t(), r(), n(), y.pick_required) {
            var i = B.pick(y, Z[0], Z[1]);
            i !== y.pick_index && (v.style.cursor = 0 > i ? "default" : "pointer", y.pick_index = i, S = i >= 0 ? B.countries[i] : null), y.pick_required = !1
        }
        var u = "dark" === y.palette ? 0 : .9;
        gl.clearColor(u, u, u, 1), gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT), y.projection.blend > .5 && (O.draw(y), U.draw(y)), B.draw(y), W.draw(y), I.draw(y), et1.draw(y), et2.draw(y), "demo" == K && (y.demo_time = y.time - y.demo_time_start, et2.draw(y))
    }

    function f() {
        c(), requestAnimationFrame(f)
    }

    function p() {
        v.width = v.clientWidth, v.height = v.clientHeight, gl.viewport(0, 0, v.width, v.height), vec4.copy(y.camera.viewport, gl.getParameter(gl.VIEWPORT))
    }

    function h() {
        y.projection.dir = -y.projection.dir, y.projection.dir > 0 && (y.geocam.coord_target[2] = k)
    }

    function d(e, t) {
        e = e.toUpperCase();
        /*var n = _.where(GTW.systems, {
            name: e
        })[0];
        return n[t] = !n[t]*/
    }

    var g = null;
    $("#countrypop").on("click", ".popclose", function () {
        e(null)
    }), $("#topinfected").on("click", "li", function () {
        l();
        var t = this.dataset.key,
            n = B.key_to_country[t];
        n && (vec3.set(y.geocam.coord_target, n.center[0], n.center[1], .15), e(n))
    });
    var m = key.noConflict(),
        v = $("#webgl-canvas")[0];
    if (window.gl = webgl.setupCanvas(v, {
        antialias: !0,
        premultipliedAlpha: !1,
        extensions: ["WEBKIT_EXT_texture_filter_anisotropic"],
        shaderSources: [GTW.SHADER_SOURCES || "shaders/all-shaders.glsl", "shaders/demo-shaders.glsl"]
    }), !window.gl) return console.warn("WebGL initialization failed."), $("#webgl-splash").show(), $("#webgl-proceed").on("click", function () {
        $("#webgl-splash").hide()
    }), GTW.lang = "en", void(GTW.UI = {
        zoom_in: function () {},
        zoom_out: function () {},
        map_flat: function () {},
        map_globe: function () {},
        set_language: function (e) {
            GTW.lang = e
        },
        toggle_map: function () {}
    });
	rt1 = GTW.init_flash();
    y = {
            camera: new GTW.Camera,
            flash: function(e) {
                rt1.flash(e)
            },
            orbit: {
                rotate: vec3.fromValues(deg2rad(15), 0, 0),
                translate: vec3.fromValues(0, 0, -20),
                pos: vec3.create(),
                dir: vec3.create()
            },
            geocam: {
                coord: vec3.fromValues(0, 0, 5),
                coord_target: vec3.fromValues(0, 0, 2),
                coord_delta: vec3.create(),
                lerp_speed: .1
            },
            camera_mode: "geocam",
            time: timeNow(),
            demo_time_start: 0,
            demo_time: 0,
            pickRay: null,
            light: {
                position: vec3.fromValues(20, 20, -20),
                position2: vec3.fromValues(20, -25, -20)
            },
            project: function(e, t) {
                this.projection.blend < .5 ? GTW.project_mercator(e, t) : GTW.project_ecef1(e, t)
            },
            projection: {
                blend: 1,
                dir: 1
            },
            pick_required: !1,
            pick_index: -1,
            palette: "dark",
            solo_system_id: 1,
            draw_world: !0
        },
        b = [-90, 30.0444];
    vec2.copy(y.geocam.coord, b), vec2.copy(y.geocam.coord_target, b), y.camera.near = .01, y.camera.far = 200;
    x = {
            mat4: mat4.create(),
            vec3: vec3.create(),
            vec4: vec4.create()
        },
        T = vec3.create(),
        w = vec3.create(),
        E = vec3.create(),
        A = vec3.create(),
        C = {
            mercator: [.15, 1],
            ecef: [.35, 4.5]
        },
        k = 1.6,
        R = timeNow(),
        S = null,
        N = 0;

    F = 100,
        j = new GTW.Simulator,
        I = new GTW.MissileSystem(y),
        O = new GTW.Stars,
        U = new GTW.Corona,
        B = new GTW.World,
        W = new GTW.Labels,
        et2 = GTW.init_demo(y, I),
        G = 0,
        H = 0,
        q = 0,
		et1 = GTW.init_marker(y),
		z = $("#countrypop #ranking"),
        X = $("#topinfectedlist"),
        V = vec3.create(),
        Y = vec3.create(),
        K = "idle",
        J = 0,
        Q = "idle";
        
    u("spin"), $(".demo").click(function () {
        u("spin")
    }), window.addEventListener("resize", p, !1), p();
    var Z = [0, 0],
        et = [0, 0],
        tt = -1;


	
	 v.oncontextmenu = function () {
        return !1
    };
    var nt = {
        mousedown: function (e) {
            return l(), Z = et = getMouseEventOffset(e), tt = e.button, !1
        },
        mouseup: function (t) {
            var n = 10,
                r = getMouseEventOffset(t),
                o = r[0] - et[0],
                i = r[1] - et[1],
                a = o * o + i * i;
            if (n > a)
                if (y.pick_index >= 0) {
                    var u = B.countries[y.pick_index];
                    vec3.set(y.geocam.coord_target, u.center[0], u.center[1], .15), e(u)
                } else e(null);
            return tt = -1, !1
        },
        mousemove: function (e) {
            var t = getMouseEventOffset(e),
                n = t[0] - Z[0],
                r = t[1] - Z[1];
            if (Z = t, "orbit" == y.camera_mode) switch (tt) {
                case 0:
                    y.orbit.rotate[0] += .0025 * r, y.orbit.rotate[1] += .0025 * n;
                    break;
                case 1:
                    y.orbit.translate[0] += .01 * n, y.orbit.translate[1] += .01 * r;
                    break;
                case 2:
                    var o = Math.abs(n) > Math.abs(r) ? n : -r;
                    y.orbit.translate[2] += .05 * o;
                    break;
                default:
                    y.pick_required = !0
                } else if ("geocam" == y.camera_mode) {
                    var i = y.geocam.coord_delta;
                    switch (tt) {
                    case 0:
                        i[0] -= .03 * n, i[1] += .03 * r;
                        break;
                    case 2:
                        var o = Math.abs(n) > Math.abs(r) ? n : -r;
                        i[2] = -.01 * o;
                        break;
                    default:
                        y.pick_required = !0
                    }
                }
            return !1
        },
        mousewheel: function (e) {
            l();
            var t = .9,
                n = e.wheelDeltaY / 120;
            return "orbit" == y.camera_mode ? y.orbit.translate[2] *= 0 > n ? t : 1 / t : "geocam" == y.camera_mode && (y.geocam.coord_delta[2] -= .01 * n), !1
        }
    };
    document.addEventListener("DOMMouseScroll", function (e) {
        return e.wheelDeltaY = -120 * e.detail, nt.mousewheel(e)
    }, !1), _.each(nt, function (e, t) {
        v.addEventListener(t, e, !1)
    });
    var rt = {};
    _.each(rt, function (e, t) {
        m(t, e)
    }), f(), $(".toggle").on("click", function () {
        return $(this).toggleClass("disabled"), "projection" == this.id ? void h() : void 0
    }), GTW.lang = "en";
    var ot = .025;
    GTW.UI = {
        zoom_in: function () {
            y.geocam.coord_delta[2] -= ot
        },
        zoom_out: function () {
            y.geocam.coord_delta[2] += ot
        },
        map_flat: function () {
            y.projection.dir = -1, W.project_labels("mercator"), y.geocam.coord_target[2] = k, e(null)
        },
        map_globe: function () {
            y.projection.dir = 1, W.project_labels("ecef"), y.geocam.coord_target[2] = k, e(null)
        },
        set_language: function (e) {
            GTW.lang !== e && (GTW.lang = e, W.render_labels(e), W.project_labels(y.projection.blend < .5 ? "mercator" : "ecef"))
        },
        toggle_map: function (e) {
            return d(e, "enabled")
        },
        set_palette: function (e) {
            e !== y.palette && (y.palette = e)
        },
        toggle_palette: function () {
            GTW.UI.set_palette("dark" === y.palette ? "light" : "dark")
        }
    }
}

function getQs(e) {
    var t = RegExp("[?&]" + e + "=([^&]*)").exec(window.location.search);
    return t && decodeURIComponent(t[1].replace(/\+/g, " "))
}
window.Modernizr = function (e, t, n) {
    function r(e) {
        d.cssText = e
    }

    function o(e, t) {
        return typeof e === t
    }

    var i, a, u, s = "2.7.1",
        l = {},
        c = !0,
        f = t.documentElement,
        p = "modernizr",
        h = t.createElement(p),
        d = h.style,
        g = ({}.toString, {}),
        m = [],
        v = m.slice,
        y = {}.hasOwnProperty;
    u = o(y, "undefined") || o(y.call, "undefined") ? function (e, t) {
        return t in e && o(e.constructor.prototype[t], "undefined")
    } : function (e, t) {
        return y.call(e, t)
    }, Function.prototype.bind || (Function.prototype.bind = function (e) {
        var t = this;
        if ("function" != typeof t) throw new TypeError;
        var n = v.call(arguments, 1),
            r = function () {
                if (this instanceof r) {
                    var o = function () {};
                    o.prototype = t.prototype;
                    var i = new o,
                        a = t.apply(i, n.concat(v.call(arguments)));
                    return Object(a) === a ? a : i
                }
                return t.apply(e, n.concat(v.call(arguments)))
            };
        return r
    }), g.webgl = function () {
        return !!e.WebGLRenderingContext
    };
    for (var b in g) u(g, b) && (a = b.toLowerCase(), l[a] = g[b](), m.push((l[a] ? "" : "no-") + a));
    return l.addTest = function (e, t) {
            if ("object" == typeof e)
                for (var r in e) u(e, r) && l.addTest(r, e[r]);
            else {
                if (e = e.toLowerCase(), l[e] !== n) return l;
                t = "function" == typeof t ? t() : t, "undefined" != typeof c && c && (f.className += " " + (t ? "" : "no-") + e), l[e] = t
            }
            return l
        }, r(""), h = i = null,
        function (e, t) {
            function n(e, t) {
                var n = e.createElement("p"),
                    r = e.getElementsByTagName("head")[0] || e.documentElement;
                return n.innerHTML = "x<style>" + t + "</style>", r.insertBefore(n.lastChild, r.firstChild)
            }

            function r() {
                var e = y.elements;
                return "string" == typeof e ? e.split(" ") : e
            }

            function o(e) {
                var t = v[e[g]];
                return t || (t = {}, m++, e[g] = m, v[m] = t), t
            }

            function i(e, n, r) {
                if (n || (n = t), c) return n.createElement(e);
                r || (r = o(n));
                var i;
                return i = r.cache[e] ? r.cache[e].cloneNode() : d.test(e) ? (r.cache[e] = r.createElem(e)).cloneNode() : r.createElem(e), !i.canHaveChildren || h.test(e) || i.tagUrn ? i : r.frag.appendChild(i)
            }

            function a(e, n) {
                if (e || (e = t), c) return e.createDocumentFragment();
                n = n || o(e);
                for (var i = n.frag.cloneNode(), a = 0, u = r(), s = u.length; s > a; a++) i.createElement(u[a]);
                return i
            }

            function u(e, t) {
                t.cache || (t.cache = {}, t.createElem = e.createElement, t.createFrag = e.createDocumentFragment, t.frag = t.createFrag()), e.createElement = function (n) {
                    return y.shivMethods ? i(n, e, t) : t.createElem(n)
                }, e.createDocumentFragment = Function("h,f", "return function(){var n=f.cloneNode(),c=n.createElement;h.shivMethods&&(" + r().join().replace(/[\w\-]+/g, function (e) {
                    return t.createElem(e), t.frag.createElement(e), 'c("' + e + '")'
                }) + ");return n}")(y, t.frag)
            }

            function s(e) {
                e || (e = t);
                var r = o(e);
                return y.shivCSS && !l && !r.hasCSS && (r.hasCSS = !!n(e, "article,aside,dialog,figcaption,figure,footer,header,hgroup,main,nav,section{display:block}mark{background:#FF0;color:#000}template{display:none}")), c || u(e, r), e
            }

            var l, c, f = "3.7.0",
                p = e.html5 || {},
                h = /^<|^(?:button|map|select|textarea|object|iframe|option|optgroup)$/i,
                d = /^(?:a|b|code|div|fieldset|h1|h2|h3|h4|h5|h6|i|label|li|ol|p|q|span|strong|style|table|tbody|td|th|tr|ul)$/i,
                g = "_html5shiv",
                m = 0,
                v = {};
            ! function () {
                try {
                    var e = t.createElement("a");
                    e.innerHTML = "<xyz></xyz>", l = "hidden" in e, c = 1 == e.childNodes.length || function () {
                        t.createElement("a");
                        var e = t.createDocumentFragment();
                        return "undefined" == typeof e.cloneNode || "undefined" == typeof e.createDocumentFragment || "undefined" == typeof e.createElement
                    }()
                } catch (n) {
                    l = !0, c = !0
                }
            }();
            var y = {
                elements: p.elements || "abbr article aside audio bdi canvas data datalist details dialog figcaption figure footer header hgroup main mark meter nav output progress section summary template time video",
                version: f,
                shivCSS: p.shivCSS !== !1,
                supportsUnknownElements: c,
                shivMethods: p.shivMethods !== !1,
                type: "default",
                shivDocument: s,
                createElement: i,
                createDocumentFragment: a
            };
            e.html5 = y, s(t)
        }(this, t), l._version = s, f.className = f.className.replace(/(^|\s)no-js(\s|$)/, "$1$2") + (c ? " js " + m.join(" ") : ""), l
}(this, this.document),
function (e, t, n) {
    function r(e) {
        return "[object Function]" == m.call(e)
    }

    function o(e) {
        return "string" == typeof e
    }

    function i() {}

    function a(e) {
        return !e || "loaded" == e || "complete" == e || "uninitialized" == e
    }

    function u() {
        var e = v.shift();
        y = 1, e ? e.t ? d(function () {
            ("c" == e.t ? p.injectCss : p.injectJs)(e.s, 0, e.a, e.x, e.e, 1)
        }, 0) : (e(), u()) : y = 0
    }

    function s(e, n, r, o, i, s, l) {
        function c(t) {
            if (!h && a(f.readyState) && (b.r = h = 1, !y && u(), f.onload = f.onreadystatechange = null, t)) {
                "img" != e && d(function () {
                    x.removeChild(f)
                }, 50);
                for (var r in C[n]) C[n].hasOwnProperty(r) && C[n][r].onload()
            }
        }

        var l = l || p.errorTimeout,
            f = t.createElement(e),
            h = 0,
            m = 0,
            b = {
                t: r,
                s: n,
                e: i,
                a: s,
                x: l
            };
        1 === C[n] && (m = 1, C[n] = []), "object" == e ? f.data = n : (f.src = n, f.type = e), f.width = f.height = "0", f.onerror = f.onload = f.onreadystatechange = function () {
            c.call(this, m)
        }, v.splice(o, 0, b), "img" != e && (m || 2 === C[n] ? (x.insertBefore(f, _ ? null : g), d(c, l)) : C[n].push(f))
    }

    function l(e, t, n, r, i) {
        return y = 0, t = t || "j", o(e) ? s("c" == t ? w : T, e, t, this.i++, n, r, i) : (v.splice(this.i++, 0, e), 1 == v.length && u()), this
    }

    function c() {
        var e = p;
        return e.loader = {
            load: l,
            i: 0
        }, e
    }

    var f, p, h = t.documentElement,
        d = e.setTimeout,
        g = t.getElementsByTagName("script")[0],
        m = {}.toString,
        v = [],
        y = 0,
        b = "MozAppearance" in h.style,
        _ = b && !!t.createRange().compareNode,
        x = _ ? h : g.parentNode,
        h = e.opera && "[object Opera]" == m.call(e.opera),
        h = !!t.attachEvent && !h,
        T = b ? "object" : h ? "script" : "img",
        w = h ? "script" : T,
        E = Array.isArray || function (e) {
            return "[object Array]" == m.call(e)
        },
        A = [],
        C = {},
        k = {
            timeout: function (e, t) {
                return t.length && (e.timeout = t[0]), e
            }
        };
    p = function (e) {
        function t(e) {
            var t, n, r, e = e.split("!"),
                o = A.length,
                i = e.pop(),
                a = e.length,
                i = {
                    url: i,
                    origUrl: i,
                    prefixes: e
                };
            for (n = 0; a > n; n++) r = e[n].split("="), (t = k[r.shift()]) && (i = t(i, r));
            for (n = 0; o > n; n++) i = A[n](i);
            return i
        }

        function a(e, o, i, a, u) {
            var s = t(e),
                l = s.autoCallback;
            s.url.split(".").pop().split("?").shift(), s.bypass || (o && (o = r(o) ? o : o[e] || o[a] || o[e.split("/").pop().split("?")[0]]), s.instead ? s.instead(e, o, i, a, u) : (C[s.url] ? s.noexec = !0 : C[s.url] = 1, i.load(s.url, s.forceCSS || !s.forceJS && "css" == s.url.split(".").pop().split("?").shift() ? "c" : n, s.noexec, s.attrs, s.timeout), (r(o) || r(l)) && i.load(function () {
                c(), o && o(s.origUrl, u, a), l && l(s.origUrl, u, a), C[s.url] = 2
            })))
        }

        function u(e, t) {
            function n(e, n) {
                if (e) {
                    if (o(e)) n || (f = function () {
                        var e = [].slice.call(arguments);
                        p.apply(this, e), h()
                    }), a(e, f, t, 0, l);
                    else if (Object(e) === e)
                        for (s in u = function () {
                            var t, n = 0;
                            for (t in e) e.hasOwnProperty(t) && n++;
                            return n
                        }(), e) e.hasOwnProperty(s) && (!n && !--u && (r(f) ? f = function () {
                            var e = [].slice.call(arguments);
                            p.apply(this, e), h()
                        } : f[s] = function (e) {
                            return function () {
                                var t = [].slice.call(arguments);
                                e && e.apply(this, t), h()
                            }
                        }(p[s])), a(e[s], f, t, s, l))
                } else !n && h()
            }

            var u, s, l = !!e.test,
                c = e.load || e.both,
                f = e.callback || i,
                p = f,
                h = e.complete || i;
            n(l ? e.yep : e.nope, !!c), c && n(c)
        }

        var s, l, f = this.yepnope.loader;
        if (o(e)) a(e, 0, f, 0);
        else if (E(e))
            for (s = 0; s < e.length; s++) l = e[s], o(l) ? a(l, 0, f, 0) : E(l) ? p(l) : Object(l) === l && u(l, f);
        else Object(e) === e && u(e, f)
    }, p.addPrefix = function (e, t) {
        k[e] = t
    }, p.addFilter = function (e) {
        A.push(e)
    }, p.errorTimeout = 1e4, null == t.readyState && t.addEventListener && (t.readyState = "loading", t.addEventListener("DOMContentLoaded", f = function () {
        t.removeEventListener("DOMContentLoaded", f, 0), t.readyState = "complete"
    }, 0)), e.yepnope = c(), e.yepnope.executeStack = u, e.yepnope.injectJs = function (e, n, r, o, s, l) {
        var c, f, h = t.createElement("script"),
            o = o || p.errorTimeout;
        h.src = e;
        for (f in r) h.setAttribute(f, r[f]);
        n = l ? u : n || i, h.onreadystatechange = h.onload = function () {
            !c && a(h.readyState) && (c = 1, n(), h.onload = h.onreadystatechange = null)
        }, d(function () {
            c || (c = 1, n(1))
        }, o), s ? h.onload() : g.parentNode.insertBefore(h, g)
    }, e.yepnope.injectCss = function (e, n, r, o, a, s) {
        var l, o = t.createElement("link"),
            n = s ? u : n || i;
        o.href = e, o.rel = "stylesheet", o.type = "text/css";
        for (l in r) o.setAttribute(l, r[l]);
        a || (g.parentNode.insertBefore(o, g), d(n, 0))
    }
}(this, document), Modernizr.load = function () {
    yepnope.apply(window, [].slice.call(arguments, 0))
},
function (e, t) {
    function n(e) {
        var t = e.length,
            n = it.type(e);
        return it.isWindow(e) ? !1 : 1 === e.nodeType && t ? !0 : "array" === n || "function" !== n && (0 === t || "number" == typeof t && t > 0 && t - 1 in e)
    }

    function r(e) {
        var t = dt[e] = {};
        return it.each(e.match(ut) || [], function (e, n) {
            t[n] = !0
        }), t
    }

    function o() {
        Object.defineProperty(this.cache = {}, 0, {
            get: function () {
                return {}
            }
        }), this.expando = it.expando + Math.random()
    }

    function i(e, n, r) {
        var o;
        if (r === t && 1 === e.nodeType)
            if (o = "data-" + n.replace(yt, "-$1").toLowerCase(), r = e.getAttribute(o), "string" == typeof r) {
                try {
                    r = "true" === r ? !0 : "false" === r ? !1 : "null" === r ? null : +r + "" === r ? +r : vt.test(r) ? JSON.parse(r) : r
                } catch (i) {}
                gt.set(e, n, r)
            } else r = t;
        return r
    }

    function a() {
        return !0
    }

    function u() {
        return !1
    }

    function s() {
        try {
            return $.activeElement
        } catch (e) {}
    }

    function l(e, t) {
        for (;
            (e = e[t]) && 1 !== e.nodeType;);
        return e
    }

    function c(e, t, n) {
        if (it.isFunction(t)) return it.grep(e, function (e, r) {
            return !!t.call(e, r, e) !== n
        });
        if (t.nodeType) return it.grep(e, function (e) {
            return e === t !== n
        });
        if ("string" == typeof t) {
            if (Rt.test(t)) return it.filter(t, e, n);
            t = it.filter(t, e)
        }
        return it.grep(e, function (e) {
            return tt.call(t, e) >= 0 !== n
        })
    }

    function f(e, t) {
        return it.nodeName(e, "table") && it.nodeName(1 === t.nodeType ? t : t.firstChild, "tr") ? e.getElementsByTagName("tbody")[0] || e.appendChild(e.ownerDocument.createElement("tbody")) : e
    }

    function p(e) {
        return e.type = (null !== e.getAttribute("type")) + "/" + e.type, e
    }

    function h(e) {
        var t = Ut.exec(e.type);
        return t ? e.type = t[1] : e.removeAttribute("type"), e
    }

    function d(e, t) {
        for (var n = e.length, r = 0; n > r; r++) mt.set(e[r], "globalEval", !t || mt.get(t[r], "globalEval"))
    }

    function g(e, t) {
        var n, r, o, i, a, u, s, l;
        if (1 === t.nodeType) {
            if (mt.hasData(e) && (i = mt.access(e), a = mt.set(t, i), l = i.events)) {
                delete a.handle, a.events = {};
                for (o in l)
                    for (n = 0, r = l[o].length; r > n; n++) it.event.add(t, o, l[o][n])
            }
            gt.hasData(e) && (u = gt.access(e), s = it.extend({}, u), gt.set(t, s))
        }
    }

    function m(e, n) {
        var r = e.getElementsByTagName ? e.getElementsByTagName(n || "*") : e.querySelectorAll ? e.querySelectorAll(n || "*") : [];
        return n === t || n && it.nodeName(e, n) ? it.merge([e], r) : r
    }

    function v(e, t) {
        var n = t.nodeName.toLowerCase();
        "input" === n && jt.test(e.type) ? t.checked = e.checked : ("input" === n || "textarea" === n) && (t.defaultValue = e.defaultValue)
    }

    function y(e, t) {
        if (t in e) return t;
        for (var n = t.charAt(0).toUpperCase() + t.slice(1), r = t, o = Zt.length; o--;)
            if (t = Zt[o] + n, t in e) return t;
        return r
    }

    function b(e, t) {
        return e = t || e, "none" === it.css(e, "display") || !it.contains(e.ownerDocument, e)
    }

    function _(t) {
        return e.getComputedStyle(t, null)
    }

    function x(e, t) {
        for (var n, r, o, i = [], a = 0, u = e.length; u > a; a++) r = e[a], r.style && (i[a] = mt.get(r, "olddisplay"), n = r.style.display, t ? (i[a] || "none" !== n || (r.style.display = ""), "" === r.style.display && b(r) && (i[a] = mt.access(r, "olddisplay", A(r.nodeName)))) : i[a] || (o = b(r), (n && "none" !== n || !o) && mt.set(r, "olddisplay", o ? n : it.css(r, "display"))));
        for (a = 0; u > a; a++) r = e[a], r.style && (t && "none" !== r.style.display && "" !== r.style.display || (r.style.display = t ? i[a] || "" : "none"));
        return e
    }

    function T(e, t, n) {
        var r = zt.exec(t);
        return r ? Math.max(0, r[1] - (n || 0)) + (r[2] || "px") : t
    }

    function w(e, t, n, r, o) {
        for (var i = n === (r ? "border" : "content") ? 4 : "width" === t ? 1 : 0, a = 0; 4 > i; i += 2) "margin" === n && (a += it.css(e, n + Qt[i], !0, o)), r ? ("content" === n && (a -= it.css(e, "padding" + Qt[i], !0, o)), "margin" !== n && (a -= it.css(e, "border" + Qt[i] + "Width", !0, o))) : (a += it.css(e, "padding" + Qt[i], !0, o), "padding" !== n && (a += it.css(e, "border" + Qt[i] + "Width", !0, o)));
        return a
    }

    function E(e, t, n) {
        var r = !0,
            o = "width" === t ? e.offsetWidth : e.offsetHeight,
            i = _(e),
            a = it.support.boxSizing && "border-box" === it.css(e, "boxSizing", !1, i);
        if (0 >= o || null == o) {
            if (o = Gt(e, t, i), (0 > o || null == o) && (o = e.style[t]), Xt.test(o)) return o;
            r = a && (it.support.boxSizingReliable || o === e.style[t]), o = parseFloat(o) || 0
        }
        return o + w(e, t, n || (a ? "border" : "content"), r, i) + "px"
    }

    function A(e) {
        var t = $,
            n = Yt[e];
        return n || (n = C(e, t), "none" !== n && n || (Ht = (Ht || it("<iframe frameborder='0' width='0' height='0'/>").css("cssText", "display:block !important")).appendTo(t.documentElement), t = (Ht[0].contentWindow || Ht[0].contentDocument).document, t.write("<!doctype html><html><body>"), t.close(), n = C(e, t), Ht.detach()), Yt[e] = n), n
    }

    function C(e, t) {
        var n = it(t.createElement(e)).appendTo(t.body),
            r = it.css(n[0], "display");
        return n.remove(), r
    }

    function k(e, t, n, r) {
        var o;
        if (it.isArray(t)) it.each(t, function (t, o) {
            n || tn.test(e) ? r(e, o) : k(e + "[" + ("object" == typeof o ? t : "") + "]", o, n, r)
        });
        else if (n || "object" !== it.type(t)) r(e, t);
        else
            for (o in t) k(e + "[" + o + "]", t[o], n, r)
    }

    function R(e) {
        return function (t, n) {
            "string" != typeof t && (n = t, t = "*");
            var r, o = 0,
                i = t.toLowerCase().match(ut) || [];
            if (it.isFunction(n))
                for (; r = i[o++];) "+" === r[0] ? (r = r.slice(1) || "*", (e[r] = e[r] || []).unshift(n)) : (e[r] = e[r] || []).push(n)
        }
    }

    function S(e, t, n, r) {
        function o(u) {
            var s;
            return i[u] = !0, it.each(e[u] || [], function (e, u) {
                var l = u(t, n, r);
                return "string" != typeof l || a || i[l] ? a ? !(s = l) : void 0 : (t.dataTypes.unshift(l), o(l), !1)
            }), s
        }

        var i = {},
            a = e === bn;
        return o(t.dataTypes[0]) || !i["*"] && o("*")
    }

    function N(e, n) {
        var r, o, i = it.ajaxSettings.flatOptions || {};
        for (r in n) n[r] !== t && ((i[r] ? e : o || (o = {}))[r] = n[r]);
        return o && it.extend(!0, e, o), e
    }

    function D(e, n, r) {
        for (var o, i, a, u, s = e.contents, l = e.dataTypes;
            "*" === l[0];) l.shift(), o === t && (o = e.mimeType || n.getResponseHeader("Content-Type"));
        if (o)
            for (i in s)
                if (s[i] && s[i].test(o)) {
                    l.unshift(i);
                    break
                }
        if (l[0] in r) a = l[0];
        else {
            for (i in r) {
                if (!l[0] || e.converters[i + " " + l[0]]) {
                    a = i;
                    break
                }
                u || (u = i)
            }
            a = a || u
        }
        return a ? (a !== l[0] && l.unshift(a), r[a]) : void 0
    }

    function M(e, t, n, r) {
        var o, i, a, u, s, l = {},
            c = e.dataTypes.slice();
        if (c[1])
            for (a in e.converters) l[a.toLowerCase()] = e.converters[a];
        for (i = c.shift(); i;)
            if (e.responseFields[i] && (n[e.responseFields[i]] = t), !s && r && e.dataFilter && (t = e.dataFilter(t, e.dataType)), s = i, i = c.shift())
                if ("*" === i) i = s;
                else if ("*" !== s && s !== i) {
            if (a = l[s + " " + i] || l["* " + i], !a)
                for (o in l)
                    if (u = o.split(" "), u[1] === i && (a = l[s + " " + u[0]] || l["* " + u[0]])) {
                        a === !0 ? a = l[o] : l[o] !== !0 && (i = u[0], c.unshift(u[1]));
                        break
                    }
            if (a !== !0)
                if (a && e["throws"]) t = a(t);
                else try {
                    t = a(t)
                } catch (f) {
                    return {
                        state: "parsererror",
                        error: a ? f : "No conversion from " + s + " to " + i
                    }
                }
        }
        return {
            state: "success",
            data: t
        }
    }

    function L() {
        return setTimeout(function () {
            Rn = t
        }), Rn = it.now()
    }

    function P(e, t, n) {
        for (var r, o = (Pn[t] || []).concat(Pn["*"]), i = 0, a = o.length; a > i; i++)
            if (r = o[i].call(n, t, e)) return r
    }

    function F(e, t, n) {
        var r, o, i = 0,
            a = Ln.length,
            u = it.Deferred().always(function () {
                delete s.elem
            }),
            s = function () {
                if (o) return !1;
                for (var t = Rn || L(), n = Math.max(0, l.startTime + l.duration - t), r = n / l.duration || 0, i = 1 - r, a = 0, s = l.tweens.length; s > a; a++) l.tweens[a].run(i);
                return u.notifyWith(e, [l, i, n]), 1 > i && s ? n : (u.resolveWith(e, [l]), !1)
            },
            l = u.promise({
                elem: e,
                props: it.extend({}, t),
                opts: it.extend(!0, {
                    specialEasing: {}
                }, n),
                originalProperties: t,
                originalOptions: n,
                startTime: Rn || L(),
                duration: n.duration,
                tweens: [],
                createTween: function (t, n) {
                    var r = it.Tween(e, l.opts, t, n, l.opts.specialEasing[t] || l.opts.easing);
                    return l.tweens.push(r), r
                },
                stop: function (t) {
                    var n = 0,
                        r = t ? l.tweens.length : 0;
                    if (o) return this;
                    for (o = !0; r > n; n++) l.tweens[n].run(1);
                    return t ? u.resolveWith(e, [l, t]) : u.rejectWith(e, [l, t]), this
                }
            }),
            c = l.props;
        for (j(c, l.opts.specialEasing); a > i; i++)
            if (r = Ln[i].call(l, e, c, l.opts)) return r;
        return it.map(c, P, l), it.isFunction(l.opts.start) && l.opts.start.call(e, l), it.fx.timer(it.extend(s, {
            elem: e,
            anim: l,
            queue: l.opts.queue
        })), l.progress(l.opts.progress).done(l.opts.done, l.opts.complete).fail(l.opts.fail).always(l.opts.always)
    }

    function j(e, t) {
        var n, r, o, i, a;
        for (n in e)
            if (r = it.camelCase(n), o = t[r], i = e[n], it.isArray(i) && (o = i[1], i = e[n] = i[0]), n !== r && (e[r] = i, delete e[n]), a = it.cssHooks[r], a && "expand" in a) {
                i = a.expand(i), delete e[r];
                for (n in i) n in e || (e[n] = i[n], t[n] = o)
            } else t[r] = o
    }

    function I(e, n, r) {
        var o, i, a, u, s, l, c = this,
            f = {},
            p = e.style,
            h = e.nodeType && b(e),
            d = mt.get(e, "fxshow");
        r.queue || (s = it._queueHooks(e, "fx"), null == s.unqueued && (s.unqueued = 0, l = s.empty.fire, s.empty.fire = function () {
            s.unqueued || l()
        }), s.unqueued++, c.always(function () {
            c.always(function () {
                s.unqueued--, it.queue(e, "fx").length || s.empty.fire()
            })
        })), 1 === e.nodeType && ("height" in n || "width" in n) && (r.overflow = [p.overflow, p.overflowX, p.overflowY], "inline" === it.css(e, "display") && "none" === it.css(e, "float") && (p.display = "inline-block")), r.overflow && (p.overflow = "hidden", c.always(function () {
            p.overflow = r.overflow[0], p.overflowX = r.overflow[1], p.overflowY = r.overflow[2]
        }));
        for (o in n)
            if (i = n[o], Nn.exec(i)) {
                if (delete n[o], a = a || "toggle" === i, i === (h ? "hide" : "show")) {
                    if ("show" !== i || !d || d[o] === t) continue;
                    h = !0
                }
                f[o] = d && d[o] || it.style(e, o)
            }
        if (!it.isEmptyObject(f)) {
            d ? "hidden" in d && (h = d.hidden) : d = mt.access(e, "fxshow", {}), a && (d.hidden = !h), h ? it(e).show() : c.done(function () {
                it(e).hide()
            }), c.done(function () {
                var t;
                mt.remove(e, "fxshow");
                for (t in f) it.style(e, t, f[t])
            });
            for (o in f) u = P(h ? d[o] : 0, o, c), o in d || (d[o] = u.start, h && (u.end = u.start, u.start = "width" === o || "height" === o ? 1 : 0))
        }
    }

    function O(e, t, n, r, o) {
        return new O.prototype.init(e, t, n, r, o)
    }

    function U(e, t) {
        var n, r = {
                height: e
            },
            o = 0;
        for (t = t ? 1 : 0; 4 > o; o += 2 - t) n = Qt[o], r["margin" + n] = r["padding" + n] = e;
        return t && (r.opacity = r.width = e), r
    }

    function B(e) {
        return it.isWindow(e) ? e : 9 === e.nodeType && e.defaultView
    }

    var W, G, H = typeof t,
        q = e.location,
        $ = e.document,
        z = $.documentElement,
        X = e.jQuery,
        V = e.$,
        Y = {},
        K = [],
        J = "2.0.3",
        Q = K.concat,
        Z = K.push,
        et = K.slice,
        tt = K.indexOf,
        nt = Y.toString,
        rt = Y.hasOwnProperty,
        ot = J.trim,
        it = function (e, t) {
            return new it.fn.init(e, t, W)
        },
        at = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,
        ut = /\S+/g,
        st = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,
        lt = /^<(\w+)\s*\/?>(?:<\/\1>|)$/,
        ct = /^-ms-/,
        ft = /-([\da-z])/gi,
        pt = function (e, t) {
            return t.toUpperCase()
        },
        ht = function () {
            $.removeEventListener("DOMContentLoaded", ht, !1), e.removeEventListener("load", ht, !1), it.ready()
        };
    it.fn = it.prototype = {
        jquery: J,
        constructor: it,
        init: function (e, n, r) {
            var o, i;
            if (!e) return this;
            if ("string" == typeof e) {
                if (o = "<" === e.charAt(0) && ">" === e.charAt(e.length - 1) && e.length >= 3 ? [null, e, null] : st.exec(e), !o || !o[1] && n) return !n || n.jquery ? (n || r).find(e) : this.constructor(n).find(e);
                if (o[1]) {
                    if (n = n instanceof it ? n[0] : n, it.merge(this, it.parseHTML(o[1], n && n.nodeType ? n.ownerDocument || n : $, !0)), lt.test(o[1]) && it.isPlainObject(n))
                        for (o in n) it.isFunction(this[o]) ? this[o](n[o]) : this.attr(o, n[o]);
                    return this
                }
                return i = $.getElementById(o[2]), i && i.parentNode && (this.length = 1, this[0] = i), this.context = $, this.selector = e, this
            }
            return e.nodeType ? (this.context = this[0] = e, this.length = 1, this) : it.isFunction(e) ? r.ready(e) : (e.selector !== t && (this.selector = e.selector, this.context = e.context), it.makeArray(e, this))
        },
        selector: "",
        length: 0,
        toArray: function () {
            return et.call(this)
        },
        get: function (e) {
            return null == e ? this.toArray() : 0 > e ? this[this.length + e] : this[e]
        },
        pushStack: function (e) {
            var t = it.merge(this.constructor(), e);
            return t.prevObject = this, t.context = this.context, t
        },
        each: function (e, t) {
            return it.each(this, e, t)
        },
        ready: function (e) {
            return it.ready.promise().done(e), this
        },
        slice: function () {
            return this.pushStack(et.apply(this, arguments))
        },
        first: function () {
            return this.eq(0)
        },
        last: function () {
            return this.eq(-1)
        },
        eq: function (e) {
            var t = this.length,
                n = +e + (0 > e ? t : 0);
            return this.pushStack(n >= 0 && t > n ? [this[n]] : [])
        },
        map: function (e) {
            return this.pushStack(it.map(this, function (t, n) {
                return e.call(t, n, t)
            }))
        },
        end: function () {
            return this.prevObject || this.constructor(null)
        },
        push: Z,
        sort: [].sort,
        splice: [].splice
    }, it.fn.init.prototype = it.fn, it.extend = it.fn.extend = function () {
        var e, n, r, o, i, a, u = arguments[0] || {},
            s = 1,
            l = arguments.length,
            c = !1;
        for ("boolean" == typeof u && (c = u, u = arguments[1] || {}, s = 2), "object" == typeof u || it.isFunction(u) || (u = {}), l === s && (u = this, --s); l > s; s++)
            if (null != (e = arguments[s]))
                for (n in e) r = u[n], o = e[n], u !== o && (c && o && (it.isPlainObject(o) || (i = it.isArray(o))) ? (i ? (i = !1, a = r && it.isArray(r) ? r : []) : a = r && it.isPlainObject(r) ? r : {}, u[n] = it.extend(c, a, o)) : o !== t && (u[n] = o));
        return u
    }, it.extend({
        expando: "jQuery" + (J + Math.random()).replace(/\D/g, ""),
        noConflict: function (t) {
            return e.$ === it && (e.$ = V), t && e.jQuery === it && (e.jQuery = X), it
        },
        isReady: !1,
        readyWait: 1,
        holdReady: function (e) {
            e ? it.readyWait++ : it.ready(!0)
        },
        ready: function (e) {
            (e === !0 ? --it.readyWait : it.isReady) || (it.isReady = !0, e !== !0 && --it.readyWait > 0 || (G.resolveWith($, [it]), it.fn.trigger && it($).trigger("ready").off("ready")))
        },
        isFunction: function (e) {
            return "function" === it.type(e)
        },
        isArray: Array.isArray,
        isWindow: function (e) {
            return null != e && e === e.window
        },
        isNumeric: function (e) {
            return !isNaN(parseFloat(e)) && isFinite(e)
        },
        type: function (e) {
            return null == e ? String(e) : "object" == typeof e || "function" == typeof e ? Y[nt.call(e)] || "object" : typeof e
        },
        isPlainObject: function (e) {
            if ("object" !== it.type(e) || e.nodeType || it.isWindow(e)) return !1;
            try {
                if (e.constructor && !rt.call(e.constructor.prototype, "isPrototypeOf")) return !1
            } catch (t) {
                return !1
            }
            return !0
        },
        isEmptyObject: function (e) {
            var t;
            for (t in e) return !1;
            return !0
        },
        error: function (e) {
            throw new Error(e)
        },
        parseHTML: function (e, t, n) {
            if (!e || "string" != typeof e) return null;
            "boolean" == typeof t && (n = t, t = !1), t = t || $;
            var r = lt.exec(e),
                o = !n && [];
            return r ? [t.createElement(r[1])] : (r = it.buildFragment([e], t, o), o && it(o).remove(), it.merge([], r.childNodes))
        },
        parseJSON: JSON.parse,
        parseXML: function (e) {
            var n, r;
            if (!e || "string" != typeof e) return null;
            try {
                r = new DOMParser, n = r.parseFromString(e, "text/xml")
            } catch (o) {
                n = t
            }
            return (!n || n.getElementsByTagName("parsererror").length) && it.error("Invalid XML: " + e), n
        },
        noop: function () {},
        globalEval: function (e) {
            var t, n = eval;
            e = it.trim(e), e && (1 === e.indexOf("use strict") ? (t = $.createElement("script"), t.text = e, $.head.appendChild(t).parentNode.removeChild(t)) : n(e))
        },
        camelCase: function (e) {
            return e.replace(ct, "ms-").replace(ft, pt)
        },
        nodeName: function (e, t) {
            return e.nodeName && e.nodeName.toLowerCase() === t.toLowerCase()
        },
        each: function (e, t, r) {
            var o, i = 0,
                a = e.length,
                u = n(e);
            if (r) {
                if (u)
                    for (; a > i && (o = t.apply(e[i], r), o !== !1); i++);
                else
                    for (i in e)
                        if (o = t.apply(e[i], r), o === !1) break
            } else if (u)
                for (; a > i && (o = t.call(e[i], i, e[i]), o !== !1); i++);
            else
                for (i in e)
                    if (o = t.call(e[i], i, e[i]), o === !1) break;
            return e
        },
        trim: function (e) {
            return null == e ? "" : ot.call(e)
        },
        makeArray: function (e, t) {
            var r = t || [];
            return null != e && (n(Object(e)) ? it.merge(r, "string" == typeof e ? [e] : e) : Z.call(r, e)), r
        },
        inArray: function (e, t, n) {
            return null == t ? -1 : tt.call(t, e, n)
        },
        merge: function (e, n) {
            var r = n.length,
                o = e.length,
                i = 0;
            if ("number" == typeof r)
                for (; r > i; i++) e[o++] = n[i];
            else
                for (; n[i] !== t;) e[o++] = n[i++];
            return e.length = o, e
        },
        grep: function (e, t, n) {
            var r, o = [],
                i = 0,
                a = e.length;
            for (n = !!n; a > i; i++) r = !!t(e[i], i), n !== r && o.push(e[i]);
            return o
        },
        map: function (e, t, r) {
            var o, i = 0,
                a = e.length,
                u = n(e),
                s = [];
            if (u)
                for (; a > i; i++) o = t(e[i], i, r), null != o && (s[s.length] = o);
            else
                for (i in e) o = t(e[i], i, r), null != o && (s[s.length] = o);
            return Q.apply([], s)
        },
        guid: 1,
        proxy: function (e, n) {
            var r, o, i;
            return "string" == typeof n && (r = e[n], n = e, e = r), it.isFunction(e) ? (o = et.call(arguments, 2), i = function () {
                return e.apply(n || this, o.concat(et.call(arguments)))
            }, i.guid = e.guid = e.guid || it.guid++, i) : t
        },
        access: function (e, n, r, o, i, a, u) {
            var s = 0,
                l = e.length,
                c = null == r;
            if ("object" === it.type(r)) {
                i = !0;
                for (s in r) it.access(e, n, s, r[s], !0, a, u)
            } else if (o !== t && (i = !0, it.isFunction(o) || (u = !0), c && (u ? (n.call(e, o), n = null) : (c = n, n = function (e, t, n) {
                return c.call(it(e), n)
            })), n))
                for (; l > s; s++) n(e[s], r, u ? o : o.call(e[s], s, n(e[s], r)));
            return i ? e : c ? n.call(e) : l ? n(e[0], r) : a
        },
        now: Date.now,
        swap: function (e, t, n, r) {
            var o, i, a = {};
            for (i in t) a[i] = e.style[i], e.style[i] = t[i];
            o = n.apply(e, r || []);

            for (i in t) e.style[i] = a[i];
            return o
        }
    }), it.ready.promise = function (t) {
        return G || (G = it.Deferred(), "complete" === $.readyState ? setTimeout(it.ready) : ($.addEventListener("DOMContentLoaded", ht, !1), e.addEventListener("load", ht, !1))), G.promise(t)
    }, it.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function (e, t) {
        Y["[object " + t + "]"] = t.toLowerCase()
    }), W = it($),
    function (e, t) {
        function n(e, t, n, r) {
            var o, i, a, u, s, l, c, f, d, g;
            if ((t ? t.ownerDocument || t : B) !== M && D(t), t = t || M, n = n || [], !e || "string" != typeof e) return n;
            if (1 !== (u = t.nodeType) && 9 !== u) return [];
            if (P && !r) {
                if (o = bt.exec(e))
                    if (a = o[1]) {
                        if (9 === u) {
                            if (i = t.getElementById(a), !i || !i.parentNode) return n;
                            if (i.id === a) return n.push(i), n
                        } else if (t.ownerDocument && (i = t.ownerDocument.getElementById(a)) && O(t, i) && i.id === a) return n.push(i), n
                    } else {
                        if (o[2]) return et.apply(n, t.getElementsByTagName(e)), n;
                        if ((a = o[3]) && w.getElementsByClassName && t.getElementsByClassName) return et.apply(n, t.getElementsByClassName(a)), n
                    }
                if (w.qsa && (!F || !F.test(e))) {
                    if (f = c = U, d = t, g = 9 === u && e, 1 === u && "object" !== t.nodeName.toLowerCase()) {
                        for (l = p(e), (c = t.getAttribute("id")) ? f = c.replace(Tt, "\\$&") : t.setAttribute("id", f), f = "[id='" + f + "'] ", s = l.length; s--;) l[s] = f + h(l[s]);
                        d = ht.test(e) && t.parentNode || t, g = l.join(",")
                    }
                    if (g) try {
                        return et.apply(n, d.querySelectorAll(g)), n
                    } catch (m) {} finally {
                        c || t.removeAttribute("id")
                    }
                }
            }
            return x(e.replace(ct, "$1"), t, n, r)
        }

        function r() {
            function e(n, r) {
                return t.push(n += " ") > A.cacheLength && delete e[t.shift()], e[n] = r
            }

            var t = [];
            return e
        }

        function o(e) {
            return e[U] = !0, e
        }

        function i(e) {
            var t = M.createElement("div");
            try {
                return !!e(t)
            } catch (n) {
                return !1
            } finally {
                t.parentNode && t.parentNode.removeChild(t), t = null
            }
        }

        function a(e, t) {
            for (var n = e.split("|"), r = e.length; r--;) A.attrHandle[n[r]] = t
        }

        function u(e, t) {
            var n = t && e,
                r = n && 1 === e.nodeType && 1 === t.nodeType && (~t.sourceIndex || Y) - (~e.sourceIndex || Y);
            if (r) return r;
            if (n)
                for (; n = n.nextSibling;)
                    if (n === t) return -1;
            return e ? 1 : -1
        }

        function s(e) {
            return function (t) {
                var n = t.nodeName.toLowerCase();
                return "input" === n && t.type === e
            }
        }

        function l(e) {
            return function (t) {
                var n = t.nodeName.toLowerCase();
                return ("input" === n || "button" === n) && t.type === e
            }
        }

        function c(e) {
            return o(function (t) {
                return t = +t, o(function (n, r) {
                    for (var o, i = e([], n.length, t), a = i.length; a--;) n[o = i[a]] && (n[o] = !(r[o] = n[o]))
                })
            })
        }

        function f() {}

        function p(e, t) {
            var r, o, i, a, u, s, l, c = q[e + " "];
            if (c) return t ? 0 : c.slice(0);
            for (u = e, s = [], l = A.preFilter; u;) {
                (!r || (o = ft.exec(u))) && (o && (u = u.slice(o[0].length) || u), s.push(i = [])), r = !1, (o = pt.exec(u)) && (r = o.shift(), i.push({
                    value: r,
                    type: o[0].replace(ct, " ")
                }), u = u.slice(r.length));
                for (a in A.filter)!(o = vt[a].exec(u)) || l[a] && !(o = l[a](o)) || (r = o.shift(), i.push({
                    value: r,
                    type: a,
                    matches: o
                }), u = u.slice(r.length));
                if (!r) break
            }
            return t ? u.length : u ? n.error(e) : q(e, s).slice(0)
        }

        function h(e) {
            for (var t = 0, n = e.length, r = ""; n > t; t++) r += e[t].value;
            return r
        }

        function d(e, t, n) {
            var r = t.dir,
                o = n && "parentNode" === r,
                i = G++;
            return t.first ? function (t, n, i) {
                for (; t = t[r];)
                    if (1 === t.nodeType || o) return e(t, n, i)
            } : function (t, n, a) {
                var u, s, l, c = W + " " + i;
                if (a) {
                    for (; t = t[r];)
                        if ((1 === t.nodeType || o) && e(t, n, a)) return !0
                } else
                    for (; t = t[r];)
                        if (1 === t.nodeType || o)
                            if (l = t[U] || (t[U] = {}), (s = l[r]) && s[0] === c) {
                                if ((u = s[1]) === !0 || u === E) return u === !0
                            } else if (s = l[r] = [c], s[1] = e(t, n, a) || E, s[1] === !0) return !0
            }
        }

        function g(e) {
            return e.length > 1 ? function (t, n, r) {
                for (var o = e.length; o--;)
                    if (!e[o](t, n, r)) return !1;
                return !0
            } : e[0]
        }

        function m(e, t, n, r, o) {
            for (var i, a = [], u = 0, s = e.length, l = null != t; s > u; u++)(i = e[u]) && (!n || n(i, r, o)) && (a.push(i), l && t.push(u));
            return a
        }

        function v(e, t, n, r, i, a) {
            return r && !r[U] && (r = v(r)), i && !i[U] && (i = v(i, a)), o(function (o, a, u, s) {
                var l, c, f, p = [],
                    h = [],
                    d = a.length,
                    g = o || _(t || "*", u.nodeType ? [u] : u, []),
                    v = !e || !o && t ? g : m(g, p, e, u, s),
                    y = n ? i || (o ? e : d || r) ? [] : a : v;
                if (n && n(v, y, u, s), r)
                    for (l = m(y, h), r(l, [], u, s), c = l.length; c--;)(f = l[c]) && (y[h[c]] = !(v[h[c]] = f));
                if (o) {
                    if (i || e) {
                        if (i) {
                            for (l = [], c = y.length; c--;)(f = y[c]) && l.push(v[c] = f);
                            i(null, y = [], l, s)
                        }
                        for (c = y.length; c--;)(f = y[c]) && (l = i ? nt.call(o, f) : p[c]) > -1 && (o[l] = !(a[l] = f))
                    }
                } else y = m(y === a ? y.splice(d, y.length) : y), i ? i(null, a, y, s) : et.apply(a, y)
            })
        }

        function y(e) {
            for (var t, n, r, o = e.length, i = A.relative[e[0].type], a = i || A.relative[" "], u = i ? 1 : 0, s = d(function (e) {
                return e === t
            }, a, !0), l = d(function (e) {
                return nt.call(t, e) > -1
            }, a, !0), c = [

                function (e, n, r) {
                    return !i && (r || n !== S) || ((t = n).nodeType ? s(e, n, r) : l(e, n, r))
                    }]; o > u; u++)
                if (n = A.relative[e[u].type]) c = [d(g(c), n)];
                else {
                    if (n = A.filter[e[u].type].apply(null, e[u].matches), n[U]) {
                        for (r = ++u; o > r && !A.relative[e[r].type]; r++);
                        return v(u > 1 && g(c), u > 1 && h(e.slice(0, u - 1).concat({
                            value: " " === e[u - 2].type ? "*" : ""
                        })).replace(ct, "$1"), n, r > u && y(e.slice(u, r)), o > r && y(e = e.slice(r)), o > r && h(e))
                    }
                    c.push(n)
                }
            return g(c)
        }

        function b(e, t) {
            var r = 0,
                i = t.length > 0,
                a = e.length > 0,
                u = function (o, u, s, l, c) {
                    var f, p, h, d = [],
                        g = 0,
                        v = "0",
                        y = o && [],
                        b = null != c,
                        _ = S,
                        x = o || a && A.find.TAG("*", c && u.parentNode || u),
                        T = W += null == _ ? 1 : Math.random() || .1;
                    for (b && (S = u !== M && u, E = r); null != (f = x[v]); v++) {
                        if (a && f) {
                            for (p = 0; h = e[p++];)
                                if (h(f, u, s)) {
                                    l.push(f);
                                    break
                                }
                            b && (W = T, E = ++r)
                        }
                        i && ((f = !h && f) && g--, o && y.push(f))
                    }
                    if (g += v, i && v !== g) {
                        for (p = 0; h = t[p++];) h(y, d, u, s);
                        if (o) {
                            if (g > 0)
                                for (; v--;) y[v] || d[v] || (d[v] = Q.call(l));
                            d = m(d)
                        }
                        et.apply(l, d), b && !o && d.length > 0 && g + t.length > 1 && n.uniqueSort(l)
                    }
                    return b && (W = T, S = _), y
                };
            return i ? o(u) : u
        }

        function _(e, t, r) {
            for (var o = 0, i = t.length; i > o; o++) n(e, t[o], r);
            return r
        }

        function x(e, t, n, r) {
            var o, i, a, u, s, l = p(e);
            if (!r && 1 === l.length) {
                if (i = l[0] = l[0].slice(0), i.length > 2 && "ID" === (a = i[0]).type && w.getById && 9 === t.nodeType && P && A.relative[i[1].type]) {
                    if (t = (A.find.ID(a.matches[0].replace(wt, Et), t) || [])[0], !t) return n;
                    e = e.slice(i.shift().value.length)
                }
                for (o = vt.needsContext.test(e) ? 0 : i.length; o-- && (a = i[o], !A.relative[u = a.type]);)
                    if ((s = A.find[u]) && (r = s(a.matches[0].replace(wt, Et), ht.test(i[0].type) && t.parentNode || t))) {
                        if (i.splice(o, 1), e = r.length && h(i), !e) return et.apply(n, r), n;
                        break
                    }
            }
            return R(e, l)(r, t, !P, n, ht.test(e)), n
        }

        var T, w, E, A, C, k, R, S, N, D, M, L, P, F, j, I, O, U = "sizzle" + -new Date,
            B = e.document,
            W = 0,
            G = 0,
            H = r(),
            q = r(),
            $ = r(),
            z = !1,
            X = function (e, t) {
                return e === t ? (z = !0, 0) : 0
            },
            V = typeof t,
            Y = 1 << 31,
            K = {}.hasOwnProperty,
            J = [],
            Q = J.pop,
            Z = J.push,
            et = J.push,
            tt = J.slice,
            nt = J.indexOf || function (e) {
                for (var t = 0, n = this.length; n > t; t++)
                    if (this[t] === e) return t;
                return -1
            },
            rt = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",
            ot = "[\\x20\\t\\r\\n\\f]",
            at = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",
            ut = at.replace("w", "w#"),
            st = "\\[" + ot + "*(" + at + ")" + ot + "*(?:([*^$|!~]?=)" + ot + "*(?:(['\"])((?:\\\\.|[^\\\\])*?)\\3|(" + ut + ")|)|)" + ot + "*\\]",
            lt = ":(" + at + ")(?:\\(((['\"])((?:\\\\.|[^\\\\])*?)\\3|((?:\\\\.|[^\\\\()[\\]]|" + st.replace(3, 8) + ")*)|.*)\\)|)",
            ct = new RegExp("^" + ot + "+|((?:^|[^\\\\])(?:\\\\.)*)" + ot + "+$", "g"),
            ft = new RegExp("^" + ot + "*," + ot + "*"),
            pt = new RegExp("^" + ot + "*([>+~]|" + ot + ")" + ot + "*"),
            ht = new RegExp(ot + "*[+~]"),
            dt = new RegExp("=" + ot + "*([^\\]'\"]*)" + ot + "*\\]", "g"),
            gt = new RegExp(lt),
            mt = new RegExp("^" + ut + "$"),
            vt = {
                ID: new RegExp("^#(" + at + ")"),
                CLASS: new RegExp("^\\.(" + at + ")"),
                TAG: new RegExp("^(" + at.replace("w", "w*") + ")"),
                ATTR: new RegExp("^" + st),
                PSEUDO: new RegExp("^" + lt),
                CHILD: new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + ot + "*(even|odd|(([+-]|)(\\d*)n|)" + ot + "*(?:([+-]|)" + ot + "*(\\d+)|))" + ot + "*\\)|)", "i"),
                bool: new RegExp("^(?:" + rt + ")$", "i"),
                needsContext: new RegExp("^" + ot + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + ot + "*((?:-\\d)?\\d*)" + ot + "*\\)|)(?=[^-]|$)", "i")
            },
            yt = /^[^{]+\{\s*\[native \w/,
            bt = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,
            _t = /^(?:input|select|textarea|button)$/i,
            xt = /^h\d$/i,
            Tt = /'|\\/g,
            wt = new RegExp("\\\\([\\da-f]{1,6}" + ot + "?|(" + ot + ")|.)", "ig"),
            Et = function (e, t, n) {
                var r = "0x" + t - 65536;
                return r !== r || n ? t : 0 > r ? String.fromCharCode(r + 65536) : String.fromCharCode(r >> 10 | 55296, 1023 & r | 56320)
            };
        try {
            et.apply(J = tt.call(B.childNodes), B.childNodes), J[B.childNodes.length].nodeType
        } catch (At) {
            et = {
                apply: J.length ? function (e, t) {
                    Z.apply(e, tt.call(t))
                } : function (e, t) {
                    for (var n = e.length, r = 0; e[n++] = t[r++];);
                    e.length = n - 1
                }
            }
        }
        k = n.isXML = function (e) {
            var t = e && (e.ownerDocument || e).documentElement;
            return t ? "HTML" !== t.nodeName : !1
        }, w = n.support = {}, D = n.setDocument = function (e) {
            var t = e ? e.ownerDocument || e : B,
                n = t.defaultView;
            return t !== M && 9 === t.nodeType && t.documentElement ? (M = t, L = t.documentElement, P = !k(t), n && n.attachEvent && n !== n.top && n.attachEvent("onbeforeunload", function () {
                D()
            }), w.attributes = i(function (e) {
                return e.className = "i", !e.getAttribute("className")
            }), w.getElementsByTagName = i(function (e) {
                return e.appendChild(t.createComment("")), !e.getElementsByTagName("*").length
            }), w.getElementsByClassName = i(function (e) {
                return e.innerHTML = "<div class='a'></div><div class='a i'></div>", e.firstChild.className = "i", 2 === e.getElementsByClassName("i").length
            }), w.getById = i(function (e) {
                return L.appendChild(e).id = U, !t.getElementsByName || !t.getElementsByName(U).length
            }), w.getById ? (A.find.ID = function (e, t) {
                if (typeof t.getElementById !== V && P) {
                    var n = t.getElementById(e);
                    return n && n.parentNode ? [n] : []
                }
            }, A.filter.ID = function (e) {
                var t = e.replace(wt, Et);
                return function (e) {
                    return e.getAttribute("id") === t
                }
            }) : (delete A.find.ID, A.filter.ID = function (e) {
                var t = e.replace(wt, Et);
                return function (e) {
                    var n = typeof e.getAttributeNode !== V && e.getAttributeNode("id");
                    return n && n.value === t
                }
            }), A.find.TAG = w.getElementsByTagName ? function (e, t) {
                return typeof t.getElementsByTagName !== V ? t.getElementsByTagName(e) : void 0
            } : function (e, t) {
                var n, r = [],
                    o = 0,
                    i = t.getElementsByTagName(e);
                if ("*" === e) {
                    for (; n = i[o++];) 1 === n.nodeType && r.push(n);
                    return r
                }
                return i
            }, A.find.CLASS = w.getElementsByClassName && function (e, t) {
                return typeof t.getElementsByClassName !== V && P ? t.getElementsByClassName(e) : void 0
            }, j = [], F = [], (w.qsa = yt.test(t.querySelectorAll)) && (i(function (e) {
                e.innerHTML = "<select><option selected=''></option></select>", e.querySelectorAll("[selected]").length || F.push("\\[" + ot + "*(?:value|" + rt + ")"), e.querySelectorAll(":checked").length || F.push(":checked")
            }), i(function (e) {
                var n = t.createElement("input");
                n.setAttribute("type", "hidden"), e.appendChild(n).setAttribute("t", ""), e.querySelectorAll("[t^='']").length && F.push("[*^$]=" + ot + "*(?:''|\"\")"), e.querySelectorAll(":enabled").length || F.push(":enabled", ":disabled"), e.querySelectorAll("*,:x"), F.push(",.*:")
            })), (w.matchesSelector = yt.test(I = L.webkitMatchesSelector || L.mozMatchesSelector || L.oMatchesSelector || L.msMatchesSelector)) && i(function (e) {
                w.disconnectedMatch = I.call(e, "div"), I.call(e, "[s!='']:x"), j.push("!=", lt)
            }), F = F.length && new RegExp(F.join("|")), j = j.length && new RegExp(j.join("|")), O = yt.test(L.contains) || L.compareDocumentPosition ? function (e, t) {
                var n = 9 === e.nodeType ? e.documentElement : e,
                    r = t && t.parentNode;
                return e === r || !(!r || 1 !== r.nodeType || !(n.contains ? n.contains(r) : e.compareDocumentPosition && 16 & e.compareDocumentPosition(r)))
            } : function (e, t) {
                if (t)
                    for (; t = t.parentNode;)
                        if (t === e) return !0;
                return !1
            }, X = L.compareDocumentPosition ? function (e, n) {
                if (e === n) return z = !0, 0;
                var r = n.compareDocumentPosition && e.compareDocumentPosition && e.compareDocumentPosition(n);
                return r ? 1 & r || !w.sortDetached && n.compareDocumentPosition(e) === r ? e === t || O(B, e) ? -1 : n === t || O(B, n) ? 1 : N ? nt.call(N, e) - nt.call(N, n) : 0 : 4 & r ? -1 : 1 : e.compareDocumentPosition ? -1 : 1
            } : function (e, n) {
                var r, o = 0,
                    i = e.parentNode,
                    a = n.parentNode,
                    s = [e],
                    l = [n];
                if (e === n) return z = !0, 0;
                if (!i || !a) return e === t ? -1 : n === t ? 1 : i ? -1 : a ? 1 : N ? nt.call(N, e) - nt.call(N, n) : 0;
                if (i === a) return u(e, n);
                for (r = e; r = r.parentNode;) s.unshift(r);
                for (r = n; r = r.parentNode;) l.unshift(r);
                for (; s[o] === l[o];) o++;
                return o ? u(s[o], l[o]) : s[o] === B ? -1 : l[o] === B ? 1 : 0
            }, t) : M
        }, n.matches = function (e, t) {
            return n(e, null, null, t)
        }, n.matchesSelector = function (e, t) {
            if ((e.ownerDocument || e) !== M && D(e), t = t.replace(dt, "='$1']"), !(!w.matchesSelector || !P || j && j.test(t) || F && F.test(t))) try {
                var r = I.call(e, t);
                if (r || w.disconnectedMatch || e.document && 11 !== e.document.nodeType) return r
            } catch (o) {}
            return n(t, M, null, [e]).length > 0
        }, n.contains = function (e, t) {
            return (e.ownerDocument || e) !== M && D(e), O(e, t)
        }, n.attr = function (e, n) {
            (e.ownerDocument || e) !== M && D(e);
            var r = A.attrHandle[n.toLowerCase()],
                o = r && K.call(A.attrHandle, n.toLowerCase()) ? r(e, n, !P) : t;
            return o === t ? w.attributes || !P ? e.getAttribute(n) : (o = e.getAttributeNode(n)) && o.specified ? o.value : null : o
        }, n.error = function (e) {
            throw new Error("Syntax error, unrecognized expression: " + e)
        }, n.uniqueSort = function (e) {
            var t, n = [],
                r = 0,
                o = 0;
            if (z = !w.detectDuplicates, N = !w.sortStable && e.slice(0), e.sort(X), z) {
                for (; t = e[o++];) t === e[o] && (r = n.push(o));
                for (; r--;) e.splice(n[r], 1)
            }
            return e
        }, C = n.getText = function (e) {
            var t, n = "",
                r = 0,
                o = e.nodeType;
            if (o) {
                if (1 === o || 9 === o || 11 === o) {
                    if ("string" == typeof e.textContent) return e.textContent;
                    for (e = e.firstChild; e; e = e.nextSibling) n += C(e)
                } else if (3 === o || 4 === o) return e.nodeValue
            } else
                for (; t = e[r]; r++) n += C(t);
            return n
        }, A = n.selectors = {
            cacheLength: 50,
            createPseudo: o,
            match: vt,
            attrHandle: {},
            find: {},
            relative: {
                ">": {
                    dir: "parentNode",
                    first: !0
                },
                " ": {
                    dir: "parentNode"
                },
                "+": {
                    dir: "previousSibling",
                    first: !0
                },
                "~": {
                    dir: "previousSibling"
                }
            },
            preFilter: {
                ATTR: function (e) {
                    return e[1] = e[1].replace(wt, Et), e[3] = (e[4] || e[5] || "").replace(wt, Et), "~=" === e[2] && (e[3] = " " + e[3] + " "), e.slice(0, 4)
                },
                CHILD: function (e) {
                    return e[1] = e[1].toLowerCase(), "nth" === e[1].slice(0, 3) ? (e[3] || n.error(e[0]), e[4] = +(e[4] ? e[5] + (e[6] || 1) : 2 * ("even" === e[3] || "odd" === e[3])), e[5] = +(e[7] + e[8] || "odd" === e[3])) : e[3] && n.error(e[0]), e
                },
                PSEUDO: function (e) {
                    var n, r = !e[5] && e[2];
                    return vt.CHILD.test(e[0]) ? null : (e[3] && e[4] !== t ? e[2] = e[4] : r && gt.test(r) && (n = p(r, !0)) && (n = r.indexOf(")", r.length - n) - r.length) && (e[0] = e[0].slice(0, n), e[2] = r.slice(0, n)), e.slice(0, 3))
                }
            },
            filter: {
                TAG: function (e) {
                    var t = e.replace(wt, Et).toLowerCase();
                    return "*" === e ? function () {
                        return !0
                    } : function (e) {
                        return e.nodeName && e.nodeName.toLowerCase() === t
                    }
                },
                CLASS: function (e) {
                    var t = H[e + " "];
                    return t || (t = new RegExp("(^|" + ot + ")" + e + "(" + ot + "|$)")) && H(e, function (e) {
                        return t.test("string" == typeof e.className && e.className || typeof e.getAttribute !== V && e.getAttribute("class") || "")
                    })
                },
                ATTR: function (e, t, r) {
                    return function (o) {
                        var i = n.attr(o, e);
                        return null == i ? "!=" === t : t ? (i += "", "=" === t ? i === r : "!=" === t ? i !== r : "^=" === t ? r && 0 === i.indexOf(r) : "*=" === t ? r && i.indexOf(r) > -1 : "$=" === t ? r && i.slice(-r.length) === r : "~=" === t ? (" " + i + " ").indexOf(r) > -1 : "|=" === t ? i === r || i.slice(0, r.length + 1) === r + "-" : !1) : !0
                    }
                },
                CHILD: function (e, t, n, r, o) {
                    var i = "nth" !== e.slice(0, 3),
                        a = "last" !== e.slice(-4),
                        u = "of-type" === t;
                    return 1 === r && 0 === o ? function (e) {
                        return !!e.parentNode
                    } : function (t, n, s) {
                        var l, c, f, p, h, d, g = i !== a ? "nextSibling" : "previousSibling",
                            m = t.parentNode,
                            v = u && t.nodeName.toLowerCase(),
                            y = !s && !u;
                        if (m) {
                            if (i) {
                                for (; g;) {
                                    for (f = t; f = f[g];)
                                        if (u ? f.nodeName.toLowerCase() === v : 1 === f.nodeType) return !1;
                                    d = g = "only" === e && !d && "nextSibling"
                                }
                                return !0
                            }
                            if (d = [a ? m.firstChild : m.lastChild], a && y) {
                                for (c = m[U] || (m[U] = {}), l = c[e] || [], h = l[0] === W && l[1], p = l[0] === W && l[2], f = h && m.childNodes[h]; f = ++h && f && f[g] || (p = h = 0) || d.pop();)
                                    if (1 === f.nodeType && ++p && f === t) {
                                        c[e] = [W, h, p];
                                        break
                                    }
                            } else if (y && (l = (t[U] || (t[U] = {}))[e]) && l[0] === W) p = l[1];
                            else
                                for (;
                                    (f = ++h && f && f[g] || (p = h = 0) || d.pop()) && ((u ? f.nodeName.toLowerCase() !== v : 1 !== f.nodeType) || !++p || (y && ((f[U] || (f[U] = {}))[e] = [W, p]), f !== t)););
                            return p -= o, p === r || p % r === 0 && p / r >= 0
                        }
                    }
                },
                PSEUDO: function (e, t) {
                    var r, i = A.pseudos[e] || A.setFilters[e.toLowerCase()] || n.error("unsupported pseudo: " + e);
                    return i[U] ? i(t) : i.length > 1 ? (r = [e, e, "", t], A.setFilters.hasOwnProperty(e.toLowerCase()) ? o(function (e, n) {
                        for (var r, o = i(e, t), a = o.length; a--;) r = nt.call(e, o[a]), e[r] = !(n[r] = o[a])
                    }) : function (e) {
                        return i(e, 0, r)
                    }) : i
                }
            },
            pseudos: {
                not: o(function (e) {
                    var t = [],
                        n = [],
                        r = R(e.replace(ct, "$1"));
                    return r[U] ? o(function (e, t, n, o) {
                        for (var i, a = r(e, null, o, []), u = e.length; u--;)(i = a[u]) && (e[u] = !(t[u] = i))
                    }) : function (e, o, i) {
                        return t[0] = e, r(t, null, i, n), !n.pop()
                    }
                }),
                has: o(function (e) {
                    return function (t) {
                        return n(e, t).length > 0
                    }
                }),
                contains: o(function (e) {
                    return function (t) {
                        return (t.textContent || t.innerText || C(t)).indexOf(e) > -1
                    }
                }),
                lang: o(function (e) {
                    return mt.test(e || "") || n.error("unsupported lang: " + e), e = e.replace(wt, Et).toLowerCase(),
                        function (t) {
                            var n;
                            do
                                if (n = P ? t.lang : t.getAttribute("xml:lang") || t.getAttribute("lang")) return n = n.toLowerCase(), n === e || 0 === n.indexOf(e + "-");
                            while ((t = t.parentNode) && 1 === t.nodeType);
                            return !1
                        }
                }),
                target: function (t) {
                    var n = e.location && e.location.hash;
                    return n && n.slice(1) === t.id
                },
                root: function (e) {
                    return e === L
                },
                focus: function (e) {
                    return e === M.activeElement && (!M.hasFocus || M.hasFocus()) && !!(e.type || e.href || ~e.tabIndex)
                },
                enabled: function (e) {
                    return e.disabled === !1
                },
                disabled: function (e) {
                    return e.disabled === !0
                },
                checked: function (e) {
                    var t = e.nodeName.toLowerCase();
                    return "input" === t && !!e.checked || "option" === t && !!e.selected
                },
                selected: function (e) {
                    return e.parentNode && e.parentNode.selectedIndex, e.selected === !0
                },
                empty: function (e) {
                    for (e = e.firstChild; e; e = e.nextSibling)
                        if (e.nodeName > "@" || 3 === e.nodeType || 4 === e.nodeType) return !1;
                    return !0
                },
                parent: function (e) {
                    return !A.pseudos.empty(e)
                },
                header: function (e) {
                    return xt.test(e.nodeName)
                },
                input: function (e) {
                    return _t.test(e.nodeName)
                },
                button: function (e) {
                    var t = e.nodeName.toLowerCase();
                    return "input" === t && "button" === e.type || "button" === t
                },
                text: function (e) {
                    var t;
                    return "input" === e.nodeName.toLowerCase() && "text" === e.type && (null == (t = e.getAttribute("type")) || t.toLowerCase() === e.type)
                },
                first: c(function () {
                    return [0]
                }),
                last: c(function (e, t) {
                    return [t - 1]
                }),
                eq: c(function (e, t, n) {
                    return [0 > n ? n + t : n]
                }),
                even: c(function (e, t) {
                    for (var n = 0; t > n; n += 2) e.push(n);
                    return e
                }),
                odd: c(function (e, t) {
                    for (var n = 1; t > n; n += 2) e.push(n);
                    return e
                }),
                lt: c(function (e, t, n) {
                    for (var r = 0 > n ? n + t : n; --r >= 0;) e.push(r);
                    return e
                }),
                gt: c(function (e, t, n) {
                    for (var r = 0 > n ? n + t : n; ++r < t;) e.push(r);
                    return e
                })
            }
        }, A.pseudos.nth = A.pseudos.eq;
        for (T in {
            radio: !0,
            checkbox: !0,
            file: !0,
            password: !0,
            image: !0
        }) A.pseudos[T] = s(T);
        for (T in {
            submit: !0,
            reset: !0
        }) A.pseudos[T] = l(T);
        f.prototype = A.filters = A.pseudos, A.setFilters = new f, R = n.compile = function (e, t) {
            var n, r = [],
                o = [],
                i = $[e + " "];
            if (!i) {
                for (t || (t = p(e)), n = t.length; n--;) i = y(t[n]), i[U] ? r.push(i) : o.push(i);
                i = $(e, b(o, r))
            }
            return i
        }, w.sortStable = U.split("").sort(X).join("") === U, w.detectDuplicates = z, D(), w.sortDetached = i(function (e) {
            return 1 & e.compareDocumentPosition(M.createElement("div"))
        }), i(function (e) {
            return e.innerHTML = "<a href='#'></a>", "#" === e.firstChild.getAttribute("href")
        }) || a("type|href|height|width", function (e, t, n) {
            return n ? void 0 : e.getAttribute(t, "type" === t.toLowerCase() ? 1 : 2)
        }), w.attributes && i(function (e) {
            return e.innerHTML = "<input/>", e.firstChild.setAttribute("value", ""), "" === e.firstChild.getAttribute("value")
        }) || a("value", function (e, t, n) {
            return n || "input" !== e.nodeName.toLowerCase() ? void 0 : e.defaultValue
        }), i(function (e) {
            return null == e.getAttribute("disabled")
        }) || a(rt, function (e, t, n) {
            var r;
            return n ? void 0 : (r = e.getAttributeNode(t)) && r.specified ? r.value : e[t] === !0 ? t.toLowerCase() : null
        }), it.find = n, it.expr = n.selectors, it.expr[":"] = it.expr.pseudos, it.unique = n.uniqueSort, it.text = n.getText, it.isXMLDoc = n.isXML, it.contains = n.contains
    }(e);
    var dt = {};
    it.Callbacks = function (e) {
        e = "string" == typeof e ? dt[e] || r(e) : it.extend({}, e);
        var n, o, i, a, u, s, l = [],
            c = !e.once && [],
            f = function (t) {
                for (n = e.memory && t, o = !0, s = a || 0, a = 0, u = l.length, i = !0; l && u > s; s++)
                    if (l[s].apply(t[0], t[1]) === !1 && e.stopOnFalse) {
                        n = !1;
                        break
                    }
                i = !1, l && (c ? c.length && f(c.shift()) : n ? l = [] : p.disable())
            },
            p = {
                add: function () {
                    if (l) {
                        var t = l.length;
                        ! function r(t) {
                            it.each(t, function (t, n) {
                                var o = it.type(n);
                                "function" === o ? e.unique && p.has(n) || l.push(n) : n && n.length && "string" !== o && r(n)
                            })
                        }(arguments), i ? u = l.length : n && (a = t, f(n))
                    }
                    return this
                },
                remove: function () {
                    return l && it.each(arguments, function (e, t) {
                        for (var n;
                            (n = it.inArray(t, l, n)) > -1;) l.splice(n, 1), i && (u >= n && u--, s >= n && s--)
                    }), this
                },
                has: function (e) {
                    return e ? it.inArray(e, l) > -1 : !(!l || !l.length)
                },
                empty: function () {
                    return l = [], u = 0, this
                },
                disable: function () {
                    return l = c = n = t, this
                },
                disabled: function () {
                    return !l
                },
                lock: function () {
                    return c = t, n || p.disable(), this
                },
                locked: function () {
                    return !c
                },
                fireWith: function (e, t) {
                    return !l || o && !c || (t = t || [], t = [e, t.slice ? t.slice() : t], i ? c.push(t) : f(t)), this
                },
                fire: function () {
                    return p.fireWith(this, arguments), this
                },
                fired: function () {
                    return !!o
                }
            };
        return p
    }, it.extend({
        Deferred: function (e) {
            var t = [
                        ["resolve", "done", it.Callbacks("once memory"), "resolved"],
                        ["reject", "fail", it.Callbacks("once memory"), "rejected"],
                        ["notify", "progress", it.Callbacks("memory")]
                    ],
                n = "pending",
                r = {
                    state: function () {
                        return n
                    },
                    always: function () {
                        return o.done(arguments).fail(arguments), this
                    },
                    then: function () {
                        var e = arguments;
                        return it.Deferred(function (n) {
                            it.each(t, function (t, i) {
                                var a = i[0],
                                    u = it.isFunction(e[t]) && e[t];
                                o[i[1]](function () {
                                    var e = u && u.apply(this, arguments);
                                    e && it.isFunction(e.promise) ? e.promise().done(n.resolve).fail(n.reject).progress(n.notify) : n[a + "With"](this === r ? n.promise() : this, u ? [e] : arguments)
                                })
                            }), e = null
                        }).promise()
                    },
                    promise: function (e) {
                        return null != e ? it.extend(e, r) : r
                    }
                },
                o = {};
            return r.pipe = r.then, it.each(t, function (e, i) {
                var a = i[2],
                    u = i[3];
                r[i[1]] = a.add, u && a.add(function () {
                    n = u
                }, t[1 ^ e][2].disable, t[2][2].lock), o[i[0]] = function () {
                    return o[i[0] + "With"](this === o ? r : this, arguments), this
                }, o[i[0] + "With"] = a.fireWith
            }), r.promise(o), e && e.call(o, o), o
        },
        when: function (e) {
            var t, n, r, o = 0,
                i = et.call(arguments),
                a = i.length,
                u = 1 !== a || e && it.isFunction(e.promise) ? a : 0,
                s = 1 === u ? e : it.Deferred(),
                l = function (e, n, r) {
                    return function (o) {
                        n[e] = this, r[e] = arguments.length > 1 ? et.call(arguments) : o, r === t ? s.notifyWith(n, r) : --u || s.resolveWith(n, r)
                    }
                };
            if (a > 1)
                for (t = new Array(a), n = new Array(a), r = new Array(a); a > o; o++) i[o] && it.isFunction(i[o].promise) ? i[o].promise().done(l(o, r, i)).fail(s.reject).progress(l(o, n, t)) : --u;
            return u || s.resolveWith(r, i), s.promise()
        }
    }), it.support = function (t) {
        var n = $.createElement("input"),
            r = $.createDocumentFragment(),
            o = $.createElement("div"),
            i = $.createElement("select"),
            a = i.appendChild($.createElement("option"));
        return n.type ? (n.type = "checkbox", t.checkOn = "" !== n.value, t.optSelected = a.selected, t.reliableMarginRight = !0, t.boxSizingReliable = !0, t.pixelPosition = !1, n.checked = !0, t.noCloneChecked = n.cloneNode(!0).checked, i.disabled = !0, t.optDisabled = !a.disabled, n = $.createElement("input"), n.value = "t", n.type = "radio", t.radioValue = "t" === n.value, n.setAttribute("checked", "t"), n.setAttribute("name", "t"), r.appendChild(n), t.checkClone = r.cloneNode(!0).cloneNode(!0).lastChild.checked, t.focusinBubbles = "onfocusin" in e, o.style.backgroundClip = "content-box", o.cloneNode(!0).style.backgroundClip = "", t.clearCloneStyle = "content-box" === o.style.backgroundClip, it(function () {
            var n, r, i = "padding:0;margin:0;border:0;display:block;-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box",
                a = $.getElementsByTagName("body")[0];
            a && (n = $.createElement("div"), n.style.cssText = "border:0;width:0;height:0;position:absolute;top:0;left:-9999px;margin-top:1px", a.appendChild(n).appendChild(o), o.innerHTML = "", o.style.cssText = "-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;padding:1px;border:1px;display:block;width:4px;margin-top:1%;position:absolute;top:1%", it.swap(a, null != a.style.zoom ? {
                zoom: 1
            } : {}, function () {
                t.boxSizing = 4 === o.offsetWidth
            }), e.getComputedStyle && (t.pixelPosition = "1%" !== (e.getComputedStyle(o, null) || {}).top, t.boxSizingReliable = "4px" === (e.getComputedStyle(o, null) || {
                width: "4px"
            }).width, r = o.appendChild($.createElement("div")), r.style.cssText = o.style.cssText = i, r.style.marginRight = r.style.width = "0", o.style.width = "1px", t.reliableMarginRight = !parseFloat((e.getComputedStyle(r, null) || {}).marginRight)), a.removeChild(n))
        }), t) : t
    }({});
    var gt, mt, vt = /(?:\{[\s\S]*\}|\[[\s\S]*\])$/,
        yt = /([A-Z])/g;
    o.uid = 1, o.accepts = function (e) {
        return e.nodeType ? 1 === e.nodeType || 9 === e.nodeType : !0
    }, o.prototype = {
        key: function (e) {
            if (!o.accepts(e)) return 0;
            var t = {},
                n = e[this.expando];
            if (!n) {
                n = o.uid++;
                try {
                    t[this.expando] = {
                        value: n
                    }, Object.defineProperties(e, t)
                } catch (r) {
                    t[this.expando] = n, it.extend(e, t)
                }
            }
            return this.cache[n] || (this.cache[n] = {}), n
        },
        set: function (e, t, n) {
            var r, o = this.key(e),
                i = this.cache[o];
            if ("string" == typeof t) i[t] = n;
            else if (it.isEmptyObject(i)) it.extend(this.cache[o], t);
            else
                for (r in t) i[r] = t[r];
            return i
        },
        get: function (e, n) {
            var r = this.cache[this.key(e)];
            return n === t ? r : r[n]
        },
        access: function (e, n, r) {
            var o;
            return n === t || n && "string" == typeof n && r === t ? (o = this.get(e, n), o !== t ? o : this.get(e, it.camelCase(n))) : (this.set(e, n, r), r !== t ? r : n)
        },
        remove: function (e, n) {
            var r, o, i, a = this.key(e),
                u = this.cache[a];
            if (n === t) this.cache[a] = {};
            else {
                it.isArray(n) ? o = n.concat(n.map(it.camelCase)) : (i = it.camelCase(n), n in u ? o = [n, i] : (o = i, o = o in u ? [o] : o.match(ut) || [])), r = o.length;
                for (; r--;) delete u[o[r]]
            }
        },
        hasData: function (e) {
            return !it.isEmptyObject(this.cache[e[this.expando]] || {})
        },
        discard: function (e) {
            e[this.expando] && delete this.cache[e[this.expando]]
        }
    }, gt = new o, mt = new o, it.extend({
        acceptData: o.accepts,
        hasData: function (e) {
            return gt.hasData(e) || mt.hasData(e)
        },
        data: function (e, t, n) {
            return gt.access(e, t, n)
        },
        removeData: function (e, t) {
            gt.remove(e, t)
        },
        _data: function (e, t, n) {
            return mt.access(e, t, n)
        },
        _removeData: function (e, t) {
            mt.remove(e, t)
        }
    }), it.fn.extend({
        data: function (e, n) {
            var r, o, a = this[0],
                u = 0,
                s = null;
            if (e === t) {
                if (this.length && (s = gt.get(a), 1 === a.nodeType && !mt.get(a, "hasDataAttrs"))) {
                    for (r = a.attributes; u < r.length; u++) o = r[u].name, 0 === o.indexOf("data-") && (o = it.camelCase(o.slice(5)), i(a, o, s[o]));
                    mt.set(a, "hasDataAttrs", !0)
                }
                return s
            }
            return "object" == typeof e ? this.each(function () {
                gt.set(this, e)
            }) : it.access(this, function (n) {
                var r, o = it.camelCase(e);
                if (a && n === t) {
                    if (r = gt.get(a, e), r !== t) return r;
                    if (r = gt.get(a, o), r !== t) return r;
                    if (r = i(a, o, t), r !== t) return r
                } else this.each(function () {
                    var r = gt.get(this, o);
                    gt.set(this, o, n), -1 !== e.indexOf("-") && r !== t && gt.set(this, e, n)
                })
            }, null, n, arguments.length > 1, null, !0)
        },
        removeData: function (e) {
            return this.each(function () {
                gt.remove(this, e)
            })
        }
    }), it.extend({
        queue: function (e, t, n) {
            var r;
            return e ? (t = (t || "fx") + "queue", r = mt.get(e, t), n && (!r || it.isArray(n) ? r = mt.access(e, t, it.makeArray(n)) : r.push(n)), r || []) : void 0
        },
        dequeue: function (e, t) {
            t = t || "fx";
            var n = it.queue(e, t),
                r = n.length,
                o = n.shift(),
                i = it._queueHooks(e, t),
                a = function () {
                    it.dequeue(e, t)
                };
            "inprogress" === o && (o = n.shift(), r--), o && ("fx" === t && n.unshift("inprogress"), delete i.stop, o.call(e, a, i)), !r && i && i.empty.fire()
        },
        _queueHooks: function (e, t) {
            var n = t + "queueHooks";
            return mt.get(e, n) || mt.access(e, n, {
                empty: it.Callbacks("once memory").add(function () {
                    mt.remove(e, [t + "queue", n])
                })
            })
        }
    }), it.fn.extend({
        queue: function (e, n) {
            var r = 2;
            return "string" != typeof e && (n = e, e = "fx", r--), arguments.length < r ? it.queue(this[0], e) : n === t ? this : this.each(function () {
                var t = it.queue(this, e, n);
                it._queueHooks(this, e), "fx" === e && "inprogress" !== t[0] && it.dequeue(this, e)
            })
        },
        dequeue: function (e) {
            return this.each(function () {
                it.dequeue(this, e)
            })
        },
        delay: function (e, t) {
            return e = it.fx ? it.fx.speeds[e] || e : e, t = t || "fx", this.queue(t, function (t, n) {
                var r = setTimeout(t, e);
                n.stop = function () {
                    clearTimeout(r)
                }
            })
        },
        clearQueue: function (e) {
            return this.queue(e || "fx", [])
        },
        promise: function (e, n) {
            var r, o = 1,
                i = it.Deferred(),
                a = this,
                u = this.length,
                s = function () {
                    --o || i.resolveWith(a, [a])
                };
            for ("string" != typeof e && (n = e, e = t), e = e || "fx"; u--;) r = mt.get(a[u], e + "queueHooks"), r && r.empty && (o++, r.empty.add(s));
            return s(), i.promise(n)
        }
    });
    var bt, _t, xt = /[\t\r\n\f]/g,
        Tt = /\r/g,
        wt = /^(?:input|select|textarea|button)$/i;
    it.fn.extend({
        attr: function (e, t) {
            return it.access(this, it.attr, e, t, arguments.length > 1)
        },
        removeAttr: function (e) {
            return this.each(function () {
                it.removeAttr(this, e)
            })
        },
        prop: function (e, t) {
            return it.access(this, it.prop, e, t, arguments.length > 1)
        },
        removeProp: function (e) {
            return this.each(function () {
                delete this[it.propFix[e] || e]
            })
        },
        addClass: function (e) {
            var t, n, r, o, i, a = 0,
                u = this.length,
                s = "string" == typeof e && e;
            if (it.isFunction(e)) return this.each(function (t) {
                it(this).addClass(e.call(this, t, this.className))
            });
            if (s)
                for (t = (e || "").match(ut) || []; u > a; a++)
                    if (n = this[a], r = 1 === n.nodeType && (n.className ? (" " + n.className + " ").replace(xt, " ") : " ")) {
                        for (i = 0; o = t[i++];) r.indexOf(" " + o + " ") < 0 && (r += o + " ");
                        n.className = it.trim(r)
                    }
            return this
        },
        removeClass: function (e) {
            var t, n, r, o, i, a = 0,
                u = this.length,
                s = 0 === arguments.length || "string" == typeof e && e;
            if (it.isFunction(e)) return this.each(function (t) {
                it(this).removeClass(e.call(this, t, this.className))
            });
            if (s)
                for (t = (e || "").match(ut) || []; u > a; a++)
                    if (n = this[a], r = 1 === n.nodeType && (n.className ? (" " + n.className + " ").replace(xt, " ") : "")) {
                        for (i = 0; o = t[i++];)
                            for (; r.indexOf(" " + o + " ") >= 0;) r = r.replace(" " + o + " ", " ");
                        n.className = e ? it.trim(r) : ""
                    }
            return this
        },
        toggleClass: function (e, t) {
            var n = typeof e;
            return "boolean" == typeof t && "string" === n ? t ? this.addClass(e) : this.removeClass(e) : this.each(it.isFunction(e) ? function (n) {
                it(this).toggleClass(e.call(this, n, this.className, t), t)
            } : function () {
                if ("string" === n)
                    for (var t, r = 0, o = it(this), i = e.match(ut) || []; t = i[r++];) o.hasClass(t) ? o.removeClass(t) : o.addClass(t);
                else(n === H || "boolean" === n) && (this.className && mt.set(this, "__className__", this.className), this.className = this.className || e === !1 ? "" : mt.get(this, "__className__") || "")
            })
        },
        hasClass: function (e) {
            for (var t = " " + e + " ", n = 0, r = this.length; r > n; n++)
                if (1 === this[n].nodeType && (" " + this[n].className + " ").replace(xt, " ").indexOf(t) >= 0) return !0;
            return !1
        },
        val: function (e) {
            var n, r, o, i = this[0]; {
                if (arguments.length) return o = it.isFunction(e), this.each(function (r) {
                    var i;
                    1 === this.nodeType && (i = o ? e.call(this, r, it(this).val()) : e, null == i ? i = "" : "number" == typeof i ? i += "" : it.isArray(i) && (i = it.map(i, function (e) {
                        return null == e ? "" : e + ""
                    })), n = it.valHooks[this.type] || it.valHooks[this.nodeName.toLowerCase()], n && "set" in n && n.set(this, i, "value") !== t || (this.value = i))
                });
                if (i) return n = it.valHooks[i.type] || it.valHooks[i.nodeName.toLowerCase()], n && "get" in n && (r = n.get(i, "value")) !== t ? r : (r = i.value, "string" == typeof r ? r.replace(Tt, "") : null == r ? "" : r)
            }
        }
    }), it.extend({
        valHooks: {
            option: {
                get: function (e) {
                    var t = e.attributes.value;
                    return !t || t.specified ? e.value : e.text
                }
            },
            select: {
                get: function (e) {
                    for (var t, n, r = e.options, o = e.selectedIndex, i = "select-one" === e.type || 0 > o, a = i ? null : [], u = i ? o + 1 : r.length, s = 0 > o ? u : i ? o : 0; u > s; s++)
                        if (n = r[s], !(!n.selected && s !== o || (it.support.optDisabled ? n.disabled : null !== n.getAttribute("disabled")) || n.parentNode.disabled && it.nodeName(n.parentNode, "optgroup"))) {
                            if (t = it(n).val(), i) return t;
                            a.push(t)
                        }
                    return a
                },
                set: function (e, t) {
                    for (var n, r, o = e.options, i = it.makeArray(t), a = o.length; a--;) r = o[a], (r.selected = it.inArray(it(r).val(), i) >= 0) && (n = !0);
                    return n || (e.selectedIndex = -1), i
                }
            }
        },
        attr: function (e, n, r) {
            var o, i, a = e.nodeType;
            if (e && 3 !== a && 8 !== a && 2 !== a) return typeof e.getAttribute === H ? it.prop(e, n, r) : (1 === a && it.isXMLDoc(e) || (n = n.toLowerCase(), o = it.attrHooks[n] || (it.expr.match.bool.test(n) ? _t : bt)), r === t ? o && "get" in o && null !== (i = o.get(e, n)) ? i : (i = it.find.attr(e, n), null == i ? t : i) : null !== r ? o && "set" in o && (i = o.set(e, r, n)) !== t ? i : (e.setAttribute(n, r + ""), r) : void it.removeAttr(e, n))
        },
        removeAttr: function (e, t) {
            var n, r, o = 0,
                i = t && t.match(ut);
            if (i && 1 === e.nodeType)
                for (; n = i[o++];) r = it.propFix[n] || n, it.expr.match.bool.test(n) && (e[r] = !1), e.removeAttribute(n)
        },
        attrHooks: {
            type: {
                set: function (e, t) {
                    if (!it.support.radioValue && "radio" === t && it.nodeName(e, "input")) {
                        var n = e.value;
                        return e.setAttribute("type", t), n && (e.value = n), t
                    }
                }
            }
        },
        propFix: {
            "for": "htmlFor",
            "class": "className"
        },
        prop: function (e, n, r) {
            var o, i, a, u = e.nodeType;
            if (e && 3 !== u && 8 !== u && 2 !== u) return a = 1 !== u || !it.isXMLDoc(e), a && (n = it.propFix[n] || n, i = it.propHooks[n]), r !== t ? i && "set" in i && (o = i.set(e, r, n)) !== t ? o : e[n] = r : i && "get" in i && null !== (o = i.get(e, n)) ? o : e[n]
        },
        propHooks: {
            tabIndex: {
                get: function (e) {
                    return e.hasAttribute("tabindex") || wt.test(e.nodeName) || e.href ? e.tabIndex : -1
                }
            }
        }
    }), _t = {
        set: function (e, t, n) {
            return t === !1 ? it.removeAttr(e, n) : e.setAttribute(n, n), n
        }
    }, it.each(it.expr.match.bool.source.match(/\w+/g), function (e, n) {
        var r = it.expr.attrHandle[n] || it.find.attr;
        it.expr.attrHandle[n] = function (e, n, o) {
            var i = it.expr.attrHandle[n],
                a = o ? t : (it.expr.attrHandle[n] = t) != r(e, n, o) ? n.toLowerCase() : null;
            return it.expr.attrHandle[n] = i, a
        }
    }), it.support.optSelected || (it.propHooks.selected = {
        get: function (e) {
            var t = e.parentNode;
            return t && t.parentNode && t.parentNode.selectedIndex, null
        }
    }), it.each(["tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable"], function () {
        it.propFix[this.toLowerCase()] = this
    }), it.each(["radio", "checkbox"], function () {
        it.valHooks[this] = {
            set: function (e, t) {
                return it.isArray(t) ? e.checked = it.inArray(it(e).val(), t) >= 0 : void 0
            }
        }, it.support.checkOn || (it.valHooks[this].get = function (e) {
            return null === e.getAttribute("value") ? "on" : e.value
        })
    });
    var Et = /^key/,
        At = /^(?:mouse|contextmenu)|click/,
        Ct = /^(?:focusinfocus|focusoutblur)$/,
        kt = /^([^.]*)(?:\.(.+)|)$/;
    it.event = {
        global: {},
        add: function (e, n, r, o, i) {
            var a, u, s, l, c, f, p, h, d, g, m, v = mt.get(e);
            if (v) {
                for (r.handler && (a = r, r = a.handler, i = a.selector), r.guid || (r.guid = it.guid++), (l = v.events) || (l = v.events = {}), (u = v.handle) || (u = v.handle = function (e) {
                    return typeof it === H || e && it.event.triggered === e.type ? t : it.event.dispatch.apply(u.elem, arguments)
                }, u.elem = e), n = (n || "").match(ut) || [""], c = n.length; c--;) s = kt.exec(n[c]) || [], d = m = s[1], g = (s[2] || "").split(".").sort(), d && (p = it.event.special[d] || {}, d = (i ? p.delegateType : p.bindType) || d, p = it.event.special[d] || {}, f = it.extend({
                    type: d,
                    origType: m,
                    data: o,
                    handler: r,
                    guid: r.guid,
                    selector: i,
                    needsContext: i && it.expr.match.needsContext.test(i),
                    namespace: g.join(".")
                }, a), (h = l[d]) || (h = l[d] = [], h.delegateCount = 0, p.setup && p.setup.call(e, o, g, u) !== !1 || e.addEventListener && e.addEventListener(d, u, !1)), p.add && (p.add.call(e, f), f.handler.guid || (f.handler.guid = r.guid)), i ? h.splice(h.delegateCount++, 0, f) : h.push(f), it.event.global[d] = !0);
                e = null
            }
        },
        remove: function (e, t, n, r, o) {
            var i, a, u, s, l, c, f, p, h, d, g, m = mt.hasData(e) && mt.get(e);
            if (m && (s = m.events)) {
                for (t = (t || "").match(ut) || [""], l = t.length; l--;)
                    if (u = kt.exec(t[l]) || [], h = g = u[1], d = (u[2] || "").split(".").sort(), h) {
                        for (f = it.event.special[h] || {}, h = (r ? f.delegateType : f.bindType) || h, p = s[h] || [], u = u[2] && new RegExp("(^|\\.)" + d.join("\\.(?:.*\\.|)") + "(\\.|$)"), a = i = p.length; i--;) c = p[i], !o && g !== c.origType || n && n.guid !== c.guid || u && !u.test(c.namespace) || r && r !== c.selector && ("**" !== r || !c.selector) || (p.splice(i, 1), c.selector && p.delegateCount--, f.remove && f.remove.call(e, c));
                        a && !p.length && (f.teardown && f.teardown.call(e, d, m.handle) !== !1 || it.removeEvent(e, h, m.handle), delete s[h])
                    } else
                        for (h in s) it.event.remove(e, h + t[l], n, r, !0);
                it.isEmptyObject(s) && (delete m.handle, mt.remove(e, "events"))
            }
        },
        trigger: function (n, r, o, i) {
            var a, u, s, l, c, f, p, h = [o || $],
                d = rt.call(n, "type") ? n.type : n,
                g = rt.call(n, "namespace") ? n.namespace.split(".") : [];
            if (u = s = o = o || $, 3 !== o.nodeType && 8 !== o.nodeType && !Ct.test(d + it.event.triggered) && (d.indexOf(".") >= 0 && (g = d.split("."), d = g.shift(), g.sort()), c = d.indexOf(":") < 0 && "on" + d, n = n[it.expando] ? n : new it.Event(d, "object" == typeof n && n), n.isTrigger = i ? 2 : 3, n.namespace = g.join("."), n.namespace_re = n.namespace ? new RegExp("(^|\\.)" + g.join("\\.(?:.*\\.|)") + "(\\.|$)") : null, n.result = t, n.target || (n.target = o), r = null == r ? [n] : it.makeArray(r, [n]), p = it.event.special[d] || {}, i || !p.trigger || p.trigger.apply(o, r) !== !1)) {
                if (!i && !p.noBubble && !it.isWindow(o)) {
                    for (l = p.delegateType || d, Ct.test(l + d) || (u = u.parentNode); u; u = u.parentNode) h.push(u), s = u;
                    s === (o.ownerDocument || $) && h.push(s.defaultView || s.parentWindow || e)
                }
                for (a = 0;
                    (u = h[a++]) && !n.isPropagationStopped();) n.type = a > 1 ? l : p.bindType || d, f = (mt.get(u, "events") || {})[n.type] && mt.get(u, "handle"), f && f.apply(u, r), f = c && u[c], f && it.acceptData(u) && f.apply && f.apply(u, r) === !1 && n.preventDefault();
                return n.type = d, i || n.isDefaultPrevented() || p._default && p._default.apply(h.pop(), r) !== !1 || !it.acceptData(o) || c && it.isFunction(o[d]) && !it.isWindow(o) && (s = o[c], s && (o[c] = null), it.event.triggered = d, o[d](), it.event.triggered = t, s && (o[c] = s)), n.result
            }
        },
        dispatch: function (e) {
            e = it.event.fix(e);
            var n, r, o, i, a, u = [],
                s = et.call(arguments),
                l = (mt.get(this, "events") || {})[e.type] || [],
                c = it.event.special[e.type] || {};
            if (s[0] = e, e.delegateTarget = this, !c.preDispatch || c.preDispatch.call(this, e) !== !1) {
                for (u = it.event.handlers.call(this, e, l), n = 0;
                    (i = u[n++]) && !e.isPropagationStopped();)
                    for (e.currentTarget = i.elem, r = 0;
                        (a = i.handlers[r++]) && !e.isImmediatePropagationStopped();)(!e.namespace_re || e.namespace_re.test(a.namespace)) && (e.handleObj = a, e.data = a.data, o = ((it.event.special[a.origType] || {}).handle || a.handler).apply(i.elem, s), o !== t && (e.result = o) === !1 && (e.preventDefault(), e.stopPropagation()));
                return c.postDispatch && c.postDispatch.call(this, e), e.result
            }
        },
        handlers: function (e, n) {
            var r, o, i, a, u = [],
                s = n.delegateCount,
                l = e.target;
            if (s && l.nodeType && (!e.button || "click" !== e.type))
                for (; l !== this; l = l.parentNode || this)
                    if (l.disabled !== !0 || "click" !== e.type) {
                        for (o = [], r = 0; s > r; r++) a = n[r], i = a.selector + " ", o[i] === t && (o[i] = a.needsContext ? it(i, this).index(l) >= 0 : it.find(i, this, null, [l]).length), o[i] && o.push(a);
                        o.length && u.push({
                            elem: l,
                            handlers: o
                        })
                    }
            return s < n.length && u.push({
                elem: this,
                handlers: n.slice(s)
            }), u
        },
        props: "altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),
        fixHooks: {},
        keyHooks: {
            props: "char charCode key keyCode".split(" "),
            filter: function (e, t) {
                return null == e.which && (e.which = null != t.charCode ? t.charCode : t.keyCode), e
            }
        },
        mouseHooks: {
            props: "button buttons clientX clientY offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
            filter: function (e, n) {
                var r, o, i, a = n.button;
                return null == e.pageX && null != n.clientX && (r = e.target.ownerDocument || $, o = r.documentElement, i = r.body, e.pageX = n.clientX + (o && o.scrollLeft || i && i.scrollLeft || 0) - (o && o.clientLeft || i && i.clientLeft || 0), e.pageY = n.clientY + (o && o.scrollTop || i && i.scrollTop || 0) - (o && o.clientTop || i && i.clientTop || 0)), e.which || a === t || (e.which = 1 & a ? 1 : 2 & a ? 3 : 4 & a ? 2 : 0), e
            }
        },
        fix: function (e) {
            if (e[it.expando]) return e;
            var t, n, r, o = e.type,
                i = e,
                a = this.fixHooks[o];
            for (a || (this.fixHooks[o] = a = At.test(o) ? this.mouseHooks : Et.test(o) ? this.keyHooks : {}), r = a.props ? this.props.concat(a.props) : this.props, e = new it.Event(i), t = r.length; t--;) n = r[t], e[n] = i[n];
            return e.target || (e.target = $), 3 === e.target.nodeType && (e.target = e.target.parentNode), a.filter ? a.filter(e, i) : e
        },
        special: {
            load: {
                noBubble: !0
            },
            focus: {
                trigger: function () {
                    return this !== s() && this.focus ? (this.focus(), !1) : void 0
                },
                delegateType: "focusin"
            },
            blur: {
                trigger: function () {
                    return this === s() && this.blur ? (this.blur(), !1) : void 0
                },
                delegateType: "focusout"
            },
            click: {
                trigger: function () {
                    return "checkbox" === this.type && this.click && it.nodeName(this, "input") ? (this.click(), !1) : void 0
                },
                _default: function (e) {
                    return it.nodeName(e.target, "a")
                }
            },
            beforeunload: {
                postDispatch: function (e) {
                    e.result !== t && (e.originalEvent.returnValue = e.result)
                }
            }
        },
        simulate: function (e, t, n, r) {
            var o = it.extend(new it.Event, n, {
                type: e,
                isSimulated: !0,
                originalEvent: {}
            });
            r ? it.event.trigger(o, null, t) : it.event.dispatch.call(t, o), o.isDefaultPrevented() && n.preventDefault()
        }
    }, it.removeEvent = function (e, t, n) {
        e.removeEventListener && e.removeEventListener(t, n, !1)
    }, it.Event = function (e, t) {
        return this instanceof it.Event ? (e && e.type ? (this.originalEvent = e, this.type = e.type, this.isDefaultPrevented = e.defaultPrevented || e.getPreventDefault && e.getPreventDefault() ? a : u) : this.type = e, t && it.extend(this, t), this.timeStamp = e && e.timeStamp || it.now(), void(this[it.expando] = !0)) : new it.Event(e, t)
    }, it.Event.prototype = {
        isDefaultPrevented: u,
        isPropagationStopped: u,
        isImmediatePropagationStopped: u,
        preventDefault: function () {
            var e = this.originalEvent;
            this.isDefaultPrevented = a, e && e.preventDefault && e.preventDefault()
        },
        stopPropagation: function () {
            var e = this.originalEvent;
            this.isPropagationStopped = a, e && e.stopPropagation && e.stopPropagation()
        },
        stopImmediatePropagation: function () {
            this.isImmediatePropagationStopped = a, this.stopPropagation()
        }
    }, it.each({
        mouseenter: "mouseover",
        mouseleave: "mouseout"
    }, function (e, t) {
        it.event.special[e] = {
            delegateType: t,
            bindType: t,
            handle: function (e) {
                var n, r = this,
                    o = e.relatedTarget,
                    i = e.handleObj;
                return (!o || o !== r && !it.contains(r, o)) && (e.type = i.origType, n = i.handler.apply(this, arguments), e.type = t), n
            }
        }
    }), it.support.focusinBubbles || it.each({
        focus: "focusin",
        blur: "focusout"
    }, function (e, t) {
        var n = 0,
            r = function (e) {
                it.event.simulate(t, e.target, it.event.fix(e), !0)
            };
        it.event.special[t] = {
            setup: function () {
                0 === n++ && $.addEventListener(e, r, !0)
            },
            teardown: function () {
                0 === --n && $.removeEventListener(e, r, !0)
            }
        }
    }), it.fn.extend({
        on: function (e, n, r, o, i) {
            var a, s;
            if ("object" == typeof e) {
                "string" != typeof n && (r = r || n, n = t);
                for (s in e) this.on(s, n, r, e[s], i);
                return this
            }
            if (null == r && null == o ? (o = n, r = n = t) : null == o && ("string" == typeof n ? (o = r, r = t) : (o = r, r = n, n = t)), o === !1) o = u;
            else if (!o) return this;
            return 1 === i && (a = o, o = function (e) {
                return it().off(e), a.apply(this, arguments)
            }, o.guid = a.guid || (a.guid = it.guid++)), this.each(function () {
                it.event.add(this, e, o, r, n)
            })
        },
        one: function (e, t, n, r) {
            return this.on(e, t, n, r, 1)
        },
        off: function (e, n, r) {
            var o, i;
            if (e && e.preventDefault && e.handleObj) return o = e.handleObj, it(e.delegateTarget).off(o.namespace ? o.origType + "." + o.namespace : o.origType, o.selector, o.handler), this;
            if ("object" == typeof e) {
                for (i in e) this.off(i, n, e[i]);
                return this
            }
            return (n === !1 || "function" == typeof n) && (r = n, n = t), r === !1 && (r = u), this.each(function () {
                it.event.remove(this, e, r, n)
            })
        },
        trigger: function (e, t) {
            return this.each(function () {
                it.event.trigger(e, t, this)
            })
        },
        triggerHandler: function (e, t) {
            var n = this[0];
            return n ? it.event.trigger(e, t, n, !0) : void 0
        }
    });
    var Rt = /^.[^:#\[\.,]*$/,
        St = /^(?:parents|prev(?:Until|All))/,
        Nt = it.expr.match.needsContext,
        Dt = {
            children: !0,
            contents: !0,
            next: !0,
            prev: !0
        };
    it.fn.extend({
        find: function (e) {
            var t, n = [],
                r = this,
                o = r.length;
            if ("string" != typeof e) return this.pushStack(it(e).filter(function () {
                for (t = 0; o > t; t++)
                    if (it.contains(r[t], this)) return !0
            }));
            for (t = 0; o > t; t++) it.find(e, r[t], n);
            return n = this.pushStack(o > 1 ? it.unique(n) : n), n.selector = this.selector ? this.selector + " " + e : e, n
        },
        has: function (e) {
            var t = it(e, this),
                n = t.length;
            return this.filter(function () {
                for (var e = 0; n > e; e++)
                    if (it.contains(this, t[e])) return !0
            })
        },
        not: function (e) {
            return this.pushStack(c(this, e || [], !0))
        },
        filter: function (e) {
            return this.pushStack(c(this, e || [], !1))
        },
        is: function (e) {
            return !!c(this, "string" == typeof e && Nt.test(e) ? it(e) : e || [], !1).length
        },
        closest: function (e, t) {
            for (var n, r = 0, o = this.length, i = [], a = Nt.test(e) || "string" != typeof e ? it(e, t || this.context) : 0; o > r; r++)
                for (n = this[r]; n && n !== t; n = n.parentNode)
                    if (n.nodeType < 11 && (a ? a.index(n) > -1 : 1 === n.nodeType && it.find.matchesSelector(n, e))) {
                        n = i.push(n);
                        break
                    }
            return this.pushStack(i.length > 1 ? it.unique(i) : i)
        },
        index: function (e) {
            return e ? "string" == typeof e ? tt.call(it(e), this[0]) : tt.call(this, e.jquery ? e[0] : e) : this[0] && this[0].parentNode ? this.first().prevAll().length : -1
        },
        add: function (e, t) {
            var n = "string" == typeof e ? it(e, t) : it.makeArray(e && e.nodeType ? [e] : e),
                r = it.merge(this.get(), n);
            return this.pushStack(it.unique(r))
        },
        addBack: function (e) {
            return this.add(null == e ? this.prevObject : this.prevObject.filter(e))
        }
    }), it.each({
        parent: function (e) {
            var t = e.parentNode;
            return t && 11 !== t.nodeType ? t : null
        },
        parents: function (e) {
            return it.dir(e, "parentNode")
        },
        parentsUntil: function (e, t, n) {
            return it.dir(e, "parentNode", n)
        },
        next: function (e) {
            return l(e, "nextSibling")
        },
        prev: function (e) {
            return l(e, "previousSibling")
        },
        nextAll: function (e) {
            return it.dir(e, "nextSibling")
        },
        prevAll: function (e) {
            return it.dir(e, "previousSibling")
        },
        nextUntil: function (e, t, n) {
            return it.dir(e, "nextSibling", n)
        },
        prevUntil: function (e, t, n) {
            return it.dir(e, "previousSibling", n)
        },
        siblings: function (e) {
            return it.sibling((e.parentNode || {}).firstChild, e)
        },
        children: function (e) {
            return it.sibling(e.firstChild)
        },
        contents: function (e) {
            return e.contentDocument || it.merge([], e.childNodes)
        }
    }, function (e, t) {
        it.fn[e] = function (n, r) {
            var o = it.map(this, t, n);
            return "Until" !== e.slice(-5) && (r = n), r && "string" == typeof r && (o = it.filter(r, o)), this.length > 1 && (Dt[e] || it.unique(o), St.test(e) && o.reverse()), this.pushStack(o)
        }
    }), it.extend({
        filter: function (e, t, n) {
            var r = t[0];
            return n && (e = ":not(" + e + ")"), 1 === t.length && 1 === r.nodeType ? it.find.matchesSelector(r, e) ? [r] : [] : it.find.matches(e, it.grep(t, function (e) {
                return 1 === e.nodeType
            }))
        },
        dir: function (e, n, r) {
            for (var o = [], i = r !== t;
                (e = e[n]) && 9 !== e.nodeType;)
                if (1 === e.nodeType) {
                    if (i && it(e).is(r)) break;
                    o.push(e)
                }
            return o
        },
        sibling: function (e, t) {
            for (var n = []; e; e = e.nextSibling) 1 === e.nodeType && e !== t && n.push(e);
            return n
        }
    });
    var Mt = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
        Lt = /<([\w:]+)/,
        Pt = /<|&#?\w+;/,
        Ft = /<(?:script|style|link)/i,
        jt = /^(?:checkbox|radio)$/i,
        It = /checked\s*(?:[^=]|=\s*.checked.)/i,
        Ot = /^$|\/(?:java|ecma)script/i,
        Ut = /^true\/(.*)/,
        Bt = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,
        Wt = {
            option: [1, "<select multiple='multiple'>", "</select>"],
            thead: [1, "<table>", "</table>"],
            col: [2, "<table><colgroup>", "</colgroup></table>"],
            tr: [2, "<table><tbody>", "</tbody></table>"],
            td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
            _default: [0, "", ""]
        };
    Wt.optgroup = Wt.option, Wt.tbody = Wt.tfoot = Wt.colgroup = Wt.caption = Wt.thead, Wt.th = Wt.td, it.fn.extend({
        text: function (e) {
            return it.access(this, function (e) {
                return e === t ? it.text(this) : this.empty().append((this[0] && this[0].ownerDocument || $).createTextNode(e))
            }, null, e, arguments.length)
        },
        append: function () {
            return this.domManip(arguments, function (e) {
                if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                    var t = f(this, e);
                    t.appendChild(e)
                }
            })
        },
        prepend: function () {
            return this.domManip(arguments, function (e) {
                if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                    var t = f(this, e);
                    t.insertBefore(e, t.firstChild)
                }
            })
        },
        before: function () {
            return this.domManip(arguments, function (e) {
                this.parentNode && this.parentNode.insertBefore(e, this)
            })
        },
        after: function () {
            return this.domManip(arguments, function (e) {
                this.parentNode && this.parentNode.insertBefore(e, this.nextSibling)
            })
        },
        remove: function (e, t) {
            for (var n, r = e ? it.filter(e, this) : this, o = 0; null != (n = r[o]); o++) t || 1 !== n.nodeType || it.cleanData(m(n)), n.parentNode && (t && it.contains(n.ownerDocument, n) && d(m(n, "script")), n.parentNode.removeChild(n));
            return this
        },
        empty: function () {
            for (var e, t = 0; null != (e = this[t]); t++) 1 === e.nodeType && (it.cleanData(m(e, !1)), e.textContent = "");
            return this
        },
        clone: function (e, t) {
            return e = null == e ? !1 : e, t = null == t ? e : t, this.map(function () {
                return it.clone(this, e, t)
            })
        },
        html: function (e) {
            return it.access(this, function (e) {
                var n = this[0] || {},
                    r = 0,
                    o = this.length;
                if (e === t && 1 === n.nodeType) return n.innerHTML;
                if ("string" == typeof e && !Ft.test(e) && !Wt[(Lt.exec(e) || ["", ""])[1].toLowerCase()]) {
                    e = e.replace(Mt, "<$1></$2>");
                    try {
                        for (; o > r; r++) n = this[r] || {}, 1 === n.nodeType && (it.cleanData(m(n, !1)), n.innerHTML = e);
                        n = 0
                    } catch (i) {}
                }
                n && this.empty().append(e)
            }, null, e, arguments.length)
        },
        replaceWith: function () {
            var e = it.map(this, function (e) {
                    return [e.nextSibling, e.parentNode]
                }),
                t = 0;
            return this.domManip(arguments, function (n) {
                var r = e[t++],
                    o = e[t++];
                o && (r && r.parentNode !== o && (r = this.nextSibling), it(this).remove(), o.insertBefore(n, r))
            }, !0), t ? this : this.remove()
        },
        detach: function (e) {
            return this.remove(e, !0)
        },
        domManip: function (e, t, n) {
            e = Q.apply([], e);
            var r, o, i, a, u, s, l = 0,
                c = this.length,
                f = this,
                d = c - 1,
                g = e[0],
                v = it.isFunction(g);
            if (v || !(1 >= c || "string" != typeof g || it.support.checkClone) && It.test(g)) return this.each(function (r) {
                var o = f.eq(r);
                v && (e[0] = g.call(this, r, o.html())), o.domManip(e, t, n)
            });
            if (c && (r = it.buildFragment(e, this[0].ownerDocument, !1, !n && this), o = r.firstChild, 1 === r.childNodes.length && (r = o), o)) {
                for (i = it.map(m(r, "script"), p), a = i.length; c > l; l++) u = r, l !== d && (u = it.clone(u, !0, !0), a && it.merge(i, m(u, "script"))), t.call(this[l], u, l);
                if (a)
                    for (s = i[i.length - 1].ownerDocument, it.map(i, h), l = 0; a > l; l++) u = i[l], Ot.test(u.type || "") && !mt.access(u, "globalEval") && it.contains(s, u) && (u.src ? it._evalUrl(u.src) : it.globalEval(u.textContent.replace(Bt, "")))
            }
            return this
        }
    }), it.each({
        appendTo: "append",
        prependTo: "prepend",
        insertBefore: "before",
        insertAfter: "after",
        replaceAll: "replaceWith"
    }, function (e, t) {
        it.fn[e] = function (e) {
            for (var n, r = [], o = it(e), i = o.length - 1, a = 0; i >= a; a++) n = a === i ? this : this.clone(!0), it(o[a])[t](n), Z.apply(r, n.get());
            return this.pushStack(r)
        }
    }), it.extend({
        clone: function (e, t, n) {
            var r, o, i, a, u = e.cloneNode(!0),
                s = it.contains(e.ownerDocument, e);
            if (!(it.support.noCloneChecked || 1 !== e.nodeType && 11 !== e.nodeType || it.isXMLDoc(e)))
                for (a = m(u), i = m(e), r = 0, o = i.length; o > r; r++) v(i[r], a[r]);
            if (t)
                if (n)
                    for (i = i || m(e), a = a || m(u), r = 0, o = i.length; o > r; r++) g(i[r], a[r]);
                else g(e, u);
            return a = m(u, "script"), a.length > 0 && d(a, !s && m(e, "script")), u
        },
        buildFragment: function (e, t, n, r) {
            for (var o, i, a, u, s, l, c = 0, f = e.length, p = t.createDocumentFragment(), h = []; f > c; c++)
                if (o = e[c], o || 0 === o)
                    if ("object" === it.type(o)) it.merge(h, o.nodeType ? [o] : o);
                    else if (Pt.test(o)) {
                for (i = i || p.appendChild(t.createElement("div")), a = (Lt.exec(o) || ["", ""])[1].toLowerCase(), u = Wt[a] || Wt._default, i.innerHTML = u[1] + o.replace(Mt, "<$1></$2>") + u[2], l = u[0]; l--;) i = i.lastChild;
                it.merge(h, i.childNodes), i = p.firstChild, i.textContent = ""
            } else h.push(t.createTextNode(o));
            for (p.textContent = "", c = 0; o = h[c++];)
                if ((!r || -1 === it.inArray(o, r)) && (s = it.contains(o.ownerDocument, o), i = m(p.appendChild(o), "script"), s && d(i), n))
                    for (l = 0; o = i[l++];) Ot.test(o.type || "") && n.push(o);
            return p
        },
        cleanData: function (e) {
            for (var n, r, i, a, u, s, l = it.event.special, c = 0;
                (r = e[c]) !== t; c++) {
                if (o.accepts(r) && (u = r[mt.expando], u && (n = mt.cache[u]))) {
                    if (i = Object.keys(n.events || {}), i.length)
                        for (s = 0;
                            (a = i[s]) !== t; s++) l[a] ? it.event.remove(r, a) : it.removeEvent(r, a, n.handle);
                    mt.cache[u] && delete mt.cache[u]
                }
                delete gt.cache[r[gt.expando]]
            }
        },
        _evalUrl: function (e) {
            return it.ajax({
                url: e,
                type: "GET",
                dataType: "script",
                async: !1,
                global: !1,
                "throws": !0
            })
        }
    }), it.fn.extend({
        wrapAll: function (e) {
            var t;
            return it.isFunction(e) ? this.each(function (t) {
                it(this).wrapAll(e.call(this, t))
            }) : (this[0] && (t = it(e, this[0].ownerDocument).eq(0).clone(!0), this[0].parentNode && t.insertBefore(this[0]), t.map(function () {
                for (var e = this; e.firstElementChild;) e = e.firstElementChild;
                return e
            }).append(this)), this)
        },
        wrapInner: function (e) {
            return this.each(it.isFunction(e) ? function (t) {
                it(this).wrapInner(e.call(this, t))
            } : function () {
                var t = it(this),
                    n = t.contents();
                n.length ? n.wrapAll(e) : t.append(e)
            })
        },
        wrap: function (e) {
            var t = it.isFunction(e);
            return this.each(function (n) {
                it(this).wrapAll(t ? e.call(this, n) : e)
            })
        },
        unwrap: function () {
            return this.parent().each(function () {
                it.nodeName(this, "body") || it(this).replaceWith(this.childNodes)
            }).end()
        }
    });
    var Gt, Ht, qt = /^(none|table(?!-c[ea]).+)/,
        $t = /^margin/,
        zt = new RegExp("^(" + at + ")(.*)$", "i"),
        Xt = new RegExp("^(" + at + ")(?!px)[a-z%]+$", "i"),
        Vt = new RegExp("^([+-])=(" + at + ")", "i"),
        Yt = {
            BODY: "block"
        },
        Kt = {
            position: "absolute",
            visibility: "hidden",
            display: "block"
        },
        Jt = {
            letterSpacing: 0,
            fontWeight: 400
        },
        Qt = ["Top", "Right", "Bottom", "Left"],
        Zt = ["Webkit", "O", "Moz", "ms"];
    it.fn.extend({
        css: function (e, n) {
            return it.access(this, function (e, n, r) {
                var o, i, a = {},
                    u = 0;
                if (it.isArray(n)) {
                    for (o = _(e), i = n.length; i > u; u++) a[n[u]] = it.css(e, n[u], !1, o);
                    return a
                }
                return r !== t ? it.style(e, n, r) : it.css(e, n)
            }, e, n, arguments.length > 1)
        },
        show: function () {
            return x(this, !0)
        },
        hide: function () {
            return x(this)
        },
        toggle: function (e) {
            return "boolean" == typeof e ? e ? this.show() : this.hide() : this.each(function () {
                b(this) ? it(this).show() : it(this).hide()
            })
        }
    }), it.extend({
        cssHooks: {
            opacity: {
                get: function (e, t) {
                    if (t) {
                        var n = Gt(e, "opacity");
                        return "" === n ? "1" : n
                    }
                }
            }
        },
        cssNumber: {
            columnCount: !0,
            fillOpacity: !0,
            fontWeight: !0,
            lineHeight: !0,
            opacity: !0,
            order: !0,
            orphans: !0,
            widows: !0,
            zIndex: !0,
            zoom: !0
        },
        cssProps: {
            "float": "cssFloat"
        },
        style: function (e, n, r, o) {
            if (e && 3 !== e.nodeType && 8 !== e.nodeType && e.style) {
                var i, a, u, s = it.camelCase(n),
                    l = e.style;
                return n = it.cssProps[s] || (it.cssProps[s] = y(l, s)), u = it.cssHooks[n] || it.cssHooks[s], r === t ? u && "get" in u && (i = u.get(e, !1, o)) !== t ? i : l[n] : (a = typeof r, "string" === a && (i = Vt.exec(r)) && (r = (i[1] + 1) * i[2] + parseFloat(it.css(e, n)), a = "number"), null == r || "number" === a && isNaN(r) || ("number" !== a || it.cssNumber[s] || (r += "px"), it.support.clearCloneStyle || "" !== r || 0 !== n.indexOf("background") || (l[n] = "inherit"), u && "set" in u && (r = u.set(e, r, o)) === t || (l[n] = r)), void 0)
            }
        },
        css: function (e, n, r, o) {
            var i, a, u, s = it.camelCase(n);
            return n = it.cssProps[s] || (it.cssProps[s] = y(e.style, s)), u = it.cssHooks[n] || it.cssHooks[s], u && "get" in u && (i = u.get(e, !0, r)), i === t && (i = Gt(e, n, o)), "normal" === i && n in Jt && (i = Jt[n]), "" === r || r ? (a = parseFloat(i), r === !0 || it.isNumeric(a) ? a || 0 : i) : i
        }
    }), Gt = function (e, n, r) {
        var o, i, a, u = r || _(e),
            s = u ? u.getPropertyValue(n) || u[n] : t,
            l = e.style;
        return u && ("" !== s || it.contains(e.ownerDocument, e) || (s = it.style(e, n)), Xt.test(s) && $t.test(n) && (o = l.width, i = l.minWidth, a = l.maxWidth, l.minWidth = l.maxWidth = l.width = s, s = u.width, l.width = o, l.minWidth = i, l.maxWidth = a)), s
    }, it.each(["height", "width"], function (e, t) {
        it.cssHooks[t] = {
            get: function (e, n, r) {
                return n ? 0 === e.offsetWidth && qt.test(it.css(e, "display")) ? it.swap(e, Kt, function () {
                    return E(e, t, r)
                }) : E(e, t, r) : void 0
            },
            set: function (e, n, r) {
                var o = r && _(e);
                return T(e, n, r ? w(e, t, r, it.support.boxSizing && "border-box" === it.css(e, "boxSizing", !1, o), o) : 0)
            }
        }
    }), it(function () {
        it.support.reliableMarginRight || (it.cssHooks.marginRight = {
            get: function (e, t) {
                return t ? it.swap(e, {
                    display: "inline-block"
                }, Gt, [e, "marginRight"]) : void 0
            }
        }), !it.support.pixelPosition && it.fn.position && it.each(["top", "left"], function (e, t) {
            it.cssHooks[t] = {
                get: function (e, n) {
                    return n ? (n = Gt(e, t), Xt.test(n) ? it(e).position()[t] + "px" : n) : void 0
                }
            }
        })
    }), it.expr && it.expr.filters && (it.expr.filters.hidden = function (e) {
        return e.offsetWidth <= 0 && e.offsetHeight <= 0
    }, it.expr.filters.visible = function (e) {
        return !it.expr.filters.hidden(e)
    }), it.each({
        margin: "",
        padding: "",
        border: "Width"
    }, function (e, t) {
        it.cssHooks[e + t] = {
            expand: function (n) {
                for (var r = 0, o = {}, i = "string" == typeof n ? n.split(" ") : [n]; 4 > r; r++) o[e + Qt[r] + t] = i[r] || i[r - 2] || i[0];
                return o
            }
        }, $t.test(e) || (it.cssHooks[e + t].set = T)
    });
    var en = /%20/g,
        tn = /\[\]$/,
        nn = /\r?\n/g,
        rn = /^(?:submit|button|image|reset|file)$/i,
        on = /^(?:input|select|textarea|keygen)/i;
    it.fn.extend({
        serialize: function () {
            return it.param(this.serializeArray())
        },
        serializeArray: function () {
            return this.map(function () {
                var e = it.prop(this, "elements");
                return e ? it.makeArray(e) : this
            }).filter(function () {
                var e = this.type;
                return this.name && !it(this).is(":disabled") && on.test(this.nodeName) && !rn.test(e) && (this.checked || !jt.test(e))
            }).map(function (e, t) {
                var n = it(this).val();
                return null == n ? null : it.isArray(n) ? it.map(n, function (e) {
                    return {
                        name: t.name,
                        value: e.replace(nn, "\r\n")
                    }
                }) : {
                    name: t.name,
                    value: n.replace(nn, "\r\n")
                }
            }).get()
        }
    }), it.param = function (e, n) {
        var r, o = [],
            i = function (e, t) {
                t = it.isFunction(t) ? t() : null == t ? "" : t, o[o.length] = encodeURIComponent(e) + "=" + encodeURIComponent(t)
            };
        if (n === t && (n = it.ajaxSettings && it.ajaxSettings.traditional), it.isArray(e) || e.jquery && !it.isPlainObject(e)) it.each(e, function () {
            i(this.name, this.value)
        });
        else
            for (r in e) k(r, e[r], n, i);
        return o.join("&").replace(en, "+")
    }, it.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "), function (e, t) {
        it.fn[t] = function (e, n) {
            return arguments.length > 0 ? this.on(t, null, e, n) : this.trigger(t)
        }
    }), it.fn.extend({
        hover: function (e, t) {
            return this.mouseenter(e).mouseleave(t || e)
        },
        bind: function (e, t, n) {
            return this.on(e, null, t, n)
        },
        unbind: function (e, t) {
            return this.off(e, null, t)
        },
        delegate: function (e, t, n, r) {
            return this.on(t, e, n, r)
        },
        undelegate: function (e, t, n) {
            return 1 === arguments.length ? this.off(e, "**") : this.off(t, e || "**", n)
        }
    });
    var an, un, sn = it.now(),
        ln = /\?/,
        cn = /#.*$/,
        fn = /([?&])_=[^&]*/,
        pn = /^(.*?):[ \t]*([^\r\n]*)$/gm,
        hn = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
        dn = /^(?:GET|HEAD)$/,
        gn = /^\/\//,
        mn = /^([\w.+-]+:)(?:\/\/([^\/?#:]*)(?::(\d+)|)|)/,
        vn = it.fn.load,
        yn = {},
        bn = {},
        _n = "*/".concat("*");
    try {
        un = q.href
    } catch (xn) {
        un = $.createElement("a"), un.href = "", un = un.href
    }
    an = mn.exec(un.toLowerCase()) || [], it.fn.load = function (e, n, r) {
        if ("string" != typeof e && vn) return vn.apply(this, arguments);
        var o, i, a, u = this,
            s = e.indexOf(" ");
        return s >= 0 && (o = e.slice(s), e = e.slice(0, s)), it.isFunction(n) ? (r = n, n = t) : n && "object" == typeof n && (i = "POST"), u.length > 0 && it.ajax({
            url: e,
            type: i,
            dataType: "html",
            data: n
        }).done(function (e) {
            a = arguments, u.html(o ? it("<div>").append(it.parseHTML(e)).find(o) : e)
        }).complete(r && function (e, t) {
            u.each(r, a || [e.responseText, t, e])
        }), this
    }, it.each(["ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend"], function (e, t) {
        it.fn[t] = function (e) {
            return this.on(t, e)
        }
    }), it.extend({
        active: 0,
        lastModified: {},
        etag: {},
        ajaxSettings: {
            url: un,
            type: "GET",
            isLocal: hn.test(an[1]),
            global: !0,
            processData: !0,
            async: !0,
            contentType: "application/x-www-form-urlencoded; charset=UTF-8",
            accepts: {
                "*": _n,
                text: "text/plain",
                html: "text/html",
                xml: "application/xml, text/xml",
                json: "application/json, text/javascript"
            },
            contents: {
                xml: /xml/,
                html: /html/,
                json: /json/
            },
            responseFields: {
                xml: "responseXML",
                text: "responseText",
                json: "responseJSON"
            },
            converters: {
                "* text": String,
                "text html": !0,
                "text json": it.parseJSON,
                "text xml": it.parseXML
            },
            flatOptions: {
                url: !0,
                context: !0
            }
        },
        ajaxSetup: function (e, t) {
            return t ? N(N(e, it.ajaxSettings), t) : N(it.ajaxSettings, e)
        },
        ajaxPrefilter: R(yn),
        ajaxTransport: R(bn),
        ajax: function (e, n) {
            function r(e, n, r, u) {
                var l, f, y, b, x, w = n;
                2 !== _ && (_ = 2, s && clearTimeout(s), o = t, a = u || "", T.readyState = e > 0 ? 4 : 0, l = e >= 200 && 300 > e || 304 === e, r && (b = D(p, T, r)), b = M(p, b, T, l), l ? (p.ifModified && (x = T.getResponseHeader("Last-Modified"), x && (it.lastModified[i] = x), x = T.getResponseHeader("etag"), x && (it.etag[i] = x)), 204 === e || "HEAD" === p.type ? w = "nocontent" : 304 === e ? w = "notmodified" : (w = b.state, f = b.data, y = b.error, l = !y)) : (y = w, (e || !w) && (w = "error", 0 > e && (e = 0))), T.status = e, T.statusText = (n || w) + "", l ? g.resolveWith(h, [f, w, T]) : g.rejectWith(h, [T, w, y]), T.statusCode(v), v = t, c && d.trigger(l ? "ajaxSuccess" : "ajaxError", [T, p, l ? f : y]), m.fireWith(h, [T, w]), c && (d.trigger("ajaxComplete", [T, p]), --it.active || it.event.trigger("ajaxStop")))
            }

            "object" == typeof e && (n = e, e = t), n = n || {};
            var o, i, a, u, s, l, c, f, p = it.ajaxSetup({}, n),
                h = p.context || p,
                d = p.context && (h.nodeType || h.jquery) ? it(h) : it.event,
                g = it.Deferred(),
                m = it.Callbacks("once memory"),
                v = p.statusCode || {},
                y = {},
                b = {},
                _ = 0,
                x = "canceled",
                T = {
                    readyState: 0,
                    getResponseHeader: function (e) {
                        var t;
                        if (2 === _) {
                            if (!u)
                                for (u = {}; t = pn.exec(a);) u[t[1].toLowerCase()] = t[2];
                            t = u[e.toLowerCase()]
                        }
                        return null == t ? null : t
                    },
                    getAllResponseHeaders: function () {
                        return 2 === _ ? a : null
                    },
                    setRequestHeader: function (e, t) {
                        var n = e.toLowerCase();
                        return _ || (e = b[n] = b[n] || e, y[e] = t), this
                    },
                    overrideMimeType: function (e) {
                        return _ || (p.mimeType = e), this
                    },
                    statusCode: function (e) {
                        var t;
                        if (e)
                            if (2 > _)
                                for (t in e) v[t] = [v[t], e[t]];
                            else T.always(e[T.status]);
                        return this
                    },
                    abort: function (e) {
                        var t = e || x;
                        return o && o.abort(t), r(0, t), this
                    }
                };
            if (g.promise(T).complete = m.add, T.success = T.done, T.error = T.fail, p.url = ((e || p.url || un) + "").replace(cn, "").replace(gn, an[1] + "//"), p.type = n.method || n.type || p.method || p.type, p.dataTypes = it.trim(p.dataType || "*").toLowerCase().match(ut) || [""], null == p.crossDomain && (l = mn.exec(p.url.toLowerCase()), p.crossDomain = !(!l || l[1] === an[1] && l[2] === an[2] && (l[3] || ("http:" === l[1] ? "80" : "443")) === (an[3] || ("http:" === an[1] ? "80" : "443")))), p.data && p.processData && "string" != typeof p.data && (p.data = it.param(p.data, p.traditional)), S(yn, p, n, T), 2 === _) return T;
            c = p.global, c && 0 === it.active++ && it.event.trigger("ajaxStart"), p.type = p.type.toUpperCase(), p.hasContent = !dn.test(p.type), i = p.url, p.hasContent || (p.data && (i = p.url += (ln.test(i) ? "&" : "?") + p.data, delete p.data), p.cache === !1 && (p.url = fn.test(i) ? i.replace(fn, "$1_=" + sn++) : i + (ln.test(i) ? "&" : "?") + "_=" + sn++)), p.ifModified && (it.lastModified[i] && T.setRequestHeader("If-Modified-Since", it.lastModified[i]), it.etag[i] && T.setRequestHeader("If-None-Match", it.etag[i])), (p.data && p.hasContent && p.contentType !== !1 || n.contentType) && T.setRequestHeader("Content-Type", p.contentType), T.setRequestHeader("Accept", p.dataTypes[0] && p.accepts[p.dataTypes[0]] ? p.accepts[p.dataTypes[0]] + ("*" !== p.dataTypes[0] ? ", " + _n + "; q=0.01" : "") : p.accepts["*"]);
            for (f in p.headers) T.setRequestHeader(f, p.headers[f]);
            if (p.beforeSend && (p.beforeSend.call(h, T, p) === !1 || 2 === _)) return T.abort();
            x = "abort";
            for (f in {
                success: 1,
                error: 1,
                complete: 1
            }) T[f](p[f]);
            if (o = S(bn, p, n, T)) {
                T.readyState = 1, c && d.trigger("ajaxSend", [T, p]), p.async && p.timeout > 0 && (s = setTimeout(function () {
                    T.abort("timeout")
                }, p.timeout));
                try {
                    _ = 1, o.send(y, r)
                } catch (w) {
                    if (!(2 > _)) throw w;
                    r(-1, w)
                }
            } else r(-1, "No Transport");
            return T
        },
        getJSON: function (e, t, n) {
            return it.get(e, t, n, "json")
        },
        getScript: function (e, n) {
            return it.get(e, t, n, "script")
        }
    }), it.each(["get", "post"], function (e, n) {
        it[n] = function (e, r, o, i) {
            return it.isFunction(r) && (i = i || o, o = r, r = t), it.ajax({
                url: e,
                type: n,
                dataType: i,
                data: r,
                success: o
            })
        }
    }), it.ajaxSetup({
        accepts: {
            script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
        },
        contents: {
            script: /(?:java|ecma)script/
        },
        converters: {
            "text script": function (e) {
                return it.globalEval(e), e
            }
        }
    }), it.ajaxPrefilter("script", function (e) {
        e.cache === t && (e.cache = !1), e.crossDomain && (e.type = "GET")
    }), it.ajaxTransport("script", function (e) {
        if (e.crossDomain) {
            var t, n;
            return {
                send: function (r, o) {
                    t = it("<script>").prop({
                        async: !0,
                        charset: e.scriptCharset,
                        src: e.url
                    }).on("load error", n = function (e) {
                        t.remove(), n = null, e && o("error" === e.type ? 404 : 200, e.type)
                    }), $.head.appendChild(t[0])
                },
                abort: function () {
                    n && n()
                }
            }
        }
    });
    var Tn = [],
        wn = /(=)\?(?=&|$)|\?\?/;
    it.ajaxSetup({
        jsonp: "callback",
        jsonpCallback: function () {
            var e = Tn.pop() || it.expando + "_" + sn++;
            return this[e] = !0, e
        }
    }), it.ajaxPrefilter("json jsonp", function (n, r, o) {
        var i, a, u, s = n.jsonp !== !1 && (wn.test(n.url) ? "url" : "string" == typeof n.data && !(n.contentType || "").indexOf("application/x-www-form-urlencoded") && wn.test(n.data) && "data");
        return s || "jsonp" === n.dataTypes[0] ? (i = n.jsonpCallback = it.isFunction(n.jsonpCallback) ? n.jsonpCallback() : n.jsonpCallback, s ? n[s] = n[s].replace(wn, "$1" + i) : n.jsonp !== !1 && (n.url += (ln.test(n.url) ? "&" : "?") + n.jsonp + "=" + i), n.converters["script json"] = function () {
            return u || it.error(i + " was not called"), u[0]
        }, n.dataTypes[0] = "json", a = e[i], e[i] = function () {
            u = arguments
        }, o.always(function () {
            e[i] = a, n[i] && (n.jsonpCallback = r.jsonpCallback, Tn.push(i)), u && it.isFunction(a) && a(u[0]), u = a = t
        }), "script") : void 0
    }), it.ajaxSettings.xhr = function () {
        try {
            return new XMLHttpRequest
        } catch (e) {}
    };
    var En = it.ajaxSettings.xhr(),
        An = {
            0: 200,
            1223: 204
        },
        Cn = 0,
        kn = {};
    e.ActiveXObject && it(e).on("unload", function () {
        for (var e in kn) kn[e]();
        kn = t
    }), it.support.cors = !!En && "withCredentials" in En, it.support.ajax = En = !!En, it.ajaxTransport(function (e) {
        var n;
        return it.support.cors || En && !e.crossDomain ? {
            send: function (r, o) {
                var i, a, u = e.xhr();
                if (u.open(e.type, e.url, e.async, e.username, e.password), e.xhrFields)
                    for (i in e.xhrFields) u[i] = e.xhrFields[i];
                e.mimeType && u.overrideMimeType && u.overrideMimeType(e.mimeType), e.crossDomain || r["X-Requested-With"] || (r["X-Requested-With"] = "XMLHttpRequest");
                for (i in r) u.setRequestHeader(i, r[i]);
                n = function (e) {
                    return function () {
                        n && (delete kn[a], n = u.onload = u.onerror = null, "abort" === e ? u.abort() : "error" === e ? o(u.status || 404, u.statusText) : o(An[u.status] || u.status, u.statusText, "string" == typeof u.responseText ? {
                            text: u.responseText
                        } : t, u.getAllResponseHeaders()))
                    }
                }, u.onload = n(), u.onerror = n("error"), n = kn[a = Cn++] = n("abort"), u.send(e.hasContent && e.data || null)
            },
            abort: function () {
                n && n()
            }
        } : void 0
    });
    var Rn, Sn, Nn = /^(?:toggle|show|hide)$/,
        Dn = new RegExp("^(?:([+-])=|)(" + at + ")([a-z%]*)$", "i"),
        Mn = /queueHooks$/,
        Ln = [I],
        Pn = {
            "*": [

                function (e, t) {
                    var n = this.createTween(e, t),
                        r = n.cur(),
                        o = Dn.exec(t),
                        i = o && o[3] || (it.cssNumber[e] ? "" : "px"),
                        a = (it.cssNumber[e] || "px" !== i && +r) && Dn.exec(it.css(n.elem, e)),
                        u = 1,
                        s = 20;
                    if (a && a[3] !== i) {
                        i = i || a[3], o = o || [], a = +r || 1;
                        do u = u || ".5", a /= u, it.style(n.elem, e, a + i); while (u !== (u = n.cur() / r) && 1 !== u && --s)
                    }
                    return o && (a = n.start = +a || +r || 0, n.unit = i, n.end = o[1] ? a + (o[1] + 1) * o[2] : +o[2]), n
                }]
        };
    it.Animation = it.extend(F, {
        tweener: function (e, t) {
            it.isFunction(e) ? (t = e, e = ["*"]) : e = e.split(" ");
            for (var n, r = 0, o = e.length; o > r; r++) n = e[r], Pn[n] = Pn[n] || [], Pn[n].unshift(t)
        },
        prefilter: function (e, t) {
            t ? Ln.unshift(e) : Ln.push(e)
        }
    }), it.Tween = O, O.prototype = {
        constructor: O,
        init: function (e, t, n, r, o, i) {
            this.elem = e, this.prop = n, this.easing = o || "swing", this.options = t, this.start = this.now = this.cur(), this.end = r, this.unit = i || (it.cssNumber[n] ? "" : "px")
        },
        cur: function () {
            var e = O.propHooks[this.prop];
            return e && e.get ? e.get(this) : O.propHooks._default.get(this)
        },
        run: function (e) {
            var t, n = O.propHooks[this.prop];
            return this.pos = t = this.options.duration ? it.easing[this.easing](e, this.options.duration * e, 0, 1, this.options.duration) : e, this.now = (this.end - this.start) * t + this.start, this.options.step && this.options.step.call(this.elem, this.now, this), n && n.set ? n.set(this) : O.propHooks._default.set(this), this
        }
    }, O.prototype.init.prototype = O.prototype, O.propHooks = {
        _default: {
            get: function (e) {
                var t;
                return null == e.elem[e.prop] || e.elem.style && null != e.elem.style[e.prop] ? (t = it.css(e.elem, e.prop, ""), t && "auto" !== t ? t : 0) : e.elem[e.prop]
            },
            set: function (e) {
                it.fx.step[e.prop] ? it.fx.step[e.prop](e) : e.elem.style && (null != e.elem.style[it.cssProps[e.prop]] || it.cssHooks[e.prop]) ? it.style(e.elem, e.prop, e.now + e.unit) : e.elem[e.prop] = e.now
            }
        }
    }, O.propHooks.scrollTop = O.propHooks.scrollLeft = {
        set: function (e) {
            e.elem.nodeType && e.elem.parentNode && (e.elem[e.prop] = e.now)
        }
    }, it.each(["toggle", "show", "hide"], function (e, t) {
        var n = it.fn[t];
        it.fn[t] = function (e, r, o) {
            return null == e || "boolean" == typeof e ? n.apply(this, arguments) : this.animate(U(t, !0), e, r, o)
        }
    }), it.fn.extend({
        fadeTo: function (e, t, n, r) {
            return this.filter(b).css("opacity", 0).show().end().animate({
                opacity: t
            }, e, n, r)
        },
        animate: function (e, t, n, r) {
            var o = it.isEmptyObject(e),
                i = it.speed(t, n, r),
                a = function () {
                    var t = F(this, it.extend({}, e), i);
                    (o || mt.get(this, "finish")) && t.stop(!0)
                };
            return a.finish = a, o || i.queue === !1 ? this.each(a) : this.queue(i.queue, a)
        },
        stop: function (e, n, r) {
            var o = function (e) {
                var t = e.stop;
                delete e.stop, t(r)
            };
            return "string" != typeof e && (r = n, n = e, e = t), n && e !== !1 && this.queue(e || "fx", []), this.each(function () {
                var t = !0,
                    n = null != e && e + "queueHooks",
                    i = it.timers,
                    a = mt.get(this);
                if (n) a[n] && a[n].stop && o(a[n]);
                else
                    for (n in a) a[n] && a[n].stop && Mn.test(n) && o(a[n]);
                for (n = i.length; n--;) i[n].elem !== this || null != e && i[n].queue !== e || (i[n].anim.stop(r), t = !1, i.splice(n, 1));
                (t || !r) && it.dequeue(this, e)
            })
        },
        finish: function (e) {
            return e !== !1 && (e = e || "fx"), this.each(function () {
                var t, n = mt.get(this),
                    r = n[e + "queue"],
                    o = n[e + "queueHooks"],
                    i = it.timers,
                    a = r ? r.length : 0;
                for (n.finish = !0, it.queue(this, e, []), o && o.stop && o.stop.call(this, !0), t = i.length; t--;) i[t].elem === this && i[t].queue === e && (i[t].anim.stop(!0), i.splice(t, 1));
                for (t = 0; a > t; t++) r[t] && r[t].finish && r[t].finish.call(this);
                delete n.finish
            })
        }
    }), it.each({
        slideDown: U("show"),
        slideUp: U("hide"),
        slideToggle: U("toggle"),
        fadeIn: {
            opacity: "show"
        },
        fadeOut: {
            opacity: "hide"
        },
        fadeToggle: {
            opacity: "toggle"
        }
    }, function (e, t) {
        it.fn[e] = function (e, n, r) {
            return this.animate(t, e, n, r)
        }
    }), it.speed = function (e, t, n) {
        var r = e && "object" == typeof e ? it.extend({}, e) : {
            complete: n || !n && t || it.isFunction(e) && e,
            duration: e,
            easing: n && t || t && !it.isFunction(t) && t
        };
        return r.duration = it.fx.off ? 0 : "number" == typeof r.duration ? r.duration : r.duration in it.fx.speeds ? it.fx.speeds[r.duration] : it.fx.speeds._default, (null == r.queue || r.queue === !0) && (r.queue = "fx"), r.old = r.complete, r.complete = function () {
            it.isFunction(r.old) && r.old.call(this), r.queue && it.dequeue(this, r.queue)
        }, r
    }, it.easing = {
        linear: function (e) {
            return e
        },
        swing: function (e) {
            return .5 - Math.cos(e * Math.PI) / 2
        }
    }, it.timers = [], it.fx = O.prototype.init, it.fx.tick = function () {
        var e, n = it.timers,
            r = 0;
        for (Rn = it.now(); r < n.length; r++) e = n[r], e() || n[r] !== e || n.splice(r--, 1);
        n.length || it.fx.stop(), Rn = t
    }, it.fx.timer = function (e) {
        e() && it.timers.push(e) && it.fx.start()
    }, it.fx.interval = 13, it.fx.start = function () {
        Sn || (Sn = setInterval(it.fx.tick, it.fx.interval))
    }, it.fx.stop = function () {
        clearInterval(Sn), Sn = null
    }, it.fx.speeds = {
        slow: 600,
        fast: 200,
        _default: 400
    }, it.fx.step = {}, it.expr && it.expr.filters && (it.expr.filters.animated = function (e) {
        return it.grep(it.timers, function (t) {
            return e === t.elem
        }).length
    }), it.fn.offset = function (e) {
        if (arguments.length) return e === t ? this : this.each(function (t) {
            it.offset.setOffset(this, e, t)
        });
        var n, r, o = this[0],
            i = {
                top: 0,
                left: 0
            },
            a = o && o.ownerDocument;
        if (a) return n = a.documentElement, it.contains(n, o) ? (typeof o.getBoundingClientRect !== H && (i = o.getBoundingClientRect()), r = B(a), {
            top: i.top + r.pageYOffset - n.clientTop,
            left: i.left + r.pageXOffset - n.clientLeft
        }) : i
    }, it.offset = {
        setOffset: function (e, t, n) {
            var r, o, i, a, u, s, l, c = it.css(e, "position"),
                f = it(e),
                p = {};
            "static" === c && (e.style.position = "relative"), u = f.offset(), i = it.css(e, "top"), s = it.css(e, "left"), l = ("absolute" === c || "fixed" === c) && (i + s).indexOf("auto") > -1, l ? (r = f.position(), a = r.top, o = r.left) : (a = parseFloat(i) || 0, o = parseFloat(s) || 0), it.isFunction(t) && (t = t.call(e, n, u)), null != t.top && (p.top = t.top - u.top + a), null != t.left && (p.left = t.left - u.left + o), "using" in t ? t.using.call(e, p) : f.css(p)
        }
    }, it.fn.extend({
        position: function () {
            if (this[0]) {
                var e, t, n = this[0],
                    r = {
                        top: 0,
                        left: 0
                    };
                return "fixed" === it.css(n, "position") ? t = n.getBoundingClientRect() : (e = this.offsetParent(), t = this.offset(), it.nodeName(e[0], "html") || (r = e.offset()), r.top += it.css(e[0], "borderTopWidth", !0), r.left += it.css(e[0], "borderLeftWidth", !0)), {
                    top: t.top - r.top - it.css(n, "marginTop", !0),
                    left: t.left - r.left - it.css(n, "marginLeft", !0)
                }
            }
        },
        offsetParent: function () {
            return this.map(function () {
                for (var e = this.offsetParent || z; e && !it.nodeName(e, "html") && "static" === it.css(e, "position");) e = e.offsetParent;

                return e || z
            })
        }
    }), it.each({
        scrollLeft: "pageXOffset",
        scrollTop: "pageYOffset"
    }, function (n, r) {
        var o = "pageYOffset" === r;
        it.fn[n] = function (i) {
            return it.access(this, function (n, i, a) {
                var u = B(n);
                return a === t ? u ? u[r] : n[i] : void(u ? u.scrollTo(o ? e.pageXOffset : a, o ? a : e.pageYOffset) : n[i] = a)
            }, n, i, arguments.length, null)
        }
    }), it.each({
        Height: "height",
        Width: "width"
    }, function (e, n) {
        it.each({
            padding: "inner" + e,
            content: n,
            "": "outer" + e
        }, function (r, o) {
            it.fn[o] = function (o, i) {
                var a = arguments.length && (r || "boolean" != typeof o),
                    u = r || (o === !0 || i === !0 ? "margin" : "border");
                return it.access(this, function (n, r, o) {
                    var i;
                    return it.isWindow(n) ? n.document.documentElement["client" + e] : 9 === n.nodeType ? (i = n.documentElement, Math.max(n.body["scroll" + e], i["scroll" + e], n.body["offset" + e], i["offset" + e], i["client" + e])) : o === t ? it.css(n, r, u) : it.style(n, r, o, u)
                }, n, a ? o : t, a, null)
            }
        })
    }), it.fn.size = function () {
        return this.length
    }, it.fn.andSelf = it.fn.addBack, "object" == typeof module && module && "object" == typeof module.exports ? module.exports = it : "function" == typeof define && define.amd && define("jquery", [], function () {
        return it
    }), "object" == typeof e && "object" == typeof e.document && (e.jQuery = e.$ = it)
}(window),
function () {
    function e(e, t, n) {
        for (var r = (n || 0) - 1, o = e ? e.length : 0; ++r < o;)
            if (e[r] === t) return r;
        return -1
    }

    function t(t, n) {
        var r = typeof n;
        if (t = t.cache, "boolean" == r || null == n) return t[n] ? 0 : -1;
        "number" != r && "string" != r && (r = "object");
        var o = "number" == r ? n : v + n;
        return t = (t = t[r]) && t[o], "object" == r ? t && e(t, n) > -1 ? 0 : -1 : t ? 0 : -1
    }

    function n(e) {
        var t = this.cache,
            n = typeof e;
        if ("boolean" == n || null == e) t[e] = !0;
        else {
            "number" != n && "string" != n && (n = "object");
            var r = "number" == n ? e : v + e,
                o = t[n] || (t[n] = {});
            "object" == n ? (o[r] || (o[r] = [])).push(e) : o[r] = !0
        }
    }

    function r(e) {
        return e.charCodeAt(0)
    }

    function o(e, t) {
        for (var n = e.criteria, r = t.criteria, o = -1, i = n.length; ++o < i;) {
            var a = n[o],
                u = r[o];
            if (a !== u) {
                if (a > u || "undefined" == typeof a) return 1;
                if (u > a || "undefined" == typeof u) return -1
            }
        }
        return e.index - t.index
    }

    function i(e) {
        var t = -1,
            r = e.length,
            o = e[0],
            i = e[r / 2 | 0],
            a = e[r - 1];
        if (o && "object" == typeof o && i && "object" == typeof i && a && "object" == typeof a) return !1;
        var u = s();
        u["false"] = u["null"] = u["true"] = u.undefined = !1;
        var l = s();
        for (l.array = e, l.cache = u, l.push = n; ++t < r;) l.push(e[t]);
        return l
    }

    function a(e) {
        return "\\" + X[e]
    }

    function u() {
        return d.pop() || []
    }

    function s() {
        return g.pop() || {
            array: null,
            cache: null,
            criteria: null,
            "false": !1,
            index: 0,
            "null": !1,
            number: null,
            object: null,
            push: null,
            string: null,
            "true": !1,
            undefined: !1,
            value: null
        }
    }

    function l(e) {
        e.length = 0, d.length < b && d.push(e)
    }

    function c(e) {
        var t = e.cache;
        t && c(t), e.array = e.cache = e.criteria = e.object = e.number = e.string = e.value = null, g.length < b && g.push(e)
    }

    function f(e, t, n) {
        t || (t = 0), "undefined" == typeof n && (n = e ? e.length : 0);
        for (var r = -1, o = n - t || 0, i = Array(0 > o ? 0 : o); ++r < o;) i[r] = e[t + r];
        return i
    }

    function p(n) {
        function d(e) {
            return e && "object" == typeof e && !Qr(e) && Pr.call(e, "__wrapped__") ? e : new g(e)
        }

        function g(e, t) {
            this.__chain__ = !!t, this.__wrapped__ = e
        }

        function b(e) {
            function t() {
                if (r) {
                    var e = f(r);
                    Fr.apply(e, arguments)
                }
                if (this instanceof t) {
                    var i = Y(n.prototype),
                        a = n.apply(i, e || arguments);
                    return Nt(a) ? a : i
                }
                return n.apply(o, e || arguments)
            }

            var n = e[0],
                r = e[2],
                o = e[4];
            return Jr(t, e), t
        }

        function X(e, t, n, r, o) {
            if (n) {
                var i = n(e);
                if ("undefined" != typeof i) return i
            }
            var a = Nt(e);
            if (!a) return e;
            var s = kr.call(e);
            if (!H[s]) return e;
            var c = Yr[s];
            switch (s) {
            case j:
            case I:
                return new c(+e);
            case U:
            case G:
                return new c(e);
            case W:
                return i = c(e.source, A.exec(e)), i.lastIndex = e.lastIndex, i
            }
            var p = Qr(e);
            if (t) {
                var h = !r;
                r || (r = u()), o || (o = u());
                for (var d = r.length; d--;)
                    if (r[d] == e) return o[d];
                i = p ? c(e.length) : {}
            } else i = p ? f(e) : io({}, e);
            return p && (Pr.call(e, "index") && (i.index = e.index), Pr.call(e, "input") && (i.input = e.input)), t ? (r.push(e), o.push(i), (p ? Kt : so)(e, function (e, a) {
                i[a] = X(e, t, n, r, o)
            }), h && (l(r), l(o)), i) : i
        }

        function Y(e) {
            return Nt(e) ? Br(e) : {}
        }

        function K(e, t, n) {
            if ("function" != typeof e) return Qn;
            if ("undefined" == typeof t || !("prototype" in e)) return e;
            var r = e.__bindData__;
            if ("undefined" == typeof r && (Kr.funcNames && (r = !e.name), r = r || !Kr.funcDecomp, !r)) {
                var o = Mr.call(e);
                Kr.funcNames || (r = !C.test(o)), r || (r = N.test(o), Jr(e, r))
            }
            if (r === !1 || r !== !0 && 1 & r[1]) return e;
            switch (n) {
            case 1:
                return function (n) {
                    return e.call(t, n)
                };
            case 2:
                return function (n, r) {
                    return e.call(t, n, r)
                };
            case 3:
                return function (n, r, o) {
                    return e.call(t, n, r, o)
                };
            case 4:
                return function (n, r, o, i) {
                    return e.call(t, n, r, o, i)
                }
            }
            return Fn(e, t)
        }

        function J(e) {
            function t() {
                var e = s ? a : this;
                if (o) {
                    var d = f(o);
                    Fr.apply(d, arguments)
                }
                if ((i || c) && (d || (d = f(arguments)), i && Fr.apply(d, i), c && d.length < u)) return r |= 16, J([n, p ? r : -4 & r, d, null, a, u]);
                if (d || (d = arguments), l && (n = e[h]), this instanceof t) {
                    e = Y(n.prototype);
                    var g = n.apply(e, d);
                    return Nt(g) ? g : e
                }
                return n.apply(e, d)
            }

            var n = e[0],
                r = e[1],
                o = e[2],
                i = e[3],
                a = e[4],
                u = e[5],
                s = 1 & r,
                l = 2 & r,
                c = 4 & r,
                p = 8 & r,
                h = n;
            return Jr(t, e), t
        }

        function Q(n, r) {
            var o = -1,
                a = st(),
                u = n ? n.length : 0,
                s = u >= y && a === e,
                l = [];
            if (s) {
                var f = i(r);
                f ? (a = t, r = f) : s = !1
            }
            for (; ++o < u;) {
                var p = n[o];
                a(r, p) < 0 && l.push(p)
            }
            return s && c(r), l
        }

        function et(e, t, n, r) {
            for (var o = (r || 0) - 1, i = e ? e.length : 0, a = []; ++o < i;) {
                var u = e[o];
                if (u && "object" == typeof u && "number" == typeof u.length && (Qr(u) || pt(u))) {
                    t || (u = et(u, t, n));
                    var s = -1,
                        l = u.length,
                        c = a.length;
                    for (a.length += l; ++s < l;) a[c++] = u[s]
                } else n || a.push(u)
            }
            return a
        }

        function tt(e, t, n, r, o, i) {
            if (n) {
                var a = n(e, t);
                if ("undefined" != typeof a) return !!a
            }
            if (e === t) return 0 !== e || 1 / e == 1 / t;
            var s = typeof e,
                c = typeof t;
            if (!(e !== e || e && z[s] || t && z[c])) return !1;
            if (null == e || null == t) return e === t;
            var f = kr.call(e),
                p = kr.call(t);
            if (f == P && (f = B), p == P && (p = B), f != p) return !1;
            switch (f) {
            case j:
            case I:
                return +e == +t;
            case U:
                return e != +e ? t != +t : 0 == e ? 1 / e == 1 / t : e == +t;
            case W:
            case G:
                return e == Tr(t)
            }
            var h = f == F;
            if (!h) {
                var d = Pr.call(e, "__wrapped__"),
                    g = Pr.call(t, "__wrapped__");
                if (d || g) return tt(d ? e.__wrapped__ : e, g ? t.__wrapped__ : t, n, r, o, i);
                if (f != B) return !1;
                var m = e.constructor,
                    v = t.constructor;
                if (m != v && !(St(m) && m instanceof m && St(v) && v instanceof v) && "constructor" in e && "constructor" in t) return !1
            }
            var y = !o;
            o || (o = u()), i || (i = u());
            for (var b = o.length; b--;)
                if (o[b] == e) return i[b] == t;
            var _ = 0;
            if (a = !0, o.push(e), i.push(t), h) {
                if (b = e.length, _ = t.length, a = _ == b, a || r)
                    for (; _--;) {
                        var x = b,
                            T = t[_];
                        if (r)
                            for (; x-- && !(a = tt(e[x], T, n, r, o, i)););
                        else if (!(a = tt(e[_], T, n, r, o, i))) break
                    }
            } else uo(t, function (t, u, s) {
                return Pr.call(s, u) ? (_++, a = Pr.call(e, u) && tt(e[u], t, n, r, o, i)) : void 0
            }), a && !r && uo(e, function (e, t, n) {
                return Pr.call(n, t) ? a = --_ > -1 : void 0
            });
            return o.pop(), i.pop(), y && (l(o), l(i)), a
        }

        function nt(e, t, n, r, o) {
            (Qr(t) ? Kt : so)(t, function (t, i) {
                var a, u, s = t,
                    l = e[i];
                if (t && ((u = Qr(t)) || lo(t))) {
                    for (var c = r.length; c--;)
                        if (a = r[c] == t) {
                            l = o[c];
                            break
                        }
                    if (!a) {
                        var f;
                        n && (s = n(l, t), (f = "undefined" != typeof s) && (l = s)), f || (l = u ? Qr(l) ? l : [] : lo(l) ? l : {}), r.push(t), o.push(l), f || nt(l, t, n, r, o)
                    }
                } else n && (s = n(l, t), "undefined" == typeof s && (s = t)), "undefined" != typeof s && (l = s);
                e[i] = l
            })
        }

        function rt(e, t) {
            return e + Dr(Vr() * (t - e + 1))
        }

        function ot(n, r, o) {
            var a = -1,
                s = st(),
                f = n ? n.length : 0,
                p = [],
                h = !r && f >= y && s === e,
                d = o || h ? u() : p;
            if (h) {
                var g = i(d);
                s = t, d = g
            }
            for (; ++a < f;) {
                var m = n[a],
                    v = o ? o(m, a, n) : m;
                (r ? !a || d[d.length - 1] !== v : s(d, v) < 0) && ((o || h) && d.push(v), p.push(m))
            }
            return h ? (l(d.array), c(d)) : o && l(d), p
        }

        function it(e) {
            return function (t, n, r) {
                var o = {};
                n = d.createCallback(n, r, 3);
                var i = -1,
                    a = t ? t.length : 0;
                if ("number" == typeof a)
                    for (; ++i < a;) {
                        var u = t[i];
                        e(o, u, n(u, i, t), t)
                    } else so(t, function (t, r, i) {
                        e(o, t, n(t, r, i), i)
                    });
                return o
            }
        }

        function at(e, t, n, r, o, i) {
            var a = 1 & t,
                u = 2 & t,
                s = 4 & t,
                l = 16 & t,
                c = 32 & t;
            if (!u && !St(e)) throw new wr;
            l && !n.length && (t &= -17, l = n = !1), c && !r.length && (t &= -33, c = r = !1);
            var p = e && e.__bindData__;
            if (p && p !== !0) return p = f(p), p[2] && (p[2] = f(p[2])), p[3] && (p[3] = f(p[3])), !a || 1 & p[1] || (p[4] = o), !a && 1 & p[1] && (t |= 8), !s || 4 & p[1] || (p[5] = i), l && Fr.apply(p[2] || (p[2] = []), n), c && Or.apply(p[3] || (p[3] = []), r), p[1] |= t, at.apply(null, p);
            var h = 1 == t || 17 === t ? b : J;
            return h([e, t, n, r, o, i])
        }

        function ut(e) {
            return to[e]
        }

        function st() {
            var t = (t = d.indexOf) === yn ? e : t;
            return t
        }

        function lt(e) {
            return "function" == typeof e && Rr.test(e)
        }

        function ct(e) {
            var t, n;
            return e && kr.call(e) == B && (t = e.constructor, !St(t) || t instanceof t) ? (uo(e, function (e, t) {
                n = t
            }), "undefined" == typeof n || Pr.call(e, n)) : !1
        }

        function ft(e) {
            return no[e]
        }

        function pt(e) {
            return e && "object" == typeof e && "number" == typeof e.length && kr.call(e) == P || !1
        }

        function ht(e, t, n, r) {
            return "boolean" != typeof t && null != t && (r = n, n = t, t = !1), X(e, t, "function" == typeof n && K(n, r, 1))
        }

        function dt(e, t, n) {
            return X(e, !0, "function" == typeof t && K(t, n, 1))
        }

        function gt(e, t) {
            var n = Y(e);
            return t ? io(n, t) : n
        }

        function mt(e, t, n) {
            var r;
            return t = d.createCallback(t, n, 3), so(e, function (e, n, o) {
                return t(e, n, o) ? (r = n, !1) : void 0
            }), r
        }

        function vt(e, t, n) {
            var r;
            return t = d.createCallback(t, n, 3), bt(e, function (e, n, o) {
                return t(e, n, o) ? (r = n, !1) : void 0
            }), r
        }

        function yt(e, t, n) {
            var r = [];
            uo(e, function (e, t) {
                r.push(t, e)
            });
            var o = r.length;
            for (t = K(t, n, 3); o-- && t(r[o--], r[o], e) !== !1;);
            return e
        }

        function bt(e, t, n) {
            var r = eo(e),
                o = r.length;
            for (t = K(t, n, 3); o--;) {
                var i = r[o];
                if (t(e[i], i, e) === !1) break
            }
            return e
        }

        function _t(e) {
            var t = [];
            return uo(e, function (e, n) {
                St(e) && t.push(n)
            }), t.sort()
        }

        function xt(e, t) {
            return e ? Pr.call(e, t) : !1
        }

        function Tt(e) {
            for (var t = -1, n = eo(e), r = n.length, o = {}; ++t < r;) {
                var i = n[t];
                o[e[i]] = i
            }
            return o
        }

        function wt(e) {
            return e === !0 || e === !1 || e && "object" == typeof e && kr.call(e) == j || !1
        }

        function Et(e) {
            return e && "object" == typeof e && kr.call(e) == I || !1
        }

        function At(e) {
            return e && 1 === e.nodeType || !1
        }

        function Ct(e) {
            var t = !0;
            if (!e) return t;
            var n = kr.call(e),
                r = e.length;
            return n == F || n == G || n == P || n == B && "number" == typeof r && St(e.splice) ? !r : (so(e, function () {
                return t = !1
            }), t)
        }

        function kt(e, t, n, r) {
            return tt(e, t, "function" == typeof n && K(n, r, 2))
        }

        function Rt(e) {
            return Gr(e) && !Hr(parseFloat(e))
        }

        function St(e) {
            return "function" == typeof e
        }

        function Nt(e) {
            return !(!e || !z[typeof e])
        }

        function Dt(e) {
            return Lt(e) && e != +e
        }

        function Mt(e) {
            return null === e
        }

        function Lt(e) {
            return "number" == typeof e || e && "object" == typeof e && kr.call(e) == U || !1
        }

        function Pt(e) {
            return e && "object" == typeof e && kr.call(e) == W || !1
        }

        function Ft(e) {
            return "string" == typeof e || e && "object" == typeof e && kr.call(e) == G || !1
        }

        function jt(e) {
            return "undefined" == typeof e
        }

        function It(e, t, n) {
            var r = {};
            return t = d.createCallback(t, n, 3), so(e, function (e, n, o) {
                r[n] = t(e, n, o)
            }), r
        }

        function Ot(e) {
            var t = arguments,
                n = 2;
            if (!Nt(e)) return e;
            if ("number" != typeof t[2] && (n = t.length), n > 3 && "function" == typeof t[n - 2]) var r = K(t[--n - 1], t[n--], 2);
            else n > 2 && "function" == typeof t[n - 1] && (r = t[--n]);
            for (var o = f(arguments, 1, n), i = -1, a = u(), s = u(); ++i < n;) nt(e, o[i], r, a, s);
            return l(a), l(s), e
        }

        function Ut(e, t, n) {
            var r = {};
            if ("function" != typeof t) {
                var o = [];
                uo(e, function (e, t) {
                    o.push(t)
                }), o = Q(o, et(arguments, !0, !1, 1));
                for (var i = -1, a = o.length; ++i < a;) {
                    var u = o[i];
                    r[u] = e[u]
                }
            } else t = d.createCallback(t, n, 3), uo(e, function (e, n, o) {
                t(e, n, o) || (r[n] = e)
            });
            return r
        }

        function Bt(e) {
            for (var t = -1, n = eo(e), r = n.length, o = dr(r); ++t < r;) {
                var i = n[t];
                o[t] = [i, e[i]]
            }
            return o
        }

        function Wt(e, t, n) {
            var r = {};
            if ("function" != typeof t)
                for (var o = -1, i = et(arguments, !0, !1, 1), a = Nt(e) ? i.length : 0; ++o < a;) {
                    var u = i[o];
                    u in e && (r[u] = e[u])
                } else t = d.createCallback(t, n, 3), uo(e, function (e, n, o) {
                    t(e, n, o) && (r[n] = e)
                });
            return r
        }

        function Gt(e, t, n, r) {
            var o = Qr(e);
            if (null == n)
                if (o) n = [];
                else {
                    var i = e && e.constructor,
                        a = i && i.prototype;
                    n = Y(a)
                }
            return t && (t = d.createCallback(t, r, 4), (o ? Kt : so)(e, function (e, r, o) {
                return t(n, e, r, o)
            })), n
        }

        function Ht(e) {
            for (var t = -1, n = eo(e), r = n.length, o = dr(r); ++t < r;) o[t] = e[n[t]];
            return o
        }

        function qt(e) {
            for (var t = arguments, n = -1, r = et(t, !0, !1, 1), o = t[2] && t[2][t[1]] === e ? 1 : r.length, i = dr(o); ++n < o;) i[n] = e[r[n]];
            return i
        }

        function $t(e, t, n) {
            var r = -1,
                o = st(),
                i = e ? e.length : 0,
                a = !1;
            return n = (0 > n ? $r(0, i + n) : n) || 0, Qr(e) ? a = o(e, t, n) > -1 : "number" == typeof i ? a = (Ft(e) ? e.indexOf(t, n) : o(e, t, n)) > -1 : so(e, function (e) {
                return ++r >= n ? !(a = e === t) : void 0
            }), a
        }

        function zt(e, t, n) {
            var r = !0;
            t = d.createCallback(t, n, 3);
            var o = -1,
                i = e ? e.length : 0;
            if ("number" == typeof i)
                for (; ++o < i && (r = !!t(e[o], o, e)););
            else so(e, function (e, n, o) {
                return r = !!t(e, n, o)
            });
            return r
        }

        function Xt(e, t, n) {
            var r = [];
            t = d.createCallback(t, n, 3);
            var o = -1,
                i = e ? e.length : 0;
            if ("number" == typeof i)
                for (; ++o < i;) {
                    var a = e[o];
                    t(a, o, e) && r.push(a)
                } else so(e, function (e, n, o) {
                    t(e, n, o) && r.push(e)
                });
            return r
        }

        function Vt(e, t, n) {
            t = d.createCallback(t, n, 3);
            var r = -1,
                o = e ? e.length : 0;
            if ("number" != typeof o) {
                var i;
                return so(e, function (e, n, r) {
                    return t(e, n, r) ? (i = e, !1) : void 0
                }), i
            }
            for (; ++r < o;) {
                var a = e[r];
                if (t(a, r, e)) return a
            }
        }

        function Yt(e, t, n) {
            var r;
            return t = d.createCallback(t, n, 3), Jt(e, function (e, n, o) {
                return t(e, n, o) ? (r = e, !1) : void 0
            }), r
        }

        function Kt(e, t, n) {
            var r = -1,
                o = e ? e.length : 0;
            if (t = t && "undefined" == typeof n ? t : K(t, n, 3), "number" == typeof o)
                for (; ++r < o && t(e[r], r, e) !== !1;);
            else so(e, t);
            return e
        }

        function Jt(e, t, n) {
            var r = e ? e.length : 0;
            if (t = t && "undefined" == typeof n ? t : K(t, n, 3), "number" == typeof r)
                for (; r-- && t(e[r], r, e) !== !1;);
            else {
                var o = eo(e);
                r = o.length, so(e, function (e, n, i) {
                    return n = o ? o[--r] : --r, t(i[n], n, i)
                })
            }
            return e
        }

        function Qt(e, t) {
            var n = f(arguments, 2),
                r = -1,
                o = "function" == typeof t,
                i = e ? e.length : 0,
                a = dr("number" == typeof i ? i : 0);
            return Kt(e, function (e) {
                a[++r] = (o ? t : e[t]).apply(e, n)
            }), a
        }

        function Zt(e, t, n) {
            var r = -1,
                o = e ? e.length : 0;
            if (t = d.createCallback(t, n, 3), "number" == typeof o)
                for (var i = dr(o); ++r < o;) i[r] = t(e[r], r, e);
            else i = [], so(e, function (e, n, o) {
                i[++r] = t(e, n, o)
            });
            return i
        }

        function en(e, t, n) {
            var o = -1 / 0,
                i = o;
            if ("function" != typeof t && n && n[t] === e && (t = null), null == t && Qr(e))
                for (var a = -1, u = e.length; ++a < u;) {
                    var s = e[a];
                    s > i && (i = s)
                } else t = null == t && Ft(e) ? r : d.createCallback(t, n, 3), Kt(e, function (e, n, r) {
                    var a = t(e, n, r);
                    a > o && (o = a, i = e)
                });
            return i
        }

        function tn(e, t, n) {
            var o = 1 / 0,
                i = o;
            if ("function" != typeof t && n && n[t] === e && (t = null), null == t && Qr(e))
                for (var a = -1, u = e.length; ++a < u;) {
                    var s = e[a];
                    i > s && (i = s)
                } else t = null == t && Ft(e) ? r : d.createCallback(t, n, 3), Kt(e, function (e, n, r) {
                    var a = t(e, n, r);
                    o > a && (o = a, i = e)
                });
            return i
        }

        function nn(e, t, n, r) {
            if (!e) return n;
            var o = arguments.length < 3;
            t = d.createCallback(t, r, 4);
            var i = -1,
                a = e.length;
            if ("number" == typeof a)
                for (o && (n = e[++i]); ++i < a;) n = t(n, e[i], i, e);
            else so(e, function (e, r, i) {
                n = o ? (o = !1, e) : t(n, e, r, i)
            });
            return n
        }

        function rn(e, t, n, r) {
            var o = arguments.length < 3;
            return t = d.createCallback(t, r, 4), Jt(e, function (e, r, i) {
                n = o ? (o = !1, e) : t(n, e, r, i)
            }), n
        }

        function on(e, t, n) {
            return t = d.createCallback(t, n, 3), Xt(e, function (e, n, r) {
                return !t(e, n, r)
            })
        }

        function an(e, t, n) {
            if (e && "number" != typeof e.length && (e = Ht(e)), null == t || n) return e ? e[rt(0, e.length - 1)] : h;
            var r = un(e);
            return r.length = zr($r(0, t), r.length), r
        }

        function un(e) {
            var t = -1,
                n = e ? e.length : 0,
                r = dr("number" == typeof n ? n : 0);
            return Kt(e, function (e) {
                var n = rt(0, ++t);
                r[t] = r[n], r[n] = e
            }), r
        }

        function sn(e) {
            var t = e ? e.length : 0;
            return "number" == typeof t ? t : eo(e).length
        }

        function ln(e, t, n) {
            var r;
            t = d.createCallback(t, n, 3);
            var o = -1,
                i = e ? e.length : 0;
            if ("number" == typeof i)
                for (; ++o < i && !(r = t(e[o], o, e)););
            else so(e, function (e, n, o) {
                return !(r = t(e, n, o))
            });
            return !!r
        }

        function cn(e, t, n) {
            var r = -1,
                i = Qr(t),
                a = e ? e.length : 0,
                f = dr("number" == typeof a ? a : 0);
            for (i || (t = d.createCallback(t, n, 3)), Kt(e, function (e, n, o) {
                var a = f[++r] = s();
                i ? a.criteria = Zt(t, function (t) {
                    return e[t]
                }) : (a.criteria = u())[0] = t(e, n, o), a.index = r, a.value = e
            }), a = f.length, f.sort(o); a--;) {
                var p = f[a];
                f[a] = p.value, i || l(p.criteria), c(p)
            }
            return f
        }

        function fn(e) {
            return e && "number" == typeof e.length ? f(e) : Ht(e)
        }

        function pn(e) {
            for (var t = -1, n = e ? e.length : 0, r = []; ++t < n;) {
                var o = e[t];
                o && r.push(o)
            }
            return r
        }

        function hn(e) {
            return Q(e, et(arguments, !0, !0, 1))
        }

        function dn(e, t, n) {
            var r = -1,
                o = e ? e.length : 0;
            for (t = d.createCallback(t, n, 3); ++r < o;)
                if (t(e[r], r, e)) return r;
            return -1
        }

        function gn(e, t, n) {
            var r = e ? e.length : 0;
            for (t = d.createCallback(t, n, 3); r--;)
                if (t(e[r], r, e)) return r;
            return -1
        }

        function mn(e, t, n) {
            var r = 0,
                o = e ? e.length : 0;
            if ("number" != typeof t && null != t) {
                var i = -1;
                for (t = d.createCallback(t, n, 3); ++i < o && t(e[i], i, e);) r++
            } else if (r = t, null == r || n) return e ? e[0] : h;
            return f(e, 0, zr($r(0, r), o))
        }

        function vn(e, t, n, r) {
            return "boolean" != typeof t && null != t && (r = n, n = "function" != typeof t && r && r[t] === e ? null : t, t = !1), null != n && (e = Zt(e, n, r)), et(e, t)
        }

        function yn(t, n, r) {
            if ("number" == typeof r) {
                var o = t ? t.length : 0;
                r = 0 > r ? $r(0, o + r) : r || 0
            } else if (r) {
                var i = kn(t, n);
                return t[i] === n ? i : -1
            }
            return e(t, n, r)
        }

        function bn(e, t, n) {
            var r = 0,
                o = e ? e.length : 0;
            if ("number" != typeof t && null != t) {
                var i = o;
                for (t = d.createCallback(t, n, 3); i-- && t(e[i], i, e);) r++
            } else r = null == t || n ? 1 : t || r;
            return f(e, 0, zr($r(0, o - r), o))
        }

        function _n() {
            for (var n = [], r = -1, o = arguments.length, a = u(), s = st(), f = s === e, p = u(); ++r < o;) {
                var h = arguments[r];
                (Qr(h) || pt(h)) && (n.push(h), a.push(f && h.length >= y && i(r ? n[r] : p)))
            }
            var d = n[0],
                g = -1,
                m = d ? d.length : 0,
                v = [];
            e: for (; ++g < m;) {
                var b = a[0];
                if (h = d[g], (b ? t(b, h) : s(p, h)) < 0) {
                    for (r = o, (b || p).push(h); --r;)
                        if (b = a[r], (b ? t(b, h) : s(n[r], h)) < 0) continue e;
                    v.push(h)
                }
            }
            for (; o--;) b = a[o], b && c(b);
            return l(a), l(p), v
        }

        function xn(e, t, n) {
            var r = 0,
                o = e ? e.length : 0;
            if ("number" != typeof t && null != t) {
                var i = o;
                for (t = d.createCallback(t, n, 3); i-- && t(e[i], i, e);) r++
            } else if (r = t, null == r || n) return e ? e[o - 1] : h;
            return f(e, $r(0, o - r))
        }

        function Tn(e, t, n) {
            var r = e ? e.length : 0;
            for ("number" == typeof n && (r = (0 > n ? $r(0, r + n) : zr(n, r - 1)) + 1); r--;)
                if (e[r] === t) return r;
            return -1
        }

        function wn(e) {
            for (var t = arguments, n = 0, r = t.length, o = e ? e.length : 0; ++n < r;)
                for (var i = -1, a = t[n]; ++i < o;) e[i] === a && (Ir.call(e, i--, 1), o--);
            return e
        }

        function En(e, t, n) {
            e = +e || 0, n = "number" == typeof n ? n : +n || 1, null == t && (t = e, e = 0);
            for (var r = -1, o = $r(0, Sr((t - e) / (n || 1))), i = dr(o); ++r < o;) i[r] = e, e += n;
            return i
        }

        function An(e, t, n) {
            var r = -1,
                o = e ? e.length : 0,
                i = [];
            for (t = d.createCallback(t, n, 3); ++r < o;) {
                var a = e[r];
                t(a, r, e) && (i.push(a), Ir.call(e, r--, 1), o--)
            }
            return i
        }

        function Cn(e, t, n) {
            if ("number" != typeof t && null != t) {
                var r = 0,
                    o = -1,
                    i = e ? e.length : 0;
                for (t = d.createCallback(t, n, 3); ++o < i && t(e[o], o, e);) r++
            } else r = null == t || n ? 1 : $r(0, t);
            return f(e, r)
        }

        function kn(e, t, n, r) {
            var o = 0,
                i = e ? e.length : o;
            for (n = n ? d.createCallback(n, r, 1) : Qn, t = n(t); i > o;) {
                var a = o + i >>> 1;
                n(e[a]) < t ? o = a + 1 : i = a
            }
            return o
        }

        function Rn() {
            return ot(et(arguments, !0, !0))
        }

        function Sn(e, t, n, r) {
            return "boolean" != typeof t && null != t && (r = n, n = "function" != typeof t && r && r[t] === e ? null : t, t = !1), null != n && (n = d.createCallback(n, r, 3)), ot(e, t, n)
        }

        function Nn(e) {
            return Q(e, f(arguments, 1))
        }

        function Dn() {
            for (var e = -1, t = arguments.length; ++e < t;) {
                var n = arguments[e];
                if (Qr(n) || pt(n)) var r = r ? ot(Q(r, n).concat(Q(n, r))) : n
            }
            return r || []
        }

        function Mn() {
            for (var e = arguments.length > 1 ? arguments : arguments[0], t = -1, n = e ? en(ho(e, "length")) : 0, r = dr(0 > n ? 0 : n); ++t < n;) r[t] = ho(e, t);
            return r
        }

        function Ln(e, t) {
            var n = -1,
                r = e ? e.length : 0,
                o = {};
            for (t || !r || Qr(e[0]) || (t = []); ++n < r;) {
                var i = e[n];
                t ? o[i] = t[n] : i && (o[i[0]] = i[1])
            }
            return o
        }

        function Pn(e, t) {
            if (!St(t)) throw new wr;
            return function () {
                return --e < 1 ? t.apply(this, arguments) : void 0
            }
        }

        function Fn(e, t) {
            return arguments.length > 2 ? at(e, 17, f(arguments, 2), null, t) : at(e, 1, null, null, t)
        }

        function jn(e) {
            for (var t = arguments.length > 1 ? et(arguments, !0, !1, 1) : _t(e), n = -1, r = t.length; ++n < r;) {
                var o = t[n];
                e[o] = at(e[o], 1, null, null, e)
            }
            return e
        }

        function In(e, t) {
            return arguments.length > 2 ? at(t, 19, f(arguments, 2), null, e) : at(t, 3, null, null, e)
        }

        function On() {
            for (var e = arguments, t = e.length; t--;)
                if (!St(e[t])) throw new wr;
            return function () {
                for (var t = arguments, n = e.length; n--;) t = [e[n].apply(this, t)];
                return t[0]
            }
        }

        function Un(e, t) {
            return t = "number" == typeof t ? t : +t || e.length, at(e, 4, null, null, null, t)
        }

        function Bn(e, t, n) {
            var r, o, i, a, u, s, l, c = 0,
                f = !1,
                p = !0;
            if (!St(e)) throw new wr;
            if (t = $r(0, t) || 0, n === !0) {
                var d = !0;
                p = !1
            } else Nt(n) && (d = n.leading, f = "maxWait" in n && ($r(t, n.maxWait) || 0), p = "trailing" in n ? n.trailing : p);
            var g = function () {
                    var n = t - (mo() - a);
                    if (0 >= n) {
                        o && Nr(o);
                        var f = l;
                        o = s = l = h, f && (c = mo(), i = e.apply(u, r), s || o || (r = u = null))
                    } else s = jr(g, n)
                },
                m = function () {
                    s && Nr(s), o = s = l = h, (p || f !== t) && (c = mo(), i = e.apply(u, r), s || o || (r = u = null))
                };
            return function () {
                if (r = arguments, a = mo(), u = this, l = p && (s || !d), f === !1) var n = d && !s;
                else {
                    o || d || (c = a);
                    var h = f - (a - c),
                        v = 0 >= h;
                    v ? (o && (o = Nr(o)), c = a, i = e.apply(u, r)) : o || (o = jr(m, h))
                }
                return v && s ? s = Nr(s) : s || t === f || (s = jr(g, t)), n && (v = !0, i = e.apply(u, r)), !v || s || o || (r = u = null), i
            }
        }

        function Wn(e) {
            if (!St(e)) throw new wr;
            var t = f(arguments, 1);
            return jr(function () {
                e.apply(h, t)
            }, 1)
        }

        function Gn(e, t) {
            if (!St(e)) throw new wr;
            var n = f(arguments, 2);
            return jr(function () {
                e.apply(h, n)
            }, t)
        }

        function Hn(e, t) {
            if (!St(e)) throw new wr;
            var n = function () {
                var r = n.cache,
                    o = t ? t.apply(this, arguments) : v + arguments[0];
                return Pr.call(r, o) ? r[o] : r[o] = e.apply(this, arguments)
            };
            return n.cache = {}, n
        }

        function qn(e) {
            var t, n;
            if (!St(e)) throw new wr;
            return function () {
                return t ? n : (t = !0, n = e.apply(this, arguments), e = null, n)
            }
        }

        function $n(e) {
            return at(e, 16, f(arguments, 1))
        }

        function zn(e) {
            return at(e, 32, null, f(arguments, 1))
        }

        function Xn(e, t, n) {
            var r = !0,
                o = !0;
            if (!St(e)) throw new wr;
            return n === !1 ? r = !1 : Nt(n) && (r = "leading" in n ? n.leading : r, o = "trailing" in n ? n.trailing : o), q.leading = r, q.maxWait = t, q.trailing = o, Bn(e, t, q)
        }

        function Vn(e, t) {
            return at(t, 16, [e])
        }

        function Yn(e) {
            return function () {
                return e
            }
        }

        function Kn(e, t, n) {
            var r = typeof e;
            if (null == e || "function" == r) return K(e, t, n);
            if ("object" != r) return nr(e);
            var o = eo(e),
                i = o[0],
                a = e[i];
            return 1 != o.length || a !== a || Nt(a) ? function (t) {
                for (var n = o.length, r = !1; n-- && (r = tt(t[o[n]], e[o[n]], null, !0)););
                return r
            } : function (e) {
                var t = e[i];
                return a === t && (0 !== a || 1 / a == 1 / t)
            }
        }

        function Jn(e) {
            return null == e ? "" : Tr(e).replace(oo, ut)
        }

        function Qn(e) {
            return e
        }

        function Zn(e, t, n) {
            var r = !0,
                o = t && _t(t);
            t && (n || o.length) || (null == n && (n = t), i = g, t = e, e = d, o = _t(t)), n === !1 ? r = !1 : Nt(n) && "chain" in n && (r = n.chain);
            var i = e,
                a = St(i);
            Kt(o, function (n) {
                var o = e[n] = t[n];
                a && (i.prototype[n] = function () {
                    var t = this.__chain__,
                        n = this.__wrapped__,
                        a = [n];
                    Fr.apply(a, arguments);
                    var u = o.apply(e, a);
                    if (r || t) {
                        if (n === u && Nt(u)) return this;
                        u = new i(u), u.__chain__ = t
                    }
                    return u
                })
            })
        }

        function er() {
            return n._ = Cr, this
        }

        function tr() {}

        function nr(e) {
            return function (t) {
                return t[e]
            }
        }

        function rr(e, t, n) {
            var r = null == e,
                o = null == t;
            if (null == n && ("boolean" == typeof e && o ? (n = e, e = 1) : o || "boolean" != typeof t || (n = t, o = !0)), r && o && (t = 1), e = +e || 0, o ? (t = e, e = 0) : t = +t || 0, n || e % 1 || t % 1) {
                var i = Vr();
                return zr(e + i * (t - e + parseFloat("1e-" + ((i + "").length - 1))), t)
            }
            return rt(e, t)
        }

        function or(e, t) {
            if (e) {
                var n = e[t];
                return St(n) ? e[t]() : n
            }
        }

        function ir(e, t, n) {
            var r = d.templateSettings;
            e = Tr(e || ""), n = ao({}, n, r);
            var o, i = ao({}, n.imports, r.imports),
                u = eo(i),
                s = Ht(i),
                l = 0,
                c = n.interpolate || S,
                f = "__p += '",
                p = xr((n.escape || S).source + "|" + c.source + "|" + (c === k ? E : S).source + "|" + (n.evaluate || S).source + "|$", "g");
            e.replace(p, function (t, n, r, i, u, s) {
                return r || (r = i), f += e.slice(l, s).replace(D, a), n && (f += "' +\n__e(" + n + ") +\n'"), u && (o = !0, f += "';\n" + u + ";\n__p += '"), r && (f += "' +\n((__t = (" + r + ")) == null ? '' : __t) +\n'"), l = s + t.length, t
            }), f += "';\n";
            var g = n.variable,
                m = g;
            m || (g = "obj", f = "with (" + g + ") {\n" + f + "\n}\n"), f = (o ? f.replace(x, "") : f).replace(T, "$1").replace(w, "$1;"), f = "function(" + g + ") {\n" + (m ? "" : g + " || (" + g + " = {});\n") + "var __t, __p = '', __e = _.escape" + (o ? ", __j = Array.prototype.join;\nfunction print() { __p += __j.call(arguments, '') }\n" : ";\n") + f + "return __p\n}";
            var v = "\n/*\n//# sourceURL=" + (n.sourceURL || "/lodash/template/source[" + L+++"]") + "\n*/";
            try {
                var y = vr(u, "return " + f + v).apply(h, s)
            } catch (b) {
                throw b.source = f, b
            }
            return t ? y(t) : (y.source = f, y)
        }

        function ar(e, t, n) {
            e = (e = +e) > -1 ? e : 0;
            var r = -1,
                o = dr(e);
            for (t = K(t, n, 1); ++r < e;) o[r] = t(r);
            return o
        }

        function ur(e) {
            return null == e ? "" : Tr(e).replace(ro, ft)
        }

        function sr(e) {
            var t = ++m;
            return Tr(null == e ? "" : e) + t
        }

        function lr(e) {
            return e = new g(e), e.__chain__ = !0, e
        }

        function cr(e, t) {
            return t(e), e
        }

        function fr() {
            return this.__chain__ = !0, this
        }

        function pr() {
            return Tr(this.__wrapped__)
        }

        function hr() {
            return this.__wrapped__
        }

        n = n ? Z.defaults(V.Object(), n, Z.pick(V, M)) : V;
        var dr = n.Array,
            gr = n.Boolean,
            mr = n.Date,
            vr = n.Function,
            yr = n.Math,
            br = n.Number,
            _r = n.Object,
            xr = n.RegExp,
            Tr = n.String,
            wr = n.TypeError,
            Er = [],
            Ar = _r.prototype,
            Cr = n._,
            kr = Ar.toString,
            Rr = xr("^" + Tr(kr).replace(/[.*+?^${}()|[\]\\]/g, "\\$&").replace(/toString| for [^\]]+/g, ".*?") + "$"),
            Sr = yr.ceil,
            Nr = n.clearTimeout,
            Dr = yr.floor,
            Mr = vr.prototype.toString,
            Lr = lt(Lr = _r.getPrototypeOf) && Lr,
            Pr = Ar.hasOwnProperty,
            Fr = Er.push,
            jr = n.setTimeout,
            Ir = Er.splice,
            Or = Er.unshift,
            Ur = function () {
                try {
                    var e = {},
                        t = lt(t = _r.defineProperty) && t,
                        n = t(e, e, e) && t
                } catch (r) {}
                return n
            }(),
            Br = lt(Br = _r.create) && Br,
            Wr = lt(Wr = dr.isArray) && Wr,
            Gr = n.isFinite,
            Hr = n.isNaN,
            qr = lt(qr = _r.keys) && qr,
            $r = yr.max,
            zr = yr.min,
            Xr = n.parseInt,
            Vr = yr.random,
            Yr = {};
        Yr[F] = dr, Yr[j] = gr, Yr[I] = mr, Yr[O] = vr, Yr[B] = _r, Yr[U] = br, Yr[W] = xr, Yr[G] = Tr, g.prototype = d.prototype;
        var Kr = d.support = {};
        Kr.funcDecomp = !lt(n.WinRTError) && N.test(p), Kr.funcNames = "string" == typeof vr.name, d.templateSettings = {
            escape: /<%-([\s\S]+?)%>/g,
            evaluate: /<%([\s\S]+?)%>/g,
            interpolate: k,
            variable: "",
            imports: {
                _: d
            }
        }, Br || (Y = function () {
            function e() {}

            return function (t) {
                if (Nt(t)) {
                    e.prototype = t;
                    var r = new e;
                    e.prototype = null
                }
                return r || n.Object()
            }
        }());
        var Jr = Ur ? function (e, t) {
                $.value = t, Ur(e, "__bindData__", $)
            } : tr,
            Qr = Wr || function (e) {
                return e && "object" == typeof e && "number" == typeof e.length && kr.call(e) == F || !1
            },
            Zr = function (e) {
                var t, n = e,
                    r = [];
                if (!n) return r;
                if (!z[typeof e]) return r;
                for (t in n) Pr.call(n, t) && r.push(t);
                return r
            },
            eo = qr ? function (e) {
                return Nt(e) ? qr(e) : []
            } : Zr,
            to = {
                "&": "&amp;",
                "<": "&lt;",
                ">": "&gt;",
                '"': "&quot;",
                "'": "&#39;"
            },
            no = Tt(to),
            ro = xr("(" + eo(no).join("|") + ")", "g"),
            oo = xr("[" + eo(to).join("") + "]", "g"),
            io = function (e, t, n) {
                var r, o = e,
                    i = o;
                if (!o) return i;
                var a = arguments,
                    u = 0,
                    s = "number" == typeof n ? 2 : a.length;
                if (s > 3 && "function" == typeof a[s - 2]) var l = K(a[--s - 1], a[s--], 2);
                else s > 2 && "function" == typeof a[s - 1] && (l = a[--s]);
                for (; ++u < s;)
                    if (o = a[u], o && z[typeof o])
                        for (var c = -1, f = z[typeof o] && eo(o), p = f ? f.length : 0; ++c < p;) r = f[c], i[r] = l ? l(i[r], o[r]) : o[r];
                return i
            },
            ao = function (e, t, n) {
                var r, o = e,
                    i = o;
                if (!o) return i;
                for (var a = arguments, u = 0, s = "number" == typeof n ? 2 : a.length; ++u < s;)
                    if (o = a[u], o && z[typeof o])
                        for (var l = -1, c = z[typeof o] && eo(o), f = c ? c.length : 0; ++l < f;) r = c[l], "undefined" == typeof i[r] && (i[r] = o[r]);
                return i
            },
            uo = function (e, t, n) {
                var r, o = e,
                    i = o;
                if (!o) return i;
                if (!z[typeof o]) return i;
                t = t && "undefined" == typeof n ? t : K(t, n, 3);
                for (r in o)
                    if (t(o[r], r, e) === !1) return i;
                return i
            },
            so = function (e, t, n) {
                var r, o = e,
                    i = o;
                if (!o) return i;
                if (!z[typeof o]) return i;
                t = t && "undefined" == typeof n ? t : K(t, n, 3);
                for (var a = -1, u = z[typeof o] && eo(o), s = u ? u.length : 0; ++a < s;)
                    if (r = u[a], t(o[r], r, e) === !1) return i;
                return i
            },
            lo = Lr ? function (e) {
                if (!e || kr.call(e) != B) return !1;
                var t = e.valueOf,
                    n = lt(t) && (n = Lr(t)) && Lr(n);
                return n ? e == n || Lr(e) == n : ct(e)
            } : ct,
            co = it(function (e, t, n) {
                Pr.call(e, n) ? e[n]++ : e[n] = 1
            }),
            fo = it(function (e, t, n) {
                (Pr.call(e, n) ? e[n] : e[n] = []).push(t)
            }),
            po = it(function (e, t, n) {
                e[n] = t
            }),
            ho = Zt,
            go = Xt,
            mo = lt(mo = mr.now) && mo || function () {
                return (new mr).getTime()
            },
            vo = 8 == Xr(_ + "08") ? Xr : function (e, t) {
                return Xr(Ft(e) ? e.replace(R, "") : e, t || 0)
            };
        return d.after = Pn, d.assign = io, d.at = qt, d.bind = Fn, d.bindAll = jn, d.bindKey = In, d.chain = lr, d.compact = pn, d.compose = On, d.constant = Yn, d.countBy = co, d.create = gt, d.createCallback = Kn, d.curry = Un, d.debounce = Bn, d.defaults = ao, d.defer = Wn, d.delay = Gn, d.difference = hn, d.filter = Xt, d.flatten = vn, d.forEach = Kt, d.forEachRight = Jt, d.forIn = uo, d.forInRight = yt, d.forOwn = so, d.forOwnRight = bt, d.functions = _t, d.groupBy = fo, d.indexBy = po, d.initial = bn, d.intersection = _n, d.invert = Tt, d.invoke = Qt, d.keys = eo, d.map = Zt, d.mapValues = It, d.max = en, d.memoize = Hn, d.merge = Ot, d.min = tn, d.omit = Ut, d.once = qn, d.pairs = Bt, d.partial = $n, d.partialRight = zn, d.pick = Wt, d.pluck = ho, d.property = nr, d.pull = wn, d.range = En, d.reject = on, d.remove = An, d.rest = Cn, d.shuffle = un, d.sortBy = cn, d.tap = cr, d.throttle = Xn, d.times = ar, d.toArray = fn, d.transform = Gt, d.union = Rn, d.uniq = Sn, d.values = Ht, d.where = go, d.without = Nn, d.wrap = Vn, d.xor = Dn, d.zip = Mn, d.zipObject = Ln, d.collect = Zt, d.drop = Cn, d.each = Kt, d.eachRight = Jt, d.extend = io, d.methods = _t, d.object = Ln, d.select = Xt, d.tail = Cn, d.unique = Sn, d.unzip = Mn, Zn(d), d.clone = ht, d.cloneDeep = dt, d.contains = $t, d.escape = Jn, d.every = zt, d.find = Vt, d.findIndex = dn, d.findKey = mt, d.findLast = Yt, d.findLastIndex = gn, d.findLastKey = vt, d.has = xt, d.identity = Qn, d.indexOf = yn, d.isArguments = pt, d.isArray = Qr, d.isBoolean = wt, d.isDate = Et, d.isElement = At, d.isEmpty = Ct, d.isEqual = kt, d.isFinite = Rt, d.isFunction = St, d.isNaN = Dt, d.isNull = Mt, d.isNumber = Lt, d.isObject = Nt, d.isPlainObject = lo, d.isRegExp = Pt, d.isString = Ft, d.isUndefined = jt, d.lastIndexOf = Tn, d.mixin = Zn, d.noConflict = er, d.noop = tr, d.now = mo, d.parseInt = vo, d.random = rr, d.reduce = nn, d.reduceRight = rn, d.result = or, d.runInContext = p, d.size = sn, d.some = ln, d.sortedIndex = kn, d.template = ir, d.unescape = ur, d.uniqueId = sr, d.all = zt, d.any = ln, d.detect = Vt, d.findWhere = Vt, d.foldl = nn, d.foldr = rn, d.include = $t, d.inject = nn, Zn(function () {
            var e = {};
            return so(d, function (t, n) {
                d.prototype[n] || (e[n] = t)
            }), e
        }(), !1), d.first = mn, d.last = xn, d.sample = an, d.take = mn, d.head = mn, so(d, function (e, t) {
            var n = "sample" !== t;
            d.prototype[t] || (d.prototype[t] = function (t, r) {
                var o = this.__chain__,
                    i = e(this.__wrapped__, t, r);
                return o || null != t && (!r || n && "function" == typeof t) ? new g(i, o) : i
            })
        }), d.VERSION = "2.4.1", d.prototype.chain = fr, d.prototype.toString = pr, d.prototype.value = hr, d.prototype.valueOf = hr, Kt(["join", "pop", "shift"], function (e) {
            var t = Er[e];
            d.prototype[e] = function () {
                var e = this.__chain__,
                    n = t.apply(this.__wrapped__, arguments);
                return e ? new g(n, e) : n
            }
        }), Kt(["push", "reverse", "sort", "unshift"], function (e) {
            var t = Er[e];
            d.prototype[e] = function () {
                return t.apply(this.__wrapped__, arguments), this
            }
        }), Kt(["concat", "slice", "splice"], function (e) {
            var t = Er[e];
            d.prototype[e] = function () {
                return new g(t.apply(this.__wrapped__, arguments), this.__chain__)
            }
        }), d
    }

    var h, d = [],
        g = [],
        m = 0,
        v = +new Date + "",
        y = 75,
        b = 40,
        _ = " 	\f ﻿\n\r\u2028\u2029 ᠎             　",
        x = /\b__p \+= '';/g,
        T = /\b(__p \+=) '' \+/g,
        w = /(__e\(.*?\)|\b__t\)) \+\n'';/g,
        E = /\$\{([^\\}]*(?:\\.[^\\}]*)*)\}/g,
        A = /\w*$/,
        C = /^\s*function[ \n\r\t]+\w/,
        k = /<%=([\s\S]+?)%>/g,
        R = RegExp("^[" + _ + "]*0+(?=.$)"),
        S = /($^)/,
        N = /\bthis\b/,
        D = /['\n\r\t\u2028\u2029\\]/g,
        M = ["Array", "Boolean", "Date", "Function", "Math", "Number", "Object", "RegExp", "String", "_", "attachEvent", "clearTimeout", "isFinite", "isNaN", "parseInt", "setTimeout"],
        L = 0,
        P = "[object Arguments]",
        F = "[object Array]",
        j = "[object Boolean]",
        I = "[object Date]",
        O = "[object Function]",
        U = "[object Number]",
        B = "[object Object]",
        W = "[object RegExp]",
        G = "[object String]",
        H = {};
    H[O] = !1, H[P] = H[F] = H[j] = H[I] = H[U] = H[B] = H[W] = H[G] = !0;
    var q = {
            leading: !1,
            maxWait: 0,
            trailing: !1
        },
        $ = {
            configurable: !1,
            enumerable: !1,
            value: null,
            writable: !1
        },
        z = {
            "boolean": !1,
            "function": !0,
            object: !0,
            number: !1,
            string: !1,
            undefined: !1
        },
        X = {
            "\\": "\\",
            "'": "'",
            "\n": "n",
            "\r": "r",
            "	": "t",
            "\u2028": "u2028",
            "\u2029": "u2029"
        },
        V = z[typeof window] && window || this,
        Y = z[typeof exports] && exports && !exports.nodeType && exports,
        K = z[typeof module] && module && !module.nodeType && module,
        J = K && K.exports === Y && Y,
        Q = z[typeof global] && global;
    !Q || Q.global !== Q && Q.window !== Q || (V = Q);
    var Z = p();
    "function" == typeof define && "object" == typeof define.amd && define.amd ? (V._ = Z, define(function () {
        return Z
    })) : Y && K ? J ? (K.exports = Z)._ = Z : Y._ = Z : V._ = Z
}.call(this),
function (e) {
    function t(e, t) {
        for (var n = e.length; n--;)
            if (e[n] === t) return n;
        return -1
    }

    function n(e, t) {
        if (e.length != t.length) return !1;
        for (var n = 0; n < e.length; n++)
            if (e[n] !== t[n]) return !1;
        return !0
    }

    function r(e) {
        for (b in x) x[b] = e[k[b]]
    }

    function o(e) {
        var n, o, i, a, s, l;
        if (n = e.keyCode, -1 == t(C, n) && C.push(n), (93 == n || 224 == n) && (n = 91), n in x) {
            x[n] = !0;
            for (i in w) w[i] == n && (u[i] = !0)
        } else if (r(e), u.filter.call(this, e) && n in _)
            for (l = h(), a = 0; a < _[n].length; a++)
                if (o = _[n][a], o.scope == l || "all" == o.scope) {
                    s = o.mods.length > 0;
                    for (i in x)(!x[i] && t(o.mods, +i) > -1 || x[i] && -1 == t(o.mods, +i)) && (s = !1);
                    (0 != o.mods.length || x[16] || x[18] || x[17] || x[91]) && !s || o.method(e, o) === !1 && (e.preventDefault ? e.preventDefault() : e.returnValue = !1, e.stopPropagation && e.stopPropagation(), e.cancelBubble && (e.cancelBubble = !0))
                }
    }

    function i(e) {
        var n, r = e.keyCode,
            o = t(C, r);
        if (o >= 0 && C.splice(o, 1), (93 == r || 224 == r) && (r = 91), r in x) {
            x[r] = !1;
            for (n in w) w[n] == r && (u[n] = !1)
        }
    }

    function a() {
        for (b in x) x[b] = !1;
        for (b in w) u[b] = !1
    }

    function u(e, t, n) {
        var r, o;
        r = g(e), void 0 === n && (n = t, t = "all");
        for (var i = 0; i < r.length; i++) o = [], e = r[i].split("+"), e.length > 1 && (o = m(e), e = [e[e.length - 1]]), e = e[0], e = A(e), e in _ || (_[e] = []), _[e].push({
            shortcut: r[i],
            scope: t,
            method: n,
            key: r[i],
            mods: o
        })
    }

    function s(e, t) {
        var r, o, i, a, u, s = [];
        for (r = g(e), a = 0; a < r.length; a++) {
            if (o = r[a].split("+"), o.length > 1 && (s = m(o), e = o[o.length - 1]), e = A(e), void 0 === t && (t = h()), !_[e]) return;
            for (i in _[e]) u = _[e][i], u.scope === t && n(u.mods, s) && (_[e][i] = {})
        }
    }

    function l(e) {
        return "string" == typeof e && (e = A(e)), -1 != t(C, e)
    }

    function c() {
        return C.slice(0)
    }

    function f(e) {
        var t = (e.target || e.srcElement).tagName;
        return !("INPUT" == t || "SELECT" == t || "TEXTAREA" == t)
    }

    function p(e) {
        T = e || "all"
    }

    function h() {
        return T || "all"
    }

    function d(e) {
        var t, n, r;
        for (t in _)
            for (n = _[t], r = 0; r < n.length;) n[r].scope === e ? n.splice(r, 1) : r++
    }

    function g(e) {
        var t;
        return e = e.replace(/\s/g, ""), t = e.split(","), "" == t[t.length - 1] && (t[t.length - 2] += ","), t
    }

    function m(e) {
        for (var t = e.slice(0, e.length - 1), n = 0; n < t.length; n++) t[n] = w[t[n]];
        return t
    }

    function v(e, t, n) {
        e.addEventListener ? e.addEventListener(t, n, !1) : e.attachEvent && e.attachEvent("on" + t, function () {
            n(window.event)
        })
    }

    function y() {
        var t = e.key;
        return e.key = R, t
    }

    var b, _ = {},
        x = {
            16: !1,
            18: !1,
            17: !1,
            91: !1
        },
        T = "all",
        w = {
            "⇧": 16,
            shift: 16,
            "⌥": 18,
            alt: 18,
            option: 18,
            "⌃": 17,
            ctrl: 17,
            control: 17,
            "⌘": 91,
            command: 91
        },
        E = {
            backspace: 8,
            tab: 9,
            clear: 12,
            enter: 13,
            "return": 13,
            esc: 27,
            escape: 27,
            space: 32,
            left: 37,
            up: 38,
            right: 39,
            down: 40,
            del: 46,
            "delete": 46,
            home: 36,
            end: 35,
            pageup: 33,
            pagedown: 34,
            ",": 188,
            ".": 190,
            "/": 191,
            "`": 192,
            "-": 189,
            "=": 187,
            ";": 186,
            "'": 222,
            "[": 219,
            "]": 221,
            "\\": 220
        },
        A = function (e) {
            return E[e] || e.toUpperCase().charCodeAt(0)
        },
        C = [];
    for (b = 1; 20 > b; b++) E["f" + b] = 111 + b;
    var k = {
        16: "shiftKey",
        18: "altKey",
        17: "ctrlKey",
        91: "metaKey"
    };
    for (b in w) u[b] = !1;
    v(document, "keydown", function (e) {
        o(e)
    }), v(document, "keyup", i), v(window, "focus", a);
    var R = e.key;
    e.key = u, e.key.setScope = p, e.key.getScope = h, e.key.deleteScope = d, e.key.filter = f, e.key.isPressed = l, e.key.getPressedKeyCodes = c, e.key.noConflict = y, e.key.unbind = s, "undefined" != typeof module && (module.exports = key)
}(this),
function (e) {
    "use strict";
    var t = {};
    "undefined" == typeof exports ? "function" == typeof define && "object" == typeof define.amd && define.amd ? (t.exports = {}, define(function () {
        return t.exports
    })) : t.exports = "undefined" != typeof window ? window : e : t.exports = exports,
    function (e) {
        if (!t) var t = 1e-6;
        if (!n) var n = "undefined" != typeof Float32Array ? Float32Array : Array;
        if (!r) var r = Math.random;
        var o = {};
        o.setMatrixArrayType = function (e) {
            n = e
        }, "undefined" != typeof e && (e.glMatrix = o);
        var i = {};
        i.create = function () {
            var e = new n(2);
            return e[0] = 0, e[1] = 0, e
        }, i.clone = function (e) {
            var t = new n(2);
            return t[0] = e[0], t[1] = e[1], t
        }, i.fromValues = function (e, t) {
            var r = new n(2);
            return r[0] = e, r[1] = t, r
        }, i.copy = function (e, t) {
            return e[0] = t[0], e[1] = t[1], e
        }, i.set = function (e, t, n) {
            return e[0] = t, e[1] = n, e
        }, i.add = function (e, t, n) {
            return e[0] = t[0] + n[0], e[1] = t[1] + n[1], e
        }, i.subtract = function (e, t, n) {
            return e[0] = t[0] - n[0], e[1] = t[1] - n[1], e
        }, i.sub = i.subtract, i.multiply = function (e, t, n) {
            return e[0] = t[0] * n[0], e[1] = t[1] * n[1], e
        }, i.mul = i.multiply, i.divide = function (e, t, n) {
            return e[0] = t[0] / n[0], e[1] = t[1] / n[1], e
        }, i.div = i.divide, i.min = function (e, t, n) {
            return e[0] = Math.min(t[0], n[0]), e[1] = Math.min(t[1], n[1]), e
        }, i.max = function (e, t, n) {
            return e[0] = Math.max(t[0], n[0]), e[1] = Math.max(t[1], n[1]), e
        }, i.scale = function (e, t, n) {
            return e[0] = t[0] * n, e[1] = t[1] * n, e
        }, i.scaleAndAdd = function (e, t, n, r) {
            return e[0] = t[0] + n[0] * r, e[1] = t[1] + n[1] * r, e
        }, i.distance = function (e, t) {
            var n = t[0] - e[0],
                r = t[1] - e[1];
            return Math.sqrt(n * n + r * r)
        }, i.dist = i.distance, i.squaredDistance = function (e, t) {
            var n = t[0] - e[0],
                r = t[1] - e[1];
            return n * n + r * r
        }, i.sqrDist = i.squaredDistance, i.length = function (e) {
            var t = e[0],
                n = e[1];
            return Math.sqrt(t * t + n * n)
        }, i.len = i.length, i.squaredLength = function (e) {
            var t = e[0],
                n = e[1];
            return t * t + n * n
        }, i.sqrLen = i.squaredLength, i.negate = function (e, t) {
            return e[0] = -t[0], e[1] = -t[1], e
        }, i.normalize = function (e, t) {
            var n = t[0],
                r = t[1],
                o = n * n + r * r;
            return o > 0 && (o = 1 / Math.sqrt(o), e[0] = t[0] * o, e[1] = t[1] * o), e
        }, i.dot = function (e, t) {
            return e[0] * t[0] + e[1] * t[1]
        }, i.cross = function (e, t, n) {
            var r = t[0] * n[1] - t[1] * n[0];
            return e[0] = e[1] = 0, e[2] = r, e
        }, i.lerp = function (e, t, n, r) {
            var o = t[0],
                i = t[1];
            return e[0] = o + r * (n[0] - o), e[1] = i + r * (n[1] - i), e
        }, i.random = function (e, t) {
            t = t || 1;
            var n = 2 * r() * Math.PI;
            return e[0] = Math.cos(n) * t, e[1] = Math.sin(n) * t, e
        }, i.transformMat2 = function (e, t, n) {
            var r = t[0],
                o = t[1];
            return e[0] = n[0] * r + n[2] * o, e[1] = n[1] * r + n[3] * o, e
        }, i.transformMat2d = function (e, t, n) {
            var r = t[0],
                o = t[1];
            return e[0] = n[0] * r + n[2] * o + n[4], e[1] = n[1] * r + n[3] * o + n[5], e
        }, i.transformMat3 = function (e, t, n) {

            var r = t[0],
                o = t[1];
            return e[0] = n[0] * r + n[3] * o + n[6], e[1] = n[1] * r + n[4] * o + n[7], e
        }, i.transformMat4 = function (e, t, n) {
            var r = t[0],
                o = t[1];
            return e[0] = n[0] * r + n[4] * o + n[12], e[1] = n[1] * r + n[5] * o + n[13], e
        }, i.forEach = function () {
            var e = i.create();
            return function (t, n, r, o, i, a) {
                var u, s;
                for (n || (n = 2), r || (r = 0), s = o ? Math.min(o * n + r, t.length) : t.length, u = r; s > u; u += n) e[0] = t[u], e[1] = t[u + 1], i(e, e, a), t[u] = e[0], t[u + 1] = e[1];
                return t
            }
        }(), i.str = function (e) {
            return "vec2(" + e[0] + ", " + e[1] + ")"
        }, "undefined" != typeof e && (e.vec2 = i);
        var a = {};
        a.create = function () {
            var e = new n(3);
            return e[0] = 0, e[1] = 0, e[2] = 0, e
        }, a.clone = function (e) {
            var t = new n(3);
            return t[0] = e[0], t[1] = e[1], t[2] = e[2], t
        }, a.fromValues = function (e, t, r) {
            var o = new n(3);
            return o[0] = e, o[1] = t, o[2] = r, o
        }, a.copy = function (e, t) {
            return e[0] = t[0], e[1] = t[1], e[2] = t[2], e
        }, a.set = function (e, t, n, r) {
            return e[0] = t, e[1] = n, e[2] = r, e
        }, a.add = function (e, t, n) {
            return e[0] = t[0] + n[0], e[1] = t[1] + n[1], e[2] = t[2] + n[2], e
        }, a.subtract = function (e, t, n) {
            return e[0] = t[0] - n[0], e[1] = t[1] - n[1], e[2] = t[2] - n[2], e
        }, a.sub = a.subtract, a.multiply = function (e, t, n) {
            return e[0] = t[0] * n[0], e[1] = t[1] * n[1], e[2] = t[2] * n[2], e
        }, a.mul = a.multiply, a.divide = function (e, t, n) {
            return e[0] = t[0] / n[0], e[1] = t[1] / n[1], e[2] = t[2] / n[2], e
        }, a.div = a.divide, a.min = function (e, t, n) {
            return e[0] = Math.min(t[0], n[0]), e[1] = Math.min(t[1], n[1]), e[2] = Math.min(t[2], n[2]), e
        }, a.max = function (e, t, n) {
            return e[0] = Math.max(t[0], n[0]), e[1] = Math.max(t[1], n[1]), e[2] = Math.max(t[2], n[2]), e
        }, a.scale = function (e, t, n) {
            return e[0] = t[0] * n, e[1] = t[1] * n, e[2] = t[2] * n, e
        }, a.scaleAndAdd = function (e, t, n, r) {
            return e[0] = t[0] + n[0] * r, e[1] = t[1] + n[1] * r, e[2] = t[2] + n[2] * r, e
        }, a.distance = function (e, t) {
            var n = t[0] - e[0],
                r = t[1] - e[1],
                o = t[2] - e[2];
            return Math.sqrt(n * n + r * r + o * o)
        }, a.dist = a.distance, a.squaredDistance = function (e, t) {
            var n = t[0] - e[0],
                r = t[1] - e[1],
                o = t[2] - e[2];
            return n * n + r * r + o * o
        }, a.sqrDist = a.squaredDistance, a.length = function (e) {
            var t = e[0],
                n = e[1],
                r = e[2];
            return Math.sqrt(t * t + n * n + r * r)
        }, a.len = a.length, a.squaredLength = function (e) {
            var t = e[0],
                n = e[1],
                r = e[2];
            return t * t + n * n + r * r
        }, a.sqrLen = a.squaredLength, a.negate = function (e, t) {
            return e[0] = -t[0], e[1] = -t[1], e[2] = -t[2], e
        }, a.normalize = function (e, t) {
            var n = t[0],
                r = t[1],
                o = t[2],
                i = n * n + r * r + o * o;
            return i > 0 && (i = 1 / Math.sqrt(i), e[0] = t[0] * i, e[1] = t[1] * i, e[2] = t[2] * i), e
        }, a.dot = function (e, t) {
            return e[0] * t[0] + e[1] * t[1] + e[2] * t[2]
        }, a.cross = function (e, t, n) {
            var r = t[0],
                o = t[1],
                i = t[2],
                a = n[0],
                u = n[1],
                s = n[2];
            return e[0] = o * s - i * u, e[1] = i * a - r * s, e[2] = r * u - o * a, e
        }, a.lerp = function (e, t, n, r) {
            var o = t[0],
                i = t[1],
                a = t[2];
            return e[0] = o + r * (n[0] - o), e[1] = i + r * (n[1] - i), e[2] = a + r * (n[2] - a), e
        }, a.random = function (e, t) {
            t = t || 1;
            var n = 2 * r() * Math.PI,
                o = 2 * r() - 1,
                i = Math.sqrt(1 - o * o) * t;
            return e[0] = Math.cos(n) * i, e[1] = Math.sin(n) * i, e[2] = o * t, e
        }, a.transformMat4 = function (e, t, n) {
            var r = t[0],
                o = t[1],
                i = t[2];
            return e[0] = n[0] * r + n[4] * o + n[8] * i + n[12], e[1] = n[1] * r + n[5] * o + n[9] * i + n[13], e[2] = n[2] * r + n[6] * o + n[10] * i + n[14], e
        }, a.transformMat3 = function (e, t, n) {
            var r = t[0],
                o = t[1],
                i = t[2];
            return e[0] = r * n[0] + o * n[3] + i * n[6], e[1] = r * n[1] + o * n[4] + i * n[7], e[2] = r * n[2] + o * n[5] + i * n[8], e
        }, a.transformQuat = function (e, t, n) {
            var r = t[0],
                o = t[1],
                i = t[2],
                a = n[0],
                u = n[1],
                s = n[2],
                l = n[3],
                c = l * r + u * i - s * o,
                f = l * o + s * r - a * i,
                p = l * i + a * o - u * r,
                h = -a * r - u * o - s * i;
            return e[0] = c * l + h * -a + f * -s - p * -u, e[1] = f * l + h * -u + p * -a - c * -s, e[2] = p * l + h * -s + c * -u - f * -a, e
        }, a.forEach = function () {
            var e = a.create();
            return function (t, n, r, o, i, a) {
                var u, s;
                for (n || (n = 3), r || (r = 0), s = o ? Math.min(o * n + r, t.length) : t.length, u = r; s > u; u += n) e[0] = t[u], e[1] = t[u + 1], e[2] = t[u + 2], i(e, e, a), t[u] = e[0], t[u + 1] = e[1], t[u + 2] = e[2];
                return t
            }
        }(), a.str = function (e) {
            return "vec3(" + e[0] + ", " + e[1] + ", " + e[2] + ")"
        }, "undefined" != typeof e && (e.vec3 = a);
        var u = {};
        u.create = function () {
            var e = new n(4);
            return e[0] = 0, e[1] = 0, e[2] = 0, e[3] = 0, e
        }, u.clone = function (e) {
            var t = new n(4);
            return t[0] = e[0], t[1] = e[1], t[2] = e[2], t[3] = e[3], t
        }, u.fromValues = function (e, t, r, o) {
            var i = new n(4);
            return i[0] = e, i[1] = t, i[2] = r, i[3] = o, i
        }, u.copy = function (e, t) {
            return e[0] = t[0], e[1] = t[1], e[2] = t[2], e[3] = t[3], e
        }, u.set = function (e, t, n, r, o) {
            return e[0] = t, e[1] = n, e[2] = r, e[3] = o, e
        }, u.add = function (e, t, n) {
            return e[0] = t[0] + n[0], e[1] = t[1] + n[1], e[2] = t[2] + n[2], e[3] = t[3] + n[3], e
        }, u.subtract = function (e, t, n) {
            return e[0] = t[0] - n[0], e[1] = t[1] - n[1], e[2] = t[2] - n[2], e[3] = t[3] - n[3], e
        }, u.sub = u.subtract, u.multiply = function (e, t, n) {
            return e[0] = t[0] * n[0], e[1] = t[1] * n[1], e[2] = t[2] * n[2], e[3] = t[3] * n[3], e
        }, u.mul = u.multiply, u.divide = function (e, t, n) {
            return e[0] = t[0] / n[0], e[1] = t[1] / n[1], e[2] = t[2] / n[2], e[3] = t[3] / n[3], e
        }, u.div = u.divide, u.min = function (e, t, n) {
            return e[0] = Math.min(t[0], n[0]), e[1] = Math.min(t[1], n[1]), e[2] = Math.min(t[2], n[2]), e[3] = Math.min(t[3], n[3]), e
        }, u.max = function (e, t, n) {
            return e[0] = Math.max(t[0], n[0]), e[1] = Math.max(t[1], n[1]), e[2] = Math.max(t[2], n[2]), e[3] = Math.max(t[3], n[3]), e
        }, u.scale = function (e, t, n) {
            return e[0] = t[0] * n, e[1] = t[1] * n, e[2] = t[2] * n, e[3] = t[3] * n, e
        }, u.scaleAndAdd = function (e, t, n, r) {
            return e[0] = t[0] + n[0] * r, e[1] = t[1] + n[1] * r, e[2] = t[2] + n[2] * r, e[3] = t[3] + n[3] * r, e
        }, u.distance = function (e, t) {
            var n = t[0] - e[0],
                r = t[1] - e[1],
                o = t[2] - e[2],
                i = t[3] - e[3];
            return Math.sqrt(n * n + r * r + o * o + i * i)
        }, u.dist = u.distance, u.squaredDistance = function (e, t) {
            var n = t[0] - e[0],
                r = t[1] - e[1],
                o = t[2] - e[2],
                i = t[3] - e[3];
            return n * n + r * r + o * o + i * i
        }, u.sqrDist = u.squaredDistance, u.length = function (e) {
            var t = e[0],
                n = e[1],
                r = e[2],
                o = e[3];
            return Math.sqrt(t * t + n * n + r * r + o * o)
        }, u.len = u.length, u.squaredLength = function (e) {
            var t = e[0],
                n = e[1],
                r = e[2],
                o = e[3];
            return t * t + n * n + r * r + o * o
        }, u.sqrLen = u.squaredLength, u.negate = function (e, t) {
            return e[0] = -t[0], e[1] = -t[1], e[2] = -t[2], e[3] = -t[3], e
        }, u.normalize = function (e, t) {
            var n = t[0],
                r = t[1],
                o = t[2],
                i = t[3],
                a = n * n + r * r + o * o + i * i;
            return a > 0 && (a = 1 / Math.sqrt(a), e[0] = t[0] * a, e[1] = t[1] * a, e[2] = t[2] * a, e[3] = t[3] * a), e
        }, u.dot = function (e, t) {
            return e[0] * t[0] + e[1] * t[1] + e[2] * t[2] + e[3] * t[3]
        }, u.lerp = function (e, t, n, r) {
            var o = t[0],
                i = t[1],
                a = t[2],
                u = t[3];
            return e[0] = o + r * (n[0] - o), e[1] = i + r * (n[1] - i), e[2] = a + r * (n[2] - a), e[3] = u + r * (n[3] - u), e
        }, u.random = function (e, t) {
            return t = t || 1, e[0] = r(), e[1] = r(), e[2] = r(), e[3] = r(), u.normalize(e, e), u.scale(e, e, t), e
        }, u.transformMat4 = function (e, t, n) {
            var r = t[0],
                o = t[1],
                i = t[2],
                a = t[3];
            return e[0] = n[0] * r + n[4] * o + n[8] * i + n[12] * a, e[1] = n[1] * r + n[5] * o + n[9] * i + n[13] * a, e[2] = n[2] * r + n[6] * o + n[10] * i + n[14] * a, e[3] = n[3] * r + n[7] * o + n[11] * i + n[15] * a, e
        }, u.transformQuat = function (e, t, n) {
            var r = t[0],
                o = t[1],
                i = t[2],
                a = n[0],
                u = n[1],
                s = n[2],
                l = n[3],
                c = l * r + u * i - s * o,
                f = l * o + s * r - a * i,
                p = l * i + a * o - u * r,
                h = -a * r - u * o - s * i;
            return e[0] = c * l + h * -a + f * -s - p * -u, e[1] = f * l + h * -u + p * -a - c * -s, e[2] = p * l + h * -s + c * -u - f * -a, e
        }, u.forEach = function () {
            var e = u.create();
            return function (t, n, r, o, i, a) {
                var u, s;
                for (n || (n = 4), r || (r = 0), s = o ? Math.min(o * n + r, t.length) : t.length, u = r; s > u; u += n) e[0] = t[u], e[1] = t[u + 1], e[2] = t[u + 2], e[3] = t[u + 3], i(e, e, a), t[u] = e[0], t[u + 1] = e[1], t[u + 2] = e[2], t[u + 3] = e[3];
                return t
            }
        }(), u.str = function (e) {
            return "vec4(" + e[0] + ", " + e[1] + ", " + e[2] + ", " + e[3] + ")"
        }, "undefined" != typeof e && (e.vec4 = u);
        var s = {};
        s.create = function () {
            var e = new n(4);
            return e[0] = 1, e[1] = 0, e[2] = 0, e[3] = 1, e
        }, s.clone = function (e) {
            var t = new n(4);
            return t[0] = e[0], t[1] = e[1], t[2] = e[2], t[3] = e[3], t
        }, s.copy = function (e, t) {
            return e[0] = t[0], e[1] = t[1], e[2] = t[2], e[3] = t[3], e
        }, s.identity = function (e) {
            return e[0] = 1, e[1] = 0, e[2] = 0, e[3] = 1, e
        }, s.transpose = function (e, t) {
            if (e === t) {
                var n = t[1];
                e[1] = t[2], e[2] = n
            } else e[0] = t[0], e[1] = t[2], e[2] = t[1], e[3] = t[3];
            return e
        }, s.invert = function (e, t) {
            var n = t[0],
                r = t[1],
                o = t[2],
                i = t[3],
                a = n * i - o * r;
            return a ? (a = 1 / a, e[0] = i * a, e[1] = -r * a, e[2] = -o * a, e[3] = n * a, e) : null
        }, s.adjoint = function (e, t) {
            var n = t[0];
            return e[0] = t[3], e[1] = -t[1], e[2] = -t[2], e[3] = n, e
        }, s.determinant = function (e) {
            return e[0] * e[3] - e[2] * e[1]
        }, s.multiply = function (e, t, n) {
            var r = t[0],
                o = t[1],
                i = t[2],
                a = t[3],
                u = n[0],
                s = n[1],
                l = n[2],
                c = n[3];
            return e[0] = r * u + o * l, e[1] = r * s + o * c, e[2] = i * u + a * l, e[3] = i * s + a * c, e
        }, s.mul = s.multiply, s.rotate = function (e, t, n) {
            var r = t[0],
                o = t[1],
                i = t[2],
                a = t[3],
                u = Math.sin(n),
                s = Math.cos(n);
            return e[0] = r * s + o * u, e[1] = r * -u + o * s, e[2] = i * s + a * u, e[3] = i * -u + a * s, e
        }, s.scale = function (e, t, n) {
            var r = t[0],
                o = t[1],
                i = t[2],
                a = t[3],
                u = n[0],
                s = n[1];
            return e[0] = r * u, e[1] = o * s, e[2] = i * u, e[3] = a * s, e
        }, s.str = function (e) {
            return "mat2(" + e[0] + ", " + e[1] + ", " + e[2] + ", " + e[3] + ")"
        }, "undefined" != typeof e && (e.mat2 = s);
        var l = {};
        l.create = function () {
            var e = new n(6);
            return e[0] = 1, e[1] = 0, e[2] = 0, e[3] = 1, e[4] = 0, e[5] = 0, e
        }, l.clone = function (e) {
            var t = new n(6);
            return t[0] = e[0], t[1] = e[1], t[2] = e[2], t[3] = e[3], t[4] = e[4], t[5] = e[5], t
        }, l.copy = function (e, t) {
            return e[0] = t[0], e[1] = t[1], e[2] = t[2], e[3] = t[3], e[4] = t[4], e[5] = t[5], e
        }, l.identity = function (e) {
            return e[0] = 1, e[1] = 0, e[2] = 0, e[3] = 1, e[4] = 0, e[5] = 0, e
        }, l.invert = function (e, t) {
            var n = t[0],
                r = t[1],
                o = t[2],
                i = t[3],
                a = t[4],
                u = t[5],
                s = n * i - r * o;
            return s ? (s = 1 / s, e[0] = i * s, e[1] = -r * s, e[2] = -o * s, e[3] = n * s, e[4] = (o * u - i * a) * s, e[5] = (r * a - n * u) * s, e) : null
        }, l.determinant = function (e) {
            return e[0] * e[3] - e[1] * e[2]
        }, l.multiply = function (e, t, n) {
            var r = t[0],
                o = t[1],
                i = t[2],
                a = t[3],
                u = t[4],
                s = t[5],
                l = n[0],
                c = n[1],
                f = n[2],
                p = n[3],
                h = n[4],
                d = n[5];
            return e[0] = r * l + o * f, e[1] = r * c + o * p, e[2] = i * l + a * f, e[3] = i * c + a * p, e[4] = l * u + f * s + h, e[5] = c * u + p * s + d, e
        }, l.mul = l.multiply, l.rotate = function (e, t, n) {
            var r = t[0],
                o = t[1],
                i = t[2],
                a = t[3],
                u = t[4],
                s = t[5],
                l = Math.sin(n),
                c = Math.cos(n);
            return e[0] = r * c + o * l, e[1] = -r * l + o * c, e[2] = i * c + a * l, e[3] = -i * l + c * a, e[4] = c * u + l * s, e[5] = c * s - l * u, e
        }, l.scale = function (e, t, n) {
            var r = n[0],
                o = n[1];
            return e[0] = t[0] * r, e[1] = t[1] * o, e[2] = t[2] * r, e[3] = t[3] * o, e[4] = t[4] * r, e[5] = t[5] * o, e
        }, l.translate = function (e, t, n) {
            return e[0] = t[0], e[1] = t[1], e[2] = t[2], e[3] = t[3], e[4] = t[4] + n[0], e[5] = t[5] + n[1], e
        }, l.str = function (e) {
            return "mat2d(" + e[0] + ", " + e[1] + ", " + e[2] + ", " + e[3] + ", " + e[4] + ", " + e[5] + ")"
        }, "undefined" != typeof e && (e.mat2d = l);
        var c = {};
        c.create = function () {
            var e = new n(9);
            return e[0] = 1, e[1] = 0, e[2] = 0, e[3] = 0, e[4] = 1, e[5] = 0, e[6] = 0, e[7] = 0, e[8] = 1, e
        }, c.fromMat4 = function (e, t) {
            return e[0] = t[0], e[1] = t[1], e[2] = t[2], e[3] = t[4], e[4] = t[5], e[5] = t[6], e[6] = t[8], e[7] = t[9], e[8] = t[10], e
        }, c.clone = function (e) {
            var t = new n(9);
            return t[0] = e[0], t[1] = e[1], t[2] = e[2], t[3] = e[3], t[4] = e[4], t[5] = e[5], t[6] = e[6], t[7] = e[7], t[8] = e[8], t
        }, c.copy = function (e, t) {
            return e[0] = t[0], e[1] = t[1], e[2] = t[2], e[3] = t[3], e[4] = t[4], e[5] = t[5], e[6] = t[6], e[7] = t[7], e[8] = t[8], e
        }, c.identity = function (e) {
            return e[0] = 1, e[1] = 0, e[2] = 0, e[3] = 0, e[4] = 1, e[5] = 0, e[6] = 0, e[7] = 0, e[8] = 1, e
        }, c.transpose = function (e, t) {
            if (e === t) {
                var n = t[1],
                    r = t[2],
                    o = t[5];
                e[1] = t[3], e[2] = t[6], e[3] = n, e[5] = t[7], e[6] = r, e[7] = o
            } else e[0] = t[0], e[1] = t[3], e[2] = t[6], e[3] = t[1], e[4] = t[4], e[5] = t[7], e[6] = t[2], e[7] = t[5], e[8] = t[8];
            return e
        }, c.invert = function (e, t) {
            var n = t[0],
                r = t[1],
                o = t[2],
                i = t[3],
                a = t[4],
                u = t[5],
                s = t[6],
                l = t[7],
                c = t[8],
                f = c * a - u * l,
                p = -c * i + u * s,
                h = l * i - a * s,
                d = n * f + r * p + o * h;
            return d ? (d = 1 / d, e[0] = f * d, e[1] = (-c * r + o * l) * d, e[2] = (u * r - o * a) * d, e[3] = p * d, e[4] = (c * n - o * s) * d, e[5] = (-u * n + o * i) * d, e[6] = h * d, e[7] = (-l * n + r * s) * d, e[8] = (a * n - r * i) * d, e) : null
        }, c.adjoint = function (e, t) {
            var n = t[0],
                r = t[1],
                o = t[2],
                i = t[3],
                a = t[4],
                u = t[5],
                s = t[6],
                l = t[7],
                c = t[8];
            return e[0] = a * c - u * l, e[1] = o * l - r * c, e[2] = r * u - o * a, e[3] = u * s - i * c, e[4] = n * c - o * s, e[5] = o * i - n * u, e[6] = i * l - a * s, e[7] = r * s - n * l, e[8] = n * a - r * i, e
        }, c.determinant = function (e) {
            var t = e[0],
                n = e[1],
                r = e[2],
                o = e[3],
                i = e[4],
                a = e[5],
                u = e[6],
                s = e[7],
                l = e[8];
            return t * (l * i - a * s) + n * (-l * o + a * u) + r * (s * o - i * u)
        }, c.multiply = function (e, t, n) {
            var r = t[0],
                o = t[1],
                i = t[2],
                a = t[3],
                u = t[4],
                s = t[5],
                l = t[6],
                c = t[7],
                f = t[8],
                p = n[0],
                h = n[1],
                d = n[2],
                g = n[3],
                m = n[4],
                v = n[5],
                y = n[6],
                b = n[7],
                _ = n[8];
            return e[0] = p * r + h * a + d * l, e[1] = p * o + h * u + d * c, e[2] = p * i + h * s + d * f, e[3] = g * r + m * a + v * l, e[4] = g * o + m * u + v * c, e[5] = g * i + m * s + v * f, e[6] = y * r + b * a + _ * l, e[7] = y * o + b * u + _ * c, e[8] = y * i + b * s + _ * f, e
        }, c.mul = c.multiply, c.translate = function (e, t, n) {
            var r = t[0],
                o = t[1],
                i = t[2],
                a = t[3],
                u = t[4],
                s = t[5],
                l = t[6],
                c = t[7],
                f = t[8],
                p = n[0],
                h = n[1];
            return e[0] = r, e[1] = o, e[2] = i, e[3] = a, e[4] = u, e[5] = s, e[6] = p * r + h * a + l, e[7] = p * o + h * u + c, e[8] = p * i + h * s + f, e
        }, c.rotate = function (e, t, n) {
            var r = t[0],
                o = t[1],
                i = t[2],
                a = t[3],
                u = t[4],
                s = t[5],
                l = t[6],
                c = t[7],
                f = t[8],
                p = Math.sin(n),
                h = Math.cos(n);
            return e[0] = h * r + p * a, e[1] = h * o + p * u, e[2] = h * i + p * s, e[3] = h * a - p * r, e[4] = h * u - p * o, e[5] = h * s - p * i, e[6] = l, e[7] = c, e[8] = f, e
        }, c.scale = function (e, t, n) {
            var r = n[0],
                o = n[1];
            return e[0] = r * t[0], e[1] = r * t[1], e[2] = r * t[2], e[3] = o * t[3], e[4] = o * t[4], e[5] = o * t[5], e[6] = t[6], e[7] = t[7], e[8] = t[8], e
        }, c.fromMat2d = function (e, t) {
            return e[0] = t[0], e[1] = t[1], e[2] = 0, e[3] = t[2], e[4] = t[3], e[5] = 0, e[6] = t[4], e[7] = t[5], e[8] = 1, e
        }, c.fromQuat = function (e, t) {
            var n = t[0],
                r = t[1],
                o = t[2],
                i = t[3],
                a = n + n,
                u = r + r,
                s = o + o,
                l = n * a,
                c = n * u,
                f = n * s,
                p = r * u,
                h = r * s,
                d = o * s,
                g = i * a,
                m = i * u,
                v = i * s;
            return e[0] = 1 - (p + d), e[3] = c + v, e[6] = f - m, e[1] = c - v, e[4] = 1 - (l + d), e[7] = h + g, e[2] = f + m, e[5] = h - g, e[8] = 1 - (l + p), e
        }, c.normalFromMat4 = function (e, t) {
            var n = t[0],
                r = t[1],
                o = t[2],
                i = t[3],
                a = t[4],
                u = t[5],
                s = t[6],
                l = t[7],
                c = t[8],
                f = t[9],
                p = t[10],
                h = t[11],
                d = t[12],
                g = t[13],
                m = t[14],
                v = t[15],
                y = n * u - r * a,
                b = n * s - o * a,
                _ = n * l - i * a,
                x = r * s - o * u,
                T = r * l - i * u,
                w = o * l - i * s,
                E = c * g - f * d,
                A = c * m - p * d,
                C = c * v - h * d,
                k = f * m - p * g,
                R = f * v - h * g,
                S = p * v - h * m,
                N = y * S - b * R + _ * k + x * C - T * A + w * E;
            return N ? (N = 1 / N, e[0] = (u * S - s * R + l * k) * N, e[1] = (s * C - a * S - l * A) * N, e[2] = (a * R - u * C + l * E) * N, e[3] = (o * R - r * S - i * k) * N, e[4] = (n * S - o * C + i * A) * N, e[5] = (r * C - n * R - i * E) * N, e[6] = (g * w - m * T + v * x) * N, e[7] = (m * _ - d * w - v * b) * N, e[8] = (d * T - g * _ + v * y) * N, e) : null
        }, c.str = function (e) {
            return "mat3(" + e[0] + ", " + e[1] + ", " + e[2] + ", " + e[3] + ", " + e[4] + ", " + e[5] + ", " + e[6] + ", " + e[7] + ", " + e[8] + ")"
        }, "undefined" != typeof e && (e.mat3 = c);
        var f = {};
        f.create = function () {
            var e = new n(16);
            return e[0] = 1, e[1] = 0, e[2] = 0, e[3] = 0, e[4] = 0, e[5] = 1, e[6] = 0, e[7] = 0, e[8] = 0, e[9] = 0, e[10] = 1, e[11] = 0, e[12] = 0, e[13] = 0, e[14] = 0, e[15] = 1, e
        }, f.clone = function (e) {
            var t = new n(16);
            return t[0] = e[0], t[1] = e[1], t[2] = e[2], t[3] = e[3], t[4] = e[4], t[5] = e[5], t[6] = e[6], t[7] = e[7], t[8] = e[8], t[9] = e[9], t[10] = e[10], t[11] = e[11], t[12] = e[12], t[13] = e[13], t[14] = e[14], t[15] = e[15], t
        }, f.copy = function (e, t) {
            return e[0] = t[0], e[1] = t[1], e[2] = t[2], e[3] = t[3], e[4] = t[4], e[5] = t[5], e[6] = t[6], e[7] = t[7], e[8] = t[8], e[9] = t[9], e[10] = t[10], e[11] = t[11], e[12] = t[12], e[13] = t[13], e[14] = t[14], e[15] = t[15], e
        }, f.identity = function (e) {
            return e[0] = 1, e[1] = 0, e[2] = 0, e[3] = 0, e[4] = 0, e[5] = 1, e[6] = 0, e[7] = 0, e[8] = 0, e[9] = 0, e[10] = 1, e[11] = 0, e[12] = 0, e[13] = 0, e[14] = 0, e[15] = 1, e
        }, f.transpose = function (e, t) {
            if (e === t) {
                var n = t[1],
                    r = t[2],
                    o = t[3],
                    i = t[6],
                    a = t[7],
                    u = t[11];
                e[1] = t[4], e[2] = t[8], e[3] = t[12], e[4] = n, e[6] = t[9], e[7] = t[13], e[8] = r, e[9] = i, e[11] = t[14], e[12] = o, e[13] = a, e[14] = u
            } else e[0] = t[0], e[1] = t[4], e[2] = t[8], e[3] = t[12], e[4] = t[1], e[5] = t[5], e[6] = t[9], e[7] = t[13], e[8] = t[2], e[9] = t[6], e[10] = t[10], e[11] = t[14], e[12] = t[3], e[13] = t[7], e[14] = t[11], e[15] = t[15];
            return e
        }, f.invert = function (e, t) {
            var n = t[0],
                r = t[1],
                o = t[2],
                i = t[3],
                a = t[4],
                u = t[5],
                s = t[6],
                l = t[7],
                c = t[8],
                f = t[9],
                p = t[10],
                h = t[11],
                d = t[12],
                g = t[13],
                m = t[14],
                v = t[15],
                y = n * u - r * a,
                b = n * s - o * a,
                _ = n * l - i * a,
                x = r * s - o * u,
                T = r * l - i * u,
                w = o * l - i * s,
                E = c * g - f * d,
                A = c * m - p * d,
                C = c * v - h * d,
                k = f * m - p * g,
                R = f * v - h * g,
                S = p * v - h * m,
                N = y * S - b * R + _ * k + x * C - T * A + w * E;
            return N ? (N = 1 / N, e[0] = (u * S - s * R + l * k) * N, e[1] = (o * R - r * S - i * k) * N, e[2] = (g * w - m * T + v * x) * N, e[3] = (p * T - f * w - h * x) * N, e[4] = (s * C - a * S - l * A) * N, e[5] = (n * S - o * C + i * A) * N, e[6] = (m * _ - d * w - v * b) * N, e[7] = (c * w - p * _ + h * b) * N, e[8] = (a * R - u * C + l * E) * N, e[9] = (r * C - n * R - i * E) * N, e[10] = (d * T - g * _ + v * y) * N, e[11] = (f * _ - c * T - h * y) * N, e[12] = (u * A - a * k - s * E) * N, e[13] = (n * k - r * A + o * E) * N, e[14] = (g * b - d * x - m * y) * N, e[15] = (c * x - f * b + p * y) * N, e) : null
        }, f.adjoint = function (e, t) {
            var n = t[0],
                r = t[1],
                o = t[2],
                i = t[3],
                a = t[4],
                u = t[5],
                s = t[6],
                l = t[7],
                c = t[8],
                f = t[9],
                p = t[10],
                h = t[11],
                d = t[12],
                g = t[13],
                m = t[14],
                v = t[15];
            return e[0] = u * (p * v - h * m) - f * (s * v - l * m) + g * (s * h - l * p), e[1] = -(r * (p * v - h * m) - f * (o * v - i * m) + g * (o * h - i * p)), e[2] = r * (s * v - l * m) - u * (o * v - i * m) + g * (o * l - i * s), e[3] = -(r * (s * h - l * p) - u * (o * h - i * p) + f * (o * l - i * s)), e[4] = -(a * (p * v - h * m) - c * (s * v - l * m) + d * (s * h - l * p)), e[5] = n * (p * v - h * m) - c * (o * v - i * m) + d * (o * h - i * p), e[6] = -(n * (s * v - l * m) - a * (o * v - i * m) + d * (o * l - i * s)), e[7] = n * (s * h - l * p) - a * (o * h - i * p) + c * (o * l - i * s), e[8] = a * (f * v - h * g) - c * (u * v - l * g) + d * (u * h - l * f), e[9] = -(n * (f * v - h * g) - c * (r * v - i * g) + d * (r * h - i * f)), e[10] = n * (u * v - l * g) - a * (r * v - i * g) + d * (r * l - i * u), e[11] = -(n * (u * h - l * f) - a * (r * h - i * f) + c * (r * l - i * u)), e[12] = -(a * (f * m - p * g) - c * (u * m - s * g) + d * (u * p - s * f)), e[13] = n * (f * m - p * g) - c * (r * m - o * g) + d * (r * p - o * f), e[14] = -(n * (u * m - s * g) - a * (r * m - o * g) + d * (r * s - o * u)), e[15] = n * (u * p - s * f) - a * (r * p - o * f) + c * (r * s - o * u), e
        }, f.determinant = function (e) {
            var t = e[0],
                n = e[1],
                r = e[2],
                o = e[3],
                i = e[4],
                a = e[5],
                u = e[6],
                s = e[7],
                l = e[8],
                c = e[9],
                f = e[10],
                p = e[11],
                h = e[12],
                d = e[13],
                g = e[14],
                m = e[15],
                v = t * a - n * i,
                y = t * u - r * i,
                b = t * s - o * i,
                _ = n * u - r * a,
                x = n * s - o * a,
                T = r * s - o * u,
                w = l * d - c * h,
                E = l * g - f * h,
                A = l * m - p * h,
                C = c * g - f * d,
                k = c * m - p * d,
                R = f * m - p * g;
            return v * R - y * k + b * C + _ * A - x * E + T * w
        }, f.multiply = function (e, t, n) {
            var r = t[0],
                o = t[1],
                i = t[2],
                a = t[3],
                u = t[4],
                s = t[5],
                l = t[6],
                c = t[7],
                f = t[8],
                p = t[9],
                h = t[10],
                d = t[11],
                g = t[12],
                m = t[13],
                v = t[14],
                y = t[15],
                b = n[0],
                _ = n[1],
                x = n[2],
                T = n[3];
            return e[0] = b * r + _ * u + x * f + T * g, e[1] = b * o + _ * s + x * p + T * m, e[2] = b * i + _ * l + x * h + T * v, e[3] = b * a + _ * c + x * d + T * y, b = n[4], _ = n[5], x = n[6], T = n[7], e[4] = b * r + _ * u + x * f + T * g, e[5] = b * o + _ * s + x * p + T * m, e[6] = b * i + _ * l + x * h + T * v, e[7] = b * a + _ * c + x * d + T * y, b = n[8], _ = n[9], x = n[10], T = n[11], e[8] = b * r + _ * u + x * f + T * g, e[9] = b * o + _ * s + x * p + T * m, e[10] = b * i + _ * l + x * h + T * v, e[11] = b * a + _ * c + x * d + T * y, b = n[12], _ = n[13], x = n[14], T = n[15], e[12] = b * r + _ * u + x * f + T * g, e[13] = b * o + _ * s + x * p + T * m, e[14] = b * i + _ * l + x * h + T * v, e[15] = b * a + _ * c + x * d + T * y, e
        }, f.mul = f.multiply, f.translate = function (e, t, n) {
            var r, o, i, a, u, s, l, c, f, p, h, d, g = n[0],
                m = n[1],
                v = n[2];
            return t === e ? (e[12] = t[0] * g + t[4] * m + t[8] * v + t[12], e[13] = t[1] * g + t[5] * m + t[9] * v + t[13], e[14] = t[2] * g + t[6] * m + t[10] * v + t[14], e[15] = t[3] * g + t[7] * m + t[11] * v + t[15]) : (r = t[0], o = t[1], i = t[2], a = t[3], u = t[4], s = t[5], l = t[6], c = t[7], f = t[8], p = t[9], h = t[10], d = t[11], e[0] = r, e[1] = o, e[2] = i, e[3] = a, e[4] = u, e[5] = s, e[6] = l, e[7] = c, e[8] = f, e[9] = p, e[10] = h, e[11] = d, e[12] = r * g + u * m + f * v + t[12], e[13] = o * g + s * m + p * v + t[13], e[14] = i * g + l * m + h * v + t[14], e[15] = a * g + c * m + d * v + t[15]), e
        }, f.scale = function (e, t, n) {
            var r = n[0],
                o = n[1],
                i = n[2];
            return e[0] = t[0] * r, e[1] = t[1] * r, e[2] = t[2] * r, e[3] = t[3] * r, e[4] = t[4] * o, e[5] = t[5] * o, e[6] = t[6] * o, e[7] = t[7] * o, e[8] = t[8] * i, e[9] = t[9] * i, e[10] = t[10] * i, e[11] = t[11] * i, e[12] = t[12], e[13] = t[13], e[14] = t[14], e[15] = t[15], e
        }, f.rotate = function (e, n, r, o) {
            var i, a, u, s, l, c, f, p, h, d, g, m, v, y, b, _, x, T, w, E, A, C, k, R, S = o[0],
                N = o[1],
                D = o[2],
                M = Math.sqrt(S * S + N * N + D * D);
            return Math.abs(M) < t ? null : (M = 1 / M, S *= M, N *= M, D *= M, i = Math.sin(r), a = Math.cos(r), u = 1 - a, s = n[0], l = n[1], c = n[2], f = n[3], p = n[4], h = n[5], d = n[6], g = n[7], m = n[8], v = n[9], y = n[10], b = n[11], _ = S * S * u + a, x = N * S * u + D * i, T = D * S * u - N * i, w = S * N * u - D * i, E = N * N * u + a, A = D * N * u + S * i, C = S * D * u + N * i, k = N * D * u - S * i, R = D * D * u + a, e[0] = s * _ + p * x + m * T, e[1] = l * _ + h * x + v * T, e[2] = c * _ + d * x + y * T, e[3] = f * _ + g * x + b * T, e[4] = s * w + p * E + m * A, e[5] = l * w + h * E + v * A, e[6] = c * w + d * E + y * A, e[7] = f * w + g * E + b * A, e[8] = s * C + p * k + m * R, e[9] = l * C + h * k + v * R, e[10] = c * C + d * k + y * R, e[11] = f * C + g * k + b * R, n !== e && (e[12] = n[12], e[13] = n[13], e[14] = n[14], e[15] = n[15]), e)
        }, f.rotateX = function (e, t, n) {
            var r = Math.sin(n),
                o = Math.cos(n),
                i = t[4],
                a = t[5],
                u = t[6],
                s = t[7],
                l = t[8],
                c = t[9],
                f = t[10],
                p = t[11];
            return t !== e && (e[0] = t[0], e[1] = t[1], e[2] = t[2], e[3] = t[3], e[12] = t[12], e[13] = t[13], e[14] = t[14], e[15] = t[15]), e[4] = i * o + l * r, e[5] = a * o + c * r, e[6] = u * o + f * r, e[7] = s * o + p * r, e[8] = l * o - i * r, e[9] = c * o - a * r, e[10] = f * o - u * r, e[11] = p * o - s * r, e
        }, f.rotateY = function (e, t, n) {
            var r = Math.sin(n),
                o = Math.cos(n),
                i = t[0],
                a = t[1],
                u = t[2],
                s = t[3],
                l = t[8],
                c = t[9],
                f = t[10],
                p = t[11];
            return t !== e && (e[4] = t[4], e[5] = t[5], e[6] = t[6], e[7] = t[7], e[12] = t[12], e[13] = t[13], e[14] = t[14], e[15] = t[15]), e[0] = i * o - l * r, e[1] = a * o - c * r, e[2] = u * o - f * r, e[3] = s * o - p * r, e[8] = i * r + l * o, e[9] = a * r + c * o, e[10] = u * r + f * o, e[11] = s * r + p * o, e
        }, f.rotateZ = function (e, t, n) {
            var r = Math.sin(n),
                o = Math.cos(n),
                i = t[0],
                a = t[1],
                u = t[2],
                s = t[3],
                l = t[4],
                c = t[5],
                f = t[6],
                p = t[7];
            return t !== e && (e[8] = t[8], e[9] = t[9], e[10] = t[10], e[11] = t[11], e[12] = t[12], e[13] = t[13], e[14] = t[14], e[15] = t[15]), e[0] = i * o + l * r, e[1] = a * o + c * r, e[2] = u * o + f * r, e[3] = s * o + p * r, e[4] = l * o - i * r, e[5] = c * o - a * r, e[6] = f * o - u * r, e[7] = p * o - s * r, e
        }, f.fromRotationTranslation = function (e, t, n) {
            var r = t[0],
                o = t[1],
                i = t[2],
                a = t[3],
                u = r + r,
                s = o + o,
                l = i + i,
                c = r * u,
                f = r * s,
                p = r * l,
                h = o * s,
                d = o * l,
                g = i * l,
                m = a * u,
                v = a * s,
                y = a * l;
            return e[0] = 1 - (h + g), e[1] = f + y, e[2] = p - v, e[3] = 0, e[4] = f - y, e[5] = 1 - (c + g), e[6] = d + m, e[7] = 0, e[8] = p + v, e[9] = d - m, e[10] = 1 - (c + h), e[11] = 0, e[12] = n[0], e[13] = n[1], e[14] = n[2], e[15] = 1, e
        }, f.fromQuat = function (e, t) {
            var n = t[0],
                r = t[1],
                o = t[2],
                i = t[3],
                a = n + n,
                u = r + r,
                s = o + o,
                l = n * a,
                c = n * u,
                f = n * s,
                p = r * u,
                h = r * s,
                d = o * s,
                g = i * a,
                m = i * u,
                v = i * s;
            return e[0] = 1 - (p + d), e[1] = c + v, e[2] = f - m, e[3] = 0, e[4] = c - v, e[5] = 1 - (l + d), e[6] = h + g, e[7] = 0, e[8] = f + m, e[9] = h - g, e[10] = 1 - (l + p), e[11] = 0, e[12] = 0, e[13] = 0, e[14] = 0, e[15] = 1, e
        }, f.frustum = function (e, t, n, r, o, i, a) {
            var u = 1 / (n - t),
                s = 1 / (o - r),
                l = 1 / (i - a);
            return e[0] = 2 * i * u, e[1] = 0, e[2] = 0, e[3] = 0, e[4] = 0, e[5] = 2 * i * s, e[6] = 0, e[7] = 0, e[8] = (n + t) * u, e[9] = (o + r) * s, e[10] = (a + i) * l, e[11] = -1, e[12] = 0, e[13] = 0, e[14] = a * i * 2 * l, e[15] = 0, e
        }, f.perspective = function (e, t, n, r, o) {
            var i = 1 / Math.tan(t / 2),
                a = 1 / (r - o);
            return e[0] = i / n, e[1] = 0, e[2] = 0, e[3] = 0, e[4] = 0, e[5] = i, e[6] = 0, e[7] = 0, e[8] = 0, e[9] = 0, e[10] = (o + r) * a, e[11] = -1, e[12] = 0, e[13] = 0, e[14] = 2 * o * r * a, e[15] = 0, e
        }, f.ortho = function (e, t, n, r, o, i, a) {
            var u = 1 / (t - n),
                s = 1 / (r - o),
                l = 1 / (i - a);
            return e[0] = -2 * u, e[1] = 0, e[2] = 0, e[3] = 0, e[4] = 0, e[5] = -2 * s, e[6] = 0, e[7] = 0, e[8] = 0, e[9] = 0, e[10] = 2 * l, e[11] = 0, e[12] = (t + n) * u, e[13] = (o + r) * s, e[14] = (a + i) * l, e[15] = 1, e
        }, f.lookAt = function (e, n, r, o) {
            var i, a, u, s, l, c, p, h, d, g, m = n[0],
                v = n[1],
                y = n[2],
                b = o[0],
                _ = o[1],
                x = o[2],
                T = r[0],
                w = r[1],
                E = r[2];
            return Math.abs(m - T) < t && Math.abs(v - w) < t && Math.abs(y - E) < t ? f.identity(e) : (p = m - T, h = v - w, d = y - E, g = 1 / Math.sqrt(p * p + h * h + d * d), p *= g, h *= g, d *= g, i = _ * d - x * h, a = x * p - b * d, u = b * h - _ * p, g = Math.sqrt(i * i + a * a + u * u), g ? (g = 1 / g, i *= g, a *= g, u *= g) : (i = 0, a = 0, u = 0), s = h * u - d * a, l = d * i - p * u, c = p * a - h * i, g = Math.sqrt(s * s + l * l + c * c), g ? (g = 1 / g, s *= g, l *= g, c *= g) : (s = 0, l = 0, c = 0), e[0] = i, e[1] = s, e[2] = p, e[3] = 0, e[4] = a, e[5] = l, e[6] = h, e[7] = 0, e[8] = u, e[9] = c, e[10] = d, e[11] = 0, e[12] = -(i * m + a * v + u * y), e[13] = -(s * m + l * v + c * y), e[14] = -(p * m + h * v + d * y), e[15] = 1, e)
        }, f.str = function (e) {
            return "mat4(" + e[0] + ", " + e[1] + ", " + e[2] + ", " + e[3] + ", " + e[4] + ", " + e[5] + ", " + e[6] + ", " + e[7] + ", " + e[8] + ", " + e[9] + ", " + e[10] + ", " + e[11] + ", " + e[12] + ", " + e[13] + ", " + e[14] + ", " + e[15] + ")"
        }, "undefined" != typeof e && (e.mat4 = f);
        var p = {};
        p.create = function () {
            var e = new n(4);
            return e[0] = 0, e[1] = 0, e[2] = 0, e[3] = 1, e
        }, p.rotationTo = function () {
            var e = a.create(),
                t = a.fromValues(1, 0, 0),
                n = a.fromValues(0, 1, 0);
            return function (r, o, i) {
                var u = a.dot(o, i);
                return -.999999 > u ? (a.cross(e, t, o), a.length(e) < 1e-6 && a.cross(e, n, o), a.normalize(e, e), p.setAxisAngle(r, e, Math.PI), r) : u > .999999 ? (r[0] = 0, r[1] = 0, r[2] = 0, r[3] = 1, r) : (a.cross(e, o, i), r[0] = e[0], r[1] = e[1], r[2] = e[2], r[3] = 1 + u, p.normalize(r, r))
            }
        }(), p.setAxes = function () {
            var e = c.create();
            return function (t, n, r, o) {
                return e[0] = r[0], e[3] = r[1], e[6] = r[2], e[1] = o[0], e[4] = o[1], e[7] = o[2], e[2] = n[0], e[5] = n[1], e[8] = n[2], p.normalize(t, p.fromMat3(t, e))
            }
        }(), p.clone = u.clone, p.fromValues = u.fromValues, p.copy = u.copy, p.set = u.set, p.identity = function (e) {
            return e[0] = 0, e[1] = 0, e[2] = 0, e[3] = 1, e
        }, p.setAxisAngle = function (e, t, n) {
            n = .5 * n;
            var r = Math.sin(n);
            return e[0] = r * t[0], e[1] = r * t[1], e[2] = r * t[2], e[3] = Math.cos(n), e
        }, p.add = u.add, p.multiply = function (e, t, n) {
            var r = t[0],
                o = t[1],
                i = t[2],
                a = t[3],
                u = n[0],
                s = n[1],
                l = n[2],
                c = n[3];
            return e[0] = r * c + a * u + o * l - i * s, e[1] = o * c + a * s + i * u - r * l, e[2] = i * c + a * l + r * s - o * u, e[3] = a * c - r * u - o * s - i * l, e
        }, p.mul = p.multiply, p.scale = u.scale, p.rotateX = function (e, t, n) {
            n *= .5;
            var r = t[0],
                o = t[1],
                i = t[2],
                a = t[3],
                u = Math.sin(n),
                s = Math.cos(n);
            return e[0] = r * s + a * u, e[1] = o * s + i * u, e[2] = i * s - o * u, e[3] = a * s - r * u, e
        }, p.rotateY = function (e, t, n) {
            n *= .5;
            var r = t[0],
                o = t[1],
                i = t[2],
                a = t[3],
                u = Math.sin(n),
                s = Math.cos(n);
            return e[0] = r * s - i * u, e[1] = o * s + a * u, e[2] = i * s + r * u, e[3] = a * s - o * u, e
        }, p.rotateZ = function (e, t, n) {
            n *= .5;
            var r = t[0],
                o = t[1],
                i = t[2],
                a = t[3],
                u = Math.sin(n),
                s = Math.cos(n);
            return e[0] = r * s + o * u, e[1] = o * s - r * u, e[2] = i * s + a * u, e[3] = a * s - i * u, e
        }, p.calculateW = function (e, t) {
            var n = t[0],
                r = t[1],
                o = t[2];
            return e[0] = n, e[1] = r, e[2] = o, e[3] = -Math.sqrt(Math.abs(1 - n * n - r * r - o * o)), e
        }, p.dot = u.dot, p.lerp = u.lerp, p.slerp = function (e, t, n, r) {
            var o, i, a, u, s, l = t[0],
                c = t[1],
                f = t[2],
                p = t[3],
                h = n[0],
                d = n[1],
                g = n[2],
                m = n[3];
            return i = l * h + c * d + f * g + p * m, 0 > i && (i = -i, h = -h, d = -d, g = -g, m = -m), 1 - i > 1e-6 ? (o = Math.acos(i), a = Math.sin(o), u = Math.sin((1 - r) * o) / a, s = Math.sin(r * o) / a) : (u = 1 - r, s = r), e[0] = u * l + s * h, e[1] = u * c + s * d, e[2] = u * f + s * g, e[3] = u * p + s * m, e
        }, p.invert = function (e, t) {
            var n = t[0],
                r = t[1],
                o = t[2],
                i = t[3],
                a = n * n + r * r + o * o + i * i,
                u = a ? 1 / a : 0;
            return e[0] = -n * u, e[1] = -r * u, e[2] = -o * u, e[3] = i * u, e
        }, p.conjugate = function (e, t) {
            return e[0] = -t[0], e[1] = -t[1], e[2] = -t[2], e[3] = t[3], e
        }, p.length = u.length, p.len = p.length, p.squaredLength = u.squaredLength, p.sqrLen = p.squaredLength, p.normalize = u.normalize, p.fromMat3 = function () {
            var e = "undefined" != typeof Int8Array ? new Int8Array([1, 2, 0]) : [1, 2, 0];
            return function (t, n) {
                var r, o = n[0] + n[4] + n[8];
                if (o > 0) r = Math.sqrt(o + 1), t[3] = .5 * r, r = .5 / r, t[0] = (n[7] - n[5]) * r, t[1] = (n[2] - n[6]) * r, t[2] = (n[3] - n[1]) * r;
                else {
                    var i = 0;
                    n[4] > n[0] && (i = 1), n[8] > n[3 * i + i] && (i = 2);
                    var a = e[i],
                        u = e[a];
                    r = Math.sqrt(n[3 * i + i] - n[3 * a + a] - n[3 * u + u] + 1), t[i] = .5 * r, r = .5 / r, t[3] = (n[3 * u + a] - n[3 * a + u]) * r, t[a] = (n[3 * a + i] + n[3 * i + a]) * r, t[u] = (n[3 * u + i] + n[3 * i + u]) * r
                }
                return t
            }
        }(), p.str = function (e) {
            return "quat(" + e[0] + ", " + e[1] + ", " + e[2] + ", " + e[3] + ")"
        }, "undefined" != typeof e && (e.quat = p)
    }(t.exports)
}(this),
function (e, t) {
    "use strict";
    "object" == typeof exports ? module.exports = t() : "function" == typeof define && define.amd ? define(t) : e.MersenneTwister = t()
}(this, function () {
    "use strict";
    var e = 4294967296,
        t = 624,
        n = 397,
        r = 2147483648,
        o = 2147483647,
        i = 2567483615,
        a = function (e) {
            "undefined" == typeof e && (e = (new Date).getTime()), this.mt = new Array(t), this.mti = t + 1, this.seed(e)
        };
    a.prototype.seed = function (e) {
        var n;
        for (this.mt[0] = e >>> 0, this.mti = 1; this.mti < t; this.mti++) n = this.mt[this.mti - 1] ^ this.mt[this.mti - 1] >>> 30, this.mt[this.mti] = (1812433253 * ((4294901760 & n) >>> 16) << 16) + 1812433253 * (65535 & n) + this.mti, this.mt[this.mti] >>>= 0
    }, a.prototype.seedArray = function (e) {
        var n, r = 1,
            o = 0,
            i = t > e.length ? t : e.length;
        for (this.seed(19650218); i > 0; i--) n = this.mt[r - 1] ^ this.mt[r - 1] >>> 30, this.mt[r] = (this.mt[r] ^ (1664525 * ((4294901760 & n) >>> 16) << 16) + 1664525 * (65535 & n)) + e[o] + o, this.mt[r] >>>= 0, r++, o++, r >= t && (this.mt[0] = this.mt[t - 1], r = 1), o >= e.length && (o = 0);
        for (i = t - 1; i; i--) n = this.mt[r - 1] ^ this.mt[r - 1] >>> 30, this.mt[r] = (this.mt[r] ^ (1566083941 * ((4294901760 & n) >>> 16) << 16) + 1566083941 * (65535 & n)) - r, this.mt[r] >>>= 0, r++, r >= t && (this.mt[0] = this.mt[t - 1], r = 1);
        this.mt[0] = 2147483648
    }, a.prototype.int = function () {
        var e, a, u = new Array(0, i);
        if (this.mti >= t) {
            for (this.mti === t + 1 && this.seed(5489), a = 0; t - n > a; a++) e = this.mt[a] & r | this.mt[a + 1] & o, this.mt[a] = this.mt[a + n] ^ e >>> 1 ^ u[1 & e];
            for (; t - 1 > a; a++) e = this.mt[a] & r | this.mt[a + 1] & o, this.mt[a] = this.mt[a + (n - t)] ^ e >>> 1 ^ u[1 & e];
            e = this.mt[t - 1] & r | this.mt[0] & o, this.mt[t - 1] = this.mt[n - 1] ^ e >>> 1 ^ u[1 & e], this.mti = 0
        }
        return e = this.mt[this.mti++], e ^= e >>> 11, e ^= e << 7 & 2636928640, e ^= e << 15 & 4022730752, e ^= e >>> 18, e >>> 0
    }, a.prototype.int31 = function () {
        return this.int() >>> 1
    }, a.prototype.real = function () {
        return this.int() * (1 / (e - 1))
    }, a.prototype.realx = function () {
        return (this.int() + .5) * (1 / e)
    }, a.prototype.rnd = function () {
        return this.int() * (1 / e)
    }, a.prototype.rndHiRes = function () {
        var e = this.int() >>> 5,
            t = this.int() >>> 6;
        return (67108864 * e + t) * (1 / 9007199254740992)
    };
    var u = new a;
    return a.random = function () {
        return u.rnd()
    }, a
}),
    function(e) {
        function t(e, t, n) {
            this.x = e, this.y = t, this.z = n
        }

        function n(e) {
            return e * e * e * (e * (6 * e - 15) + 10)
        }

        function r(e, t, n) {
            return (1 - n) * e + n * t
        }
        var o = e.noise = {};
        t.prototype.dot2 = function(e, t) {
            return this.x * e + this.y * t
        }, t.prototype.dot3 = function(e, t, n) {
            return this.x * e + this.y * t + this.z * n
        };
        var i = [new t(1, 1, 0), new t(-1, 1, 0), new t(1, -1, 0), new t(-1, -1, 0), new t(1, 0, 1), new t(-1, 0, 1), new t(1, 0, -1), new t(-1, 0, -1), new t(0, 1, 1), new t(0, -1, 1), new t(0, 1, -1), new t(0, -1, -1)],
            a = [151, 160, 137, 91, 90, 15, 131, 13, 201, 95, 96, 53, 194, 233, 7, 225, 140, 36, 103, 30, 69, 142, 8, 99, 37, 240, 21, 10, 23, 190, 6, 148, 247, 120, 234, 75, 0, 26, 197, 62, 94, 252, 219, 203, 117, 35, 11, 32, 57, 177, 33, 88, 237, 149, 56, 87, 174, 20, 125, 136, 171, 168, 68, 175, 74, 165, 71, 134, 139, 48, 27, 166, 77, 146, 158, 231, 83, 111, 229, 122, 60, 211, 133, 230, 220, 105, 92, 41, 55, 46, 245, 40, 244, 102, 143, 54, 65, 25, 63, 161, 1, 216, 80, 73, 209, 76, 132, 187, 208, 89, 18, 169, 200, 196, 135, 130, 116, 188, 159, 86, 164, 100, 109, 198, 173, 186, 3, 64, 52, 217, 226, 250, 124, 123, 5, 202, 38, 147, 118, 126, 255, 82, 85, 212, 207, 206, 59, 227, 47, 16, 58, 17, 182, 189, 28, 42, 223, 183, 170, 213, 119, 248, 152, 2, 44, 154, 163, 70, 221, 153, 101, 155, 167, 43, 172, 9, 129, 22, 39, 253, 19, 98, 108, 110, 79, 113, 224, 232, 178, 185, 112, 104, 218, 246, 97, 228, 251, 34, 242, 193, 238, 210, 144, 12, 191, 179, 162, 241, 81, 51, 145, 235, 249, 14, 239, 107, 49, 192, 214, 31, 181, 199, 106, 157, 184, 84, 204, 176, 115, 121, 50, 45, 127, 4, 150, 254, 138, 236, 205, 93, 222, 114, 67, 29, 24, 72, 243, 141, 128, 195, 78, 66, 215, 61, 156, 180],
            s = new Array(512),
            u = new Array(512);
        o.seed = function(e) {
            e > 0 && 1 > e && (e *= 65536), e = Math.floor(e), 256 > e && (e |= e << 8);
            for (var t = 0; 256 > t; t++) {
                var n;
                n = 1 & t ? a[t] ^ 255 & e : a[t] ^ e >> 8 & 255, s[t] = s[t + 256] = n, u[t] = u[t + 256] = i[n % 12]
            }
        }, o.seed(0);
        var l = .5 * (Math.sqrt(3) - 1),
            c = (3 - Math.sqrt(3)) / 6,
            f = 1 / 3,
            p = 1 / 6;
        o.simplex2 = function(e, t) {
            var n, r, o, i, a, f = (e + t) * l,
                p = Math.floor(e + f),
                d = Math.floor(t + f),
                h = (p + d) * c,
                g = e - p + h,
                m = t - d + h;
            g > m ? (i = 1, a = 0) : (i = 0, a = 1);
            var v = g - i + c,
                y = m - a + c,
                b = g - 1 + 2 * c,
                _ = m - 1 + 2 * c;
            p &= 255, d &= 255;
            var w = u[p + s[d]],
                T = u[p + i + s[d + a]],
                x = u[p + 1 + s[d + 1]],
                E = .5 - g * g - m * m;
            0 > E ? n = 0 : (E *= E, n = E * E * w.dot2(g, m));
            var A = .5 - v * v - y * y;
            0 > A ? r = 0 : (A *= A, r = A * A * T.dot2(v, y));
            var M = .5 - b * b - _ * _;
            return 0 > M ? o = 0 : (M *= M, o = M * M * x.dot2(b, _)), 70 * (n + r + o)
        }, o.simplex3 = function(e, t, n) {
            var r, o, i, a, l, c, d, h, g, m, v = (e + t + n) * f,
                y = Math.floor(e + v),
                b = Math.floor(t + v),
                _ = Math.floor(n + v),
                w = (y + b + _) * p,
                T = e - y + w,
                x = t - b + w,
                E = n - _ + w;
            T >= x ? x >= E ? (l = 1, c = 0, d = 0, h = 1, g = 1, m = 0) : T >= E ? (l = 1, c = 0, d = 0, h = 1, g = 0, m = 1) : (l = 0, c = 0, d = 1, h = 1, g = 0, m = 1) : E > x ? (l = 0, c = 0, d = 1, h = 0, g = 1, m = 1) : E > T ? (l = 0, c = 1, d = 0, h = 0, g = 1, m = 1) : (l = 0, c = 1, d = 0, h = 1, g = 1, m = 0);
            var A = T - l + p,
                M = x - c + p,
                R = E - d + p,
                k = T - h + 2 * p,
                S = x - g + 2 * p,
                C = E - m + 2 * p,
                N = T - 1 + 3 * p,
                D = x - 1 + 3 * p,
                L = E - 1 + 3 * p;
            y &= 255, b &= 255, _ &= 255;
            var F = u[y + s[b + s[_]]],
                P = u[y + l + s[b + c + s[_ + d]]],
                j = u[y + h + s[b + g + s[_ + m]]],
                I = u[y + 1 + s[b + 1 + s[_ + 1]]],
                O = .6 - T * T - x * x - E * E;
            0 > O ? r = 0 : (O *= O, r = O * O * F.dot3(T, x, E));
            var U = .6 - A * A - M * M - R * R;
            0 > U ? o = 0 : (U *= U, o = U * U * P.dot3(A, M, R));
            var B = .6 - k * k - S * S - C * C;
            0 > B ? i = 0 : (B *= B, i = B * B * j.dot3(k, S, C));
            var W = .6 - N * N - D * D - L * L;
            return 0 > W ? a = 0 : (W *= W, a = W * W * I.dot3(N, D, L)), 32 * (r + o + i + a)
        }, o.perlin2 = function(e, t) {
            var o = Math.floor(e),
                i = Math.floor(t);
            e -= o, t -= i, o = 255 & o, i = 255 & i;
            var a = u[o + s[i]].dot2(e, t),
                l = u[o + s[i + 1]].dot2(e, t - 1),
                c = u[o + 1 + s[i]].dot2(e - 1, t),
                f = u[o + 1 + s[i + 1]].dot2(e - 1, t - 1),
                p = n(e);
            return r(r(a, c, p), r(l, f, p), n(t))
        }, o.perlin3 = function(e, t, o) {
            var i = Math.floor(e),
                a = Math.floor(t),
                l = Math.floor(o);
            e -= i, t -= a, o -= l, i = 255 & i, a = 255 & a, l = 255 & l;
            var c = u[i + s[a + s[l]]].dot3(e, t, o),
                f = u[i + s[a + s[l + 1]]].dot3(e, t, o - 1),
                p = u[i + s[a + 1 + s[l]]].dot3(e, t - 1, o),
                d = u[i + s[a + 1 + s[l + 1]]].dot3(e, t - 1, o - 1),
                h = u[i + 1 + s[a + s[l]]].dot3(e - 1, t, o),
                g = u[i + 1 + s[a + s[l + 1]]].dot3(e - 1, t, o - 1),
                m = u[i + 1 + s[a + 1 + s[l]]].dot3(e - 1, t - 1, o),
                v = u[i + 1 + s[a + 1 + s[l + 1]]].dot3(e - 1, t - 1, o - 1),
                y = n(e),
                b = n(t),
                _ = n(o);
            return r(r(r(c, h, y), r(f, g, y), _), r(r(p, m, y), r(d, v, y), _), b)
        }
    }(this),
    function() {
        function e(e) {
            return Math.PI * e / 180
        }

        function t(e) {
            return 180 * e / Math.PI
        }

        function n(e, t, n) {
            return (1 - n) * e + n * t
        }

        function r(e, t, n) {
            return t > e ? t : e > n ? n : e
        }

        function o(e) {
            return 3 * e * e - 2 * e * e * e
        }

        function i(e, t) {
            return (e % t + t) % t
        }

        function a(e) {
            return 0 > e ? -1 : e > 0 ? 1 : 0
        }

        function s(e, t) {
            return e[t] = !e[t]
        }

        function u(e) {
            for (var t = 5381, n = e.length - 1; n >= 0; --n) t = (t << 5) + t + e.charCodeAt(n);
            return t
        }

        function l(e) {
            function t(e) {
                e = e || 1;
                for (var t = ""; e--;) t += (65536 * (1 + Math.random()) | 0).toString(16).substring(1);
                return t
            }
            return _.isUndefined(e) && (e = "-"), _.map([2, 1, 1, 1, 3], function(e) {
                return t(e)
            }).join(e)
        }

        function c(e, t) {
            for (var t = t || 1, n = [], r = 0; r < e.length; ++r) n.push(r);
            for (var o = vec3.create(), i = vec3.create(), a = 0, s = 1 / 0, u = vec3.create(), l = 0; t > l; ++l) {
                l > 0 && b.shuffle(n);
                for (var r = 0; r < n.length; ++r) {
                    var c = n[r],
                        f = e[c];
                    if (0 !== r) {
                        if (!(vec3.dist(o, f) < a) && (vec3.sub(u, o, f), vec3.normalize(u, u), vec3.scale(u, u, a), vec3.add(u, u, o), vec3.lerp(o, f, u, .5), a = .5 * vec3.dist(f, u), a > s)) break
                    } else vec3.copy(o, f), a = 0
                }
                a && s > a && (vec3.copy(i, o), s = a)
            }
            return {
                center: i,
                radius: s
            }
        }

        function f(e, t) {
            for (var n = 0, r = 0; n < e.length;) {
                var o = e.indexOf("\n", n); - 1 == o && (o = e.length);
                var i = e.substr(n, o - n);
                n = o + 1, t(i, r++)
            }
        }

        function p(e) {
            return _.isUndefined(e.offsetX) ? [e.layerX, e.layerY] : [e.offsetX, e.offsetY]
        }
        var d, h = Math.PI,
            g = h / 2,
            m = 2 * h,
            v = 0,
            y = Math.random,
            b = {
                cardinal: function(e) {
                    return Math.floor(e * y())
                },
                integer: function(e, t) {
                    return e + Math.floor((t - e) * y())
                },
                uniform: function(e, t) {
                    return n(e, t, Math.random())
                },
                gauss: function(e, t) {
                    var n = v;
                    if (v = 0, 0 === n) {
                        var r = m * y(),
                            o = Math.sqrt(-2 * Math.log(1 - y()));
                        n = Math.cos(r) * o, v = Math.sin(r) * o
                    }
                    return e + n * t
                },
                choose: function(e) {
                    var t = b.cardinal(e.length);
                    return e[t]
                },
                uniformVec3: function(e, t) {
                    return e[0] = 2 * t * (y() - .5), e[1] = 2 * t * (y() - .5), e[2] = 2 * t * (y() - .5), e
                },
                unitVec3: function(e) {
                    return b.uniformVec3(e, 1), vec3.normalize(e, e), e
                },
                shuffle: function(e) {
                    for (var t = e.length - 1; t >= 0; --t) {
                        var n = b.cardinal(t + 1),
                            r = e[t];
                        e[t] = e[n], e[n] = r
                    }
                },
                distribute: function(e, t, r) {
                    return n(e, t, Math.pow(y(), r))
                }
            },
            w = {
                decode: function(e, t) {
                    for (var n = atob(e), r = n.length, o = new ArrayBuffer(r), i = new Uint8Array(o), a = 0; r > a; ++a) i[a] = n.charCodeAt(a);
                    return t ? new t(o) : o
                },
                encode: function(e) {
                    for (var e = new Uint8Array(e.buffer, e.byteOffset, e.byteLength), t = e.length, n = "", r = 0; t > r; ++r) n += String.fromCharCode(e[r]);
                    return btoa(n)
                }
            };
        d = this.performance && performance.now ? function() {
            return .001 * performance.now()
        } : function() {
            return .001 * Date.now()
        }, _.extend(this, {
            PI: h,
            HALF_PI: g,
            TWO_PI: m,
            deg2rad: e,
            rad2deg: t,
            lerp: n,
            clamp: r,
            smoothstep: o,
            modulo: i,
            sign: a,
            toggleProperty: s,
            hashDJB2: u,
            makeUuid: l,
            Random: b,
            miniball: c,
            Base64: w,
            timeNow: d,
            forEachLine: f,
            getMouseEventOffset: p
        }), this.requestAnimationFrame || (this.requestAnimationFrame = this.webkitRequestAnimationFrame || this.mozRequestAnimationFrame || this.msRequestAnimationFrame || function(e) {
            setTimeout(e, 1e3 / 60)
        }), this.saveFileAs = function(e, t, n) {
            n = n || "application/octet-binary";
            var r = new Blob([e], {
                    type: n
                }),
                o = URL.createObjectURL(r),
                i = document.createElement("a");
            i.setAttribute("href", o), i.setAttribute("download", t), i.click(), URL.revokeObjectURL(r)
        }
    }.call(window), vec2.load = function(e, t, n) {
        e[0] = t[n + 0], e[1] = t[n + 1]
    }, vec2.save = function(e, t, n) {
        t[n + 0] = e[0], t[n + 1] = e[1]
    }, vec3.load = function(e, t, n) {
        e[0] = t[n + 0], e[1] = t[n + 1], e[2] = t[n + 2]
    }, vec3.save = function(e, t, n) {
        t[n + 0] = e[0], t[n + 1] = e[1], t[n + 2] = e[2]
    }, vec4.load = function(e, t, n) {
        e[0] = t[n + 0], e[1] = t[n + 1], e[2] = t[n + 2], e[3] = t[n + 3]
    }, vec4.save = function(e, t, n) {
        t[n + 0] = e[0], t[n + 1] = e[1], t[n + 2] = e[2], t[n + 3] = e[3]
    }, vec2.perp = function(e, t) {
        var n = t[0];
        e[0] = -t[1], e[1] = n
    }, mat4.lerp = function(e, t, n, r) {
        for (var o = 0; 16 > o; ++o) e[o] = (1 - r) * t[o] + r * n[o];
        return e
    };
var webgl = function () {
    function e(e) {
        this.name = e, this.program = null, this.attribs = {}, this.uniforms = {}
    }

    function t(e, t, n) {
        var r = gl.createShader(e);
        if (gl.shaderSource(r, t), gl.compileShader(r), gl.getShaderParameter(r, gl.COMPILE_STATUS)) return r;
        gl.getShaderInfoLog(r);
        throw console.log("Shader: " + n), console.log("Type: " + (e == gl.VERTEX_SHADER ? "vertex" : "fragment")), forEachLine(t, function (e, t) {
            var n = ("  " + (t + 1)).slice(-3);
            console.log(n + ": " + e)
        }), {
            type: "COMPILE",
            shaderType: e == gl.VERTEX_SHADER ? "vertex" : "fragment",
            name: n,
            shader: r,
            source: gl.getShaderSource(r),
            log: gl.getShaderInfoLog(r)
        }
    }

    function n(e) {
        var n = "precision highp float;\n",
            r = gl.createProgram();
        if (gl.attachShader(r, t(gl.VERTEX_SHADER, e.vertexSource, e.name)), gl.attachShader(r, t(gl.FRAGMENT_SHADER, n + e.fragmentSource, e.name)), gl.linkProgram(r), gl.getProgramParameter(r, gl.LINK_STATUS)) return r;
        throw {
            type: "LINK",
            name: e.name,
            program: r,
            log: gl.getProgramInfoLog(r)
        }
    }

    function r(e) {
        function t(e) {
            var t = /^\/\/\s*(\w+(?:.(vertex|fragment))?)\s*\/\//,
                n = [];
            forEachLine(e, function (e) {
                var r = t.exec(e);
                if (r) {
                    var o = r[1];
                    a[o] = n = []
                } else n.push(e)
            })
        }

        a = {}, _.each(e, function (e) {
            return _.isObject(e) ? void _.extend(a, e) : void $.ajax({
                url: e,
                async: !1,
                cache: !1,
                success: t
            })
        }), _.each(a, function (e, t) {
            _.isArray(e) && (a[t] = e.join("\n"))
        })
    }

    function o(e, t, n, r) {
        switch (this.width = e, this.height = t, this.framebuffer = gl.createFramebuffer(), gl.bindFramebuffer(gl.FRAMEBUFFER, this.framebuffer), this.texture = gl.createTexture(), gl.bindTexture(gl.TEXTURE_2D, this.texture), this.dataType = r ? gl.FLOAT : gl.UNSIGNED_BYTE, gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, e, t, 0, gl.RGBA, this.dataType, null), gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR), gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR), gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE), gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE), gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, this.texture, 0), this.depthTexture = null, this.depthRenderbuffer = null, n = n ? "TEXTURE" : "NONE", n = "RENDERBUFFER") {
        case "TEXTURE":
            this.depthTexture = gl.createTexture(), gl.bindTexture(gl.TEXTURE_2D, this.depthTexture), gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST), gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST), gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE), gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE), gl.texImage2D(gl.TEXTURE_2D, 0, gl.DEPTH_COMPONENT, e, t, 0, gl.DEPTH_COMPONENT, gl.UNSIGNED_SHORT, null), gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.DEPTH_ATTACHMENT, gl.TEXTURE_2D, this.depthTexture, 0);
            break;
        case "RENDERBUFFER":
            this.depthRenderbuffer = gl.createRenderbuffer(), gl.bindRenderbuffer(gl.RENDERBUFFER, this.depthRenderbuffer), gl.renderbufferStorage(gl.RENDERBUFFER, gl.DEPTH_COMPONENT16, e, t), gl.framebufferRenderbuffer(gl.FRAMEBUFFER, gl.DEPTH_ATTACHMENT, gl.RENDERBUFFER, this.depthRenderbuffer), gl.bindRenderbuffer(gl.RENDERBUFFER, null)
        }
        gl.bindFramebuffer(gl.FRAMEBUFFER, null)
    }

    var i = {
        enabledMask: 0,
        maxEnabledIndex: -1,
        disableAll: function () {
            for (var e = 0; e <= this.maxEnabledIndex; ++e) {
                var t = 1 << e;
                t & this.enabledMask && gl.disableVertexAttribArray(e)
            }
            this.enabledMask = 0, this.maxEnabledIndex = -1
        },
        enable: function (e) {
            var t = 1 << e;
            t & this.enabledMask || (gl.enableVertexAttribArray(e), this.enabledMask |= t, this.maxEnabledIndex = Math.max(this.maxEnabledIndex, e))
        },
        disable: function (e) {
            var t = 1 << e;
            t & this.enabledMask && (gl.disableVertexAttribArray(e), this.enabledMask &= ~t)
        }
    };
    e.prototype.setProgram = function (e) {
        function t(e) {
            if (e.type == gl.SAMPLER_2D || e.type == gl.SAMPLER_CUBE) {
                var t = i;
                return i += e.size, t
            }
            return -1
        }

        this.program = e;
        for (var n = gl.getProgramParameter(e, gl.ACTIVE_ATTRIBUTES), r = 0; n > r; ++r) {
            var o = gl.getActiveAttrib(e, r);
            this.attribs[o.name] = {
                index: gl.getAttribLocation(e, o.name),
                name: o.name,
                size: o.size,
                type: o.type
            }
        }
        for (var i = 0, a = gl.getProgramParameter(e, gl.ACTIVE_UNIFORMS), r = 0; a > r; ++r) {
            var u = gl.getActiveUniform(e, r);
            this.uniforms[u.name] = {
                location: gl.getUniformLocation(e, u.name),
                name: u.name,
                size: u.size,
                type: u.type,
                texUnit: t(u)
            }
        }
    }, e.prototype.use = function () {
        return gl.useProgram(this.program), i.disableAll(), this
    }, e.prototype.getUniformLocation = function (e) {
        var t = this.uniforms[e];
        return t ? t.location : null
    }, e.prototype.getAttribIndex = function (e) {
        var t = this.attribs[e];
        return t ? t.index : -1
    }, e.prototype.uniform1i = function (e, t) {
        var n = this.getUniformLocation(e);
        n && gl.uniform1i(n, t)
    }, e.prototype.uniform1f = function (e, t) {
        var n = this.getUniformLocation(e);
        n && gl.uniform1f(n, t)
    }, e.prototype.uniform2f = function (e, t, n) {
        var r = this.getUniformLocation(e);
        r && gl.uniform2f(r, t, n)
    }, e.prototype.uniform3f = function (e, t, n, r) {
        var o = this.getUniformLocation(e);
        o && gl.uniform3f(o, t, n, r)
    }, e.prototype.uniform4f = function (e, t, n, r, o) {
        var i = this.getUniformLocation(e);
        i && gl.uniform4f(i, t, n, r, o)
    }, e.prototype.uniform1fv = function (e, t) {
        var n = this.getUniformLocation(e);
        n && gl.uniform1fv(n, t)
    }, e.prototype.uniform2fv = function (e, t) {
        var n = this.getUniformLocation(e);
        n && gl.uniform2fv(n, t)
    }, e.prototype.uniform3fv = function (e, t) {
        var n = this.getUniformLocation(e);
        n && gl.uniform3fv(n, t)
    }, e.prototype.uniform4fv = function (e, t) {
        var n = this.getUniformLocation(e);
        n && gl.uniform4fv(n, t)
    }, e.prototype.uniformMatrix3fv = function (e, t, n) {
        var r = this.getUniformLocation(e);
        r && (n = n || !1, gl.uniformMatrix3fv(r, n, t))
    }, e.prototype.uniformMatrix4fv = function (e, t, n) {
        var r = this.getUniformLocation(e);
        r && (n = n || !1, gl.uniformMatrix4fv(r, n, t))
    }, e.prototype.uniformSampler = function (e, t, n) {
        var r = this.uniforms[e];
        r && (gl.activeTexture(gl.TEXTURE0 + r.texUnit), gl.bindTexture(t, n), gl.uniform1i(r.location, r.texUnit))
    }, e.prototype.uniformSampler2D = function (e, t) {
        this.uniformSampler(e, gl.TEXTURE_2D, t)
    }, e.prototype.uniformSamplerCube = function (e, t) {
        this.uniformSampler(e, gl.TEXTURE_CUBE_MAP, t)
    }, e.prototype.enableVertexAttribArray = function (e) {
        var t = this.attribs[e];
        t && i.enable(t.index)
    }, e.prototype.disableVertexAttribArray = function (e) {
        var t = this.attribs[e];
        t && i.disable(t.index)
    }, e.prototype.vertexAttribPointer = function (e, t, n, r, o, a) {
        var u = this.attribs[e];
        u && (i.enable(u.index), gl.vertexAttribPointer(u.index, t, n, r, o, a))
    };
    var a = {},
        u = function () {
            function t(e) {
                var t = !!a[e];
                return console.assert(t, e + " not found."), t
            }

            function r(r, o) {
                if (t(r) && t(r + ".vertex") && t(r + ".fragment")) {
                    o = o || {};
                    var i = "";
                    o.defines && _.each(o.defines, function (e, t) {
                        i += "#define " + t + " " + e + "\n"
                    });
                    var u = i + (a[r] || ""),
                        s = _.reject(u.split("\n"), function (e) {
                            return e.match(/attribute/)
                        }).join("\n");
                    try {
                        var l = new e(r);
                        return l.setProgram(n({
                            name: r,
                            vertexSource: u + a[r + ".vertex"],
                            fragmentSource: s + a[r + ".fragment"]
                        })), l
                    } catch (c) {
                        return onGLSLError(c), null
                    }
                }
            }

            function o(e, t) {
                var n = [];
                return t && t.defines && _.each(t.defines, function (e, t) {
                    n.push(t + "=" + e)
                }), e + " " + n.join(" ")
            }

            return _.memoize(r, o)
        }();
    return o.prototype.render = function (e) {
        var t = gl.getParameter(gl.VIEWPORT);
        gl.viewport(0, 0, this.width, this.height), gl.bindFramebuffer(gl.FRAMEBUFFER, this.framebuffer), e(), gl.bindFramebuffer(gl.FRAMEBUFFER, null), gl.viewport(t[0], t[1], t[2], t[3])
    }, o.prototype.resize = function (e, t) {
        this.width = e, this.height = t, gl.bindTexture(gl.TEXTURE_2D, this.texture), gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, e, t, 0, gl.RGBA, this.dataType, null), this.depthTexture && (gl.bindTexture(gl.TEXTURE_2D, this.depthTexture), gl.texImage2D(gl.TEXTURE_2D, 0, gl.DEPTH_COMPONENT, e, t, 0, gl.DEPTH_COMPONENT, gl.UNSIGNED_SHORT, null)), this.depthRenderbuffer && (gl.bindRenderbuffer(gl.RENDERBUFFER, this.depthRenderbuffer), gl.renderbufferStorage(gl.RENDERBUFFER, gl.DEPTH_COMPONENT16, e, t), gl.bindRenderbuffer(gl.RENDERBUFFER, null))
    }, {
        makeBuffer: function (e, t, n) {
            n = n || gl.STATIC_DRAW;
            var r = gl.createBuffer();
            return gl.bindBuffer(e, r), gl.bufferData(e, t, n), r
        },
        makeVertexBuffer: function (e, t) {
            return this.makeBuffer(gl.ARRAY_BUFFER, e, t)
        },
        makeElementBuffer: function (e, t) {
            return this.makeBuffer(gl.ELEMENT_ARRAY_BUFFER, e, t)
        },
        bindVertexBuffer: function (e) {
            gl.bindBuffer(gl.ARRAY_BUFFER, e)
        },
        bindElementBuffer: function (e) {
            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, e)
        },
        setupCanvas: function (e, t) {
            function n(n) {
                try {
                    return e.getContext(n, t)
                } catch (r) {
                    return null
                }
            }

            t = t || {}, t = _.defaults(t, {
                antialias: !1,
                preserveDrawingBuffer: !0,
                extensions: [],
                shaderSources: ["shaders/all-shaders.glsl"]
            });
            var o = n("webgl") || n("experimental-webgl");
            if (o) {
                var i = this.extensions = {};
                _.each(t.extensions, function (e) {
                    i[e] = o.getExtension(e)
                }), window.gl = o, r(t.shaderSources)
            }
            return o
        },
        getProgram: u,
        createTexture2D: function (e) {
            var t = gl.createTexture();
            gl.bindTexture(gl.TEXTURE_2D, t), e = e || {}, e.width = e.width || e.size || 4, e.height = e.height || e.width, e.format = e.format || gl.RGBA, e.type = e.type || gl.UNSIGNED_BYTE, e.mag = e.mag || e.filter || gl.NEAREST, e.min = e.min || e.mag, e.wrapS = e.wrapS || e.wrap || gl.CLAMP_TO_EDGE, e.wrapT = e.wrapT || e.wrapS, e.dataFormat = e.dataFormat || e.format, e.data = e.data || null;
            var n = 0,
                r = 0;
            if (gl.texImage2D(gl.TEXTURE_2D, n, e.format, e.width, e.height, r, e.dataFormat, e.type, e.data), gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, e.min), gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, e.mag), gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, e.wrapS), gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, e.wrapT), e.aniso) {
                var o = webgl.extensions.WEBKIT_EXT_texture_filter_anisotropic;
                o && gl.texParameteri(gl.TEXTURE_2D, o.TEXTURE_MAX_ANISOTROPY_EXT, e.aniso)
            }
            return t
        },
        loadTexture2D: function (e, t) {
            t = t || {}, t = _.defaults(t, {
                mipmap: !1,
                flip: !1,
                callback: null,
                filter: gl.LINEAR
            });
            var n = this.createTexture2D(t),
                r = new Image;
            return r.src = e, r.onload = function () {
                gl.bindTexture(gl.TEXTURE_2D, n), gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, t.flip ? 1 : 0), gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, r), t.mipmap && (gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR), gl.generateMipmap(gl.TEXTURE_2D)), t.callback && t.callback(n)
            }, n
        },
        RenderTexture: o
    }
}();
window.onGLSLError = function (e) {
    console.log("GLSL error:", e);
    var t = {};
    switch (forEachLine(e.log, function (e) {
        var n = e.match(/^ERROR: \d+:(\d+):(.*)$/);
        if (n) {
            var r = parseInt(n[1]),
                o = n[2];
            t[r] || (t[r] = []), t[r].push(o)
        }
    }), console.log(t), e.type) {
    case "COMPILE":
        html = '<div class="description">GLSL compile error in ' + e.shaderType.toLowerCase() + ' shader "' + e.name + '":</div>', forEachLine(e.source, function (e, n) {
            var r = t[n + 1];
            r ? (r = _.map(r, function (e) {
                return "<div class='description'>" + e + "</div>"
            }).join(""), html += "<span class='highlight'>" + e + "</span> " + r) : html += e + "\n"
        });
        break;
    case "LINK":
        html = '<div class="description">GLSL link error in program "' + e.name + '":<br/>\n' + e.log + "\n</div>"
    }
    $(".glsl-error").html("<code>" + html + "</code>").show()
};
var GTW = GTW || {};
! function () {
    GTW.create_gradient_texture = function (e) {
        var t = document.createElement("canvas");
        t.width = 1024, t.height = 1;
        var n = t.getContext("2d"),
            r = n.createLinearGradient(0, 0, t.width, 0);
        _.each(e, function (e, t) {
            r.addColorStop(parseFloat(t), e)
        }), n.fillStyle = r, n.fillRect(0, 0, t.width, t.height);
        var o = webgl.createTexture2D({
            filter: gl.LINEAR
        });
        return gl.bindTexture(gl.TEXTURE_2D, o), gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, t), o
    }, GTW.load_resources = function (e, t) {
        function n(e, n) {
            r[e] = n, 0 === --o && t(r)
        }

        var r = {},
            o = _.keys(e).length;
        _.each(e, function (e, t) {
            if (/\.(jpg|png)$/i.test(e)) {
                var r = new Image;
                r.src = e, r.onload = function () {
                    n(t, r)
                }
            } else $.getJSON(e, function (e) {
                n(t, e)
            })
        })
    }
}();
var GTW = GTW || {};
! function () {
    function e() {
        this.fov = 60, this.near = .01, this.far = 150, this.viewport = vec4.create(), this.proj = mat4.create(), this.view = mat4.create(), this.bill = mat3.create(), this.mvp = mat4.create(), this.mvpInv = mat4.create(), this.viewInv = mat4.create(), this.viewPos = vec3.create(), this.viewDir = vec3.create()
    }

    var t = vec3.fromValues(0, 1, 0),
        n = vec3.create();
    e.prototype.update = function (e, r) {
        var o = this.viewport[3],
            i = 60,
            a = this.viewport[2] / (o - i);
        mat4.perspective(this.proj, deg2rad(this.fov), a, this.near, this.far), mat4.translate(this.proj, this.proj, [0, 20 * i / (2 * o), 0]), mat4.scale(this.proj, this.proj, [1, (o - i) / o, 1]), vec3.add(n, e, r), mat4.lookAt(this.view, e, n, t);
        var u = this.bill,
            s = this.view;
        u[0] = s[0], u[1] = s[4], u[2] = s[8], u[3] = s[1], u[4] = s[5], u[5] = s[9], u[6] = s[2], u[7] = s[6], u[8] = s[10], mat4.multiply(this.mvp, this.proj, this.view), mat4.invert(this.mvpInv, this.mvp), mat4.invert(this.viewInv, this.view), vec3.transformMat4(this.viewPos, [0, 0, 0], this.viewInv), vec3.set(this.viewDir, -this.viewInv[8], -this.viewInv[9], -this.viewInv[10])
    }, e.prototype.unproject = function (e, t) {
        var n = vec4.create();
        n[0] = 2 * (t[0] / this.viewport[2]) - 1, n[1] = 2 * (t[1] / this.viewport[3]) - 1, n[1] = 1 - n[1], n[2] = 0, n[3] = 1, vec4.transformMat4(n, n, this.mvpInv), e[0] = n[0] / n[3], e[1] = n[1] / n[3]
    }, GTW.Camera = e
}();
var GTW = GTW || {};
! function () {
    function e(e) {
        return -e * Math.log(1 - MersenneTwister.random())
    }

    function t() {
        this.key = 0, this.count = 0, this.remaining = 0, this.end_time = 0, this.next_event_time = 0
    }

    function n() {
        this.next_fetch_time = 0, this.kevents = []
    }

    var r = 6e4,
        o = 60 * r,
        i = 24 * o;
    t.prototype.next_event = function () {
        var t = Math.max(0, this.end_time - this.next_event_time),
            n = t / this.remaining,
            r = e(n);
        this.next_event_time += r
    }, n.prototype.init_events = function (e, n) {
        this.kevents = [];
        for (var r = 0; r < e.length; r += 2) {
            var i = e[r + 0],
                a = e[r + 1];
            ke = new t, ke.key = i, ke.remaining = ke.count = a, ke.next_event_time = n, ke.end_time = n + o, ke.next_event(), this.kevents.push(ke)
        }
    }, n.prototype.fetch = function (e) {
        function t(t) {
            var a = new Int32Array(256), //Base64.decode(t.events, Uint32Array),
                u = new Int32Array(256); // Base64.decode(t.totals, Uint32Array);
            GTW.reset_counters(u);
            var s = Math.floor(e / i) * i + n * o;
            r.init_events(a, s);
            var l = r.poll_events(e);
            _.each(l, function (e) {
                var t = e >> 16 & 255,
                    n = e >> 8 & 255,
                    r = GTW.systems[t];
                //++r.count, ++r.target_count[n], ++GTW.total_target_count[n]
            })
        }

        var n = Math.floor(e / o % 24);
        this.next_fetch_time = (1 + Math.floor(e / o)) * o;
        var r = this,
            a = "data/events/" + n + ".json";
        $.getJSON(a, t)
    }, n.prototype.poll_events = function (e) {
        this.next_fetch_time < e && this.fetch(e);
        var t = [];
        return _.each(this.kevents, function (n) {
            for (; n.next_event_time <= e;) {
                if (t.push(n.key), 0 == --n.remaining) {
                    n.next_event_time = 1 / 0;
                    break
                }
                n.next_event()
            }
        }), t
    }, GTW.Simulator = n
}();
var GTW = window.GTW || {};
GTW.init_marker = function(e) {
    function t(t) {
        var n = vec3.create();
        e.project(n, t), mat4.identity(s), mat4.translate(s, s, n), vec3.copy(l, n), vec3.copy(c, n);
        var r = vec3.create(),
            o = vec3.create(),
            i = vec3.create();
        vec3.normalize(r, l), vec3.set(o, 0, 1, 0), vec3.cross(i, r, o), vec3.normalize(i, i), vec3.cross(o, i, r), vec3.scaleAndAdd(c, c, o, 10), f = 0, p = !1;//alert(n[0]);
    }

    function n(e) {
        if (!p) 
		{
            if (f += .01, f > 1) {
                f = 1, p = !0;
                var t = .7;
                e.flash([t, t, t])
            }
            vec3.lerp(u, c, l, Math.pow(f, .75))
        }
        gl.enable(gl.DEPTH_TEST), gl.enable(gl.BLEND), gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
        var n = a.marker.use();//alert(u[0]);
        n.uniformMatrix3fv("bill", e.camera.bill), n.uniformMatrix4fv("mvp", e.camera.mvp), n.uniform3fv("pos", u), n.uniformSampler2D("t_sharp", i.pin_sharp), n.uniformSampler2D("t_fuzzy", i.pin_fuzzy);
        var r = .7;
        n.uniform4f("color", r, r, r, 1), n.uniform1f("scale", .1), n.uniform1f("fuzz", 0), webgl.bindVertexBuffer(o.verts), n.vertexAttribPointer("coord", 2, gl.FLOAT, !1, 0, 0), gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)
    }
    var r = [0, 0, 1, 0, 0, 1, 1, 1],
        o = {
            verts: webgl.makeVertexBuffer(new Float32Array(r))
        },
        i = {
            pin_sharp: webgl.loadTexture2D("textures/pin-sharp.png", {
                mipmap: !0
            }),
            pin_fuzzy: webgl.loadTexture2D("textures/pin-fuzzy.png", {
                mipmap: !0
            })
        },
        a = {
            marker: webgl.getProgram("marker")
        },
        s = mat4.create(),
        u = vec3.create(),
        l = vec3.create(),
        c = vec3.create(),
        f = 0,
        p = !0;
    return {
        draw: n,
        set_coord: t
    }
};
var GTW = window.GTW || {};
GTW.init_flash = function() {
    function e() {
        if (!(i[3] < .001)) {
            i[3] *= .97;
            var e = r.simple.use();
            e.uniformMatrix4fv("mvp", o), e.uniform4fv("color", i), webgl.bindVertexBuffer(n.verts), e.vertexAttribPointer("position", 2, gl.FLOAT, !1, 0, 0), gl.enable(gl.BLEND), gl.blendFunc(gl.SRC_ALPHA, gl.ONE), gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4), gl.disable(gl.BLEND)
        }
    }
    var t = new Float32Array([0, 0, 1, 0, 0, 1, 1, 1]),
        n = {
            verts: webgl.makeVertexBuffer(t)
        },
        r = {
            simple: webgl.getProgram("simple")
        },
        o = mat4.create();
    mat4.translate(o, o, [-1, -1, 0, 0]), mat4.scale(o, o, [2, 2, 2]);
    var i = vec4.create();
    return {
        draw: e,
        flash: function(e) {
            vec3.copy(i, e), i[3] = 2
        }
    }
};

var GTW = GTW || {};
! function () {
    function e(e) {
        function t(t) {
            return parseInt(e.substr(2 * t, 2), 16) / 255
        }

        "#" == e[0] && (e = e.substr(1));
        var n = vec3.create();
        return n[0] = t(0), n[1] = t(1), n[2] = t(2), n
    }

    function t(t, n, r, o, i) {
        function a(t) {
            return {
                f: e(t),
                css: "#" + t
            }
        }

        this.id = t, this.name = n, this.description = r;
        var o = o.split(" ");
        1 === o.length && o.push(o[0]), this.color = {
            dark: a(o[0]),
            light: a(o[1])
        }, this.n_sides = i, this.enabled = !0, this.count = 0, this.target_count = new Int32Array(256), this.target_rank = new Int32Array(256), this.el_count = $("#" + n.toLowerCase() + "-count"), this.el_popcount = $("#" + n.toLowerCase() + "-popcount")
    }

    function n(e, t) {
        a.sort(function (t, n) {
            return e[n] - e[t]
        }), _.each(a, function (e, n) {
            t[e] = 1 + n
        })
    }

    function r(e) {
        /*_.each(GTW.systems, function (e) {
            e.count = 0;
            for (var t = 0; 256 > t; ++t) e.target_count[t] = 0
        });
        for (var t = 0; 256 > t; ++t) GTW.total_target_count[t] = 0;
        if (e)
            for (var t = 0; t < e.length; t += 2) {
                var n = e[t + 0],
                    r = e[t + 1],
                    o = n >> 16 & 255,
                    i = n >> 8 & 255,
                    a = GTW.systems[o];
                0 === i ? a.count = r : (a.target_count[i] = r, GTW.total_target_count[i] += r)
            }*/
    }

    function o(e, t) {
        for (var n = null, r = 0, o = 0; o < t.length; ++o) {
            var i = t[o];
            if (!i.alive) return i;
            var a = e - i.start_time;
            a > r && (r = a, n = i)
        }
        return n ? n : _.sample(t)
    }

    function i(e) {
        var t = this;
        this.programs = {
            missile: webgl.getProgram("missile"),
            impact: webgl.getProgram("impact"),
            icon: webgl.getProgram("icon"),
            cone: webgl.getProgram("cone")
        }, this.buffers = {
            missile: null,
            icon: null,
            cone: null,
            quad: webgl.makeVertexBuffer(new Float32Array([0, 0, 1, 0, 0, 1, 1, 1]))
        }, this.textures = {
            impact: webgl.loadTexture2D("textures/impact-512.jpg", {
                mipmap: !1
            })
        },
        function () {
            for (var e = [], n = 32, r = 0; n > r; ++r) {
                var o = TWO_PI * r / (n - 1),
                    i = Math.cos(o),
                    a = Math.sin(o);
                e.push(i, 0, a, i, 1, a)
            }
            e = new Float32Array(e), t.buffers.cone = webgl.makeVertexBuffer(e), t.n_cone_verts = e.length / 3
        }(), this.init_missiles(e), this.init_icons()
    }

    GTW.total_target_count = new Int32Array(256), GTW.total_target_rank = new Int32Array(256), GTW.top_infected = new Int32Array(10);
    for (var a = [], u = 0; 256 > u; ++u) a.push(u);
    t.prototype.compute_target_rank = function () {
        n(this.target_count, this.target_rank)
    }, GTW.compute_total_target_rank = function () {
        n(GTW.total_target_count, GTW.total_target_rank);
        for (var e = 0; e < GTW.top_infected.length; ++e) GTW.top_infected[e] = a[e]
    }, GTW.systems = {
        1: new t(1, "GD", "General Dentistry", "38b349" /*Color*/ , 5),
        2: new t(2, "OMP", "Oral & Maxiofacial Pathology", "ed1c24", 4),
        3: new t(3, "PDS", "Periodontics", "f26522", 3),
        4: new t(4, "ODS", "Orthodontics", "0087f4 0000f4" /*Dark Color,Light Color*/ , 32),
        5: new t(5, "OMB", "Oral Microbiology", "ec008c ff00b4", 6),
        6: new t(6, "OM", "Oral Medicine", "fbf267", 8),
        7: new t(7, "GPH", "General Public Health", "fbf267", 8),
        8: new t(8, "OMS", "Oral & Maxiofacial Surgery", "fbf267", 8),
        9: new t(9, "EDS", "Endodontics", "fbf267", 8),
        10: new t(10, "PRDS", "Prosthodontics", "fbf267", 8),
        11: new t(11, "PD", "Pediatric Dentistry", "fbf267", 8),
        12: new t(12, "DMR", "Dental & Maxiofacial Radiology", "fbf267", 8),
        13: new t(13, "RD", "Restorative Dentistry", "fbf267", 8),
        14: new t(14, "SCD", "Special Care Dentistry", "fbf267", 8)
    };
    var s = 1e3,
        l = 100,
        c = 8 * l;
    i.prototype.init_missiles = function (e) {
        function t(t) {
            this.index = t, this.verts = o.subarray(this.index * c, (this.index + 1) * c), this.source_coord = vec3.create(), this.target_coord = vec3.create(), this.source_mat = mat4.create(), this.target_mat = mat4.create(), this.start_time = 0, this.alive = !1, this.style = 1, this.color = GTW.systems[this.style].color[e.palette].f, this.has_source = !0, this.has_target = !0
        }

        function n(e, t, n) {
            var r = a,
                o = u,
                i = f,
                s = p;
            n.project(s, t), n.projection.blend > .5 ? (vec3.normalize(i, s), vec3.set(r, 0, 1, 0), vec3.cross(r, i, r), vec3.normalize(r, r), vec3.cross(o, r, i), e[0] = r[0], e[1] = r[1], e[2] = r[2], e[4] = i[0], e[5] = i[1], e[6] = i[2], e[8] = o[0], e[9] = o[1], e[10] = o[2]) : (mat4.identity(e), mat4.rotateX(e, e, -.5 * Math.PI)), e[12] = s[0], e[13] = s[1], e[14] = s[2]
        }

        var r = this,
            o = new Float32Array(s * c),
            i = null,
            a = vec3.create(),
            u = vec3.create(),
            f = vec3.create(),
            p = vec3.create();
        t.prototype.launch = function (e, t, s, f) {
            if (this.style = t, this.shape = r.shapes[this.style], this.color = GTW.systems[this.style].color[e.palette].f, this.has_source = !!f, this.start_time = e.time, this.alive = !0, this.has_source && vec3.copy(this.source_coord, f), vec3.copy(this.target_coord, s), this.has_source) {
                for (var p = vec2.distance(f, s), h = .005 * p, d = this.index * c, g = a, m = u, v = 0; l > v; ++v) {
                    var y = v / (l - 1);
                    vec2.lerp(m, f, s, y);
                    var b = h * Math.sin(y * Math.PI) * .15;
                    m[2] = b, e.project(g, m), o[d + 0] = g[0], o[d + 1] = g[1], o[d + 2] = g[2], o[d + 3] = -y, o[d + 4] = g[0], o[d + 5] = g[1], o[d + 6] = g[2], o[d + 7] = y, d += 8
                }
                var _ = 4 * this.index * c;
                webgl.bindVertexBuffer(i), gl.bufferSubData(gl.ARRAY_BUFFER, _, this.verts)
            }
            this.has_source && n(this.source_mat, this.source_coord, e), n(this.target_mat, this.target_coord, e)
        }, this.missiles = [];
        for (var h = 0; s > h; ++h) this.missiles.push(new t(h));
        this.buffers.missile = i = webgl.makeVertexBuffer(o)
    }, i.prototype.init_icons = function () {
        function e() {
            this.offset = 0, this.count = 0
        }

        function t(t) {
            var r = new e;
            r.offset = n.length / 3;
            for (var o = 5, i = 0; o > i; ++i)
                for (var a = 0; t > a; ++a) {
                    var u = TWO_PI * a / t,
                        s = Math.cos(u),
                        l = Math.sin(u);
                    n.push(s, l, i);
                    var u = TWO_PI * (a + 1) / t,
                        s = Math.cos(u),
                        l = Math.sin(u);
                    n.push(s, l, i)
                }
            return r.count = n.length / 3 - r.offset, r
        }

        var n = [],
            r = [];
        e.prototype.draw = function () {
            gl.drawArrays(gl.LINES, this.offset, this.count)
        }, _.each(GTW.systems, function (e) {
            var n = t(e.n_sides);
            r[e.id] = n
        }), this.shapes = r, n = new Float32Array(n), this.buffers.icon = webgl.makeVertexBuffer(n)
    }, i.prototype.draw = function (e) {
        var t = this;
        gl.enable(gl.DEPTH_TEST), gl.depthMask(!1);
        var n = !0,
            r = !0,
            o = !0,
            i = !0;
        if (n) {
            gl.enable(gl.BLEND), gl.blendFunc(gl.SRC_ALPHA, gl.ONE);
            var a = this.programs.missile.use();
            a.uniformMatrix4fv("mvp", e.camera.mvp), a.uniform3fv("view_position", e.camera.viewPos), webgl.bindVertexBuffer(this.buffers.missile), a.vertexAttribPointer("position", 4, gl.FLOAT, !1, 0, 0), _.each(this.missiles, function (t) {
                if (t.alive && t.has_source) {
                    var n = e.time - t.start_time;
                    if (2 > n) {
                        a.uniform1f("time", .5 * n), a.uniform3fv("color", t.color);
                        var r = 2 * l,
                            o = r * t.index;
                        gl.drawArrays(gl.TRIANGLE_STRIP, o, r)
                    }
                }
            })
        }
        if (gl.enable(gl.BLEND), gl.blendFunc(gl.SRC_ALPHA, gl.ONE), r) {
            var a = this.programs.impact.use();
            a.uniformMatrix4fv("mvp", e.camera.mvp), a.uniformSampler2D("t_color", this.textures.impact), webgl.bindVertexBuffer(this.buffers.quad), a.vertexAttribPointer("position", 2, gl.FLOAT, !1, 0, 0), _.each(this.missiles, function (t) {
                if (t.alive) {
                    var n = e.time - t.start_time;
                    if (n > 4) return void(t.alive = !1);
                    a.uniform3fv("color", t.color), t.has_source && 1 > n && (a.uniformMatrix4fv("mat", t.source_mat), a.uniform1f("time", n), gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)), t.has_target && n >= 1 && (a.uniformMatrix4fv("mat", t.target_mat), a.uniform1f("time", (n - 1) / 3), gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4))
                }
            })
        }
        if (o) {
            var a = this.programs.cone.use();
            a.uniformMatrix4fv("mvp", e.camera.mvp), webgl.bindVertexBuffer(this.buffers.cone), a.vertexAttribPointer("position", 3, gl.FLOAT, !1, 0, 0), _.each(this.missiles, function (n) {
                if (n.alive) {
                    var r = e.time - n.start_time;
                    n.has_target && r >= 1 && 2 > r && (a.uniform3fv("color", n.color), a.uniformMatrix4fv("mat", n.target_mat), a.uniform1f("time", r - 1), gl.drawArrays(gl.TRIANGLE_STRIP, 0, t.n_cone_verts))
                }
            })
        }
        if (i) {
            var a = this.programs.icon.use();
            a.uniformMatrix4fv("mvp", e.camera.mvp), a.uniform1f("scale", .05), webgl.bindVertexBuffer(this.buffers.icon), a.vertexAttribPointer("vertex", 3, gl.FLOAT, !1, 0, 0), gl.lineWidth(2), _.each(this.missiles, function (t) {
                if (t.alive) {
                    var n = e.time - t.start_time;
                    n >= 1 && 2 > n && (a.uniformMatrix4fv("mat", t.target_mat), a.uniform3fv("color", t.color), a.uniform1f("time", n - 1), t.shape.draw())
                }
            }), gl.lineWidth(1)
        }
        gl.depthMask(!0)
    }, i.prototype.launch = function (e, t, n, r) {
        var i = o(e.time, this.missiles);
        i.launch(e, t, n, r)
    }, GTW.MissileSystem = i, GTW.reset_counters = r
}();
var GTW = GTW || {};
! function () {
    var e = 1,
        t = 10;
    GTW.project_mercator = function (n, r) {
        var o = r[0],
            i = r[1],
            a = Math.PI * i / 180,
            u = 90 / Math.PI * Math.log(Math.tan(.25 * Math.PI + .5 * a));
        n[0] = -o / 180, n[1] = clamp(u / 90, -1, 1), n[2] = -e * r[2], vec3.scale(n, n, t)
    }, GTW.project_ecef = function (n, r) {
        var o = deg2rad(r[0]),
            i = deg2rad(r[1]),
            a = e * r[2],
            u = Math.cos(i),
            s = Math.sin(i),
            l = 1,
            c = 1;;
        n[0] = -(l + a) * u * Math.cos(o), n[2] = (l + a) * u * Math.sin(o), n[1] = (c + a) * s, vec3.scale(n, n, t)
    }, GTW.project_ecef1 = function (n, r) {
        var o = deg2rad(r[0]),
            i = deg2rad(r[1]),
            a = e * r[2],
            u = Math.cos(i),
            s = Math.sin(i),
            l = 1,
            c = 1;
//alert(o);
        n[0] = -(l + a) * u * Math.cos(o), n[2] = (l + a) * u * Math.sin(o), n[1] = (c + a) * s, vec3.scale(n, n, t)
    }
}();
var GTW = GTW || {};
! function () {
    function e(e) {
        for (var t = 1; t < arguments.length; ++t) e.push.apply(e, arguments[t])
    }

    var t = [1440, 720],
        n = .014;
    GTW.Stars = function () {
        function e() {
            function e() {
                for (var e = vec3.create(), n = new Float32Array(t << 2), r = 0; r < n.length; r += 4) Random.unitVec3(e), vec3.scale(e, e, 50), n[r + 0] = e[0], n[r + 1] = e[1], n[r + 2] = e[2], n[r + 3] = lerp(.1, 2.5, Math.pow(Math.random(), 10));
                return webgl.makeVertexBuffer(n)
            }

            var t = 1e4;
            this.count = t, this.buffers = {
                vert: e()
            }, this.programs = {
                main: webgl.getProgram("stars")
            }, this.mvp = mat4.create()
        }

        return e.prototype.draw = function (e) {
            gl.disable(gl.DEPTH_TEST), gl.enable(gl.BLEND), gl.blendFunc(gl.SRC_ALPHA, gl.ONE);
            var t = this.programs.main.use(),
                n = this.mvp;
            mat4.copy(n, e.camera.view), n[12] = 0, n[13] = 0, n[14] = 0, mat4.multiply(n, e.camera.proj, n), t.uniformMatrix4fv("mvp", n), t.uniform4f("color", 1, 1, 1, .5), webgl.bindVertexBuffer(this.buffers.vert), t.vertexAttribPointer("position", 4, gl.FLOAT, !1, 0, 0), gl.drawArrays(gl.POINTS, 0, this.count)
        }, e
    }(), GTW.Corona = function () {
        function e() {
            function e() {
                for (var e = [], n = 128, r = 0; n + 1 > r; ++r) {
                    var o = TWO_PI * r / n,
                        i = r / (n + 1),
                        a = Math.cos(o),
                        u = Math.sin(o);
                    e.push(a, u, i, 0, a, u, i, 1)
                }
                return t = e.length / 4, webgl.makeVertexBuffer(new Float32Array(e))
            }

            var t = 0;
            this.buffers = {
                vert: e()
            }, this.vertex_count = t, this.programs = {
                main: webgl.getProgram("corona")
            }, this.textures = {
                smoke: webgl.loadTexture2D("textures/smoke.jpg", {
                    mipmap: !0,
                    wrapS: gl.REPEAT,
                    wrapT: gl.CLAMP_TO_EDGE
                })
            }
        }

        return e.prototype.draw = function (e) {
            var t = this.programs.main.use();
            t.uniformMatrix4fv("mvp", e.camera.mvp), t.uniformMatrix3fv("bill", e.camera.bill), t.uniformSampler2D("t_smoke", this.textures.smoke), t.uniform1f("time", e.time), gl.disable(gl.CULL_FACE), gl.enable(gl.BLEND), "dark" === e.palette ? (gl.blendFunc(gl.SRC_ALPHA, gl.ONE), t.uniform3f("color0", .07, .25, .16), t.uniform3f("color1", 0, 0, 0)) : (gl.blendFunc(gl.DST_COLOR, gl.ZERO), t.uniform3f("color0", .07, .25, .16), t.uniform3f("color1", 1, 1, 1)), webgl.bindVertexBuffer(this.buffers.vert), t.vertexAttribPointer("vertex", 4, gl.FLOAT, !1, 0, 0), gl.drawArrays(gl.TRIANGLE_STRIP, 0, this.vertex_count), gl.disable(gl.BLEND)
        }, e
    }(), GTW.World = function () {
        function r() {
            this.buffers = {
                map: {
                    vert: null,
                    face: null,
                    line: null
                },
                grid: {
                    vert: null,
                    elem: null
                }
            }, this.build_grid(), this.programs = {
                main: webgl.getProgram("map_main"),
                grid: webgl.getProgram("map_grid"),
                line: webgl.getProgram("map_line"),
                pick: webgl.getProgram("map_pick")
            }, this.textures = {
                blur: webgl.loadTexture2D("textures/map_blur.jpg"),
                pattern: webgl.loadTexture2D("textures/pattern.png", {
                    mipmap: !0,
                    wrap: gl.REPEAT,
                    aniso: 4
                })
            }, this.countries = [];
            var e = this;
            this.key_to_country = {}, GTW.load_resources({
                map: "data/map.json"
            }, function (t) {
                e.countries = t.map.countries, _.each(e.countries, function (t) {
                    t.tone = Math.random();
                    for (var n = Base64.decode(t.cities, Int16Array), r = t.cities = new Float32Array(n.length), o = 0; o < r.length; o += 3) r[o + 0] = n[o + 0] / 32768, r[o + 1] = 180 * n[o + 1] / 32768, r[o + 2] = 90 * n[o + 2] / 32768;;
                    //alert(t.cities + ":");
					e.key_to_country[t.key] = t
                }), e.build_geometry(t.map)
            })
        }

        return r.prototype.build_grid = function () {
            function t(e, t) {
                return 181 * e + t
            }

            var r = [],
                o = [],
                i = vec3.create();
            i[2] = -n;
            for (var a = vec3.create(), u = vec3.create(), s = vec2.create(), l = -180; 180 >= l; l += 1)
                for (var c = -90; 90 >= c; c += 1) vec2.set(i, l, c), vec2.set(s, (l + 180) / 360, 1 - (c + 90) / 180), GTW.project_mercator(a, i), vec3.set(u, 0, 0, -1), e(r, a, u), GTW.project_ecef(a, i), vec3.normalize(u, a), e(r, a, u), e(r, s);
            for (var f = 0; 360 > f; ++f)
                for (var p = 0; 180 > p; ++p) o.push(t(f, p), t(f + 1, p), t(f + 1, p + 1), t(f + 1, p + 1), t(f, p + 1), t(f, p));
            this.buffers.grid.vert = webgl.makeVertexBuffer(new Float32Array(r)), this.buffers.grid.elem = webgl.makeElementBuffer(new Uint16Array(o)), this.grid_vert_count = r.length / 5, this.grid_elem_count = o.length, this.grid_vert_stride_bytes = 56
        }, r.prototype.build_geometry = function (e) {
            function t(e, t) {
                i[0] = 180 * o.verts[2 * e + 0] / 32768, i[1] = 90 * o.verts[2 * e + 1] / 32768, i[2] = t, u[0] = .5 + i[0] / 360, u[1] = .5 - i[1] / 180;
                var n = r.length / 14;
                return GTW.project_mercator(a, i), r.push(a[0], a[1], a[2]), r.push(0, 0, 0), GTW.project_ecef(a, i), r.push(a[0], a[1], a[2]), r.push(0, 0, 0), r.push(u[0], u[1]), n
            }

            var r = [],
                o = e.geom,
                i = vec3.create(),
                a = vec3.create(),
                u = vec2.create();
            o.faces = Base64.decode(o.faces, Uint16Array), o.lines = Base64.decode(o.lines, Uint16Array), o.coast = Base64.decode(o.coast, Uint16Array), o.verts = Base64.decode(o.verts, Int16Array);
            for (var s = o.verts.length, l = 0; s > l; ++l) t(l, 0);
            var c = Array.apply([], o.faces);
            c.length = o.faces.length, c.constructor = Array, this.coast_start = c.length;
            for (var l = 0; l < o.coast.length; l += 2) {
                var f = o.coast[l + 0],
                    p = o.coast[l + 1],
                    h = t(f, -n),
                    d = t(p, -n),
                    f = t(f, 0),
                    p = t(p, 0);
                c.push(f, p, h), c.push(p, d, h)
            }
            this.coast_count = c.length - this.coast_start;
            for (var g = vec3.create(), m = vec3.create(), v = 14, l = 0; l < c.length; l += 3)
                for (var f = c[l + 0], p = c[l + 1], y = c[l + 2], b = 0; 2 > b; ++b) {
                    for (var _ = 6 * b, x = 0; 3 > x; ++x) g[x] = r[v * p + _ + x] - r[v * f + _ + x], m[x] = r[v * y + _ + x] - r[v * f + _ + x];
                    vec3.cross(a, g, m), vec3.normalize(a, a);
                    for (var x = 0; 3 > x; ++x) r[v * f + _ + 3 + x] += a[x], r[v * p + _ + 3 + x] += a[x], r[v * y + _ + 3 + x] += a[x]
                }
            vec3.forEach(r, v, 3, 0, function (e) {
                vec3.normalize(e, e)
            }), vec3.forEach(r, v, 9, 0, function (e) {
                vec3.normalize(e, e)
            }), this.buffers.map.vert = webgl.makeVertexBuffer(new Float32Array(r)), this.buffers.map.face = webgl.makeElementBuffer(new Uint16Array(c)), this.buffers.map.line = webgl.makeElementBuffer(new Uint16Array(o.lines)), this.face_count = o.faces.length, this.line_count = o.lines.length, this.map_vert_stride_bytes = 56
        }, r.prototype.draw = function (e) {
            if (this.buffers.map.vert) {
                gl.disable(gl.BLEND), gl.enable(gl.CULL_FACE), gl.cullFace(gl.BACK), gl.enable(gl.DEPTH_TEST);
                var n = !0,
                    r = !0,
                    o = !0,
                    i = !0,
                    a = smoothstep(e.projection.blend),
                    u = .25 > a;
                if (n) {
                    var s = this.programs.grid.use();
                    s.uniformMatrix4fv("mvp", e.camera.mvp), s.uniformSampler2D("t_blur", this.textures.blur), s.uniformSampler2D("t_pattern", this.textures.pattern), s.uniform2fv("pattern_scale", t), s.uniform1f("blend", a), "dark" === e.palette ? (s.uniform3f("color0", .07, .09, .07), s.uniform3f("color1", .36, .41, .36)) : (s.uniform3f("color0", .93, .95, .93), s.uniform3f("color1", .42, .48, .42));
                    var l = this.grid_vert_stride_bytes;
                    webgl.bindVertexBuffer(this.buffers.grid.vert), s.vertexAttribPointer("position", 3, gl.FLOAT, !1, l, 0), s.vertexAttribPointer("position2", 3, gl.FLOAT, !1, l, 24), s.vertexAttribPointer("texcoord", 2, gl.FLOAT, !1, l, 48), s.uniform4f("color", 1, 1, 1, 1), webgl.bindElementBuffer(this.buffers.grid.elem), s.uniform1f("offset_x", 0), gl.drawElements(gl.TRIANGLES, this.grid_elem_count, gl.UNSIGNED_SHORT, 0), u && (s.uniform1f("offset_x", -20), gl.drawElements(gl.TRIANGLES, this.grid_elem_count, gl.UNSIGNED_SHORT, 0), s.uniform1f("offset_x", 20), gl.drawElements(gl.TRIANGLES, this.grid_elem_count, gl.UNSIGNED_SHORT, 0))
                }
                if (r) {
                    var s = this.programs.main.use();
                    s.uniformMatrix4fv("mvp", e.camera.mvp), s.uniformSampler2D("t_blur", this.textures.blur), s.uniform1f("blend", a), s.uniform3fv("view_pos", e.camera.viewPos), s.uniform3fv("light_pos", e.light.position);
                    var l = this.map_vert_stride_bytes;
                    if (webgl.bindVertexBuffer(this.buffers.map.vert), s.vertexAttribPointer("position", 3, gl.FLOAT, !1, l, 0), s.vertexAttribPointer("normal", 3, gl.FLOAT, !1, l, 12), s.vertexAttribPointer("position2", 3, gl.FLOAT, !1, l, 24), s.vertexAttribPointer("normal2", 3, gl.FLOAT, !1, l, 36), s.vertexAttribPointer("texcoord", 2, gl.FLOAT, !1, l, 48), s.uniform1f("alpha", 1), "dark" === e.palette ? (s.uniform3f("color0", .1, .12, .11), s.uniform3f("color1", .2, .23, .21)) : (s.uniform3f("color0", .41, .61, .48), s.uniform3f("color1", .51, .69, .53)), gl.disable(gl.BLEND), gl.enable(gl.CULL_FACE), gl.cullFace(gl.BACK), gl.enable(gl.DEPTH_TEST), webgl.bindElementBuffer(this.buffers.map.face), _.each(this.countries, function (e) {
                        s.uniform1f("tone", e.tone), s.uniform1f("offset_x", 0), gl.drawElements(gl.TRIANGLES, e.face_count, gl.UNSIGNED_SHORT, e.face_offset << 1), u && (s.uniform1f("offset_x", -20), gl.drawElements(gl.TRIANGLES, e.face_count, gl.UNSIGNED_SHORT, e.face_offset << 1), s.uniform1f("offset_x", 20), gl.drawElements(gl.TRIANGLES, e.face_count, gl.UNSIGNED_SHORT, e.face_offset << 1))
                    }), gl.depthFunc(gl.LESS), i && (gl.disable(gl.CULL_FACE), s.uniform1f("tone", .5), s.uniform1f("offset_x", 0), gl.drawElements(gl.TRIANGLES, this.coast_count, gl.UNSIGNED_SHORT, this.coast_start << 1), u && (s.uniform1f("offset_x", -20), gl.drawElements(gl.TRIANGLES, this.coast_count, gl.UNSIGNED_SHORT, this.coast_start << 1), s.uniform1f("offset_x", 20), gl.drawElements(gl.TRIANGLES, this.coast_count, gl.UNSIGNED_SHORT, this.coast_start << 1))), gl.enable(gl.BLEND), gl.blendFunc(gl.SRC_ALPHA, gl.ONE), gl.disable(gl.DEPTH_TEST), gl.enable(gl.CULL_FACE), e.pick_index >= 0) {
                        var c = this.countries[e.pick_index];
                        s.uniform1f("tone", 1), s.uniform1f("alpha", .5), s.uniform1f("offset_x", 0), gl.drawElements(gl.TRIANGLES, c.face_count, gl.UNSIGNED_SHORT, c.face_offset << 1)
                    }
                    gl.disable(gl.CULL_FACE)
                }
                if (o) {
                    gl.enable(gl.DEPTH_TEST), gl.depthMask(!1);
                    var s = this.programs.line.use();
                    s.uniformMatrix4fv("mvp", e.camera.mvp), s.vertexAttribPointer("position", 3, gl.FLOAT, !1, l, 0), s.vertexAttribPointer("position2", 3, gl.FLOAT, !1, l, 24), s.uniform1f("blend", a), s.uniform4f("color", 1, 1, 1, .125), webgl.bindElementBuffer(this.buffers.map.line), gl.drawElements(gl.LINES, this.line_count, gl.UNSIGNED_SHORT, 0), gl.depthMask(!0)
                }
                gl.disable(gl.DEPTH_TEST), gl.disable(gl.CULL_FACE)
            }
        }, r.prototype.pick = function () {
            function e(e, i, a) {
                var u = e.camera.viewport,
                    s = t,
                    l = n,
                    c = n;
                mat4.identity(s), mat4.translate(s, s, [(u[2] - 2 * (i - u[0])) / l, -(u[3] - 2 * (a - u[1])) / c, 0]), mat4.scale(s, s, [u[2] / l, u[3] / c, 1]), mat4.multiply(s, s, e.camera.mvp);
                var f = o();
                gl.viewport(0, 0, n, n), gl.bindFramebuffer(gl.FRAMEBUFFER, f), gl.clearColor(0, 0, 1, 0), gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT), gl.disable(gl.BLEND), gl.enable(gl.CULL_FACE), gl.cullFace(gl.BACK), gl.enable(gl.DEPTH_TEST);
                var p = this.programs.pick.use();
                p.uniformMatrix4fv("mvp", s), webgl.bindVertexBuffer(this.buffers.map.vert);
                var h = this.map_vert_stride_bytes,
                    d = e.projection.blend < .5 ? 0 : 24;
                p.vertexAttribPointer("position", 3, gl.FLOAT, !1, h, d), webgl.bindElementBuffer(this.buffers.map.face), _.each(this.countries, function (e, t) {
                    p.uniform1f("color", t / 255), gl.drawElements(gl.TRIANGLES, e.face_count, gl.UNSIGNED_SHORT, e.face_offset << 1)
                }), gl.disable(gl.CULL_FACE), gl.disable(gl.DEPTH_TEST), gl.readPixels(0, 0, n, n, gl.RGBA, gl.UNSIGNED_BYTE, r), gl.bindFramebuffer(gl.FRAMEBUFFER, null), gl.viewport(u[0], u[1], u[2], u[3]);
                for (var g = -1, m = 0, v = {}, y = 0; y < r.length; y += 4)
                    if (r[y + 3]) {
                        var b = r[y + 1] << 8 | r[y + 0],
                            x = v[b] || 0;
                        v[b] = ++x, x > m && (g = b, m = x)
                    }
                return g
            }

            var t = mat4.create(),
                n = 4,
                r = new Uint8Array(n * n << 2),
                o = function () {
                    function e() {
                        t = gl.createFramebuffer(), gl.bindFramebuffer(gl.FRAMEBUFFER, t);
                        var e = webgl.createTexture2D({
                            size: n
                        });
                        gl.bindTexture(gl.TEXTURE_2D, e), gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, e, 0);
                        var r = gl.createRenderbuffer();
                        gl.bindRenderbuffer(gl.RENDERBUFFER, r), gl.renderbufferStorage(gl.RENDERBUFFER, gl.DEPTH_COMPONENT16, n, n), gl.framebufferRenderbuffer(gl.FRAMEBUFFER, gl.DEPTH_ATTACHMENT, gl.RENDERBUFFER, r), gl.bindRenderbuffer(gl.RENDERBUFFER, null), gl.bindFramebuffer(gl.FRAMEBUFFER, null)
                    }

                    var t = null;
                    return function () {
                        return t || e(), t
                    }
                }();
            return e
        }(), r
    }()
}();
var GTW = window.GTW || {};
GTW.init_scape = function(e, t) {
    function n(e, t) {
        e += F[0], t += F[1];
        for (var n = 16, r = 0, o = .5; n--;) r += o * noise.perlin2(e, t), o *= .5, e *= 2, t *= 2;
        return r
    }

    function r(e) {
        return .5 + .5 * noise.perlin2(I * e + F[0], F[1])
    }

    function o(t, n, r, o) {
        O(t, n, r, o), e.project(t, t)
    }

    function i() {
        F[0] = 100 * Math.random(), F[1] = 100 * Math.random(), P = lerp(1.5, 5.5, Math.random()), j = lerp(2, 3, Math.random()), I = lerp(1, 7, Math.random()), console.log(F, P, j, I);
        for (var e = 0, t = 0; m > t; ++t)
            for (var n = 0; v > n; ++n) {
                var r = n / (v - 1),
                    i = t / (m - 1);
                o(S, r, i), y[e + 0] = S[0], y[e + 1] = S[1], y[e + 2] = S[2], e += 4
            }
        webgl.bindVertexBuffer(V.verts), gl.bufferSubData(gl.ARRAY_BUFFER, 0, y)
    }

    function a() {
        vec3.lerp(it, it, at, .05), vec3.lerp(nt, nt, rt, .05), vec3.lerp(at, at, ot, .05), vec3.lerp(rt, rt, tt, .05);
        var t = K.scape.use();
        t.uniformMatrix4fv("mvp", e.camera.mvp), t.uniform4fv("color", nt), t.uniform3fv("fog_color", it), t.uniformSampler2D("pattern", Y.pattern), webgl.bindVertexBuffer(V.verts), t.vertexAttribPointer("position", 4, gl.FLOAT, !1, 0, 0), webgl.bindVertexBuffer(V.texcoords), t.vertexAttribPointer("texcoord", 2, gl.FLOAT, !1, 0, 0), webgl.bindElementBuffer(V.quads), gl.disable(gl.BLEND), gl.enable(gl.DEPTH_TEST), gl.enable(gl.POLYGON_OFFSET_FILL), gl.polygonOffset(1, 1), gl.drawElements(gl.TRIANGLE_STRIP, z, gl.UNSIGNED_SHORT, 0), gl.disable(gl.POLYGON_OFFSET_FILL), gl.enable(gl.BLEND), gl.blendFunc(gl.SRC_ALPHA, gl.ONE);
        var t = K.scape_lines.use();
        t.uniformMatrix4fv("mvp", e.camera.mvp), t.uniform4f("color", 140 / 255, 160 / 255, 138 / 255, .5), webgl.bindVertexBuffer(V.verts), t.vertexAttribPointer("position", 4, gl.FLOAT, !1, 0, 0), webgl.bindElementBuffer(V.lines), gl.drawElements(gl.LINES, X, gl.UNSIGNED_SHORT, 0)
    }

    function s(e) {
        return -e * Math.log(1 - MersenneTwister.random())
    }

    function u() {
        ct = 0, i(), ft = s(pt), ht = !0
    }

    function l() {
        var n = ct / lt;
        n *= .8, ct += 1 / 60;
        var i = r(n);
        if (o(J, n, i, 0), o(Q, n + .01, i, 0), vec3.sub(ut, Q, J), vec3.normalize(ut, ut), vec3.normalize(C, J), o(J, n, i), vec3.scaleAndAdd(J, J, C, .5), ht ? (vec3.copy(st, J), d.move_to(st, ut, C), vec3.copy(p.pos, d.pos), vec3.copy(p.rot, d.rot), ht = !1) : (vec3.lerp(st, st, J, .1), d.move_to(st, null, C), p.follow(d.pos, d.rot, .1, .05)), p.roll(.01 * noise.perlin2(e.time, .934)), ct > ft) {
            ft = ct + s(pt);
            var a = _.random(6) + 1;
            if (Math.random() < .3) {
                var u = J,
                    l = null,
                    c = Math.random(),
                    f = n + lerp(.01, .2, c),
                    h = r(f) + Random.gauss(0, .1);
                O(u, f, h);
                var g = t.launch(e, a, u, l);
                vec3.scaleAndAdd(at, at, g.color, .5 * c), vec3.scaleAndAdd(rt, rt, g.color, .5 * (1 - c)), .1 > c && (e.flash(g.color), dt = 1)
            } else {
                var l = J,
                    u = Q,
                    f = Random.uniform(n + .2, 1),
                    h = r(f) + Random.gauss(0, .1),
                    m = Random.uniform(0, 1),
                    v = Random.uniform(0, 1);
                O(u, f, h), O(l, m, v), t.launch(e, a, u, l, 30)
            }
        }
    }

    function c() {
        if (vec3.copy(J, p.pos), e.camera.update_quat(J, p.rot), dt > .001) {
            var t = 5 * e.time,
                r = 3 * Math.sin(Math.PI * dt);
            e.camera.mvp[12] += .2 * r * n(t, .3123123), e.camera.mvp[13] += 1.5 * r * (n(t, .9123123) - .125), mat4.invert(e.camera.mvpInv, e.camera.mvp), dt *= .85
        }
    }
    var f = function() {
            function e() {
                this.pos = vec3.create(), this.rot = quat.create(), this.tan = vec3.create(), this.forward = vec3.fromValues(0, 0, -1), this.up = vec3.fromValues(0, 1, 0)
            }
            var t = vec3.create(),
                n = vec3.create(),
                r = vec3.create(),
                o = vec3.create(),
                i = quat.create(),
                a = quat.create(),
                s = vec3.create(),
                u = vec3.create();
            return e.prototype.move_to = function(e, l, c) {
                if (vec3.copy(t, e), vec3.copy(n, this.pos), vec3.copy(o, this.tan), vec3.sub(r, t, n), vec3.normalize(r, r), quat.copy(a, this.rot), c) {
                    vec3.transformQuat(s, this.up, this.rot), vec3.copy(u, c);
                    var f = vec3.dot(s, u);.999999 > f && (vec3.cross(i, s, u), i[3] = 1 + f, quat.normalize(i, i), quat.multiply(i, i, a), quat.dot(a, i) < 0 && quat.scale(i, i, -1)), quat.copy(this.rot, i), quat.copy(a, i)
                }
                if (l) vec3.normalize(this.tan, l), quat.rotationTo(this.rot, this.forward, this.tan);
                else {
                    var f = vec3.dot(o, r);.999999 > f && (vec3.cross(i, o, r), i[3] = 1 + f, quat.normalize(i, i), quat.multiply(i, i, a), quat.dot(a, i) < 0 && quat.scale(i, i, -1)), vec3.copy(this.tan, r), quat.copy(this.rot, i)
                }
                vec3.copy(this.pos, t)
            }, e.prototype.follow = function(e, t, n, r) {
                vec3.lerp(this.pos, this.pos, e, n || .05), vec4.lerp(this.rot, this.rot, t, r || .02), quat.normalize(this.rot, this.rot)
            }, e.prototype.roll = function(e) {
                var t = this.rot;
                quat.rotateZ(t, t, e)
            }, e
        }(),
        p = new f,
        d = new f,
        h = [-180, 0, 0],
        g = [180, 0, 0],
        m = 128,
        v = 512,
        y = [],
        b = [],
        w = [],
        T = [],
        x = vec3.fromValues(h[0], h[1], 0),
        E = vec3.fromValues(g[0], g[1], 0),
        A = vec3.create(),
        M = vec3.create();
    vec3.sub(A, E, x), vec2.normalize(A, A), vec2.perp(M, A);
    var R = 360,
        k = .2 * R;
    vec2.scale(A, A, R), vec2.scale(M, M, k);
    for (var S = vec4.create(), C = vec3.create(), N = 3, D = Math.pow, L = Math.abs, F = vec2.create(), P = 2.5, j = 3, I = 2, O = function() {
            var e = vec3.create();
            return function(t, o, i, a) {
                "undefined" == typeof a && (a = 1), vec3.set(e, 0, 0, 0), vec3.scaleAndAdd(e, E, A, o), vec3.scaleAndAdd(e, e, M, 2 * (i - .5));
                var s = r(o),
                    u = L(i - s),
                    l = .05 + .95 * smoothstep(clamp(P * u, 0, 1)),
                    c = a * (n(8 * N * o, N * i) + 1);
                l *= D(c, j), l -= .075, 0 > l ? l = 0 : l *= 2;
                var f = .25 * (1 + noise.perlin2(8 * o, 1 * i)) + .05 * n(8 * o, i);
                l += f, e[2] = .5 * l, vec3.copy(t, e)
            }
        }(), U = 0; m > U; ++U)
        for (var B = 0; v > B; ++B) {
            var W = B / (v - 1),
                G = U / (m - 1);
            o(S, W, G), y.push(S[0], S[1], S[2], 0), b.push(B, U);
            var q = U * v + B,
                H = q + 1,
                $ = q + v;
            v - 1 > B && T.push(q, H), m - 1 > U && T.push(q, $), m - 1 > U && (U && !B && w.push(q), w.push(q, $), m - 2 > U && B == v - 1 && w.push($))
        }
    y = new Float32Array(y);
    y.length / 4;
    w = new Uint16Array(w);
    var z = w.length;
    T = new Uint16Array(T);
    var X = T.length;
    b = new Float32Array(b);
    var V = {
            verts: webgl.makeVertexBuffer(y),
            quads: webgl.makeElementBuffer(w),
            lines: webgl.makeElementBuffer(T),
            texcoords: webgl.makeVertexBuffer(b)
        },
        Y = {
            pattern: webgl.loadTexture2D("textures/pattern2.png", {
                mipmap: !0,
                wrap: gl.REPEAT,
                aniso: 4
            })
        },
        K = {
            scape: webgl.getProgram("scape"),
            scape_lines: webgl.getProgram("scape_lines")
        },
        J = vec3.create();
    vec3.copy(J, E);
    var Q = vec3.clone(J);
    vec3.scaleAndAdd(Q, J, A, 1), e.project(J, J), e.project(Q, Q);
    var Z = (vec3.create(), vec3.create());
    vec3.sub(Z, Q, J);
    var et = vec3.create();
    vec3.add(et, J, Q), vec3.normalize(et, et);
    var tt = function() {
            var e = vec4.fromValues(.1, .12, .11, 1),
                t = vec4.fromValues(.2, .23, .21, 1),
                n = .1,
                r = vec4.create();
            return vec4.lerp(r, e, t, n), r
        }(),
        nt = vec4.clone(tt),
        rt = vec4.clone(tt),
        ot = vec3.fromValues(.01, .05, .02),
        it = vec3.clone(ot),
        at = vec3.clone(ot),
        J = vec3.create(),
        Q = vec3.create(),
        st = vec3.create(),
        ut = vec3.create(),
        C = vec3.create(),
        lt = 10,
        ct = lt + 1,
        ft = 0,
        pt = .3,
        dt = 0,
        ht = !0;
    return {
        reset: u,
        draw: a,
        update: l,
        update_camera: c,
        shake: function() {
            dt = 1
        }
    }
};
var GTW = window.GTW || {};
GTW.init_demo = function(e, t) {
    function n(e) {
        var t = 16;
        return _.times(t, e.create)
    }

    function r(t, n, r, o) {
        function i(e) {
            gl.enable(gl.DEPTH_TEST), gl.depthMask(!1), gl.lineWidth(5), gl.enable(gl.BLEND), gl.blendFunc(gl.SRC_ALPHA, gl.ONE);
            var t = L.rings.use();
            t.uniformMatrix4fv("mvp", e.camera.mvp), t.uniform3fv("color", r), webgl.bindVertexBuffer(D.ring_verts), t.vertexAttribPointer("position", 4, gl.FLOAT, !1, 0, 0), gl.drawArrays(gl.TRIANGLE_STRIP, 0, C), gl.lineWidth(1), gl.enable(gl.BLEND), gl.blendFunc(gl.SRC_ALPHA, gl.ONE);
            var t = L.missile.use();
            t.uniformMatrix4fv("mvp", e.camera.mvp), t.uniform3fv("color", r);
            var n = clamp(e.demo_time / 5, 0, 2);
            t.uniform1f("time", n), webgl.bindVertexBuffer(D.tube_verts), t.vertexAttribPointer("position", 4, gl.FLOAT, !1, 0, 0), gl.drawArrays(gl.TRIANGLE_STRIP, 0, N), gl.depthMask(!0), gl.disable(gl.BLEND), gl.disable(gl.DEPTH_TEST);
            var o = Math.max(0, e.demo_time);
            o /= 5, o -= ~~o;
            var i = o * (g - 1),
                a = ~~i;
            i -= a;
            var s = 6 * a;
            vec3.set(P, 0, 0, 0), vec3.set(j, 0, 0, 0);
            for (var u = 0; 2 > u; ++u) {
                i = 1 - i;
                for (var l = 0; 3 > l; ++l) P[l] += i * _[s + l], j[l] += i * _[s + 3 + l];
                s += 6
            }
            F.look(P, j, P)
        }
        for (var t = vec3.clone(t), n = vec3.clone(n), a = vec2.distance(t, n), s = .005 * a, u = vec3.create(), l = vec3.create(), c = 0, d = u, h = l, g = 103, m = new Float32Array(4 * g * 8), v = 0; g > v; ++v) {
            var y = v / (g - 1);
            vec3.lerp(h, t, n, y);
            var b = s * Math.sin(y * Math.PI) * .85;
            h[2] += b, e.project(d, h), vec3.save(d, m, c + 0), m[c + 3] = -y, vec3.save(d, m, c + 4), m[c + 7] = y, c += 8
        }
        for (var _ = [], w = 0, T = u, x = l, E = vec3.create(), v = 0; g > v; ++v) vec3.load(T, m, w), _.push(T[0], T[1], T[2]), g - 1 > v && (vec3.load(x, m, w + 8), vec3.sub(E, x, T)), _.push(E[0], E[1], E[2]), w += 8;
        for (var A = function() {
                function e() {
                    this.P = vec3.create(), this.T = vec3.create(), this.Q = quat.create()
                }
                return e.prototype.update = function() {
                    vec3.normalize(this.T, this.T), quat.rotationTo(this.Q, [0, 0, 1], this.T)
                }, e.prototype.transform = function(e, t) {
                    vec3.transformQuat(e, t, this.Q), vec3.add(e, e, this.P)
                }, e
            }(), M = [], w = 0; w < _.length; w += 6) {
            var R = new A;
            vec3.load(R.P, _, w + 0), vec3.load(R.T, _, w + 3), R.update(), quat.rotateZ(R.Q, R.Q, TWO_PI * v / g), M.push(R)
        }
        var k = [],
            S = [];
        ! function() {
            function e(e, t, r, o, i) {
                n[0] = Math.cos(r) * o, n[1] = Math.sin(r) * o, n[2] = 0, t.transform(n, n), e.push(n[0], n[1], n[2], i)
            }

            function t(e) {
                var t = e.length - 4;
                e.push(e[t + 0], e[t + 1], e[t + 2], e[t + 3])
            }
            var n = vec3.create(),
                r = (vec3.create(), 0 > o);
            o = Math.abs(o);
            for (var i = 0; i < M.length; ++i)
                for (var a = M[i], s = M[i + 1], u = i / (g - 1), l = lerp(.02, .07, u), c = (r ? Math.PI : TWO_PI) / o, f = 0, p = 15e-5 / l, d = 0; o >= d; ++d) {
                    var h = i && !d;
                    r && d == o && (f = 0), h && t(S), e(S, a, f, l - p, -u), h && t(S), e(S, a, f, l + p, u), s && (h && t(k), e(k, a, f, l, u), h && t(k), e(k, s, f, l, u)), f += c
                }
        }(), S = new Float32Array(S), k = new Float32Array(k);
        var C = S.length / 4,
            N = k.length / 4,
            D = {
                verts: webgl.makeVertexBuffer(m),
                ring_verts: webgl.makeVertexBuffer(S),
                tube_verts: webgl.makeVertexBuffer(k)
            },
            L = {
                missile: webgl.getProgram("missile_tube"),
                simple: webgl.getProgram("simple"),
                rings: webgl.getProgram("rings")
            },
            F = new f;
        p.missile = F; {
            var P = vec3.create(),
                j = vec3.create();
            vec3.create()
        }
        return {
            draw: i
        }
    }

    function o() {
        var n, r = p.player,
            o = e.camera;
        if (e.demo_time < 5) {
            d = 0, o.near = .01, o.far = 1e3, n = p.missile;
            var i = e.demo_time / 5;
            r.follow(n.pos, n.rot, .01 + .5 * i, i * i), r.roll(.1 * noise.perlin2(1 * e.demo_time, 0))
        } else if (e.demo_time < 15) 0 == d && (d = 1, e.flash(c), u.reset(), t.set_mode("scape"), e.draw_world = !1, console.log("ENTER SCAPE"));
        else if (e.demo_time < 20) {
            1 == d && (d = 2, e.flash(c), t.set_mode("world"), e.draw_world = !0, console.log("EXIT SCAPE")), o.near = .01, o.far = 500, n = p.orbit;
            var i = (e.demo_time - 15) / 5;
            return r.follow(n.pos, n.rot, 5e-5 + .5 * Math.pow(i, 3), .2), void o.update_quat(r.pos, r.rot, i)
        }
        o.update_quat(r.pos, r.rot)
    }

    function i(e) {
        o(), e.draw_world || (u.update(), u.update_camera())
    }

    function a(e) {
        e.draw_world ? l && e.demo_time < 5 && l.draw(e) : (u.draw(e), t.draw(e))
    }

    function s(e, t, n) {
        console.log("demo setup:", t, n);
        var o = GTW.systems[e.solo_system_id],
            i = o.color[e.palette].f;
        vec3.copy(c, i), l = r(t, n, i, o.n_sides);
        var a = p.player;
        vec3.copy(a.pos, e.camera.viewPos), quat.rotationTo(a.rot, [0, 0, -1], e.camera.viewDir);
        var s = [n[0], n[1], 1.6];
        e.project(p.orbit.pos, s);
        var u = vec3.clone(p.orbit.pos);
        vec3.normalize(u, u), vec3.negate(u, u), quat.rotationTo(p.orbit.rot, [0, 0, -1], u)
    }
    var u = GTW.init_scape(e, t),
        l = null,
        c = vec3.create(),
        f = function() {
            function e() {
                this.pos = vec3.create(), this.rot = quat.create()
            }
            var t = vec3.create(),
                n = vec3.fromValues(0, 1, 0),
                r = (vec3.create(), vec3.create(), vec3.create(), vec3.fromValues(0, 0, 1), mat4.create()),
                o = mat3.create(),
                i = vec3.create();
            e.prototype.look = function(e, t, a) {
                a = a || n, vec3.copy(this.pos, e), vec3.add(i, e, t), mat4.lookAt(r, e, i, a), mat3.fromMat4(o, r), mat3.invert(o, o);
                var s = this.rot;
                quat.fromMat3(s, o), quat.normalize(s, s)
            };
            var a = vec3.create();
            return e.prototype.look_at = function(e, r, o) {
                r = r || t, o = o || n, vec3.sub(a, r, e), this.look(e, a, o)
            }, e.prototype.move_forward = function() {
                vec3.set(a, 0, 0, 1), vec3.transformQuat(a, a, this.rot);
                var e = .1;
                vec3.scaleAndAdd(this.pos, this.pos, a, e)
            }, e.prototype.follow = function(e, t, n, r) {
                vec3.lerp(this.pos, this.pos, e, n || .05), vec4.lerp(this.rot, this.rot, t, r || .02), quat.normalize(this.rot, this.rot)
            }, e.prototype.roll = function(e) {
                var t = this.rot;
                quat.rotateZ(t, t, e)
            }, e
        }(),
        p = ({
            vec3: n(vec3),
            vec4: n(vec4),
            quat: n(quat),
            mat4: n(mat4),
            mat3: n(mat3)
        }, {
            missile: new f,
            player: new f,
            orbit: new f
        }),
        d = 0;
    return {
        draw: a,
        setup: s,
        update: i
    }
};
var GTW = GTW || {};
! function () {
    GTW.Labels = function () {
        function e() {
            this.buffers = {
                vert: null
            }, this.programs = {
                label: webgl.getProgram("label")
            }, this.texture = webgl.createTexture2D({
                size: t,
                mipmap: !0,
                min: gl.LINEAR_MIPMAP_LINEAR,
                aniso: 4,
                format: gl.LUMINANCE
            }), gl.generateMipmap(gl.TEXTURE_2D), this.country_count = 0, this.labels = [];
            var e = this;
            this.load_label_data(function () {
                e.render_labels("en"), e.project_labels("ecef")
            })
        }

        var t = 2048;var count_city = 0;
        e.prototype.load_label_data = function (e) {
            var t = this;
            $.getJSON("data/labels.json", function (n) {
                function r() {
                    this.coord = vec3.create(), this.coord[2] = 1e-4, this.pos = vec3.create(), this.mat = mat4.create(), this.box = vec4.create(), this.name = {
                        en: "",
                        ru: ""
                    }, this.font_size = 0
                }

                function o(e, n, o) {
                    _.each(e, function (e) {
                        if (n) {
                            if (o && e.font_size < 5) return;
                            if (!o && e.font_size > 5) return
                        }
                        var i = new r;count_city = count_city + 1;
                        vec2.copy(i.coord, e.coord), i.coord[2] *= 2, i.name = e.name, i.font_size = e.font_size, n ? (i.name.en = i.name.en.toUpperCase()/*, i.name.ru = i.name.ru.toUpperCase()*/) : i.font_size = 3, e.iso2 && (i.iso2 = e.iso2), t.labels.push(i)
                    })
                }
				
                o(n.countries, !0, !0), t.country_count = t.labels.length, o(n.cities, !1, !1), o(n.countries, !0, !1), t.city_count = t.labels.length - t.country_count;
                var i = 30 * t.labels.length;;
                t.buffers.vert = webgl.makeVertexBuffer(new Float32Array(i)), e()
            })
        }, e.prototype.render_labels = function (e) {
            var n = document.createElement("canvas");
            n.width = n.height = t;
            var r = n.getContext("2d");
            r.fillStyle = "#000", r.fillRect(0, 0, n.width, n.height), r.font = "18px Ubuntu", r.fillStyle = "white", r.textBaseline = "top";
            var o = [0, 0],
                i = 20;
            _.each(this.labels, function (a) {
                var u = a.name[e],
                    s = r.measureText(u).width;
                o[0] + s >= n.width && (o[0] = 0, o[1] += i), r.fillText(u, o[0], o[1] - 0), vec4.set(a.box, o[0], o[1], o[0] + s, o[1] + i), vec4.scale(a.box, a.box, 1 / t), o[0] += s
            }), gl.bindTexture(gl.TEXTURE_2D, this.texture), gl.texSubImage2D(gl.TEXTURE_2D, 0, 0, 0, gl.LUMINANCE, gl.UNSIGNED_BYTE, n), gl.generateMipmap(gl.TEXTURE_2D)
        }, e.prototype.project_labels = function (e) {
            function t(t, n, a, u) {
                mat4.identity(t), "ecef" == e && (vec3.normalize(r, n), vec3.set(o, 0, 1, 0), vec3.cross(o, r, o), vec3.normalize(o, o), vec3.cross(i, o, r), t[0] = o[0], t[1] = o[1], t[2] = o[2], t[4] = r[0], t[5] = r[1], t[6] = r[2], t[8] = i[0], t[9] = i[1], t[10] = i[2], mat4.rotateX(t, t, HALF_PI)), mat4.scale(t, t, [a, u, 1]), t[12] = n[0], t[13] = n[1], t[14] = n[2]
            }

            var n = "ecef" == e ? GTW.project_ecef : GTW.project_mercator,
                r = vec3.create(),
                o = vec3.create(),
                i = vec3.create(),
                a = [],
                u = vec3.create(),
                s = [-1, -1, -1, 1, 1, 1, -1, -1, 1, 1, 1, -1];
            _.each(this.labels, function (e) {
                n(e.pos, e.coord);
                var r = 1 * e.font_size;
                t(e.mat, e.pos, r * (e.box[2] - e.box[0]), r * (e.box[3] - e.box[1]));
                for (var o = 0; o < s.length; o += 2) u[0] = s[o + 0], u[1] = s[o + 1], u[2] = 0, vec3.transformMat4(u, u, e.mat), a.push(u[0], u[1], u[2]), u[0] = .5 * (1 + s[o + 0]), u[1] = .5 * (1 + s[o + 1]), u[0] = lerp(e.box[2], e.box[0], u[0]), u[1] = lerp(e.box[3], e.box[1], u[1]), a.push(u[0], u[1])
            }), webgl.bindVertexBuffer(this.buffers.vert), gl.bufferSubData(gl.ARRAY_BUFFER, 0, new Float32Array(a))
        };
        var n = vec3.create();
        return e.prototype.draw = function (e) {
            if (0 != this.labels.length) {
                gl.enable(gl.DEPTH_TEST), gl.enable(gl.BLEND), gl.blendFunc(gl.SRC_ALPHA, gl.ONE), gl.depthMask(!1), e.project(n, e.geocam.coord);
                var t = 3,
                    r = 10,
                    o = lerp(t, r, e.projection.blend),
                    i = this.programs.label.use();
                i.uniformMatrix4fv("mvp", e.camera.mvp), i.uniform4f("circle_of_interest", n[0], n[1], n[2], o), i.uniformSampler2D("t_color", this.texture), webgl.bindVertexBuffer(this.buffers.vert), i.vertexAttribPointer("position", 3, gl.FLOAT, !1, 20, 0), i.vertexAttribPointer("texcoord", 2, gl.FLOAT, !1, 20, 12), i.uniform1i("inside", 0), gl.drawArrays(gl.TRIANGLES, 0, 6 * this.country_count), i.uniform1i("inside", 1), gl.drawArrays(gl.TRIANGLES, 6 * this.country_count, 6 * this.city_count), gl.depthMask(!0), gl.disable(gl.BLEND)
            }
        }, e
    }()
}();
var GTW = GTW || {};
/*GTW.SHADER_SOURCES = {
    "missile.fragment": "void main() {\nvec3 N = normalize(v_normal);\nvec3 V = normalize(v_view_vec);\nfloat NdotV = max(0.0, dot(N, V));\nfloat w = 1.0 - pow(abs(v_v), 4.0);\ngl_FragColor.rgb = color.rgb;\ngl_FragColor.a = pow(max(0.0, sin(3.14159 * (v_alpha + (1.0 - 2.0*time)))), 3.5);\ngl_FragColor.a *= w;\n}\n",
    "stars.fragment": "void main() {\ngl_FragColor = color;\n}\n",
    "map_pick.vertex": "void main() {\nvec3 P = position;\ngl_Position = mvp * vec4(P, 1.0);\n}\n",
    map_main: "attribute vec3 position;\nattribute vec3 normal;\nattribute vec3 position2;\nattribute vec3 normal2;\nattribute vec2 texcoord;\nvarying vec3 v_normal;\nvarying vec2 v_texcoord;\nvarying vec3 v_light_vec;\nvarying vec3 v_view_vec;\nuniform mat4 mvp;\nuniform float offset_x;\n\nuniform sampler2D t_blur;\nuniform float blend;\nuniform vec3 light_pos;\nuniform vec3 view_pos;\n\nuniform vec3 color0;\nuniform vec3 color1;\nuniform float tone;\nuniform float alpha;\n",
    "map_grid.vertex": "void main() {\nvec3 P = mix(position, position2, blend);\nP.x += offset_x;\ngl_Position = mvp * vec4(P, 1.0);\nv_texcoord = texcoord;\n}\n",
    "icon.vertex": "void main() {\nfloat spread = 1.0 + (time * 0.3*vertex.z);\nvec3 P = scale * spread * vec3(vertex.xy, -2.50*(vertex.z)*time);\nP = P.xzy;\nP.y = -P.y;\ngl_Position = mvp * mat * vec4(P, 1.0);\nv_alpha = 1.0 - vertex.z/6.0;\n}\n",
    impact: "attribute vec2 position;\nvarying vec2 v_texcoord0;\nvarying vec2 v_texcoord;\nvarying vec2 v_texcoord2;\nvarying vec2 v_texcoord3;\nuniform mat4 mvp;\nuniform vec3 color;\nuniform sampler2D t_color;\nuniform float time;\nuniform mat4 mat;\n",
    "map_main.vertex": "void main() {\nvec3 P = mix(position, position2, blend);\nP.x += offset_x;\ngl_Position = mvp * vec4(P, 1.0);\nv_normal = mix(normal, normal2, blend);\nv_texcoord = texcoord;\nv_light_vec = light_pos - P;\nv_view_vec = view_pos - P;\n}\n",
    "impact.fragment": "void main() {\nvec3 C = texture2D(t_color, v_texcoord).rgb;\nvec3 C2 = texture2D(t_color, v_texcoord2).rgb;\nvec3 C3 = 0.6*texture2D(t_color, v_texcoord3).rgb;\ngl_FragColor.rgb = color.rgb * (C * C2) + C3;\n\n// grid\n{\nfloat x = 0.0;\nvec2 t = 5.0 * (v_texcoord0 - 0.5);\nt = t - floor(t);\nif (t.x < 0.10)\nx += 2.0;\nif (t.y < 0.10)\nx += 2.0;\nx *= 1.0 - 2.0*length(v_texcoord0 - 0.5);\ngl_FragColor.rgb += 0.5 * x * color.rgb;\n}\n\ngl_FragColor.a = 1.0 - pow(2.0*abs(time - 0.5), 2.0);\n}\n",
    label: "attribute vec3 position;\nattribute vec2 texcoord;\nvarying float v_alpha;\nvarying vec2 v_texcoord;\nuniform mat4 mvp;\nuniform vec4 color;\nuniform vec4 circle_of_interest;\nuniform bool inside;\nuniform sampler2D t_color;\n",
    "map_grid.fragment": "void main() {\nfloat pattern = texture2D(t_pattern, pattern_scale * v_texcoord).r;\nfloat blur = texture2D(t_blur, v_texcoord).r;\n\ngl_FragColor.rgb = mix(color0, color1, blur) + vec3(pattern);\ngl_FragColor.a = 1.0;\n}\n",
    "missile.vertex": "void main() {\nfloat u = abs(position.w);\nfloat v = sign(position.w);\nv_v = v;\n\nfloat w = 0.2 + 0.3*(1.0 - pow(2.0*abs(u - 0.5), 2.0));\nw = 0.1 * w * (v - 0.5);\n\nvec3 P = position.xyz;\nP.x += w;\n\nv_normal = normalize(P);\nv_view_vec = normalize(view_position - P);\nv_alpha = u;\ngl_Position = mvp * vec4(P, 1.0);\n}\n",
    stars: "attribute vec4 position;\nuniform mat4 mvp;\nuniform vec4 color;\n",
    "cone.vertex": "void main() {\nv_coord = vec2(0.0, position.y);\nfloat scale = 0.07 * mix(0.15, 0.4, position.y);\nvec3 P = scale * position;\nP.y *= 5.0;\ngl_Position = mvp * mat * vec4(P, 1.0);\n}\n",
    "corona.fragment": "void main() {\nvec2 uv = vec2(5.0*v_texcoord.x + 0.01*time, 0.8 - 1.5*v_texcoord.y);\nfloat smoke = texture2D(t_smoke, uv).r;\nuv = vec2(3.0*v_texcoord.x - 0.007*time, 0.9 - 0.5*v_texcoord.y);\nsmoke *= 1.5*texture2D(t_smoke, uv).r;\n\nfloat t = pow(v_texcoord.y, 0.25);\ngl_FragColor.rgb = mix(color0, color1, t) + 0.3*smoke;\ngl_FragColor.a = 1.0;\n}\n",
    "corona.vertex": "void main() {\nfloat s = 10.0 + (10.0 * vertex.w);\nvec3 P = vec3(s * vertex.xy, 0.0);\nP = bill * P;\ngl_Position = mvp * vec4(P, 1.0);\nv_texcoord = vertex.zw;\n}\n",
    "map_pick.fragment": "void main() {\ngl_FragColor = vec4(color, 0.0, 0.0, 1.0);\n}\n",
    map_line: "attribute vec3 position;\nattribute vec3 position2;\nuniform mat4 mvp;\nuniform vec4 color;\nuniform float blend;\n",
    "map_line.fragment": "void main() {\ngl_FragColor = color;\n}\n\n",
    "icon.fragment": "void main() {\ngl_FragColor.rgb = color;\ngl_FragColor.a = (1.0 - pow(time, 7.0)) * (v_alpha * time);\n}\n",
    "impact.vertex": "#define PI 3.14159265359\n\nvec2 rotate_vec2(vec2 v, float theta) {\nfloat c = cos(theta);\nfloat s = sin(theta);\nreturn vec2(c*v.x - s*v.y, s*v.x + c*v.y);\n}\n\nvoid main() {\nconst float SCALE = 0.08 * 1.25;\nvec3 P = SCALE * vec3(2.0 * (position.x - 0.5), 0.01, 2.0 * (position.y - 0.5));\ngl_Position = mvp * mat * vec4(P, 1.0);\nv_texcoord0 = position.xy;\nfloat impact_scale = 1.0 / (time + 0.1);\nv_texcoord = impact_scale*rotate_vec2(position.xy - 0.5, time) + 0.5;\nv_texcoord2 = impact_scale*rotate_vec2(position.xy - 0.5, -time) + 0.5;\nfloat scale = 1.5 + 0.3*sin(2.0*time);\nv_texcoord3 = scale * impact_scale*rotate_vec2(position.xy - 0.5, -0.32323 * time) + 0.5;\n}\n",
    map_grid: "attribute vec3 position;\nattribute vec3 position2;\nattribute vec2 texcoord;\nvarying vec2 v_texcoord;\nuniform mat4 mvp;\nuniform vec2 pattern_scale;\nuniform sampler2D t_blur;\nuniform sampler2D t_pattern;\nuniform float blend;\nuniform vec3 color0;\nuniform vec3 color1;\nuniform float offset_x;\n",
    missile: "attribute vec4 position;\nvarying vec3 v_normal;\nvarying vec3 v_view_vec;\nvarying float v_alpha;\nvarying float v_v;\nuniform mat4 mvp;\nuniform vec3 view_position;\nuniform vec3 color;\nuniform float time;\n",
    "map_main.fragment": "void main() {\nvec3 N = normalize(-v_normal);\nvec3 V = normalize(v_view_vec);\nvec3 L = normalize(v_light_vec);\nvec3 H = normalize(L + V);\nfloat NdotL = max(0.0, dot(N, L));\nfloat NdotH = max(0.0, dot(N, H));\n\nfloat blur = texture2D(t_blur, v_texcoord).r;\nblur = 1.0*pow(blur, 2.0);\n\nfloat diffuse = 0.5 + 0.5*NdotL;\nfloat specular = 0.75 * pow(NdotH, 15.0);\n\ngl_FragColor.rgb = diffuse * mix(color0, color1, tone) + vec3(specular);\ngl_FragColor.a = alpha;\n}\n",
    "label.vertex": "void main() {\ngl_Position = mvp * vec4(position, 1.0);\nv_alpha = max(0.0, 1.0 - distance(position, circle_of_interest.xyz)/circle_of_interest.a);\nif (!inside)\nv_alpha = pow(1.0 - v_alpha, 6.0);\nv_texcoord = texcoord;\n}\n",
    icon: "attribute vec3 vertex;\nvarying float v_alpha;\nuniform mat4 mvp;\nuniform mat4 mat;\nuniform vec3 color;\nuniform float time;\nuniform float scale;\n",
    map_pick: "attribute vec3 position;\nuniform mat4 mvp;\nuniform float color;\n",
    "stars.vertex": "void main() {\ngl_PointSize = position.w;\ngl_Position = mvp * vec4(position.xyz, 1.0);\n}\n",
    "map_line.vertex": "void main() {\nvec3 P = mix(position, position2, blend);\ngl_Position = mvp * vec4(P, 1.0);\n}\n",
    corona: "attribute vec4 vertex;\nvarying vec2 v_texcoord;\nuniform mat4 mvp;\nuniform mat3 bill;\nuniform vec4 color;\nuniform sampler2D t_smoke;\nuniform float time;\n\nuniform vec3 color0;\nuniform vec3 color1;\n",
    "cone.fragment": "void main() {\ngl_FragColor.rgb = color;\ngl_FragColor.rgb += (1.0 - vec3(v_coord.y)) * 0.2;\ngl_FragColor.a = (1.0 - v_coord.y) * 1.0;\ngl_FragColor.a *= 1.0 - pow(2.0*abs(time - 0.5), 2.0);\n}",
    "label.fragment": "void main() {\ngl_FragColor = texture2D(t_color, v_texcoord);\ngl_FragColor.a = 0.7 * v_alpha;\n}\n",
    cone: "attribute vec3 position;\nvarying vec2 v_coord;\nuniform mat4 mvp;\nuniform vec3 color;\nuniform mat4 mat;\nuniform float time;\n"
};*/
var GTW = GTW || {},
    JOSHUA = JOSHUA || {};
JOSHUA.Global = function (e, t) {
    var n = {
        init: function () {
            var e = t.domain.split(".");
            "ru" === e[e.length - 1] || "ru" === getQs("lang") ? (GTW.UI.set_language("ru"), $(t.body).attr("class", "ru")) : $(t.body).attr("class", "en"), "#display" === t.location.hash && $("html").addClass("display"), $(".demo").click(function () {
                $("html").toggleClass("display")
            }), Modernizr.webgl || $("#abouttypes, #about").removeClass("collapse");
            setTimeout(function () {
                $("#countrypop").removeAttr("style")
            }, 1500);
            $("#controls").on("click", ".flat", function () {
                GTW.UI.map_flat()
            }).on("click", ".globe", function () {
                GTW.UI.map_globe()
            }).on("click", ".color", function () {
                $(t.body).toggleClass("whitemode"), GTW.UI.toggle_palette()
            }).on("click", ".in", function () {
                GTW.UI.zoom_in()
            }).on("click", ".out", function () {
                GTW.UI.zoom_out()
            }).on("click", ".clock", function () {
                $(this).toggleClass("disabled"), GTW.UI.set_counter_mode($(this).hasClass("disabled") ? "since_midnight" : "since_page_load")
            }), $("#livestats, .panel").on("click", function () {
                $(".base").removeClass("collapse"), $("#livestats").find("i").toggleClass("fa-angle-up fa-angle-down"), $(".base").hasClass("collapse") || $("#webgl-canvas, #controls, footer, #livestats").one("click.closelivestats", function () {
                    $(".base").addClass("collapse"), $("#livestats").find("i").toggleClass("fa-angle-up fa-angle-down"), $("#webgl-canvas, #controls, footer, #livestats").off("click.closelivestats"), console.log("collapse livestats")
                })
            }), $("#base").on("click", ".symbol", function () {
                var e = $(this).data("detectiontype");
                GTW.UI.toggle_map(e), $(this).toggleClass("disabled"), $("button[data-detectiontype=" + e + "]").toggleClass("hide show")
            }), $("#detectcount").on("click", "button", function () {
                var e = $(this).data("detectiontype");
                GTW.UI.toggle_map(e), $(this).toggleClass("hide").toggleClass("show"), $("li[data-detectiontype=" + e + "]").toggleClass("disabled")
            }), $("#abouttypes").on("click", function () {
                $("#about, #abouttypes").toggleClass("collapse"), $(this).find("i").toggleClass("fa-angle-up fa-angle-down"), $("#webgl-canvas, #controls, footer, #livestats").one("click.closedetecttypes", function () {
                    $("#abouttypes").find("i").toggleClass("fa-angle-up fa-angle-down"), $("#about, #abouttypes").addClass("collapse"), $("#webgl-canvas, #controls, footer, #livestats").off("click.closedetecttypes"), console.log("collapse livestats")
                })
            }), $("#countrypop").on("click", ".popclose", function () {
                n.countryPopHide()
            }).on("click", "li", function () {
                $("#about, #abouttypes").removeClass("collapse")
            })
        },
        langToggle: function () {
            var e = $(t.body).attr("class"),
                n = "en" === e ? "ru" : "en";
            $(t.body).toggleClass("en ru"), GTW.UI.set_language(n)
        },
        countryPopShow: function () {
            $("#countrypop").hasClass("hidden") ? $("#countrypop").removeClass("hidden") : ($("#countrypop").addClass("pulse"), setTimeout(function () {
                $("#countrypop").removeClass("pulse")
            }, 1e3))
        },
        countryPopHide: function () {
            $("#countrypop").addClass("hidden")
        },
        custom: function (details) {
            for (var i = 1; i <= 14; i++) {
                GTW.systems[i].count = details[i - 1].count;
                GTW.systems[i].target_count = details[i - 1].target_count;
            }
            
        }
    };
    return n
}(this, this.document);