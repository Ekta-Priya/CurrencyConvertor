import { useEffect, useState } from "react";

function useCurrencyInfo(fromCurrency, toCurrency) {
  const [rate, setRate] = useState(null);

  useEffect(() => {
    if (!fromCurrency || !toCurrency) return;

    const url = `https://api.frankfurter.app/latest?from=${fromCurrency.toUpperCase()}&to=${toCurrency.toUpperCase()}`;
    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch currency data");
        return res.json();
      })
      .then((data) => {
        if (data.rates && data.rates[toCurrency.toUpperCase()] !== undefined) {
          setRate(data.rates[toCurrency.toUpperCase()]);
        } else {
          throw new Error("Currency rate not found in response");
        }
      })
      .catch((err) => {
        console.error("Failed to fetch currency data:", err);
        setRate(null);
      });
  }, [fromCurrency, toCurrency]);

  return rate;
}

export default useCurrencyInfo;
