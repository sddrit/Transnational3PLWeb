export interface ILoginModel {
    userName: string;
    password: string;
}

export interface ILoginResponseModel {
    Token: string;
    User: any;
    ValidTo:Date;
    Roles:string[]
}
