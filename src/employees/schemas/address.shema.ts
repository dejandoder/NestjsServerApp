import { Prop, SchemaFactory, Schema } from "@nestjs/mongoose";
import { HydratedDocument } from 'mongoose';

@Schema()
export class Address {

    @Prop({ required: true })
    city: string;

    @Prop({ required: true })
    zipCode: number;

    @Prop({ required: true })
    addressLine1: string;

    @Prop({ required: false })
    addressLine2: string;

}

export const AddressSchema = SchemaFactory.createForClass(Address);
export type AddressDocument = HydratedDocument<Address>;