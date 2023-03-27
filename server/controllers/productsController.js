import Product from '../models/productsModel.js';
import path from 'path';
import fs from 'fs';
export const getProducts = async (req, res) => {
    try {
        const result = await Product.findAll();
        res.json(result);
    } catch (err) {
        console.log(err);
    }
};

export const singleProduct = async (req, res) => {
    try {
        const result = await Product.findOne({
            where: {
                id: req.params.id,
            },
        });
        res.json(result);
    } catch (err) {
        console.log(err);
    }
};

export const deleteProduct = async (req, res) => {
    try {
        const result = await Product.findOne({
            where: {
                id: req.params.id,
            },
        });
        if (!result) {
            return res.json({ msg: 'محصولی پیدا نشد' });
        }
        try {
            const filePath = `./public/images/${result.image}`;
            fs.unlinkSync(filePath);
            await Product.destroy({
                where: {
                    id: req.params.id,
                },
            });
            res.json({ msg: 'محصول حذف شد' });
        } catch (err) {
            console.log(err);
        }
    } catch (err) {
        console.log(err);
    }
};

export const updateProduct = async (req, res) => {
    const result = await Product.findOne({
        where: {
            id: req.params.id,
        },
    });
    if (!result) {
        return res.json({ msg: 'محصولی پیدا نشد' });
    }
    let fileName = '';
    if (req.files === null) {
        fileName = result.image;
    } else {
        const file = req.files.file;
        const fileSize = file.data.length;
        const ext = path.extname(file.name);
        let dateNow = Math.round(Date.now());
        fileName = dateNow + ext;
        const allowedTypes = ['.png', '.jpg', '.jpeg'];
        if (!allowedTypes.includes(ext.toLowerCase())) {
            return res.json({ msg: 'عکس معتبر نیست' });
        }
        if (fileSize > 5000000) {
            return res.json({ msg: 'حجم عکس نباید بیشتر از 5 مگابایت باشد' });
        }
        const filePath = `./public/images/${result.image}`;
        fs.unlinkSync(filePath);

        file.mv(`./public/images/${fileName}`, async (err) => {
            if (err) return res.json({ msg: err.message });
        });
        const name = req.body.title;
        const url = `${req.protocol}://${req.get('host')}/images/${fileName}`;

        try {
            await Product.update(
                { name: name, image: fileName, url: url },
                {
                    where: {
                        id: req.params.id,
                    },
                }
            );
            res.json({ msg: 'محصول ویرایش شد' });
        } catch (err) {
            console.log(err);
        }
    }
};

export const saveProduct = (req, res) => {
    if (req.files == null) {
        return res.json({ msg: 'عکسی انتخاب نکردید' });
    }
    const name = req.body.title;
    const file = req.files.file;
    const fileSize = file.data.length;
    const ext = path.extname(file.name);
    let dateNow = Math.round(Date.now());
    const fileName = dateNow + ext;
    const url = `${req.protocol}://${req.get('host')}/images/${fileName}`;
    const allowedType = ['.png', '.jpg', '.jpeg'];
    if (!allowedType.includes(ext.toLowerCase())) {
        return res.json({ msg: 'عکس معتبر نیست' });
    }
    if (fileSize > 5000000) {
        return res.json({ msg: 'حجم عکس نباید بیشتر از 5 مگابایت باشد' });
    }
    file.mv(`./public/images/${fileName}`, async (err) => {
        if (err) return res.json({ msg: err.message });
        try {
            await Product.create({ name: name, image: fileName, url: url });
            res.json({ msg: 'محصول افزوده شد' });
        } catch (err) {
            console.log(err);
        }
    });
};
