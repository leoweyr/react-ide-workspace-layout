export const TooltipPosition = {
    /**
     * Display the tooltip above the anchor.
     */
    TOP: 'TOP',

    /**
     * Display the tooltip below the anchor.
     */
    BOTTOM: 'BOTTOM',

    /**
     * Display the tooltip to the left of the anchor.
     */
    LEFT: 'LEFT',

    /**
     * Display the tooltip to the right of the anchor.
     */
    RIGHT: 'RIGHT',
} as const;


export type TooltipPosition = typeof TooltipPosition[keyof typeof TooltipPosition];
