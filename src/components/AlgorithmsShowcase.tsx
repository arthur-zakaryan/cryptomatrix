const algorithms = [
  {
    name: 'Ichimoku Cloud',
    focus: 'All-in-one trend, momentum, and support/resistance framework.',
    pros: ['Highlights probable trend direction at a glance', 'Built-in leading spans flag support and resistance']
  },
  {
    name: 'Relative Strength Index (RSI)',
    focus: 'Momentum oscillator for spotting overbought and oversold conditions.',
    pros: ['Quickly surfaces exhaustion moves', 'Adaptable thresholds for different market regimes']
  },
  {
    name: 'Moving Average Convergence Divergence (MACD)',
    focus: 'Trend-following momentum indicator using moving averages.',
    pros: ['Captures trend shifts with signal crossovers', 'Histogram visualizes momentum acceleration']
  },
  {
    name: 'Moving Average Crossover',
    focus: 'Pairs short- and long-term moving averages to confirm direction.',
    pros: ['Keeps trades in the dominant trend', 'Simple rules scale well across assets']
  },
  {
    name: 'Bollinger Bands',
    focus: 'Volatility bands plotted around a moving average.',
    pros: ['Flags volatility expansions and squeezes', 'Provides dynamic price targets for exits']
  },
  {
    name: 'Fibonacci Retracement',
    focus: 'Measures retracement levels within trending markets.',
    pros: ['Highlights high-probability pullback zones', 'Works well with confluence-based entries']
  },
  {
    name: 'Momentum Trading',
    focus: 'Buys strength and sells weakness based on momentum scores.',
    pros: ['Benefits from sustained runs during trending markets', 'Flexible scoring blends technical and on-chain data']
  },
  {
    name: 'Mean Reversion',
    focus: 'Assumes price reverts toward its historical average.',
    pros: ['Targets range-bound conditions effectively', 'Pairs well with volatility filters to manage risk']
  },
  {
    name: 'Grid Trading',
    focus: 'Places layered buy and sell orders within predefined ranges.',
    pros: ['Automates accumulation in choppy markets', 'Generates steady cashflow from oscillations']
  },
  {
    name: 'Statistical Arbitrage',
    focus: 'Exploits pricing inefficiencies across correlated instruments.',
    pros: ['Market-neutral by design', 'Backed by rigorous quantitative validation']
  },
  {
    name: 'Trend Breakout',
    focus: 'Captures moves when price clears key highs or lows.',
    pros: ['Neutralizes chop by waiting for confirmation', 'Works well with trailing stops for risk control']
  },
  {
    name: 'VWAP Strategies',
    focus: 'Uses Volume Weighted Average Price to guide execution.',
    pros: ['Anchors trades to institutional benchmarks', 'Useful for slicing large orders with minimal impact']
  }
];

const AlgorithmsShowcase = () => {
  return (
    <div className="algorithms-grid">
      {algorithms.map((algorithm) => (
        <article key={algorithm.name} className="algorithm-card card">
          <h3>{algorithm.name}</h3>
          <p className="algorithm-focus">{algorithm.focus}</p>
          <ul className="algorithm-pros">
            {algorithm.pros.map((pro) => (
              <li key={pro}>{pro}</li>
            ))}
          </ul>
        </article>
      ))}
    </div>
  );
};

export default AlgorithmsShowcase;
