import { useMemo } from 'react';
import coinTickers from '../data/coinTickers';

type MatrixColumn = {
  id: string;
  left: string;
  delay: string;
  duration: string;
  fontSize: string;
  items: string[];
};

const MATRIX_COLUMNS = 22;
const MIN_ITEMS_PER_COLUMN = 18;
const MAX_ITEMS_PER_COLUMN = 30;

const pickCoinSequence = (length: number, startOffset: number) => {
  return Array.from({ length }, (_, index) => {
    const coinIndex = (startOffset + index) % coinTickers.length;
    return coinTickers[coinIndex];
  });
};

const generateColumn = (index: number, total: number): MatrixColumn => {
  const leftPosition = ((index + 0.5) / total) * 100;
  const horizontalJitter = (Math.random() * 2 - 1) / total;
  const left = `${Math.min(98, Math.max(2, leftPosition + horizontalJitter * 100))}%`;

  const durationSeconds = 22 + Math.random() * 16;
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
  const columns = useMemo(() => {
    return Array.from({ length: MATRIX_COLUMNS }, (_, index) => generateColumn(index, MATRIX_COLUMNS));
  }, []);

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
