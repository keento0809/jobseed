"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.catchAsync = void 0;
const catchAsync = (func) => {
    return (req, res, next) => {
        func(req, res, next).catch(next);
    };
};
exports.catchAsync = catchAsync;
