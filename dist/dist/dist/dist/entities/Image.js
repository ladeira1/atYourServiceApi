"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
        r = Reflect.decorate(decorators, target, key, desc);
    else
        for (var i = decorators.length - 1; i >= 0; i--)
            if (d = decorators[i])
                r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
        return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Image = void 0;
var typeorm_1 = require("typeorm");
var Service_1 = require("./Service");
var Image = (function () {
    function Image() {
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)(),
        __metadata("design:type", String)
    ], Image.prototype, "id", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], Image.prototype, "url", void 0);
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return Service_1.Service; }, function (service) { return service.images; }, { onDelete: 'CASCADE' }),
        __metadata("design:type", Service_1.Service)
    ], Image.prototype, "service", void 0);
    __decorate([
        (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
        __metadata("design:type", Date)
    ], Image.prototype, "createdAt", void 0);
    __decorate([
        (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at' }),
        __metadata("design:type", Date)
    ], Image.prototype, "updatedAt", void 0);
    Image = __decorate([
        (0, typeorm_1.Entity)('image')
    ], Image);
    return Image;
}());
exports.Image = Image;
//# sourceMappingURL=Image.js.map