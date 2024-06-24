import {NextResponse} from 'next/server';
import Graph from '@/utils/Graph';
import { hydrateNames } from '@/utils/nameUtils';


export async function POST(req) {

    try{
        const response = await req.json()
        let {field, value, offset, bytes } = response;
        let results = []
        if(field == "owner"){
            results = await Graph.searchByAddress(process.env.SUBGRAPH_URL, field, value, offset)

            if(results.data.domains){
    
                return NextResponse.json({results: results.data.domains}, {status: 200});
            } else {
                return NextResponse.json({error: {message: "No results found"}}, {status: 200});
            }

        }
        else{
            results = await Graph.searchGraph(process.env.SUBGRAPH_URL, field, value, offset)
            let exactResult = undefined
            if(offset == 0 && bytes){
                exactResult = await Graph.searchBytes(process.env.SUBGRAPH_URL, bytes)
            }
            
            if(results.data){
                let returnResults = results.data?.search
                if(exactResult?.data?.search && exactResult?.data?.search.length > 0){
                    let exactObj = exactResult?.data?.search[0]
                    exactObj["exact"] = true
                    returnResults = [exactObj , ...returnResults]
                }
    
                return NextResponse.json({results: returnResults}, {status: 200});
            } else {
                return NextResponse.json({error: {message: "No results found"}}, {status: 200});
            }

        }

    
    } catch(error){
        //console.log(error)
        return NextResponse.json({error: {message: error.message}}, {status: 500})
    }
}
