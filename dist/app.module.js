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
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_service_1 = require("./app.service");
const app_controller_1 = require("./app.controller");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const auth_module_1 = require("./auth/auth.module");
const core_module_1 = require("./core/core.module");
const user_service_1 = require("./user/user.service");
const user_controller_1 = require("./user/user.controller");
const user_module_1 = require("./user/user.module");
const jwt_auth_guard_1 = require("./core/jwt-auth.guard");
const roles_guard_1 = require("./core/roles.guard");
const jwt_1 = require("@nestjs/jwt");
let AppModule = class AppModule {
    constructor(dataSource) {
        this.dataSource = dataSource;
    }
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forRoot(core_module_1.configService.getTypeOrmConfig()),
            auth_module_1.AuthModule,
            user_module_1.UsersModule,
            jwt_1.JwtModule,
        ],
        controllers: [app_controller_1.AppController, user_controller_1.UserController],
        providers: [app_service_1.AppService, user_service_1.UserService, jwt_auth_guard_1.JwtAuthGuard, jwt_1.JwtService, roles_guard_1.RolesGuard],
    }),
    __metadata("design:paramtypes", [typeorm_2.DataSource])
], AppModule);
//# sourceMappingURL=app.module.js.map