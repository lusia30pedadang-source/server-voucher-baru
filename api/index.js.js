const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

let databaseTransaksi = [];

app.post('/api/sync-transaksi', (req, res) => {
    const { id_kasir, data_transaksi } = req.body;

    if (!id_kasir || !Array.isArray(data_transaksi) || data_transaksi.length === 0) {
        return res.status(400).json({ status: "error", message: "Data kosong!" });
    }

    data_transaksi.forEach(tx => {
        databaseTransaksi.unshift({ ...tx, id_kasir, waktu_diterima: new Date().toISOString() });
    });

    return res.status(200).json({
        status: "success",
        message: `Berhasil merekap ${data_transaksi.length} transaksi.`
    });
});

app.get('/api/admin/rekap-transaksi', (req, res) => {
    res.status(200).json({ status: "success", total: databaseTransaksi.length, data: databaseTransaksi });
});

app.get('/', (req, res) => {
    res.send('Server Admin Voucher WiFi Vercel Aktif!');
});

module.exports = app;