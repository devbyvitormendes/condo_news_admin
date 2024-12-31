export class AuthModel {
    public token: string;
    public refreshToken: string;
    public expiresAt: number;
    public message: string;
    public idCondo: string;

    constructor(
        token: string,
        refreshToken: string,
        expiresAt: number,
        message: string,
        idCondo: string
    ) {
        this.token = token;
        this.refreshToken = refreshToken;
        this.expiresAt = expiresAt;
        this.message = message;
        this.idCondo = idCondo;
    }
}