import React from "react";
import { Position } from "../Type";
import "./Grid.scss";
import { Direction } from "../Enum";

interface GridProps {
    width: number,
    height: number
};

export default function Grid(props: GridProps) {
    const { width, height } = props;
    const [playerPos, setPlayerPos] = React.useState<Position>({ x: 0, y: 0 });
    const [playerDir, setPlayerDir] = React.useState<Direction>(Direction.East);

    const gridRef = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
        gridRef?.current?.focus();
    }, [gridRef]);

    const MovePosition = (x: number, y: number) => {
        const newPosition: Position = {
            x: playerPos.x + x,
            y: playerPos.y + y
        };

        if (newPosition.x < 0 || newPosition.y < 0 || newPosition.x > width-1 || newPosition.y > height-1) return;
        setPlayerPos(newPosition);
    }

    const OnKeyClicked = (e: React.KeyboardEvent) => {
        switch (e.key)
        {
            // Move Forward
            case 'ArrowUp':
            case 'w':
            case 'W':
                switch (playerDir)
                {
                    case Direction.North:
                        MovePosition(0, -1);
                        break;
                    case Direction.South:
                        MovePosition(0, 1);
                        break;
                    case Direction.East:
                        MovePosition(1, 0);
                        break;
                    case Direction.West:
                        MovePosition(-1, 0);
                        break;
                }
                break;
            
            // Rotate
            case 'r':
            case 'R':
                const maxEnum = Object.keys(Direction).length / 2;
                let nextEnum = playerDir + 1;
                if (maxEnum == nextEnum) nextEnum = Direction.North;
                setPlayerDir(nextEnum);
                break;
        }
    }

    return (
        <div ref={gridRef} tabIndex={0} className="grid-container" style={{gridTemplateColumns: Array(width).fill("max-content").join(' ')}} onKeyDown={OnKeyClicked}>
            {
                Array(width).fill('').map((x, i) => (
                    <div key={`row-${i}`}>
                        {
                            Array(height).fill('').map((y, j) => (
                                <div key={`grid-item-${i},${j}`} className="grid-item">
                                    {
                                        playerPos.x === i && playerPos.y === j &&
                                        <div className="player" style={{rotate: `calc(${playerDir} * 90deg)`}} />
                                    }
                                </div>
                            ))
                        }
                    </div>
                ))
            }
        </div>
    )
}