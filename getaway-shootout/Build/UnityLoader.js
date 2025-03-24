var UnityLoader = UnityLoader || {
    Compression: {
        identity: {
            require: function() {
                return {};
            },
            decompress: function(e) {
                return e;
            }
        },
        gzip: {
            require: function(e) {
                var t = {
                    "inflate.js": function(e, t, r) {
                        "use strict";
                        
                        function n(e) {
                            if (!(this instanceof n)) return new n(e);
                            this.options = s.assign({
                                chunkSize: 16384,
                                windowBits: 0,
                                to: ""
                            }, e || {});
                            var t = this.options;
                            t.raw && t.windowBits >= 0 && t.windowBits < 16 && (t.windowBits = -t.windowBits, 0 === t.windowBits && (t.windowBits = -15)),
                            !(t.windowBits >= 0 && t.windowBits < 16) || e && e.windowBits || (t.windowBits += 32),
                            t.windowBits > 15 && t.windowBits < 48 && 0 === (15 & t.windowBits) && (t.windowBits |= 15),
                            this.err = 0,
                            this.msg = "",
                            this.ended = !1,
                            this.chunks = [],
                            this.strm = new c,
                            this.strm.avail_out = 0;
                            var r = i.inflateInit2(this.strm, t.windowBits);
                            if (r !== l.Z_OK) throw new Error(u[r]);
                            this.header = new f,
                            i.inflateGetHeader(this.strm, this.header);
                        }
                        
                        function o(e, t) {
                            var r = new n(t);
                            if (r.push(e, !0), r.err) throw r.msg || u[r.err];
                            return r.result;
                        }

                        function a(e, t) {
                            return t = t || {}, 
                            t.raw = !0, 
                            o(e, t);
                        }

                        var i = e("./zlib/inflate"), 
                            s = e("./utils/common"), 
                            d = e("./utils/strings"), 
                            l = e("./zlib/constants"), 
                            u = e("./zlib/messages"), 
                            c = e("./zlib/zstream"), 
                            f = e("./zlib/gzheader"), 
                            h = Object.prototype.toString;

                        n.prototype.push = function(e, t) {
                            var r, t, n, o, a, u, c, f = this.strm, p = this.options.chunkSize, m = this.options.dictionary, w = !1;

                            if (this.ended) return !1;
                            t = t === ~~t ? t : t === !0 ? l.Z_FINISH : l.Z_NO_FLUSH,
                            "string" == typeof e ? f.input = d.binstring2buf(e) : "[object ArrayBuffer]" === h.call(e) ? f.input = new Uint8Array(e) : f.input = e,
                            f.next_in = 0, f.avail_in = f.input.length;

                            do {
                                if (0 === f.avail_out && (f.output = new s.Buf8(p), f.next_out = 0, f.avail_out = p),
                                    r = i.inflate(f, l.Z_NO_FLUSH),
                                    r === l.Z_NEED_DICT && m && (c = "string" == typeof m ? d.string2buf(m) : "[object ArrayBuffer]" === h.call(m) ? new Uint8Array(m) : m, 
                                    r = i.inflateSetDictionary(this.strm, c)),
                                    r === l.Z_BUF_ERROR && w === !0 && (r = l.Z_OK, w = !1), 
                                    r !== l.Z_STREAM_END && r !== l.Z_OK) 
                                        return this.onEnd(r),
                                        this.ended = !0,
                                        !1;

                                if (f.next_out) 
                                    0 !== f.avail_out && r !== l.Z_STREAM_END && (0 !== f.avail_in || t !== l.Z_FINISH && t !== l.Z_SYNC_FLUSH) || ("string" === this.options.to ? 
                                        (o = d.utf8border(f.output, f.next_out), 
                                        n = f.next_out - o, 
                                        a = d.buf2string(f.output, o), 
                                        f.next_out = n, 
                                        f.avail_out = p - n, 
                                        n && s.arraySet(f.output, f.output, o, n, 0), 
                                        this.onData(a)) : 
                                        this.onData(s.shrinkBuf(f.output, f.next_out))),
                                    0 === f.avail_in && 0 === f.avail_out && (w = !0);
                            } while ((f.avail_in > 0 || 0 === f.avail_out) && r !== l.Z_STREAM_END);

                            return r === l.Z_STREAM_END && (t = l.Z_FINISH), 
                            t === l.Z_FINISH ? (r = i.inflateEnd(this.strm), 
                            this.onEnd(r), 
                            this.ended = !0, 
                            r === l.Z_OK) : 
                            t !== l.Z_SYNC_FLUSH || (this.onEnd(l.Z_OK), 
                            f.avail_out = 0, !0);
                        },

                        n.prototype.onData = function(e) {
                            this.chunks.push(e);
                        };

                        n.prototype.onEnd = function(e) {
                            e === l.Z_OK && ("string" === this.options.to ? 
                                this.result = this.chunks.join("") : 
                                this.result = s.flattenChunks(this.chunks)),
                            this.chunks = [], 
                            this.err = e, 
                            this.msg = this.strm.msg;
                        };

                        r.Inflate = n, 
                        r.inflate = o, 
                        r.inflateRaw = a, 
                        r.ungzip = o;
                    },
                    "utils/common.js": function(e, t, r) {
                        "use strict";
                        var n = "undefined" != typeof Uint8Array && "undefined" != typeof Uint16Array && "undefined" != typeof Int32Array;
                        r.assign = function(e) {
                            for (var t = Array.prototype.slice.call(arguments, 1); t.length;) {
                                var r = t.shift();
                                if (r) {
                                    if ("object" != typeof r) throw new TypeError(r + " must be non-object");
                                    for (var n in r) r.hasOwnProperty(n) && (e[n] = r[n]);
                                }
                            }
                            return e;
                        };

                        r.shrinkBuf = function(e, t) {
                            return e.length === t ? e : e.subarray ? e.subarray(0, t) : (e.length = t, e);
                        };

                        var o = {
                            arraySet: function(e, t, r, n, o) {
                                if (t.subarray && e.subarray) return void e.set(t.subarray(r, r + n), o);
                                for (var a = 0; a < n; a++) e[o + a] = t[r + a];
                            },
                            flattenChunks: function(e) {
                                var t, r, n, o, a, i;
                                for (n = 0, t = 0, r = e.length; t < r; t++) n += e[t].length;
                                for (i = new Uint8Array(n), o = 0, t = 0, r = e.length; t < r; t++) a = e[t], i.set(a, o), o += a.length;
                                return i;
                            }
                        };
                        var a = {
                            arraySet: function(e, t, r, n, o) { 
                                for (var a = 0; a < n; a++) e[o + a] = t[r + a];
                            },
                            flattenChunks: function(e) {
                                return [].concat.apply([], e);
                            }
                        };
                        r.setTyped = function(e) {
                            e ? (r.Buf8 = Uint8Array, r.Buf16 = Uint16Array, r.Buf32 = Int32Array, r.assign(r, o)) : (r.Buf8 = Array, r.Buf16 = Array, r.Buf32 = Array, r.assign(r, a));
                        };
                        r.setTyped(n);
                    },
                    // Further modules would continue here...
                };
                
                return t;
            },
            decompress: function(e) {
                this.exports || (this.exports = this.require("inflate.js"));
                try {
                    return this.exports.inflate(e);
                } catch (e) {}
            },
            hasUnityMarker: function(e) {
                var t = 10,
                    r = "UnityWeb Compressed Content (gzip)";
                if (t > e.length || 31 != e[0] || 139 != e[1]) return !1;
                var n = e[3];
                if (4 & n) {
                    if (t + 2 > e.length) return !1;
                    if (t += 2 + e[t] + (e[t + 1] << 8), t > e.length) return !1;
                }
                if (8 & n) {
                    for (; t < e.length && e[t];) t++;
                    if (t + 1 > e.length) return !1; 
                    t++;
                }
                return 16 & n && String.fromCharCode.apply(null, e.subarray(t, t + r.length + 1)) == r + "\0";
            },
            // Additional methods here...
        },
        // More properties and methods...
    };
