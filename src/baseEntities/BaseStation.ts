import { ElementCompact } from 'xml-js'

import { TAGS } from './constants'
import { ISOXMLManager } from '../ISOXMLManager'
import { registerEntityClass } from '../classRegistry'
import { fromXML, toXML } from '../utils'

import { Entity, EntityConstructor, AttributesDescription } from '../types'


export type BaseStationAttributes = {
    BaseStationDesignator: string
    BaseStationNorth: number
    BaseStationEast: number
    BaseStationUp: number
    ProprietaryAttributes?: {[name: string]: string}
    ProprietaryTags?: {[tag: string]: ElementCompact[]}
}

const ATTRIBUTES: AttributesDescription = {
    A: { name: 'BaseStationId', type: 'xs:ID', isPrimaryId: true, isOnlyV4: undefined },
    B: { name: 'BaseStationDesignator', type: 'xs:string', isPrimaryId: false, isOnlyV4: undefined },
    C: { name: 'BaseStationNorth', type: 'xs:decimal', isPrimaryId: false, isOnlyV4: undefined },
    D: { name: 'BaseStationEast', type: 'xs:decimal', isPrimaryId: false, isOnlyV4: undefined },
    E: { name: 'BaseStationUp', type: 'xs:long', isPrimaryId: false, isOnlyV4: undefined },
}
const CHILD_TAGS = {
}

export class BaseStation implements Entity {
    public tag = TAGS.BaseStation

    constructor(public attributes: BaseStationAttributes, public isoxmlManager: ISOXMLManager) {
    }

    static fromXML(xml: ElementCompact, isoxmlManager: ISOXMLManager, targetClass: EntityConstructor = BaseStation): Promise<Entity> {
        return fromXML(xml, isoxmlManager, targetClass, ATTRIBUTES, CHILD_TAGS)
    }

    toXML(): ElementCompact {
        return toXML(this, ATTRIBUTES, CHILD_TAGS)
    }
}

registerEntityClass(TAGS.BaseStation, BaseStation)