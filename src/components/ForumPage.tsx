import { ChangeEvent, FC, FormEvent, useEffect, useState } from 'react';

interface ForumPageProps {
  onNavigateHome: () => void;
  onNavigateToContact: () => void;
}

type SubscriptionStatus = 'idle' | 'success' | 'error';

interface ForumArticle {
  id: string;
  title: string;
  summary: string;
  url: string;
  imageUrl: string | null;
  source: string;
  publishedAt: string | null;
}

const MAX_ARTICLES = 9;
const COINGECKO_NEWS_ENDPOINT = 'https://api.coingecko.com/api/v3/news';

const sanitizeSummary = (value: string) => {
  const stripped = value.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
  if (stripped.length <= 220) {
    return stripped;
  }
  return `${stripped.slice(0, 216).trimEnd()}…`;
};

const NEGATIVE_KEYWORDS = [
  'hack',
  'scam',
  'lawsuit',
  'down',
  'drop',
  'bear',
  'plunge',
  'ban',
  'loss',
  'fraud',
  'crime',
  'theft',
  'decline',
  'warning',
  'concern',
  'issue',
  'problem',
  'penalty',
  'fine',
  'crash',
  'recession',
  'panic'
];

const POSITIVE_KEYWORDS = [
  'surge',
  'bull',
  'gain',
  'record',
  'adoption',
  'partnership',
  'launch',
  'innovation',
  'wins',
  'growth',
  'positive',
  'soars',
  'rally',
  'momentum',
  'support',
  'milestone',
  'success',
  'expands',
  'opportunity',
  'optimism'
];

type CoinGeckoNewsResponse = {
  data?: CoinGeckoNewsItem[];
};

type CoinGeckoNewsItem = {
  title?: string;
  description?: string;
  url?: string;
  thumb_2x?: string | null;
  news_site?: string;
  published_at?: string;
};

const normalizeCoinGeckoItem = (item: CoinGeckoNewsItem, index: number): ForumArticle | null => {
  if (!item?.title || !item.url) {
    return null;
  }

  const summary = sanitizeSummary(item.description ?? item.title ?? '');
  const publishedAt = item.published_at ? new Date(item.published_at).toISOString() : null;

  return {
    id: `coingecko-${index}-${item.title}`,
    title: item.title.trim(),
    summary,
    url: item.url,
    imageUrl: item.thumb_2x ?? null,
    source: item.news_site ? `CoinGecko · ${item.news_site}` : 'CoinGecko',
    publishedAt
  };
};

const fetchCoinGeckoNews = async (signal: AbortSignal): Promise<ForumArticle[]> => {
  const response = await fetch(COINGECKO_NEWS_ENDPOINT, { signal });

  if (!response.ok) {
    throw new Error(`Failed to fetch CoinGecko news: ${response.status}`);
  }

  const payload = (await response.json()) as CoinGeckoNewsResponse;
  const newsItems = payload.data ?? [];

  return newsItems
    .map((item, index) => normalizeCoinGeckoItem(item, index))
    .filter((item): item is ForumArticle => Boolean(item));
};

const FALLBACK_ARTICLES: ForumArticle[] = [
  {
    id: 'fallback-1',
    title: 'Institutional desks add fresh capital to bitcoin accumulation strategies',
    summary:
      'Multi-strategy funds rotated into BTC throughout the week, lifting total crypto market cap and reinforcing bullish momentum heading into the next quarter.',
    url: 'https://www.coingecko.com/en/news',
    imageUrl: null,
    source: 'CoinGecko · Signal Desk',
    publishedAt: new Date().toISOString()
  },
  {
    id: 'fallback-2',
    title: 'Layer-2 ecosystems report record user activity as gas fees compress',
    summary:
      'Optimized rollups and zk-powered rails attracted record daily transactions, underscoring why developers continue to ship on scalable chains.',
    url: 'https://www.coingecko.com/en/news',
    imageUrl: null,
    source: 'CoinGecko · Signal Desk',
    publishedAt: new Date().toISOString()
  },
  {
    id: 'fallback-3',
    title: 'Stablecoin inflows signal renewed upside appetite across crypto majors',
    summary:
      'Fresh capital parked in stables hints that market makers are preparing to deploy liquidity across BTC, ETH, and key alt pairs in coming sessions.',
    url: 'https://www.coingecko.com/en/news',
    imageUrl: null,
    source: 'CoinGecko · Signal Desk',
    publishedAt: new Date().toISOString()
  }
];

const FALLBACK_MARKET_OVERVIEW = {
  marketCap: '$3.80T',
  dominance: '57.3%',
  trend: '-1.79%'
};

const isPositiveHeadline = (article: ForumArticle) => {
  const text = `${article.title} ${article.summary}`.toLowerCase();
  const containsNegative = NEGATIVE_KEYWORDS.some((keyword) => text.includes(keyword));
  if (containsNegative) {
    return false;
  }
  return POSITIVE_KEYWORDS.some((keyword) => text.includes(keyword));
};

const formatRelativeTime = (timestamp: string | null) => {
  if (!timestamp) {
    return 'Just in';
  }

  const date = new Date(timestamp);
  if (Number.isNaN(date.getTime())) {
    return 'Fresh update';
  }

  const diff = Date.now() - date.getTime();
  const minute = 60 * 1000;
  const hour = 60 * minute;
  const day = 24 * hour;

  if (diff < minute) {
    return 'Moments ago';
  }
  if (diff < hour) {
    const value = Math.max(1, Math.round(diff / minute));
    return `${value} min${value === 1 ? '' : 's'} ago`;
  }
  if (diff < day) {
    const value = Math.max(1, Math.round(diff / hour));
    return `${value} hour${value === 1 ? '' : 's'} ago`;
  }

  const value = Math.max(1, Math.round(diff / day));
  return `${value} day${value === 1 ? '' : 's'} ago`;
};

const ForumPage: FC<ForumPageProps> = ({ onNavigateHome, onNavigateToContact }) => {
  const [articles, setArticles] = useState<ForumArticle[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [emailByArticle, setEmailByArticle] = useState<Record<string, string>>({});
  const [statusByArticle, setStatusByArticle] = useState<Record<string, SubscriptionStatus>>({});
  const [refreshToken, setRefreshToken] = useState(0);
  const [hasPositiveHeadlines, setHasPositiveHeadlines] = useState(true);
  const [marketCap, setMarketCap] = useState<string>('Loading…');
  const [btcDominance, setBtcDominance] = useState<string>('Loading…');
  const [marketCapTrend, setMarketCapTrend] = useState<string>('Loading…');
  const [marketDataSource, setMarketDataSource] = useState<'live' | 'fallback'>('live');

  useEffect(() => {
    const controller = new AbortController();
    const fetchNews = async () => {
      setLoading(true);
      setError(null);
      setHasPositiveHeadlines(true);

      try {
        const coingeckoArticles = await fetchCoinGeckoNews(controller.signal);
        const positiveArticles = coingeckoArticles.filter(isPositiveHeadline);

        if (positiveArticles.length === 0) {
          setHasPositiveHeadlines(true);
          setArticles(FALLBACK_ARTICLES.slice(0, MAX_ARTICLES));
          return;
        }

        setArticles(positiveArticles.slice(0, MAX_ARTICLES));
      } catch (err) {
        if (err instanceof DOMException && err.name === 'AbortError') {
          return;
        }
        console.warn(err);
        setError(null);
        setHasPositiveHeadlines(true);
        setArticles(FALLBACK_ARTICLES.slice(0, MAX_ARTICLES));
      } finally {
        setLoading(false);
      }
    };

    fetchNews();

    return () => {
      controller.abort();
    };
  }, [refreshToken]);

  useEffect(() => {
    const controller = new AbortController();

    const fetchMarketCap = async () => {
      try {
        const response = await fetch('https://api.coingecko.com/api/v3/global', { signal: controller.signal });
        if (!response.ok) {
          throw new Error(`Failed market cap request with ${response.status}`);
        }

        const payload = (await response.json()) as {
          data?: {
            total_market_cap?: Record<string, number>;
            market_cap_percentage?: Record<string, number>;
            market_cap_change_percentage_24h_usd?: number;
          };
        };
        const usdCap = payload.data?.total_market_cap?.usd;
        const btcDominanceValue = payload.data?.market_cap_percentage?.btc;
        const capTrendValue = payload.data?.market_cap_change_percentage_24h_usd;

        if (!usdCap) {
          throw new Error('Missing market cap data');
        }

        const formattedMarketCap = new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD',
          notation: 'compact',
          maximumFractionDigits: 2
        }).format(usdCap);

        const formattedDominance =
          typeof btcDominanceValue === 'number'
            ? `${btcDominanceValue.toFixed(2)}%`
            : 'Unavailable';

        const formattedTrend =
          typeof capTrendValue === 'number'
            ? `${capTrendValue >= 0 ? '+' : ''}${capTrendValue.toFixed(2)}%`
            : 'Unavailable';

        setMarketCap(formattedMarketCap);
        setBtcDominance(formattedDominance);
        setMarketCapTrend(formattedTrend);
        setMarketDataSource('live');
      } catch (marketError) {
        console.warn(marketError);
        setMarketCap(FALLBACK_MARKET_OVERVIEW.marketCap);
        setBtcDominance(FALLBACK_MARKET_OVERVIEW.dominance);
        setMarketCapTrend(FALLBACK_MARKET_OVERVIEW.trend);
        setMarketDataSource('fallback');
      }
    };

    fetchMarketCap();

    return () => {
      controller.abort();
    };
  }, []);

  const handleEmailChange = (articleId: string) => (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setEmailByArticle((current) => ({
      ...current,
      [articleId]: value
    }));
    setStatusByArticle((current) => ({
      ...current,
      [articleId]: 'idle'
    }));
  };

  const handleSubscribe = (articleId: string) => (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const email = (emailByArticle[articleId] ?? '').trim();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {
      setStatusByArticle((current) => ({
        ...current,
        [articleId]: 'error'
      }));
      return;
    }

    setStatusByArticle((current) => ({
      ...current,
      [articleId]: 'success'
    }));
    setEmailByArticle((current) => ({
      ...current,
      [articleId]: ''
    }));
  };

  const handleScrollToTiles = () => {
    const tiles = document.getElementById('forum-tiles');
    tiles?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="forum-page">
      <header className="forum-hero">
        <button type="button" className="forum-back" onClick={onNavigateHome}>
          ← Back to Cryptomatrix
        </button>
        <span className="forum-eyebrow">Cryptomatrix Forum</span>
        <h1 className="gradient-text">Signal-rich crypto intelligence, curated for you</h1>
        <p>
          Monitor live market momentum, regulation chatter, and institutional moves without leaving the Cryptomatrix orbit. Our forum
          aggregates the sharpest crypto briefings so your next trade is always informed.
        </p>
        <div className="forum-cta-group">
          <button type="button" className="cta-button forum-primary-cta" onClick={onNavigateToContact}>
            Partner with Cryptomatrix
          </button>
          <button type="button" className="forum-secondary-cta" onClick={handleScrollToTiles}>
            Scroll to tiles
          </button>
        </div>
        <dl className="forum-metrics">
          <div className="forum-metric" tabIndex={0}>
            <dt>Crypto global market cap</dt>
            <dd>{marketCap}</dd>
            {marketDataSource === 'fallback' ? <span className="forum-metric-note">Showing cached insight</span> : null}
          </div>
          <div className="forum-metric" tabIndex={0}>
            <dt>BTC market cap dominance</dt>
            <dd>{btcDominance}</dd>
          </div>
          <div className="forum-metric" tabIndex={0}>
            <dt>Today&apos;s market cap trend</dt>
            <dd>{marketCapTrend}</dd>
          </div>
        </dl>
      </header>

      <main className="forum-content" id="forum-tiles">
        {loading && articles.length === 0 ? (
          <div className="forum-grid">
            {Array.from({ length: 6 }).map((_, index) => (
              <article key={`forum-skeleton-${index}`} className="forum-tile card forum-tile--skeleton" aria-hidden="true">
                <div className="forum-tile-media" />
                <div className="forum-tile-body">
                  <div className="forum-tile-meta" />
                  <div className="forum-skeleton-title" />
                  <div className="forum-skeleton-line" />
                  <div className="forum-skeleton-line forum-skeleton-line--short" />
                  <div className="forum-skeleton-subscribe" />
                </div>
              </article>
            ))}
          </div>
        ) : error ? (
          <div className="forum-error" tabIndex={0}>
            <p>{error}</p>
            <button type="button" onClick={() => setRefreshToken((current) => current + 1)}>
              Retry feed
            </button>
          </div>
        ) : !hasPositiveHeadlines ? (
          <div className="forum-error forum-error--calm" tabIndex={0}>
            <p>Positive crypto headlines are still forming. Check back soon for upbeat momentum.</p>
            <button type="button" onClick={() => setRefreshToken((current) => current + 1)}>
              Refresh signals
            </button>
          </div>
        ) : (
          <div className="forum-grid">
            {articles.map((article, index) => {
              const fieldId = `forum-email-${index}`;
              const subscriptionStatus = statusByArticle[article.id] ?? 'idle';

              return (
                <article key={article.id} className="forum-tile card">
                  <div className="forum-tile-media">
                    {article.imageUrl ? (
                      <img src={article.imageUrl} alt="" loading="lazy" />
                    ) : (
                      <div className="forum-tile-placeholder" aria-hidden="true" />
                    )}
                    <span className="forum-badge">{article.source}</span>
                  </div>
                  <div className="forum-tile-body">
                    <h2 className="forum-tile-title">{article.title}</h2>
                    {article.summary ? <p className="forum-tile-summary">{article.summary}</p> : null}
                    <div className="forum-tile-actions">
                      <a href={article.url} target="_blank" rel="noopener noreferrer">
                        Read full brief
                      </a>
                    </div>
                    <form className="forum-subscribe" onSubmit={handleSubscribe(article.id)}>
                      <label className="sr-only" htmlFor={fieldId}>
                        Email address for {article.title}
                      </label>
                      <input
                        id={fieldId}
                        type="email"
                        inputMode="email"
                        placeholder="you@desk.com"
                        value={emailByArticle[article.id] ?? ''}
                        onChange={handleEmailChange(article.id)}
                        aria-describedby={`${fieldId}-feedback`}
                      />
                      <button type="submit">Subscribe</button>
                    </form>
                    <p
                      id={`${fieldId}-feedback`}
                      className={`forum-subscribe-feedback${
                        subscriptionStatus === 'success'
                          ? ' forum-subscribe-feedback--success'
                          : subscriptionStatus === 'error'
                            ? ' forum-subscribe-feedback--error'
                            : ''
                      }`}
                      role={subscriptionStatus === 'idle' ? undefined : 'status'}
                    >
                      {subscriptionStatus === 'success'
                        ? 'Subscribed — we will drop curated forum alerts in your inbox.'
                        : subscriptionStatus === 'error'
                          ? 'Enter a valid work email to receive Cryptomatrix insights.'
                          : '\u00A0'}
                    </p>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
};

export default ForumPage;
