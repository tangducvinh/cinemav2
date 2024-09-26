const db = require("../models");
const { listOrderedSeat } = require("../services/seat");

const getListSeat = async (req, res) => {
  try {
    const { roomId } = req.query;
    const response = await db.Seat.findAll({
      where: {
        roomId,
      },
      order: [
        ["row", "asc"],
        ["column", "asc"],
      ],
    });

    return res.status(200).json({
      success: response ? true : false,
      message: response ? "Thành công" : "Thất bại",
      data: response ? response : "no data",
    });
  } catch (e) {
    return res.status(500).json(e);
  }
};

const getListOrderedSeat = async (req, res) => {
  try {
    const { showId } = req.query;

    const response = await listOrderedSeat(showId);

    return res.status(200).json({
      success: response ? true : false,
      message: response ? "Thành công" : "Thất bại",
      data: response ? response : "no data",
    });
  } catch (e) {
    return res.status(500).json(e);
  }
};


const createAutoSeats = async (req, res) => {
  //status: 1 normal
  // status: 2 broken

  // 29 10
  // try {
  //   for (let i = 0; i < 10; i++) {
  //     for (let j = 0; j < 29; j++) {
  //       if (j === 4 || j === 5 || j === 23 || j === 24) {
  //         await db.Seat.create({
  //           name: 0,
  //           roomId: 1,
  //           number: 0,
  //           row: i,
  //           column: j,
  //           status: 2,
  //           ticketPrice: 0,
  //         });
  //       } else if (j <= 3) {
  //         await db.Seat.create({
  //           name: j + 1,
  //           roomId: 1,
  //           number: j + 1,
  //           row: i,
  //           column: j,
  //           status: 1,
  //           ticketPrice: 70000,
  //         });
  //       } else if (j <= 22) {
  //         await db.Seat.create({
  //           name: j + 1 - 2,
  //           roomId: 1,
  //           number: j + 1 - 2,
  //           row: i,
  //           column: j,
  //           status: 1,
  //           ticketPrice: 70000,
  //         });
  //       } else {
  //         await db.Seat.create({
  //           name: j + 1 - 4,
  //           roomId: 1,
  //           number: j + 1 - 4,
  //           row: i,
  //           column: j,
  //           status: 1,
  //           ticketPrice: 70000,
  //         });
  //       }
  //     }
  //   }

  //   // for (let i = 34000; i < 35000; i++) {
  //   //   await db.Seat.destroy({ where: { id: i } });
  //   // }

  //   return res.status(200).json("ok");
  // } catch (e) {
  //   return res.status(500).json(e);
  // }

  // 14 10
  // try {
  //   for (let i = 0; i < 10; i++) {
  //     for (let j = 0; j < 14; j++) {
  //       if (j <= 1) {
  //         await db.Seat.create({
  //           name: j + 1,
  //           roomId: 2,
  //           number: j + 1,
  //           row: i,
  //           column: j,
  //           status: 1,
  //           ticketPrice: 75000,
  //         });
  //       } else if (j == 2 || j == 3) {
  //         await db.Seat.create({
  //           name: 0,
  //           roomId: 2,
  //           number: 0,
  //           row: i,
  //           column: j,
  //           status: 2,
  //           ticketPrice: 0,
  //         });
  //       } else {
  //         await db.Seat.create({
  //           name: j - 2 + 1,
  //           roomId: 2,
  //           number: j - 2 + 1,
  //           row: i,
  //           column: j,
  //           status: 1,
  //           ticketPrice: 75000,
  //         });
  //       }
  //     }
  //   }
  //   return res.json('success')
  // } catch(e) {
  //   return res.json(e)
  // }

  

  // 10 10
  try {
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        await db.Seat.create({
          name: j + 1,
          roomId: 3,
          number: j + 1,
          row: i,
          column: j,
          status: 1,
          ticketPrice: 70000,
        });
      }
    }
  } catch(e) {
    return res.json('success')
  }

  return res.json('ok')
};

module.exports = {
  getListSeat,
  getListOrderedSeat,
  createAutoSeats,
};
