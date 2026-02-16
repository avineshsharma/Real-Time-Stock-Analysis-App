import React, { useState } from 'react';


function App() {
    const [symbol, setSymbol] = useState('');
    const [storing, setStoring] = useState(null);
    const [loading, setLoding] = useState(false);
    const [error, setError] = useState();


    const handleSearch = async() => {
        console.log('Stock Symbol:', symbol);
        alert('You searched for: ' + symbol.toUpperCase());
        setLoding(true);

        setError('')
        setStoring(null);


        try{

            const response = await fetch(
                `https://localhost:3000/api/stock/${symbol.toUpperCase()}`
            );
            if(!response.ok){
                throw new Error('Failed to fetch stock data')
            }
            const data = await response.json();
            // save response to storing
            setStoring(data);

        }catch(err){
            // 5️⃣ save error message
      setError(err.message || 'Something went wrong');
        }finally{
            setLoding(false);
        }

    };

    return (
        <div
            style={{
                textAlign: 'center',
                padding: '40px',
                fontFamily: 'arial, sans-serif',
                maxWidth: '600px',
                margin: '0 auto'
            }}
        >
            <h1 style={{ color: 'blue' }}>
                Live Stock Analysis
            </h1>

            <p style={{ color: '#666', fontSize: '18px', marginBottom: '30px' }}>
                Enter stock symbol to see live price
            </p>

            <input
                type="text"
                placeholder="Enter stock symbol (e.g. AAPL)"
                value={symbol}
                onChange={(e) => setSymbol(e.target.value)}
                style={{
                    padding: '10px',
                    fontSize: '16px',
                    width: '70%',
                    marginBottom: '20px'
                }}
            />

            <br />

            <button
                onClick={handleSearch}
                style={{
                    padding: '10px 20px',
                    fontSize: '16px',
                    cursor: 'pointer'
                }}
            >
                Search
            </button>
        </div>
    );
}

export default App;