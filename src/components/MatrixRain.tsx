import { useEffect, useMemo, useState } from 'react';
import coinTickers from '../data/coinTickers';

type MatrixColumn = {
  id: string;
  left: string;
  delay: string;
  duration: string;
  fontSize: string;
  items: string[];
};

const DESKTOP_COLUMNS = 22;
const MOBILE_COLUMNS = 12;
const MOBILE_BREAKPOINT = 640;
const MIN_ITEMS_PER_COLUMN = 18;
const MAX_ITEMS_PER_COLUMN = 30;

const pickCoinSequence = (length: number, startOffset: number) => {
  return Array.from({ length }, (_, index) => {
    const coinIndex = (startOffset + index) % coinTickers.length;
    return coinTickers[coinIndex];
  });
};

const generateColumn = (index: number, total: number, isMobile: boolean): MatrixColumn => {
  const leftPosition = ((index + 0.5) / total) * 100;
  const horizontalJitter = (Math.random() * 2 - 1) / total;
  const left = `${Math.min(98, Math.max(2, leftPosition + horizontalJitter * 100))}%`;

  const baseDuration = isMobile ? 32 : 22;
  const durationRange = isMobile ? 20 : 16;
  const durationSeconds = baseDuration + Math.random() * durationRange;
  const duration = `${durationSeconds}s`;
  const delay = `${Math.random() * -durationSeconds}s`;
  const fontSize = `${13 + Math.random() * 6}px`;
  const itemCount =
    MIN_ITEMS_PER_COLUMN + Math.floor(Math.random() * (MAX_ITEMS_PER_COLUMN - MIN_ITEMS_PER_COLUMN + 1));
  const startOffset = Math.floor(Math.random() * coinTickers.length);

  return {
    id: `matrix-column-${index}`,
    left,
    duration,
    delay,
    fontSize,
    items: pickCoinSequence(itemCount, startOffset)
  };
};

const MatrixRain = () => {
  const getIsMobile = () => {
    if (typeof window === 'undefined') {
      return false;
    }
    return window.innerWidth <= MOBILE_BREAKPOINT;
  };

  const [isMobile, setIsMobile] = useState(getIsMobile);
  const [columnCount, setColumnCount] = useState(() => {
    return getIsMobile() ? MOBILE_COLUMNS : DESKTOP_COLUMNS;
  });

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= MOBILE_BREAKPOINT;
      setIsMobile(mobile);
      setColumnCount(mobile ? MOBILE_COLUMNS : DESKTOP_COLUMNS);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const columns = useMemo(() => {
    return Array.from({ length: columnCount }, (_, index) => generateColumn(index, columnCount, isMobile));
  }, [columnCount, isMobile]);

  return (
    <div className="matrix-rain" aria-hidden="true">
      {columns.map((column) => (
        <div
          key={column.id}
          className="matrix-rain__column"
          style={{
            left: column.left,
            fontSize: column.fontSize,
            animationDuration: column.duration,
            animationDelay: column.delay
          }}
        >
          {column.items.map((item, itemIndex) => (
            <span key={`${column.id}-${item}-${itemIndex}`} className="matrix-rain__item">
              {item}
            </span>
          ))}
        </div>
      ))}
    </div>
  );
};

export default MatrixRain;
