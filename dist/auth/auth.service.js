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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const user_entity_1 = require("../entity/user.entity");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const bcrypt = require("bcrypt");
let AuthService = class AuthService {
    constructor(jwtService, usersRepository) {
        this.jwtService = jwtService;
        this.usersRepository = usersRepository;
    }
    async signup(users) {
        const { id, email, password, lastName, name } = users;
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = this.usersRepository.create({
            id,
            lastName,
            name,
            email,
            password: hashedPassword,
        });
        return this.usersRepository.save(user);
    }
    async validateUser(users) {
        const email = users.email;
        const user = await this.usersRepository.findOne({ where: { email } });
        if (user && (await bcrypt.compare(users.password, user.password))) {
            return user;
        }
        return null;
    }
    async login(user) {
        const payload = { email: user.email, sub: user.id, role: user.role };
        console.log(payload);
        return {
            access_token: this.jwtService.sign(payload),
        };
    }
    validate(payload) {
        return { userId: payload.sub, email: payload.email, role: payload.role };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, typeorm_1.InjectRepository)(user_entity_1.UserEntity)),
    __metadata("design:paramtypes", [jwt_1.JwtService,
        typeorm_2.Repository])
], AuthService);
//# sourceMappingURL=auth.service.js.map