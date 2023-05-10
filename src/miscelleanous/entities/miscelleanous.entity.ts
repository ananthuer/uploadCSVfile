import { Model, Table, Column, PrimaryKey, DataType, HasOne, BelongsTo, ForeignKey, HasMany, BelongsToMany } from 'sequelize-typescript';

@Table
export class Miscelleanous extends Model{

     @Column({ type: DataType.STRING })
    type : string;

    @Column({ type: DataType.STRING })
    Validator : string;

}
