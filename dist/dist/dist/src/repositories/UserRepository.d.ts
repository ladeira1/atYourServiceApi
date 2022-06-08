export var __esModule: boolean;
export let UserRepository: {
    new (): {
        readonly manager: typeorm_1.EntityManager;
        readonly metadata: typeorm_1.EntityMetadata;
        readonly queryRunner?: typeorm_1.QueryRunner | undefined;
        createQueryBuilder(alias?: string | undefined, queryRunner?: typeorm_1.QueryRunner | undefined): typeorm_1.SelectQueryBuilder<any>;
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
        save<T_1 extends typeorm_1.DeepPartial<any>>(entities: T_1[], options?: typeorm_1.SaveOptions | undefined): Promise<any[]>;
        save<T_2 extends typeorm_1.DeepPartial<any>>(entity: T_2, options: typeorm_1.SaveOptions & {
            reload: false;
        }): Promise<T_2>;
        save<T_3 extends typeorm_1.DeepPartial<any>>(entity: T_3, options?: typeorm_1.SaveOptions | undefined): Promise<any>;
        remove(entities: any[], options?: typeorm_1.RemoveOptions | undefined): Promise<any[]>;
        remove(entity: any, options?: typeorm_1.RemoveOptions | undefined): Promise<any>;
        softRemove<T_4 extends typeorm_1.DeepPartial<any>>(entities: T_4[], options: typeorm_1.SaveOptions & {
            reload: false;
        }): Promise<T_4[]>;
        softRemove<T_5 extends typeorm_1.DeepPartial<any>>(entities: T_5[], options?: typeorm_1.SaveOptions | undefined): Promise<any[]>;
        softRemove<T_6 extends typeorm_1.DeepPartial<any>>(entity: T_6, options: typeorm_1.SaveOptions & {
            reload: false;
        }): Promise<T_6>;
        softRemove<T_7 extends typeorm_1.DeepPartial<any>>(entity: T_7, options?: typeorm_1.SaveOptions | undefined): Promise<any>;
        recover<T_8 extends typeorm_1.DeepPartial<any>>(entities: T_8[], options: typeorm_1.SaveOptions & {
            reload: false;
        }): Promise<T_8[]>;
        recover<T_9 extends typeorm_1.DeepPartial<any>>(entities: T_9[], options?: typeorm_1.SaveOptions | undefined): Promise<any[]>;
        recover<T_10 extends typeorm_1.DeepPartial<any>>(entity: T_10, options: typeorm_1.SaveOptions & {
            reload: false;
        }): Promise<T_10>;
        recover<T_11 extends typeorm_1.DeepPartial<any>>(entity: T_11, options?: typeorm_1.SaveOptions | undefined): Promise<any>;
        insert(entity: import("typeorm/query-builder/QueryPartialEntity").QueryDeepPartialEntity<any> | import("typeorm/query-builder/QueryPartialEntity").QueryDeepPartialEntity<any>[]): Promise<typeorm_1.InsertResult>;
        update(criteria: string | number | string[] | number[] | Date | typeorm_1.ObjectID | typeorm_1.FindConditions<any> | Date[] | typeorm_1.ObjectID[], partialEntity: import("typeorm/query-builder/QueryPartialEntity").QueryDeepPartialEntity<any>): Promise<typeorm_1.UpdateResult>;
        delete(criteria: string | number | string[] | number[] | Date | typeorm_1.ObjectID | typeorm_1.FindConditions<any> | Date[] | typeorm_1.ObjectID[]): Promise<typeorm_1.DeleteResult>;
        softDelete(criteria: string | number | string[] | number[] | Date | typeorm_1.ObjectID | typeorm_1.FindConditions<any> | Date[] | typeorm_1.ObjectID[]): Promise<typeorm_1.UpdateResult>;
        restore(criteria: string | number | string[] | number[] | Date | typeorm_1.ObjectID | typeorm_1.FindConditions<any> | Date[] | typeorm_1.ObjectID[]): Promise<typeorm_1.UpdateResult>;
        count(options?: typeorm_1.FindManyOptions<any> | undefined): Promise<number>;
        count(conditions?: typeorm_1.FindConditions<any> | undefined): Promise<number>;
        find(options?: typeorm_1.FindManyOptions<any> | undefined): Promise<any[]>;
        find(conditions?: typeorm_1.FindConditions<any> | undefined): Promise<any[]>;
        findAndCount(options?: typeorm_1.FindManyOptions<any> | undefined): Promise<[any[], number]>;
        findAndCount(conditions?: typeorm_1.FindConditions<any> | undefined): Promise<[any[], number]>;
        findByIds(ids: any[], options?: typeorm_1.FindManyOptions<any> | undefined): Promise<any[]>;
        findByIds(ids: any[], conditions?: typeorm_1.FindConditions<any> | undefined): Promise<any[]>;
        findOne(id?: string | number | Date | typeorm_1.ObjectID | undefined, options?: typeorm_1.FindOneOptions<any> | undefined): Promise<any>;
        findOne(options?: typeorm_1.FindOneOptions<any> | undefined): Promise<any>;
        findOne(conditions?: typeorm_1.FindConditions<any> | undefined, options?: typeorm_1.FindOneOptions<any> | undefined): Promise<any>;
        findOneOrFail(id?: string | number | Date | typeorm_1.ObjectID | undefined, options?: typeorm_1.FindOneOptions<any> | undefined): Promise<any>;
        findOneOrFail(options?: typeorm_1.FindOneOptions<any> | undefined): Promise<any>;
        findOneOrFail(conditions?: typeorm_1.FindConditions<any> | undefined, options?: typeorm_1.FindOneOptions<any> | undefined): Promise<any>;
        query(query: string, parameters?: any[] | undefined): Promise<any>;
        clear(): Promise<void>;
        increment(conditions: typeorm_1.FindConditions<any>, propertyPath: string, value: string | number): Promise<typeorm_1.UpdateResult>;
        decrement(conditions: typeorm_1.FindConditions<any>, propertyPath: string, value: string | number): Promise<typeorm_1.UpdateResult>;
    };
};
import typeorm_1 = require("typeorm");
