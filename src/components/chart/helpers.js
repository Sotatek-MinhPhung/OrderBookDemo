// Make requests to CryptoCompare API
export async function makeApiRequest(path, urlParameters, flag) {
	try {
		let response;
		if(flag) {
			response = await fetch(`https://min-api.cryptocompare.com/${path}`,{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(urlParameters)
			});
		} else {
			const query = Object.keys(urlParameters)
			.map(name => `${name}=${encodeURIComponent(urlParameters[name])}`)
			.join('&');
			response = await fetch(`https://min-api.cryptocompare.com${path}?${query}`);
		}
		return response.json();
	} catch (error) {
		throw new Error(`CryptoCompare request error: ${error.status}`);
	}
}

// Generate a symbol ID from a pair of the coins
export function generateSymbol(exchange, fromSymbol, toSymbol) {
	const short = `${fromSymbol}/${toSymbol}`;
	return {
		short,
		full: `${exchange}:${short}`,
	};
}

export function parseFullSymbol(fullSymbol) {
	const match = fullSymbol.match(/^(\w+):(\w+)\/(\w+)$/);
	if (!match) {
		return null;
	}

	return {
		exchange: match[1],
		fromSymbol: match[2],
		toSymbol: match[3],
	};
}
