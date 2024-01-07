import * as colorUtils from './color_utils';
import {themeFromSourceColor} from "./theme_utils";

export const hexFromArgb = (argb) => {
    const r = colorUtils.redFromArgb(argb);
    const g = colorUtils.greenFromArgb(argb);
    const b = colorUtils.blueFromArgb(argb);
    const outParts = [r.toString(16), g.toString(16), b.toString(16)];
    // Pad single-digit output values
    for (const [i, part] of outParts.entries()) {
        if (part.length === 1) {
            outParts[i] = '0' + part;
        }
    }
    return '#' + outParts.join('');
};
/**
 * @param hex String representing color as hex code. Accepts strings with or
 *     without leading #, and string representing the color using 3, 6, or 8
 *     hex characters.
 * @return ARGB representation of color.
 */
export const argbFromHex = (hex) => {
    hex = hex.replace('#', '');
    const isThree = hex.length === 3;
    const isSix = hex.length === 6;
    const isEight = hex.length === 8;
    if (!isThree && !isSix && !isEight) {
        throw new Error('unexpected hex ' + hex);
    }
    let r = 0;
    let g = 0;
    let b = 0;
    if (isThree) {
        r = parseIntHex(hex.slice(0, 1).repeat(2));
        g = parseIntHex(hex.slice(1, 2).repeat(2));
        b = parseIntHex(hex.slice(2, 3).repeat(2));
    }
    else if (isSix) {
        r = parseIntHex(hex.slice(0, 2));
        g = parseIntHex(hex.slice(2, 4));
        b = parseIntHex(hex.slice(4, 6));
    }
    else if (isEight) {
        r = parseIntHex(hex.slice(2, 4));
        g = parseIntHex(hex.slice(4, 6));
        b = parseIntHex(hex.slice(6, 8));
    }
    return (((255 << 24) | ((r & 0x0ff) << 16) | ((g & 0x0ff) << 8) | (b & 0x0ff)) >>>
        0);
};
function parseIntHex(value) {
    return parseInt(value, 16);
}


export const getTheme = (color) => {
    const {schemes} = themeFromSourceColor(argbFromHex(color), []);
    const {light}  = schemes;
    Object.keys(light.props).forEach(color=>{
        light.props[color] = hexFromArgb(light.props[color]);
    })
    const checkColor = hexColor => {
        const threshold = 0.75;
        const luminance = (
            0.2126 * parseInt(hexColor.substr(1,2), 16) + // red channel
            0.7152 * parseInt(hexColor.substr(3,2), 16) + // green channel
            0.0722 * parseInt(hexColor.substr(5,2), 16)   // blue channel
        ) / 255;
        console.log(luminance)
        return luminance > threshold;
    }
    return {
        color,
        bg:light.props.surface,
        primary: checkColor(color)?"#000000":color,
        onPrimary:light.props.onPrimary,
        primaryContainer:light.props.primaryContainer,
        onPrimaryContainer:light.props.onPrimaryContainer,
        secondary:light.props.secondary,
        onSecondary:light.props.onSecondary,
        secondaryContainer:light.props.secondaryContainer,
        onSecondaryContainer:light.props.onSecondaryContainer,
        link:light.props.tertiary,
        onLink:light.props.onTertiary,
        linkContainer:light.props.tertiaryContainer,
        onLinkContainer:light.props.onTertiaryContainer,
        surface:light.props.surface,
        onSurface:light.props.onSurface,
        surfaceVariant:light.props.surfaceVariant,
        onSurfaceVariant:light.props.onSurfaceVariant,
        light:light.props.onSurface,
        text:light.props.onSurface,
        outline:light.props.outline,
        hoverColor:light.props.tertiaryContainer,
        success:"#50a18b",
        error:light.props.error,
        onError:light.props.onError,
        errorContainer:light.props.errorContainer,
        onErrorContainer:light.props.onErrorContainer
    };
}
