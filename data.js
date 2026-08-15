// Mock Northstar dataset for the sprint prototype.
// Replace with a real export from Northstar's order/inventory systems before go-live —
// see the Go-Live Readiness Note for exact field names expected here.

const ORDERS = {
  "NS-10021": { email:"jasmine.k@example.com", status:"Shipped", carrier:"UPS", eta:"Aug 14", placed:"Aug 8",
    item:"Cloudline Running Shoe (US 9)", returnEligible:true, returnWindowEnds:"Sep 7", refundDays:"5-7 business days after we receive the item" },
  "NS-10022": { email:"marcus.b@example.com", status:"Processing", carrier:null, eta:"Aug 16", placed:"Aug 11",
    item:"Weekend Duffel, Slate", returnEligible:false, returnWindowEnds:null, refundDays:null },
  "NS-10023": { email:"priya.s@example.com", status:"Delivered", carrier:"FedEx", eta:"Aug 9 (delivered)", placed:"Aug 5",
    item:"Trailhead Fleece (M)", returnEligible:true, returnWindowEnds:"Sep 9", refundDays:"5-7 business days after we receive the item" },
  "NS-10024": { email:"devon.o@example.com", status:"Delivered", carrier:"USPS", eta:"Jul 20 (delivered)", placed:"Jul 15",
    item:"Alloy Water Bottle", returnEligible:false, returnWindowEnds:"Return window closed Aug 19", refundDays:null },
  "NS-10025": { email:"lena.f@example.com", status:"Shipped", carrier:"UPS", eta:"Aug 13", placed:"Aug 9",
    item:"Cloudline Running Shoe (US 7)", returnEligible:true, returnWindowEnds:"Sep 8", refundDays:"5-7 business days after we receive the item" }
};

const STOCK = {
  "cloudline running shoe": { "us 7":true, "us 8":false, "us 9":true, "us 10":true, "us 11":false },
  "trailhead fleece": { "s":true, "m":true, "l":false, "xl":true },
  "weekend duffel": { "slate":true, "olive":false, "black":true },
  "alloy water bottle": { "one size":true }
};

module.exports = { ORDERS, STOCK };
