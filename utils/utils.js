export async function callAPI(endpoint, body = {}, method = 'POST') {
    try {
        const res = await fetch(`/api/${endpoint}`, {
            method: method,
            headers: {
                'Content-Type': 'application/json',
            },
            body: body,
        });

        if (!res.ok) {
            let errorData = null;
            try {
                errorData = await res.json(); // Try to parse the error information from response, if any
            } catch (parseError) {
                console.error("Error parsing JSON:", parseError);
                // errorData = res.statusText;
            }

            throw new Error(`HTTP error! status: ${res.status}`, res.status, errorData, res);
        }

        let jsonResponse = await res.json();
        return jsonResponse;
    } catch (err) {
        console.error(err);
        throw err; // re-throw the error so it can be handled by the caller
    }
}


export function makeQueryClient() {
    const fetchMap = new Map();
    return function queryClient(name, query) {
        if (!fetchMap.has(name)) {
            fetchMap.set(name, query());
        }
        return fetchMap.get(name);
    };
}
