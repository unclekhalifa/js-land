import { Injectable } from '@nestjs/common'

@Injectable()
export class SearchService {
  create() {
    return 'This action adds a new search'
  }

  findAll() {
    return `This action returns all search`
  }

  findOne(id: number) {
    return `This action returns a #${id} search`
  }

  update(id: number) {
    return `This action updates a #${id} search`
  }

  remove(id: number) {
    return `This action removes a #${id} search`
  }
}
