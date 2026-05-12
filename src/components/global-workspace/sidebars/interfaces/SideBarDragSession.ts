import { ReactElement } from 'react';

import { UIGroupItem } from '../../../../features/ui-group';


export interface SideBarDragSession {
    draggedItem: UIGroupItem;
    draggedElement: ReactElement;
    sourceGroupId: string;
    sourceIndex: number;
    mousePos: { x: number, y: number };
    dragOffset: { x: number, y: number };
    draggedSize: { width: number, height: number };
    dropTarget: { targetGroupId: string, targetIndex: number } | null;
}


export type SideBarDragListener = (session: SideBarDragSession | null) => void;
