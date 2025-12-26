import { Loan, Book, sequelize } from '../models';

export async function borrow(req, res) {
  const t = await sequelize.transaction();

  try {
    const book = await Book.findByPk(req.body.bookId, { transaction: t });

    if (!book || book.stock < 1) {
      await t.rollback();
      return res.status(400).json({ message: 'Stok habis' });
    }

    const loanDate = new Date();
    const dueDate = new Date();
    dueDate.setDate(loanDate.getDate() + 7);

    await Loan.create({
      userId: req.user.id,
      bookId: book.id,
      loanDate,
      borrowDate: new Date(),
      dueDate,
      status: 'dipinjam'
    }, { transaction: t });

    await book.update(
      { stock: book.stock - 1 },
      { transaction: t }
    );

    await t.commit();
    res.json({ message: 'Berhasil meminjam buku' });

  } catch (err) {
    await t.rollback();
    res.status(500).json({ message: err.message });
  }
}

export async function returnBook(req, res) {
  const t = await sequelize.transaction();

  try {
    const loan = await Loan.findByPk(req.params.id, {
      include: Book,
      transaction: t
    });

    if (!loan)
      return res.status(404).json({ message: 'Data pinjaman tidak ditemukan' });

    if (loan.status === 'dikembalikan')
      return res.status(400).json({ message: 'Buku sudah dikembalikan' });

    if (loan.userId !== req.user.id)
      return res.status(403).json({ message: 'Akses ditolak' });

    const today = new Date();
    const lateDays = Math.floor(
      (today - loan.dueDate) / (1000 * 60 * 60 * 24)
    );

    const fine = lateDays > 0 ? lateDays * 1000 : 0;

    await loan.update({
      status: 'dikembalikan',
      returnDate: today,
      fine
    }, { transaction: t });

    await loan.Book.update({
      stock: loan.Book.stock + 1
    }, { transaction: t });

    await t.commit();

    res.json({
      message: 'Buku berhasil dikembalikan',
      lateDays: lateDays > 0 ? lateDays : 0,
      fine
    });

  } catch (err) {
    await t.rollback();
    res.status(500).json({ message: err.message });
  }
}

export async function myLoans(req, res) {
  const loans = await Loan.findAll({
    where: { userId: req.user.id },
    include: Book,
    order: [['createdAt', 'DESC']]
  });

  res.json(loans);
}