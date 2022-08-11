import { ApiProperty } from '@nestjs/swagger';
import { Pagination } from '../constants/pagination.constants';
import { PageMetaDtoParameters } from '../interfaces/pageMeta.interface';

export class PageMetaDto {
  @ApiProperty({ example: 1, description: 'Number of the returned page' })
  readonly page: number;

  @ApiProperty({ example: 10, description: 'Number of elements per page' })
  readonly take: number;

  @ApiProperty({ example: 12, description: 'Total number of available items' })
  readonly itemCount: number;

  @ApiProperty({ example: 2, description: 'Number of total pages' })
  readonly pageCount: number;

  @ApiProperty({
    example: false,
    description: 'Indicates whether the previous page exists',
  })
  readonly hasPreviousPage: boolean;

  @ApiProperty({
    example: true,
    description: 'Indicates whether the following page exists',
  })
  readonly hasNextPage: boolean;

  constructor({ pageOptionsDto, itemCount }: PageMetaDtoParameters) {
    this.page = pageOptionsDto.page || Pagination.DEFAULT_PAGE;
    this.take = pageOptionsDto.take || Pagination.DEFAULT_TAKE;
    this.itemCount = itemCount;
    this.pageCount = Math.ceil(this.itemCount / this.take);
    this.hasPreviousPage = this.page > 1;
    this.hasNextPage = this.page < this.pageCount;
  }
}
