const express = require('express');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const urlencodedParser = bodyParser.urlencoded({ extended: false });
const Address = require("../models/Address");
//const router = require('../routes/myApi');

var connection = require('../database').databaseConnection;


class AddressController {

    //assumes newAddress is given as an array in format - [line1, line2, city, state, zip]
    // sets shipping address to the new address
    static async setShippingAddress(userID, newAddress) {
        try {
            const result = await Address.setShipping([newAddress.address,newAddress.address2,newAddress.city,newAddress.state,newAddress.zip], userID);
            return result;
        } catch (error) {
            console.error("Error setting shipping address:", error);
        }
    }    

    //assumes newAddress is given as an array in format - [line1, line2, city, state, zip]
    // sets billing address to the new address
    static async setBillingAddress(userID, newAddress) {
        try {
            const result = await Address.setBilling(newAddress, userID);
            return result;
        } catch (error) {
            console.error("Error setting billing address:", error);
        }
    }    

    // Get line1 of a shipping address
    static async getShippingLine1(userID) {
        try {
            let res = await Address.getShippingLine1(userID); //GETS userIDm from session
            let res2 = res[0].line1 //res returns a library. Must index into it and pull the data under "line1" in DB
            console.log("res" + res) //Troubleshooting
            console.log("res2" + res2)
            if (res2 !== null && res2 !== undefined && res2 != 1) { // If it's been updated, display updated information
                return res2; //NOTE THAT IF THE CODE IS NOT RECOGNIZING THAT THE ADDRESS IS EMPTY, POPULATING THE DEFAULT ADDRESS TO ALL 1s FORCES THIS CASE
            } else {         //I.E IN DB, ROW MARKED 1 IN ADDRESS TABLE SHOULD BE ALL 1s
                res2 = "Please Enter Address Information!"
                // Return a placeholder if no address is found
                return res2;
            }
            //return res;
            //const line1 = await Address.getShippingLine1(userID);
            //if(line1 !== null) {
            //    res.status(200).json({ line1 });
            //} else {
            //    res.status(404).json({ message: "Address not found" });
            //}
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Internal server error" });
        }
    }

    // Get line2 of a a shipping ddress
    static async getShippingLine2(userID) { //SEE ABOVE FOR NOTES
        try {
            let res = await Address.getShippingLine2(userID);
            let res2 = res[0].line2
            console.log("line2res" + res)
            console.log("line2res2" + res2)
            if (res2 !== null && res2 !== undefined && res2 != 1) {
                return res2;
            } else {
                res2 = "Please Enter Address Information!"
                // Return a placeholder if no address is found
                return res2;
            }
            //const addressId = req.params.addressId;
            //const line2 = await Address.getShippingLine2(addressId);
            //if(line2 !== null) {
            //    res.status(200).json({ line2 });
            //} else {
            //    res.status(404).json({ message: "Address not found" });
            //}
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Internal server error" });
        }
    }

    // Get city of a a shipping ddress
    static async getShippingCity(userID) { //SEE ABOVE FOR NOTES
        try {
            let res = await Address.getShippingCity(userID);
            let res2 = res[0].city
            console.log("cityres" + res)
            console.log("cityres2" + res2)
            if (res2 !== null && res2 !== undefined && res2 != 1) {
                return res2;
            } else {
                res2 = "Please Enter Address Information!"
                // Return a placeholder if no address is found
                return res2;
            }

            //const addressId = req.params.addressId;
            //const city = await Address.getShippingCity(addressId);
            //if(city !== null) {
            //    res.status(200).json({ city });
            //} else {
            //    res.status(404).json({ message: "Address not found" });
            //}
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Internal server error" });
        }
    }

    // Get state of a shipping address
    static async getShippingState(userID) { //SEE ABOVE FOR NOTES
        try {
            let res = await Address.getShippingState(userID);
            let res2 = res[0].state
            console.log("stateres" + res)
            console.log("stateres2" + res2)
            if (res2 !== null && res2 !== undefined && res2 != 1) {
                return res2;
            } else {
                res2 = "Please Enter Address Information!"
                // Return a placeholder if no address is found
                return res2;
            }

            //const addressId = req.params.addressId;
            //const state = await Address.getShippingState(addressId);
            //if(state !== null) {
            //    res.status(200).json({ state });
            //} else {
            //    res.status(404).json({ message: "Address not found" });
            //}
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Internal server error" });
        }
    }

    // Get zip of a shipping address
    static async getShippingZip(userID) { //SEE ABOVE FOR NOTES
        try {
            let res = await Address.getShippingZip(userID);
            let res2 = res[0].zip
            console.log("zipres" + res)
            console.log("zipres2" + res2)
            if (res2 !== null && res2 !== undefined && res2 != 1) {
                return res2;
            } else {
                res2 = "Please Enter Address Information!"
                // Return a placeholder if no address is found
                return res2;
            }
            //const addressId = req.params.addressId;
            //const zip = await Address.getShippingZip(addressId);
            //if(zip !== null) {
            //    res.status(200).json({ zip });
            //} else {
            //    res.status(404).json({ message: "Address not found" });
            //}
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Internal server error" });
        }
    }

    // Get line1 of a billing address
    static async getBillingLine1(userID) {
        try {
            let res = await Address.getBillingLine1(userID);
            return res;
            //const addressId = req.params.addressId;
            //const line1 = await Address.getBillingLine1(addressId);
            //if(line1 !== null) {
            //    res.status(200).json({ line1 });
            //} else {
            //    res.status(404).json({ message: "Address not found" });
            //}
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Internal server error" });
        }
    }

    // Get line2 of a billing address
    static async getBillingLine2(userID) {
        try {
            let res = await Address.getBillingLine2(userID);
            return res;
            //const addressId = req.params.addressId;
            //const line2 = await Address.getBillingLine2(addressId);
            //if(line2 !== null) {
            //    res.status(200).json({ line2 });
            //} else {
            //    res.status(404).json({ message: "Address not found" });
            //}
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Internal server error" });
        }
    }

    // Get city of a billing address
    static async getBillingCity(userID) {
        try {
            let res = await Address.getBillingCity(userID);
            return res;
            //const addressId = req.params.addressId;
            //const city = await Address.getBillingCity(addressId);
            //if(city !== null) {
            //    res.status(200).json({ city });
            //} else {
            //    res.status(404).json({ message: "Address not found" });
            //}
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Internal server error" });
        }
    }

    // Get state of a billing address
    static async getBillingState(userID) {
        try {
            let res = await Address.getBillingState(userID);
            return res;
            //const addressId = req.params.addressId;
            //const state = await Address.getBillingState(addressId);
            //if(state !== null) {
            //    res.status(200).json({ state });
            //} else {
            //    res.status(404).json({ message: "Address not found" });
            //}
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Internal server error" });
        }
    }

    // Get zip of a billing address
    static async getBillingZip(userID) {
        try {
            let res = await Address.getBillingZip(userID);
            return res;
            //const addressId = req.params.addressId;
            //const zip = await Address.getBillingZip(addressId);
            //if(zip !== null) {
            //    res.status(200).json({ zip });
            //} else {
            //    res.status(404).json({ message: "Address not found" });
            //}
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Internal server error" });
        }
    }
}

//assumes newAddress is given as an array in format - [line1, line2, city, state, zip]
//AddressController.setShippingAddress(404, ["2714 Baller Drive","Apt 12","Sin City","Georgia",77877]);
//AddressController.setBillingAddress(404, ["2714 Baller Drive","Apt 12","Sin City","Georgia",77877]);
//
//AddressController.getShippingLine1(401);
//AddressController.getShippingLine2(401);
//AddressController.getShippingCity(401);
//AddressController.getShippingState(401);
//AddressController.getShippingZip(401);
//
//AddressController.getBillingLine1(402);
//AddressController.getBillingLine2(402);
//AddressController.getBillingCity(402);
//AddressController.getBillingState(402);
//AddressController.getBillingZip(402);

module.exports = AddressController;
