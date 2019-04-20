    /**
     * THIS FILE HAS BEEN GENERATED. DO NOT EDIT!
     */    
    import { makeBindingClass, Options } from 'graphql-binding'
    import { get } from 'lodash'
    import * as fetch from 'isomorphic-fetch'
    import { HttpLink } from 'apollo-link-http'
    import { setContext } from 'apollo-link-context'
    import { GraphQLResolveInfo, GraphQLSchema } from 'graphql'
    import { makeRemoteExecutableSchema, IResolvers } from 'graphql-tools'
    import { readFileSync } from 'fs'
    
      import {
        
        
      } from './types'
    
    
export interface CoreQuery {
    hello: <T = String | null>(args?: {}, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T | null> 
  }
export interface CoreMutation {
    createFoo: <T = String | null>(args?: {}, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T | null> 
  }
export interface CoreSubscription {}
export interface CoreBinding {
  query: CoreQuery
  mutation: CoreMutation
  subscription: CoreSubscription
  request: <T = any>(query: string, variables?: {[key: string]: any}) => Promise<T>
  delegate(operation: 'query' | 'mutation', fieldName: string, args: {
      [key: string]: any;
  }, infoOrQuery?: GraphQLResolveInfo | string, options?: Options): Promise<any>;
  delegateSubscription(fieldName: string, args?: {
      [key: string]: any;
  }, infoOrQuery?: GraphQLResolveInfo | string, options?: Options): Promise<AsyncIterator<any>>;
  getAbstractResolvers(filterSchema?: GraphQLSchema | string): IResolvers;
}
interface BindingConstructor<T> {
  new(...args: any[]): T
}

const rootTypeDefs = readFileSync(__dirname + '/schema.graphql', 'utf-8')     
export const coreTypeDefs = [rootTypeDefs].join('')
export function createCoreBinding({ uri, serviceId, customHeaders = {} }): CoreBinding {
    const http = new HttpLink({
        uri,
        fetch,
    })
    const link = setContext((_request, previousContext) => {
      const previousGraphQLContext = get(previousContext, 'graphqlContext')
      const headersForContext = {
        ...get(previousGraphQLContext, 'headers', {}),
        serviceId,
      }
      return {
        headers: {...headersForContext, ...customHeaders }
      }
    }).concat(http)
    const schema = makeRemoteExecutableSchema({
        schema: coreTypeDefs,
        link,
    })
  const ServiceBinding = makeBindingClass<BindingConstructor<CoreBinding>>({ schema })
  return new ServiceBinding()
}

// Types
/*
The 'Boolean' scalar type represents 'true' or 'false'.
*/
export type Boolean = boolean
/*
The 'Int' scalar type represents non-fractional signed whole numeric values. Int can represent values between -(2^31) and 2^31 - 1. 
*/
export type Int = number
/*
The String scalar type represents textual data, represented as UTF-8 character sequences. The String type is most often used by GraphQL to represent free-form human-readable text.
*/
export type String = string
export type ID_Output = string
export type UUID = string
export type URI = string
export type HTML = string
export type JSON = string
