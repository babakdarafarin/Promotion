import { Injectable } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import { ProfileDto } from './Dtos/profile.dto';
import { SearchResult, SearchResultDto } from './Dtos/search-result.dto';
import { CustomResponse } from './Response/custom-response';
import { ConfigService } from '@nestjs/config'

@Injectable()
export class AppService {
  constructor(
    private readonly elasticsearchService: ElasticsearchService,
    private configService : ConfigService
  ) {
        let ENV = process.argv[2] ? process.argv[2] : process.env.NODE_ENV
        //change to async await TODO    process.argv[2].toString() 
        //this.configService.get('NODE_ENV')
        this.elasticsearchService.ping({},{requestTimeout: 3000})
        .then(() => {
          
          console.log('\n' + ENV +  ' db connected!\n')
        })
        .catch((error) => {
          console.log('\nError!\nCannot connect to ELK server on ' + ENV + ' environment.\nReason: ' + error + '\n\n')})
  }

  async CreateDoctorIndex() : Promise<CustomResponse> {  
    
    const indexExistence = await this.elasticsearchService.indices.exists({index: 'doctors'})
    if(indexExistence.body)
    {
      return new CustomResponse(
        'Index Already Exists!',
        true
      )
    }
    else{
      await this.elasticsearchService.indices.create({
        index: 'doctors',
        body: {
            "settings": {
                //"index.blocks.write": false,
                //"index.blocks.read_only_allow_delete": false,
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

      return new CustomResponse(
        'Index Created!',
        true
      )
    }
  }

  async BulkCreateDoctorProfiles(profiles : ProfileDto[]) : Promise<CustomResponse> {

    const indexExistence = await this.elasticsearchService.indices.exists({index: 'doctors'})
    if(!indexExistence.body)
    {
      return new CustomResponse(
        'Index Does Not Exist!',
        false
      )
    }
    else
    {
      const existingIds = await this.GetAllIds('doctors', 0, 10000)
    
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

      return new CustomResponse(
        'Profiles Inserted! (if duplicates existed, those were not inserted)',
        true
      )
    }
  }

  async BulkUpdateDoctorProfiles(inputs : ProfileDto[]) : Promise<CustomResponse> {

  //move for loop to the painless part TODO
  const indexExistence = await this.elasticsearchService.indices.exists({index: 'doctors'})
    if(!indexExistence.body)
    {
      return new CustomResponse(
        'Index Does Not Exist!',
        false
      )
    }
    else{
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

      return new CustomResponse(
        'Profiles Were Updated!',
        true
      )
    }  
  }

  async SearchData(index : string, q: string, from: number | 0, size: number | 100) : Promise<CustomResponse> {
    const indexExistence = await this.elasticsearchService.indices.exists({index: 'doctors'})
    if(!indexExistence.body)
    {
      return new CustomResponse(
        'Index Does Not Exist!',
        false
      )
    }
    else{
      let results : SearchResultDto = {
        resultsByNames : {} as SearchResult[],
        resultsByAbouts : {} as SearchResult[]
      }

      results.resultsByNames = await this.FindByNames(index, q, from, size)
      results.resultsByAbouts = await this.FindByAbouts(index, q, from, size)
      
      let res = new CustomResponse(
        'Search Completed!',
        true,
      )
      res.body = results

      return res
    }
  }

  async DeleteIndex(index: string) : Promise<CustomResponse> {
    const indexExistence = await this.elasticsearchService.indices.exists({index: 'doctors'})
    if(!indexExistence.body)
    {
      return new CustomResponse(
        'Index Does Not Exist!',
        false
      )
    }
    else{
      await this.elasticsearchService.indices.delete({index: index})

      return new CustomResponse(
        'Index Deleted!',
        true
      )
    }
  }

  async BulkDeleteDoctorProfiles(idsList : string[]) : Promise<CustomResponse> {
    const indexExistence = await this.elasticsearchService.indices.exists({index: 'doctors'})
    if(!indexExistence.body)
    {
      return new CustomResponse(
        'Index Does Not Exist!',
        false
      )
    }
    else{
      for(const id of idsList){
        await this.elasticsearchService.deleteByQuery({
          
          index: 'doctors',
          body: {
              "query": { 
                  "match": 
                  { 'id':  id} 
              }
            }
        })
      }

      return new CustomResponse(
        'Profiles Deleted!',
        true
      )      
    }
  }

  private async FindByNames(index : string, q: string, from: number | 0, size: number | 100) : Promise<any> {
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

  private async FindByAbouts(index : string, q: string, from: number | 0, size: number | 100) : Promise<any> {
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

  private async GetAllIds(index : string, from: number | 0, size: number | 100) : Promise<any> {
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