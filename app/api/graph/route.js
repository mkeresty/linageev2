import {NextResponse} from 'next/server';
import Graph from '@/utils/Graph';


export async function POST(req) {

    try{
        const response = await req.json()
        let {field, value, offset} = response;
        let results = await Graph.searchGraph(process.env.SUBGRAPH_URL, field, value, offset)

        if(results.data){
            return NextResponse.json({results: results.data});
        } else {
            return NextResponse.json({error: {message: "No results found"}}, {status: 200});
        }

        
    
    } catch(error){
        console.log(error)
        return NextResponse.json({error: {message: error.message}}, {status: 500})
    }
}
