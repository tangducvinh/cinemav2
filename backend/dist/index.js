"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const banner_1 = __importDefault(require("./route/banner"));
const movie_1 = __importDefault(require("./route/movie"));
const user_1 = __importDefault(require("./route/user"));
const show_1 = __importDefault(require("./route/show"));
const city_1 = __importDefault(require("./route/city"));
const cinema_1 = __importDefault(require("./route/cinema"));
const seat_1 = __importDefault(require("./route/seat"));
const food_1 = __importDefault(require("./route/food"));
const payment_1 = __importDefault(require("./route/payment"));
const order_1 = __importDefault(require("./route/order"));
const connectDB_1 = __importDefault(require("./config/connectDB"));
const app = (0, express_1.default)();
const port = process.env.PORT || 7777;
app.use((0, cors_1.default)({
    origin: "http://localhost:3000",
    methods: ["POST", "PUT", "GET", "DELETE"],
    credentials: true,
}));
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// initWebRouter(app);
(0, banner_1.default)(app);
(0, movie_1.default)(app);
(0, user_1.default)(app);
(0, show_1.default)(app);
(0, city_1.default)(app);
(0, cinema_1.default)(app);
(0, seat_1.default)(app);
(0, food_1.default)(app);
(0, payment_1.default)(app);
(0, order_1.default)(app);
app.use((req, res) => res.json("server on"));
(0, connectDB_1.default)();
app.listen(port, () => {
    return console.log(`Express is listening at http://localhost:${port}`);
});
//# sourceMappingURL=index.js.map