export var __esModule: boolean;
export let CategoryRepository: {
    new (): {
        readonly manager: typeorm_1.EntityManager;
        readonly metadata: typeorm_1.EntityMetadata;
        readonly queryRunner?: typeorm_1.QueryRunner;
        createQueryBuilder(alias?: string, queryRunner?: typeorm_1.QueryRunner): typeorm_1.SelectQueryBuilder<any>;
        readonly target: string | Function;
        hasId(entity: any): boolean;
        getId(entity: any): any;
        create(): any;
        create(entityLikeArray: typeorm_1.DeepPartial<any>[]): any[];
        create(entityLike: typeorm_1.DeepPartial<any>): any;
        merge(mergeIntoEntity: any, ...entityLikes: typeorm_1.DeepPartial<any>[]): any;
        preload(entityLike: typeorm_1.DeepPartial<any>): Promise<any>;
        save<T extends typeorm_1.DeepPartial<any>>(entities: T[], options: typeorm_1.SaveOptions & {
            reload: false;
        }): Promise<T[]>;
        save<T_1 extends typeorm_1.DeepPartial<any>>(entities: T_1[], options?: typeorm_1.SaveOptions): Promise<any[]>;
        save<T_2 extends typeorm_1.DeepPartial<any>>(entity: T_2, options: typeorm_1.SaveOptions & {
            reload: false;
        }): Promise<T_2>;
        save<T_3 extends typeorm_1.DeepPartial<any>>(entity: T_3, options?: typeorm_1.SaveOptions): Promise<any>;
        remove(entities: any[], options?: typeorm_1.RemoveOptions): Promise<any[]>;
        remove(entity: any, options?: typeorm_1.RemoveOptions): Promise<any>;
        softRemove<T_4 extends typeorm_1.DeepPartial<any>>(entities: T_4[], options: typeorm_1.SaveOptions & {
            reload: false;
        }): Promise<T_4[]>;
        softRemove<T_5 extends typeorm_1.DeepPartial<any>>(entities: T_5[], options?: typeorm_1.SaveOptions): Promise<any[]>;
        softRemove<T_6 extends typeorm_1.DeepPartial<any>>(entity: T_6, options: typeorm_1.SaveOptions & {
            reload: false;
        }): Promise<T_6>;
        softRemove<T_7 extends typeorm_1.DeepPartial<any>>(entity: T_7, options?: typeorm_1.SaveOptions): Promise<any>;
        recover<T_8 extends typeorm_1.DeepPartial<any>>(entities: T_8[], options: typeorm_1.SaveOptions & {
            reload: false;
        }): Promise<T_8[]>;
        recover<T_9 extends typeorm_1.DeepPartial<any>>(entities: T_9[], options?: typeorm_1.SaveOptions): Promise<any[]>;
        recover<T_10 extends typeorm_1.DeepPartial<any>>(entity: T_10, options: typeorm_1.SaveOptions & {
            reload: false;
        }): Promise<T_10>;
        recover<T_11 extends typeorm_1.DeepPartial<any>>(entity: T_11, options?: typeorm_1.SaveOptions): Promise<any>;
        insert(entity: import("typeorm/query-builder/QueryPartialEntity").QueryDeepPartialEntity<any> | import("typeorm/query-builder/QueryPartialEntity").QueryDeepPartialEntity<any>[]): Promise<typeorm_1.InsertResult>;
        update(criteria: string | number | string[] | number[] | Date | typeorm_1.ObjectID | typeorm_1.FindConditions<any> | Date[] | typeorm_1.ObjectID[], partialEntity: import("typeorm/query-builder/QueryPartialEntity").QueryDeepPartialEntity<any>): Promise<typeorm_1.UpdateResult>;
        delete(criteria: string | number | string[] | number[] | Date | typeorm_1.ObjectID | typeorm_1.FindConditions<any> | Date[] | typeorm_1.ObjectID[]): Promise<typeorm_1.DeleteResult>;
        softDelete(criteria: string | number | string[] | number[] | Date | typeorm_1.ObjectID | typeorm_1.FindConditions<any> | Date[] | typeorm_1.ObjectID[]): Promise<typeorm_1.UpdateResult>;
        restore(criteria: string | number | string[] | number[] | Date | typeorm_1.ObjectID | typeorm_1.FindConditions<any> | Date[] | typeorm_1.ObjectID[]): Promise<typeorm_1.UpdateResult>;
        count(options?: typeorm_1.FindManyOptions<any>): Promise<number>;
        count(conditions?: typeorm_1.FindConditions<any>): Promise<number>;
        find(options?: typeorm_1.FindManyOptions<any>): Promise<any[]>;
        find(conditions?: typeorm_1.FindConditions<any>): Promise<any[]>;
        findAndCount(options?: typeorm_1.FindManyOptions<any>): Promise<[any[], number]>;
        findAndCount(conditions?: typeorm_1.FindConditions<any>): Promise<[any[], number]>;
        findByIds(ids: any[], options?: typeorm_1.FindManyOptions<any>): Promise<any[]>;
        findByIds(ids: any[], conditions?: typeorm_1.FindConditions<any>): Promise<any[]>;
        findOne(id?: string | number | Date | typeorm_1.ObjectID, options?: typeorm_1.FindOneOptions<any>): Promise<any>;
        findOne(options?: typeorm_1.FindOneOptions<any>): Promise<any>;
        findOne(conditions?: typeorm_1.FindConditions<any>, options?: typeorm_1.FindOneOptions<any>): Promise<any>;
        findOneOrFail(id?: string | number | Date | typeorm_1.ObjectID, options?: typeorm_1.FindOneOptions<any>): Promise<any>;
        findOneOrFail(options?: typeorm_1.FindOneOptions<any>): Promise<any>;
        findOneOrFail(conditions?: typeorm_1.FindConditions<any>, options?: typeorm_1.FindOneOptions<any>): Promise<any>;
        query(query: string, parameters?: any[]): Promise<any>;
        clear(): Promise<void>;
        increment(conditions: typeorm_1.FindConditions<any>, propertyPath: string, value: string | number): Promise<typeorm_1.UpdateResult>;
        decrement(conditions: typeorm_1.FindConditions<any>, propertyPath: string, value: string | number): Promise<typeorm_1.UpdateResult>;
    };
};
import typeorm_1 = require("typeorm");
