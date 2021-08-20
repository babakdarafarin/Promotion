import { Injectable } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import { ProfileDto } from './Dtos/profile.dto';
import { SearchResult, SearchResultDto } from './Dtos/search-result.dto';

@Injectable()
export class AppService {
  constructor(
    private readonly elasticsearchService: ElasticsearchService
  ) {
        this.elasticsearchService.ping({},{requestTimeout: 3000})
        .then((res) => {console.log('ELK db connected!')})
        .catch((err) => {throw new Error(err)})
  }

  async CreateDoctorIndex() {  
    
    const indexExistence = await this.elasticsearchService.indices.exists({index: 'doctors'})
    if(indexExistence.body)
    {
      //return it exists!
    }
    else{
      return await this.elasticsearchService.indices.create({
        index: 'doctors',
        body: {
            "settings": {
                "index.max_ngram_diff" : 17,
                "analysis": {
                    "filter": {
                        "autocomplete_filter": {                                
                            "type": "nGram",
                            "min_gram": 3,
                            "max_gram": 20
                        }
                    },
                    "analyzer": {
                        "autocomplete": {
                            "type": "custom",
                            "tokenizer": "standard",
                            "filter":[
                                "lowercase", "autocomplete_filter"
                            ]
                        }
                    },
                }
            },
            "mappings":{
                "properties":{
                    "id": {
                        "type":"text",
                        "search_analyzer":"standard"
                    },
                    "firstname": {
                        "type":"text",
                        "analyzer":"autocomplete", 
                        "search_analyzer":"standard"
                    },
                    "lastname": {
                    "type":"text",
                    "analyzer":"autocomplete", 
                    "search_analyzer":"standard"
                    },
                    "about": {
                        "type":"text",
                        "analyzer":"autocomplete", 
                        "search_analyzer":"standard"
                    }
                }
            }
        }
      })
    }
  }

  //return profiles that were not added
  async BulkCreateDoctorProfiles(profiles : ProfileDto[]) {

    const indexExistence = await this.elasticsearchService.indices.exists({index: 'doctors'})
    if(!indexExistence.body)
    {
      //return index does not exist
    }
    else
    {
      const existingIds = await this.FindByIds('doctors', 0, 10000)
    
      //deleting duplicates
      let profilesToAdd = [] as ProfileDto[]
      for(let profile of profiles){
        if(!existingIds.includes(profile.id))
        {
          profilesToAdd.push(profile)
        }
      }    

      profilesToAdd.forEach((profile) => {
              this.elasticsearchService.index({
              index: 'doctors',
              refresh: true,
              body: {
                  id: profile.id,
                  firstname: profile.firstname,
                  lastname: profile.lastname,
                  about: profile.about
              }
          })
      })
    }
  }

  async BulkUpdateDoctorProfiles(inputs : ProfileDto[]){

  //move for loop to the painless part
    for(const profile of inputs){
        await this.elasticsearchService.updateByQuery(
            {
            index: "doctors",  
            refresh: true,
            body: {
                "query": { 
                    "match": 
                    { "id":  profile.id} 
                },
                "script": {
                    "lang": 'painless',
                    "source": "if(params.firstname != null) {ctx._source.firstname = params.firstname;}  if(params.lastname != null) {ctx._source.lastname = params.lastname;} if(params.about != null) {ctx._source.about = params.about;}",
                    "params": {
                        "firstname": profile.firstname,
                        "lastname": profile.lastname,
                        "about": profile.about
                      }
                },
            }
        })
    }
  }

  async SearchData(index : string, q: string, from: number | 0, size: number | 100) {

  let results : SearchResultDto = {
      resultsByNames : {} as SearchResult[],
      resultsByAbouts : {} as SearchResult[]
  }

    results.resultsByNames = await this.FindByNames(index, q, from, size)
    results.resultsByAbouts = await this.FindByAbouts(index, q, from, size)
    
    return results
  }

  async DeleteIndex(index: string){
  return await this.elasticsearchService.indices.delete({index: index})
  .then(res => ({status: 'success', data: res}))
  .catch(err => { throw new Error('Failed to bulk delete data'); });
  }

  async BulkDeleteDoctorProfiles(idsList : number[]){
  

    console.log(idsList)
    for(const id in idsList){
      await this.elasticsearchService.delete_by_query({
        
        index: 'doctors',
        body: {
          body: {
            "query": { 
                "match": 
                { "id":  id} 
            }
          }
        }
      })
    }
  }

  async FindByNames(index : string, q: string, from: number | 0, size: number | 100){
    let res = await this.elasticsearchService.search({
      index: index,
      body: {
        query: {
          multi_match: {
              query: q,
              fields: ['firstname','lastname'],
              //fuzziness: 'AUTO'
          }
        }
      }
    })

    let resultsByNames = [] as SearchResult[]
    for(let i of res.body.hits.hits)
    {
        resultsByNames.push({
            id : i._source.id,
            firstname : i._source.firstname, 
            lastname : i._source.lastname,
            about : i._source.about,
            score : i._score
            
        })
    }

    return resultsByNames
  }

  async FindByAbouts(index : string, q: string, from: number | 0, size: number | 100){
    let res = await this.elasticsearchService.search({
      index: index,
      body: {
        query: {
          multi_match: {
              query: q,
              fields: ['about']
              //fuzziness: 'AUTO'
          }
        }
      }
    })

    let resultsByAbouts = [] as SearchResult[]
    for(let i of res.body.hits.hits)
    {
      resultsByAbouts.push({
            id : i._source.id,
            firstname : i._source.firstname, 
            lastname : i._source.lastname,
            about : i._source.about,
            score : i._score
        })
    }

    return resultsByAbouts
  }

  async FindByIds(index : string, from: number | 0, size: number | 100){
    let res = await this.elasticsearchService.search({
      index: index,
      body: {
        query: {
          match_all: {}
        },
        _source:["id"]
      }
    })
    
    let idsList = [] as string[]
    for(let item of res.body.hits.hits){
      idsList.push(item._source.id)
    }

    return idsList
  }
}