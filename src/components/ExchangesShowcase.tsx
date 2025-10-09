const exchanges = [
  {
    name: 'Binance',
    description: 'Deep liquidity for spot, margin, and futures pairs.'
  },
  {
    name: 'Coinbase Advanced',
    description: 'Regulated US exchange for compliant account management.'
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
  }
];

const ExchangesShowcase = () => (
  <div className="exchanges-grid">
    {exchanges.map((exchange) => (
      <div key={exchange.name} className="exchange-card card">
        <h3>{exchange.name}</h3>
        <p>{exchange.description}</p>
      </div>
    ))}
  </div>
);

export default ExchangesShowcase;
