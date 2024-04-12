const express = require('express');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const urlencodedParser = bodyParser.urlencoded({ extended: false });
const Address = require("../models/Address");
const router = require('../routes/myApi');

class AddressController {

    //assumes newAddress is given as an array in format - [line1, line2, city, state, zip]
    // sets shipping address to the new address
    static async setShippingAddress(userID, newAddress) {
        try {
            const result = await Address.setShipping(userID, newAddress);
        } catch (error) {
            console.error("Error setting shipping address:", error);
        }
    }    

    //assumes newAddress is given as an array in format - [line1, line2, city, state, zip]
    // sets billing address to the new address
    static async setBillingAddress(userID, newAddress) {
        try {
            const result = await Address.setBilling(userID, newAddress);
        } catch (error) {
            console.error("Error setting billing address:", error);
        }
    }    

    // Get line1 of a shipping address
    static async getShippingLine1(req, res) {
        try {
            const addressId = req.params.addressId;
            const line1 = await Address.getShippingLine1(addressId);
            if(line1 !== null) {
                res.status(200).json({ line1 });
            } else {
                res.status(404).json({ message: "Address not found" });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Internal server error" });
        }
    }

    // Get line2 of a a shipping ddress
    static async getShippingLine2(req, res) {
        try {
            const addressId = req.params.addressId;
            const line2 = await Address.getShippingLine2(addressId);
            if(line2 !== null) {
                res.status(200).json({ line2 });
            } else {
                res.status(404).json({ message: "Address not found" });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Internal server error" });
        }
    }

    // Get city of a a shipping ddress
    static async getShippingCity(req, res) {
        try {
            const addressId = req.params.addressId;
            const city = await Address.getShippingCity(addressId);
            if(city !== null) {
                res.status(200).json({ city });
            } else {
                res.status(404).json({ message: "Address not found" });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Internal server error" });
        }
    }

    // Get state of a shipping address
    static async getShippingState(req, res) {
        try {
            const addressId = req.params.addressId;
            const state = await Address.getShippingState(addressId);
            if(state !== null) {
                res.status(200).json({ state });
            } else {
                res.status(404).json({ message: "Address not found" });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Internal server error" });
        }
    }

    // Get zip of a shipping address
    static async getShippingZip(req, res) {
        try {
            const addressId = req.params.addressId;
            const zip = await Address.getShippingZip(addressId);
            if(zip !== null) {
                res.status(200).json({ zip });
            } else {
                res.status(404).json({ message: "Address not found" });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Internal server error" });
        }
    }

    // Get line1 of a billing address
    static async getShippingLine1(req, res) {
        try {
            const addressId = req.params.addressId;
            const line1 = await Address.getBillingLine1(addressId);
            if(line1 !== null) {
                res.status(200).json({ line1 });
            } else {
                res.status(404).json({ message: "Address not found" });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Internal server error" });
        }
    }

    // Get line2 of a billing address
    static async getShippingLine2(req, res) {
        try {
            const addressId = req.params.addressId;
            const line2 = await Address.getBillingLine2(addressId);
            if(line2 !== null) {
                res.status(200).json({ line2 });
            } else {
                res.status(404).json({ message: "Address not found" });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Internal server error" });
        }
    }

    // Get city of a billing address
    static async getShippingCity(req, res) {
        try {
            const addressId = req.params.addressId;
            const city = await Address.getBillingCity(addressId);
            if(city !== null) {
                res.status(200).json({ city });
            } else {
                res.status(404).json({ message: "Address not found" });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Internal server error" });
        }
    }

    // Get state of a billing address
    static async getShippingState(req, res) {
        try {
            const addressId = req.params.addressId;
            const state = await Address.getBillingState(addressId);
            if(state !== null) {
                res.status(200).json({ state });
            } else {
                res.status(404).json({ message: "Address not found" });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Internal server error" });
        }
    }

    // Get zip of a billing address
    static async getShippingZip(req, res) {
        try {
            const addressId = req.params.addressId;
            const zip = await Address.getBillingZip(addressId);
            if(zip !== null) {
                res.status(200).json({ zip });
            } else {
                res.status(404).json({ message: "Address not found" });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Internal server error" });
        }
    }
}


module.exports = AddressController;
