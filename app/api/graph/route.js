import {NextResponse} from 'next/server';
import Graph from '@/utils/Graph';
import { hydrateNames } from '@/utils/nameUtils';


export async function POST(req) {

    try{
        const response = await req.json()
        let {field, value, offset} = response;
        console.log("response ", response)
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
            if(results.data){
                //let joinedResults = results.data.exact.concat(results.data.search)
    
                return NextResponse.json({results: results.data.search}, {status: 200});
            } else {
                return NextResponse.json({error: {message: "No results found"}}, {status: 200});
            }

        }

    
    } catch(error){
        //console.log(error)
        return NextResponse.json({error: {message: error.message}}, {status: 500})
    }
}
