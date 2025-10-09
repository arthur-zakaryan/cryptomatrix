import { useEffect, useRef } from 'react';

const exchanges = [
  {
    name: 'Binance',
    description: 'Deep liquidity for spot, margin, and futures pairs.'
  },
  {
    name: 'Coinbase',
    description: 'Secure US-based exchange with granular API permissions.'
  },
  {
    name: 'Kraken',
    description: 'Robust API access and margin trading across dozens of assets.'
  },
  {
    name: 'Bybit',
    description: 'Fast derivatives execution with industry-leading uptime.'
  },
  {
    name: 'OKX',
    description: 'Feature-rich API with options, spot, and structured products.'
  },
  {
    name: 'Bitfinex',
    description: 'Professional-grade platform for advanced strategies.'
  },
  {
    name: 'Gemini',
    description: 'Regulated New York trust company with key-based access.'
  },
  {
    name: 'KuCoin',
    description: 'Global exchange supporting a wide range of API integrations.'
  },
  {
    name: 'Gate.io',
    description: 'High-throughput API with spot, margin, and futures markets.'
  },
  {
    name: 'Bitstamp',
    description: 'Long-standing exchange with reliable REST and WebSocket APIs.'
  },
  {
    name: 'Crypto.com Exchange',
    description: 'Institutional-grade API connectivity for spot and derivatives.'
  },
  {
    name: 'Bittrex Global',
    description: 'Granular IP whitelisting and subaccount management via API.'
  },
  {
    name: 'Poloniex',
    description: 'Spot and perpetual swaps accessible through REST & WebSocket.'
  },
  {
    name: 'HTX (Huobi)',
    description: 'Comprehensive API for spot, margin, and staking products.'
  },
  {
    name: 'MEXC',
    description: 'High-frequency friendly API with competitive derivatives markets.'
  },
  {
    name: 'Deribit',
    description: 'Options and futures powerhouse with low-latency APIs.'
  }
];

const ExchangesShowcase = () => {
  const trackRef = useRef<HTMLDivElement>(null);
  const adjustmentTimeoutRef = useRef<number | null>(null);
  const LOOP_MULTIPLIER = 3;
  const loopedExchanges = Array.from({ length: LOOP_MULTIPLIER }, () => exchanges).flat();

  const syncToMiddle = () => {
    const node = trackRef.current;
    if (!node) {
      return;
    }

    const segmentWidth = node.scrollWidth / LOOP_MULTIPLIER;
    if (!segmentWidth) {
      return;
    }

    node.scrollLeft = segmentWidth;
  };

  const ensureWithinBounds = () => {
    const node = trackRef.current;
    if (!node) {
      return;
    }

    const segmentWidth = node.scrollWidth / LOOP_MULTIPLIER;
    if (!segmentWidth) {
      return;
    }

    if (node.scrollLeft < segmentWidth) {
      node.scrollLeft += segmentWidth;
    } else if (node.scrollLeft >= segmentWidth * 2) {
      node.scrollLeft -= segmentWidth;
    }
  };

  const scheduleAdjustment = () => {
    if (adjustmentTimeoutRef.current) {
      window.clearTimeout(adjustmentTimeoutRef.current);
    }

    adjustmentTimeoutRef.current = window.setTimeout(() => {
      ensureWithinBounds();
    }, 320);
  };

  useEffect(() => {
    const node = trackRef.current;
    if (!node) {
      return;
    }

    const handleUserScroll = () => {
      scheduleAdjustment();
    };

    const handleResize = () => {
      window.requestAnimationFrame(syncToMiddle);
    };

    window.requestAnimationFrame(() => {
      syncToMiddle();
      scheduleAdjustment();
    });
    node.addEventListener('scroll', handleUserScroll);
    window.addEventListener('resize', handleResize);

    return () => {
      node.removeEventListener('scroll', handleUserScroll);
      window.removeEventListener('resize', handleResize);
      if (adjustmentTimeoutRef.current) {
        window.clearTimeout(adjustmentTimeoutRef.current);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleScroll = (direction: 'left' | 'right') => {
    const node = trackRef.current;
    if (!node) {
      return;
    }

    ensureWithinBounds();

    const scrollAmount = node.clientWidth * 0.9;
    const delta = direction === 'right' ? scrollAmount : -scrollAmount;
    node.scrollBy({ left: delta, behavior: 'smooth' });

    scheduleAdjustment();
  };

  return (
    <div className="exchanges-carousel">
      <button
        type="button"
        className="carousel-control"
        onClick={() => handleScroll('left')}
        aria-label="Scroll exchanges left"
      >
        <span aria-hidden="true">&lt;</span>
      </button>
      <div className="exchanges-track" ref={trackRef}>
        {loopedExchanges.map((exchange, index) => (
          <div key={`${exchange.name}-${index}`} className="exchange-card card">
            <h3>{exchange.name}</h3>
            <p>{exchange.description}</p>
          </div>
        ))}
      </div>
      <button
        type="button"
        className="carousel-control"
        onClick={() => handleScroll('right')}
        aria-label="Scroll exchanges right"
      >
        <span aria-hidden="true">&gt;</span>
      </button>
    </div>
  );
};

export default ExchangesShowcase;
