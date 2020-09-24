"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
const typeorm_1 = require("typeorm");
const jwt = __importStar(require("jsonwebtoken"));
const bcrypt = __importStar(require("bcryptjs"));
const user_1 = require("../entity/user");
module.exports = {
    Query: {
        users: () => {
            console.log("Find users");
            return typeorm_1.getRepository(user_1.User).find();
        },
        user: (_, { id }) => {
            console.log("find one user");
            return typeorm_1.getRepository(user_1.User).findOne(id);
        }
    },
    Mutation: {
        signUp: (_, { input }) => __awaiter(void 0, void 0, void 0, function* () {
            const userRepository = typeorm_1.getRepository(user_1.User);
            try {
                const user = yield userRepository.findOne({ email: input.email });
                if (user) {
                    throw new Error('Email already in use');
                }
                const hashedPassword = yield bcrypt.hash(input.password, 12);
                const newUser = userRepository.create(Object.assign(Object.assign({}, input), { password: hashedPassword }));
                const result = yield userRepository.save(newUser);
                return result;
            }
            catch (error) {
                console.log(error);
                throw error;
            }
        }),
        login: (_, { input }) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const userRepository = typeorm_1.getRepository(user_1.User);
                const user = yield userRepository.findOne({ email: input.email });
                if (!user) {
                    throw new Error('User not found');
                }
                const validPassword = yield bcrypt.compare(input.password, user.password);
                if (!validPassword) {
                    throw new Error('Incorrect Password');
                }
                const token = jwt.sign({ email: user.email, id: user.id }, process.env.JWT_KEY || "jwtkey", { expiresIn: '12h' });
                return { token };
            }
            catch (error) {
                console.log(error);
                throw error;
            }
        })
    }
};
