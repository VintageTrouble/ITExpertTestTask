const config = {
    url: process.env.REACT_APP_BASE_URL,
    port: process.env.REACT_APP_PORT
}

export class Api {
    constructor(config) {
        this.config = config;
    }
    createObj(text) {
        return fetch(`${this.config.url}:${this.config.port}/inputobjects`, {
            method: "POST",
            headers: {
                'Origin': 'http://localhost:3000',
                'Access-Control-Request-Method': 'POST',
                'Access-Control-Request-Headers': 'Content-Type',
                'Content-Type': 'application/json'
            },
            body: text
        })
    }

    getData({codeFilter, valueFilter, sortColumn, sortOrder, page, pageSize}) {
        const url = new URL(`${this.config.url}:${this.config.port}/inputobjects`);

        if(codeFilter) url.searchParams.append('codeFilter', codeFilter)
        if(valueFilter) url.searchParams.append('valueFilter', valueFilter)
        if(sortColumn) url.searchParams.append('sortColumn', sortColumn)
        if(sortOrder) url.searchParams.append('sortOrder', sortOrder)
        url.searchParams.append('page', page)
        url.searchParams.append('pageSize', pageSize)


        return fetch(url, {
            method: "GET",
            headers: {
                'Origin': 'http://localhost:3000',
                'Access-Control-Request-Method': 'GET'
            }
        })
        .then(res => {return this._checkResponse(res)})
    }
    _checkResponse(res) {
        if (res.ok) {
          return res.json()
        }
        return Promise.reject(`Ошибка ${res.status}`);
      }
}

export const api = new Api(config);