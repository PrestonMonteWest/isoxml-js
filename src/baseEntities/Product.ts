import { ElementCompact } from 'xml-js'

import { TAGS } from './constants'
import { ISOXMLManager } from '../ISOXMLManager'
import { registerEntityClass } from '../classRegistry'
import { fromXML, toXML } from '../utils'
import { ProductRelation } from './ProductRelation'

import { Entity, EntityConstructor, AttributesDescription, ISOXMLReference } from '../types'

export const enum ProductProductTypeEnum {
    SingleDefault = '1',
    Mixture = '2',
    TemporaryMixture = '3',
}

export type ProductAttributes = {
    ProductDesignator: string
    ProductGroupIdRef?: ISOXMLReference
    ValuePresentationIdRef?: ISOXMLReference
    QuantityDDI?: string
    ProductType?: ProductProductTypeEnum
    MixtureRecipeQuantity?: number
    DensityMassPerVolume?: number
    DensityMassPerCount?: number
    DensityVolumePerCount?: number
    ProductRelation?: ProductRelation[]
    ProprietaryAttributes?: {[name: string]: string}
    ProprietaryTags?: {[tag: string]: ElementCompact[]}
}

const ATTRIBUTES: AttributesDescription = {
    A: { name: 'ProductId', type: 'xs:ID', isPrimaryId: true, isOnlyV4: false },
    B: { name: 'ProductDesignator', type: 'xs:string', isPrimaryId: false, isOnlyV4: false },
    C: { name: 'ProductGroupIdRef', type: 'xs:IDREF', isPrimaryId: false, isOnlyV4: false },
    D: { name: 'ValuePresentationIdRef', type: 'xs:IDREF', isPrimaryId: false, isOnlyV4: false },
    E: { name: 'QuantityDDI', type: 'xs:hexBinary', isPrimaryId: false, isOnlyV4: false },
    F: { name: 'ProductType', type: 'xs:NMTOKEN', isPrimaryId: false, isOnlyV4: true },
    G: { name: 'MixtureRecipeQuantity', type: 'xs:long', isPrimaryId: false, isOnlyV4: true },
    H: { name: 'DensityMassPerVolume', type: 'xs:long', isPrimaryId: false, isOnlyV4: true },
    I: { name: 'DensityMassPerCount', type: 'xs:long', isPrimaryId: false, isOnlyV4: true },
    J: { name: 'DensityVolumePerCount', type: 'xs:long', isPrimaryId: false, isOnlyV4: true },
}
const CHILD_TAGS = {
    PRN: { name: 'ProductRelation', isOnlyV4: true },
}

export class Product implements Entity {
    public tag = TAGS.Product

    constructor(public attributes: ProductAttributes, public isoxmlManager: ISOXMLManager) {
    }

    static fromXML(xml: ElementCompact, isoxmlManager: ISOXMLManager, targetClass: EntityConstructor = Product): Promise<Entity> {
        return fromXML(xml, isoxmlManager, targetClass, ATTRIBUTES, CHILD_TAGS)
    }

    toXML(): ElementCompact {
        return toXML(this, ATTRIBUTES, CHILD_TAGS)
    }
}

registerEntityClass(TAGS.Product, Product)