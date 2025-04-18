/**
 * TM-service
 *
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */
import { CredentialRepresentation } from './credentialRepresentation';
import { SocialLinkRepresentation } from './socialLinkRepresentation';
import { UserProfileMetadata } from './userProfileMetadata';
import { FederatedIdentityRepresentation } from './federatedIdentityRepresentation';
import { UserConsentRepresentation } from './userConsentRepresentation';


export interface UserRepresentation { 
    id?: string;
    username?: string;
    firstName?: string;
    lastName?: string;
    email?: string;
    emailVerified?: boolean;
    attributes?: { [key: string]: Array<string>; };
    userProfileMetadata?: UserProfileMetadata;
    self?: string;
    origin?: string;
    createdTimestamp?: number;
    enabled?: boolean;
    /** @deprecated */
    totp?: boolean;
    federationLink?: string;
    serviceAccountClientId?: string;
    credentials?: Array<CredentialRepresentation>;
    disableableCredentialTypes?: Set<string>;
    requiredActions?: Array<string>;
    federatedIdentities?: Array<FederatedIdentityRepresentation>;
    realmRoles?: Array<string>;
    clientRoles?: { [key: string]: Array<string>; };
    clientConsents?: Array<UserConsentRepresentation>;
    notBefore?: number;
    /** @deprecated */
    applicationRoles?: { [key: string]: Array<string>; };
    /** @deprecated */
    socialLinks?: Array<SocialLinkRepresentation>;
    groups?: Array<string>;
    access?: { [key: string]: boolean; };
}

