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
        
        User
      } from './types'
    
    
export interface UserQuery {
    user: <T = User | null>(args?: {}, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T | null> ,
    userById: <T = User | null>(args: { id: ID_Output }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T | null> 
  }
export interface UserMutation {
    createUser: <T = User | null>(args?: {}, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T | null> 
  }
export interface UserSubscription {}
export interface UserBinding {
  query: UserQuery
  mutation: UserMutation
  subscription: UserSubscription
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
export const userTypeDefs = [rootTypeDefs].join('')
export function createUserBinding({ uri, serviceId, customHeaders = {} }): UserBinding {
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
        schema: userTypeDefs,
        link,
    })
  const ServiceBinding = makeBindingClass<BindingConstructor<UserBinding>>({ schema })
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
