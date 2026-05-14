export const SideBarSection = {
    TOP_ABOVE: 'TOP_ABOVE',
    TOP_BELOW: 'TOP_BELOW',
    BOTTOM: 'BOTTOM',
} as const;


export type SideBarSection = typeof SideBarSection[keyof typeof SideBarSection];
