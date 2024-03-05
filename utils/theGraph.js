"use client";

async function loopGraph(address, type='owner'){
    const gdata=[]
    var offset = 0;
    for ( let i = 0; i>=0; i++) {
        var tokens = await theGraph(address, offset);
        console.log(i*100)
        if(tokens && tokens.errors == undefined){
            var resp = tokens['data']['domains'] 
            if(resp.length < 1){
                return(gdata)
            }
            console.log(resp)
            console.log('resppp', resp.slice(-1)[0].registerIndex)
            var offset = resp.slice(-1)[0].registerIndex
            console.log(offset)
            gdata.push(...resp);
           //console.log(gdata)
        } else{
            return(gdata)
        }
    }
    return(gdata)
}

async function searchGraph(query, type='address'){

}

async function searchAddress(address, offset){

    const resp = await fetch(`https://api.studio.thegraph.com/query/42000/linagee/v0.0.1`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query: `
      query {
        domains(where: {owner_contains_nocase: "${address}", registerIndex_gt: ${offset}}) {
            domainUtf8,
            domainBytecode,
            registerIndex
          }
        
    }`
      }),
    }).then((res)=>{
        return(res.json())
    })

    return(resp)
}

// search by domainUtf8, domainBytecode, owner, wrappedDomainOwner, primary, subRegistrar, content, reserveDate, wrapped

async function searchNameString(field, value, offset){
    const resp = await fetch(`https://api.studio.thegraph.com/query/42000/linagee/v0.0.1`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: `
          query {
            exact: domains(where: {${field}: "${value}"}) {
                domainUtf8,
                domainBytecode,
                  owner {
                    id
                  },
                  wrappedDomainOwner {
                    id
                  },
                  primary,
                  subRegistrar,
                  content,
                  reserveDate,
                  wrapped
            },
            search: domains(where: {${field}_contains_nocase: "${value}", registerIndex_gt: ${offset}}) {
                domainUtf8,
                domainBytecode,
                  owner {
                    id
                  },
                  wrappedDomainOwner {
                    id
                  },
                  primary,
                  subRegistrar,
                  content,
                  reserveDate,
                  wrapped,
                  registerIndex
              }
        }
          
      }`
        }),
      }).then((res)=>{
          return(res.json())
      })
  
      return(resp)
  }
