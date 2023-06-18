import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { EmployeesService } from './employees.service';
import { EmployeesController } from './employees.controller';
import { EmployeesRepository } from './employees.repository';

import { EmployeeSchema, Employee } from './schemas/employee.shema';

@Module({
    controllers: [EmployeesController],
    imports: [
        ConfigModule.forRoot({
            isGlobal: true
        }),
        MongooseModule.forRoot(
            'mongodb+srv://cluster0.kw7t2dq.mongodb.net',
            {
                user: process.env.DB_USER,
                pass: process.env.DB_PASSWORD,
                dbName: process.env.DB_NAME,
                w: 'majority',
                retryWrites: true
            }),
        MongooseModule.forFeature([{ name: Employee.name, schema: EmployeeSchema }]),
    ],
    providers: [EmployeesService, EmployeesRepository]
})
export class EmployeesModule { }
