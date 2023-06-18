import { Prop, SchemaFactory, Schema } from "@nestjs/mongoose";
import { HydratedDocument } from 'mongoose';
import { Type } from "class-transformer";
import { Address, AddressSchema } from "./address.shema";

@Schema()
export class Employee {
    @Prop({ required: true })
    name: string;

    @Prop({ required: true })
    email: string;

    @Prop({ required: true })
    phoneNumber: number;

    @Prop({ type: AddressSchema })
    @Type(() => Address)
    homeAddress: Address;

    @Prop({ required: true })
    dateOfEmployment: Date;

    @Prop({ required: true })
    dateOfBirth: Date;

    @Prop({ default: false })
    deleted: boolean;

}

export const EmployeeSchema = SchemaFactory.createForClass(Employee);
export type EmployeeDocument = HydratedDocument<Employee>;