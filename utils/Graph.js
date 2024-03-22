/**
 * Utility class for working with TheGraph API
 */
class Graph {


    static async callAPI(endpoint, body = {}, method = 'POST') {
        try {
            const res = await fetch(`${endpoint}`, {
                method: method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: body,
                next: {
                    revalidate: 0
                }
            },
            );
    
            if (!res.ok) {
                let errorData = null;
                try {
                    errorData = await res.json(); // Try to parse the error information from response, if any
                } catch (parseError) {
                    console.error("Error parsing JSON:", parseError);
                    // errorData = res.statusText;
                }
    
                throw new APIError(`HTTP error! status: ${res.status}`, res.status, errorData, res);
            }
    
            let jsonResponse = await res.json();
            return jsonResponse;
        } catch (err) {
            console.error(err);
            throw err; // re-throw the error so it can be handled by the caller
        }
    }



      static async searchGraph(endpoint, field="domainUtf8", value="", offset=0) {

        const resp = await this.callAPI(endpoint, JSON.stringify({
          query: `
            query {
                exact: domains(where: {${field}: "${value}"}) {
                domainUtf8
                domainBytecode
                owner {
                    id
                }
                wrappedDomainOwner {
                    id
                }
                primary
                subRegistrar
                content
                reserveDate
                wrapped
                registerIndex
                },
                search: domains(where: {${field}_contains_nocase: "${value}", registerIndex_gt: ${offset}}) {
                domainUtf8
                domainBytecode
                owner {
                    id
                }
                wrappedDomainOwner {
                    id
                }
                primary
                subRegistrar
                content
                reserveDate
                wrapped
                registerIndex
                },
              
            }
          `
        }));
      
        return resp;
      }

      static async searchByAddressOld(endpoint, field="owner", value="", offset=0) {

        const resp = await this.callAPI(endpoint, JSON.stringify({
          query: `
          query {
            exact: domains(where: {
                AND: [
                    OR: [
                      { ${field}: "${value}" },
                      { wrappedDomainOwner: "${value}" }
                    ],
                    registerIndex_gt: 410255
                  ],
            }) {
                domainUtf8
                domainBytecode
                owner {
                    id
                }
                wrappedDomainOwner {
                    id
                }
                primary
                subRegistrar
                content
                reserveDate
                wrapped
                registerIndex
            },
        }
          `
        }));
      
        return resp;
      }
      
    
    
      static async searchByAddress(endpoint, field="owner", value="", offset=0) {

        const resp = await this.callAPI(endpoint, JSON.stringify({
          query: `
          query {
            domains(where: {${field}: "${value}", registerIndex_gt: 410254 }
            }) {
                domainUtf8
                domainBytecode
                owner {
                    id
                }
                wrappedDomainOwner {
                    id
                }
                primary
                subRegistrar
                content
                reserveDate
                wrapped
                registerIndex
            },
        }
          `
        }));
      
        return resp;
      }
      


 
}

export default Graph;