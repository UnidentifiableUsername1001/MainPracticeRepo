import streamlit as st
import yfinance as yf
import pandas as pd
from curl_cffi import requests as cf
import time
import random

# --- Page Config ---
st.set_page_config(page_title="Float Rotation Scanner", layout="wide")

st.title("🌊 Float Rotation Scanner")
st.markdown("""
This tool checks if the **Current Volume** is unusually high compared to the **Shares Float**.
* **Ratio > 1.0**: The entire float has changed hands today (Extreme Rotation).
* **Ratio > 0.5**: Very high turnover (Watch for volatility).
""")

# --- Sidebar: User Input ---
st.sidebar.header("Settings")
default_tickers = "VMAR, SPIR, GME, TSLA, AAPL, NVDA"
ticker_input = st.sidebar.text_area("Enter Tickers (comma separated):", default_tickers, height=150)

tickers = [t.strip().upper() for t in ticker_input.split(",") if t.strip()]

# --- Main Logic ---
if st.sidebar.button("Scan Tickers", type="primary"):
    
    results = []
    progress_bar = st.progress(0)
    status_text = st.empty()
    
    # --- FIX 1: Add Browser Headers ---
    # This makes Yahoo think you are a real person using Chrome on Windows
    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
        "Accept-Language": "en-US,en;q=0.5",
        "DNT": "1", # Do Not Track Request Header
        "Connection": "close",
        "Upgrade-Insecure-Requests": "1"
    }

    # Create the session with these headers and SSL verify=False
    session = cf.Session(verify=False, headers=headers)
    
    for i, symbol in enumerate(tickers):
        # Update Progress
        status_text.text(f"Fetching data for: {symbol}...")
        progress_bar.progress((i + 1) / len(tickers))
        
        try:
            # --- FIX 2: Random Sleep Delay ---
            # Wait between 1 and 3 seconds to act like a human
            time.sleep(random.uniform(1.0, 3.0))
            
            # Fetch Data
            stock = yf.Ticker(symbol, session=session)
            info = stock.info
            
            current_volume = info.get('volume', 0)
            shares_float = info.get('floatShares', 0)
            price = info.get('currentPrice', info.get('regularMarketPreviousClose', 0))
            
            rotation = 0
            if shares_float and shares_float > 0:
                rotation = current_volume / shares_float
            
            results.append({
                "Ticker": symbol,
                "Price ($)": price,
                "Volume": current_volume,
                "Float": shares_float,
                "Rotation (x Float)": round(rotation, 2)
            })
            
        except Exception as e:
            st.error(f"Could not fetch {symbol}: {e}")

    status_text.text("Scan Complete!")
    progress_bar.empty()
    
    if results:
        df = pd.DataFrame(results)
        
        st.subheader(f"Results ({len(df)} Tickers)")
        
        def highlight_rotation(val):
            color = 'red' if val > 1.0 else 'orange' if val > 0.5 else 'black'
            weight = 'bold' if val > 0.5 else 'normal'
            return f'color: {color}; font-weight: {weight}'

        display_df = df.copy()
        
        st.dataframe(
            display_df.style.map(highlight_rotation, subset=['Rotation (x Float)'])
            .format({
                "Volume": "{:,.0f}", 
                "Float": "{:,.0f}", 
                "Price ($)": "${:.2f}",
                "Rotation (x Float)": "{:.2f}x"
            }),
            use_container_width=True,
            height=500
        )
    else:
        st.write("No data found.")

else:
    st.info("Edit the watchlist in the sidebar and click **Scan Tickers** to start.")