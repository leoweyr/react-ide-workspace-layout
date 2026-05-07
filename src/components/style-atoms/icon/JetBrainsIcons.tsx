import { ReactElement } from 'react';

import Icon from './Icon';


/**
 * Dynamically imports all SVG icons from @jetbrains/icons that do not contain 'px' in their filename.
 * The keys are formatted as PascalCase (e.g., 'AddCircleFilled').
 */
const iconModules: Record<string, string> = import.meta.glob('../../../../node_modules/@jetbrains/icons/*.svg', { 
    query: '?url', 
    import: 'default',
    eager: true 
});


export const JETBRAINS_ICONS: Record<string, ReactElement<any, typeof Icon>> = Object.entries(iconModules).reduce((acc, [path, url]) => {
    const filename: string = path.split('/').pop()?.replace('.svg', '') || '';
    
    // Filter out icons with 'px' in the name.
    if (filename.match(/\d+px/)) {
        return acc;
    }

    // Convert kebab-case to space-separated PascalCase for the name prop.
    const name: string = filename
        .split('-')
        .map((word: string): string => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');

    // Use PascalCase without spaces for the object key.
    const key: string = name.replace(/ /g, '');

    acc[key] = <Icon name={name} svg={url} />;
    
    return acc;
}, {} as Record<string, ReactElement<any, typeof Icon>>);
