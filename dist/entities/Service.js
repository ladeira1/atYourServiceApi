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
exports.Service = void 0;
var typeorm_1 = require("typeorm");
var Category_1 = require("./Category");
var Image_1 = require("./Image");
var Offer_1 = require("./Offer");
var Worker_1 = require("./Worker");
var Service = /** @class */ (function () {
    function Service() {
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)(),
        __metadata("design:type", String)
    ], Service.prototype, "id", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], Service.prototype, "name", void 0);
    __decorate([
        (0, typeorm_1.Column)({ name: 'min_value' }),
        __metadata("design:type", Number)
    ], Service.prototype, "minValue", void 0);
    __decorate([
        (0, typeorm_1.Column)({
            name: 'thumbs_up',
            nullable: true,
            type: 'numeric',
            precision: 10,
            scale: 2,
        }),
        __metadata("design:type", Number)
    ], Service.prototype, "thumbsUp", void 0);
    __decorate([
        (0, typeorm_1.Column)({ name: 'times_provided' }),
        __metadata("design:type", Number)
    ], Service.prototype, "timesProvided", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], Service.prototype, "description", void 0);
    __decorate([
        (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
        __metadata("design:type", Date)
    ], Service.prototype, "createdAt", void 0);
    __decorate([
        (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at' }),
        __metadata("design:type", Date)
    ], Service.prototype, "updatedAt", void 0);
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return Category_1.Category; }, function (category) { return category.services; }, { eager: true }),
        __metadata("design:type", Category_1.Category)
    ], Service.prototype, "category", void 0);
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return Worker_1.Worker; }, function (worker) { return worker.services; }, { eager: true }),
        __metadata("design:type", Worker_1.Worker)
    ], Service.prototype, "worker", void 0);
    __decorate([
        (0, typeorm_1.OneToMany)(function () { return Image_1.Image; }, function (image) { return image.service; }, {
            eager: true,
        }),
        __metadata("design:type", Array)
    ], Service.prototype, "images", void 0);
    __decorate([
        (0, typeorm_1.OneToMany)(function () { return Offer_1.Offer; }, function (offer) { return offer.service; }),
        __metadata("design:type", Array)
    ], Service.prototype, "offers", void 0);
    Service = __decorate([
        (0, typeorm_1.Entity)('service')
    ], Service);
    return Service;
}());
exports.Service = Service;
