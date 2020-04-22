/*
    Fermata Server
    보안 함수들
*/

//import modules
import CryptoJS from "crypto-js"

class Security{

    //비밀번호 해시화
    static EncryptPassword(Password:string, Salt:string):string{
        return CryptoJS.SHA256(`${Password}${Salt}`).toString(CryptoJS.enc.Base64)
    }

    //네이버 클라우드 플랫폼 메일링 RESTAPI 인증(구글 SMTP 사용으로 인해 임시 미사용 조치)
    static makeSignatureV2(timestamp:number, accessKey:string, secretKey:string):string{
        var Body = `POST api/v1/mails\n${timestamp}\n${accessKey}`
        return CryptoJS.HmacSHA256(Body, secretKey).toString(CryptoJS.enc.Base64)
    }

    //솔트값 생성
    static CreateSalt():string{
        return `${Math.round((new Date().valueOf() * Math.random()))}`
    }

    //16자리 세션 ID 생성
    static CreateSessionID():string{
        const Chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-" //SessionID source string
        var ResultSessionID:string = ""
        for(let index=0;index < 16;index++){
            ResultSessionID += Chars[Math.round((new Date().valueOf() * Math.random())) % 63].toString()
        }
        return ResultSessionID
    }

}

//export module
export default Security