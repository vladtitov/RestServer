/**
 * Created by Vlad on 5/14/2016.
 */
    /// <reference path="model.ts" />
module DAO {
    export interface DAO<T extends VO.Identifiable> {
        create(t: T):T;
        read(id: number):T;
        update(t: T):boolean;
        delete(id: number):boolean;
    }
}