import { Body, Controller, Get, Post, Param, Patch, Query, ParseIntPipe } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { EmployeesService } from './employees.service';

import { CreateEmployeeDTO } from './dtos/create-employee.dto';
import { UpdateEmployeeDTO } from './dtos/update-employee.dto';


@ApiTags('Employees')
@Controller('employees')
export class EmployeesController {
  constructor(private employeesService: EmployeesService) { }

  @Post()
  @ApiOperation({ summary: 'Creating a new employess' })
  async createEmployee(@Body() body: CreateEmployeeDTO) {
    return this.employeesService.create(body)
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Soft deleting of employees' })
  async deleteEmployee(@Param('id') id: string) {
    return this.employeesService.delete(id);
  }

  @Patch(':id/update')
  @ApiOperation({ summary: 'Editing of existing employees' })
  async updateEmployee(@Param('id') id: string, @Body() body: UpdateEmployeeDTO) {
    return this.employeesService.update(
      id,
      body
    );
  }

  @Get('paginatedEmployees')
  @ApiOperation({ summary: 'Paginated list of employees' })
  async findEmployees(
    @Query('page', ParseIntPipe) page: number = 1,
    @Query('limit', ParseIntPipe) limit: number = 2,
  ) {
    return this.employeesService.findEmployees(
      page,
      limit
    );
  }

  @Get('/deletedEmployees')
  @ApiOperation({ summary: 'List of deleted employess' })
  async findDeletedEmployees() {
    return this.employeesService.findDeletedEmployees();
  }

}
