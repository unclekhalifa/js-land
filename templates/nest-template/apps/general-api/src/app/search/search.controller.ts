import {
  Controller
} from '@nestjs/common'
import {
  nestControllerContract,
  NestControllerInterface,
  NestRequestShapes,
  TsRest,
  TsRestRequest
} from '@ts-rest/nest'
import { contract } from '@nest-template/contracts'

import { SearchService } from './search.service'

const c = nestControllerContract(contract)
type RequestShapes = NestRequestShapes<typeof c>

@Controller()
@TsRest({ validateResponses: true })
export class SearchController implements NestControllerInterface<typeof c> {
  constructor(private readonly searchService: SearchService) {
  }

  @TsRest(c.getCompanies)
  async getCompanies(@TsRestRequest() { query: { name, number } }: RequestShapes['getCompanies']) {
    return {
      status: 200 as const,
      body: [
        {
          name: name || 'some name',
          number: number || '10459384'
        }
      ]
    }
  }

  @TsRest(c.getCompany)
  async getCompany(@TsRestRequest() { params: { companyNumber } }: RequestShapes['getCompany']) {
    return {
      status: 200 as const,
      body:
        {
          name: 'some-name',
          number: companyNumber
        }

    }
  }

  @TsRest(c.getOfficers)
  async getOfficers(@TsRestRequest() { query: { name, number } }: RequestShapes['getOfficers']) {
    return {
      status: 200 as const,
      body: [
        {
          name: name || 'some name',
          number: number || '10459384'
        }
      ]
    }
  }

  @TsRest(c.getOfficer)
  async getOfficer(@TsRestRequest() { params: { officerNumber } }: RequestShapes['getOfficer']) {
    return {
      status: 200 as const,
      body:
        {
          name: 'some-name',
          number: officerNumber
        }

    }
  }

  @TsRest(c.aiSearch)
  async aiSearch(@TsRestRequest() { query: { text } }: RequestShapes['aiSearch']) {
    return {
      status: 200 as const,
      body:
        {
          response: text
        }

    }
  }

}
