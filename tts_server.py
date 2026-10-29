#!/usr/bin/env python3
"""Local 3Blue1Brown-style Neural TTS & static server for Calculus Animation Lab."""
from __future__ import annotations

import asyncio
import hashlib
import os
import re
import socket
import sys
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from urllib.parse import parse_qs, urlparse

HOST = "127.0.0.1"
PORT = 8765
VOICE = "en-US-BrianMultilingualNeural"
RATE = "+0%"
PITCH = "+0Hz"

ROOT_DIR = Path(__file__).resolve().parent
CACHE_DIR = ROOT_DIR / "audio" / "custom_cache"

_FRACTION_COMPOUNDS = (
    (r"\bone\s+half\b", "one-half"),
    (r"\bthree\s+halves\b", "three-halves"),
    (r"\bfive\s+halves\b", "five-halves"),
    (r"\bseven\s+halves\b", "seven-halves"),
    (r"\bone\s+third\b", "one-third"),
    (r"\btwo\s+thirds\b", "two-thirds"),
    (r"\bfour\s+thirds\b", "four-thirds"),
    (r"\bone\s+fourth\b", "one-fourth"),
    (r"\bthree\s+fourths\b", "three-fourths"),
    (r"\bone\s+quarter\b", "one-quarter"),
    (r"\bthree\s+quarters\b", "three-quarters"),
    (r"\bone\s+fifth\b", "one-fifth"),
    (r"\btwo\s+fifths\b", "two-fifths"),
    (r"\bthree\s+fifths\b", "three-fifths"),
    (r"\bfour\s+fifths\b", "four-fifths"),
    (r"\bone\s+sixth\b", "one-sixth"),
    (r"\bfive\s+sixths\b", "five-sixths"),
    (r"\bone\s+eighth\b", "one-eighth"),
    (r"\bthree\s+eighths\b", "three-eighths"),
)

_TRIG_POWER_COMPOUNDS = (
    (r"\bsine\s+squared\b", "sine-squared"),
    (r"\bcosine\s+squared\b", "cosine-squared"),
    (r"\btangent\s+squared\b", "tangent-squared"),
    (r"\bsecant\s+squared\b", "secant-squared"),
    (r"\bcosecant\s+squared\b", "cosecant-squared"),
    (r"\bcotangent\s+squared\b", "cotangent-squared"),
    (r"\bsine\s+cubed\b", "sine-cubed"),
    (r"\bcosine\s+cubed\b", "cosine-cubed"),
    (r"\btangent\s+cubed\b", "tangent-cubed"),
    (r"\bsecant\s+cubed\b", "secant-cubed"),
)

_VAR_A_RULES = (
    (r"\bpart\s+a\b", "Part A"),
    (r"\bside\s+a\b", "side A"),
    (r"\bpoint\s+a\b", "point A"),
    (r"\bconstant\s+a\b", "constant A"),
    (r"\bvariable\s+a\b", "variable A"),
    (r"\bvalue\s+a\b", "value A"),
    (r"\bf\s+of\s+a\b", "f of A"),
    (r"\bg\s+of\s+a\b", "g of A"),
    (r"\bf-prime\s+of\s+a\b", "f-prime of A"),
    (r"\bg-prime\s+of\s+a\b", "g-prime of A"),
    (r"\b([xtyu])\s+minus\s+a\b", r"\1 minus A"),
    (r"\b([xtyu])\s+plus\s+a\b", r"\1 plus A"),
    (r"\bapproaches\s+a\b", "approaches A"),
    (r"\bis\s+not\s+equal\s+to\s+a\b", "is not equal to A"),
    (r"\ba\s+is\s+not\s+equal\s+to\b", "A is not equal to"),
    (r"\ba\s+equals\b", "A equals"),
    (r"\bequals\s+a\b", "equals A"),
    (r"\ba-squared\b", "A-squared"),
    (r"\ba-cubed\b", "A-cubed"),
)


def math_prosody_preprocess(text: str) -> str:
    """Transform mathematical narration into natural spoken prosody for neural TTS."""
    if not text:
        return ""
    s = re.sub(r"\s+", " ", text).strip()

    # 1. Raw symbolic calculus & algebra notation
    s = re.sub(r"\bd([yfguxv])/d([xtuv])\b", r"d-\1 by d-\2", s)
    s = re.sub(r"\bd/d([xtuv])\b", r"the derivative with respect to \1, of", s)
    s = re.sub(r"\b([fghLpqy])''\(([^()]+)\)", r"\1-double-prime of \2", s)
    s = re.sub(r"\b([fghLpqy])'\(([^()]+)\)", r"\1-prime of \2", s)
    s = re.sub(r"\b([fghLpq])\((\s*[^()]+\s*)\)", r"\1 of \2", s)
    s = re.sub(r"\b([fghy])''\b", r"\1-double-prime", s)
    s = re.sub(r"\b([fghy])'(?=\s|$|[.,;:)=])", r"\1-prime", s)

    # Symbolic functions
    s = re.sub(r"\bsqrt\(([^()]+)\)", r"the square root of \1", s)
    s = re.sub(r"\bsin\(([^()]+)\)", r"sine of \1", s)
    s = re.sub(r"\bcos\(([^()]+)\)", r"cosine of \1", s)
    s = re.sub(r"\btan\(([^()]+)\)", r"tangent of \1", s)
    s = re.sub(r"\bsec\(([^()]+)\)", r"secant of \1", s)
    s = re.sub(r"\bexp\(([^()]+)\)", r"e to the power of \1", s)
    s = re.sub(r"\b(?:ln|log)\(([^()]+)\)", r"natural log of \1", s)

    # Symbolic fractions involving pi or simple integers
    s = re.sub(r"\bpi\s*/\s*(\d+)\b", r"pi over \1", s)
    s = re.sub(r"\b1\s*/\s*2\b", "one-half", s)
    s = re.sub(r"\b1\s*/\s*3\b", "one-third", s)
    s = re.sub(r"\b2\s*/\s*3\b", "two-thirds", s)
    s = re.sub(r"\b1\s*/\s*4\b", "one-fourth", s)
    s = re.sub(r"\b3\s*/\s*4\b", "three-fourths", s)
    s = re.sub(r"\b1\s*/\s*6\b", "one-sixth", s)

    # Symbolic exponents
    s = re.sub(r"\(([^()]+)\)\^2\b", r"the quantity \1, squared", s)
    s = re.sub(r"\(([^()]+)\)\^3\b", r"the quantity \1, cubed", s)
    s = re.sub(r"\b([A-Za-z])\^2\b", r"\1-squared", s)
    s = re.sub(r"\b([A-Za-z])\^3\b", r"\1-cubed", s)
    s = re.sub(r"\b([A-Za-z])\^4\b", r"\1 to the fourth", s)
    s = re.sub(r"\b([A-Za-z])\^\((-?\d+)\)", r"\1 to the power of \2", s)
    s = re.sub(r"\b([A-Za-z])\^(-?\d+)\b", r"\1 to the power of \2", s)

    # Symbolic relational and arrow operators
    s = s.replace("!= ", " is not equal to ").replace("!=", " is not equal to ").replace("≠", " is not equal to ")
    s = s.replace("->", " approaches ").replace("→", " approaches ")
    s = re.sub(r"(?<=[A-Za-z0-9)])\s*=\s*(?=[A-Za-z0-9(-])", " equals ", s)
    s = re.sub(r"(?<=[A-Za-z0-9)])\s*\*\s*(?=[A-Za-z0-9(])", " times ", s)
    s = re.sub(r"(?<=[A-Za-z0-9)])\s*\+\s*(?=[A-Za-z0-9(])", " plus ", s)
    s = re.sub(r"(?<=[A-Za-z0-9)])\s+-\s+(?=[A-Za-z0-9(])", " minus ", s)

    # 2. POS-tagger compound math fixes (<var>-squared, <var>-cubed, <var>-prime)
    for pat, repl in _TRIG_POWER_COMPOUNDS:
        s = re.sub(pat, repl, s, flags=re.IGNORECASE)

    for pat, repl in _FRACTION_COMPOUNDS:
        s = re.sub(pat, repl, s, flags=re.IGNORECASE)

    # Single-letter or Greek variable followed by squared / cubed / prime
    s = re.sub(
        r"\b([A-Za-z]|theta|pi|delta|epsilon)\s+(squared|cubed|prime)\b",
        lambda m: f"{m.group(1)}-{m.group(2).lower()}",
        s,
    )

    # 3. Disambiguate standalone variable 'a' from indefinite article "uh"
    for pat, repl in _VAR_A_RULES:
        s = re.sub(pat, repl, s, flags=re.IGNORECASE)

    # 4. Prosodic clause pauses for natural mathematical cadence
    # Add a subtle pause before "all over", "all divided by", or "divided by" when preceded by a multi-word numerator
    s = re.sub(r"(?<=[A-Za-z0-9])\s+(all\s+over|all\s+divided\s+by)\b", r", \1", s)
    s = re.sub(r"(\b(?:plus|minus|times|squared|cubed)\s+[A-Za-z0-9-]+)\s+(divided\s+by)\b", r"\1, \2", s)

    # Add a subtle pause before "equals" when preceded by a multi-word mathematical expression
    # (e.g. "f-prime of x equals" -> "f-prime of x, equals", "L of x equals" -> "L of x, equals")
    s = re.sub(
        r"(\b(?:[fghLpqy]-prime\s+of\s+[A-Za-z0-9-]+|[fghLpq]\s+of\s+[A-Za-z0-9-]+|d-[yfguxv]\s+by\s+d-[xtuv]|[A-Za-z0-9]+-(?:squared|cubed)|(?:plus|minus|times|over)\s+[A-Za-z0-9-]+)\s+)equals\b",
        r"\1, equals",
        s,
    )
    # Clean up any accidental double spaces or space-before-comma
    s = re.sub(r"\s+,", ",", s)
    s = re.sub(r",\s*,+", ",", s)
    s = re.sub(r"\s+", " ", s).strip()
    return s


async def _synthesize_to_file(text: str, target: Path) -> None:
    import edge_tts

    CACHE_DIR.mkdir(parents=True, exist_ok=True)
    tmp_path = target.with_suffix(f".{os.getpid()}.tmp.mp3")
    comm = edge_tts.Communicate(text, VOICE, rate=RATE, pitch=PITCH)
    await comm.save(str(tmp_path))
    tmp_path.replace(target)


def get_or_create_mp3(text: str) -> Path:
    cleaned = math_prosody_preprocess(text)[:2400]
    if not cleaned:
        raise ValueError("Empty narration text")
    digest = hashlib.sha256(f"{VOICE}|{RATE}|{PITCH}|{cleaned}".encode("utf-8")).hexdigest()[:32]
    target = CACHE_DIR / f"{digest}.mp3"
    if not target.exists() or target.stat().st_size == 0:
        asyncio.run(_synthesize_to_file(cleaned, target))
    return target


class CalculusTTSHandler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(ROOT_DIR), **kwargs)

    def end_headers(self) -> None:
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Methods", "GET, HEAD, OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "Range, Content-Type")
        super().end_headers()

    def do_OPTIONS(self) -> None:
        self.send_response(204)
        self.end_headers()

    def do_GET(self) -> None:
        parsed = urlparse(self.path)
        if parsed.path == "/api/tts":
            self._handle_tts(parsed.query)
            return
        super().do_GET()

    def _handle_tts(self, query_string: str) -> None:
        params = parse_qs(query_string)
        text = (params.get("text") or [""])[0].strip()
        if not text:
            self.send_error(400, "Missing text query parameter")
            return
        try:
            mp3_path = get_or_create_mp3(text)
            data = mp3_path.read_bytes()
        except Exception as exc:
            self.send_error(503, f"Neural TTS synthesis unavailable: {exc}")
            return

        total = len(data)
        range_header = self.headers.get("Range")
        if range_header and range_header.startswith("bytes="):
            try:
                spec = range_header.split("=", 1)[1].strip()
                start_str, end_str = (spec.split("-", 1) + [""])[:2]
                start = int(start_str) if start_str else 0
                end = int(end_str) if end_str else total - 1
                start = max(0, min(start, total - 1))
                end = max(start, min(end, total - 1))
                chunk = data[start : end + 1]
                self.send_response(206)
                self.send_header("Content-Type", "audio/mpeg")
                self.send_header("Accept-Ranges", "bytes")
                self.send_header("Content-Range", f"bytes {start}-{end}/{total}")
                self.send_header("Content-Length", str(len(chunk)))
                self.end_headers()
                self.wfile.write(chunk)
                return
            except Exception:
                pass

        self.send_response(200)
        self.send_header("Content-Type", "audio/mpeg")
        self.send_header("Accept-Ranges", "bytes")
        self.send_header("Cache-Control", "public, max-age=86400")
        self.send_header("Content-Length", str(total))
        self.end_headers()
        self.wfile.write(data)

    def log_message(self, format: str, *args) -> None:
        return


def _port_in_use(host: str, port: int) -> bool:
    with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as sock:
        sock.settimeout(0.25)
        return sock.connect_ex((host, port)) == 0


def main() -> None:
    if _port_in_use(HOST, PORT):
        sys.exit(0)
    server = ThreadingHTTPServer((HOST, PORT), CalculusTTSHandler)
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        pass
    finally:
        server.server_close()


if __name__ == "__main__":
    main()
