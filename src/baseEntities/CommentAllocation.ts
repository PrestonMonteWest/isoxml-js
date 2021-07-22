import { ElementCompact } from 'xml-js'

import { TAGS } from './constants'
import { ISOXMLManager } from '../ISOXMLManager'
import { registerEntityClass } from '../classRegistry'
import { fromXML, toXML } from '../utils'
import { AllocationStamp } from './AllocationStamp'

import { Entity, EntityConstructor, AttributesDescription, ISOXMLReference } from '../types'


export type CommentAllocationAttributes = {
    CodedCommentIdRef?: ISOXMLReference
    CodedCommentListValueIdRef?: ISOXMLReference
    FreeCommentText?: string
    AllocationStamp?: AllocationStamp[]
    ProprietaryAttributes?: {[name: string]: string}
    ProprietaryTags?: {[tag: string]: ElementCompact[]}
}

const ATTRIBUTES: AttributesDescription = {
    A: { name: 'CodedCommentIdRef', type: 'xs:IDREF', isPrimaryId: false, isOnlyV4: false },
    B: { name: 'CodedCommentListValueIdRef', type: 'xs:IDREF', isPrimaryId: false, isOnlyV4: false },
    C: { name: 'FreeCommentText', type: 'xs:string', isPrimaryId: false, isOnlyV4: false },
}
const CHILD_TAGS = {
    ASP: { name: 'AllocationStamp', isOnlyV4: false },
}

export class CommentAllocation implements Entity {
    public tag = TAGS.CommentAllocation

    constructor(public attributes: CommentAllocationAttributes, public isoxmlManager: ISOXMLManager) {
    }

    static fromXML(xml: ElementCompact, isoxmlManager: ISOXMLManager, targetClass: EntityConstructor = CommentAllocation): Promise<Entity> {
        return fromXML(xml, isoxmlManager, targetClass, ATTRIBUTES, CHILD_TAGS)
    }

    toXML(): ElementCompact {
        return toXML(this, ATTRIBUTES, CHILD_TAGS)
    }
}

registerEntityClass(TAGS.CommentAllocation, CommentAllocation)