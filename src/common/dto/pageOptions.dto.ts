import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsEnum, IsInt, IsOptional, Max, Min } from 'class-validator';
import { Order } from '../constants/order.constant';
import { Pagination } from '../constants/pagination.constants';

export class PageOptionsDto {
  @ApiPropertyOptional({
    enum: Order,
    default: Order.ASC,
    description: 'Indicates the order of returned entities.',
  })
  @IsEnum(Order)
  @IsOptional()
  readonly order?: Order = Order.ASC;

  @ApiPropertyOptional({
    minimum: 1,
    default: 1,
    description: 'Number of the page to be fetched in the request.',
  })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @IsOptional()
  readonly page?: number = Pagination.DEFAULT_PAGE;

  @ApiPropertyOptional({
    minimum: 1,
    maximum: 50,
    default: 10,
    description: 'Number of elements per page.'
  })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(50)
  @IsOptional()
  readonly take?: number = Pagination.DEFAULT_TAKE;

  get skip(): number {
    return (
      ((this.page || Pagination.DEFAULT_PAGE) - 1) *
      (this.take || Pagination.DEFAULT_TAKE)
    );
  }
}
