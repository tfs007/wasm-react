import React, { useEffect, useState } from 'react';

function App() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadWasm() {
      try {
        const wasm = await import('./pkg/nft_price_fetcher.js');
        await wasm.default(); // Initialize the WASM module
        const prices = await wasm.fetch_nft_prices();
        setData(prices);
      } catch (err) {
        setError(err);
      }
    }
    loadWasm();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>NFT Prices from OpenSea</h1>
        {error && <p>Error fetching data: {error.message}</p>}
        {data ? (
          <pre>{JSON.stringify(data, null, 2)}</pre>
        ) : (
          <p>Loading...</p>
        )}
      </header>
    </div>
  );
}

export default App;
