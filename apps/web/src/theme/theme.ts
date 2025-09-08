import { theme as antdTheme } from 'antd';

import type { ThemeConfig } from 'antd';

export const BRAND_PRIMARY = '#6b4eff'; 

export const baseTheme: ThemeConfig = {
    token: {
        colorPrimary: BRAND_PRIMARY,
        borderRadius: 8,
        motion: true,
    },
    // You can switch algorithms later (dark/compact) via `algorithm`
    // algorithm: [antdTheme.defaultAlgorithm, antdTheme.compactAlgorithm],
};

export const darkTheme: ThemeConfig = {
    ...baseTheme,
    algorithm: antdTheme.darkAlgorithm,
};