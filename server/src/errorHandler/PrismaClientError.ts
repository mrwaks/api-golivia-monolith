"use strict";

// Types
import { Prisma } from "@prisma/client";
import { ErrorRequestHandler } from "express";
import { HttpStatus } from "../types";

/**
 * Error handler for prisma client.
 * 
 * @param error 
 * @returns 
 */
const prismaClientError = (error: ErrorRequestHandler) => {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
        switch (error.code) {
            case "P2000":
                return {
                    status: HttpStatus.BADREQUEST,
                    message: `The provided value for the column is too long for the column's type. Column: ${error.meta.column_name}`
                };
                break;
            case "P2001":
                return {
                    status: HttpStatus.NOTFOUND,
                    message: `The record searched for in the where condition (${error.meta.model_name}.${error.meta.argument_name} = ${error.meta.argument_value}) does not exist`
                };
                break;
            case "P2002":
                return {
                    status: HttpStatus.CONFLICT,
                    message: `Unique constraint failed on the ${error.meta.target}`
                };
                break;
            case "P2003":
                return {
                    status: HttpStatus.CONFLICT,
                    message: `Foreign key constraint failed on the field: ${error.meta.field_name}`
                };
                break;
            case "P2004":
                return {
                    status: HttpStatus.CONFLICT,
                    message: `A constraint failed on the database: ${error.meta.database_error}`
                };
                break;
            case "P2005":
                return {
                    status: HttpStatus.BADREQUEST,
                    message: `The value ${error.meta.field_value} stored in the database for the field ${error.meta.field_name} is invalid for the field's type`
                };
                break;
            case "P2006":
                return {
                    status: HttpStatus.BADREQUEST,
                    message: `The provided value ${error.meta.field_value} for ${error.meta.model_name} field ${error.meta.field_name} is not valid`
                };
                break;
            case "P2007":
                return {
                    status: HttpStatus.BADREQUEST,
                    message: `Data validation error ${error.meta.database_error}`
                };
                break;
            case "P2008":
                return {
                    status: HttpStatus.INTERNSERVERR,
                    message: `Failed to parse the query ${error.meta.query_parsing_error} at ${error.meta.query_position}`
                };
                break;
            case "P2009":
                return {
                    status: HttpStatus.INTERNSERVERR,
                    message: `Failed to validate the query: ${error.meta.query_validation_error} at ${error.meta.query_position}`
                };
                break;
            case "P2010":
                return {
                    status: HttpStatus.INTERNSERVERR,
                    message: `Raw query failed. Code: ${error.code}. Message: ${error.message}`
                };
                break;
            case "P2011":
                return {
                    status: HttpStatus.CONFLICT,
                    message: `Null constraint violation on the ${error.meta.target}`
                };
                break;
            case "P2012":
                return {
                    status: HttpStatus.BADREQUEST,
                    message: `Missing a required value at ${error.meta.path}`
                };
                break;
            case "P2013":
                return {
                    status: HttpStatus.BADREQUEST,
                    message: `Missing the required argument ${error.meta.argument_name} for field ${error.meta.field_name} on ${error.meta.object_name}`
                };
                break;
            case "P2014":
                return {
                    status: HttpStatus.CONFLICT,
                    message: `The change you are trying to make would violate the required relation '${error.meta.relation_name}' between the ${error.meta.model_a_name} and ${error.meta.model_b_name} models`
                };
                break;
            case "P2015":
                return {
                    status: HttpStatus.NOTFOUND,
                    message: `A related record could not be found. ${error.meta.details}`
                };
                break;
            case "P2016":
                return {
                    status: HttpStatus.INTERNSERVERR,
                    message: `Query interpretation error. ${error.meta.details}`
                };
                break;
            case "P2017":
                return {
                    status: HttpStatus.INTERNSERVERR,
                    message: `The records for relation ${error.meta.relation_name} between the ${error.meta.parent_name} and ${error.meta.child_name} models are not connected.`
                };
                break;
            case "P2018":
                return {
                    status: HttpStatus.NOTFOUND,
                    message: `The required connected records were not found. ${error.meta.details}`
                };
                break;
            case "P2019":
                return {
                    status: HttpStatus.BADREQUEST,
                    message: `Input error. ${error.meta.details}`
                };
                break;
            case "P2020":
                return {
                    status: HttpStatus.BADREQUEST,
                    message: `Value out of range for the type. ${error.meta.details}`
                };
                break;
            case "P2021":
                return {
                    status: HttpStatus.NOTFOUND,
                    message: `The table ${error.meta.table} does not exist in the current database.`
                };
                break;
            case "P2022":
                return {
                    status: HttpStatus.NOTFOUND,
                    message: `The column ${error.meta.column} does not exist in the current database.`
                };
                break;
            case "P2023":
                return {
                    status: HttpStatus.INTERNSERVERR,
                    message: `Inconsistent column data: ${error.message}`
                };
                break;
            case "P2024":
                return {
                    status: HttpStatus.INTERNSERVERR,
                    message: `Timed out fetching a new connection from the connection pool. (More info: http://pris.ly/d/connection-pool, Current connection limit: ${error.meta.connection_limit})`
                };
                break;
            case "P2025":
                return {
                    status: HttpStatus.NOTFOUND,
                    message: `An operation failed because it depends on one or more records that were required but not found. ${error.meta.cause}`
                };
                break;
            case "P2026":
                return {
                    status: HttpStatus.BADREQUEST,
                    message: `The current database provider doesn't support a feature that the query used: ${error.meta.feature}`
                };
                break;
            case "P2027":
                return {
                    status: HttpStatus.INTERNSERVERR,
                    message: `Multiple errors occurred on the database during query execution: ${error.meta.errors}`
                };
                break;
            case "P2030":
                return {
                    status: HttpStatus.NOTFOUND,
                    message: `Cannot find a fulltext index to use for the search, try adding a @@fulltext([Fields...]) to your schema`
                };
                break;
            default:
                throw error;
                break;
        }
    }
};

export default prismaClientError;