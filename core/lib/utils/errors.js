"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotYetImplementedError = exports.PropertyError = exports.AuthenticationError = exports.TimerError = exports.ArgumentError = exports.LoginError = exports.ConnectionError = exports.DatabaseError = exports.AuthorizationError = void 0;
var CustomError = /** @class */ (function (_super) {
    __extends(CustomError, _super);
    function CustomError(message, reason) {
        var _this = _super.call(this, message) || this;
        _this.reason = reason;
        return _this;
    }
    return CustomError;
}(Error));
var AuthorizationError = /** @class */ (function (_super) {
    __extends(AuthorizationError, _super);
    function AuthorizationError(message, reason) {
        return _super.call(this, message, reason) || this;
    }
    return AuthorizationError;
}(CustomError));
exports.AuthorizationError = AuthorizationError;
var DatabaseError = /** @class */ (function (_super) {
    __extends(DatabaseError, _super);
    function DatabaseError(message, reason) {
        return _super.call(this, message, reason) || this;
    }
    return DatabaseError;
}(CustomError));
exports.DatabaseError = DatabaseError;
var ConnectionError = /** @class */ (function (_super) {
    __extends(ConnectionError, _super);
    function ConnectionError(message, reason) {
        return _super.call(this, message, reason) || this;
    }
    return ConnectionError;
}(DatabaseError));
exports.ConnectionError = ConnectionError;
var LoginError = /** @class */ (function (_super) {
    __extends(LoginError, _super);
    function LoginError(message, reason) {
        return _super.call(this, message, reason) || this;
    }
    return LoginError;
}(AuthorizationError));
exports.LoginError = LoginError;
var ArgumentError = /** @class */ (function (_super) {
    __extends(ArgumentError, _super);
    function ArgumentError(message, reason) {
        return _super.call(this, message, reason) || this;
    }
    return ArgumentError;
}(CustomError));
exports.ArgumentError = ArgumentError;
var TimerError = /** @class */ (function (_super) {
    __extends(TimerError, _super);
    function TimerError(message, reason) {
        return _super.call(this, message, reason) || this;
    }
    return TimerError;
}(CustomError));
exports.TimerError = TimerError;
var AuthenticationError = /** @class */ (function (_super) {
    __extends(AuthenticationError, _super);
    function AuthenticationError() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return AuthenticationError;
}(CustomError));
exports.AuthenticationError = AuthenticationError;
var PropertyError = /** @class */ (function (_super) {
    __extends(PropertyError, _super);
    function PropertyError() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return PropertyError;
}(CustomError));
exports.PropertyError = PropertyError;
var NotYetImplementedError = /** @class */ (function (_super) {
    __extends(NotYetImplementedError, _super);
    function NotYetImplementedError(message) {
        return _super.call(this, message !== null && message !== void 0 ? message : 'Property has not yet been implemented') || this;
    }
    return NotYetImplementedError;
}(CustomError));
exports.NotYetImplementedError = NotYetImplementedError;
