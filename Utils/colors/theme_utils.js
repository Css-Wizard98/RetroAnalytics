/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import {Blend} from './blend';
import {CorePalette} from './core_palette';
import {Scheme} from './scheme';

export function themeFromSourceColor(source, customColors = []) {
    const palette = CorePalette.of(source);
    return {
        source,
        schemes: {
            light: Scheme.light(source),
            dark: Scheme.dark(source),
        },
        palettes: {
            primary: palette.a1,
            secondary: palette.a2,
            tertiary: palette.a3,
            neutral: palette.n1,
            neutralVariant: palette.n2,
            error: palette.error,
        },
        customColors: customColors.map((c) => customColor(source, c)),
    };
}

export function customColor(source, color) {
    let value = color.value;
    const from = value;
    const to = source;
    if (color.blend) {
        value = Blend.harmonize(from, to);
    }
    const palette = CorePalette.of(value);
    const tones = palette.a1;
    return {
        color,
        value,
        light: {
            color: tones.tone(40),
            onColor: tones.tone(100),
            colorContainer: tones.tone(90),
            onColorContainer: tones.tone(10),
        },
        dark: {
            color: tones.tone(80),
            onColor: tones.tone(20),
            colorContainer: tones.tone(30),
            onColorContainer: tones.tone(90),
        },
    };
}
