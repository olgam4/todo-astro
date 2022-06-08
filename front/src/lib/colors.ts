export const rgbToHex = (rgb: [number, number, number]) => {
  const [r, g, b] = rgb
  const rHex = Math.floor(r / 255 * 0xff)
  const gHex = Math.floor(g / 255 * 0xff)
  const bHex = Math.floor(b / 255 * 0xff)
  const rHexStr = rHex.toString(16)
  const gHexStr = gHex.toString(16)
  const bHexStr = bHex.toString(16)
  return `#${rHexStr.length === 1 ? `0${rHexStr}` : rHexStr}${
    gHexStr.length === 1 ? `0${gHexStr}` : gHexStr
  }${bHexStr.length === 1 ? `0${bHexStr}` : bHexStr}`
}

export const hexToRgb = (hex: string): [number, number, number] => {
  const [r, g, b] = hex.match(/[a-f0-9]{2}/gi)!.map(x => parseInt(x, 16))
  return [r, g, b]
}

export const rgbToHsv = (r, g, b) => {
  let rabs, gabs, babs, rr, gg, bb, h, s, v, diff, diffc, percentRoundFn;
  rabs = r / 255;
  gabs = g / 255;
  babs = b / 255;
  v = Math.max(rabs, gabs, babs),
  diff = v - Math.min(rabs, gabs, babs);
  diffc = c => (v - c) / 6 / diff + 1 / 2;
  percentRoundFn = num => Math.round(num * 100) / 100;
  if (diff == 0) {
    h = s = 0;
  } else {
    s = diff / v;
    rr = diffc(rabs);
    gg = diffc(gabs);
    bb = diffc(babs);

    if (rabs === v) {
      h = bb - gg;
    } else if (gabs === v) {
      h = (1 / 3) + rr - bb;
    } else if (babs === v) {
      h = (2 / 3) + gg - rr;
    }
    if (h < 0) {
      h += 1;
    }else if (h > 1) {
      h -= 1;
    }
  }
  return [
    Math.round(h * 360),
    percentRoundFn(s * 100),
    percentRoundFn(v * 100)
  ]
}

export const hexToHsv = (hex: string): [number, number, number] => {
  const [r, g, b] = hexToRgb(hex)
  const [h, s, v] = rgbToHsv(r, g, b)
  return [h, s, v]
}

export const hslToHex = (hsl) => {
  if(!hsl){
    return null;
  }
  let h = hsl[0];
  let s = hsl[1];
  let l = hsl[2];
  h /= 360;
  s /= 100;
  l /= 100;
  let r, g, b;
  if (s === 0) {
    r = g = b = l;
  } else {
    const hue2rgb = function(p, q, t) {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    };
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hue2rgb(p, q, h + 1 / 3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1 / 3);
  }
  const toHex = function(x) {
    const hex = Math.round(x * 255).toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  };
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

export const generateArandomColorHsl = (): [number, number, number] => {
  const hsl: [number, number, number] = [0, 100, 50]

  hsl[0] = Math.floor(Math.random() * 360)

  return hsl
}
