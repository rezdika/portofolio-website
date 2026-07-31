import { useId } from 'react';
import { cn } from '../../lib/utils';

export function HexagonPattern({
    width,
    height,
    x,
    y,
    squares,
    className,
    radius = 40,
    ...props
}) {
    const id = useId();
    const hexWidth = radius * 2;
    const hexHeight = radius * Math.sqrt(3);
    const colWidth = hexWidth * 0.75;

    // Build hexagon points
    const hexPoints = (cx, cy) => {
        const pts = [];
        for (let i = 0; i < 6; i++) {
            const angle = (Math.PI / 180) * (60 * i - 30);
            pts.push(`${cx + radius * Math.cos(angle)},${cy + radius * Math.sin(angle)}`);
        }
        return pts.join(' ');
    };

    // Generate grid of hexagons
    const hexagons = [];
    const cols = Math.ceil(2000 / colWidth) + 2;
    const rows = Math.ceil(2000 / hexHeight) + 2;

    for (let col = -1; col < cols; col++) {
        for (let row = -1; row < rows; row++) {
            const cx = col * colWidth + (x ?? 0);
            const cy = row * hexHeight + (col % 2 === 0 ? 0 : hexHeight / 2) + (y ?? 0);
            hexagons.push({ cx, cy, key: `${col}-${row}` });
        }
    }

    return (
        <svg
            aria-hidden="true"
            className={cn('pointer-events-none absolute inset-0 h-full w-full', className)}
            {...props}
        >
            <defs>
                <pattern
                    id={id}
                    width={colWidth}
                    height={hexHeight}
                    patternUnits="userSpaceOnUse"
                    patternTransform={`translate(${x ?? 0},${y ?? 0})`}
                >
                    {/* Single hex in pattern */}
                    <polygon
                        points={hexPoints(radius, hexHeight / 2)}
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="0.5"
                    />
                </pattern>
            </defs>
            <rect width="100%" height="100%" fill={`url(#${id})`} />
        </svg>
    );
}
