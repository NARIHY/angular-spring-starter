/**
 * TM-service
 *
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */
import { TypesRateManagementEntity } from './typesRateManagementEntity';
import { StatusEntity } from './statusEntity';


export interface RateManagementEntity { 
    id?: number;
    price: string;
    rateLenght: string;
    typesRateManagementEntity?: TypesRateManagementEntity;
    status?: StatusEntity;
    creationDate?: string;
    lastModifiedDate?: string;
}

