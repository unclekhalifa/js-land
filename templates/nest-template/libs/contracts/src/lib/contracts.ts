import { initContract } from '@ts-rest/core'
import { z } from 'zod'

const c = initContract()

const CompanySearchQuery = z.object({
  name: z.string().optional(),
  number: z.string().length(8, 'Company number must be 8 characters').optional()
}).partial().refine(({name, number}) => !!name || !!number, "You must perform search using name or number")

const CompanySchema = z.object({
  name: z.string(),
  number: z.string()
}).strict()

const OfficerSearchQuery = z.object({
  name: z.string().optional(),
  number: z.string().optional()
}).partial().refine(({name, number}) => !!name || !!number, "You must perform search using name or number")

const OfficerSchema = z.object({
  name: z.string(),
  number: z.string()
}).strict()

export const contract = c.router({
  getCompanies: {
    method: 'GET',
    path: '/search/companies',
    query: CompanySearchQuery,
    responses: {
      200: z.array(CompanySchema).nullable()
    },
    summary: 'Used to return information about companies'
  },
  getCompany: {
    method: 'GET',
    path: '/search/companies/:companyNumber',
    responses: {
      200: CompanySchema.nullable()
    },
    summary: 'Used to return information about a specific company'
  },
  getOfficers: {
    method: 'GET',
    path: '/search/officers',
    query: OfficerSearchQuery,
    responses: {
      200: z.array(OfficerSchema).nullable()
    },
    summary: 'Used to return information about officers'
  },
  getOfficer: {
    method: 'GET',
    path: '/search/officers/:officerNumber',
    responses: {
      200: OfficerSchema.nullable()
    },
    summary: 'Used to return information about a specific officer'
  },
  aiSearch: {
    method: 'GET',
    path: '/search/ai',
    query: z.object({ text: z.string() }),
    responses: {
      200: z.object({response: z.string()})
    },
    summary: 'Used to search for information using AI text search'
  }
})
