"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Worker = void 0;
var typeorm_1 = require("typeorm");
var Service_1 = require("./Service");
var User_1 = require("./User");
var Worker = /** @class */ (function () {
    function Worker() {
    }
    __decorate([
        (0, typeorm_1.PrimaryColumn)(),
        __metadata("design:type", String)
    ], Worker.prototype, "id", void 0);
    __decorate([
        (0, typeorm_1.OneToOne)(function () { return User_1.User; }, function (user) { return user; }, { eager: true }),
        (0, typeorm_1.JoinColumn)({ name: 'user' }),
        __metadata("design:type", User_1.User)
    ], Worker.prototype, "user", void 0);
    __decorate([
        (0, typeorm_1.Column)({ name: 'cpf_cnpj' }),
        __metadata("design:type", String)
    ], Worker.prototype, "cpfCnpj", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], Worker.prototype, "address", void 0);
    __decorate([
        (0, typeorm_1.OneToMany)(function () { return Service_1.Service; }, function (service) { return service.worker; }),
        __metadata("design:type", Array)
    ], Worker.prototype, "services", void 0);
    Worker = __decorate([
        (0, typeorm_1.Entity)('worker')
    ], Worker);
    return Worker;
}());
exports.Worker = Worker;
