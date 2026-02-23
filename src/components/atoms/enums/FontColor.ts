export const FontColor = {
    NORMAL: 'normal',
    BRIGHT: 'bright',
    DIM: 'dim',
    ERROR: 'error',
} as const;


export type FontColor = typeof FontColor[keyof typeof FontColor];
