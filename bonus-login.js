const readline = require("readline");


class LoginError_1234 extends Error {
    constructor(message) {
        super(message);
        this.name = "LoginError_1234";
    }
}

class ValidationError_1234 extends LoginError_1234 {
    constructor(message) {
        super(message);
        this.name = "ValidationError_1234";
    }
}

class AuthError_1234 extends LoginError_1234 {
    constructor(message) {
        super(message);
        this.name = "AuthError_1234";
    }
}

class SystemError_1234 extends LoginError_1234 {
    constructor(message) {
        super(message);
        this.name = "SystemError_1234";
    }
}

const user1 = {
    username: "Iceng",
    password: "aselole"
};

class LoginManager_1234 {
    // defensive program
    static validateInput_1234(username, password) {
        if (typeof username !== "string" || typeof password !== "string") {
            throw new ValidationError_1234("Username dan password harus berupa string");
        }
        if (!username || !password) {
            throw new ValidationError_1234("Username atau password tidak boleh kosong");
        }
        if (username.length < 4) {
            throw new ValidationError_1234("Username minimal 4 karakter");
        }
        if (password.length < 6) {
            throw new ValidationError_1234("Password minimal 6 karakter");
        }
    }
    static authenticate_1234(username, password) {
        if (username !== user1.username) {
            throw new AuthError_1234("Username tidak terdaftar");
        }
        if (password !== user1.password) {
            throw new AuthError_1234("Password salah");
        }
        return true;
    }
    static async login_1234(username, password) {
        try {
            this.validateInput_1234(username, password);
            this.authenticate_1234(username, password);
            console.log("\nLogin berhasil\nSelamat datang!");
            return true;
        } catch (error) {
            // specific catch
            if (error instanceof ValidationError_1234) {
                console.log(`\nError Validasi: ${error.message}`);
                throw error;
            }
            else if (error instanceof AuthError_1234) {
                console.log(`\nError Autentikasi: ${error.message}`);
                throw error;
            }
            else {
                const systemError = new SystemError_1234("Terjadi kesalahan sistem! Mohon coba lagi");
                console.log(`\n${systemError.message}`);
                throw systemError;
            }

        } finally {
            console.log("\nCleanup login session");
        }
    }
}

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function tanya_1234(pertanyaan) {
    return new Promise(resolve => {
        rl.question(pertanyaan, (jawaban) => {
            resolve(jawaban);
        });
    });
}

async function ulangLogin_1234() {

    let berhasil = false;

    while (!berhasil) {
        try {
            const username = await tanya_1234("Masukkan Username: ");
            const password = await tanya_1234("Masukkan Password: ");

            berhasil = await LoginManager_1234.login_1234(username, password);

        } catch (error) {
            console.log("Silakan coba login kembali.\n");
        }
    }

    rl.close();
}

console.log("===== SISTEM LOGIN =====\n");
ulangLogin_1234();
