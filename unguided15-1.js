class SeatNotAvailableError_2896 extends Error {
  constructor(seat) {
    super(`Kursi/Umur tidak tersedia: ${seat}`);
    this.name = "SeatNotAvailableError_2896";
    this.seat = seat;
  }
}

class PaymentFailedError_2896 extends Error {
  constructor(reason) {
    super(`Pembayaran gagal: ${reason}`);
    this.name = "PaymentFailedError_2896";
    this.reason = reason;
  }
}

class BookingService_2896 {
  static validateAge_2896(age, movieRating) {
    if (age < 17 && movieRating === "R") {
      throw new SeatNotAvailableError_2896(
        `Umur ${age} tahun tidak boleh nonton film R`
      );
    }
  }

  static checkSeatAvailability_2896(seatNumber) {
    return new Promise((resolve, reject) => {
      const bookedSeats = ["A1", "A2", "A3", "A4", "A5"];
      if (bookedSeats.includes(seatNumber)) {
        reject(new SeatNotAvailableError_2896(seatNumber));
      } else {
        resolve("Kursi Tersedia");
      }
    });
  }

  static async processPayment_2896(amount) {
    return new Promise((resolve, reject) => {
      if (amount < 50000) {
        reject(new PaymentFailedError_2896("Saldo tidak mencukupi (min. Rp50.000)"));
      } else {
        resolve("Pembayaran Berhasil");
      }
    });
  }

  static async bookTicket_2896(name, age, seat, movieRating, amount) {
    try {
      // 1. Validasi umur
      this.validateAge_2896(age, movieRating);

      // 2. Cek kursi
      await this.checkSeatAvailability_2896(seat);

      // 3. Proses pembayaran
      await this.processPayment_2896(amount);

      // Return objek tiket jika sukses
      return {
        name: name,
        seat: seat,
        movieRating: movieRating,
        status: "Tiket berhasil dipesan"
      };

    } catch (error) {
      throw error; // re-throw error asli
    } finally {
      console.log("Cleanup booking session"); // cleanup
    }
  }
}

// TESTING (JANGAN DIUBAH) - akan dites 4 kasus
async function testBooking_2896() {
  const tests = [
    { name: "Budi", age: 15, seat: "A3", rating: "R" },
    { name: "Andi", age: 20, seat: "A1", rating: "SU" },
    { name: "Cici", age: 25, seat: "B7", rating: "SU", amount: 30000 },
    { name: "Dedi", age: 22, seat: "C5", rating: "SU", amount: 75000 }
  ];

  for (let t of tests) {
    try {
      const result = await BookingService_2896.bookTicket_2896(
        t.name,
        t.age,
        t.seat,
        t.rating,
        t.amount
      );

      console.log("Berhasil:", result);

    } catch (error) {
      if (error instanceof SeatNotAvailableError_2896) {
        console.log(`Kursi/Umur tidak tersedia: ${error.seat}`);
      }
      else if (error instanceof PaymentFailedError_2896) {
        console.log(`Pembayaran gagal: ${error.reason}`);
      }
      else {
        console.log("Error tidak dikenali:", error.message);
      }
    }
  }
}

testBooking_2896();
