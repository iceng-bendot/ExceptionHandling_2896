class InvalidSeatFormatError_2896 extends Error {
    constructor(seat) {
        super(`Format kursi ${seat} tidak valid. Gunakan huruf+nomer (contoh: A12)`);
        this.name = "InvalidSeatFormatError_2896";
        this.seat = seat;
    }
}

class RowNotExistError_2896 extends Error {
    constructor(row) {
        super(`Baris ${row} tidak tersedia`);
        this.name = "RowNotExistError_2896";
        this.row = row;
    }
}

class SeatManager_2896 {
    static parseSeat_2896(seat) {
        const regex = /^[A-J]\d+$/; // A–J diikuti angka
        if (!regex.test(seat)) {
            throw new InvalidSeatFormatError_2896(seat);
        }
        return {
            row: seat[0],
            number: seat.slice(1)
        };
    }
    static async loadLayout_2896(row) {
        return new Promise((resolve, reject) => {
            if (row > "J") {
                reject(new RowNotExistError_2896(row));
            } else {
                resolve(true);
            }
        });
    }
    static async reserveSeat_2896(seat) {
        try {
            const parsed = this.parseSeat_2896(seat);
            await this.loadLayout_2896(parsed.row);

            console.log(`Kursi ${seat} berhasil di-reserve`);
        } 
        catch (error) {
            console.log(`Gagal reserve: ${error.message}`);

            if (error instanceof InvalidSeatFormatError_2896) {
                console.log(`Format salah: ${error.seat}`);
            } 
            else if (error instanceof RowNotExistError_2896) {
                console.log(`Baris tidak ada: ${error.row}`);
            }

            throw error;
        } 
        finally {
            console.log("Release seat lock");
        }
    }
}

async function testSeatManager_2896() {
    const testSeats = ["A12", "K5", "Z99", "B10", "A1"];
    for (const seat of testSeats) {
        try {
            await SeatManager_2896.reserveSeat_2896(seat);
        } catch (e) {
        }
    }
}

testSeatManager_2896();
