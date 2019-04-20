import { TypescriptGenerator } from "graphql-binding";
import { startCase } from "lodash";
import { GraphQLSchema } from "graphql";

function formatName(name: string) {
  const startCaseName = startCase(name);

  const wordSplit = startCaseName.split(` `);

  if (wordSplit.length > 1) {
    return wordSplit.map(val => startCase(val.toLowerCase())).join(``);
  }

  return startCaseName;
}

const EXPORTS_TEMPLATE = (serviceName: string) => `
const rootTypeDefs = readFileSync(__dirname + '/schema.graphql', 'utf-8')     
export const ${serviceName}TypeDefs = [rootTypeDefs].join('')
export function create${formatName(
  serviceName
)}Binding({ uri, serviceId, customHeaders = {} }): ${formatName(
  serviceName
)}Binding {
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
        schema: ${serviceName}TypeDefs,
        link,
    })
  const ServiceBinding = makeBindingClass<BindingConstructor<${formatName(
    serviceName
  )}Binding>>({ schema })
  return new ServiceBinding()
}
`;

export class TSGenerator extends TypescriptGenerator {
  serviceName: string;
  constructor({
    schema,
    serviceName,
    inputSchemaPath,
    outputBindingPath,
    isDefaultExport
  }: {
    serviceName: string;
    schema: GraphQLSchema;
    inputSchemaPath: string;
    outputBindingPath: string;
    isDefaultExport: boolean;
  }) {
    super({ schema, inputSchemaPath, outputBindingPath, isDefaultExport });

    const serviceNameParts = serviceName.split(`-`);
    this.serviceName =
      serviceNameParts[0] +
      serviceNameParts
        .slice(1)
        .map(s => s.charAt(0).toUpperCase() + s.slice(1))
        .join(``);
  }
  renderExports() {
    return EXPORTS_TEMPLATE(this.serviceName);
  }
  renderTypeImports() {
    const typeNames = this.getTypeNames();

    return `
      import {
        ${this.serviceName === `github` ? `Query,` : ``}
        ${typeNames
          .filter(
            (name: string) =>
              ![
                `Boolean`,
                `String`,
                `ID`,
                `JSON`,
                `Int`,
                `HTML`,
                `URI`,
                `UUID`
              ].includes(name)
          )
          .map(formatName)
          .join(`,`)}
      } from './types'
    `;
  }
  renderImports() {
    return `\
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
    ${this.renderTypeImports()}
    `;
  }
  render() {
    return this.compile`\
${this.renderImports()}
export interface ${formatName(this.serviceName)}Query ${this.renderQueries()}
export interface ${formatName(
      this.serviceName
    )}Mutation ${this.renderMutations()}
export interface ${formatName(
      this.serviceName
    )}Subscription ${this.renderSubscriptions()}
export interface ${formatName(this.serviceName)}Binding {
  query: ${formatName(this.serviceName)}Query
  mutation: ${formatName(this.serviceName)}Mutation
  subscription: ${formatName(this.serviceName)}Subscription
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
${this.renderExports()}
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
`;
  }
}
