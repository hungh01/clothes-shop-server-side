import { Request, Response } from "express";

import { ProductType } from "../entities/ProductType";
import { ProductTypeDetail } from "../entities/ProductTypeDetail";


type ProductTypeRec = {
    lang: string;
    name: string;
    description: string;
};


const isValidProductArray = (data: any): data is ProductTypeRec[] => {
    return Array.isArray(data) && data.every(item =>
        typeof item.lang === 'string' &&
        typeof item.name === 'string' &&
        typeof item.description === 'string'
    );
};

export const getMain = async (req: Request, res: Response) => {
    res.send('Login route');
};

export const getProductTypes = async (req: Request, res: Response): Promise<any> => {
    try {
        const allProductTypes = await ProductTypeDetail.find({
            where: {
                lang: "EN",
            },
            relations: ["productType"],
        });
        if (allProductTypes.length === 0) {
            return res.status(200).json({});
        }
        return res.status(200).json(allProductTypes)
    }
    catch (err) {
        return res.status(500).json({ message: 'Something Wrong!' });
    }
};

export const createProductType = async (req: Request, res: Response): Promise<any> => {
    try {
        const data = req.body;
        if (!isValidProductArray(data)) {
            return res.status(400).json({ message: 'Invalid Data' });
        } else {

            const producType = new ProductType();

            const productTypeDetails = await Promise.all(
                data.map(async (p) => {
                    const productTypeDetail = new ProductTypeDetail();
                    productTypeDetail.lang = p.lang;
                    productTypeDetail.name = p.name;
                    productTypeDetail.description = p.description;
                    productTypeDetail.productType = producType; // Gán liên kết Many-to-One
                    // Lưu ProductTypeDetail vào DB
                    await productTypeDetail.save();
                    return productTypeDetail;
                })
            );

            producType.productTypeDetails = productTypeDetails;

            await producType.save();
            res.status(201).json({ message: "Created" });
        }
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Something Wrong!' });
    }
}




//Get Product Types
//Create Type Product
//Update Type Product
//Delete Type Product


//Get Products

//Create Product
//Update Product
//Delete Product

//Get Revenue
//Get Sales
//Get Users

//Get Oders

