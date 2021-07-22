import { ElementCompact } from 'xml-js'

import { TAGS } from './constants'
import { ISOXMLManager } from '../ISOXMLManager'
import { registerEntityClass } from '../classRegistry'
import { fromXML, toXML } from '../utils'
import { OperationTechniqueReference } from './OperationTechniqueReference'

import { Entity, EntityConstructor, AttributesDescription } from '../types'


export type CulturalPracticeAttributes = {
    CulturalPracticeDesignator: string
    OperationTechniqueReference?: OperationTechniqueReference[]
    ProprietaryAttributes?: {[name: string]: string}
    ProprietaryTags?: {[tag: string]: ElementCompact[]}
}

const ATTRIBUTES: AttributesDescription = {
    A: { name: 'CulturalPracticeId', type: 'xs:ID', isPrimaryId: true, isOnlyV4: false },
    B: { name: 'CulturalPracticeDesignator', type: 'xs:string', isPrimaryId: false, isOnlyV4: false },
}
const CHILD_TAGS = {
    OTR: { name: 'OperationTechniqueReference', isOnlyV4: false },
}

export class CulturalPractice implements Entity {
    public tag = TAGS.CulturalPractice

    constructor(public attributes: CulturalPracticeAttributes, public isoxmlManager: ISOXMLManager) {
    }

    static fromXML(xml: ElementCompact, isoxmlManager: ISOXMLManager, targetClass: EntityConstructor = CulturalPractice): Promise<Entity> {
        return fromXML(xml, isoxmlManager, targetClass, ATTRIBUTES, CHILD_TAGS)
    }

    toXML(): ElementCompact {
        return toXML(this, ATTRIBUTES, CHILD_TAGS)
    }
}

registerEntityClass(TAGS.CulturalPractice, CulturalPractice)