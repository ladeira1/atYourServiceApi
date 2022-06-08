"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadConfig = void 0;
var multer_1 = __importDefault(require("multer"));
var path_1 = __importDefault(require("path"));
exports.uploadConfig = {
    storage: multer_1.default.diskStorage({
        destination: path_1.default.resolve(__dirname, '..', '..', 'uploads'),
        filename: function (req, file, cb) {
            var fileName = Date.now() + "-" + file.originalname;
            cb(null, fileName);
        },
    }),
};
//# sourceMappingURL=upload.js.map