import Product from '../models/productsModel.js';
import path from 'path';
export const getProducts = async (req, res) => {
    try {
        const result = await Product.findAll();
        res.json(result);
    } catch (err) {
        console.log(err);
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
    const fileName = file.md5 + ext;
    const url = `${req.protocol}://${req.get('host')}/images/${fileName}`;
    const allowdTypes = ['.png', '.jpg', '.jpeg'];
    if (!allowdTypes.includes(ext.toLowerCase())) {
        return res.json({ msg: 'عکس معتبر نیست' });
    }
    if (fileSize > 5000000) {
        return res.json({ msg: 'حجم عکس نباید بیشتر از 5 مگابایت باشد' });
    }
    file.mv(`./public/images/${fileName}`, async (err) => {
        if (err) return res.json({ msg: err.message });
        try {
            await Product.create({ name: name, image: fileName, url: url });
            res.json({msg:'محصول افزوده شد'})
        } catch (err) {
            console.log(err);
        }
    });
};
