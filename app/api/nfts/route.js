import {NextResponse} from 'next/server';
import Graph from '@/utils/Graph';


async function getNfts(address, cursor){
    // OPENSEA
    let endpoint = `chain/ethereum/account/${address}/nfts?limit=2${cursor ? `&next=${cursor}` : ""}`
    // MORALIS
    //let endpoint = `${address}/nft?chain=eth&format=decimal&limit=18&exclude_spam=true&normalizeMetadata=true&media_items=false${cursor ? `&cursor=${cursor}` : ""}`
    try {
        const res = await fetch(`${process.env.OPENSEA_SERVER_URL}/${endpoint}`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': `${process.env.OPENSEA_API_KEY}`
            }
        },
        );
        if (!res.ok) {
            return([])
        }

        let jsonResponse = await res.json();
        return jsonResponse;
    } catch (err) {
        console.error(err);
        throw err; // re-throw the error so it can be handled by the caller
    }
}

export async function POST(req) {

    try{
        const response = await req.json()
        let {field, value, cursor} = response;
        let results = []
        if(field == "owner" && value.length > 0){
            results = await getNfts(value, cursor)
            if(results){
                return NextResponse.json({results: results}, {status: 200});
            } else {
                return NextResponse.json({error: {message: "No results found"}}, {status: 200});
            }

        }
        else{

                return NextResponse.json({error: {message: "No results found"}}, {status: 200});
     

        }

    
    } catch(error){
        //console.log(error)
        return NextResponse.json({error: {message: error.message}}, {status: 500})
    }
}
